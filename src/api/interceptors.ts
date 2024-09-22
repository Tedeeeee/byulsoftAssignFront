import axios from 'axios';

export const setInterceptors = instance => {
  instance.interceptors.request.use(
    config => config,
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error.response.data);
    },
  );

  return instance;
};

export const createInstance = () => {
  const instance = axios.create({
    baseURL: `/api/`,
  });

  return setInterceptors(instance);
};

export const createInstanceWithAuth = url => {
  const instance = axios.create({
    baseURL: `/api/${url}`,
    withCredentials: true,
  });

  return setInterceptors(instance);
};
