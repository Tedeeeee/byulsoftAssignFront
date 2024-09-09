<template>
  <q-page padding>
    <div class="q-gutter-md">
      <!-- 게시글 카드 -->
      <div class="post-card">
        {{ review }}
        {{ boardId }}
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
                  <span class="col-2">{{ nickname }}</span>
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>작성시간</span><br />
                  <span class="col-3">{{ review.createDate }}</span>
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

      <div class="post-card">
        <q-card flat bordered class="q-pa-sm">
          <div class="row">
            <div class="left-section q-mr-sm">
              <q-img :src="difficultyImage" alt="사진" style="width: 70px; height: 70px" />
            </div>
            <div class="right-section">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-rating v-model="review.difficultyRating" max="5" readonly />
                </div>
              </div>
              <div class="info-section q-mb-sm">
                <h6>{{ review.difficulty }}</h6>
              </div>
            </div>
          </div>
        </q-card>
        <q-separator />
      </div>
      <div class="post-card">
        <q-card flat bordered class="q-pa-sm">
          <div class="row">
            <div class="left-section q-mr-sm">
              <q-img :src="storyImage" alt="사진" style="width: 70px; height: 70px" />
            </div>
            <div class="right-section">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-rating v-model="review.storyRating" max="5" readonly />
                </div>
              </div>
              <div class="info-section q-mb-sm">
                <h6>{{ review.story }}</h6>
              </div>
            </div>
          </div>
        </q-card>
        <q-separator />
      </div>
      <div class="post-card">
        <q-card flat bordered class="q-pa-sm">
          <div class="row">
            <div class="left-section q-mr-sm">
              <q-img :src="interiorImage" alt="사진" style="width: 70px; height: 70px" />
            </div>
            <div class="right-section">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-rating v-model="review.interiorRating" max="5" readonly />
                </div>
              </div>
              <div class="info-section q-mb-sm">
                <h6>{{ review.interior }}</h6>
              </div>
            </div>
          </div>
        </q-card>
        <q-separator />
      </div>
      <div class="post-card">
        <q-card flat bordered class="q-pa-sm">
          <div class="row">
            <div class="left-section q-mr-sm">
              <q-img :src="activityImage" alt="사진" style="width: 70px; height: 70px" />
            </div>
            <div class="right-section">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-rating v-model="review.activityRating" max="5" readonly />
                </div>
              </div>
              <div class="info-section q-mb-sm">
                <h6>{{ review.activity }}</h6>
              </div>
            </div>
          </div>
        </q-card>
        <q-separator />
      </div>
      <div class="post-card">
        <q-card flat bordered class="q-pa-sm">
          <div class="row">
            <div class="left-section q-mr-sm">
              <q-img :src="horrorImage" alt="사진" style="width: 70px; height: 70px" />
            </div>
            <div class="right-section">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-rating v-model="review.horrorRating" max="5" readonly />
                </div>
              </div>
              <div class="info-section q-mb-sm">
                <h6>{{ review.horror }}</h6>
              </div>
            </div>
          </div>
        </q-card>
        <q-separator />
      </div>

      <div class="review-summary q-mt-lg">
        <q-card flat class="q-pa-md review-summary-card">
          <q-img :src="totalReview" alt="사진" style="width: 170px; height: 170px" />
          <p class="text-center">{{ review.content }}</p>
        </q-card>
        <q-separator />
      </div>

      <!--댓글-->
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
                <q-btn label="답변하기" @click="addReply(index)" color="primary" />
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
          <q-input filled v-model="content.text" label="댓글을 작성해주세요" type="textarea" rows="3" class="q-mb-md" />
          <q-btn label="댓글 작성하기" @click="addComment" color="primary" />
        </q-card>
      </div>
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
import { getBoardById } from '@/api/auth.ts';
import { ContentDetail } from '@/type/Contents.ts';
import { Comment, type Reply } from '@/type/Comment.ts';
import { insertComment } from '@/api';

const imageSource = ref(pathToImage);
const props = defineProps<{
  id: string;
}>();

const boardId = props.id;

const review = ref<ContentDetail>({
  title: '',
  content: '',
  region: '',
  difficulty: '',
  difficultyRating: 0,
  horror: '',
  horrorRating: 0,
  story: '',
  storyRating: 0,
  activity: '',
  activityRating: 0,
  interior: '',
  interiorRating: 0,
  view: 0,
  likes: 0,
  createDate: '',
});

const comments = ref<Comment[]>([]);

const content = ref({
  text: '',
});
const nickname = localStorage.getItem('user');
const currentUser = ref(nickname);

const addComment = async () => {
  console.log(content);
  const response = await insertComment(boardId, content);
  console.log(response.data);
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

const fetchContentDetails = async () => {
  const response = await getBoardById(boardId);
  review.value = response.data;
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
