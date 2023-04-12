# Contribution Guide

❤️ Love Umi series framework and want to contribute? Thank you!

## Environment Setup

### Node.js and pnpm

Developing valita requires Node.js 16+ and `pnpm` v7.

It is recommended to use [`nvm`](https://github.com/nvm-sh/nvm) to manage Node.js, which can avoid permission issues and switch the version of Node.js being used at any time. Developers on Windows systems can use [`nvm-windows`](https://github.com/coreybutler/nvm-windows).

Choose one way to install `pnpm` on the [official website](https://pnpm.io/installation).

### Clone the Project

```bash
$ git clone git@github.com:alitajs/valita.git
$ cd valita
```

### Install Dependencies and Build

```bash
$ pnpm i && pnpm build
```

## Develop valita

### Start dev Command

The necessary command for local development of valita is used to compile TypeScript files under `src` to the `dist` directory, while listening for file changes and incrementally compiling when changes occur.

```bash
$ pnpm dev
```

If it feels slow, you can also run the `pnpm dev` command for a specific package, such as:

```bash
$ cd packages/valita
$ pnpm dev
```

### Run Example

Various examples for testing are saved in the `examples` directory. Running examples is a common way to confirm that valita functions properly during development. Each example has a dev script, so enter the example and execute `pnpm dev`.

```bash
$ cd examples/boilerplate
$ pnpm dev
```

### Test

It is recommended to run locally before submitting PR to reduce Round Trip.

```bash
$ pnpm test

Ran all test suites.
```

If you only need to run part of the file's case.

For example:

```bash
$ pnpm test packages/plugin-docs/src/compiler.test.ts
```

## Contribute to valita Documentation

The documentation for valita is implemented by Umi@4 and `@umijs/plugin-docs` plug-ins, which is essentially a Umi project. Run the following command in the root directory to start developing valita documentation:

```bash
# Enable Umi document development
# The first startup takes a long time to compile, please be patient

$ pnpm doc:dev
```

Open the specified port number to see real-time updates of the documentation.

## Add a New Package

There is a packaging script for adding new packages, so you don't need to manually copy `package.json` and other files:

```bash
# Create package directory
$ mkdir packages/foo
# Initialize package development
$ pnpm bootstrap
````

## Release

Only Core Maintainer can execute the release.

```bash
$ pnpm release
```

## Join the Contributor Group

Students who have submitted Bugfix or Feature class PRs and are interested in participating in valita maintenance together can add me on WeChat yu_xiaohu, and then I will pull them into the group.

If you don't know what you can contribute, you can search for TODO or FIXME in the source code.