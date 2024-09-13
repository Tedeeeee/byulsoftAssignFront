import { createInstance } from '@/api/common/interceptors';
import type { Post } from '@/type/BoardStarType';

const instance = createInstance();

export const checkNickname = (nickname: string) => {
  return instance.get('members/checkNickname', { params: { nickname: nickname } });
};

export const checkEmail = (email: string) => {
  return instance.get('members/checkEmail', {
    params: {
      email: email,
    },
  });
};

export const register = userData => {
  return instance.post('members/register', userData);
};

export const login = (email: string, password: string) => {
  return instance.post('login', { email, password });
};

export const getAllBoard = (pageNumber: number) => {
  return instance.get('boards/allBoard', {
    params: {
      pn: pageNumber,
    },
  });
};

export const sortBoardByCategory = async (sortName: string, sortType: string, pn: number): Promise<any> => {
  return instance.get('boards/sort', {
    params: {
      sortType: sortType,
      sortName: sortName,
      pn: pn,
    },
  });
};

export const getBoardById = async (id): Promise<Post> => {
  return instance.get(`boards/detail/${id}`);
};

export const findCommentsByBoardId = (boardId: number) => {
  return instance.get(`comments/${boardId}`);
};

export const getSortBoardByCategory = (name: string) => {
  return instance.get(`boards/${name}`);
};

export const getPostsCount = () => {
  return instance.get('boards/countPage');
};
