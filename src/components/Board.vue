<!--<template>-->
<!--  <div class="q-pa-md flex justify-center">-->
<!--    <q-card flat bordered class="q-pa-md" style="max-width: 1000px; width: 900px">-->
<!--      <div class="title">검색</div>-->
<!--      <div class="flex justify-center items-center" style="height: 30%">-->
<!--        <div class="row q-gutter-sm" style="width: 100%">-->
<!--          <div class="col-3 q-pa-sm">-->
<!--            <q-select filled v-model="category" :options="selectCategory" label="카테고리" />-->
<!--          </div>-->
<!--          <div v-if="category === '제목'" class="col-7 q-pa-sm">-->
<!--            <q-input standout="bg-teal text-white" v-model="text" label="검색" />-->
<!--          </div>-->
<!--          <div v-else class="col-7 q-pa-sm">-->
<!--            <q-select filled v-model="category" :options="regionOptions" />-->
<!--          </div>-->
<!--          <div class="col-1 q-pa-sm">-->
<!--            <q-btn @click="performSearch" color="primary" icon="search" size="lg" />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </q-card>-->
<!--  </div>-->

<!--  &lt;!&ndash; 컴포넌트 제작 &ndash;&gt;-->
<!--  <div class="flex flex-center">-->
<!--    <div class="row q-gutter-sm">-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="난이도↑"-->
<!--        @click="sortMethod('difficulty', 'desc')"-->
<!--        :color="isActive('difficulty', 'desc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="스토리↑"-->
<!--        @click="sortMethod('story', 'desc')"-->
<!--        :color="isActive('story', 'desc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="인테리어↑"-->
<!--        @click="sortMethod('interior', 'desc')"-->
<!--        :color="isActive('interior', 'desc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="공포도↑"-->
<!--        @click="sortMethod('horror', 'desc')"-->
<!--        :color="isActive('horror', 'desc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="활동성↑"-->
<!--        @click="sortMethod('activity', 'desc')"-->
<!--        :color="isActive('activity', 'desc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="flex flex-center">-->
<!--    <div class="row q-gutter-sm">-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="난이도↓"-->
<!--        @click="sortMethod('difficulty', 'asc')"-->
<!--        :color="isActive('difficulty', 'asc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="스토리↓"-->
<!--        @click="sortMethod('story', 'asc')"-->
<!--        :color="isActive('story', 'asc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="인테리어↓"-->
<!--        @click="sortMethod('interior', 'asc')"-->
<!--        :color="isActive('interior', 'asc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="공포도↓"-->
<!--        @click="sortMethod('horror', 'asc')"-->
<!--        :color="isActive('horror', 'asc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--      <q-btn-->
<!--        flat-->
<!--        label="활동성↓"-->
<!--        @click="sortMethod('activity', 'asc')"-->
<!--        :color="isActive('activity', 'asc') ? 'orange' : 'primary'"-->
<!--        class="q-mr-xs"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->

<!--  &lt;!&ndash; 카드 컴포넌트 제작 &ndash;&gt;-->
<!--  <q-page padding>-->
<!--    <div class="q-gutter-md">-->
<!--      <div v-for="(item, idx) in posts" :key="idx" class="post-card" @click="goToPost(item.id)">-->
<!--        &lt;!&ndash; 반복문시 컴포넌트 따로 제작 &ndash;&gt;-->
<!--        <q-card flat bordered class="q-pa-md">-->
<!--          <div class="row">-->
<!--            <div class="left-section q-mr-md">-->
<!--              <q-img :src="imageSource" alt="사진" style="width: 150px; height: 150px" />-->
<!--            </div>-->
<!--            <q-separator vertical />-->
<!--            <div class="right-section">-->
<!--              <div class="info-section q-mb-md">-->
<!--                <h4>[{{ item.region }}] {{ item.title }}</h4>-->
<!--                <div class="info-row row items-center q-gutter-sm">-->
<!--                  <span class="col-3">작성자: {{ item.nickname }}</span>-->
<!--                  <span class="col-3">작성시간: {{ item.createdAt }}</span>-->
<!--                  <span class="col-2">조회수: {{ item.view }}</span>-->
<!--                  <span class="col-2">좋아요: {{ item.likes }}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <q-separator />-->

<!--              <div class="row q-col-gutter-ms q-mt-md">-->
<!--                <div class="col">-->
<!--                  <span>난이도</span>-->
<!--                  <q-rating v-model="item.boardStars[0].starRating" max="5" readonly class="black-stars" />-->
<!--                </div>-->
<!--                <q-separator vertical />-->
<!--                <div class="col">-->
<!--                  <span>스토리</span>-->
<!--                  <q-rating v-model="item.boardStars[1].starRating" max="5" readonly class="black-stars" />-->
<!--                </div>-->
<!--                <q-separator vertical />-->
<!--                <div class="col">-->
<!--                  <span>인테리어</span>-->
<!--                  <q-rating v-model="item.boardStars[2].starRating" max="5" readonly class="black-stars" />-->
<!--                </div>-->
<!--                <q-separator vertical />-->
<!--                <div class="col">-->
<!--                  <span>활동성</span>-->
<!--                  <q-rating v-model="item.boardStars[3].starRating" max="5" readonly class="black-stars" />-->
<!--                </div>-->
<!--                <q-separator vertical />-->
<!--                <div class="col">-->
<!--                  <span>공포도</span>-->
<!--                  <q-rating v-model="item.boardStars[4].starRating" max="5" readonly class="black-stars" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card>-->
<!--      </div>-->
<!--      <div class="pagination-container q-mt-md">-->
<!--        <q-pagination-->
<!--          v-model="currentPage"-->
<!--          :max="totalPages"-->
<!--          direction-links-->
<!--          outline-->
<!--          color="orange"-->
<!--          active-design="unelevated"-->
<!--          active-color="brown"-->
<!--          active-text-color="orange"-->
<!--          @update:model-value="handlePageChange"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--  </q-page>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted } from 'vue';-->
<!--import { useRouter } from 'vue-router';-->
<!--import { getAllBoard, getPostsCount, sortBoardByCategory } from '@/api/auth.ts';-->
<!--import { regionOptions } from '@/type/Contents.ts';-->

<!--const router = useRouter();-->
<!--const posts = ref([]);-->
<!--const currentPage = ref(1);-->
<!--const totalPages = ref(0);-->
<!--const selectCategory = ['제목', '지역'];-->
<!--const category = ref('');-->
<!--const sortData = ref({-->
<!--  sortName: 'id',-->
<!--  sortType: 'base',-->
<!--  pageNum: currentPage.value,-->
<!--});-->
<!--const text = ref('');-->

<!--const isActive = (name: string, type: string) => {-->
<!--  return sortData.value.sortName === name && sortData.value.sortType === type;-->
<!--};-->

<!--const goToPost = postId => {-->
<!--  router.push({ name: 'PostDetail', params: { id: postId } });-->
<!--};-->

<!--const performSearch = () => {-->
<!--  console.log('검색하기');-->
<!--};-->

<!--// 정렬 기준으로 데이터를 변경하는 메소드-->
<!--const sortMethod = async (sortName: string, sortType: string) => {-->
<!--  sortData.value.sortName = sortName;-->
<!--  sortData.value.sortType = sortType;-->
<!--  sortData.value.pageNum = currentPage.value;-->
<!--  const response = await fetchPosts(sortData);-->
<!--  posts.value = response.data;-->
<!--};-->

<!--// 변경된 정렬 기준으로 진행-->
<!--const sortPostList = async () => {-->
<!--  const response = await sortBoardByCategory(sortData.value.sortName, sortData.value.sortType, sortData.value.pageNum);-->
<!--  console.log(response.data);-->
<!--  posts.value = response.data;-->
<!--};-->

<!--const fetchPosts = async () => {-->
<!--  const response = await getAllBoard(currentPage.value);-->
<!--  console.log(response.data);-->
<!--};-->

<!--const fetchPostCount = async () => {-->
<!--  const response = await getPostsCount(currentPage.value);-->
<!--  console.log(response.data);-->
<!--  totalPages.value = response.data;-->
<!--};-->

<!--const handlePageChange = async page => {-->
<!--  sortData.value.pageNum = page;-->
<!--  await fetchPosts(sortData.value.sortName, sortData.value.sortType, sortData.value.pageNum);-->
<!--};-->

<!--onMounted(async () => {-->
<!--  await fetchPostCount();-->
<!--  await fetchPosts();-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.q-page {-->
<!--  max-width: 1000px;-->
<!--  margin: 0 auto;-->
<!--}-->

<!--.post-card {-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.post-card:hover {-->
<!--  background-color: #f5f5f5;-->
<!--}-->

<!--.left-section {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--}-->

<!--.right-section {-->
<!--  flex: 1;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.info-section {-->
<!--  margin-bottom: 1rem;-->
<!--}-->

<!--.row {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  gap: 8px;-->
<!--}-->

<!--.col-3 {-->
<!--  flex: 3;-->
<!--}-->

<!--.col-2 {-->
<!--  flex: 2;-->
<!--}-->

<!--.pagination-container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->

<!--.title {-->
<!--  font-size: 50px;-->
<!--  font-weight: bold;-->
<!--  text-align: center;-->
<!--  margin-bottom: 20px;-->
<!--  margin-top: 20px;-->
<!--}-->
<!--</style>-->
