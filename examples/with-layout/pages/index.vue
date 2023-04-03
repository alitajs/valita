<template>
  <div>11</div>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue';
import { useAppData } from 'valita';

const hello = ref<string>('hello vue');
const app = useAppData();

const valitaHello = inject('valita-hello');
</script>
<style lang="less" scoped>
div {
  font-size: 24px;
}
</style>
