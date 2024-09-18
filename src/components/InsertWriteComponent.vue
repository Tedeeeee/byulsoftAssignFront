<template>
  <q-page padding>
    <q-form @submit.prevent="submitForm" class="q-gutter-md">
      <write-contents v-model="review" />
      <q-btn type="submit" label="작성하기" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import WriteContents from '@/components/WriteContents.vue';
import { ref } from 'vue';
import { insertContents } from '@/api';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { Post } from '@/type/BoardStarType';
import { useUserStore } from '@/stores/useUserStore';

const router = useRouter();
const $q = useQuasar();

const review = ref<Post>({
  title: '',
  contents: '',
  region: '',
  nickname: useUserStore().userNickname,
  boardStars: [
    { starType: 'DIFFICULTY', starShortReview: '', starRating: 0 },
    { starType: 'STORY', starShortReview: '', starRating: 0 },
    { starType: 'INTERIOR', starShortReview: '', starRating: 0 },
    { starType: 'ACTIVITY', starShortReview: '', starRating: 0 },
    { starType: 'HORROR', starShortReview: '', starRating: 0 },
  ],
  view: 0,
  likes: 0,
});

console.log(review.value.nickname);

const submitForm = () => {
  try {
    console.log(review.value);
    insertContents(review.value);
    router.push('/');
  } catch (error) {
    const errorMessage = error.response.data.errors[0].defaultMessage;
    if (errorMessage === '별점 평가는 최소 1점 이상이어야 합니다') {
      $q.notify({
        type: 'negative',
        message: errorMessage,
        position: 'top',
      });
    }
  }
};
</script>

<style scoped>
.q-page {
  max-width: 700px;
  margin: 0 auto;
}
</style>
