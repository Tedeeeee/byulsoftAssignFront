<template>
  <div>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ modalMessage }}</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn v-if="modalMessage === '수정하시겠습니까?'" flat label="수정하기" @click="closeModal(modalMessage)" color="primary" />
          <q-btn v-if="modalMessage === '삭제하시겠습니까?'" flat label="삭제하기" @click="closeModal(modalMessage)" color="primary" />
          <q-btn flat label="닫기" @click="closeModal" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div class="comment-section q-mt-lg">
    <h5>댓글</h5>
    <div class="q-mt-md">
      <q-card v-for="(comment, idx) in comments" :key="idx" flat bordered class="q-pa-md comment-card">
        <div class="comment-header row items-center q-mb-md">
          <strong class="col">{{ comment.memberNickname }}</strong>
          <span>{{ comment.commentUpdatedAt }}</span>
          <div v-if="comment.memberNickname === nickname" class="comment-actions col-auto">
            <q-btn flat label="수정" @click="showModal('수정하시겠습니까?')" color="primary" class="q-mr-xs" />
            <q-btn flat label="삭제" @click="checkIfDelete(comment.commentId)" color="negative" class="q-mr-xs" />
          </div>
        </div>
        <q-separator />
        <div v-if="isEdit">
          <q-input filled v-model="comment.commentContent" label="댓글을 수정하세요" type="textarea" rows="3" class="q-mb-md" />
          <q-btn label="수정하기" @click="editComment(comment.commentContent, comment.commentId)" color="primary" />
        </div>
        <p v-if="!isEdit" class="comment-text">{{ comment.commentContent }}</p>
        <div v-if="comment.showReplyForm" class="q-mt-md">
          <q-card flat bordered class="q-pa-md">
            <q-input filled v-model="comment.newReply" label="답변을 작성하세요" type="textarea" rows="3" class="q-mb-md" />
            <q-btn label="답변하기" @click="addReply(index)" color="primary" />
          </q-card>
        </div>
      </q-card>
    </div>
    <q-card flat bordered class="q-pa-md">
      <q-input filled v-model="newComment" label="댓글을 작성해주세요" type="textarea" rows="3" class="q-mb-md" />
      <q-btn label="댓글 작성하기" @click="submitComment" color="primary" />
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Comment } from '@/type/Comment';
import { useUserStore } from '@/stores/useUserStore';
import { useNotifications } from '@/common/CommonNotify';

const { negativeNotify } = useNotifications();
const nickname = useUserStore().userNickname;
const isEdit = ref<boolean>(false);
const newComment = ref('');
const modalMessage = ref<string>('');
const isDialogOpen = ref<boolean>(false);
const nowCommentId = ref<number>(0);
const props = defineProps<{
  comments: Comment[];
}>();

const emit = defineEmits<{
  (e: 'editComment', content: string, id: number): void;
  (e: 'deleteComment', id: number): void;
  (e: 'addComment', content: string): void;
}>();

const showModal = (message: string) => {
  modalMessage.value = message;
  isDialogOpen.value = true;
};

const closeModal = (message: string) => {
  if (message === '수정하시겠습니까?') {
    isEdit.value = true;
  } else {
    deleteComment(nowCommentId.value);
  }
  isDialogOpen.value = false;
};

const checkIfDelete = (commentId: number) => {
  nowCommentId.value = commentId;
  showModal('삭제하시겠습니까?');
};

/* 삭제를 실행 */
const deleteComment = (commentId: number) => {
  emit('deleteComment', commentId);
};

/* 수정하기를 누르면 실행 */
const editComment = (commentContent: string, commentId: number) => {
  if (commentContent.trim() === '') {
    negativeNotify('내용을 작성해주세요');
    return;
  }
  isEdit.value = false;
  emit('editComment', commentContent, commentId);
};

const submitComment = () => {
  if (newComment.value.trim()) {
    emit('addComment', newComment.value);
    newComment.value = '';
  }
};

/*/!* 수정 댓글 open or close *!/
const toggleReply = index => {
  comments.value[index].showReplyForm = !comments.value[index].showReplyForm;
};*/
</script>

<style scoped>
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-actions {
  display: flex;
  gap: 8px;
}

.comment-card {
  margin-top: 16px;
  margin-bottom: 16px;
}

.comment-text {
  white-space: pre-wrap;
  margin: 0px;
}
</style>
