import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  DetailedOrder,
  OrderInsert,
  OrderSelect
} from '@e_commerce_package/models/types';

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
  createOne: async (
    data: OrderInsert
  ): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.post(`/create/`, data);
  },
  updateOne: async (
    id: OrderSelect['id'],
    data: Partial<OrderSelect>
  ): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.patch(`/update/${id}`, data);
  },
  deleteOne: async (
    id: OrderSelect['id']
  ): AxiosPromise<{
    order: OrderSelect;
  }> => {
    return orderAxios.delete(`/delete/${id}`);
  }
};

export default services;
