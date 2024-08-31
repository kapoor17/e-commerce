import { client } from '../models';
import { OrderItemService as BaseOrderItemService } from '@e_commerce_package/models/services';

class OrderItemService extends BaseOrderItemService {
  constructor() {
    super(client);
  }
}

export default new OrderItemService();
