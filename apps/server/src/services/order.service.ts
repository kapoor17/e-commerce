import { client } from '../models';
import { OrderService as BaseOrderService } from '@e_commerce_package/models/services';

class OrderService extends BaseOrderService {
  constructor() {
    super(client);
  }
}

export default new OrderService();
