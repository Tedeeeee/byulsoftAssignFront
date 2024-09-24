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
      return Promise.reject(error);
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

export const createNewInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: `/api/`,
    withCredentials: true,
  });

  return setInterceptors(instance);
};

export const instance = createInstance();
export const instanceWithAuth = createNewInstanceWithAuth();
