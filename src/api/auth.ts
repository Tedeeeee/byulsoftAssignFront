import { createInstance } from '@/api/common/interceptors';

const instance = createInstance();

export const checkNickname = (nickname: string) => {
  return instance.get('members/checkNickname', nickname);
};

export const checkEmail = (email: string) => {
  return instance.get('members/checkEmail', email);
};

export const register = userData => {
  return instance.post('members/register', userData);
};

export const login = (email: string, password: string) => {
  return instance.post('login', { email, password });
};

export const getAllBoard = () => {
  return instance.get('board/allBoard');
};

export const getBoardById = (id): number => {
  return instance.get(`board/detail/${id}`);
};
