import { AxiosPromise } from 'axios';
import createAxiosInstance from './client';
import { UserInsert, UserSelect } from '@e_commerce_package/models/types';

const userAxios = createAxiosInstance({
  baseURL: '/v1/users',
  withCredentials: true
});

const services = {
  getAll: async (): AxiosPromise<{
    users: UserSelect[];
  }> => {
    return userAxios.get('/read');
  },
  getOne: async (
    id: UserSelect['id']
  ): AxiosPromise<{
    user: UserSelect;
  }> => {
    return userAxios.get(`/read/${id}`);
  },
  createOne: async (
    data: UserInsert
  ): AxiosPromise<{
    user: UserSelect;
  }> => {
    return userAxios.post(`/create/`, data);
  },
  updateOne: async (
    id: UserSelect['id'],
    data: Partial<UserSelect>
  ): AxiosPromise<{
    user: UserSelect;
  }> => {
    return userAxios.patch(`/update/${id}`, data);
  },
  deleteOne: async (
    id: UserSelect['id']
  ): AxiosPromise<{
    user: UserSelect;
  }> => {
    return userAxios.delete(`/delete/${id}`);
  }
};

export default services;
