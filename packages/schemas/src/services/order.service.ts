import { BaseServiceNew } from '@e_commerce_package/base-service';
import { OrderSchema } from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schemas from '../schemas';

export class ModuleService extends BaseServiceNew<
  typeof schemas,
  typeof OrderSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, OrderSchema, db.query.OrderSchema);
  }
}
