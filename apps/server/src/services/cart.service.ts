import {
  CartInsert,
  CartSelect,
  CartWithCartItems
} from '@e_commerce_package/models/types';
import { client } from '../models';
import { CartService as BaseCartService } from '@e_commerce_package/models/services';

class CartService extends BaseCartService {
  constructor() {
    super(client);
  }

  public async findOne(data: Partial<CartInsert>): Promise<CartWithCartItems> {
    const cart = (await super.findOne(data, {
      with: {
        cartItems: {
          with: {
            product: true
          }
        }
      }
    })) as CartWithCartItems;

    return cart;
  }
}

export default new CartService();
