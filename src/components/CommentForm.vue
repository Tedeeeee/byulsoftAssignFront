<template>
  <div class="comment-section q-mt-lg">
    <h5>댓글</h5>
    <div class="q-mt-md">
      <q-card v-for="comment in comments" :key="comment.id" flat bordered class="q-pa-md comment-card">
        <div class="comment-header row items-center q-mb-md">
          <strong class="col">{{ comment.username }}</strong>
          <span>{{ comment.date }}</span>
          <div v-if="comment.username === currentUser" class="comment-actions col-auto">
            <q-btn flat label="수정" @click="comment.isEdit = !comment.isEdit" color="primary" class="q-mr-xs" />
            <q-btn flat label="삭제" @click="$emit('deleteComment', comment.id)" color="negative" class="q-mr-xs" />
          </div>
          <div v-else class="col-auto">
            <q-btn flat label="답변" @click="toggleReply(comment.id)" color="secondary" />
          </div>
        </div>
        <q-separator />
        <div v-if="comment.isEdit">
          <q-input filled v-model="comment.text" label="댓글을 수정하세요" type="textarea" rows="3" class="q-mb-md" />
          <q-btn label="수정하기" @click="$emit('editComment', comment.text, comment.id)" color="primary" />
        </div>
        <p v-if="!comment.isEdit" class="comment-text">{{ comment.text }}</p>
        <div v-if="comment.showReplyForm" class="q-mt-md">
          <q-card flat bordered class="q-pa-md">
            <q-input filled v-model="comment.newReply" label="답변을 작성하세요" type="textarea" rows="3" class="q-mb-md" />
            <q-btn label="답변하기" @click="addReply(index)" color="primary" />
          </q-card>
        </div>

        <div v-if="comment.replies.length" class="q-mt-md">
          <q-card flat bordered class="q-pa-md" v-for="(reply, rIndex) in comment.replies" :key="rIndex">
            <div class="comment-header row items-center q-mb-md">
              <strong class="col">{{ reply.username }}</strong>
              <span>{{ reply.date }}</span>
              <div v-if="comment.username === currentUser" class="comment-actions col-auto">
                <q-btn flat label="수정" @click="editComment(index)" color="primary" class="q-mr-xs" />
                <q-btn flat label="삭제" @click="$emit('deleteComment', comment.id)" color="negative" class="q-mr-xs" />
              </div>
            </div>
            <q-separator />
            <p>{{ reply.text }}</p>
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

const nickname = localStorage.getItem('user');
const currentUser = ref(nickname);
const props = defineProps<{
  comments: Comment[];
}>();

const emit = defineEmits<{
  (e: 'editComment', text: string, id: number): void;
  (e: 'deleteComment', id: number): void;
  (e: 'addComment', content: string): void;
}>();

const newComment = ref('');

const submitComment = () => {
  if (newComment.value.trim) {
    emit('addComment', newComment.value);
    newComment.value = '';
  }
};

/* 수정 댓글 open or close */
const toggleReply = index => {
  comments.value[index].showReplyForm = !comments.value[index].showReplyForm;
};
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
