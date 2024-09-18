<template>
  <div>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">아이디 혹은 비밀번호가 틀렸습니다.</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="닫기" @click="closeModal" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <q-page class="login-page">
    <q-card class="login-card" flat bordered>
      <q-card-section class="q-pt-none">
        <div class="title">로그인</div>
        <q-form @submit="handleSubmit">
          <q-input v-model="loginData.email" label="Email" type="email" outlined class="q-mb-md" />
          <q-input v-model="loginData.password" label="Password" type="password" outlined class="q-mb-md" />
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
import type { UserData } from '@/type/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import { login } from '@/api/auth';

type LoginData = Pick<UserData, 'email' | 'password'>;

const router = useRouter();
const isDialogOpen = ref(false);
const userStore = useUserStore();

const showModal = () => {
  isDialogOpen.value = true;
};
const closeModal = () => {
  isDialogOpen.value = false;
};

const loginData = ref<LoginData>({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    const response = await login(loginData.value.email, loginData.value.password);
    if (response.status === 200) {
      console.log(response);
      userStore.login(response.data);
      router.push('/');
    }
  } catch (error) {
    // 오류가 발생한 경우 모달을 띄운다
    console.log(error);
    showModal();
  }
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
