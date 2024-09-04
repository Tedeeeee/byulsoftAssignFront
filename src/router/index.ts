import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import Board from '@/components/board.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/Board',
      name: 'Board',
      component: Board,
    },
  ],
});

export default router;
