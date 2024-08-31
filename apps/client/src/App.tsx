import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import { SignupForm, SigninForm } from './views/auth';
import { PublicRoutes } from './components/utility/routes';
import Product from './views/products/Product';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/'>
        <Route index element={<Navigate to='/sign-up' />} />
        <Route element={<PublicRoutes />}>
          <Route path='sign-up' element={<SignupForm />} />
          <Route path='sign-in' element={<SigninForm />} />
          <Route path='dashboard' element={<Product />} />
        </Route>
      </Route>
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
