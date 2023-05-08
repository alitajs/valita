# @alitajs/vue-vuex

## store

在 `/src` 的目录里，约定 `/stores` 下的文件为 `vuex` 的对应 `store`。

**新建 `store` 后，要重新启动**

#### state

单一状态树，用一个对象包含全部的应用层级状态。

#### getters

从 `store` 中的 `state` 中派生出一些状态。

#### mutations 

同步更改 `Vuex` 的 `store` 中的状态的唯一方法是提交 `mutation`。

```js
// mutations
const mutations = {
  save(state, payload) {
    Object.assign(state, payload);
  }
}
```

#### actions

包含任意的异步操作。

`Action` 函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象。

context 具备一下参数：

- commit: 执行 `mutations` 的方法，如果希望执行其他 `store` 的 `mutations`，在第三个参数上增加 `{ root: true }`，代表执行的是全局 `store`。
- state: 当前 `store` 下的数据源。
- rootState: 全局 `store` 下的数据源。
- dispatch: 执行其他的 `action`
- getters: 当前 `store` 下的派生状态
- rootGetters: 全局 `store` 下的派生状态

## 在页面中使用

```js
import { useStore } from "vuex";

const store = useStore();
const { commit, dispatch } = store;

const product = computed(() => store.state.product);
const count = computed(() => store.state.count);

// 异步
dispatch("product/changeName", {
  name: `newName`,
});

// 同步
commit("product/save", {
  num: (product.value.num += 1),
  name: `newName`,
});
```