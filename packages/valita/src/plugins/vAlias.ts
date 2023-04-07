import { getUserLibDir } from '@alitajs/vue-utils';
import { dirname } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyConfig((memo) => {
    const vue =
      getUserLibDir({ library: 'vue', api }) ||
      dirname(require.resolve('vue/package.json'));
    memo.alias = {
      ...memo.alias,
      valita: '@@/exports',
      vue,
    };
    return memo;
  });
};
