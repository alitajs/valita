import { getUserLibDir, StoreUtils, withTmpPath, getFileName } from '@alitajs/vue-utils';
import { dirname } from 'path';
import { IApi } from 'valita';

export function getAllStores(api: IApi) {
  return new StoreUtils(api).getAllStores('vuex');
}

export default (api: IApi) => {
  const vuex =
    getUserLibDir({ library: 'vuex', api }) ||
    dirname(require.resolve('vuex/package.json'));

  api.modifyConfig((memo) => {
    memo.alias = {
      ...memo.alias,
      vuex,
    };
    return memo;
  });
  api.modifyAppData((memo) => {
    const stores = getAllStores(api);
    memo.pluginVuex = {
      stores,
    };
    return memo;
  });

  api.onGenerateFiles((args) => {
    const stores = args.isFirstTime
      ? api.appData.pluginVuex.stores
      : getAllStores(api);

    // index.ts for export
    api.writeTmpFile({
      path: 'index.ts',
      content: `
      export * from '${vuex}';
      `,
    });

    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import { createStore } from 'vuex';
${stores.map((file: string) => { return `import ${getFileName(file)} from '${file}';`; }).join('\n')}

const store = createStore({
  modules: {
    ${stores.map((file: string) => { return `${getFileName(file)}` })}
  }
})

export function onMounted({ app }) {
  app.use(store);
}
`,
    });
  })

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
}