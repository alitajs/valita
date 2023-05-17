<template>
  <div>
    <h1>valita & vue</h1>
    <h2>{{ hello }}</h2>
    <h2>isKeepAlive is {{ isKeepAlive }}</h2>
    <div>
      <router-link to="/users/foo">Go to Users Foo</router-link>
    </div>
    <div><router-link to="/name">Go to name</router-link></div>
    <div><router-link to="/tab">Go to tab</router-link></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useAppData } from 'valita';

const hello = ref<string>('hello vue');
const { routes } = useAppData();
const isKeepAlive = routes['index']?.meta?.keepalive;
</script>
<style lang="less" scoped>
div {
  font-size: 24px;
}
</style>

<script lang="ts">
export const routeProps = {
  meta: { title: '首页', keepalive: true },
};
</script>
