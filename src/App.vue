<template>
  <q-layout view="hHh lpR fff">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title @click="goHome" class="cursor-pointer">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
        <div class="q-pa-md q-gutter-sm">
          <q-btn to="/login" color="black" label="로그인" />
          <q-btn to="/signUp" color="black" label="회원가입" />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
