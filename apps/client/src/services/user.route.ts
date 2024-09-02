import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import { UserSelect } from '@e_commerce_package/models/types';

const userAxios = createAxiosInstance({
  baseURL: '/v1/users',
  withCredentials: true
});

const services = {
  getOne: async (): AxiosPromise<{
    user: UserSelect;
  }> => {
    return userAxios.get(`/read`);
  }
};

export default services;
