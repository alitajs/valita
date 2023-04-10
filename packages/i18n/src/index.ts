import { IApi } from "valita";
import { LangUtils } from "./langUtils";
import { dirname, join } from "path";
import { winPath } from "@alitajs/vue-utils";
const DIR_NAME = 'plugin-i18n';

const getAllLanguages = (api: IApi) => {
    return new LangUtils(api).getAllLang();
}

const getFileName = (file: string) => {
    return file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
}

const getEffectiveKeyName = (file: string) => {
    return getFileName(file).replace('-', '');
}

export default (api: IApi) => {
    const i18n = winPath(dirname(require.resolve('vue-i18n/package.json')));
    const vueuse = winPath(dirname(require.resolve('@vueuse/core')))
    const languages = getAllLanguages(api);
    api.onGenerateFiles((args) => {
        api.writeTmpFile({
            noPluginDir: true,
            path: join(DIR_NAME, 'index.ts'),
            content: `
export * from '${i18n}';
export { useI18n } from '${i18n}';
import { createI18n } from '${i18n}';
import { useLocalStorage } from '${vueuse}';
${languages.map((file: string) => {
                return `import ${getEffectiveKeyName(file)} from '${file}';`;
            }).join('\n')}
export const i18n = createI18n({
    globalInjection: true,
    allowComposition: true,
    locale: useLocalStorage('locale', 'en-US').value,
    messages:{
        ${languages.map((file: string) => {
                return `'${getFileName(file)}':${getEffectiveKeyName(file)}`;
            }).join(',\n\t\t')
                }
    }
})
export const setLocale = (lang:string) => {
    if(i18n.global.locale !== lang)
    {
        useLocalStorage('locale', 'en-US').value = lang;
        i18n.global.locale = lang;
    }
}
`
        })
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
    })
    api.addRuntimePlugin(() => {
        return [`${api.paths.absTmpPath}/${DIR_NAME}/runtime.ts`];
    });
}