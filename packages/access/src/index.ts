import { Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IApi } from 'valita';
const DIR_NAME = 'plugin-access';

export default (api: IApi) => {
  api.describe({
    key: 'access',
    config: {
      schema({ zod }) {
        return zod.object({
          roles: zod.map(zod.string(), zod.array(zod.string()))
        }).required();
      }
    },
    enableBy: api.EnableBy.config,
  });

  const { roles = {} } = api.config.access || {};
  const accessTpl = readFileSync(join(__dirname, 'templates', './core.tpl'), 'utf-8');

  api.writeTmpFile({
    path: join(DIR_NAME, 'index.ts'),
    noPluginDir: true,
    content: Mustache.render(accessTpl, {
      roles: JSON.stringify(roles)
    })
  })
  api.writeTmpFile({
    path: join(DIR_NAME, 'runtime.ts'),
    noPluginDir: true,
    tplPath: join(__dirname, 'templates/runtime.tpl')
  })
  api.writeTmpFile({
    path: join(DIR_NAME, 'types.d.ts'),
    noPluginDir: true,
    tplPath: join(__dirname, 'templates/types.d.ts')
  })
  api.addRuntimePlugin(() => {
    return [`${api.paths.absTmpPath}/${DIR_NAME}/runtime.ts`];
  });
};
