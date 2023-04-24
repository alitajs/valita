import AutoImport from 'unplugin-auto-import/vite';
import WebpackAutoImport from 'unplugin-auto-import/webpack';

import { IApi } from 'valita';

export default (api: IApi) => {
  api.modifyViteConfig((config) => {
    const hasSrc = api.paths.absSrcPath.endsWith('src');

    config.plugins?.push(
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
        ],
        dts: `${hasSrc ? 'src/' : ''}auto-imports.d.ts'`,
        dirs: ['src/stores'],
        vueTemplate: true,
      }),
    );
    return config;
  });

  api.modifyWebpackConfig((config) => {
    const hasSrc = api.paths.absSrcPath.endsWith('src');

    config.plugins?.push(
      WebpackAutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
        ],
        dts: `${hasSrc ? 'src/' : ''}auto-imports.d.ts'`,
        dirs: ['src/stores'],
        vueTemplate: true,
      }),
    );
    return config;
  });
};
