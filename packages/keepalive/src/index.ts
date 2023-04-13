import { join } from 'path';
import { IApi } from 'valita';

const DIR_NAME = 'plugin-keepalive';

export default (api: IApi) => {
  api.describe({
    key: 'keepalive',
    config: {
      schema(Joi) {
        return Joi.array().items(Joi.alternatives(Joi.string(), Joi.any()));
      },
      onChange: api.ConfigChangeType.reload,
    },
    enableBy: api.EnableBy.config,
  });

  const configStringify = (config: (string | RegExp)[]) => {
    return config.map((item) => {
      if (item instanceof RegExp) {
        return item;
      }
      return `'${item}'`;
    });
  };

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'layout.vue'),
      noPluginDir: true,
      content: `
      <template>
      <router-view v-slot="{ Component, route }">
          <keep-alive :include="keepAlive">
              <component :is="Component" />
          </keep-alive>
      </router-view>
  </template>
  <script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  
  const route = useRoute();
  const router = useRouter();
  
  const isKeepPath = (aliveList: any[], path: string, route: any) => {
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
          console.log('redirect')
          isKeep = false;
      }
      return isKeep;
  }
  
  function checkIsKeepAlive(_route: any) {
      const isKeep = isKeepPath([${configStringify(
        api.userConfig.keepalive || [],
      )}], _route.path, _route);
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
  
  const keepAlive = ref(getInitKeepAlive());
  
  router.afterEach(() => {
      const name = checkIsKeepAlive(route);
      if (name && !keepAlive.value.includes(name)) {
          keepAlive.value = [...keepAlive.value, name];
      }
  });
  </script>`,
    });
    // TODO: export KeepALiveLayout
    // api.writeTmpFile({
    //   path: join(DIR_NAME, 'index.ts'),
    //   noPluginDir: true,
    //   content: `
    //   import KeepALiveLayout from './layout'
    //   export {
    //     KeepALiveLayout
    //   }
    //   `,
    // });
  });
};
