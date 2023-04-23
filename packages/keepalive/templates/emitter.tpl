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

export const keepaliveEmitter = new EventEmitter();

export function dropByCacheKey(path: string) {
  keepaliveEmitter.emit({type:'dropByCacheKey', payload: {
    path
  }});
}