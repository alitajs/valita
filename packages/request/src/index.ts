import { winPath } from '@alitajs/vue-utils';
import { dirname } from 'path';
import type { IApi } from 'valita';

export default (api: IApi) => {
  // api.describe({
  //   key: 'request',
  //   config: {
  //     schema(Joi) {
  //       return Joi.object();
  //     },
  //   },
  // });
  api.addRuntimePluginKey(() => ['request']);

  // 注册runtime配置
  api.addEntryCodeAhead(() => [
    `
      import { getPluginManager } from './core/plugin';
      import { setRequestConfig } from '${winPath(
        dirname(require.resolve('@alita/request/package.json')),
      )}';
    `,
  ]);
  api.addEntryCode(() => [
    `setRequestConfig(getPluginManager().applyPlugins({ key: 'request',type: 'modify', initialValue: {} }))`,
  ]);

  api.onGenerateFiles(() => {
    // index.ts for export
    api.writeTmpFile({
      path: 'index.ts',
      content: `
        export { request } from '${winPath(
          dirname(require.resolve('@alita/request/package.json')),
        )}';
        export { useRequest } from '${winPath(require.resolve('ahooks-vue'))}';
      `,
    });

    // types.ts
    api.writeTmpFile({
      path: 'types.d.ts',
      tpl: `export { ResponseError, Context, RequestConfig, request } from '${winPath(
        dirname(require.resolve('@alita/request/package.json')),
      )}';
      
      export { useRequest } from '${winPath(require.resolve('ahooks-vue'))}';
      `,
      context: {},
    });
  });
};
