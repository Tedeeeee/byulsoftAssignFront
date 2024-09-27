import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userNickname = ref(localStorage.getItem('user'));
  const isLoggedIn = computed(() => !!userNickname.value);

  const logout = () => {
    localStorage.removeItem('user');
    userNickname.value = '';
  };

  const login = nickname => {
    localStorage.setItem('user', nickname);
    userNickname.value = nickname;
  };

  return { isLoggedIn, logout, login, userNickname };
});
