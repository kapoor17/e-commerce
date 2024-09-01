import { ProductSelect, ReviewSelect, SafeUserSelect } from '.';

export type ProductWithReview = ProductSelect & {
  reviews: (ReviewSelect & { user: Pick<SafeUserSelect, 'first_name'> })[];
};

export {
  type ProductInsert,
  type ProductSelect,
  ProductInsertSchema,
  ProductSelectSchema
} from '../schemas/products';
