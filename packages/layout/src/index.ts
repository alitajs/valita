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
  // 把 examples/with-layout/plugin.ts 里面的内容移到这里
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
  // 然后在 with-layout 里面安装 @alitajs/vue-layout 并在 配置文件中（examples/with-layout/.umirc.ts） 写明
  // plugins:[' @alitajs/vue-layout'] //TODO:这个是用于做什么的？
  // 注意安装的包要装到这个包里，项目中没有直接依赖的，记得删除 // TODO:要删除什么？
  // 在  api.onGenerateFiles 的时候，把 layout 文件，写到临时文件夹里面。
  // 感觉像是将 examples/with-layout/layouts/index.vue 复制到 examples/with-layout/.umi/plugin-layout/index.vue
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
        file: join(
          api.paths.absTmpPath,
          api.plugin.key ? `plugin-${api.plugin.key}` : '',
          join(DIR_NAME, 'index.vue'),
        ),
      },
    ];
  });
};
