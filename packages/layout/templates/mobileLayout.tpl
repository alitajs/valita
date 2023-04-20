<template>
  <van-config-provider
    class="alita-page"
    :theme="layoutCfg?.theme || defaultTheme"
  >
    <van-nav-bar
      class="alita-head"
      :fixed="layoutCfg?.navBar?.fixed !== false"
      v-if="
        curNavBar?.hideNavBar !== false &&
        (layoutCfg?.documentTitle || curNavBar?.pagePath)
      "
      :title="curNavBar?.title || layoutCfg?.documentTitle"
      :left-text="curNavBar?.leftText"
      :left-arrow="
        !!(curNavBar?.leftContent ||
        curNavBar?.leftText ||
        curNavBar?.icon ||
        curNavBar?.onLeftClick)
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
      <template #left v-else>
        <van-icon
          name="arrow-left"
          :color="curNavBar.mode === 'dark' ? '#fff' : 'inherit'"
        />
      </template>
      <template #right v-if="curNavBar?.rightContent">
        <curNavBar.rightContent
          v-if="typeof curNavBar?.rightContent === 'object'"
        />
        <template v-else>{{ curNavBar?.rightContent }}</template>
      </template>
    </van-nav-bar>
    <div
      :class="`alita-content ${
        layoutCfg?.navBar?.fixed !== false ? 'fixed_header_content' : ''
      } ${layoutCfg?.tabBar?.fixed !== false ? 'fixed_footer_content' : ''}`"
    >
{{#hasKeepAlive}}
<KeepAliveLayout></KeepAliveLayout>
{{/hasKeepAlive}}
{{^hasKeepAlive}}
<router-view></router-view>
{{/hasKeepAlive}}
    </div>
    <van-tabbar
      class="alita-footer"
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


import { computed, reactive, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPluginManager } from '../core/plugin';
import { TabBarListItem } from './types.d';
import {getPageNavBar,layoutEmitter} from "./layoutState";
import { changeNavBarConfig } from "./utils";
{{#hasKeepAlive}}
import KeepAliveLayout from '@@/plugin-keepalive/layout.vue';
{{/hasKeepAlive}}

// mobile layout runtime config
const layoutCfg = getPluginManager().applyPlugins({ key: 'mobileLayout',type: 'modify', initialValue: {} });
const defaultTheme = 'light';
const state = reactive({ curPagePath: location?.pathname });
const pageNavBar = ref(layoutCfg?.navBar?.navList);
const tabActive = computed(() => {
  return layoutCfg?.tabBar?.list?.filter((item) => {
    return item?.pagePath === state?.curPagePath;
  })?.[0];
});

layoutEmitter?.useSubscription?.((e) => {
    pageNavBar.value = getPageNavBar();
  });

let curNavBar = computed(() => {
  const curPath = location?.pathname;
  const mergedNavList = changeNavBarConfig(layoutCfg?.navBar, pageNavBar.value);
  const navBarActive = mergedNavList?.navList.filter((item) => {
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
      navBarActive?.navBar?.pageTitle ||
      titleListActive?.title ||
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
    pageNavBar.value = getPageNavBar();
  },
  { immediate: true, deep: true },
);
const onChangeTab = (name) => {
  layoutCfg?.tabBar?.tabChange && layoutCfg?.tabBar?.tabChange(router, name);
  state.curPagePath = name;
};
</script>
<style scoped lang="css">
.alita-page {
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.alita-page .alita-content {
  width: 100%;
  min-height: 100vh;
}

.alita-page .alita-content.fixed_header_content {
  padding-top: var(--van-nav-bar-height);
}
.alita-page .alita-content.fixed_footer_content {
  padding-bottom: var(--van-tabbar-height);
}
</style>
