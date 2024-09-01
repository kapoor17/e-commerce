import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import cartServices from '@/services/cart.route';
import cartItemServices from '@/services/cartItem.route';
import orderServices from '@/services/order.route';
import orderItemServices from '@/services/orderItem.route';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router';
import { OrderItemInsert } from '@e_commerce_package/models/types';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: allCartItems = [],
    isFetching,
    isError
  } = useQuery({
    queryFn: () => cartServices.getOne(user?.cart.id ?? ''),
    select: (data) => data.data.cart.cartItems,
    queryKey: ['cart', 'getAll']
  });

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCartItem } = useMutation({
    mutationFn: (id: string) => cartItemServices.deleteOne(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'getAll'] });
    }
  });

  const { mutateAsync: createOrder } = useMutation({
    mutationFn: (userId: string) =>
      orderServices.createOne({
        userId
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'getAll'] });
    }
  });

  const { mutateAsync: createOrderItems } = useMutation({
    mutationFn: (orderItemDetails: OrderItemInsert) =>
      orderItemServices.createOne(orderItemDetails)
  });

  async function handleCartItemDelete(id: string): Promise<void> {
    await deleteCartItem(id);
  }

  async function handleCreateOrder(
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();
    if (!user || !user.id) throw new Error('User not found');
    const {
      data: {
        order: { id: orderId }
      }
    } = await createOrder(user.id);
    for (const cartItem of allCartItems) {
      await createOrderItems({
        price: String(cartItem.product.price),
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
        orderId
      });
    }
    await clearCart();
  }

  async function clearCart(): Promise<void> {
    for (const cartItem of allCartItems) {
      await deleteCartItem(cartItem.id);
    }
  }

  return (
    <Tabs defaultValue='all'>
      <Skeleton isLoading={isFetching} isError={isError}>
        <TabsContent value='all'>
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
              <CardDescription>
                Manage your cart and place an order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>img</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Quantity
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCartItems.map((cartItem) => {
                    const { product, quantity } = cartItem;
                    return (
                      <TableRow>
                        <TableCell className='hidden sm:table-cell'>
                          <img
                            alt='Product image'
                            className='aspect-square rounded-md object-cover'
                            height='64'
                            src={product.image}
                            width='64'
                          />
                        </TableCell>
                        <TableCell
                          className='font-medium cursor-pointer'
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          {product.name}
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className='hidden md:table-cell'>
                          {quantity}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup='true'
                                size='icon'
                                variant='ghost'
                              >
                                <MoreHorizontal className='h-4 w-4' />
                                <span className='sr-only'>Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCartItemDelete(cartItem.id);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Button className='float-right mt-4' onClick={handleCreateOrder}>
            Place Order
          </Button>
        </TabsContent>
      </Skeleton>
    </Tabs>
  );
};

export default Cart;
