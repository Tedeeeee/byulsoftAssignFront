import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import Board from '@/components/board/Main.vue';
import InsertPost from '@/components/content/InsertPost.vue';
import UpdatePost from '@/components/content/UpdatePost.vue';
import Post from '@/components/post/Main.vue';

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
      path: '/insertPost',
      name: 'InsertPost',
      component: InsertPost,
    },
    {
      path: '/updatePost/:id',
      name: 'UpdatePost',
      component: UpdatePost,
      props: true,
    },
    {
      path: '/:id',
      name: 'Post',
      component: Post,
      props: true,
    },
  ],
});

export default router;
