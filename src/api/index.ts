import { instanceWithAuth } from '@/api/interceptors';

export const insertPost = data => {
  return instanceWithAuth.post('boards', data);
};

export const updatePost = async data => {
  return instanceWithAuth.put('boards', data);
};

export const deletePostById = async (id: number) => {
  const response = await instanceWithAuth.delete(`boards/${id}`);

  return response.body;
};

export const insertComment = async data => {
  return instanceWithAuth.post('comments', data);
};

export const deleteCommentById = (id: number) => {
  return instanceWithAuth.delete(`comments/${id}`);
};

export const logout = () => {
  return instanceWithAuth.delete('members/logout');
};

export const updateComment = data => {
  return instanceWithAuth.put('comments', data);
};
