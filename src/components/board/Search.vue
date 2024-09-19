<template>
  <div class="q-pa-md flex justify-center">
    <q-card flat bordered class="q-pa-md" style="max-width: 1000px; width: 900px">
      <div class="title">검색</div>
      <div class="flex justify-center items-center" style="height: 30%">
        <div class="row q-gutter-sm" style="width: 100%">
          <div class="col-3 q-pa-sm">
            <q-select filled v-model="select" :options="selectCategory" label="카테고리" />
          </div>
          <div v-if="select === '제목'" class="col-7 q-pa-sm">
            <q-input standout="bg-teal text-white" v-model="text" label="검색" />
          </div>
          <div v-else class="col-7 q-pa-sm">
            <q-select filled v-model="text" :options="regionOptions" />
          </div>
          <div class="col-1 q-pa-sm">
            <q-btn @click="$emit('searchPosts', select, text)" color="primary" icon="search" size="lg" />
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { regionOptions } from '@/type/Contents';
import { ref, watch } from 'vue';

const selectCategory = ['제목', '지역'];
const select = ref('제목');
const text = ref('');

watch(select, newValue => {
  if (newValue == '지역') {
    text.value = '서울';
  } else {
    text.value = '';
  }
});
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.col-3 {
  flex: 3;
}

.title {
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
