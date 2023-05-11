<template>
  <div class="page">
    <div>当前权限:{{ access.currentRole }}</div>
    <div>
      <button type="primary" @click="set('normal')">setNormal</button>
      <button type="primary" @click="set('admin')">setAdmin</button>
      <button type="primary" @click="addAccess()">add Normal to Admin </button>
    </div>
    <div class="link">
      <div style="margin: 10px;"><router-link to="/normal">Go Normal</router-link></div>
      <div style="margin: 10px;"><router-link to="/admin">Go Admin</router-link></div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
const access = useAccess('/');
const set = (role) => {
  access.setRole(role);
}
const addAccess = () => {
  access.setAccess(['/normal'])
}
</script>

<style scoped lang="less">
.page {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

button {
  margin: 10px;
  height: 50px;
  width: 150px;
  background-color: rgb(208, 177, 237);
  border: 0;
  font-size: 20px;
  border-radius: 5px;
  vertical-align: top;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
