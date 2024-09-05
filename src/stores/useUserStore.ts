import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = localStorage.getItem('user');

  const isLoggedIn = () => {
    return localStorage.getItem('user');
  };

  function setLoggedIn(value: boolean) {
    isLoggedIn.value = value;
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('user');
  }

  return { isLoggedIn, setLoggedIn, logout, user };
});
