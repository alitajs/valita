import { IApi } from 'valita';
import { join } from 'path';

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

  // api.addRuntimePluginKey(() => 'getKeepAlive');

  // const configStringify = (config: (string | RegExp)[]) => {
  //   return config.map((item) => {
  //     if (item instanceof RegExp) {
  //       return item;
  //     }
  //     return `'${item}'`;
  //   });
  // };


  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'keepalive.vue'),
      noPluginDir: true,
      content: `<template>
      <div>
        <div>this is layouts</div>
        <router-view></router-view>
      </div>
    </template>`,
    });
  })
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'index.ts'),
      noPluginDir: true,
      content: `console.log('this is keepalive');`,
    });
  })

  api.addRuntimePlugin(() => [
    join(api.paths.absTmpPath!, `${DIR_NAME}/index.ts`),
  ]);
};
