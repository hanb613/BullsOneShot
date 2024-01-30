import { baseUrl } from '@constants/baseUrl';
// eslint-disable-next-line import/named
import AxiosS, { AxiosRequestConfig } from 'axios';

const axios = AxiosS.create();
export const authAxios = AxiosS.create();
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
authAxios.defaults.baseURL = baseUrl;
authAxios.defaults.withCredentials = true;

export const http = {
  get: async function get<Response = unknown>(
    url: string,
    header?: AxiosRequestConfig['headers']
  ) {
    const options: AxiosRequestConfig = {
      headers: header,
    };

    const res = await axios.get<Response>(url, options);
    return res.data;
  },
  post: async function post<Response = unknown, Request = unknown>(
    url: string,
    body?: Request,
    header?: AxiosRequestConfig['headers']
  ) {
    const options: AxiosRequestConfig = {
      headers: header,
    };

    const res = await axios.post<Response>(url, body, options);
    return res.data;
  },
};

export const authHttp = {
  get: async function get<Response = unknown>(
    url: string,
    header?: AxiosRequestConfig['headers'],
    params?: object
  ) {
    const options: AxiosRequestConfig = {
      headers: header,
      params: params,
    };
    const res = await authAxios.get<Response>(url, options);
    return res.data;
  },

  post: async function post<Response = unknown, Request = unknown>(
    url: string,
    body?: Request,
    header?: AxiosRequestConfig['headers']
  ) {
    const options: AxiosRequestConfig = {
      headers: header,
    };

    const res = await authAxios.post<Response>(url, body, options);
    return res.data;
  },

  put: async function put<Response = unknown, Request = unknown>(
    url: string,
    body?: Request,
    header?: AxiosRequestConfig['headers']
  ) {
    const options: AxiosRequestConfig = {
      headers: header,
    };

    const res = await authAxios.put<Response>(url, body, options);
    return res.data;
  },
  delete: async function axiosDelete<Response = unknown>(
    url: string,
    header?: AxiosRequestConfig['headers']
  ) {
    const options: AxiosRequestConfig = {
      headers: header,
    };
    const res = await authAxios.delete<Response>(url, options);
    return res.data;
  },
};
