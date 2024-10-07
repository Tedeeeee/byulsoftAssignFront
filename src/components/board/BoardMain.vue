<template>
  <div>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">검색 결과가 존재하지 않습니다</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="검색 초기화" @click="closeModal" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <search v-model="searchCondition" @searchPost="sortPostList" />
  <sort-type v-model="searchCondition" @sort="sortPostList" />
  <reset-search @reset-search-condition="resetSearchCondition" />
  <q-page padding>
    <div class="q-gutter-md">
      <post-card v-for="(post, idx) in posts" :key="idx" :item="post" @detail-post="detailPost" />
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="currentPage"
          color="black"
          :max="totalPages || 1"
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
import { getBoardList } from '@/api/auth.ts';
import { useRoute, useRouter } from 'vue-router';
import type { SearchCondition } from '@/type/Board';
import type { Post } from '@/type/BoardStarType';
import ResetSearch from '@/components/board/ResetSearch.vue';

const router = useRouter();
const posts = ref<Post[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const isDialogOpen = ref<boolean>(false);

// 초기화를 할때 URL을 가져와야 한다
const route = useRoute();
const searchCondition = ref<SearchCondition>({
  searchType: route.query.searchType || '',
  searchText: route.query.searchText || '',
  sortOrder: route.query.sortOrder || '',
  sortType: route.query.sortType || '',
  pageNumber: parseInt(route.query.pageNumber) || currentPage.value,
});

const detailPost = (boardId: number) => {
  router.push({ name: 'PostDetail', params: { boardId: boardId } });
};

const sortPostList = async () => {
  searchCondition.value.pageNumber = 1;
  await fetchPosts();

  await router.push({
    name: 'Board',
    query: {
      searchType: searchCondition.value.searchType,
      searchText: searchCondition.value.searchText,
      sortOrder: searchCondition.value.sortOrder,
      sortType: searchCondition.value.sortType,
      pageNumber: 1,
    },
  });
};

// 페이지가 변경되면 실행되는 API
const handlePageChange = async (page: number) => {
  searchCondition.value.pageNumber = page;
  currentPage.value = page;

  await fetchPosts();

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

const resetSearchCondition = async () => {
  searchCondition.value = {
    searchType: '',
    searchText: '',
    sortOrder: '',
    sortType: '',
    pageNumber: 1,
  };

  await router.push({ name: 'Board' });

  await fetchPosts();
};

const fetchPosts = async () => {
  const response = await getBoardList(searchCondition.value);
  posts.value = response.data.body.boards;
  totalPages.value = response.data.body.totalPages;
};

onMounted(async () => {
  currentPage.value = parseInt(route.query.pageNumber, 10) || 1;
  searchCondition.value.pageNumber = parseInt(route.query.pageNumber, 10) || 1;
  await fetchPosts();
});
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
