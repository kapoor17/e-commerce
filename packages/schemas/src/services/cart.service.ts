import { BaseServiceNew } from '@e_commerce_package/base-service';
import { CartSchema } from '../schemas';
import * as schemas from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export class ApiKeyService extends BaseServiceNew<
  typeof schemas,
  typeof CartSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, CartSchema, db.query.CartSchema);
  }
}
