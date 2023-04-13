# @alitajs/vue-keepalive

* 类型：`(string | RegExp)[]`

配置需要状态保持的路由。

```ts
import { defineConfig } from 'valita';

export default defineConfig({
  keepalive: ['/list'],
});
```

> 注意，keepalive 的配置项，支持正则表达式。但是所有的路由正则匹配应该是全小写的，比如不管你的路由是 `home`、`Home` 还是 `hoMe` ，只有设置 `keepalive:[/home/]` 才有效。而字符串的配置方式就刚好相反，如果你的路由是`home`，你配置 `home`、`Home` 还是 `hoMe` 都有效。

在需要使用  `<router-view></router-view>` 都需要使用 `<KeepAliveLayout>`  代替

```diff
<template>
-   <router-view></router-view>
+   <KeepAliveLayout></KeepAliveLayout>
</template>
+ <script lang="ts" setup>
+ import KeepAliveLayout from '@@/plugin-keepalive/layout.vue';
+ </script>
```