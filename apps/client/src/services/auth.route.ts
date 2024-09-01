import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  LoginUser,
  SafeDetailedUserSelect,
  SafeUserSelect,
  UserInsert
} from '@e_commerce_package/models/types';

const authAxios = createAxiosInstance({
  baseURL: '/v1/auth',
  withCredentials: true
});

const services = {
  signUp: (data: UserInsert): AxiosPromise<{ user: SafeUserSelect }> => {
    return authAxios.post('/sign-up', data);
  },
  signIn: (data: LoginUser): AxiosPromise<{ user: SafeUserSelect }> => {
    return authAxios.post(`/sign-in`, data);
  },
  status: (): AxiosPromise<{
    user: SafeDetailedUserSelect | null;
    isAuthenticated: boolean;
  }> => {
    return authAxios.get(`/status`);
  },
  signOut: (): AxiosPromise<{ message: string }> => {
    return authAxios.post(`/sign-out`);
  }
};

export default services;
