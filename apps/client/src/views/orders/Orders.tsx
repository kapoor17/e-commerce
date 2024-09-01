import React from 'react';
import { useQuery } from '@tanstack/react-query';
import orderServices from '@/services/order.route';
import { Skeleton } from '@/components/ui/skeleton';
import OrderDetails from './OrderDetails';
import { Else, If, Then } from '@/components/utility/conditionals';

const Orders: React.FC = () => {
  const {
    data: allOrderItems = [],
    isFetching,
    isError
  } = useQuery({
    queryFn: () => orderServices.getAll(),
    select: (data) => data.data.orders,
    queryKey: ['orders', 'getAll']
  });

  return (
    <Skeleton isLoading={isFetching} isError={isError}>
      <If condition={allOrderItems.length > 0}>
        <Then>
          {allOrderItems.map((order) => (
            <OrderDetails order={order} />
          ))}
        </Then>
        <Else>
          <div className='text-center text-md'>No orders found</div>
        </Else>
      </If>
    </Skeleton>
  );
};

export default Orders;
