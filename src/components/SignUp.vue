<template>
  <q-page class="sign-up-page">
    <q-card class="sign-up-card" flat bordered>
      <q-card-section>
        <div class="title">회원가입</div>
        <q-form @submit="handleSubmit">
          <div class="input-btn-container">
            <q-input
              filled
              v-model="signUpData.email"
              label="이메일"
              type="email"
              outlined
              lazy-rules
              :rules="emailRules"
              :disable="signUpData.emailCheck"
              class="input-field"
            />
            <q-btn label="중복체크" @click="emailCheckDuplicate" color="primary" class="check-btn" :disabled="signUpData.emailCheck" />
          </div>
          <q-input
            filled
            v-model="signUpData.password"
            label="비밀번호"
            type="password"
            outlined
            lazy-rules
            :rules="checkPassword"
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="signUpData.confirmPassword"
            label="비밀번호 재확인"
            type="password"
            outlined
            lazy-rules
            :rules="checkPassword"
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="signUpData.username"
            label="이름"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '이름을 입력해주세요']"
            class="q-mb-md"
          />
          <div class="input-btn-container">
            <q-input
              filled
              v-model="signUpData.nickname"
              label="닉네임"
              outlined
              lazy-rules
              :rules="nicknameRules"
              :disable="signUpData.nicknameCheck"
              class="input-field"
            />
            <q-btn
              label="중복체크"
              @click="nicknameCheckDuplicate"
              color="primary"
              class="check-btn"
              :disabled="signUpData.nicknameCheck"
            />
          </div>
          <q-input
            filled
            v-model="signUpData.phoneNum"
            label="핸드폰 번호"
            type="tel"
            outlined
            lazy-rules
            :rules="[val => (val && val.length >= 10) || '전화번호를 입력해주세요']"
            class="q-mb-md"
          />
          <q-btn label="회원가입" type="submit" color="primary" class="full-width" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import type { UserRegistData, UserData } from '@/type/user';

const signUpData = ref<UserRegistData>({
  email: '',
  emailCheck: false,
  password: '',
  confirmPassword: '',
  username: '',
  nickname: '',
  nicknameCheck: false,
  phoneNum: '',
});

const emailRules = [
  val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || '올바른 이메일을 입력해주세요',
  val => (signUpData.value.emailCheck || !val ? true : '중복체크를 완료해주세요'),
];
const nicknameRules = [
  val => (val && val.length > 0) || '닉네임을 입력해주세요',
  val => (signUpData.value.nicknameCheck || !val ? true : '중복체크를 완료해주세요'),
];

const checkPassword = [
  val => (val && val.length > 0) || '비밀번호를 입력해주세요',
  val => /^(?=.*[A-Z])(?=.*[!@#$%^*+=-]).{6,}$/.test(val) || '대문자와 지정된 특수문자를 최소 하나씩 포함하고, 6글자 이상이어야 합니다',
];

const checkComfirmPassword = [
  val => (val && val.length > 0) || '비밀번호를 입력해주세요',
  val => signUpData.value.password === signUpData.value.confirmPassword || '비밀번호가 일치하지 않습니다',
];

const checkDuplicate = (endPoint, paramName, paramValue, returnRes: (response) => {}, returnErr: (error) => {}) => {
  return axios
    .get(`http://localhost:8080/${endPoint}`, {
      params: {
        [paramName]: paramValue,
      },
    })
    .then(returnRes)
    .catch(returnErr);
};

const emailCheckDuplicate = () => {
  checkDuplicate(
    'members/checkEmail',
    'email',
    signUpData.value.email,
    response => {
      if (response.data === '사용 가능한 이메일입니다.') {
        signUpData.value.emailCheck = true;
      }
    },
    error => {
      console.log(error);
    },
  );
};

const nicknameCheckDuplicate = () => {
  checkDuplicate(
    'members/checkNickName',
    'nickName',
    signUpData.value.nickname,
    response => {
      if (response.data === '사용 가능한 닉네임입니다.') {
        signUpData.value.nicknameCheck = true;
      }
    },
    error => {
      console.log(error);
    },
  );
};

const handleSubmit = async () => {
  console.log('Submit 버튼 클릭');
  console.log('회원가입이 진행됩니다.');
  const userData = ref<UserData>({
    email: signUpData.value.email,
    password: signUpData.value.password,
    name: signUpData.value.username,
    nickname: signUpData.value.nickname,
    phoneNumber: signUpData.value.phoneNum,
  });

  // 서버에서 이메일과 닉네임을 한 번 더 체크한다.
  axios
    .post('http://localhost:8080/members/register', userData.value)
    .then(response => {
      // 게시판으로 이동하고 로그인과 회원가입을 닉네임으로 변경
      console.log(response);
    })
    .catch(error => {
      const errorMessage = error.response.data.message;
      console.log(error.response.data.message);
      if (errorMessage === '해당 이메일은 이미 사용중입니다.') {
        alert('이메일 중복 체크를 다시 진행해주세요');
        signUpData.value.email = '';
        signUpData.value.emailCheck = false;
      } else if (errorMessage === '이미 존재하는 닉네임 입니다') {
        alert('닉네임 중복 체크를 다시 진행해주세요');
        signUpData.value.nickname = '';
        signUpData.value.nicknameCheck = false;
      }
    });
};
</script>

<style scoped>
.sign-up-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}

.sign-up-card {
  width: 100%;
  max-width: 400px; /* 카드의 최대 너비 설정 */
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

/* Flexbox 컨테이너 */
.input-btn-container {
  display: flex;
  align-items: center;
  gap: 18px; /* 버튼과 입력 필드 사이의 간격 */
  margin-bottom: 15px;
}

.input-field {
  flex-grow: 1; /* 입력 필드가 가능한 공간을 차지하도록 설정 */
}

.check-btn {
  font-size: 14px; /* 버튼의 글자 크기 */
  padding: 4px 8px; /* 버튼의 패딩 조정 */
  height: 32px; /* 버튼의 높이 조정 */
  min-width: 120px; /* 버튼의 최소 너비 설정 */
}
</style>
