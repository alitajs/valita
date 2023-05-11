<template>
    <div v-access="access">Normal</div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
const access = useAccess('/normal');
</script>