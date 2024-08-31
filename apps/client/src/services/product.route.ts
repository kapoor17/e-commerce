import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import { ProductInsert, ProductSelect } from '@e_commerce_package/models/types';

const productAxios = createAxiosInstance({
  baseURL: '/v1/products',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    products: ProductSelect[];
  }> => {
    return productAxios.get('/products/read');
  },
  getOne: async (
    id: ProductSelect['id']
  ): AxiosPromise<{
    product: ProductSelect;
  }> => {
    return productAxios.get(`/products/read/${id}`);
  },
  createOne: async (
    data: ProductInsert
  ): AxiosPromise<{
    product: ProductSelect;
  }> => {
    return productAxios.post(`/products/create/`, data);
  },
  updateOne: async (
    id: ProductSelect['id'],
    data: Partial<ProductSelect>
  ): AxiosPromise<{
    product: ProductSelect;
  }> => {
    return productAxios.patch(`/products/update/${id}`, data);
  },
  deleteOne: async (
    id: ProductSelect['id']
  ): AxiosPromise<{
    product: ProductSelect;
  }> => {
    return productAxios.delete(`/products/delete/${id}`);
  }
};

export default services;
