import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import Board from '@/components/Board.vue';
import InsertWriteComponent from '@/components/content/InsertWriteComponent.vue';
import UpdateWriteComponent from '@/components/content/UpdateWriteComponent.vue';
import PostDetail from '@/components/PostDetail.vue';

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
      path: '/',
      name: 'Board',
      component: Board,
    },
    {
      path: '/insertWrite',
      name: 'InsertWriteComponent',
      component: InsertWriteComponent,
    },
    {
      path: '/updateWrite/:id',
      name: 'UpdateWriteComponent',
      component: UpdateWriteComponent,
      props: true,
    },
    {
      path: '/detail/:id',
      name: 'PostDetail',
      component: PostDetail,
      props: true,
    },
  ],
});

export default router;
