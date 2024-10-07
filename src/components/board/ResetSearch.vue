<template>
  <div class="flex flex-center q-pa-sm">
    <q-btn @click="emit('resetSearchCondition')" color="secondary" icon="settings" size="sm" label="검색 조건 초기화" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'resetSearchCondition'): void;
}>()
</script>