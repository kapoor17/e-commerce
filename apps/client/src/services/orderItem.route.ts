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
  getOne: async (
    id: OrderItemSelect['id']
  ): AxiosPromise<{
    orderItem: OrderItemSelect;
  }> => {
    return orderItemAxios.get(`/read/${id}`);
  },
  createOne: async (
    data: OrderItemInsert
  ): AxiosPromise<{
    orderItem: OrderItemSelect;
  }> => {
    return orderItemAxios.post(`/create/`, data);
  }
};

export default services;
