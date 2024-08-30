import { BaseServiceNew } from '@e_commerce_package/base-service';
import { CartItemSchema } from '../schemas';
import * as schemas from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export class ActionService extends BaseServiceNew<
  typeof schemas,
  typeof CartItemSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, CartItemSchema, db.query.CartItemSchema);
  }
}
