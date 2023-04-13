import { IApi } from 'valita';
import { join } from 'path';
import { logger } from '@umijs/utils';

const DIR_NAME = 'plugin-keepalive';

export default (api: IApi) => {
  api.describe({
    key: 'keepalive',
    config: {
      schema(Joi) {
        return Joi.array().items(Joi.alternatives(Joi.string(), Joi.any()));
      },
      onChange: api.ConfigChangeType.reload
    },
    enableBy: api.EnableBy.config,
  })


  api.modifyRoutes((memo) => {
    const newMemo = {} as any;
    Object.entries(memo).forEach(([key, obj]) => {
      if (obj.__content) {
        newMemo[key] = {
          ...obj, name: obj.path, __content: `
    <script lang="ts">export default {name: "${obj.path}"}</script>\n
    ${obj.__content}`
        };
      } else {
        newMemo[key] = obj;
      }
    });
    console.log(newMemo);

    return newMemo;
  })


  const configStringify = (config: (string | RegExp)[]) => {
    return config.map((item) => {
      if (item instanceof RegExp) {
        return item;
      }
      return `'${item}'`;
    });
  };

  api.onStart(() => {
    logger.info('Using keepalive Plugin');
  });

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'index.vue'),
      noPluginDir: true,
      content: `
<template>
  <div>
    <div>this is layouts123</div>
    <RouterView v-slot="{ Component }">
      <KeepAlive :include="[${configStringify(api.userConfig.keepalive)}]">
        <component :is="Component"></component>
      </KeepAlive>
    </RouterView>
  </div>
</template>`,
    });
  })
  api.addLayouts(() => {
    return [
      {
        id: 'vue-keepalive',
        file: join(api.paths.absTmpPath, join(DIR_NAME, 'index.vue')),
      },
    ];
  });
};
