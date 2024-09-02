import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  CartItemInsert,
  CartItemSelect,
  CartSelect
} from '@e_commerce_package/models/types';

const cartItemAxios = createAxiosInstance({
  baseURL: '/v1/cartItems',
  withCredentials: true
});

const services = {
  getAll: async (
    cartId: CartSelect['id']
  ): AxiosPromise<{
    cartItems: CartItemSelect[];
  }> => {
    return cartItemAxios.get(`/read/${cartId}`);
  },
  getOne: async (
    id: CartItemSelect['id']
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.get(`/read/${id}`);
  },
  createOne: async (
    data: CartItemInsert
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.post(`/create`, data);
  },
  updateOne: async (
    id: CartItemSelect['id'],
    data: Partial<CartItemSelect>
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.patch(`/update/${id}`, data);
  },
  deleteOne: async (
    id: CartItemSelect['id']
  ): AxiosPromise<{
    cartItem: CartItemSelect;
  }> => {
    return cartItemAxios.delete(`/delete/${id}`);
  }
};

export default services;
