import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import { OrderInsert, OrderSelect } from '@e_commerce_package/models/types';

const orderAxios = createAxiosInstance({
  baseURL: '/v1/orders',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    orders: OrderSelect[];
  }> => {
    return orderAxios.get('/orders/read');
  },
  getOne: async (
    id: OrderSelect['id']
  ): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.get(`/orders/read/${id}`);
  },
  createOne: async (
    data: OrderInsert
  ): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.post(`/orders/create/`, data);
  },
  updateOne: async (
    id: OrderSelect['id'],
    data: Partial<OrderSelect>
  ): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.patch(`/orders/update/${id}`, data);
  },
  deleteOne: async (
    id: OrderSelect['id']
  ): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.delete(`/orders/delete/${id}`);
  }
};

export default services;
