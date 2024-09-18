<template>
  <q-card flat bordered class="q-pa-sm">
    <div class="row">
      <div class="left-section q-mr-sm">
        <q-img :src="image" alt="사진" style="width: 70px; height: 70px" />
      </div>
      <div class="right-section">
        <div class="row q-mt-sm">
          <div class="col">
            <q-rating v-model="star.boardStarRating" max="5" readonly />
          </div>
        </div>
        <div class="info-section q-mb-sm">
          <h6>{{ star.boardStarShortReview }}</h6>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import difficultyImage from '@/assets/난이도.png';
import storyImage from '@/assets/스토리.png';
import interiorImage from '@/assets/인테리어.png';
import activityImage from '@/assets/활동성.png';
import horrorImage from '@/assets/공포도.png';
import type { BoardStar } from '@/type/BoardStarType';

const images = [difficultyImage, storyImage, interiorImage, activityImage, horrorImage];
const props = defineProps<{
  star : BoardStar,
  image : string
}>()

</script>

<style scoped>

</style>