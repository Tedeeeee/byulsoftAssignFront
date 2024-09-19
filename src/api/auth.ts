import { createInstance } from '@/api/interceptors';
import type { Post } from '@/type/BoardStarType';
import type { SearchCondition } from '@/type/Board';

const instance = createInstance();

export const checkNickname = (nickname: string) => {
  return instance.get('members/nicknames/check', {
    params: {
      nickname: nickname,
    },
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

export const getAllBoard = (searchType: string, searchText: string, pageNumber: number) => {
  return instance.get('boards/basic', {
    params: {
      searchType: searchType,
      searchText: searchText,
      pageNumber: pageNumber,
    },
  });
};

export const sortBoardByCategory = async (
  sortOrder: string,
  sortType: string,
  pageNumber: number,
  searchType: string,
  searchText: string,
): Promise<SearchCondition> => {
  return instance.get('boards/sort', {
    params: {
      sortOrder: sortOrder,
      sortType: sortType,
      pageNumber: pageNumber,
      searchType: searchType,
      searchText: searchText,
    },
  });
};

export const getBoardById = async (boardId: number): Promise<Post> => {
  console.log(boardId);
  return instance.get(`boards/${boardId}`);
};

export const findCommentsByBoardId = (boardId: number) => {
  return instance.get(`comments/${boardId}`);
};

export const getSortBoardByCategory = (name: string) => {
  return instance.get(`boards/${name}`);
};

export const getPostsCount = (searchType: string, searchText: string) => {
  return instance.get('boards/count', {
    params: {
      searchType: searchType,
      searchText: searchText,
    },
  });
};
