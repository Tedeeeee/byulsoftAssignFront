<template>
  <q-page padding>
    <q-form v-if="postContents" @submit.prevent="submitForm" class="q-gutter-md">
      <write-contents v-model="postContents" />
      <q-btn type="submitForm" label="수정하기" color="primary" class="button-container q-mt-md" />
<!--      <q-btn label="수정" @click="showModal('정말로 수정하시겠습니까?')" color="primary" class="q-mr-xs" />
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
      </div>-->
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import WriteContents from '@/components/content/PostContents.vue';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Post } from '@/type/BoardStarType';
import { getBoardById } from '@/api/auth';
import { updatePost } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  id: string;
}>();
const $q = useQuasar();
const postContents = ref<Post | undefined>();
const boardId = parseInt(props.id);
const modalMessage = ref<string>('');
const isDialogOpen = ref(false);

// const showModal = (message: string) => {
//   modalMessage.value = message;
//   isDialogOpen.value = true;
// };
// const closeModal = () => {
//   isDialogOpen.value = false;
// };

const transformToPost = (serverData: Post) => {
  return {
    boardId: serverData.boardId,
    boardTitle: serverData.boardTitle,
    boardContent: serverData.boardContent,
    boardRegion: serverData.boardRegion,
    memberNickname: serverData.memberNickname,
    boardCreatedAt: serverData.boardCreatedAt,
    boardView: serverData.boardView,
    boardLikes: serverData.boardLikes,
    boardStars: serverData.boardStars
  };
};

/* boardId를 통해 데이터를 다시 받아서 셋팅을 한다 */
const fetchContentDetails = async () => {
  const response = await getBoardById(boardId);
  postContents.value = transformToPost(response.data);
};

const submitForm = async () => {
  try {
    isDialogOpen.value = false;
    await updatePost(postContents.value);
    await router.push(`/${boardId}`);
  } catch (error) {
    console.log(error);
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
