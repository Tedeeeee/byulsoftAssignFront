<template>
  <q-layout view="hHh lpR fff">
    <q-header reveal elevated class="bg-tera text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title @click="goHome" class="cursor-pointer">
          <q-avatar>
            <img :src="logo" alt="Logo" />
          </q-avatar>
          요방어때
        </q-toolbar-title>

        <div class="q-pa-md q-gutter-sm">
          <q-btn to="/" color="black" label="목록" />
          <template v-if="userStore.isLoggedIn">
            <q-btn flat :label="userStore.userNickname" class="custom-link" />
            <q-btn to="/insertWrite" color="black" label="글쓰기" />
            <q-btn @click="handleLogout" color="black" label="로그아웃" />
          </template>
          <template v-else>
            <q-btn to="/login" color="black" label="로그인" />
            <q-btn to="/signUp" color="black" label="회원가입" />
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-none">
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white" height-hint="50">
      <q-toolbar class="justify-center">
        <q-toolbar-title class="row items-center justify-center">
          <div>이곳은 방탈출 리뷰 커뮤니티입니다</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import logo from './assets/로고.png';
import { deleteRefreshToken } from '@/api';
import { computed, ref } from 'vue';

const searchQuery = ref('');
const router = useRouter();
const userStore = useUserStore();

const goHome = () => {
  router.push('/');
};

const showSearch = computed(() => {
  return router.path('/');
});

const handleLogout = async () => {
  // 로그아웃 api 제작
  userStore.logout();
  await logout();
  router.push('/');
};

</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.custom-link {
  text-decoration: underline;
  color: black;
  cursor: pointer;
}
</style>
