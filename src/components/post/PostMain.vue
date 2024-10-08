<template>
  <div>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ modalMessage }}</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            v-if="modalMessage === '수정하시겠습니까?'"
            flat
            label="수정하기"
            @click="closeModal"
            :to="`/updatePost/${boardId}`"
            color="primary"
          />
          <q-btn v-if="modalMessage === '삭제하시겠습니까?'" flat label="삭제하기" @click="deletePost(boardId)" color="primary" />
          <q-btn flat label="닫기" @click="closeModal" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <q-page padding>
    <div class="q-gutter-md" v-if="postHeadData">
      <div class="post-card">
        <post-head-contents :postHeadData="postHeadData" />
      </div>
      <!-- 여기서 nickname을 확인하고 컴포넌트를 띄워주면 된다     -->
      <update-or-delete-button
        v-if="postHeadData.memberNickname === useUserStore().userNickname"
        @update-modal="showModal"
        @delete-modal="showModal"
      />
      <div v-for="(star, idx) in boardStars" :key="idx" class="post-card">
        <stars-comments :star="star" :image="images[idx]" />
        <q-separator />
      </div>
      <div class="review-summary q-mt-lg">
        <q-card flat class="q-pa-md review-summary-card">
          <q-img :src="totalReview" alt="사진" style="width: 170px; height: 170px" />
          <p class="text-center">
            {{ postHeadData.boardContent }}
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
import totalReview from '@/assets/총평.png';
import horrorImage from '@/assets/공포도.png';
import difficultyImage from '@/assets/난이도.png';
import storyImage from '@/assets/스토리.png';
import interiorImage from '@/assets/인테리어.png';
import activityImage from '@/assets/활동성.png';
import { findCommentsByBoardId, getBoardById } from '@/api/auth.ts';
import { Comment } from '@/type/Comment.ts';
import { BoardStar, Post } from '@/type/BoardStarType';
import CommentForm from '@/components/post/CommentForm.vue';
import { deleteCommentById, deletePostById, insertComment, updateComment } from '@/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import StarsComments from '@/components/post/StarsComments.vue';
import PostHeadContents from '@/components/post/PostHeadContents.vue';
import UpdateOrDeleteButton from '@/components/post/UpdateOrDeleteButton.vue';
import { useNotifications } from '@/common/CommonNotify';

const { negativeNotify, positiveNotify } = useNotifications();
const router = useRouter();
const images = [difficultyImage, storyImage, interiorImage, activityImage, horrorImage];
const props = defineProps<{
  boardId: string;
}>();
const boardId = parseInt(props.boardId);
const postHeadData = ref<Omit<Post, 'boardStar'> | undefined>();
const boardStars = ref<BoardStar[] | undefined>([]);
const comments = ref<Comment[] | undefined>([]);
const isDialogOpen = ref<boolean>(false);
const modalMessage = ref<string>('');

const transformToPostHeadData = (responseData: Post): Omit<Post, 'boardStars'> => {
  return {
    boardId: responseData.boardId,
    boardTitle: responseData.boardTitle,
    boardContent: responseData.boardContent,
    boardRegion: responseData.boardRegion,
    memberNickname: responseData.memberNickname,
    boardCreatedAt: responseData.boardCreatedAt,
    boardView: responseData.boardView,
    boardLikes: responseData.boardLikes,
  };
};

const transformToBoardStar = (responseData: BoardStar): Omit<BoardStar, 'boardId' | 'boardStarId'> => {
  return {
    boardStarType: responseData.boardStarType,
    boardStarShortReview: responseData.boardStarShortReview,
    boardStarRating: responseData.boardStarRating,
  };
};

const transformToComment = (responseData: Comment) => {
  return {
    commentId: responseData.commentId,
    memberId: responseData.memberId,
    memberNickname: responseData.memberNickname,
    commentUpdatedAt: responseData.commentUpdatedAt,
    commentContent: responseData.commentContent,
    showReplyForm: false,
    isEdit: false,
  };
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
const deletePost = async (boardId: number) => {
  try {
    const response = await deletePostById(boardId);
    positiveNotify(response.message);
    await router.push('/');
  } catch (error) {
    negativeNotify(error.message);
  }
};

/* 댓글 추가 */
const addComment = async (content: string) => {
  if (content.trim() === '') {
    negativeNotify('글을 입력해주세요');
    return;
  }

  try {
    const response = await insertComment({
      commentContent: content,
      boardId: boardId,
      memberNickname: useUserStore().userNickname,
    });

    positiveNotify(response.message);
    comments.value = response.data.body.map(transformToComment);
  } catch (error) {
    if (error.status == 401) {
      negativeNotify('로그인이 필요한 서비스입니다');
      await router.push('/login');
    }
  }
};

/* 댓글 수정 */
const editComment = async (content: string, id: number) => {
  const response = await updateComment({
    commentContent: content,
    commentId: id,
    boardId: boardId,
  });
  positiveNotify(response.message);
  comments.value = response.data.body.map(transformToComment);
};

/* 댓글 삭제 */
const deleteComment = async (commentId: number) => {
  try {
    const response = await deleteCommentById(commentId);
    positiveNotify(response.message);

    /*삭제 후 해당 보드의 댓글 다시 로드*/
    const responseComment = await findCommentsByBoardId(boardId);
    comments.value = responseComment.body.map(transformToComment);
  } catch (error) {
    negativeNotify(error.message);
  }
};

const fetchContentDetails = async () => {
  const response = await getBoardById(boardId);
  postHeadData.value = transformToPostHeadData(response.data.body);
  boardStars.value = response.data.body.boardStars.map(transformToBoardStar);
  comments.value = response.data.body.comments.map(transformToComment);
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

.q-pa-md {
  padding: 0.5rem;
}
.q-mt-lg {
  margin-top: 32px;
}

.review-summary {
  text-align: center;
}

.review-summary-card {
  margin-top: 16px;
  margin-bottom: 16px;
}

.text-center {
  white-space: pre-wrap;
}
</style>
