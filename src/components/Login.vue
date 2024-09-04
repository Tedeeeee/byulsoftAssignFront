<template>
  <q-page class="login-page">
    <q-card class="login-card" flat bordered>
      <q-card-section class="q-pt-none">
        <div class="title">로그인</div>
        <q-form @submit="handleSubmit">
          <q-input v-model="email" label="Email" type="email" outlined class="q-mb-md" />
          <q-input v-model="password" label="Password" type="password" outlined class="q-mb-md" />
          <q-btn label="Login" type="submit" color="primary" class="full-width" />
          <div class="text-center q-mt-md">
            <q-btn flat label="혹시 회원이 아니신가요?" to="/signUp" class="custom-link" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  // 여기에 로그인 로직 추가
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.custom-link {
  text-decoration: underline;
  color: red;
  cursor: pointer;
}
</style>
