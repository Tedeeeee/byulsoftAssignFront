<template>
  <div v-if="props.nickname === nowNickname" class="button-container q-mt-md">
    <q-btn label="수정" @click="$emit('updateModal', '수정하시겠습니까?')" color="primary" class="q-mr-xs" />
    <q-btn label="삭제" @click="$emit('deleteModal', '삭제하시겠습니까?')" color="negative" class="q-mr-xs" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';

const nowNickname = useUserStore().userNickname;
const props = defineProps<{
  nickname: string;
}>()
const emit = defineEmits<{
  (e: 'updateModal', text: string): void;
  (e: 'deleteModal', text: string): void;
}>()
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