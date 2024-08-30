import { BaseServiceNew } from '@e_commerce_package/base-service';
import { OrderItemSchema } from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schemas from '../schemas';

export class PermissionService extends BaseServiceNew<
  typeof schemas,
  typeof OrderItemSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, OrderItemSchema, db.query.OrderItemSchema);
  }
}
