import { winPath } from '@umijs/utils';
import { dirname, join } from 'path';
export default () => {
  const umiPreset = dirname(require.resolve('@umijs/preset-umi/package.json'));
  const umi = dirname(require.resolve('umi/package.json'));
  process.env.UMI_DIR = umi;
  const vuePreset = dirname(require.resolve('@umijs/preset-vue/package.json'));
  return {
    plugins: [
      // registerMethods
      winPath(join(umiPreset, 'dist', 'registerMethods.js')),
      winPath(join(umiPreset, 'dist', 'features/404/404.js')),
      winPath(join(umiPreset, 'dist', 'features/appData/appData.js')),
      winPath(join(umiPreset, 'dist', 'features/appData/umiInfo.js')),
      winPath(join(umiPreset, 'dist', 'features/check/check.js')),
      winPath(
        join(umiPreset, 'dist', 'features/codeSplitting/codeSplitting.js'),
      ),
      winPath(
        join(umiPreset, 'dist', 'features/configPlugins/configPlugins.js'),
      ),
      winPath(join(umiPreset, 'dist', 'features/crossorigin/crossorigin.js')),
      winPath(join(umiPreset, 'dist', 'features/depsOnDemand/depsOnDemand.js')),
      winPath(join(umiPreset, 'dist', 'features/devTool/devTool.js')),
      winPath(join(umiPreset, 'dist', 'features/esmi/esmi.js')),
      winPath(join(umiPreset, 'dist', 'features/exportStatic/exportStatic.js')),
      winPath(join(umiPreset, 'dist', 'features/favicons/favicons.js')),
      // winPath(join(umiPreset, 'dist', 'features/helmet/helmet.js')),
      winPath(join(umiPreset, 'dist', 'features/icons/icons.js')),
      winPath(join(umiPreset, 'dist', 'features/mock/mock.js')),
      winPath(join(umiPreset, 'dist', 'features/mpa/mpa.js')),
      winPath(join(umiPreset, 'dist', 'features/overrides/overrides.js')),
      winPath(
        join(
          umiPreset,
          'dist',
          'features/phantomDependency/phantomDependency.js',
        ),
      ),
      winPath(join(umiPreset, 'dist', 'features/polyfill/polyfill.js')),
      winPath(
        join(umiPreset, 'dist', 'features/polyfill/publicPathPolyfill.js'),
      ),
      winPath(join(umiPreset, 'dist', 'features/prepare/prepare.js')),
      winPath(
        join(umiPreset, 'dist', 'features/routePrefetch/routePrefetch.js'),
      ),
      winPath(join(umiPreset, 'dist', 'features/terminal/terminal.js')),

      // 1. generate tmp files
      winPath(join(umiPreset, 'dist', 'features/tmpFiles/tmpFiles.js')),
      // 2. `clientLoader` and `routeProps` depends on `tmpFiles` files
      winPath(join(umiPreset, 'dist', 'features/clientLoader/clientLoader.js')),
      winPath(join(umiPreset, 'dist', 'features/routeProps/routeProps.js')),
      // 3. `ssr` needs to be run last
      winPath(join(umiPreset, 'dist', 'features/ssr/ssr.js')),

      winPath(join(umiPreset, 'dist', 'features/tmpFiles/configTypes.js')),
      winPath(join(umiPreset, 'dist', 'features/transform/transform.js')),
      winPath(join(umiPreset, 'dist', 'features/lowImport/lowImport.js')),
      winPath(join(umiPreset, 'dist', 'features/vite/vite.js')),
      winPath(join(umiPreset, 'dist', 'features/apiRoute/apiRoute.js')),
      winPath(join(umiPreset, 'dist', 'features/monorepo/redirect.js')),
      winPath(join(umiPreset, 'dist', 'features/test/test.js')),
      // winPath(
      //   join(
      //     umiPreset,
      //     'dist',
      //     'features/clickToComponent/clickToComponent.js',
      //   ),
      // ),
      winPath(join(umiPreset, 'dist', 'features/legacy/legacy.js')),
      winPath(
        join(
          umiPreset,
          'dist',
          'features/classPropertiesLoose/classPropertiesLoose.js',
        ),
      ),
      winPath(join(umiPreset, 'dist', 'features/webpack/webpack.js')),
      winPath(join(umiPreset, 'dist', 'features/swc/swc.js')),
      // winPath(join(umiPreset, 'dist', 'features/ui/ui.js')),

      // commands
      winPath(join(umiPreset, 'dist', 'commands/build.js')),
      winPath(join(umiPreset, 'dist', 'commands/config/config.js')),
      winPath(join(umiPreset, 'dist', 'commands/dev/dev.js')),
      winPath(join(umiPreset, 'dist', 'commands/help.js')),
      winPath(join(umiPreset, 'dist', 'commands/lint.js')),
      winPath(join(umiPreset, 'dist', 'commands/setup.js')),
      winPath(join(umiPreset, 'dist', 'commands/deadcode.js')),
      winPath(join(umiPreset, 'dist', 'commands/version.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/page.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/prettier.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/tsconfig.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/jest.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/tailwindcss.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/dva.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/component.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/mock.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/cypress.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/api.js')),
      // winPath(join(umiPreset, 'dist', 'commands/generators/precommit.js')),
      winPath(join(umiPreset, 'dist', 'commands/plugin.js')),
      winPath(join(umiPreset, 'dist', 'commands/verify-commit.js')),
      winPath(join(umiPreset, 'dist', 'commands/preview.js')),
      winPath(join(umiPreset, 'dist', 'commands/mfsu/mfsu.js')),

      // preset-vue
      winPath(join(vuePreset, 'dist', 'features/default.js')),
      winPath(join(vuePreset, 'dist', 'features/webpack.js')),
      winPath(join(vuePreset, 'dist', 'features/tmpFiles/tmpFiles.js')),
      winPath(join(vuePreset, 'dist', 'features/vite/vite.js')),
    ].filter(Boolean),
  };
};
