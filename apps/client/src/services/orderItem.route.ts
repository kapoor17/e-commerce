import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  OrderItemInsert,
  OrderItemSelect
} from '@e_commerce_package/models/types';

const orderItemAxios = createAxiosInstance({
  baseURL: '/v1/orderItems',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    orderItems: OrderItemSelect[];
  }> => {
    return orderItemAxios.get('/orderItems/read');
  },
  getOne: async (
    id: OrderItemSelect['id']
  ): AxiosPromise<{
    orderItem: OrderItemSelect;
  }> => {
    return orderItemAxios.get(`/orderItems/read/${id}`);
  },
  createOne: async (
    data: OrderItemInsert
  ): AxiosPromise<{
    orderItem: OrderItemSelect;
  }> => {
    return orderItemAxios.post(`/orderItems/create/`, data);
  },
  updateOne: async (
    id: OrderItemSelect['id'],
    data: Partial<OrderItemSelect>
  ): AxiosPromise<{
    orderItem: OrderItemSelect;
  }> => {
    return orderItemAxios.patch(`/orderItems/update/${id}`, data);
  },
  deleteOne: async (
    id: OrderItemSelect['id']
  ): AxiosPromise<{
    orderItem: OrderItemSelect;
  }> => {
    return orderItemAxios.delete(`/orderItems/delete/${id}`);
  }
};

export default services;
