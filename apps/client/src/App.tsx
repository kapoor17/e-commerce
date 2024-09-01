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
          </Route>
        </Route>
      </Route>
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
