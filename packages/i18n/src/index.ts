import { winPath } from '@alitajs/vue-utils';
import { dirname, join } from 'path';
import { IApi } from 'valita';
import { LangUtils } from './langUtils';
const DIR_NAME = 'plugin-i18n';

const getAllLanguages = (api: IApi) => {
  return new LangUtils(api).getAllLang();
};

export default (api: IApi) => {
  api.describe({
    key: 'locale',
    config: {
      schema({ zod }) {
        return zod
          .object({
            // 默认使用 zh-CN 作为多语言文件
            default: zod.string(),
            // zh-CN 中间的字符，默认是 -
            baseSeparator: zod.string(),
            // useLocalStorage: zod.boolean(),
            // baseNavigator: zod.boolean(),
            // title: zod.boolean(),
            // antd: zod.boolean(),
          })
          .partial();
      },
    },
    enableBy: api.EnableBy.config,
  });
  const i18n = winPath(dirname(require.resolve('vue-i18n/package.json')));
  const vueuse = winPath(dirname(require.resolve('@vueuse/core')));
  api.onGenerateFiles((args) => {
    const { baseSeparator = '-' } = api.config?.locale;
    const defaultLocale = api.config.locale?.default || `zh${baseSeparator}CN`;

    const languages = getAllLanguages(api);

    api.writeTmpFile({
      noPluginDir: true,
      path: join(DIR_NAME, 'index.ts'),
      content: `
export * from '${i18n}';
export { useI18n } from '${i18n}';
import { createI18n } from '${i18n}';
import { useLocalStorage } from '${vueuse}';
${languages
          .map(({ paths, lang, country }) => {
            return paths
              .map((file: string, index) => {
                return `import lang_${lang}${country}${index} from "${file}";`;
              })
              .join('\n');
          })
          .join('\n')}
export const i18n = createI18n({
    globalInjection: true,
    allowComposition: true,
    locale: useLocalStorage('locale', '${defaultLocale}').value,
    messages:{
        ${languages
          .map(({ paths, lang, country, name }) => {
            return `'${name}':{
              ${paths
                .map((_: string, index) => {
                  return `...lang_${lang}${country}${index}`;
                })
                .join(',')}
            }`;
          })
          .join(',\n\t\t')}
    }
})
export const setLocale = (lang:string) => {
    if(i18n.global.locale !== lang)
    {
        useLocalStorage('locale', 'en-US').value = lang;
        i18n.global.locale = lang;
    }
}
`,
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'runtime.ts'),
      noPluginDir: true,
      content: `
import { i18n } from './index';
export function onMounted({ app }) {
    app.use(i18n);
}
`,
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'types.d.ts'),
      noPluginDir: true,
      content: `export { useI18n } from '${winPath(
        dirname(require.resolve('vue-i18n')),
      )}';
export {setLocale} from './index';
            `,
    });
  });
  api.addRuntimePlugin(() => {
    return [`${api.paths.absTmpPath}/${DIR_NAME}/runtime.ts`];
  });
};
