<template>
  <div class="flex flex-center">
    <q-card flat class="q-pa-md" style="max-width: 1000px; width: 900px">
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

    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SearchCondition } from '@/type/Board';
const props = defineProps<{
  page: number;
  sortOrder: string;
  sortType: string;
}>();

const emit = defineEmits<{
  (e: 'sort', sortOrder: string, sortType: string, pageNumber: number): void;
  (e: 'resetSearchCondition'): void;
}>();

const sortData = ref<Pick<SearchCondition, 'searchType' | 'searchText' | 'pageNumber'>>({
  sortOrder: props.sortOrder,
  sortType: props.sortType,
  pageNumber: props.page,
});

console.log(sortData.value);

const handleSort = (sortOrder: string, sortType: string) => {
  sortData.value.sortOrder = sortOrder;
  sortData.value.sortType = sortType;

  emit('sort', sortOrder, sortType, props.page);
};

const isActive = (sortType: string, sortOrder: string) => {
  return sortData.value.sortType === sortType && sortData.value.sortOrder === sortOrder;
};

onMounted(() => {
  isActive(props.sortType, props.sortType);
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
