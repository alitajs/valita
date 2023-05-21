<template>
  <div>
    <router-link to="/name">Go to Name</router-link>
  </div>
  <div>
    <router-link to="/age">Go to Age</router-link>
  </div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>22</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
  <div>11</div>
</template>

<script setup lang="ts">
import { history } from 'valita';

const goToName = () => {
  history.push('/name');
};
</script>

<style lang="less" scoped>
div {
  font-size: 24px;
}
</style>
