Language : 🇺🇸 | [🇨🇳](./README.zh-CN.md)

# 🌟 valita

valita is a Vue front-end framework based on Umi. It follows the principle of "convention over configuration" and provides a set of default directory structures and configuration files, allowing developers to focus more on business logic implementation rather than worrying about low-level details.

## Features

### Routing 🛣️

valita provides a simple and easy-to-use routing solution that supports dynamic routing, nested routing, and file-based routing.

### State Management 🧬

valita comes with Pinia data flow solution built-in for state management.

### Internationalization 🌐

valita supports internationalization and comes with Vue-i18n pre-installed. It can automatically switch interface language based on the user's language environment and provides a simple and easy-to-use API to implement multi-language support.

### Request Library 📡

valita integrates with Umi-request, providing a set of Promise-based HTTP request libraries that support interceptors, error handling, and other features. It also has useRequest built-in.

### Plugin Mechanism 🧩

valita uses Umi's plugin mechanism, allowing developers to extend and customize application functionality by writing plugins. For example, adding new routing types or state management solutions.

### API Auto-loading 🤖

valita not only supports import all from Umi but also no import.

### Out-of-the-Box Functionality 📦

valita comes with many commonly used features pre-installed, such as Vant library, Navia-UI library, etc. These features are ready to use out-of-the-box without any additional installation or configuration.

### Modular Development 🧱

valita supports modular development, allowing developers to break down the application into multiple independent modules. Each module has its own routing, state management, and other features, improving code maintainability and reusability.

### Testing Tools 🧪

valita integrates with Vitest and Playwright, providing a complete set of testing tools that support unit testing, integration testing, and other types of testing, ensuring the quality and stability of the application.

## Quick Start 📚

### Create a Project 🚀

Create a new project:

```
$ mkdir myapp && cd myapp
$ pnpx create-valita
$ pnpm install
```

Then select the required template and plug-ins according to the prompts and wait for the installation to complete.

### Run the Project

Enter the project directory and run the following command to start the development server:

```
$ valita dev
```

Then open [http://localhost:8000/](http://localhost:8000/) in your browser to access the application.

### Build the Project

Run the following command to build the production environment code:

```
$ valita build
```

After the build is complete, the generated static files are located in the `dist` directory.

## Contributing ❤️

Contributions are welcome! Please see our [contributing guidelines](./CONTRIBUTING.md) for more information.

## License 📜

valita is licensed under the [MIT License](./LICENSE).