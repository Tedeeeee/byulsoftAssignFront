<template>
  <q-page padding>
    <div class="q-gutter-md">
      <div v-for="item in paginatedPosts" :key="item.id" class="post-card" @click="goToPost(item.id)">
        <q-card flat bordered class="q-pa-md">
          <div class="row">
            <div class="left-section q-mr-md">
              <q-img :src="imageSource" alt="사진" style="width: 150px; height: 150px" />
            </div>
            <q-separator vertical />
            <div class="right-section">
              <div class="info-section q-mb-md">
                <h4>[{{ item.location }}] {{ item.title }}</h4>
                <div class="info-row row items-center q-gutter-sm">
                  <span class="col-1">길: {{ item.load }}</span>
                  <span class="col-2">작성자: {{ item.author }}</span>
                  <span class="col-3">작성시간: {{ item.createdAt }}</span>
                  <span class="col-2">조회수: {{ item.views }}</span>
                  <span class="col-2">좋아요: {{ item.likes }}</span>
                </div>
              </div>
              <q-separator />
              <div class="row q-col-gutter-ms q-mt-md">
                <div class="col">
                  <span>난이도</span>
                  <q-rating v-model="item.difficulty" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>스토리</span>
                  <q-rating v-model="item.story" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>인테리어</span>
                  <q-rating v-model="item.interior" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>공포도</span>
                  <q-rating v-model="item.scary" max="5" readonly class="black-stars" />
                </div>
                <q-separator vertical />
                <div class="col">
                  <span>활동성</span>
                  <q-rating v-model="item.activity" max="5" readonly class="black-stars" />
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import pathToImage from '@/assets/웃는 사진.jpeg';
const imageSource = ref(pathToImage);

const router = useRouter();

const posts = ref([
  {
    id: 1,
    location: '서울',
    title: '게시글 제목 1',
    author: '작성자 1',
    createdAt: '2024-09-01',
    views: 100,
    likes: 10,
    load: '꽃길',
    image: 'path_to_image_1',
    difficulty: 3,
    story: 4,
    interior: 2,
    scary: 1,
    activity: 5,
  },
  {
    id: 2,
    title: '게시글 제목 2',
    author: '작성자 2',
    createdAt: '2024-09-02',
    views: 200,
    likes: 20,
    load: '숲길',
    image: 'path_to_image_2',
    difficulty: 4,
    story: 3,
    interior: 5,
    scary: 2,
    activity: 4,
  },
  {
    id: 3,
    title: '게시글 제목 3',
    author: '작성자 3',
    createdAt: '2024-09-03',
    views: 300,
    likes: 30,
    load: '산길',
    image: 'path_to_image_3',
    difficulty: 2,
    story: 5,
    interior: 4,
    scary: 3,
    activity: 2,
  },
  {
    id: 4,
    title: '게시글 제목 4',
    author: '작성자 4',
    createdAt: '2024-09-04',
    views: 400,
    likes: 40,
    load: '해변길',
    image: 'path_to_image_4',
    difficulty: 5,
    story: 2,
    interior: 3,
    scary: 4,
    activity: 1,
  },
  {
    id: 5,
    title: '게시글 제목 5',
    author: '작성자 5',
    createdAt: '2024-09-05',
    views: 500,
    likes: 50,
    load: '도시길',
    image: 'path_to_image_5',
    difficulty: 1,
    story: 4,
    interior: 5,
    scary: 2,
    activity: 3,
  },
  {
    id: 6,
    title: '게시글 제목 6',
    author: '작성자 6',
    createdAt: '2024-09-06',
    views: 600,
    likes: 60,
    load: '강변길',
    image: 'path_to_image_6',
    difficulty: 3,
    story: 5,
    interior: 2,
    scary: 3,
    activity: 4,
  },
  {
    id: 7,
    title: '게시글 제목 7',
    author: '작성자 7',
    createdAt: '2024-09-07',
    views: 700,
    likes: 70,
    load: '농촌길',
    image: 'path_to_image_7',
    difficulty: 4,
    story: 2,
    interior: 3,
    scary: 4,
    activity: 1,
  },
  {
    id: 8,
    title: '게시글 제목 8',
    author: '작성자 8',
    createdAt: '2024-09-08',
    views: 800,
    likes: 80,
    load: '해안길',
    image: 'path_to_image_8',
    difficulty: 5,
    story: 3,
    interior: 4,
    scary: 1,
    activity: 2,
  },
  {
    id: 9,
    title: '게시글 제목 9',
    author: '작성자 9',
    createdAt: '2024-09-09',
    views: 900,
    likes: 90,
    load: '산책길',
    image: 'path_to_image_9',
    difficulty: 2,
    story: 4,
    interior: 5,
    scary: 2,
    activity: 3,
  },
  {
    id: 10,
    title: '게시글 제목 10',
    author: '작성자 10',
    createdAt: '2024-09-10',
    views: 1000,
    likes: 100,
    load: '장소길',
    image: 'path_to_image_10',
    difficulty: 3,
    story: 5,
    interior: 1,
    scary: 4,
    activity: 4,
  },
  {
    id: 11,
    title: '게시글 제목 11',
    author: '작성자 11',
    createdAt: '2024-09-11',
    views: 1100,
    likes: 110,
    load: '해변산책길',
    image: 'path_to_image_11',
    difficulty: 4,
    story: 3,
    interior: 2,
    scary: 3,
    activity: 5,
  },
]);

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
