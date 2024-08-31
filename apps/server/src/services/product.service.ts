import { client } from '../models';
import { ProductService as BaseProductService } from '@e_commerce_package/models/services';

class ProductService extends BaseProductService {
  constructor() {
    super(client);
  }
}

export default new ProductService();
