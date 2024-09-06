import { createInstance, createInstanceWithAuth } from '@/api/common/interceptors';

export const healthCheck = () => {
  const instance = createInstanceWithAuth('members/healthCheck');
  return instance.get();
};

export const post = () => {};
