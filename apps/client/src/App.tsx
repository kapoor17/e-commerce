import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import { SignupForm, SigninForm } from './views/auth';
import { PublicRoutes } from './components/utility/routes';

import { DashboardLayout } from './components/composite/DashboardLayout';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/'>
        <Route index element={<Navigate to='/dashboard' />} />
        <Route element={<PublicRoutes />}>
          <Route path='sign-up' element={<SignupForm />} />
          <Route path='sign-in' element={<SigninForm />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='dashboard' element={<DashboardLayout />}></Route>
        </Route>
      </Route>
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
