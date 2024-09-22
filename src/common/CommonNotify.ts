import { useQuasar } from 'quasar';

export const useNotifications = () => {
  const $q = useQuasar();

  if (!$q) {
    console.log("존재하지 않는다");
  }

  const positiveNotify = (message: string) => {
    $q.notify({
      type: 'positive',
      message: message,
      position: 'top',
    });
  };

  const negativeNotify = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message,
      position: 'top',
    });
  };

  return { positiveNotify, negativeNotify };
};
