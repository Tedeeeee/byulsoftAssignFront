import { createInstance } from '@/api/interceptors';
import type { Post } from '@/type/BoardStarType';

const instance = createInstance();

export const checkNickname = (nickname: string) => {
  return instance.get('members/nicknames/check', {
    params: {
      nickname: nickname
    }
  });
};

export const checkEmail = (email: string) => {
  return instance.get('members/emails/check', {
    params: {
      email: email,
    },
  });
};

export const register = userData => {
  return instance.post('members/register', userData);
};

export const login = (memberEmail: string, memberPassword: string) => {
  return instance.post('login', { memberEmail, memberPassword });
};

export const getAllBoard = (pageNumber: number) => {
  return instance.get('boards', {
    params: {
      pn: pageNumber,
    },
  });
};

export const sortBoardByCategory = async (sortOrder: string, sortType: string, pn: number): Promise<any> => {
  return instance.get('boards/sort', {
    params: {
      sortOrder: sortOrder,
      sortType: sortType,
      pn: pn,
    },
  });
};

export const getBoardById = async (id): Promise<Post> => {
  return instance.get(`boards/${id}`);
};

export const findCommentsByBoardId = (boardId: number) => {
  return instance.get(`comments/${boardId}`);
};

export const getSortBoardByCategory = (name: string) => {
  return instance.get(`boards/${name}`);
};

export const getPostsCount = () => {
  return instance.get('boards/count');
};
