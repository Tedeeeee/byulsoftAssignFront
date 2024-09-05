import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(localStorage.getItem('user') !== null);
  const user = localStorage.getItem('user');

  function setLoggedIn(value: boolean) {
    isLoggedIn.value = value;
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('user');
  }

  return { isLoggedIn, setLoggedIn, logout, user };
});
