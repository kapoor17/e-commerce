import {
  DetailedUserSelect,
  UserInsert,
  UserSelect
} from '@e_commerce_package/models/types';
import { client } from '../models';
import { UserService as BaseUserService } from '@e_commerce_package/models/services';

class UserService extends BaseUserService {
  constructor() {
    super(client);
  }

  public async findOne(data: Partial<UserInsert>): Promise<DetailedUserSelect> {
    const user = (await super.findOne(data, {
      with: {
        cart: true
      }
    })) as DetailedUserSelect;

    return user;
  }
}

export default new UserService();
