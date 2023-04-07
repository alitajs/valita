<template>
    <div class="page">
        <div>
            {{ $t('lang') }}:
            {{ $t('test') }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'valita'
const { t } = useI18n();
</script>
<style scoped lang="less">
.page {
    font-size: 24px;
}
</style>