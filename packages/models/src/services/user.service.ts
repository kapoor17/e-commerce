import { BaseService } from '@e_commerce_package/base-service';
import { UserSchema } from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schemas from '../schemas';
import { UserInsert, UserSelect } from '../types';
import bcrypt from 'bcrypt';
import { BadRequestError } from '@e_commerce_package/errors';

export class UserService extends BaseService<
  typeof schemas,
  typeof UserSchema
> {
  constructor(db: PostgresJsDatabase<typeof schemas>) {
    super(db, UserSchema, db.query.UserSchema);
  }

  public async createOne(data: UserInsert): Promise<UserSelect> {
    return super.createOne({
      ...data,
      password: await this.hashPassword(data.password)
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }

  static async comparePassword(password: string, hash: string): Promise<void> {
    const doesPasswordMatch = await bcrypt.compare(password, hash);
    if (!doesPasswordMatch) {
      throw new BadRequestError('Wrong Password');
    }
  }
}
