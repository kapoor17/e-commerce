import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import productServices from '@/services/product.route';
import cartItemServices from '@/services/cartItem.route';
import cartServices from '@/services/cart.route';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';

export default function Product() {
  const { user } = useAuth();
  const { productId = '' } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState<number>(1);

  const {
    data: product,
    isFetching,
    isError
  } = useQuery({
    queryFn: () => productServices.getOne(productId),
    select: (data) => data.data.product,
    queryKey: ['products', 'getOne', productId]
  });

  function handleQuantityChange(value: string): void {
    setQuantity(parseInt(value));
  }

  const queryClient = useQueryClient();
  const { mutateAsync: createCartItem, isPending: creatingCartItem } =
    useMutation({
      mutationFn: () =>
        cartItemServices.createOne({
          productId,
          quantity,
          cartId: user?.cart.id ?? ''
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cartItems', 'getAll'] });
        queryClient.invalidateQueries({ queryKey: ['cart', 'getAll'] });
      }
    });

  const { mutateAsync: createCart } = useMutation({
    mutationFn: () =>
      cartServices.createOne({
        userId: user?.id ?? ''
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'status'] });
    }
  });

  if (!product || !user) return null;

  async function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();
    if (!user) throw new Error('User not found');
    if (!product) throw new Error('Product not found');
    if (!user.cart || !user.cart.id) {
      await createCart();
    }
    await createCartItem();
    return;
  }

  const averageRating = calculateAverageRating(product.reviews);

  function calculateAverageRating(reviews: { rating: number }[]): number {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  return (
    <Skeleton isLoading={isFetching} isError={isError}>
      <div className='grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12'>
        <div className='grid gap-4 items-start'>
          <div className='flex items-start'>
            <div className='grid gap-4'>
              <h1 className='font-bold text-2xl sm:text-3xl'>{product.name}</h1>
              <div>
                <p>{product.description}</p>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-0.5'>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        index < Math.floor(averageRating)
                          ? 'w-5 h-5 fill-primary'
                          : 'w-5 h-5 fill-muted stroke-muted-foreground'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='text-4xl font-bold ml-auto'>${product.price}</div>
          </div>
          <form className='grid gap-4 md:gap-10'>
            <div className='grid gap-2'>
              <Label htmlFor='quantity' className='text-base'>
                Quantity
              </Label>
              <Select
                defaultValue={quantity.toString()}
                onValueChange={handleQuantityChange}
              >
                <SelectTrigger className='w-24'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>1</SelectItem>
                  <SelectItem value='2'>2</SelectItem>
                  <SelectItem value='3'>3</SelectItem>
                  <SelectItem value='4'>4</SelectItem>
                  <SelectItem value='5'>5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              isLoading={creatingCartItem}
              onClick={handleAddToCart}
              size='lg'
            >
              Add to cart
            </Button>
          </form>
        </div>
        <div className='grid gap-3 items-start'>
          <div className='grid gap-4 md:gap-10'>
            <img
              src={product.image}
              alt='Product Image'
              width={600}
              height={600}
              className='aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
            />
          </div>
        </div>
      </div>
    </Skeleton>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  );
}
