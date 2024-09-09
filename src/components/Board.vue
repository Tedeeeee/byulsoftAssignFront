<template>
  <q-page padding>
    <div class="q-gutter-md">
      <div v-for="(item, idx) in posts" :key="idx" class="post-card" @click="goToPost(item.id)">
        <q-card flat bordered class="q-pa-md">
          <div class="row">
            <div class="left-section q-mr-md">
              <q-img :src="imageSource" alt="사진" style="width: 150px; height: 150px" />
            </div>
            <q-separator vertical />
            <div class="right-section">
              <div class="info-section q-mb-md">
                <h4>[{{ item.region }}] {{ item.title }}</h4>
                <div class="info-row row items-center q-gutter-sm">
                  <span class="col-3">작성자: {{ item.nickname }}</span>
                  <span class="col-3">작성시간: {{ item.createdAt }}</span>
                  <span class="col-2">조회수: {{ item.view }}</span>
                  <span class="col-2">좋아요: {{ item.likes }}</span>
                </div>
              </div>
              <q-separator />
              <div class="row q-col-gutter-ms q-mt-md">
                <div class="col">
                  <span>난이도</span>
                  <q-rating v-model="item.difficultyRating" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>스토리</span>
                  <q-rating v-model="item.storyRating" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>인테리어</span>
                  <q-rating v-model="item.interiorRating" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>공포도</span>
                  <q-rating v-model="item.horrorRating" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>활동성</span>
                  <q-rating v-model="item.activityRating" max="5" readonly class="black-stars" />
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="pagination-container q-mt-md">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          direction-links
          outline
          color="orange"
          active-design="unelevated"
          active-color="brown"
          active-text-color="orange"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import pathToImage from '@/assets/웃는 사진.jpeg';
import { getAllBoard } from '@/api/auth.ts';
const imageSource = ref(pathToImage);

const router = useRouter();

const posts = ref([]);
const pageSize = 10;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(posts.value.length / pageSize));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return posts.value.slice(start, end);
});

const goToPost = postId => {
  router.push({ name: 'PostDetail', params: { id: postId } });
};

const fetchPosts = async () => {
  const response = await getAllBoard();
  console.log(response.data);
  posts.value = response.data;
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
}

.post-card {
  cursor: pointer;
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

.text-center {
  text-align: center;
}

.info-section {
  margin-bottom: 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.col-3 {
  flex: 3;
}

.col-2 {
  flex: 2;
}

.col-1 {
  flex: 1;
}

.pagination-container {
  display: flex;
  justify-content: center;
}
</style>
