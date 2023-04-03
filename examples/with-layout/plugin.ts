import type { IApi } from 'valita';
import VComponents from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import RComponents  from 'unplugin-vue-components/webpack';

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
