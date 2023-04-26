import { winPath } from '@alitajs/vue-utils';
import { parseModule } from '@umijs/bundler-utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { type IApi } from 'valita';

const DIR_NAME = 'plugin-vue-route-props';

const getScriptStr = (str: string) => {
  // 不包含 setup
  const regex = /<script(?![^>]*\bsetup\b)[^>]*>((.|\n)*?)<\/script>/g;
  const matches = [];

  let match;
  while ((match = regex.exec(str))) {
    matches.push(match[1]);
  }

  return matches.join('\n');
};

export default (api: IApi) => {
  if (api.userConfig.routes || !api.isPluginEnable('routeProps')) {
    return;
  }

  api.onGenerateFiles(() => {
    const rpFile = 'core/routeProps.ts';
    const routePropsTs = join(api.paths.absTmpPath, rpFile);
    let routePropsContext = readFileSync(routePropsTs, 'utf-8');
    Object.keys(api.appData.routes).forEach(async (id) => {
      const { __absFile, __routePropsContent } = api.appData.routes[id];
      if (__routePropsContent) {
        const output = join(DIR_NAME, `${id}.ts`);
        routePropsContext = routePropsContext.replace(
          __absFile,
          winPath(join(api.paths.absTmpPath, output)),
        );
        api.writeTmpFile({
          path: output,
          noPluginDir: true,
          content: __routePropsContent,
        });
      }
    });
    api.writeTmpFile({
      path: rpFile,
      noPluginDir: true,
      content: routePropsContext,
    });
  });

  api.modifyRoutes(async (memo) => {
    Object.keys(memo).forEach(async (id) => {
      const { file, __content } = memo[id];
      const isVueFile = /.vue?$/.test(file);
      if (isVueFile && __content) {
        let str = getScriptStr(__content);
        try {
          const [_, exports] = await parseModule({ content: str, path: file });
          if (exports.includes('routeProps')) {
            memo[id].routeProps = `routeProps['${id}']`;
            memo[id].__routePropsContent = str;
          }
        } catch (e) {
          console.log(
            `Parse file ${file} exports error, please check this file esm format.`,
          );
          // do not kill process
          return [];
        }
      }
    });
    return memo;
  });
};
