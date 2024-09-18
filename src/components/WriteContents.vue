<template>
  <!--  제목, 카테고리  >> 하실 수 있으면 , 제목 + 내용, 제목 + 댓글 + 내용-->
  <!--  난이도, 스토리, 인테리어, 공포도, 활동성 별로 SORTING -->
  <div class="flex items-center">
    <div style="flex: 3; margin-right: 10px">
      <q-select v-model="review.region" :options="regionOptions" label="지역" :rules="[val => !!val || '']" filled class="custom-input" />
    </div>
    <div style="flex: 7">
      <q-input maxlength="40" v-model="review.title" label="제목" filled autofocus :rules="[val => !!val || '']" class="custom-input" />
    </div>
  </div>
  <div v-for="(type, idx) in review.boardStars" :key="idx">
    <div class="q-gutter-md flex items-center">
      <div class="q-mr-md" style="flex: 2">
        <div class="title">{{ typeName[idx] }}</div>
      </div>
      <div style="flex: 8">
        <q-rating v-model="type.starRating" max="5" color="amber" icon="star" label="별점" />
      </div>
    </div>
    <q-input maxlength="100" v-model="type.starShortReview" class="contentsText" label="한줄평" filled />
  </div>

  <div class="title">총평</div>
  <q-input
    v-model="review.contents"
    class="contentsText"
    label="내용"
    type="textarea"
    rows="10"
    filled
    :rules="[val => !!val || '내용을 입력하세요']"
  />
</template>

<script setup lang="ts">
import { regionOptions } from '@/type/Contents';

const review = defineModel();
const typeName = ['난이도', '스토리', '인테리어', '활동성', '공포도'];
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}

.custom-input {
  height: 56px;
  line-height: 1.5;
}
</style>
