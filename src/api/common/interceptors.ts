import axios from 'axios';

export const setInterceptors = instance => {
  instance.interceptors.request.use(
    config => config,
    error => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
  );

  return instance;
};

export const createInstance = () =>
  axios.create({
    baseURL: `/api/`,
  });

export const createInstanceWithAuth = url => {
  const instance = axios.create({
    baseURL: `/api/${url}`,
    withCredentials: true,
  });

  return setInterceptors(instance);
};
