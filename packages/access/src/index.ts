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
  api.writeTmpFile({
    path: join(DIR_NAME, 'index.ts'),
    noPluginDir: true,
    tplPath: join(__dirname, 'template/core.tpl'),
  })
  api.writeTmpFile({
    path: join(DIR_NAME, 'runtime.ts'),
    noPluginDir: true,
    tplPath: join(__dirname, 'template/runtime.tpl')
  })
  api.writeTmpFile({
    path: join(DIR_NAME, 'types.d.ts'),
    noPluginDir: true,
    tplPath: join(__dirname, 'template/types.d.ts')
  })
  api.addRuntimePlugin(() => {
    return [`${api.paths.absTmpPath}/${DIR_NAME}/runtime.ts`];
  });
};
