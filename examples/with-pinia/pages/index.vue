<template>
  <div>
    <h1>valita & vue</h1>
    <h2>with pinia</h2>
    <p>{{ doubleValue }}</p>
    <button @click="increment">click me!</button>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/count';
import { computed } from 'vue';
const store = useCounterStore();

const increment = () => {
  store.increment();
};
const doubleValue = computed(() => store.doubleCount);
</script>

<style lang="less" scoped>
div {
  font-size: 24px;
}
</style>
