import {
  DetailedOrderItem,
  OrderItemSelect,
  OrderSelect,
  ProductSelect
} from '.';
import { SafeUserSelect } from './users';

export type DetailedOrder = OrderSelect & {
  orderItems: DetailedOrderItem[];
  user: SafeUserSelect;
};

export {
  type OrderInsert,
  type OrderSelect,
  OrderInsertSchema,
  OrderSelectSchema
} from '../schemas/orders';
