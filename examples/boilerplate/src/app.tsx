import type {
  NavBarListItem,
  NavBarProps,
  TabBarListItem,
  TabBarProps,
  TitleListItem,
} from 'valita';

const titleList: TitleListItem[] = [
  {
    pagePath: '/user',
    title: '用户',
  },
  {
    pagePath: '/users/foo',
    title: '用户的foo',
  },
];
const navList: NavBarListItem[] = [
  {
    pagePath: '/user',
    navBar: {},
  },
];
const navBar: NavBarProps = {
  navList,
  fixed: true,
  mode: 'dark',
  onLeftClick: (router: any) => {
    router.goBack();
  },
};
const tabList: TabBarListItem[] = [
  {
    pagePath: '/',
    text: '首页',
    icon: 'home-o',
    selectedIcon: 'home-o',
    title: '首页',
  },
  {
    pagePath: '/user',
    text: '用户',
    icon: 'home-o',
    selectedIcon: 'home-o',
    title: '待办中心',
    badge: '3',
  },
];

const tabBar: TabBarProps = {
  color: `#000000`,
  selectedColor: '#00A0FF',
  backgroungColor: '#Fff',
  list: tabList,
};
export const mobileLayout = {
  theme: 'dark',
  documentTitle: 'Dai',
  navBar,
  titleList,
  tabBar,
};

export const request = {
  prefix: '/api',
  method: 'get',
  errorHandler: (error) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
};
