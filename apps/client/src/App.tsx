import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import { SignupForm, SigninForm } from './views/auth';
import { PrivateRoutes, PublicRoutes } from './components/utility/routes';
import { DashboardLayout } from './components/composite/DashboardLayout';
import Catalog from './views/products/Catalog';
import Product from './views/products/Product';
import Cart from './views/cart/Cart';
import Orders from './views/orders/Orders';
import CreateReview from './views/reviews/CreateReview';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/'>
        <Route index element={<Navigate to='/products' />} />
        <Route element={<PublicRoutes />}>
          <Route path='sign-up' element={<SignupForm />} />
          <Route path='sign-in' element={<SigninForm />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path='products' element={<Catalog />} />
            <Route path='products/:productId' element={<Product />} />
            <Route path='cart' element={<Cart />} />
            <Route path='orders' element={<Orders />} />
            <Route path='reviews/:productId' element={<CreateReview />} />
          </Route>
        </Route>
      </Route>
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
