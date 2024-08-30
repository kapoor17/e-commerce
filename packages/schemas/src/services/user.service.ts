import { BaseServiceNew } from '@e_commerce_package/base-service';
import { UserSchema } from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schemas from '../schemas';

export class UserService extends BaseServiceNew<
  typeof schemas,
  typeof UserSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, UserSchema, db.query.UserSchema);
  }
}
