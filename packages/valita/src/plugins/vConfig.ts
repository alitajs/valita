import { IApi } from 'umi';

export default (api: IApi) => {
  const configDefaults: Record<string, any> = {
    vue: {},
    mfsu: false,
    ...api.userConfig,
  };
  if (api.userConfig.complexRoute) {
    configDefaults.conventionRoutes = {
      // 保留umi的路由，过滤了非page的文件
      exclude: [
        /model\.(j|t)sx?$/,
        /\.test\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//,
      ],
    };
  }

  api.modifyConfig((memo: any) => {
    Object.keys(configDefaults).forEach((key) => {
      if (key === 'alias') {
        memo[key] = { ...memo[key], ...configDefaults[key] };
      } else {
        memo[key] = configDefaults[key];
      }
    });
    // umi4 开发环境不允许配置为 './'
    if (process.env.NODE_ENV === 'development' && memo.publicPath === './') {
      memo.publicPath = '/';
    }
    return memo;
  });
};
