import { Copy, CreditCard, Truck } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DetailedOrder } from '@e_commerce_package/models/types';
import moment from 'moment';
import { useMemo } from 'react';

interface IOrderDetails {
  order: DetailedOrder;
}

const OrderDetails: React.FC<IOrderDetails> = ({
  order: { id, createdAt, orderItems }
}) => {
  const totalOrderValue = useMemo(
    () =>
      orderItems.reduce(
        (sum, orderItem) => sum + Number(orderItem.price) * orderItem.quantity,
        0
      ),
    [orderItems]
  );
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start bg-muted/50'>
        <div className='grid gap-0.5'>
          <CardTitle className='group flex items-center gap-2 text-lg'>
            Order {id.substring(0, 8)}
            <Button
              size='icon'
              variant='outline'
              className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
            >
              <Copy className='h-3 w-3' />
              <span className='sr-only'>Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Date: {moment(createdAt).format('MMMM D, YYYY')}
          </CardDescription>
        </div>
        <div className='ml-auto flex items-center gap-1'>
          <Button size='sm' variant='outline' className='h-8 gap-1'>
            <Truck className='h-3.5 w-3.5' />
            <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
              Track Order
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        <div className='grid gap-3'>
          <div className='font-semibold'>Order Details</div>
          <ul className='grid gap-3'>
            {orderItems.map((orderItem) => (
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>
                  {orderItem.product.name} x <span>{orderItem.quantity}</span>
                </span>
                <span>${orderItem.price}</span>
              </li>
            ))}
          </ul>
          <Separator className='my-2' />
          <ul className='grid gap-3'>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span>${totalOrderValue}</span>
            </li>
          </ul>
        </div>
        <Separator className='my-4' />
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-3'>
            <div className='font-semibold'>Shipping Information</div>
            <address className='grid gap-0.5 not-italic text-muted-foreground'>
              <span>Liam Johnson</span>
              <span>1234 Main St.</span>
              <span>Anytown, CA 12345</span>
            </address>
          </div>
          <div className='grid auto-rows-max gap-3'>
            <div className='font-semibold'>Billing Information</div>
            <div className='text-muted-foreground'>
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='grid gap-3'>
          <div className='font-semibold'>Payment Information</div>
          <dl className='grid gap-3'>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1 text-muted-foreground'>
                <CreditCard className='h-4 w-4' />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
        <div className='text-xs text-muted-foreground'>
          Updated <time dateTime='2023-11-23'>November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderDetails;
