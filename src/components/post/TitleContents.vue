<template>
  <q-card flat bordered class="q-pa-md">
    <div class="row">
      <div class="left-section q-mr-md">
        <q-img :src="imageSource" alt="사진" style="width: 150px; height: 150px" />
      </div>
      <q-separator vertical />
      <div class="right-section">
        <div class="info-section q-mb-md">
          <h4>[{{ title.boardRegion }}] {{ title.boardTitle }}</h4>
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
            <span class="col-3">{{ title.boardCreatedAt }}</span>
          </div>
          <q-separator vertical />
          <div class="col">
            <span>조회수</span><br />
            <span class="col-2">{{ title.boardView }}</span>
          </div>
          <q-separator vertical />
          <div class="col">
            <span>좋아요</span><br />
            <span class="col-2">{{ title.boardLikes }}</span>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import pathToImage from '@/assets/웃는 사진.jpeg';
import { Post } from '@/type/BoardStarType';
import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue';

const imageSource = ref(pathToImage);
const nickname = useUserStore().userNickname;
const props = defineProps<{
  title: Post;
}>();
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
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

.q-mr-md {
  margin-right: 0.5rem;
}

.q-mb-md {
  margin-bottom: 1rem;
}

.q-mb-md {
  margin-bottom: 16px;
}
</style>