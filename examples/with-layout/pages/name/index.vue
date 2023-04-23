<template>
  <div>this is name page</div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { setPageNavBar } from "valita";

onMounted(() => {
  setPageNavBar({
    pagePath: "/name",
    navBar: {
      pageTitle: "newName",
      title: "newName",
    },
  });
});
</script>
<style lang="less" scoped>
div {
  font-size: 24px;
}
</style>
