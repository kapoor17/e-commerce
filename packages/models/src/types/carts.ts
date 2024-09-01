import { CartItemSelect, CartSelect, ProductSelect } from '.';

export type CartWithCartItems = CartSelect & {
  cartItems: (CartItemSelect & { product: ProductSelect })[];
};

export {
  type CartInsert,
  type CartSelect,
  CartInsertSchema,
  CartSelectSchema
} from '../schemas/carts';
