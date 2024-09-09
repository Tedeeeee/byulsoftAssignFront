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
          <template v-if="userStore.isLoggedIn">
            <q-btn v-if="userStore.isLoggedIn" flat :label="userStore.user" class="custom-link" />
            <q-btn v-if="userStore.isLoggedIn" to="/write" color="black" label="글쓰기" />
            <q-btn v-if="userStore.isLoggedIn" @click="handleLogout" color="black" label="로그아웃" />
          </template>
          <template v-else>
            <q-btn v-if="!userStore.isLoggedIn" to="/login" color="black" label="로그인" />
            <q-btn v-if="!userStore.isLoggedIn" to="/signUp" color="black" label="회원가입" />
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
import { healthCheck } from '@/api/index';
import logo from './assets/로고.png';

const router = useRouter();
const userStore = useUserStore();

const goHome = async () => {
  router.push('/');
};

const handleLogout = () => {
  // 로그아웃 api 제작
  userStore.logout();
  router.push('/');
};

const healthCheckBtn = async () => {
  const response = await healthCheck();

  console.log(response.data);
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
