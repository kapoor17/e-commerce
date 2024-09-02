import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import { DetailedOrder, OrderSelect } from '@e_commerce_package/models/types';

const orderAxios = createAxiosInstance({
  baseURL: '/v1/orders',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    orders: DetailedOrder[];
  }> => {
    return orderAxios.get('/read');
  },
  getOne: async (
    id: OrderSelect['id']
  ): AxiosPromise<{
    order: DetailedOrder;
  }> => {
    return orderAxios.get(`/read/${id}`);
  },
  createOne: async (): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.post(`/create`);
  }
};

export default services;
