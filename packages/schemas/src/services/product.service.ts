import { BaseServiceNew } from '@e_commerce_package/base-service';
import { ProductSchema } from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schemas from '../schemas';

export class PermissionActionService extends BaseServiceNew<
  typeof schemas,
  typeof ProductSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, ProductSchema, db.query.ProductSchema);
  }
}
