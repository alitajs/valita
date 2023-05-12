import { getUserLibDir, Mustache } from '@alitajs/vue-utils';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { IApi } from "valita";
const DIR_NAME = 'plugin-layout';
export default (api: IApi) => {
    api.describe({
        key: 'antdLayout',
        config: {
            schema(zod) {
                return zod.alternatives(zod.boolean(), zod.string());
            },
            onChange: api.ConfigChangeType.regenerateTmpFiles,
        },
        enableBy: api.EnableBy.config,
    })
    api.modifyConfig((memo) => {
        const antd = getUserLibDir({ library: 'antd', api }) ||
            dirname(require.resolve('antd/package.json'));
        memo.alias = {
            ...memo.alias,
            antd
        }
        return memo;
    })
    api.onGenerateFiles(() => {
        api.writeTmpFile({
            path: join(DIR_NAME, 'layout.vue'),
            noPluginDir: true,
            content: Mustache.render(readFileSync(join(__dirname, 'templates', 'pcLayout.tpl'), 'utf-8'), {});
        })
    });
};
