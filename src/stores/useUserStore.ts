import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(localStorage.getItem('user'));
  const isLoggedIn = computed(() => !!user.value);

  const logout = () => {
    localStorage.removeItem('user');
    user.value = '';
  };

  const login = nickname => {
    localStorage.setItem('user', nickname);
    user.value = nickname;
  };

  return { isLoggedIn, logout, login, user };
});
