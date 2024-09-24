import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import Board from '@/components/board/BoardMain.vue';
import InsertPost from '@/components/content/InsertPost.vue';
import UpdatePost from '@/components/content/UpdatePost.vue';
import PostDetail from '@/components/post/PostMain.vue';

console.log('test');
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
      path: '/updatePost/:boardId',
      name: 'UpdatePost',
      component: UpdatePost,
      props: true,
    },
    {
      path: '/:boardId',
      name: 'PostDetail',
      component: PostDetail,
      props: true,
    },
  ],
});

export default router;
