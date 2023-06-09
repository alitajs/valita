import { getUserLibDir, withTmpPath, StoreUtils } from '@alitajs/vue-utils';
import { dirname } from 'path';
import { IApi } from 'valita';

export function getAllStores(api: IApi) {
  return new StoreUtils(api).getAllStores('pinia');
}

export default (api: IApi) => {
  const pinia =
    getUserLibDir({ library: 'pinia', api }) ||
    dirname(require.resolve('pinia/package.json'));
  api.modifyConfig((memo) => {
    memo.alias = {
      ...memo.alias,
      pinia,
    };
    return memo;
  });
  api.modifyAppData((memo) => {
    const stores = getAllStores(api);
    memo.pluginPinia = {
      stores,
    };
    return memo;
  });

  api.onGenerateFiles((args) => {
    const stores = args.isFirstTime
      ? api.appData.pluginPinia.stores
      : getAllStores(api);

    // index.ts for export
    api.writeTmpFile({
      path: 'index.ts',
      content: `
      export * from '${pinia}';
${stores
          .map((file: string) => {
            return `export * from '${file}';`;
          })
          .join('\n')}
`,
    });

    // types.ts
    // api.writeTmpFile({
    //   path: 'types.d.ts',
    //   tpl: `
    //   `,
    //   context: {},
    // });

    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import { createPinia } from '${pinia}';

export function onMounted({ app }) {
  const pinia = createPinia();
  app.use(pinia);
}
      `,
    });
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
};
