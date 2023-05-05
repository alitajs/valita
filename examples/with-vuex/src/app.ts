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
    pagePath: '/',
    title: '用户',
  },
];
const navList: NavBarListItem[] = [
  {
    pagePath: '/',
    navBar: {
      leftContent: Test,
    },
  },
];
const navBar: NavBarProps = {
  navList,
  fixed: true,
  mode: 'light',
  onLeftClick: (router: any) => {
    router.goBack();
  },
};
const tabList: TabBarListItem[] = [
];

const tabBar: TabBarProps = {
  color: `#000000`,
  selectedColor: '#00A0FF',
  backgroungColor: '#fff',
  list: tabList,
};
export const mobileLayout = {
  theme: 'dark',
  documentTitle: 'Dai',
  navBar,
  titleList,
  tabBar,
};
