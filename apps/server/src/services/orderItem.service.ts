import {
  OrderItemInsert,
  OrderItemSelect
} from '@e_commerce_package/models/types';
import { client } from '../models';
import { OrderItemService as BaseOrderItemService } from '@e_commerce_package/models/services';
import ProductService from './product.service';
import { BadRequestError } from '@e_commerce_package/errors';

class OrderItemService extends BaseOrderItemService {
  constructor() {
    super(client);
  }

  public async createOne(data: OrderItemInsert): Promise<OrderItemSelect> {
    const { productId, quantity } = data;

    const product = await ProductService.findOne({
      id: productId
    });

    if (product.inventory < quantity)
      throw new BadRequestError('Product out of stock');

    await ProductService.updateOne(productId, {
      inventory: product.inventory - quantity
    });

    const orderItem = await super.createOne(data);

    return orderItem;
  }
}

export default new OrderItemService();
