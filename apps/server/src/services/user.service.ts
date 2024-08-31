import { client } from '../models';
import { UserService as BaseUserService } from '@e_commerce_package/models/services';

class UserService extends BaseUserService {
  constructor() {
    super(client);
  }
}

export default new UserService();
