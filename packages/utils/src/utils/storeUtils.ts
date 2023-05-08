import { glob, winPath, chalk } from '@umijs/utils';
import { join } from 'path';
import { readFileSync } from 'fs';
import { IApi } from 'valita';
import { getFileName } from './tools';

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
    return glob
      .sync(opts.pattern || '**/*.{ts,js}', {
        cwd: opts.base,
        absolute: true,
      })
      .map(winPath)
      .filter((file) => {
        if (/\.d.ts$/.test(file)) return false;
        if (/\.(test|e2e|spec).([jt])sx?$/.test(file)) return false;
        // TODO: 临时的区分方法，如果有更优解再修改之类的说明
        const indexContent = readFileSync(file, 'utf-8')
        if (indexContent.indexOf('defineStore') !== -1 && opts.type === 'pinia') {
          return true;
        } else if (indexContent.indexOf('defineStore') === -1 && opts.type === 'vuex') {
          if (indexContent.indexOf('namespaced') === -1) {
            console.log(chalk.yellow(`${getFileName(file)} store 全局命名空间未注册。`));
          }
          return true;
        }
        return false;
      });
  }
}

