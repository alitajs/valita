<template>
  <div :style="{ height: '100px' }" />
  <div>this is name pages</div>
  {{ nameValue }}
  <button @click="nameValue++">add</button>
  <router-link to="/">Go to Home</router-link>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const nameValue = ref(0);
</script>
