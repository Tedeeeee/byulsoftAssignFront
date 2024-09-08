<template>
  <q-page padding>
    <div class="q-gutter-md">
      <!-- 게시글 카드 -->
      <div class="post-card">
        <q-card flat bordered class="q-pa-md">
          <div class="row">
            <div class="left-section q-mr-md">
              <q-img :src="imageSource" alt="사진" style="width: 150px; height: 150px" />
            </div>
            <q-separator vertical />
            <div class="right-section">
              <div class="info-section q-mb-md">
                <h4>[서울] 게시글 제목 1</h4>
              </div>
              <q-separator />
              <div class="row q-col-gutter-ms q-mt-md">
                <div class="col">
                  <span>길</span><br />
                  <span class="col-1">꽃길</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>작성자</span><br />
                  <span class="col-2">작성자 1</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>작성시간</span><br />
                  <span class="col-3">2024-09-01</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>조회수</span><br />
                  <span class="col-2">100</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>좋아요</span><br />
                  <span class="col-2">10</span>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <div v-for="(item, index) in reviewItems" :key="index" class="post-card">
        <q-card flat bordered class="q-pa-sm">
          <div class="row">
            <div class="left-section q-mr-sm">
              <q-img :src="item.image" alt="사진" style="width: 70px; height: 70px" />
            </div>
            <div class="right-section">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-rating v-model="item.rating" max="5" readonly />
                </div>
              </div>
              <div class="info-section q-mb-sm">
                <h6>{{ item.contents }}</h6>
              </div>
            </div>
          </div>
        </q-card>
        <q-separator />
      </div>

      <div class="review-summary q-mt-lg">
        <q-card flat class="q-pa-md review-summary-card">
          <q-img :src="review" alt="사진" style="width: 170px; height: 170px" />
          <h4 class="text-center">총평</h4>
          <p class="text-center">이 페이지에 대한 종합적인 평가와 의견을 여기에 적어주세요.</p>
        </q-card>
      </div>

      <div class="comment-section q-mt-lg">
        <h5>댓글</h5>

        <div v-if="comments.length" class="q-mt-md">
          <q-card flat bordered class="q-pa-md comment-card" v-for="(comment, index) in comments" :key="index">
            <div class="comment-header row items-center q-mb-md">
              <strong class="col">{{ comment.username }}</strong>
              <span>{{ comment.date }}</span>
              <div v-if="comment.username === currentUser" class="comment-actions col-auto">
                <q-btn flat label="수정" @click="editComment(index)" color="primary" class="q-mr-xs" />
                <q-btn flat label="삭제" @click="deleteComment(index)" color="negative" class="q-mr-xs" />
              </div>
              <div v-if="comment.username !== currentUser" class="col-auto">
                <q-btn flat label="답변" @click="toggleReply(index)" color="secondary" />
              </div>
            </div>
            <q-separator />
            <p>{{ comment.text }}</p>

            <div v-if="comment.showReplyForm" class="q-mt-md">
              <q-card flat bordered class="q-pa-md">
                <q-input filled v-model="comment.newReply" label="답변을 작성하세요" type="textarea" rows="3" class="q-mb-md" />
                <q-btn label="Submit" @click="addReply(index)" color="primary" />
              </q-card>
            </div>

            <div v-if="comment.replies.length" class="q-mt-md">
              <q-card flat bordered class="q-pa-md" v-for="(reply, rIndex) in comment.replies" :key="rIndex">
                <div class="comment-header row items-center q-mb-md">
                  <strong class="col">{{ reply.username }}</strong>
                  <span>{{ reply.date }}</span>
                </div>
                <q-separator />
                <p>{{ reply.text }}</p>
              </q-card>
            </div>
          </q-card>
        </div>
        <q-card flat bordered class="q-pa-md">
          <q-input filled v-model="newComment" label="댓글을 작성해주세요" type="textarea" rows="3" class="q-mb-md" />
          <q-btn label="댓글 작성하기" @click="addComment" color="primary" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import pathToImage from '@/assets/웃는 사진.jpeg';
import hard from '@/assets/난이도.png';
import story from '@/assets/스토리.png';
import interia from '@/assets/인테리어.png';
import movement from '@/assets/활동성.png';
import scared from '@/assets/공포도.png';
import review from '@/assets/총평.png';

const imageSource = ref(pathToImage);
const router = useRouter();

const reviewItems = ref([
  { image: hard, contents: '어렵지 않았슴', rating: 4 },
  { image: story, contents: '감동 실화', rating: 5 },
  { image: interia, contents: '페인트 벗겨진데 있었음', rating: 3 },
  { image: scared, contents: '진짜 무섭더라...', rating: 2 },
  { image: movement, contents: '운동화 필수', rating: 5 },
]);

const newComment = ref('');
const nickname = localStorage.getItem('user');
const currentUser = ref(nickname);

const comments = ref([
  { username: 'User1', date: '2024-09-08', text: '잘봤습니다!!', replies: [], newReply: '', showReplyForm: false },
  { username: 'User2', date: '2024-09-08', text: '저 이거 12분 남김', replies: [], newReply: '', showReplyForm: false },
  { username: '닉네임이다', date: '2024-09-08', text: '이거 많이 어려운가요?', replies: [], newReply: '', showReplyForm: false },
  { username: '어쩌구저쩌구', date: '2024-09-08', text: '나는 이거 못깼는데...', replies: [], newReply: '', showReplyForm: false },
]);

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      username: 'New User',
      date: new Date().toLocaleDateString(),
      text: newComment.value.trim(),
      replies: [],
      newReply: '',
      showReplyForm: false,
    });
    newComment.value = '';
  }
};

const toggleReply = index => {
  comments.value[index].showReplyForm = !comments.value[index].showReplyForm;
};

const addReply = commentIndex => {
  const comment = comments.value[commentIndex];
  if (comment.newReply.trim()) {
    comment.replies.push({
      username: 'New User',
      date: new Date().toLocaleDateString(),
      text: comment.newReply.trim(),
    });
    comment.newReply = '';
    comment.showReplyForm = false;
  }
};
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

.q-col-gutter-sm {
  gap: 0.5rem;
}

.q-col-gutter-md {
  gap: 1rem;
}

.q-mb-md {
  margin-bottom: 1rem;
}

.q-mb-sm {
  margin-bottom: 0.5rem;
}

.q-rating {
  font-size: 24px;
}

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
</style>
