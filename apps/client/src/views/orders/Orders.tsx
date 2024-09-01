import React from 'react';
import { useQuery } from '@tanstack/react-query';
import orderServices from '@/services/order.route';
import { Skeleton } from '@/components/ui/skeleton';
import OrderDetails from './OrderDetails';

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
      {allOrderItems.map((order) => (
        <OrderDetails order={order} />
      ))}
    </Skeleton>
  );
};

export default Orders;
