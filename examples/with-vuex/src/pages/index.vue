<template>
  <div>
    <h1>valita & vue</h1>
    <h2>with vuex</h2>
    <h3>{{ product.name }}</h3>
    <h3>{{ product.num }}</h3>
    <h3>{{ count.all }}</h3>
    <button @click="addBtn">add</button>
    <button @click="changeCountAll">changeCountAll</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const { commit, dispatch } = store;

const product = computed(() => store.state.product);
const count = computed(() => store.state.count);

onMounted(() => {
  // 异步
  dispatch("product/changeName", {
    name: `${product.value.name}1`,
  });
});

const addBtn = () => {
  // 同步
  commit("product/save", {
    num: (product.value.num += 1),
    name: `${product.value.name}1`,
  });
};

const changeCountAll = () => {
  dispatch("product/changeAll", {
    all: `newAll`,
  });
};
</script>

<style lang="less" scoped>
div {
  font-size: 24px;
}
</style>
