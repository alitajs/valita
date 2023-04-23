import Test from '@/components/Test.vue';
import type {
  NavBarListItem,
  NavBarProps,
  TabBarListItem,
  TabBarProps,
  TitleListItem,
} from 'valita';
const titleList: TitleListItem[] = [
  {
    pagePath: '/tab/tab',
    title: 'tab',
  },
  {
    pagePath: '/name/name',
    title: 'name',
  },
  {
    pagePath: '/',
    title: 'index',
  },
  {
    pagePath: '/users/foo',
    title: '用户的 foo',
  },
];
const navList: NavBarListItem[] = [
  {
    pagePath: '/tab/tab',
    navBar: {},
    leftContent: Test,
  },
  {
    pagePath: '/name',
    navBar: {
      leftContent: Test,
    },
  },
  {
    pagePath: '/',
    navBar: {},
  },
  {
    pagePath: '/users/foo',
    navBar: {
      leftContent: Test,
    },
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
const tabList: TabBarListItem[] = [];

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
