import { IApi } from 'umi';
import { FRAMEWORK_NAME } from '../constants';

export default (api: IApi) => {
  api.modifyAppData((memo) => {
    memo.umi.name = FRAMEWORK_NAME;
    return memo;
  });
};
