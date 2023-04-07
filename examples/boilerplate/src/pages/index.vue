<template>
  <h1>Hi!</h1>
  <h1>Hi!</h1>
  <div v-if="loading">Loading</div>
  <div v-else>Hello {{ data.text }}</div>
</template>
<style scoped>
div {
  font-size: 24px;
}
</style>
<script setup>
import { query } from '@/services/api';
import { useRequest } from 'valita';
// TODO: 备选方案
// import { useAsyncState } from '@vueuse/core';

// const { state, isReady, isLoading } = useAsyncState((a) => {
//   console.log(a)
//   return query(a)
// },
//   { id: null },
// )
const { data, error, loading } = useRequest(query);
</script>
