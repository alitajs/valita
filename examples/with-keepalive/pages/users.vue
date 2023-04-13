<template>
  <div :style="{ height: '100px' }" />
  <div>
    users layout
    {{ nameValue }}
    <button @click="nameValue++">add</button>
    <KeepAliveLayout></KeepAliveLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import KeepAliveLayout from '@@/plugin-keepalive/layout.vue';
const nameValue = ref(0);
</script>
