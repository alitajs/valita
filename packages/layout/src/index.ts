import { getUserLibDir } from '@alitajs/vue-utils';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import VComponents from 'unplugin-vue-components/vite';
import RComponents from 'unplugin-vue-components/webpack';
import { IApi } from 'valita';
const DIR_NAME = 'plugin-layout';
const layoutMap = {
  mobile: 'mobileLayout.tpl',
};
export default (api: IApi) => {
  api.modifyConfig((memo) => {
    const vant =
      getUserLibDir({ library: 'vant', api }) ||
      dirname(require.resolve('vant/package.json'));
    memo.alias = {
      ...memo.alias,
      vant,
    };
    return memo;
  });
  api.addRuntimePluginKey(() => ['mobileLayout']);
  api.modifyViteConfig((config) => {
    config.plugins?.push(
      VComponents({
        resolvers: [VantResolver()],
      }),
    );
    return config;
  });
  api.modifyWebpackConfig((config) => {
    config.plugins?.push(
      RComponents({
        resolvers: [VantResolver()],
      }),
    );
    return config;
  });
  api.onGenerateFiles(() => {
    const layoutTpl = readFileSync(
      // 读取到layout文件内容
      join(__dirname, '..', 'templates', layoutMap?.mobile),
      'utf-8',
    );
    api.writeTmpFile({
      path: join(DIR_NAME, 'layout.vue'),
      noPluginDir: true,
      content: layoutTpl,
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'types.d.ts'),
      noPluginDir: true,
      content: `
      export interface TitleListItem {
        pagePath: string;
        title: string;
      }
      export interface TabBarListItem {
        pagePath: string;
        text?: string;
        iconPath?: string;
        selectedIconPath?: string;
        dot?: boolean;
        badge?: number | string;
        title?: string;
        icon?: string;
        selectedIcon?: string;
        onPress?: (navigator: any, data?: TabBarListItem) => void | Promise<boolean>;
        hideNavBar?: boolean;
      }
      export interface TabBarProps {
        color?: string;
        fixed?: boolean;
        selectedColor?: string;
        backgroundColor?: string;
        list?: TabBarListItem[];
        tabBeforeChange?: (
          navigator: any,
          name: number | string,
        ) => void | Promise<boolean>;
        tabChange?: (navigator: any, name: number | string) => void;
      }
      export interface _NavBarProps {
        mode?: 'dark' | 'light';
        icon?: object | string;
        leftText?: string;
        leftContent?: any;
        rightContent?: any;
        onLeftClick?: (navigator: any) => void;
        hideNavBar?: boolean;
        pageBackground?: string;
        pageTitle?: string;
      }
      export interface NavBarListItem {
        pagePath: string;
        navBar?: _NavBarProps;
      }
      export interface NavBarProps extends _NavBarProps {
        fixed?: boolean;
        navList?: NavBarListItem[];
      }
      export interface TitleItems {
        pagePath: string;
        title?: string;
      }
      export interface MobileLayoutProps {
        theme?: 'dark' | 'light';
        tabBar?: TabBarProps;
        navBar?: NavBarProps;
        documentTitle?: string;
        titleList?: TitleItems[];
      }`,
    });
  });
  // 使用 api.addLayouts 用 examples/with-layout/.umi/plugin-layout/index.vue 包裹项目
  api.addLayouts(() => {
    return [
      {
        id: 'vue-layout',
        file: join(api.paths.absTmpPath, join(DIR_NAME, 'layout.vue')),
      },
    ];
  });
  api.addHTMLStyles(() => {
    const addItem = {
      content: `* {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }

      html {
        width: 100%;
        height: 100%;
        text-size-adjust: 100%;
        --alita-safe-area-top: env(safe-area-inset-top);
        --alita-safe-area-bottom: env(safe-area-inset-bottom);
        --alita-safe-area-left: env(safe-area-inset-left);
        --alita-safe-area-right: env(safe-area-inset-right);
      }

      body {
        background-color: #f5f5f9;
        font-size: 0.28rem;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
        padding-bottom: 0;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        text-rendering: optimizeLegibility;
        overflow: hidden;
        touch-action: manipulation;
        -webkit-user-drag: none;
        -ms-content-zooming: none;
        word-wrap: break-word;
        overscroll-behavior-y: none;
        text-size-adjust: none;
      }

      .alita-page {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        flex-direction: column;
        justify-content: space-between;
        contain: layout size style;
        overflow: hidden;
        z-index: 0;
      }
      .alita-head{
        height: auto;
  flex-shrink: 0;
  padding-top: var(--alita-safe-area-top);
      }
      .alita-content {
        position: relative;
z-index: 0;
display: block;

flex: 1;

width: 100%;
height: 100%;

/* stylelint-disable */
margin: 0;

padding: 0;
overflow-y: auto;
touch-action: pan-y;

will-change: scroll-position;
/* stylelint-enable */

-webkit-overflow-scrolling: touch;
overscroll-behavior-y: contain;
      }
      .alita-footer{
        flex-shrink: 0;
      }
      input {
        border: none;
        outline: none;
      }
      textarea:disabled,
      input:disabled {
        background-color: transparent;
      }
      `,
    };
    return [addItem];
  });
};
