export default () => {
  return {
    plugins: [
      require.resolve('./plugins/vAlias'),
      require.resolve('./plugins/vAppData'),
      require.resolve('./plugins/vChecker'),
      require.resolve('./plugins/vConfig'),
      require.resolve('@alitajs/vue-pinia'),
      require.resolve('@alitajs/vue-request'),
      require.resolve('@alitajs/vue-layout'),
      require.resolve('@alitajs/vue-i18n'),
    ],
  };
};
