<template>
  <van-config-provider
    class="valita-layout"
    :theme="layoutCfg?.theme || defaultTheme"
  >
    <van-nav-bar
      :fixed="layoutCfg?.navBar?.fixed !== false"
      v-if="
        curNavBar?.hideNavBar !== false &&
        (layoutCfg?.documentTitle || curNavBar?.pagePath)
      "
      :title="curNavBar?.title || layoutCfg?.documentTitle"
      :left-text="curNavBar?.leftText"
      :left-arrow="
        curNavBar?.leftContent ||
        curNavBar?.leftText ||
        curNavBar?.icon ||
        curNavBar?.onLeftClick
      "
      @click-left="
        () => {
          curNavBar?.onLeftClick
            ? curNavBar?.onLeftClick(router)
            : onNavBarClick();
        }
      "
    >
      <template #left v-if="curNavBar?.leftContent">
        <curNavBar.leftContent
          v-if="typeof curNavBar?.leftContent === 'object'"
        />
        <template v-else>{{ curNavBar?.leftContent }}</template>
      </template>
      <template #right v-if="curNavBar?.rightContent">
        <curNavBar.rightContent
          v-if="typeof curNavBar?.rightContent === 'object'"
        />
        <template v-else>{{ curNavBar?.rightContent }}</template>
      </template>
    </van-nav-bar>
    <div
      :class="`content ${
        layoutCfg?.navBar?.fixed !== false ? 'fixed_header_content' : ''
      } ${layoutCfg?.tabBar?.fixed !== false ? 'fixed_footer_content' : ''}`"
    >
      <router-view></router-view>
    </div>
    <van-tabbar
      v-if="tabActive"
      v-model="state.curPagePath"
      :fixed="layoutCfg?.tabBar?.fixed !== false"
      :before-change="onTabBeforeChange"
      @change="onChangeTab"
    >
      <van-tabbar-item
        v-for="(item, index) in layoutCfg?.tabBar?.list || []"
        :key="item?.pagePath"
        :icon="
          typeof getTabItemIcon(item) === 'object'
            ? undefined
            : getTabItemIcon(item)
        "
        :name="item?.pagePath"
        :badge="item?.badge"
        :dot="item?.dot"
      >
        {{ item?.text }}
        <template
          #icon="props"
          v-if="
            getTabItemIcon(item) && typeof getTabItemIcon(item) === 'object'
          "
        >
          <layoutCfg.tabBar.list[index].selectedIcon
            v-if="
              props.active &&
              layoutCfg?.tabBar?.list?.[index].selectedIcon &&
              typeof layoutCfg?.tabBar?.list?.[index]?.selectedIcon === 'object'
            "
          />
          <layoutCfg.tabBar.list[index].icon
            v-else-if="
              layoutCfg?.tabBar?.list?.[index]?.icon &&
              typeof layoutCfg?.tabBar?.list?.[index]?.icon === 'object'
            "
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </van-config-provider>
</template>
<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAppData } from 'valita';
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
}
const app = useAppData();
const layoutCfg: MobileLayoutProps =
  app?.pluginManager?.hooks?.mobileLayout?.[0];
const defaultTheme = 'light';
const state = reactive({ curPagePath: location?.pathname });
const tabActive = computed(() => {
  return layoutCfg?.tabBar?.list?.filter((item) => {
    return item?.pagePath === state?.curPagePath;
  })?.[0];
});
let curNavBar = computed(() => {
  const curPath = location?.pathname;
  const navBarActive = layoutCfg?.navBar?.navList?.filter((item) => {
    return item?.pagePath?.trim() === state?.curPagePath?.trim();
  })?.[0];
  if (navBarActive?.navBar?.hideNavBar) {
    return undefined;
  }
  const titleListActive = layoutCfg?.titleList?.filter((item) => {
    return item?.pagePath?.trim() === curPath?.trim();
  })?.[0];
  const navBarParams = {
    mode: layoutCfg?.theme || defaultTheme,
    ...(navBarActive?.navBar || {}),
    title:
      titleListActive?.title ||
      navBarActive?.navBar?.pageTitle ||
      tabActive?.value?.title,
    pagePath:
      titleListActive?.pagePath ||
      navBarActive?.pagePath ||
      tabActive?.value?.pagePath,
    hideNavBar:
      navBarActive?.navBar?.hideNavBar || tabActive?.value?.hideNavBar,
  };
  return navBarParams;
});
const getTabItemIcon = (item: TabBarListItem) => {
  const iconPath =
    state.curPagePath !== item.pagePath
      ? item?.iconPath || item?.icon
      : item?.selectedIconPath ||
        item?.selectedIcon ||
        item?.iconPath ||
        item?.icon;
  return iconPath;
};
const router = useRouter();
const onNavBarClick = () => {
  router?.back();
};
const onTabBeforeChange = (name) => {
  const curTabItem = layoutCfg?.tabBar?.list?.filter((item) => {
    return item?.pagePath === name;
  })?.[0];
  if (curTabItem?.onPress) {
    return curTabItem?.onPress(router, curTabItem);
  } else if (layoutCfg?.tabBar?.tabBeforeChange) {
    return layoutCfg?.tabBar?.tabBeforeChange(router, name);
  } else if (curTabItem?.pagePath) {
    router.push(curTabItem.pagePath);
  }
};
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    state.curPagePath = toPath;
  },
  { immediate: true, deep: true },
);
const onChangeTab = (name) => {
  layoutCfg?.tabBar?.tabChange && layoutCfg?.tabBar?.tabChange(router, name);
  state.curPagePath = name;
};
</script>
<style scoped lang="css">
.valita-layout {
  margin: 0;
  width: 100%;
  height: 100vh;
}
.valita-layout .content {
  width: 100%;
  height: 100%;
}

.valita-layout .content.fixed_header_content {
  padding-top: var(--van-nav-bar-height);
}
.valita-layout .content.fixed_footer_content {
  padding-bottom: var(--van-tabbar-height);
}
</style>
