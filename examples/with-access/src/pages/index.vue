<template>
  <div class="page">
    <Admin />
    <Normal />
    <div>当前权限:{{ access.currentRole }}</div>
    <button @click="() => set('normal')">setNormal</button>
    <button @click="() => set('admin')">setAdmin</button>
  </div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
import Admin from '../components/admin.vue'
import Normal from '../components/normal.vue'
const access = useAccess('/');
const set = (role) => {
  access.setRole(role);
  console.log(access);
}
</script>

<style scoped lang="less">
.page {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.van-button {
  margin: 10px;
}
</style>
