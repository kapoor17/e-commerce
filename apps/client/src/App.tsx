import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import { SignupForm, SigninForm } from './views/Authentication';
import { PublicRoutes } from './components/utility/routes';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/'>
        <Route index element={<Navigate to='/sign-up' />} />
        <Route element={<PublicRoutes />}>
          <Route path='sign-up' element={<SignupForm />} />
          <Route path='sign-in' element={<SigninForm />} />
        </Route>
      </Route>
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
