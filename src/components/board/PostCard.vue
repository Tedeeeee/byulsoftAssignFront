<template>
  <q-card flat bordered class="q-pa-md post-card" @click="detailPost">
    <div class="row">
      <div class="left-section q-mr-md">
        <span style="font-size: 80px; font-weight: bold; margin-left: 10px">{{ item.boardId }}</span>
      </div>
      <q-separator vertical />
      <div class="right-section">
        <div class="info-section q-mb-md">
          <h4>[{{ item.boardRegion }}] {{ item.boardTitle }}</h4>
          <div class="info-row row items-center q-gutter-sm">
            <span class="col-5">작성자: {{ item.memberNickname }}</span>
            <span class="col-5">작성시간: {{ item.boardCreatedAt }}</span>
          </div>
        </div>
        <q-separator />
        <div class="row q-col-gutter-ms q-mt-md">
          <div v-for="(type, idx) in item.boardStars" :key="idx" class="col">
            <span>{{ typeName[idx] }}</span>
            <q-rating v-model="type.boardStarRating" max="5" readonly class="black-stars" />
            <q-separator vertical />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import type { Post } from '@/type/BoardStarType';

const typeName = ['난이도', '스토리', '인테리어', '활동성', '공포도'];
const props = defineProps<{
  item: Post;
}>();
const emit = defineEmits<{
  (e: 'detailPost', boardId: number): void;
}>();

const detailPost = () => {
  emit('detailPost', props.item.boardId);
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

.info-section {
  margin-bottom: 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.col-5 {
  flex: 3;
}
</style>
