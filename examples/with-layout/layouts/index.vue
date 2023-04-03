<template>
  <van-config-provider class="valita-layout" :theme="layoutCfg?.theme||defaultTheme">
    <van-nav-bar
      :fixed="layoutCfg?.navBar?.fixed!==false"
      v-if="curNavBar?.hideNavBar!==false&&(layoutCfg?.documentTitle||curNavBar?.pagePath)"
      :title="curNavBar?.title||layoutCfg?.documentTitle"
      :left-text="curNavBar?.leftText"
      :left-arrow="curNavBar?.leftContent||curNavBar?.leftText||curNavBar?.icon||curNavBar?.onLeftClick"
      @click-left="()=>{
        curNavBar?.onLeftClick?curNavBar?.onLeftClick(router):onNavBarClick()
      }"
    >
      <template #left v-if="curNavBar?.leftContent">
        <!-- 这种使用支持 -->
        <curNavBar.leftContent v-if="typeof curNavBar?.leftContent==='object'" />
        <template v-else>{{ curNavBar?.leftContent  }}</template>
      </template>
      <template #right v-if="curNavBar?.rightContent">
        <curNavBar.rightContent v-if="typeof curNavBar?.rightContent==='object'"/>
        <template v-else>{{ curNavBar?.rightContent  }}</template>
      </template>
    </van-nav-bar>
    <div :class="`content ${layoutCfg?.navBar?.fixed!==false?'fixed_header_content':''} ${layoutCfg?.tabBar?.fixed!==false?'fixed_footer_content':''}`">
      <router-view ></router-view>
    </div>
    <van-tabbar
      v-model="state.curPagePath"
      :fixed="layoutCfg?.tabBar?.fixed!==false"
      :before-change="onTabBeforeChange"
      @change="onChangeTab">
      <van-tabbar-item v-for="item in layoutCfg?.tabBar?.list"
        :key="item?.pagePath"
        :icon="state.curPagePath!==item.pagePath?item?.iconPath||item?.icon:item?.selectedIconPath||item?.selectedIcon||item?.iconPath||item?.icon"
        :name="item?.pagePath"
        :badge="item?.badge"
        :dot="item?.dot">
        {{ item?.text }}
      </van-tabbar-item>
    </van-tabbar>
  </van-config-provider>
</template>
<script setup lang="ts">
import {computed,reactive,watch} from 'vue'
import {useRouter} from 'vue-router'
import { useAppData } from 'valita'
import route from '@umijs/utils/compiled/color/color-convert/route'
// 去处onPress方法，
// 新增：
// tabBeforeChange//在路径切换前拦截处理
// tabChange //触发切换了
export interface TabBarListItem{
  pagePath:string
  text?:string
  iconPath?:string
  selectedIconPath?:string
  dot?:boolean,
  badge?:number|string
  title?:string//页面标题
  icon?:string//都只能用地址
  selectedIcon?:string//考虑用slot替代
  onPress?:(navigator:any,data?:TabBarListItem)=>void
  hideNavBar?:boolean
}
export interface TabBarProps{
  color?:string,
  fixed?:boolean,
  selectedColor?:string
  backgroundColor?:string
  list?:TabBarListItem[]
  tabsGroup?:string[][] //TODO:暂不支持，未知其UI效果，后续在补上
  tabBeforeChange?:(navigator:any,name: number | string) => boolean | Promise<boolean>//切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise
  tabChange?:(navigator:any,name: number | string) => void
}
export interface _NavBarProps{
  mode?:"dark"|"light"//默认是全局的theme
  icon?:object|string
  leftText?:string
  leftContent?:any,//考虑用slot替代
  rightContent?:any,//考虑用slot替代
  onLeftClick?:(navigator:any)=>void
  hideNavBar?:boolean
  pageBackground?:string
  pageTitle?:string

}
export interface NavBarListItem{
  pagePath:string
  navBar?:_NavBarProps
}
export interface NavBarProps extends _NavBarProps{
  fixed?:boolean,
  navList?:NavBarListItem[]
}
export interface TitleItems{
  pagePath:string
  title?:string
}
export interface MobileLayoutProps{
  theme?:"dark"|"light",
  tabBar?:TabBarProps,
  navBar?:NavBarProps,
  documentTitle?:string
  titleList?:TitleItems[]
}
const app = useAppData()
const layoutCfg:MobileLayoutProps = app?.pluginManager?.hooks?.mobileLayout?.[0]
const defaultTheme = 'light'
// 当前选中的tab
const state = reactive({ curPagePath: location?.pathname })
// 当前选中的底部TabItem
const tabActive= computed(()=>{
  return layoutCfg?.tabBar?.list?.filter(item=>{
    return item?.pagePath === state?.curPagePath
  })?.[0]
})
//当前页面的NavBar数据，依次以title为优先，然后navList的数据，然后当前tabBar的数据
let curNavBar = computed(()=>{
  const curPath =  location?.pathname
  const navBarActive = layoutCfg?.navBar?.navList?.filter(item=>{
    return item?.pagePath?.trim()===state?.curPagePath?.trim()
  })?.[0]
  if(navBarActive?.navBar?.hideNavBar){
    return undefined
  }
  const titleListActive = layoutCfg?.titleList?.filter(item=>{
    return item?.pagePath?.trim() === curPath?.trim()
  })?.[0]
  const navBarParams = {
    mode:layoutCfg?.theme||defaultTheme,
    ...(navBarActive?.navBar||{}),
    title:titleListActive?.title || navBarActive?.navBar?.pageTitle||tabActive?.value?.title,
    pagePath: titleListActive?.pagePath || navBarActive?.pagePath||tabActive?.value?.pagePath,
    hideNavBar:navBarActive?.navBar?.hideNavBar||tabActive?.value?.hideNavBar,
  }
  return navBarParams
})
// 默认的顶部返回
const router = useRouter()
//默认的返回功能
const onNavBarClick = ()=>{
  router?.back()
}
//默认的标签点击事件
const onTabBeforeChange = (name)=>{
  const curTabItem= layoutCfg?.tabBar?.list?.filter(item=>{
    return item?.pagePath === name
  })?.[0]
  if(curTabItem?.onPress){
    curTabItem?.onPress(router,curTabItem)
  }else if(layoutCfg?.tabBar?.tabBeforeChange){
    layoutCfg?.tabBar?.tabBeforeChange(router,name)
  }else if(curTabItem?.pagePath){
    router.push(curTabItem.pagePath)
  }
}
// 检测当前路由变化
watch(() => router.currentRoute.value.path,(toPath) => {
    state.curPagePath = toPath
},{immediate: true,deep: true})
// 地步tab变化
const onChangeTab = (name)=>{
  layoutCfg?.tabBar?.tabChange && layoutCfg?.tabBar?.tabChange(router,name)
}
</script>
<style scoped lang="less">
.valita-layout{
  margin: 0;
  width: 100%;
  height: 100vh;
  .content{
      width: 100%;
      width: 100%;
      height: 100%;
    &.fixed_header_content{
      padding-top: var(--van-nav-bar-height);
    }
    &.fixed_footer_content{
      padding-bottom: var(--van-tabbar-height);
    }
  }
}
</style>
