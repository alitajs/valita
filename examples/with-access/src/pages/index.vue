<template>
  <div class="page">
    <div>
    </div>
    <div>
      <van-button type="primary" @click="setRole('normal')">normal</van-button>
      <van-button type="primary" @click="setRole('admin')">admin</van-button>
    </div>
    <van-button type="primary" size="small">{{ access.currentRole }}</van-button>
  </div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
const access = useAccess('/admin')
const setRole = (role: string) => {
  access.setRole(role);
  console.log(access.currentRole.value);
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
