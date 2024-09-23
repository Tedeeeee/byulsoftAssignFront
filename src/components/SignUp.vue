<template>
  <q-page class="sign-up-page">
    <q-card class="sign-up-card" flat bordered>
      <q-card-section>
        <div class="title">회원가입</div>
        <q-form @submit="handleSubmit">
          <div class="input-btn-container">
            <q-input
              ref="emailInput"
              filled
              maxlength="50"
              v-model="registData.memberEmail"
              label="이메일"
              type="email"
              outlined
              lazy-rules
              :rules="emailRules"
              class="input-field"
            />
            <q-btn label="중복체크" @click="emailCheckDuplicate" color="primary" class="check-btn" />
          </div>
          <q-input
            filled
            v-model="registData.memberPassword"
            label="비밀번호"
            type="password"
            outlined
            lazy-rules
            :rules="checkPassword"
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="registData.confirmPassword"
            label="비밀번호 재확인"
            type="password"
            outlined
            lazy-rules
            :rules="checkConfirmPassword"
            class="q-mb-md"
          />
          <q-input filled maxlength="18" v-model="registData.memberName" label="이름" lazy-rules :rules="nameRules" class="q-mb-md" />
          <div class="input-btn-container">
            <q-input
              ref="nicknameInput"
              filled
              maxlength="10"
              v-model="registData.memberNickname"
              label="닉네임"
              outlined
              lazy-rules
              :rules="nicknameRules"
              class="input-field"
            />
            <q-btn label="중복체크" @click="nicknameCheckDuplicate" color="primary" class="check-btn" />
          </div>
          <q-input
            filled
            v-model="phoneNumberInput"
            label="'-' 을 제외한 번호를 입력해주세요"
            type="tel"
            mask="###-####-####"
            outlined
            lazy-rules
            :rules="phoneNumberRules"
            class="q-mb-md"
          />

          <q-btn label="회원가입" type="submit" color="primary" class="full-width" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { UserRegistData } from '@/type/User';
import { useRouter } from 'vue-router';
import { register, checkNickname, checkEmail } from '@/api/auth';
import { useNotifications } from '@/common/CommonNotify';

const { positiveNotify, negativeNotify } = useNotifications();
const router = useRouter();
const emailInput = ref<string>('');
const nicknameInput = ref<string>('');
const phoneNumberInput = ref<string>('');

const registData = ref<UserRegistData>({
  memberEmail: '',
  emailCheck: false,
  memberPassword: '',
  confirmPassword: '',
  memberName: '',
  memberNickname: '',
  nicknameCheck: false,
  memberPhoneNum: '',
});

const emailRules = [
  val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || '올바른 이메일을 입력해주세요',
  val => (registData.value.emailCheck || !val ? true : '중복체크를 완료해주세요'),
];

const nicknameRules = [
  val => (val && val.length >= 3) || '3글자 이상의 닉네임을 입력해주세요',
  val => /^[a-zA-Z가-힣]+$/.test(val) || '닉네임에는 특수문자와 공백을 사용할 수 없습니다.',
  val => (registData.value.nicknameCheck || !val ? true : '중복체크를 완료해주세요'),
];

const nameRules = [
  val => (val && val.length > 0) || '이름을 입력해주세요',
  val => /^[a-zA-Z가-힣]+$/.test(val) || '이름에는 특수문자와 공백을 사용할 수 없습니다.',
  val => val.length <= 18 || '이름은 최대 18글자까지 입력 가능합니다.',
];

const checkPassword = [
  val => (val && val.length > 0) || '비밀번호를 입력해주세요',
  val => /^(?=.*[A-Z])(?=.*[!@#$%^*+=-]).{6,}$/.test(val) || '대문자와 지정된 특수문자를 최소 하나씩 포함하고, 6글자 이상이어야 합니다',
];

const checkConfirmPassword = [
  val => (val && val.length > 0) || '비밀번호를 입력해주세요',
  val => registData.value.memberPassword === val || '비밀번호가 일치하지 않습니다',
];

const phoneNumberRules = [val => (val && val.length > 10) || '올바른 전화번호를 입력해주세요'];
const isEmailValid = computed(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registData.value.memberEmail));

const isNicknameValid = computed(() => registData.value.memberNickname.length >= 3);

const emailCheckDuplicate = async () => {
  if (!isEmailValid.value) {
    negativeNotify('올바른 이메일을 입력해주세요');
    return;
  }

  const response = await checkEmail(registData.value.memberEmail);
  console.log(response);
  if (response.statusCode === 201) {
    registData.value.emailCheck = true;
    positiveNotify(response.message);
    emailInput.value.resetValidation();
  } else {
    negativeNotify(response.message);
    registData.value.emailCheck = false;
  }
};

const nicknameCheckDuplicate = async () => {
  if (!isNicknameValid.value) {
    negativeNotify('올바른 닉네임을 입력해주세요');
    return;
  }

  try {
    const response = await checkNickname(registData.value.memberNickname);
    if (response.statusCode === 201) {
      registData.value.nicknameCheck = true;
      positiveNotify(response.message);
      nicknameInput.value.resetValidation();
    }
  } catch (error) {
    negativeNotify(error.message);
    registData.value.nicknameCheck = false;
  }
};

const handleSubmit = async () => {
  registData.value.memberPhoneNumber = phoneNumberInput.value.replace(/\D/g, '');
  console.log(registData.value);
  try {
    const response = await register(registData.value);
    if (response.statusCode === 201) {
      positiveNotify(response.message);
    }
  } catch (error) {
    if (error.statusCode === 409) {
      negativeNotify(error.message);
    }
    /*    const errorMessage = error.response.data.message;
    if (errorMessage === '해당 이메일은 이미 사용중입니다.') {
      registData.value.email = '';
      registData.value.emailCheck = false;
    } else if (errorMessage === '이미 존재하는 닉네임 입니다') {
      registData.value.nickname = '';
      registData.value.nicknameCheck = false;
    }*/
  }
  await router.push('/login');
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
  max-width: 400px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.input-btn-container {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 15px;
}

.input-field {
  flex-grow: 1;
}

.check-btn {
  font-size: 14px;
  padding: 4px 8px;
  height: 32px;
  min-width: 120px;
}
</style>
