import { glob, winPath } from '@alitajs/vue-utils';
import { join } from 'path';
import { IApi } from 'valita';

export class StoreUtils {
  api: IApi;
  constructor(api: IApi | null) {
    this.api = api as IApi;
  }

  getAllStores() {
    const stores = [
      ...this.getStores({
        base: join(this.api.paths.absSrcPath, 'stores'),
        pattern: '**/*.{ts,tsx,js,jsx}',
      }),
      ...this.getStores({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/stores/**/*.{ts,tsx,js,jsx}',
      }),
    ];
    return stores;
  }

  getStores(opts: { base: string; pattern?: string }) {
    return glob
      .sync(opts.pattern || '**/*.{ts,js}', {
        cwd: opts.base,
        absolute: true,
      })
      .map(winPath)
      .filter(() => {
        // TODO: 按规则识别是 pinia store 的文件
        return true;
      });
  }
}
