<template>
  <!--  제목, 카테고리  >> 하실 수 있으면 , 제목 + 내용, 제목 + 댓글 + 내용-->
  <!--  난이도, 스토리, 인테리어, 공포도, 활동성 별로 SORTING -->
  <div class="flex items-center">
    <div style="flex: 3; margin-right: 10px">
      <q-select
        v-model="postContents.boardRegion"
        :options="regionOptions"
        label="지역"
        lazy-rules
        :rules="[val => !!val || notifyError('지역을 입력해주세요')]"
        filled
        class="custom-input"
      />
    </div>
    <div style="flex: 7">
      <q-input
        maxlength="40"
        v-model="postContents.boardTitle"
        label="제목"
        filled
        autofocus
        lazy-rules
        :rules="[val => !!val || notifyError('제목을 입력해주세요')]"
        class="custom-input"
      />
    </div>
  </div>
  <div v-for="(type, idx) in postContents.boardStars" :key="idx">
    <div class="q-gutter-md flex items-center">
      <div class="q-mr-md" style="flex: 2">
        <div class="title">{{ typeName[idx] }}</div>
      </div>
      <div style="flex: 8">
        <q-rating v-model="type.boardStarRating" max="5" color="amber" icon="star"
                  label="별점" />
      </div>
    </div>
    <q-input maxlength="100" v-model="type.boardStarShortReview" class="contentsText" label="한줄평" filled />
  </div>

  <div class="title">총평</div>
  <q-input
    v-model="postContents.boardContent"
    class="contentsText"
    label="내용"
    type="textarea"
    rows="10"
    filled
    :rules="[val => !!val || notifyError('총평을 입력해주세요')]"
  />
</template>

<script setup lang="ts">
import { regionOptions } from '@/type/Contents';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const postContents = defineModel();
const typeName = ['난이도', '스토리', '인테리어', '활동성', '공포도'];

const notifyError = (message: string) => {
  $q.notify({
    message: message,
    color: 'negative',
    position: 'top',
    timeout: 2000,
  });
  return false;
};
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
