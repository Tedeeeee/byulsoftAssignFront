<template>
  <q-page padding>
    <q-form @submit.prevent="submitForm" class="q-gutter-md">
      <div class="flex items-center">
        <div style="flex: 3; margin-right: 10px">
          <q-select
            v-model="contentsData.selectRegion"
            :options="regionOptions"
            label="지역"
            :rules="[val => !!val || '']"
            filled
            class="custom-input"
          />
        </div>
        <div style="flex: 7">
          <q-input v-model="contentsData.title" label="제목" filled autofocus :rules="[val => !!val || '']" class="custom-input" />
        </div>
      </div>
      <div v-for="(item, idx) in formQuestions" :key="idx">
        <div class="q-gutter-md flex items-center">
          <div class="q-mr-md" style="flex: 2">
            <div class="title">{{ item.label }}</div>
          </div>
          <div style="flex: 8">
            <q-rating
              v-model="item.rating"
              max="5"
              color="amber"
              icon="star"
              label="별점"
              :disable="!contentsData.title || !contentsData.selectRegion"
            />
          </div>
        </div>
        <q-input v-model="item.shortReview" label="한줄평" filled :disable="!contentsData.title || !contentsData.selectRegion" />
      </div>

      <div class="title">총평</div>
      <q-input
        v-model="contentsData.content"
        label="내용"
        type="textarea"
        rows="10"
        filled
        :rules="[val => !!val || '내용을 입력하세요']"
        :disable="!contentsData.title || !contentsData.selectRegion"
      />

      <q-btn type="submit" label="작성하기" color="primary" class="q-mt-md" />
    </q-form>
    {{ title }}
    <br />
    {{ formQuestions }}
    <br />
    {{ content }}
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { regionOptions, questions } from '@/type/contents';

const formQuestions = ref(questions);

const contentsData = ref({
  title: '',
  content: '',
  selectRegion: '',
});

const submitForm = () => {};
</script>

<style scoped>
.q-page {
  max-width: 700px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}

.custom-select,
.custom-input {
  height: 56px; /* q-input과 q-select의 기본 높이 */
  line-height: 1.5;
}
</style>
