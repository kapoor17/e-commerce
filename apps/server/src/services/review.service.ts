import { client } from '../models';
import { ReviewService as BaseReviewService } from '@e_commerce_package/models/services';

class ReviewService extends BaseReviewService {
  constructor() {
    super(client);
  }
}

export default new ReviewService();
