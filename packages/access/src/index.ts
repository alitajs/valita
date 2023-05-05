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
          roles: zod.object({})
        }).required();
      }
    },
    enableBy: api.EnableBy.config,
  });

  api.onGenerateFiles(() => {
    const { roles = {} } = api.config.access || {};
    const accessTpl = readFileSync(join(__dirname, 'templates', './core.tpl'), 'utf-8');

    api.writeTmpFile({
      path: join(DIR_NAME, 'index.ts'),
      noPluginDir: true,
      content: Mustache.render(accessTpl, {
        'roles': JSON.stringify(roles)
      }),
      context: {}
    })
    api.writeTmpFile({
      path: join(DIR_NAME, 'runtime.ts'),
      noPluginDir: true,
      content: readFileSync(join(__dirname, './templates/runtime.tpl'), 'utf-8')
    })
    api.writeTmpFile({
      path: join(DIR_NAME, 'createComponent.ts'),
      noPluginDir: true,
      content: readFileSync(join(__dirname, './templates/createComponent.tpl'), 'utf-8')
    })
    api.writeTmpFile({
      path: join(DIR_NAME, 'types.d.ts'),
      noPluginDir: true,
      content: readFileSync(join(__dirname, './templates/types.d.ts'), 'utf-8'),
    })
  })
  api.addRuntimePlugin(() => {
    return [`${api.paths.absTmpPath}/${DIR_NAME}/runtime.ts`];
  });
};
