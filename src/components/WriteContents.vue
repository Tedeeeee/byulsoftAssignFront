<template>
  <q-page padding>
    <q-form @submit.prevent="submitForm" class="q-gutter-md">
      <div class="flex items-center">
        <div style="flex: 3; margin-right: 10px">
          <q-select
            v-model="formState.region"
            :options="regionOptions"
            label="지역"
            :rules="[val => !!val || '']"
            filled
            class="custom-input"
          />
        </div>
        <div style="flex: 7">
          <q-input v-model="formState.title" label="제목" filled autofocus :rules="[val => !!val || '']" class="custom-input" />
        </div>
      </div>
      <div>
        <div class="q-gutter-md flex items-center">
          <div class="q-mr-md" style="flex: 2">
            <div class="title">난이도</div>
          </div>
          <div style="flex: 8">
            <q-rating
              v-model="formState.difficultyRating"
              max="5"
              color="amber"
              icon="star"
              label="별점"
              :disable="!formState.title || !formState.selectRegion"
            />
          </div>
        </div>
        <q-input v-model="formState.difficulty" label="한줄평" filled :disable="!formState.title || !formState.selectRegion" />
      </div>
      <div>
        <div class="q-gutter-md flex items-center">
          <div class="q-mr-md" style="flex: 2">
            <div class="title">인테리어</div>
          </div>
          <div style="flex: 8">
            <q-rating
              v-model="formState.interiorRating"
              max="5"
              color="amber"
              icon="star"
              label="별점"
              :disable="!formState.title || !formState.selectRegion"
            />
          </div>
        </div>
        <q-input v-model="formState.interior" label="한줄평" filled :disable="!formState.title || !formState.selectRegion" />
      </div>
      <div>
        <div class="q-gutter-md flex items-center">
          <div class="q-mr-md" style="flex: 2">
            <div class="title">스토리</div>
          </div>
          <div style="flex: 8">
            <q-rating
              v-model="formState.storyRating"
              max="5"
              color="amber"
              icon="star"
              label="별점"
              :disable="!formState.title || !formState.selectRegion"
            />
          </div>
        </div>
        <q-input v-model="formState.story" label="한줄평" filled :disable="!formState.title || !formState.selectRegion" />
      </div>
      <div>
        <div class="q-gutter-md flex items-center">
          <div class="q-mr-md" style="flex: 2">
            <div class="title">공포도</div>
          </div>
          <div style="flex: 8">
            <q-rating
              v-model="formState.horrorRating"
              max="5"
              color="amber"
              icon="star"
              label="별점"
              :disable="!formState.title || !formState.selectRegion"
            />
          </div>
        </div>
        <q-input v-model="formState.horror" label="한줄평" filled :disable="!formState.title || !formState.selectRegion" />
      </div>
      <div>
        <div class="q-gutter-md flex items-center">
          <div class="q-mr-md" style="flex: 2">
            <div class="title">활동성</div>
          </div>
          <div style="flex: 8">
            <q-rating
              v-model="formState.activityRating"
              max="5"
              color="amber"
              icon="star"
              label="별점"
              :disable="!formState.title || !formState.selectRegion"
            />
          </div>
        </div>
        <q-input v-model="formState.activity" label="한줄평" filled :disable="!formState.title || !formState.selectRegion" />
      </div>

      <div class="title">총평</div>
      <q-input
        v-model="formState.content"
        label="내용"
        type="textarea"
        rows="10"
        filled
        :rules="[val => !!val || '내용을 입력하세요']"
        :disable="!formState.title || !formState.selectRegion"
      />

      <q-btn type="submit" label="작성하기" color="primary" class="q-mt-md" />
    </q-form>
    <br />
    {{ formState }}
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TotalContents, regionOptions } from '@/type/Contents';
import { insertContents } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const formState = ref<TotalContents>({
  nickname: localStorage.getItem('user'),
  title: '',
  content: '',
  region: '',
  difficulty: '',
  difficultyRating: 0,
  horror: '',
  horrorRating: 0,
  story: '',
  storyRating: 0,
  activity: '',
  activityRating: 0,
  interior: '',
  interiorRating: 0,
});

const submitForm = async () => {
  await insertContents(formState.value);
  router.push('/');
};
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
  height: 56px;
  line-height: 1.5;
}
</style>
