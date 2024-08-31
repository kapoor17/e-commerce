import { client } from '../models';
import { CartService as BaseCartService } from '@e_commerce_package/models/services';

class CartService extends BaseCartService {
  constructor() {
    super(client);
  }
}

export default new CartService();
