import type { IApi } from 'valita';
import VComponents from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import RComponents  from 'unplugin-vue-components/webpack'

export default (api: IApi) => {
  api.modifyHTML(($) => {
    return $;
  });
  api.addHTMLMetas(() => [{ name: 'foo', content: 'bar' }]);
  api.addHTMLLinks(() => [{ rel: 'foo', content: 'bar' }]);
  api.addHTMLStyles(() => [`body { color: red; }`]);
  api.addHTMLHeadScripts(() => [`console.log('hello world from head')`]);
  api.addHTMLScripts(() => [`console.log('hello world')`]);
  api.addEntryCodeAhead(() => [`console.log('entry code ahead')`]);
  api.addEntryCode(() => [`console.log('entry code')`]);
  api.chainWebpack((memo) => {
    return memo;
  });
  api.addRuntimePluginKey(() => ['mobileLayout']);
  api.modifyViteConfig((config) => {
    config.plugins?.push(
      VComponents({
        resolvers: [VantResolver()],
      }),
    );
    return config;
  });
  api.modifyWebpackConfig((config) => {
    config.plugins?.push(
      RComponents({
        resolvers: [VantResolver()],
      }),
    );
    return config;
  });
};
