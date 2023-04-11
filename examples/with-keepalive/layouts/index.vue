<template>
  <div>
    <div>this is layouts123</div>
    <RouterView v-slot="{ Component }">
      <KeepAlive :include="['/users/foo', 'users']">
        <component :is="Component"></component>
      </KeepAlive>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from "valita";
</script>
