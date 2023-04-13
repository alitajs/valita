<template>
  <div>
    <h1>valita & vue</h1>
    <h2>{{ hello }}</h2>
    <div>
      <router-link to="/users/foo">Go to Users Foo</router-link>
    </div>
    <div>
      <router-link to="/name/name">Go to name</router-link>(配置 name 可成功)
    </div>
    <div>
      <router-link to="/tab">Go to tab</router-link>(需要配置 index 才能成功)
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useAppData } from 'valita';

const hello = ref<string>('hello vue');
const app = useAppData();
console.log(app);
</script>
<style lang="less" scoped>
div {
  font-size: 24px;
}
</style>
