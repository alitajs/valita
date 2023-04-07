# @alitajs/vue-request

定义 services

```ts
import { request } from 'valita';

export async function query(prames): Promise<any> {
  console.log(prames);
  return request('/hello');
}
```

```vue
<script setup>
import { useRequest , request } from 'valita';
import { query } from './services';
const { data, error, loading } = useRequest(query);
</script>

<template>
  <h1>Hi!</h1>
  <div v-if="loading">Loading</div>
  <div v-else>Hello {{ data.text }}</div>
</template>
```

> 感觉 import { useAsyncState } from '@vueuse/core'; 的用法更 vue ？