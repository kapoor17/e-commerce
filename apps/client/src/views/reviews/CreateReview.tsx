import { Check, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReviewService from '@/services/review.route';
import ProductService from '@/services/product.route';

function CreateReview() {
  const { productId = '' } = useParams<{ productId: string }>();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleRating = (value: number) => {
    setRating(value);
  };

  const { data: product } = useQuery({
    queryFn: () => ProductService.getOne(productId),
    select: (data) => data.data.product,
    queryKey: ['products', 'getOne']
  });

  const queryClient = useQueryClient();
  const { mutateAsync: createReview } = useMutation({
    mutationFn: () =>
      ReviewService.createOne({
        productId,
        rating,
        comment
      }),
    onSettled: () => {
      setRating(0);
      setComment('');
      queryClient.invalidateQueries({
        queryKey: ['product', 'getOne', productId]
      });
    }
  });

  const handleCreateReview: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await createReview();
  };

  if (!product) return null;

  return (
    <div>
      <h1 className='p-4 text-lg'>{product.name}</h1>
      <form className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-4'>
        <Label htmlFor='review' className='sr-only'>
          Review
        </Label>
        <div className='flex gap-2 p-2'>
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={cn(
                'h-5 w-5 cursor-pointer',
                value <= rating
                  ? 'fill-current text-yellow-400'
                  : 'text-gray-300'
              )}
              onClick={() => handleRating(value)}
            />
          ))}
        </div>
        <Textarea
          id='review'
          placeholder='Type your review here...'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
        />
        <div className='flex items-center p-3 pt-0'>
          <Button
            type='submit'
            size='sm'
            className='ml-auto gap-1.5'
            onClick={handleCreateReview}
          >
            Create Review
            <Check />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateReview;
