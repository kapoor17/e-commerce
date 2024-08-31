import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  CartItemInsert,
  CartItemSelect
} from '@e_commerce_package/models/types';

const cartItemAxios = createAxiosInstance({
  baseURL: '/v1/cartItems',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    cartItems: CartItemSelect[];
  }> => {
    return cartItemAxios.get('/cartItems/read');
  },
  getOne: async (
    id: CartItemSelect['id']
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.get(`/cartItems/read/${id}`);
  },
  createOne: async (
    data: CartItemInsert
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.post(`/cartItems/create/`, data);
  },
  updateOne: async (
    id: CartItemSelect['id'],
    data: Partial<CartItemSelect>
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.patch(`/cartItems/update/${id}`, data);
  },
  deleteOne: async (
    id: CartItemSelect['id']
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.delete(`/cartItems/delete/${id}`);
  }
};

export default services;
