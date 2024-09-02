import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  CartSelect,
  CartWithCartItems
} from '@e_commerce_package/models/types';

const cartAxios = createAxiosInstance({
  baseURL: '/v1/carts',
  withCredentials: true
});

const services = {
  getOne: async (): AxiosPromise<{
    cart: CartWithCartItems;
  }> => {
    return cartAxios.get(`/read`);
  },
  createOne: async (): AxiosPromise<{
    cart: CartSelect;
  }> => {
    return cartAxios.post(`/create`);
  }
};

export default services;
