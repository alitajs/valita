<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="keepAlive" >
          <component :is="Component" />
        </keep-alive>
    </router-view>
  </template>
  <script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted, watch } from 'vue';
  import { keepaliveEmitter } from './emitter';
  
  const route = useRoute();
  const router = useRouter();

  const keepAlive = ref(getInitKeepAlive());

  onMounted(() => {
    keepaliveEmitter?.useSubscription?.((event: any) => {
      const { type = '', payload = {} } = event;
      switch(type){
        case 'dropByCacheKey':
          dropByCacheKey(payload?.path);
          break;
        default:
          break;
      }
    })
  })

  function dropByCacheKey(path: string) {
    const _keepAlive = [...keepAlive.value];
    const keepIndex = _keepAlive.indexOf(path);
    if (keepIndex !== -1) {
      _keepAlive.splice(keepIndex, 1);
    }
    keepAlive.value = _keepAlive;
  }
  
  function isKeepPath(aliveList: any[], path: string, route: any) {
    let isKeep = false;
    aliveList.map(item => {
      if (item === path) {
        isKeep = true;
      }
      if (item instanceof RegExp && item.test(path)) {
        isKeep = true;
      }
      if (typeof item === 'string' && item.toLowerCase() === path.toLowerCase()) {
        isKeep = true;
      }
    })
    if (isKeep === false) {
      isKeep = !!route?.keepAlive || !!route.meta?.keepAlive;
    }
    if (route?.redirect) {
      isKeep = false;
    }
    return isKeep;
  }
  
  function checkIsKeepAlive(_route: any) {
      const isKeep = isKeepPath([{{{ keepalive }}}], _route.path, _route);
      if (isKeep) {
        const matched = _route.matched;
        const component = matched[matched.length - 1].components.default;
        const name = _route.meta?.name ?? _route.name ?? component?.name ?? _route?.path;
        if (name && component) {
          component.name = name;
          return name;
        }
      }
      return null;
  }
  
  function getInitKeepAlive() {
    const name = checkIsKeepAlive(route);
    return name ? [name] : [];
  }

  router.afterEach(() => {
    const name = checkIsKeepAlive(route);
    if (name && !keepAlive.value.includes(name)) {
      keepAlive.value = [...keepAlive.value, name];
    }
  });
  </script>