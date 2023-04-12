# 参与贡献

❤️ 喜欢 Umi 系框架并且想参与贡献？感谢！

## 环境准备

### Node.js 和 pnpm

开发 valita 需要 Node.js 16+ 和 `pnpm` v7。

推荐使用 [`nvm`](https://github.com/nvm-sh/nvm) 管理 Node.js，避免权限问题的同时，还能够随时切换当前使用的 Node.js 的版本。在 Windows 系统下的开发者可以使用 [`nvm-windows`](https://github.com/coreybutler/nvm-windows)。

在 `pnpm` 的[官网](https://pnpm.io/installation)选择一种方式安装即可。

### Clone 项目

```bash
$ git clone git@github.com:alitajs/valita.git
$ cd valita
```

### 安装依赖并构建

```bash
$ pnpm i && pnpm build
```

## 开发 valita

### 启动 dev 命令

本地开发 valita 必开命令，用于编译 `src` 下的 TypeScript 文件到 `dist` 目录，同时监听文件变更，有变更时增量编译。

```bash
$ pnpm dev
```

如果觉得比较慢，也可以只跑特定 package 的 `pnpm dev` 命令，比如。

```bash
$ cd packages/valita
$ pnpm dev
```

### 跑 Example

`examples` 目录下保存了各种用于测试的例子，跑 example 是开发 valita 时确认功能正常的常用方式。每个 example 都配了 dev 脚本，所以进入 example 然后执行 `pnpm dev` 即可。

```bash
$ cd examples/boilerplate
$ pnpm dev
```

### 测试

推荐本地跑一遍再提 PR，减少 Round Trip。

```bash
$ pnpm test

Ran all test suites.
```

如果需要只跑部分文件的用例。

比如，

```bash
$ pnpm test packages/plugin-docs/src/compiler.test.ts
```

## 贡献 valita 文档

valita 的文档由 Umi@4 和 `@umijs/plugin-docs` 插件实现，本质上就是一个 Umi 项目。在根目录执行如下命令即可开始 valita 文档的开发：

```bash
# 启用 Umi 文档开发
# 首次启动时编译耗时较长，请耐心等待
$ pnpm doc:dev
```

打开指定的端口号，即可实时查看文档更新的内容。

## 新增 package

新增 package 有封装脚本，无需手动复制 `package.json` 等文件：

```bash
# 创建 package 目录
$ mkdir packages/foo
# 初始化 package 开发
$ pnpm bootstrap
```

## 发布

只有 Core Maintainer 才能执行发布。

```bash
$ pnpm release
```

## 加入 Contributor 群

提交过 Bugfix 或 Feature 类 PR 的同学，如果有兴趣一起参与维护 valita，可先加我微信 yu_xiaohu，然后我会拉到群里。

如果你不知道可以贡献什么，可以到源码里搜 TODO 或 FIXME 找找。
