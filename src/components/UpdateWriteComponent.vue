<template>
  <q-page padding>
    <q-form v-if="review" @submit.prevent="submitForm" class="q-gutter-md">
      <write-contents v-model="review" />
      <q-btn label="수정" @click="showModal('정말로 수정하시겠습니까?')" color="primary" class="q-mr-xs" />
      <!--      <q-btn type="submit" label="수정하기" color="primary" class="button-container q-mt-md" />-->
      <div>
        <q-dialog v-model="isDialogOpen">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ modalMessage }}</div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn label="수정하기" @click="submitForm" color="primary" />
              <q-btn label="닫기" @click="closeModal" color="primary" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import WriteContents from '@/components/WriteContents.vue';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Post } from '@/type/BoardStarType';
import { getBoardById } from '@/api/auth';
import { updateContents } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  id: string;
}>();
const $q = useQuasar();
const review = ref<Post | undefined>();
const boardId = parseInt(props.id);
const modalMessage = ref<string>('');
const isDialogOpen = ref(false);

const showModal = (message: string) => {
  modalMessage.value = message;
  isDialogOpen.value = true;
};
const closeModal = () => {
  isDialogOpen.value = false;
};

const transformToReview = (serverData: Post) => {
  return {
    id: serverData.id,
    title: serverData.title,
    contents: serverData.contents,
    region: serverData.region,
    nickname: serverData.nickname,
    createdAt: serverData.createdAt,
    boardStars: serverData.boardStars,
    view: serverData.view,
    likes: serverData.likes,
  };
};

/* boardId를 통해 데이터를 다시 받아서 셋팅을 한다 */
const fetchContentDetails = async () => {
  const response = await getBoardById(boardId);
  console.log(response);
  review.value = transformToReview(response.data);
};

const submitForm = async () => {
  try {
    isDialogOpen.value = false;
    await updateContents(review.value);
    await router.push(`/detail/${boardId}`);
  } catch (error) {
    console.log(error);
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

onMounted(async () => {
  await fetchContentDetails();
});
</script>

<style scoped>
.q-page {
  max-width: 700px;
  margin: 0 auto;
}

.button-container {
  justify-content: center;
}
</style>
