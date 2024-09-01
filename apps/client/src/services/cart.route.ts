import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  CartInsert,
  CartSelect,
  CartWithCartItems
} from '@e_commerce_package/models/types';

const cartAxios = createAxiosInstance({
  baseURL: '/v1/carts',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    carts: CartSelect[];
  }> => {
    return cartAxios.get('/read');
  },
  getOne: async (
    id: CartSelect['id']
  ): AxiosPromise<{
    cart: CartWithCartItems;
  }> => {
    return cartAxios.get(`/read/${id}`);
  },
  createOne: async (
    data: CartInsert
  ): AxiosPromise<{
    cart: CartSelect;
  }> => {
    return cartAxios.post(`/create/`, data);
  },
  updateOne: async (
    id: CartSelect['id'],
    data: Partial<CartSelect>
  ): AxiosPromise<{
    cart: CartSelect;
  }> => {
    return cartAxios.patch(`/update/${id}`, data);
  },
  deleteOne: async (
    id: CartSelect['id']
  ): AxiosPromise<{
    cart: CartSelect;
  }> => {
    return cartAxios.delete(`/delete/${id}`);
  }
};

export default services;
