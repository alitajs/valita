import { join } from 'path';
import { IApi } from 'valita';
const DIR_NAME = 'plugin-access';

export default (api: IApi) => {
  api.describe({
    key: 'access',
    config: {
      schema({ zod }) {
        return zod.map(zod.string(), zod.array(zod.string()));
      }
    },
    enableBy: api.EnableBy.config,
  });
  api.writeTmpFile({
    path: join(DIR_NAME, 'index.ts'),
    noPluginDir: true,
    content: ``
  })
  api.writeTmpFile({
    path: join(DIR_NAME, 'runtime.ts'),
    noPluginDir: true,
    content: ``
  })
  api.writeTmpFile({
    path: join(DIR_NAME, 'types.d.ts'),
    noPluginDir: true,
    content: ``
  })
};
