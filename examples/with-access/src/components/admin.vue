<template>
    <div v-access="access">只有Admin可见</div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
const access = useAccess('/admin');
</script>