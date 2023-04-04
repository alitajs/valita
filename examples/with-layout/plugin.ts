import { VantResolver } from 'unplugin-vue-components/resolvers';
import VComponents from 'unplugin-vue-components/vite';
import RComponents from 'unplugin-vue-components/webpack';
import type { IApi } from 'valita';

export default (api: IApi) => {
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
