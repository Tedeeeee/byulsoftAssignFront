<template>
  <search @search-posts="searchPosts" />
  <sort-type :page="currentPage" @sort="sortPostList" />
  <q-page padding>
    <div class="q-gutter-md">
      <post-card v-for="(post, idx) in posts" :key="idx" :item="post" @detail-post="detailPost" />
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="currentPage"
          color="black"
          :max="totalPages"
          :max-pages="7"
          :boundary-numbers="false"
          @update:model-value="handlePageChange"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SortType from '@/components/board/SortType.vue';
import Search from '@/components/board/Search.vue';
import PostCard from '@/components/board/PostCard.vue';
import { ref, onMounted } from 'vue';
import { getAllBoard, getPostsCount, sortBoardByCategory } from '@/api/auth.ts';
import { useRouter } from 'vue-router';
import type { SearchCondition } from '@/type/Board';
import type { Post } from '@/type/BoardStarType';

const router = useRouter();

const posts = ref<Post[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const searchCondition = ref<SearchCondition>({
  searchType: '',
  searchText: '',
  sortOrder: '',
  sortType: '',
  pageNumber: currentPage.value,
});

const searchPosts = async (searchType: string, searchText: string) => {
  // 지역이 담겨있다면 지역 기준으로 값을 가져온다
  searchCondition.value.searchType = searchType;
  searchCondition.value.searchText = searchText;
  if (searchText == null || searchText == '') searchCondition.value.searchType = '';
  await fetchPostCount();
  const response = await getAllBoard(searchCondition.value.searchType, searchCondition.value.searchText, currentPage.value);
  posts.value = response.data;
};

const detailPost = (boardId: number) => {
  console.log(boardId);
  router.push({ name: 'PostDetail', params: { id: boardId } });
};

// 특수 장르를 기준으로 정렬
const sortPostList = async (sortOrder: string, sortType: string, pageNumber: number) => {
  searchCondition.value.sortOrder = sortOrder;
  searchCondition.value.sortType = sortType;
  searchCondition.value.sortOrder = sortOrder;
  searchCondition.value.sortType = sortType;
  const response = await sortBoardByCategory(
    sortOrder,
    sortType,
    pageNumber,
    searchCondition.value.searchType,
    searchCondition.value.searchText,
  );
  posts.value = response.data;
};

// 기본적인 정렬
const fetchPosts = async () => {
  // 여기에 어떤 타입인지 전달
  const response = await getAllBoard(searchCondition.value.searchType, searchCondition.value.searchText, currentPage.value);
  posts.value = response.data;
};

const fetchPostCount = async () => {
  const response = await getPostsCount(searchCondition.value.searchType, searchCondition.value.searchText);
  totalPages.value = response.data;
};

const handlePageChange = async page => {
  searchCondition.value.pageNumber = page;
  console.log(searchCondition.value.pageNumber);
  // 2번으로 넘어갈때도 기준을 고정하고 넘어가야한다.
  if (searchCondition.value.sortType == '') {
    // 기본 조건의 정렬
    const response = await getAllBoard(searchCondition.value.sortOrder, searchCondition.value.sortType, page);
    posts.value = response.data;
  } else {
    // sortPostList 진행
    const response = await sortBoardByCategory(
      searchCondition.value.sortOrder,
      searchCondition.value.sortType,
      searchCondition.value.pageNumber,
      searchCondition.value.searchType,
      searchCondition.value.searchText,
    );
    posts.value = response.data;
  }
};

onMounted(async () => {
  await fetchPostCount();
  await fetchPosts();
});
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
