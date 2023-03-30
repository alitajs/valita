import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyAppData((memo) => {
    memo.umi.name = 'valita';
    memo.umi.importSource = 'valita';
    memo.umi.cliName = 'valita';
    return memo;
  });
  // TODO: TypeError: api.addLowImportLibs is not a function
  // api.addLowImportLibs(() => {
  //   return [
  //     {
  //       importFrom: 'vue',
  //       members: ['computed', 'ref'],
  //     },
  //     {
  //       importFrom: 'pinia',
  //       members: ['defineStore'],
  //     },
  //   ];
  // });
};
