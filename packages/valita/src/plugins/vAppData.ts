import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyAppData((memo) => {
    memo.umi.name = 'valita';
    memo.umi.importSource = 'valita';
    memo.umi.cliName = 'valita';
    return memo;
  });
};
