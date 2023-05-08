<template>
    <div v-access="access">Admin</div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
const access = useAccess('/admin');
</script>