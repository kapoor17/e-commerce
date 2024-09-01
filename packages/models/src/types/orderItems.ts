import { OrderItemSelect } from '../schemas/orderItems';
import { ProductSelect } from './products';

export type DetailedOrderItem = OrderItemSelect & {
  product: ProductSelect;
};

export {
  type OrderItemInsert,
  type OrderItemSelect,
  OrderItemInsertSchema,
  OrderItemSelectSchema
} from '../schemas/orderItems';
