import { client } from '../models';
import { CartItemService as BaseCartItemService } from '@e_commerce_package/models/services';

class CartItemService extends BaseCartItemService {
  constructor() {
    super(client);
  }
}

export default new CartItemService();
