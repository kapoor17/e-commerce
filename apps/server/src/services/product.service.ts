import {
  ProductInsert,
  ProductWithReview
} from '@e_commerce_package/models/types';
import { client } from '../models';
import { ProductService as BaseProductService } from '@e_commerce_package/models/services';

class ProductService extends BaseProductService {
  constructor() {
    super(client);
  }

  public async findOne(
    data: Partial<ProductInsert>
  ): Promise<ProductWithReview> {
    const product = (await super.findOne(data, {
      with: {
        reviews: {
          with: {
            user: {
              columns: {
                first_name: true
              }
            }
          }
        }
      }
    })) as ProductWithReview;

    return product;
  }
}

export default new ProductService();
