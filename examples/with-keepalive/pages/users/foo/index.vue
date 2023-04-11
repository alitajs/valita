<template>
  <div class="foo">users: Foo</div>
  <div>
    <router-link to="/">Go to Home</router-link>
    <div>
      <div>{{ index }}</div>
      <button @click="addIndex">add</button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "users",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";
const index = ref<number>(0);
const addIndex = () => {
  index.value = index.value += 1;
};
</script>
<style lang="less" scoped>
.foo {
  background-color: aqua;
  font-size: 10rem;
}
</style>
