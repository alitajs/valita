import { readFileSync } from 'fs';
import { join } from 'path';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import VComponents from 'unplugin-vue-components/vite';
import RComponents from 'unplugin-vue-components/webpack';
import { IApi } from 'valita';
const DIR_NAME = 'plugin-layout';
const layoutMap = {
  mobile: 'mobileLayout.tpl',
};
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
  api.onGenerateFiles(() => {
    const layoutTpl = readFileSync(
      // 读取到layout文件内容
      join(__dirname, '..', 'templates', layoutMap?.mobile),
      'utf-8',
    );
    api.writeTmpFile({
      path: join(DIR_NAME, 'index.vue'),
      noPluginDir: true,
      content: layoutTpl,
    });
  });
  // 使用 api.addLayouts 用 examples/with-layout/.umi/plugin-layout/index.vue 包裹项目
  api.addLayouts(() => {
    return [
      {
        id: 'vue-layout',
        file: join(api.paths.absTmpPath, join(DIR_NAME, 'index.vue')),
      },
    ];
  });
};
