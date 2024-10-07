<template>
  <div class="flex flex-center">
    <q-card flat class="q-pa-md" style="max-width: 1000px; width: 900px">
      <div class="flex flex-center">
        <div class="row q-gutter-sm">
          <q-btn
            flat
            label="난이도↑"
            @click="handleSort('desc', 'difficulty')"
            :color="isActive('desc', 'difficulty') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="스토리↑"
            @click="handleSort('desc', 'story')"
            :color="isActive('desc', 'story') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="인테리어↑"
            @click="handleSort('desc', 'interior')"
            :color="isActive('desc', 'interior') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="공포도↑"
            @click="handleSort('desc', 'horror')"
            :color="isActive('desc', 'horror') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="활동성↑"
            @click="handleSort('desc', 'activity')"
            :color="isActive('desc', 'activity') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
        </div>
      </div>
      <div class="flex flex-center">
        <div class="row q-gutter-sm">
          <q-btn
            flat
            label="난이도↓"
            @click="handleSort('asc', 'difficulty')"
            :color="isActive('asc', 'difficulty') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="스토리↓"
            @click="handleSort('asc', 'story')"
            :color="isActive('asc', 'story') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="인테리어↓"
            @click="handleSort('asc', 'interior')"
            :color="isActive('asc', 'interior') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="공포도↓"
            @click="handleSort('asc', 'horror')"
            :color="isActive('asc', 'horror') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            label="활동성↓"
            @click="handleSort('asc', 'activity')"
            :color="isActive('asc', 'activity') ? 'orange' : 'primary'"
            class="q-mr-xs"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const emit = defineEmits<{
  (e: 'sort'): void;
}>();
const searchCondition = defineModel();

const handleSort = (sortOrder: string, sortType: string) => {
  searchCondition.value.sortOrder = sortOrder;
  searchCondition.value.sortType = sortType;

  emit('sort');
};

const isActive = (sortOrder: string, sortType: string) => {
  return searchCondition.value.sortType === sortType && searchCondition.value.sortOrder === sortOrder;
};

onMounted(() => {
  isActive(searchCondition.value.sortType, searchCondition.value.sortType);
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
</style>
