<template>
  <search @search-posts="searchPosts"/>
  <sort-type :page="currentPage" @sort="sortPostList" />

  <q-page padding>
    <div class="q-gutter-md">
      <post-card
        v-for="(post, idx) in posts"
        :key="idx"
        :item="post"
        @detail-post="detailPost"
      />
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

const router = useRouter();
const posts = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const sortData = ref({
  sortName: '',
  sortType: '',
  pageNum: currentPage.value,
});

const searchPosts = (searchText: string) => {
  console.log(searchText);
}

const detailPost = (id: number) => {
  router.push({ name: 'Post', params: { id: id } });
};

// 특수 장르를 기준으로 정렬
const sortPostList = async (sortOrder: string, sortType: string, pageNum: number) => {
  const response = await sortBoardByCategory(sortOrder, sortType, pageNum);
  posts.value = response.data;
};

// 기본적인 정렬
const fetchPosts = async () => {
  const response = await getAllBoard(currentPage.value);
  posts.value = response.data;
};

const fetchPostCount = async () => {
  const response = await getPostsCount(currentPage.value);
  totalPages.value = response.data;
};

const handlePageChange = async page => {
  sortData.value.pageNum = page;
  await fetchPosts(sortData.value.sortName, sortData.value.sortType, sortData.value.pageNum);
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
