<template>
  <search :contents="searchCondition.searchText" :type="searchCondition.searchType" @searchPost="basicSearchPostList" />
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

// 초기화를 할때 URL을 가져와야 한다
let href = window.location.href;
let url = new URL(href);
const searchCondition = ref<SearchCondition>({
  searchType: url.searchParams.get('searchType') || '',
  searchText: url.searchParams.get('searchText') || '',
  sortOrder: url.searchParams.get('sortOrder') || '',
  sortType: url.searchParams.get('sortType') || '',
  pageNumber: url.searchParams.get('pageNumber') || currentPage.value,
});

const detailPost = (boardId: number) => {
  router.push({ name: 'PostDetail', params: { boardId: boardId } });
};

// 기본 정렬
const basicSearchPostList = async (searchType: string, searchText: string) => {
  await fetchPostCount();
  // 지역이 담겨있다면 지역 기준으로 값을 가져온다
  searchCondition.value.searchType = searchType;
  searchCondition.value.searchText = searchText;
  if (searchText == null || searchText == '') searchCondition.value.searchType = '';

  const response = await getAllBoard(searchCondition.value.searchType, searchCondition.value.searchText, currentPage.value);
  await router.push({
    name: 'Board',
    query: {
      searchType: searchType,
      searchText: searchText,
    },
  });
  posts.value = response.data;
};

// 특수 장르를 기준으로 정렬
const sortPostList = async (sortOrder: string, sortType: string, pageNumber: number) => {
  searchCondition.value.sortOrder = sortOrder;
  searchCondition.value.sortType = sortType;

  const response = await sortBoardByCategory(
    sortOrder,
    sortType,
    pageNumber,
    searchCondition.value.searchType,
    searchCondition.value.searchText,
  );

  await router.push({
    name: 'Board',
    query: {
      searchType: searchCondition.value.searchType,
      searchText: searchCondition.value.searchText,
      sortOrder: sortOrder,
      sortType: sortType,
      pageNumber: pageNumber,
    },
  });
  posts.value = response.data;
};

// 페이지가 변경되면 실행되는 API
const handlePageChange = async (page: number) => {
  console.log(page);
  searchCondition.value.pageNumber = page;
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

  await router.push({
    name: 'Board',
    query: {
      searchType: searchCondition.value.searchType,
      searchText: searchCondition.value.searchText,
      sortOrder: searchCondition.value.sortOrder,
      sortType: searchCondition.value.sortType,
      pageNumber: searchCondition.value.pageNumber,
    },
  });
};

const fetchPosts = async () => {
  await fetchPostCount();
  const response = await getAllBoard(searchCondition.value.searchType, searchCondition.value.searchText, currentPage.value);
  posts.value = response.data;
};

// 페이지 갯수 확인 함수
const fetchPostCount = async () => {
  const response = await getPostsCount(searchCondition.value.searchType, searchCondition.value.searchText);
  totalPages.value = response.data;
};

onMounted(async () => {
  // sortOrder가 존재하면 sort가 생성
  if (url.searchParams.get('sortOrder')) {
    await sortPostList(url.searchParams.get('sortOrder'), url.searchParams.get('sortType'), url.searchParams.get('PageNumber'));
  } else if (url.searchParams.get('searchType')) {
    await basicSearchPostList(url.searchParams.get('searchType'), url.searchParams.get('searchText'));
  } else {
    await fetchPosts();
  }
});
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
