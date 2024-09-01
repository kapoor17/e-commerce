import { DetailedOrder, OrderInsert } from '@e_commerce_package/models/types';
import { client } from '../models';
import { OrderService as BaseOrderService } from '@e_commerce_package/models/services';

class OrderService extends BaseOrderService {
  constructor() {
    super(client);
  }

  public async findMany(
    data: Partial<OrderInsert> = {}
  ): Promise<DetailedOrder[]> {
    const order = (await super.findMany(data, {
      with: {
        orderItems: {
          with: {
            product: true
          }
        },
        user: true
      }
    })) as DetailedOrder[];

    return order;
  }

  public async findOne(data: Partial<OrderInsert>): Promise<DetailedOrder> {
    const order = (await super.findOne(data, {
      with: {
        orderItems: {
          with: {
            product: true
          }
        },
        user: true
      }
    })) as DetailedOrder;

    return order;
  }
}

export default new OrderService();
