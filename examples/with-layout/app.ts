// @ts-ignore
import { RouterConfig } from 'valita';

// export function onRouterCreated({ router }: any) {
//   console.log('onRouterCreated', router);
// }

// export function onAppCreated({ app }: any) {
//   console.log('onAppCreated', app);
// }

// export function onMounted({ app, router }: any) {
//   console.log('onMounted', app, router);
//   app.provide('valita-hello', {
//     h: 'hello',
//     w: 'word',
//   });
// }

// export const router: RouterConfig = {
//   // @ts-ignore
//   scrollBehavior(to, from) {
//     console.log('scrollBehavior', to, from);
//   },
// };
// 注册runtime配置

import { NavBarProps, TitleListItem, NavBarListItem,TabBarListItem,TabBarProps } from "valita";
const titleList: TitleListItem[] = [
  {
    pagePath: "/user",
    title: "我的工单",
  },
  {
    pagePath: "/renewal",
    title: "协议续签",
  },
  {
    pagePath: "/renewalDetail",
    title: "协议详情",
  },
  {
    pagePath: "/productList",
    title: "产品列表",
  },
  {
    pagePath: "/fuse/draftAgreement",
    title: "协议起草",
  },
  {
    pagePath: "/fuse/specialLineForm",
    title: "协议起草",
  },
  {
    pagePath: "/fuse/groupCustomerList",
    title: "选择集团",
  },
  {
    pagePath: "/fuse/bfmUserList",
    title: "选择审批人",
  },
  {
    pagePath: "/fuseDetail/agreeDetail",
    title: "协议详情",
  },
  {
    pagePath: "/fuseDetail/specialLineDetail",
    title: "协议详情",
  },
  {
    pagePath: "/previewSign",
    title: "协议签订",
  },
  {
    pagePath: "/contractPreview",
    title: "合同预览",
  },
  {
    pagePath: "/order/orderList",
    title: "订单中心",
  },
  {
    pagePath: "/order/orderProcess",
    title: "流程信息",
  },
  {
    pagePath: "/fuse/oaBfmUserList",
    title: "选择审批人",
  },
  {
    pagePath: "/draftList",
    title: "草稿列表",
  },
];
import Test from '@/components/Test.vue'
const navList: NavBarListItem[] = [
  {
    pagePath: "/user",
    navBar: {
      leftContent:Test
    },
  },
  {
    pagePath: "/renewal",
    navBar: {},
  },
  {
    pagePath: "/renewalDetail",
    navBar: {},
  },
  {
    pagePath: "/productList",
    navBar: {},
  },
  {
    pagePath: "/fuse/draftAgreement",
    navBar: {},
  },
  {
    pagePath: "/fuse/groupCustomerList",
    navBar: {},
  },
  {
    pagePath: "/fuse/specialLineForm",
    navBar: {},
  },
  {
    pagePath: "/fuse/bfmUserList",
    navBar: {},
  },
  {
    pagePath: "/fuseDetail/agreeDetail",
    navBar: {},
  },
  {
    pagePath: "/fuseDetail/specialLineDetail",
    navBar: {},
  },
  {
    pagePath: "/previewSign",
    navBar: {},
  },
  {
    pagePath: "/contractPreview",
    navBar: {},
  },
  {
    pagePath: "/order/orderList",
    navBar: {},
  },
  {
    pagePath: "/order/orderProcess",
    navBar: {},
  },
  {
    pagePath: "/fuse/oaBfmUserList",
    navBar: {},
  },
  {
    pagePath: "/draftList",
    navBar: {},
  },
];
const navBar: NavBarProps = {
  navList,
  fixed: true,
  mode: "dark",
  onLeftClick: () => {
    // router.goBack();
  },
};
const tabList: TabBarListItem[] = [
  {
    pagePath: '/',
    text: '首页',
    icon:"home-o",
    selectedIcon:'home-o',
    title: '首页'
  },
  {
    pagePath: '/user',
    text: '待办',
    icon: "search",
    selectedIcon:'search',
    title: '待办中心',
    badge: '3'
  },
]

const tabBar: TabBarProps = {
  color: `#000000`,
  selectedColor: '#00A0FF',
  backgroungColor:'#Fff',
  list: tabList
};
export const mobileLayout = {
  theme:"dark",
  documentTitle:"Dai",
  navBar,
  // titleList,
  tabBar,
}
