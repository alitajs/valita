<template>
  <div :style="{ height: '100px' }" />
  <router-link to="/">Go to Home</router-link>
  <div>this is tab pages</div>
  {{ nameValue }}
  <button @click="nameValue++">add</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const nameValue = ref(0);
</script>
