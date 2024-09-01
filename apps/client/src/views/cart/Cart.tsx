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
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: allProducts = [],
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'getAll'] });
    },
    mutationKey: ['cartItem', 'deleteOne']
  });

  async function handleCartItemDelete(id: string): Promise<void> {
    await deleteCartItem(id);
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
                  {allProducts.map((cartItem) => {
                    const { product, quantity } = cartItem;
                    return (
                      <TableRow
                        className='cursor-pointer'
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <TableCell className='hidden sm:table-cell'>
                          <img
                            alt='Product image'
                            className='aspect-square rounded-md object-cover'
                            height='64'
                            src={product.image}
                            width='64'
                          />
                        </TableCell>
                        <TableCell className='font-medium'>
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
                                onClick={() =>
                                  handleCartItemDelete(cartItem.id)
                                }
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
        </TabsContent>
      </Skeleton>
    </Tabs>
  );
};

export default Cart;
