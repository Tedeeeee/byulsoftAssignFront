<template>
  <q-page padding>
    <q-form v-if="postContents" @submit.prevent="submitForm" class="q-gutter-md">
      <write-contents v-model="postContents" />
      <q-btn type="submitForm" label="수정하기" color="primary" class="button-container q-mt-md" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import WriteContents from '@/components/content/PostContents.vue';
import { onMounted, ref } from 'vue';
import { Post } from '@/type/BoardStarType';
import { getBoardById } from '@/api/auth';
import { updatePost } from '@/api';
import { useRouter } from 'vue-router';
import { useNotifications } from '@/common/CommonNotify';

const { positiveNotify } = useNotifications();
const router = useRouter();
const props = defineProps<{
  boardId: string;
}>();
const postContents = ref<Post | undefined>();
const boardId = parseInt(props.boardId);
const isDialogOpen = ref(false);

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
    boardStars: serverData.boardStars,
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
    positiveNotify('게시글이 수정되었습니다');
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
