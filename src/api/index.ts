import { createInstanceWithAuth } from '@/api/common/interceptors';

export const healthCheck = () => {
  const instance = createInstanceWithAuth('members/healthCheck');
  return instance.get();
};

export const insertContents = data => {
  const instance = createInstanceWithAuth('boards/insertContents');
  return instance.post('', data);
};

export const updateContents = async data => {
  const instance = createInstanceWithAuth('boards/updateContents');
  return instance.patch('', data);
};

export const insertComment = data => {
  const instance = createInstanceWithAuth(`comments`);
  return instance.post('', data);
};

export const deleteContents = id => {
  const instance = createInstanceWithAuth(`comments/${id}`);
  return instance.delete();
};

export const deleteRefreshToken = () => {
  const instance = createInstanceWithAuth('members');
  return instance.patch();
};

export const editCommentText = data => {
  const instance = createInstanceWithAuth('comments');
  return instance.patch('', data);
};

export const deleteBoard = id => {
  const instance = createInstanceWithAuth(`boards/${id}`);
  return instance.delete();
};
