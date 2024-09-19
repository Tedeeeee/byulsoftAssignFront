<template>
  <div class="flex flex-center">
    <div class="row q-gutter-sm">
      <q-btn
        flat
        label="난이도↑"
        @click="handleSort('desc', 'difficulty')"
        :color="isActive('difficulty', 'desc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="스토리↑"
        @click="handleSort('desc', 'story')"
        :color="isActive('story', 'desc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="인테리어↑"
        @click="handleSort('desc', 'interior')"
        :color="isActive('interior', 'desc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="공포도↑"
        @click="handleSort('desc', 'horror')"
        :color="isActive('horror', 'desc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="활동성↑"
        @click="handleSort('desc', 'activity')"
        :color="isActive('activity', 'desc') ? 'orange' : 'primary'"
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
        :color="isActive('difficulty', 'asc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="스토리↓"
        @click="handleSort('asc', 'story')"
        :color="isActive('story', 'asc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="인테리어↓"
        @click="handleSort('asc', 'interior')"
        :color="isActive('interior', 'asc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="공포도↓"
        @click="handleSort('asc', 'horror')"
        :color="isActive('horror', 'asc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
      <q-btn
        flat
        label="활동성↓"
        @click="handleSort('asc', 'activity')"
        :color="isActive('activity', 'asc') ? 'orange' : 'primary'"
        class="q-mr-xs"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  page: number;
}>();
const emit = defineEmits<{
  (e: 'sort', sortOrder: string, sortType: string, pageNumber: number): void;
}>();

const sortData = ref({
  sortOrder: '',
  sortType: '',
  pageNumber: props.page,
});

const handleSort = (order, type) => {
  sortData.value.sortOrder = order;
  sortData.value.sortType = type;

  emit('sort', order, type, props.page);
};

const isActive = (name: string, type: string) => {
  return sortData.value.sortType === name && sortData.value.sortOrder === type;
};
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
