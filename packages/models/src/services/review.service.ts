import { BaseService } from '@e_commerce_package/base-service';
import { ReviewSchema } from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schemas from '../schemas';

export class ReviewService extends BaseService<
  typeof schemas,
  typeof ReviewSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, ReviewSchema, db.query.ReviewSchema);
  }
}
