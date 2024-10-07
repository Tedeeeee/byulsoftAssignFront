<template>
  <div class="button-container q-mt-md">
    <q-btn label="수정" @click="updateModalOpen('수정하시겠습니까?')" color="primary" class="q-mr-xs" />
    <q-btn label="삭제" @click="deleteModalOpen('삭제하시겠습니까?')" color="negative" class="q-mr-xs" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'updateModal', message: string): void;
  (e: 'deleteModal', message: string): void;
}>();

const updateModalOpen = (message: string) => {
  emit('updateModal', message);
};

const deleteModalOpen = (message: string) => {
  emit('deleteModal', message);
};
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: 0 auto;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
