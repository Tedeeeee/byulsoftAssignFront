import axios from 'axios';
import { Notify } from 'quasar';
import { useUserStore } from '@/stores/useUserStore';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const setInterceptors = instance => {
  instance.interceptors.request.use(
    config => config,
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      if (getCookie('nickname')) {
        const decodeNickname = decodeURIComponent(getCookie('nickname'));
        useUserStore().login(decodeNickname);
      }
      const status = response.data.statusCode;
      switch (status) {
        case 401:
          Notify.create({
            type: 'error',
            message: response.data.message,
            position: 'top',
          });
          break;
        case 404:
          Notify.create({
            type: 'error',
            message: response.data.message,
            position: 'top',
          });
          break;
      }
      return response;
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
