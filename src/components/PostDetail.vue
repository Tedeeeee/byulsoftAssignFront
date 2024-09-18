<template>
  <div>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ modalMessage }}</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="수정하기" @click="closeModal" :to="`/updateWrite/${boardId}`" color="primary" />
          <q-btn flat label="닫기" @click="closeModal" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <q-page padding>
    <div class="q-gutter-md" v-if="review">
      <div class="post-card">
        <q-card flat bordered class="q-pa-md">
          <div class="row">
            <div class="left-section q-mr-md">
              <q-img :src="imageSource" alt="사진" style="width: 150px; height: 150px" />
            </div>
            <q-separator vertical />
            <div class="right-section">
              <div class="info-section q-mb-md">
                <h4>[{{ review.region }}] {{ review.title }}</h4>
              </div>
              <q-separator />
              <div class="row q-col-gutter-ms q-mt-md">
                <div class="col">
                  <span>작성자</span><br />
                  <span class="col-2">{{ review.nickname }}</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>작성시간</span><br />
                  <span class="col-3">{{ review.createdAt }}</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>조회수</span><br />
                  <span class="col-2">{{ review.view }}</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>좋아요</span><br />
                  <span class="col-2">{{ review.likes }}</span>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <div v-if="review.nickname === nickname" class="button-container q-mt-md">
        <q-btn label="수정" @click="showModal('수정하시겠습니까?')" color="primary" class="q-mr-xs" />
        <q-btn label="삭제" @click="showModal('삭제하시겠습니까?')" color="negative" class="q-mr-xs" />
      </div>
      <div v-for="(star, idx) in review.boardStars" :key="idx" class="post-card">
        <q-card flat bordered class="q-pa-sm">
          <div class="row">
            <div class="left-section q-mr-sm">
              <q-img :src="images[idx]" alt="사진" style="width: 70px; height: 70px" />
            </div>
            <div class="right-section">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-rating v-model="star.starRating" max="5" readonly />
                </div>
              </div>
              <div class="info-section q-mb-sm">
                <h6>{{ star.starShortReview }}</h6>
              </div>
            </div>
          </div>
        </q-card>
        <q-separator />
      </div>
      <div class="review-summary q-mt-lg">
        <q-card flat class="q-pa-md review-summary-card">
          <q-img :src="totalReview" alt="사진" style="width: 170px; height: 170px" />
          <p class="text-center">
            {{ review.contents }}
          </p>
        </q-card>
        <q-separator />
      </div>

      <comment-form :comments="comments" @delete-comment="deleteComment" @add-comment="addComment" @edit-comment="editComment" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import pathToImage from '@/assets/웃는 사진.jpeg';
import totalReview from '@/assets/총평.png';
import horrorImage from '@/assets/공포도.png';
import difficultyImage from '@/assets/난이도.png';
import storyImage from '@/assets/스토리.png';
import interiorImage from '@/assets/인테리어.png';
import activityImage from '@/assets/활동성.png';
import { findCommentsByBoardId, getBoardById } from '@/api/auth.ts';
import { Comment } from '@/type/Comment.ts';
import { BoardStar, Post } from '@/type/BoardStarType';
import CommentForm from '@/components/CommentForm.vue';
import { deleteBoard, deleteContents, editCommentText, insertComment } from '@/api';
import { useUserStore } from '@/stores/useUserStore';

const images = [difficultyImage, storyImage, interiorImage, activityImage, horrorImage];
const imageSource = ref(pathToImage);
const nickname = useUserStore().userNickname;
const props = defineProps<{
  id: string;
}>();
const boardId = props.id;
const boardStars = ref<BoardStar[]>([]);
const comments = ref<Comment[]>([]);
const review = ref<Post | undefined>();
const isDialogOpen = ref(false);
const modalMessage = ref('');

const transformToReview = (serverData): Post => {
  return {
    id: serverData.id,
    title: serverData.title,
    contents: serverData.contents,
    region: serverData.region,
    nickname: serverData.nickname,
    createdAt: serverData.createdAt,
    view: serverData.view,
    likes: serverData.likes,
    boardStars: serverData.boardStars,
  };
};

const transformToComment = (serverData): Comment => {
  return {
    id: serverData.id,
    memberId: serverData.memberId,
    username: serverData.nickname,
    date: serverData.updatedAt,
    text: serverData.content,
    replies: [],
    newReply: '',
    showReplyForm: false,
    isEdit: false,
  };
};

const fetchContentDetails = async () => {
  const response = await getBoardById(boardId);
  console.log(response.data);
  review.value = transformToReview(response.data);
  comments.value = response.data.comments.map(transformToComment);
};

/* 게시글 삭제 여부 확인 모달*/
const showModal = (message: string) => {
  modalMessage.value = message;
  isDialogOpen.value = true;
};
const closeModal = () => {
  isDialogOpen.value = false;
};

/* 게시글 삭제 */
const deletePost = async () => {
  console.log('게시글 삭제');
  const response = await deleteBoard(boardId);
  console.log(response);
};

/* 댓글 추가 */
const addComment = async content => {
  console.log('댓글 추가');
  const data = {
    content: content,
    boardId: boardId,
  };

  const response = await insertComment(data);
  comments.value = response.data.map(transformToComment);
};

/*댓글 수정*/
const editComment = async (text, id) => {
  console.log('댓글 수정');
  console.log(text);
  console.log(id);
  const data = {
    content: text,
    id: id,
    boardId: boardId,
  };

  const response = await editCommentText(data);
  comments.value = response.data.map(transformToComment);
};

/* 댓글 삭제 */
const deleteComment = async id => {
  console.log('댓글 삭제');
  await deleteContents(id);
  /*삭제 후 해당 보드의 댓글 다시 로드*/
  const response = await findCommentsByBoardId(boardId);
  comments.value = response.data.map(transformToComment);
};

onMounted(() => {
  fetchContentDetails();
});
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
}

.post-card {
  transition: background-color 0.3s;
}

.post-card:hover {
  background-color: #f5f5f5;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-section {
  margin-bottom: 0.5rem;
}

.row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.q-pa-md {
  padding: 0.5rem;
}

.q-pa-sm {
  padding: 0.5rem;
}

.q-mr-md {
  margin-right: 0.5rem;
}

.q-mr-sm {
  margin-right: 0.25rem;
}

.q-mb-md {
  margin-bottom: 1rem;
}

.q-mb-sm {
  margin-bottom: 0.5rem;
}

.q-mt-lg {
  margin-top: 32px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.review-summary {
  text-align: center;
}

.review-summary-card {
  margin-top: 16px;
  margin-bottom: 16px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
