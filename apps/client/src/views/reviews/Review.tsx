import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { Else, If, Then } from '@/components/utility/conditionals';

interface IReviewProps {
  user: {
    first_name: string;
  };
  rating: number;
  comment: string | null;
}

const Review: React.FC<IReviewProps> = ({ user, rating, comment }) => {
  return (
    <div className='flex items-center gap-4 w-full'>
      <Avatar className='hidden h-9 w-9 sm:flex'>
        <AvatarImage src='/avatars/01.png' alt='Avatar' />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className='grid gap-1'>
        <p className='text-sm font-medium leading-none'>{user.first_name}</p>
        <div>{comment}</div>
      </div>
      <div className='ml-auto flex gap-1'>
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <If condition={index < rating}>
              <Then>
                <StarFilledIcon key={index} />
              </Then>
              <Else>
                <StarIcon key={index} />
              </Else>
            </If>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
