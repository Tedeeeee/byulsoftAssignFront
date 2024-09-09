import { createInstanceWithAuth } from '@/api/common/interceptors';

export const healthCheck = () => {
  const instance = createInstanceWithAuth('members/healthCheck');
  return instance.get();
};

export const insertContents = data => {
  const instance = createInstanceWithAuth('board/insertContents');
  return instance.post('', data);
};

export const insertComment = (boardId, data) => {
  const instance = createInstanceWithAuth(`comment`);
  return instance.post('', data);
};
