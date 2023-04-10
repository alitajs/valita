<template>
  <div class="page">
    <div>
      {{ t('lang') }}:
      {{ t('test') }}
    </div>
    <div>
      <van-button type="primary" size="small" @click="setLocale('en-US')"
        >en-US</van-button
      >
      <van-button type="primary" size="small" @click="setLocale('zh-CN')"
        >zh-CN</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { setLocale, useI18n } from 'valita';
const { t, locale } = useI18n();
</script>

<style scoped lang="less">
.page {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.van-button {
  margin: 10px;
}
</style>
