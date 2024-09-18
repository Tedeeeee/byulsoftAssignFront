<template>
  <q-page padding>
    <q-form @submit.prevent="submitForm" class="q-gutter-md">
      <write-contents v-model="postContents" />
      <q-btn type="submit" label="작성하기" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import WriteContents from '@/components/content/PostContents.vue';
import { ref } from 'vue';
import { insertPost } from '@/api';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { Post } from '@/type/BoardStarType';

const router = useRouter();
const $q = useQuasar();

const postContents = ref<Post>({
  boardTitle: '',
  boardContent: '',
  boardRegion: '',
  boardStars: [
    { boardStarType: 'DIFFICULTY', boardStarShortReview: '', boardStarRating: 0 },
    { boardStarType: 'STORY', boardStarShortReview: '', boardStarRating: 0 },
    { boardStarType: 'INTERIOR', boardStarShortReview: '', boardStarRating: 0 },
    { boardStarType: 'ACTIVITY', boardStarShortReview: '', boardStarRating: 0 },
    { boardStarType: 'HORROR', boardStarShortReview: '', boardStarRating: 0 },
  ],
  boardView: 0,
  boardLikes: 0,
});

const submitForm = async () => {
  for (let i = 0; i < postContents.value.boardStars.length; i++) {
    if (postContents.value.boardStars[i].boardStarRating === 0) {
      $q.notify({
        type: 'negative',
        message: "별점을 입력해주세요",
        position: 'top',
      });
      return;
    }
  }

  try {
    console.log(postContents.value);
    const response = await insertPost(postContents.value);
    console.log(response);
    await router.push('/');
  } catch (error) {
    const errorMessage = error.response.data.errors[0].defaultMessage;
    if (errorMessage === '체크되지 않은 별점이 존재합니다') {
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
