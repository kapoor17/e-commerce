import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import { ReviewInsert, ReviewSelect } from '@e_commerce_package/models/types';

const reviewAxios = createAxiosInstance({
  baseURL: '/v1/reviews',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    reviews: ReviewSelect[];
  }> => {
    return reviewAxios.get('/read');
  },
  getOne: async (
    id: ReviewSelect['id']
  ): AxiosPromise<{
    review: ReviewSelect;
  }> => {
    return reviewAxios.get(`/read/${id}`);
  },
  createOne: async (
    data: ReviewInsert
  ): AxiosPromise<{
    review: ReviewSelect;
  }> => {
    return reviewAxios.post(`/create/`, data);
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
