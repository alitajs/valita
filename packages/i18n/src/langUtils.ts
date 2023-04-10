import { glob, winPath } from '@alitajs/vue-utils';
import { join } from 'path';
import { IApi } from 'valita';

export class LangUtils {
  api: IApi;
  constructor(api: IApi | null) {
    this.api = api as IApi;
  }

  getAllLang() {
    const langs = [
      ...this.getLang({
        base: join(this.api.paths.absSrcPath, 'i18n'),
        pattern: '**/*.{ts,js}',
      }),
      ...this.getLang({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/i18n/*.{ts,js}',
      }),
    ];
    return langs;
  }

  getLang(opts: { base: string; pattern?: string }) {
    return glob
      .sync(opts.pattern || '**/*.{ts,js}', {
        cwd: opts.base,
        absolute: true,
      })
      .map(winPath)
      .filter(() => {
        // TODO
        return true;
      });
  }
}
