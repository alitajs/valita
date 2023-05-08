import { glob, winPath } from '@umijs/utils';
import { join } from 'path';
import { readFileSync } from 'fs';
import { IApi } from 'valita';

export class StoreUtils {
  api: IApi;
  constructor(api: IApi | null) {
    this.api = api as IApi;
  }

  getAllStores(type: 'vuex' | 'pinia') {
    const stores = [
      ...this.getStores({
        base: join(this.api.paths.absSrcPath, 'stores'),
        pattern: '**/*.{ts,tsx,js,jsx}',
        type,
      }),
      ...this.getStores({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/stores/**/*.{ts,tsx,js,jsx}',
        type
      }),
    ];
    return stores;
  }

  getStores(opts: { base: string; pattern?: string, type: 'vuex' | 'pinia' }) {
    const a = glob
      .sync(opts.pattern || '**/*.{ts,js}', {
        cwd: opts.base,
        absolute: true,
      })
      .map(winPath);
    const b = a.filter((file) => {
      if (/\.d.ts$/.test(file)) return false;
      if (/\.(test|e2e|spec).([jt])sx?$/.test(file)) return false;
      const indexContent = readFileSync(file, 'utf-8')
      if (indexContent.indexOf('defineStore') !== -1 && opts.type === 'pinia') {
        return true;
      } else if (indexContent.indexOf('defineStore') === -1 && opts.type === 'vuex') {
        return true;
      }
      return false;
    });
    return b;
  }
}

