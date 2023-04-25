import { glob, lodash, winPath } from '@alitajs/vue-utils';
import { basename, join } from 'path';
import { IApi } from 'valita';

export class LangUtils {
  api: IApi;
  constructor(api: IApi | null) {
    this.api = api as IApi;
  }

  // 支持 src/i18n 和 src/locales
  getAllLang() {
    const { baseSeparator = '-' } = this.api.config?.locale;
    const localeFileMath = new RegExp(
      `^([a-z]{2})${baseSeparator}?([A-Z]{2})?\.(js|json|ts)$`,
    );
    const langs = [
      ...this.getLang({
        base: join(this.api.paths.absSrcPath, 'i18n'),
        pattern: '**/*.{ts,js}',
      }),
      ...this.getLang({
        base: join(this.api.paths.absSrcPath, 'locales'),
        pattern: '**/*.{ts,js}',
      }),
      ...this.getLang({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/locales/*.{ts,js}',
      }),
      ...this.getLang({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/i18n/*.{ts,js}',
      }),
    ].map((fullName) => {
      const fileName = basename(fullName);
      const fileInfo = localeFileMath
        .exec(fileName)
        ?.slice(1, 3)
        ?.filter(Boolean);
      return {
        name: (fileInfo || []).join(baseSeparator),
        path: fullName,
      };
    });

    const groups = lodash.groupBy(langs, 'name');
    const promises = Object.keys(groups).map((name) => {
      const [lang, country = ''] = name.split(baseSeparator);
      return {
        lang,
        name,
        // react-intl Function.supportedLocalesOf
        // Uncaught RangeError: Incorrect locale information provided
        locale: name.split(baseSeparator).join('-'),
        country,
        paths: groups[name].map((item) => winPath(item.path)),
      };
    });
    return promises;
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
