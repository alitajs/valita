<template>
  <div class="page">
    <!-- <button v-if="accessOption" type="button">admin</button> -->
  </div>
</template>

<script setup lang="ts">
// import { access, useAccess } from '@alitajs/access'
// access.setRole('admin')
// const accessOption = useAccess('/admin');
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
