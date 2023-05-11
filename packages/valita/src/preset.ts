import { IApi } from 'umi';

export default (api: IApi) => {
  const corePlugins = [
    // require.resolve('@alita/autoimport'),
    require.resolve('./plugins/autoimport'),
    require.resolve('./plugins/apptype'),
    require.resolve('./plugins/vAlias'),
    require.resolve('./plugins/vAppData'),
    require.resolve('./plugins/vChecker'),
    require.resolve('./plugins/vConfig'),
    require.resolve('@alitajs/vue-route-props'),
    require.resolve('@alitajs/vue-pinia'),
    require.resolve('@alitajs/vue-vuex'),
    require.resolve('@alitajs/vue-request'),
    require.resolve('@alitajs/vue-keepalive'),
    require.resolve('@alitajs/vue-i18n'),
    require.resolve('@alitajs/vue-access'),
  ];
  if (api.userConfig.appType === 'pc') {
    corePlugins.push(require.resolve('@alitajs/vue-antd-layout'));
  } else {
    corePlugins.push(require.resolve('@alitajs/vue-vant-layout'));
  }
  return {
    plugins: corePlugins.filter(Boolean),
  };
};
