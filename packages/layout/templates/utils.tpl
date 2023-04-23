import type { NavBarProps, NavBarListItem } from './types.d';

export const changeNavBarConfig = (
  preConfig: NavBarProps | undefined,
  changeData: {},
) => {
  if (!changeData) return preConfig;
  const { navList, ...other } = preConfig as NavBarProps;
  if (!navList || navList!.length === 0) {
    const config = [] as NavBarListItem[];
    Object.keys(changeData).forEach((i) => {
      config.push({
        pagePath: i,
        navBar: changeData[i],
      });
    });
    return { ...other, navList: config };
  }
  let isChanged = false;
  const newNavList = navList!.map((i) => {
    if (changeData[i.pagePath]) {
      i.navBar = { ...i.navBar, ...changeData[i.pagePath] };
      isChanged = true;
    }
    return i;
  });
  if (isChanged) {
    return { ...other, navList: newNavList };
  }
  Object.keys(changeData).forEach((i) => {
    newNavList.push({
      pagePath: i,
      navBar: changeData[i],
    });
  });
  return { ...other, navList: newNavList };
};