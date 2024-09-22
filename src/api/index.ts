import { createInstanceWithAuth } from '@/api/interceptors';

export const insertPost = data => {
  const instance = createInstanceWithAuth('boards');
  return instance.post('', data);
};

export const updatePost = async data => {
  const instance = createInstanceWithAuth('boards');
  return instance.put('', data);
};

export const deletePostById = async (id: number) => {
  const instance = createInstanceWithAuth(`boards/${id}`);
  return instance.delete('');
};

export const insertComment = async data => {
  const instance = createInstanceWithAuth(`comments`);
  return instance.post('', data);
};

export const deleteCommentById = (id: number) => {
  const instance = createInstanceWithAuth(`comments/${id}`);
  return instance.delete();
};

export const logout = () => {
  const instance = createInstanceWithAuth('members/logout');
  return instance.patch();
};

export const updateComment = data => {
  const instance = createInstanceWithAuth('comments');
  return instance.put('', data);
};

export const deleteBoard = id => {
  const instance = createInstanceWithAuth(`boards/${id}`);
  return instance.delete();
};
