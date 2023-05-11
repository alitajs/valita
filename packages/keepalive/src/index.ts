import { Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IApi } from 'valita';

const DIR_NAME = 'plugin-keepalive';
type KeepAliveType = (string | RegExp)[];

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

  api.addRuntimePluginKey(() => ['getKeepAlive']);

  const configStringify = (config: (string | RegExp)[]) => {
    return config.map((item) => {
      if (item instanceof RegExp) {
        return item;
      }
      return `'${item}'`;
    });
  };

  api.onGenerateFiles(() => {
    const keepaliveTpl = readFileSync(
      join(__dirname, '..', 'templates', 'keepaliveLayout.tpl'),
      'utf-8',
    );
    const emitterTpl = readFileSync(
      join(__dirname, '..', 'templates', 'emitter.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: join(DIR_NAME, 'layout.vue'),
      noPluginDir: true,
      content: Mustache.render(keepaliveTpl, {
        keepalive: configStringify(
          (api.userConfig.keepalive as KeepAliveType) || [],
        ),
        hasGetKeepalive: api.appData.appJS?.exports.includes('getKeepAlive'),
      }),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'emitter.ts'),
      noPluginDir: true,
      content: emitterTpl,
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'index.ts'),
      noPluginDir: true,
      content: `
export { dropByCacheKey } from './emitter';
      `,
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
