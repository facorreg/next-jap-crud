import axios from 'axios';
import { useAtom } from 'jotai';

import { meAtom } from '@atoms';

const axiosInstance = (token) => {
  const instance = axios.create();

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

const useAxios = () => {
  const { token } = useAtom(meAtom);

  const myAxios = axiosInstance(token);

  return { axios: myAxios };
};

export default useAxios;
