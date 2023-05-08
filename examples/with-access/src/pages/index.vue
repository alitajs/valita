<template>
  <div class="page">
    <Admin />
    <Normal />
    <div>当前权限:{{ access.currentRole }}</div>
    <div>
      <button type="primary" @click="set('normal')">setNormal</button>
      <button type="primary" @click="set('admin')">setAdmin</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
import Admin from '../components/admin.vue'
import Normal from '../components/normal.vue'
const access = useAccess('/');
const set = (role) => {
  access.setRole(role);
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

button {
  margin: 10px;
  height: 40px;
  width: 120px;
  background-color: rgb(208, 177, 237);
  border: 0;
  font-size: 20px;
  border-radius: 5px;
}
</style>
