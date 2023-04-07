import { IApi } from "valita";
import { LangUtils } from "./langUtils";
import { dirname } from "path";
import { winPath, withTmpPath } from "@alitajs/vue-utils";

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
    const languages = getAllLanguages(api);
    api.onGenerateFiles((args) => {
        api.writeTmpFile({
            path: 'index.ts',
            content: `
export * from '${i18n}';
export { useI18n } from '${i18n}';
import { createI18n } from '${i18n}';
${languages.map((file: string) => {
                return `import ${getEffectiveKeyName(file)} from '${file}';`;
            }).join('\n')}
export const i18n = createI18n({
    globalInjection: true,
    allowComposition: true,
    locale: 'en-US',
    messages:{
        ${languages.map((file: string) => {
                return `'${getFileName(file)}':${getEffectiveKeyName(file)}`;
            }).join(',\n\t\t')
                }
    }
})
`
        })
        api.writeTmpFile({
            path: 'runtime.tsx',
            content: `
import { i18n } from './index';
export function onMounted({ app }) {
    app.use(i18n);
}
`,
        });
    })
    api.addRuntimePlugin(() => {
        return [withTmpPath({ api, path: 'runtime.tsx' })];
    });
}