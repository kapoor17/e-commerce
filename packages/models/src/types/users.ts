import { UserSelect } from '../schemas/users';

export type SafeUserSelect = Omit<UserSelect, 'password'>;

export {
  type UserInsert,
  type UserSelect,
  UserInsertSchema,
  UserSelectSchema
} from '../schemas/users';
