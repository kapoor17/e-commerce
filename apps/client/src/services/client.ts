import Axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from '@/hooks/use-toast';

const createAxiosInstance = (defaults: {
  baseURL: string;
  withCredentials: boolean;
}): AxiosInstance => {
  const axios = Axios.create();
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (e: AxiosError<any>) => {
      return Promise.reject(e);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<any>) => {
      if (error.response?.status === 422) {
        const errors = JSON.parse(error.response?.data.error) as Array<{
          code: string;
          expected: string;
          message: string;
          path: Array<string>;
          recieved: string;
        }>;

        errors.forEach((error) =>
          toast({
            variant: 'destructive',
            title: `Type Error in ${error.path}`,
            description: error.message
          })
        );
      } else {
        toast({
          variant: 'destructive',
          title: error.message,
          description: error.response?.data.error.toUpperCase()
        });
      }
      return Promise.reject(error);
    }
  );

  axios.defaults.baseURL = 'http://localhost:4000/api' + defaults.baseURL;
  axios.defaults.withCredentials = defaults.withCredentials;

  return axios;
};

export default createAxiosInstance;
