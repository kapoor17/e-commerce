import { cn } from '@/lib/utils';
import { If, Then, Else, ElseIf } from '../utility/conditionals';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  isError: boolean;
}

const SkeletonOverlay = ({
  className,
  ...props
}: Omit<Props, 'isLoading' | 'isError'>) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted pointer-events-none',
        className
      )}
      {...props}
    />
  );
};

const Skeleton = ({ className, children, isLoading, isError }: Props) => {
  return (
    <If condition={isLoading}>
      <Then>
        <SkeletonOverlay className={cn('h-20 w-full', className)} />
      </Then>
      <ElseIf condition={isError}>Error while fetching</ElseIf>
      <Else>{children}</Else>
    </If>
  );
};

export { Skeleton, SkeletonOverlay };
