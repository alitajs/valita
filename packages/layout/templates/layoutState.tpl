import type { NavBarListItem } from './types.d';

let pageNavBar = {};
let tabBarList = {};

type Subscription<T> = (val: T) => void;

class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit = (val: T) => {
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  };

  useSubscription = (callback: Subscription<T>) => {
    function subscription(val: T) {
      if (callback) {
        callback(val);
      }
    }
    this.subscriptions.add(subscription);
  };
}
const layoutEmitter = new EventEmitter();

const setPageNavBar = (value: NavBarListItem) => {
  if (!value.pagePath || !value.navBar) {
    console.error('setPageNavBar: value.pagePath can not be undefined')
    return;
  }
  pageNavBar = { ...pageNavBar, [value.pagePath]: value.navBar }
  layoutEmitter.emit('');
}
const getPageNavBar = () => pageNavBar;

export {
  getPageNavBar, 
  setPageNavBar, 
  layoutEmitter
}