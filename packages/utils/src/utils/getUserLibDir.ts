import { resolve, winPath } from '@umijs/utils';
import { dirname } from 'path';

export function getUserLibDir({ library, api }: { library: string; api: any }) {
  if (
    // @ts-ignore
    (api.pkg.dependencies && api.pkg.dependencies[library]) ||
    // @ts-ignore
    (api.pkg.devDependencies && api.pkg.devDependencies[library]) ||
    // egg project using `clientDependencies` in ali tnpm
    // @ts-ignore
    (api.pkg.clientDependencies && api.pkg.clientDependencies[library])
  ) {
    return winPath(
      dirname(
        // 通过 resolve 往上找，可支持 lerna 仓库
        // lerna 仓库如果用 yarn workspace 的依赖不一定在 node_modules，可能被提到根目录，并且没有 link
        resolve.sync(`${library}/package.json`, {
          basedir: api.paths.cwd,
        }),
      ),
    );
  }
  return null;
}
