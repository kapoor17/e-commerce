import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import {
  ProductSelect,
  ReviewInsert,
  ReviewSelect
} from '@e_commerce_package/models/types';

const reviewAxios = createAxiosInstance({
  baseURL: '/v1/reviews',
  withCredentials: true
});

const services = {
  getAll: async (
    productId: ProductSelect['id']
  ): AxiosPromise<{
    reviews: ReviewSelect[];
  }> => {
    return reviewAxios.get(`/read/${productId}`);
  },
  getOne: async (
    id: ReviewSelect['id']
  ): AxiosPromise<{
    review: ReviewSelect;
  }> => {
    return reviewAxios.get(`/read/${id}`);
  },
  createOne: async (
    data: Omit<ReviewInsert, 'userId'>
  ): AxiosPromise<{
    review: ReviewSelect;
  }> => {
    return reviewAxios.post(`/create`, data);
  },
  updateOne: async (
    id: ReviewSelect['id'],
    data: Partial<ReviewSelect>
  ): AxiosPromise<{
    review: ReviewSelect;
  }> => {
    return reviewAxios.patch(`/update/${id}`, data);
  },
  deleteOne: async (
    id: ReviewSelect['id']
  ): AxiosPromise<{
    review: ReviewSelect;
  }> => {
    return reviewAxios.delete(`/delete/${id}`);
  }
};

export default services;
