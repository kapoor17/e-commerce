import { Express } from 'express';
import authRouter from '../routes/auth.route';
import { isAuthenticated } from '../middlewares';
import userRouter from '../routes/user.route';
import productRouter from '../routes/product.route';
import orderRouter from '../routes/order.route';
import cartRouter from '../routes/cart.route';
import cartItemRouter from '../routes/cartItem.route';
import orderItemRouter from '../routes/orderItem.route';
import reviewRouter from '../routes/review.route';

const routesLoader = (app: Express) => {
  app.use('/api/v1/auth', authRouter);
  app.use(isAuthenticated);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/products', productRouter);
  app.use('/api/v1/orders', orderRouter);
  app.use('/api/v1/orderItems', orderItemRouter);
  app.use('/api/v1/carts', cartRouter);
  app.use('/api/v1/cartItems', cartItemRouter);
  app.use('/api/v1/reviews', reviewRouter);
};

export default routesLoader;
