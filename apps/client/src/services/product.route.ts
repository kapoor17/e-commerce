import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  ProductInsert,
  ProductSelect,
  ProductWithReview
} from '@e_commerce_package/models/types';

const productAxios = createAxiosInstance({
  baseURL: '/v1/products',
  withCredentials: true
});

const services = {
  getAll: async (data: {
    name: ProductSelect['name'];
  }): AxiosPromise<{
    products: ProductSelect[];
  }> => {
    return productAxios.get(data.name ? `/read?name=${data.name}` : '/read');
  },
  getOne: async (
    id: ProductSelect['id']
  ): AxiosPromise<{
    product: ProductWithReview;
  }> => {
    return productAxios.get(`/read/${id}`);
  },
  createOne: async (
    data: ProductInsert
  ): AxiosPromise<{
    product: ProductSelect;
  }> => {
    return productAxios.post(`/create`, data);
  }
};

export default services;
