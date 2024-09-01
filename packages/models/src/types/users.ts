import { UserSelect, UserInsert } from '../schemas/users';
import { CartSelect } from './carts';

export type RegisterUser = Pick<
  UserInsert,
  'email' | 'password' | 'first_name' | 'last_name'
>;

export type LoginUser = Pick<UserSelect, 'email' | 'password'>;
export type SafeUserSelect = Omit<UserSelect, 'password'>;
export type DetailedUserSelect = UserSelect & { cart: CartSelect };
export type SafeDetailedUserSelect = SafeUserSelect & { cart: CartSelect };

export {
  type UserInsert,
  type UserSelect,
  UserInsertSchema,
  UserSelectSchema
} from '../schemas/users';
