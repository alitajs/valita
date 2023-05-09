# @alitajs/access

对于前端应用来说，权限就是页面、页面元素是否可见。

在此插件设计中，一个页面权限对应着一个路由，例如当访问'/admin'这个路由时，如果当前角色并不具有这个路由的权限，那么则不会渲染这个组件。


使用示例：
```vue
<template>
    <div v-access="access">只有Admin可见</div>
</template>

<script setup lang="ts">
import { useAccess } from 'valita';
const access = useAccess('/admin');
</script>
```

useAccess，它设置一个当前组件的路由，它会返回一个对象，这个对象类型定义如下：
```tsx
export interface AccessReturn {
    setRole: (role: Promise<string> | string) => void; //接受一个Promise或字符串，设置当前的角色。
    setAccess: (role: Promise<string[]> | string[] | AccessInfo) => void; //接受一个Promise或字符串数组，或者一个包含role和accessIds的对象。
    hasAccess: ComputedRefImpl; //一个响应式对象，返回当前是否具有权限
    currentRole: ComputedRefImpl; //一个响应式对象，返回当前角色
}
```


在valita中使用了自定义指令directive的方式，通过v-access这个指令，传入useAccess返回的对象，来控制组件的渲染。
