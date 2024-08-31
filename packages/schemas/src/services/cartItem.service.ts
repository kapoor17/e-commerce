import { BaseService } from '@e_commerce_package/base-service';
import { CartItemSchema } from '../schemas';
import * as schemas from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export class CartItemService extends BaseService<
  typeof schemas,
  typeof CartItemSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, CartItemSchema, db.query.CartItemSchema);
  }
}
