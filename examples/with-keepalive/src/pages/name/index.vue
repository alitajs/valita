<template>
  <div :style="{ height: '100px' }" />
  <div>this is name pages</div>
  {{ nameValue }}
  <button @click="nameValue++">add</button>
  <router-link to="/">Go to Home</router-link>
  <div>
    <van-button type="primary" @click="dropByNameCache"
      >dropByCacheKey</van-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onActivated } from 'vue';
import { dropByCacheKey } from 'valita';

const nameValue = ref(0);

onMounted(() => {
  console.log('this is onMounted');
});

onActivated(() => {
  console.log('this is onActivated');
});

const dropByNameCache = () => {
  dropByCacheKey('/name');
};
</script>
