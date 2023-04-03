import { IApi } from 'valita';

export default (api: IApi) => {
  // 把 examples/with-layout/plugin.ts 里面的内容移到这里
  // 然后在 with-layout 里面安装 @alitajs/vue-layout 并在 配置文件中（examples/with-layout/.umirc.ts） 写明
  // plugins:[' @alitajs/vue-layout']
  // 注意安装的包要装到这个包里，项目中没有直接依赖的，记得删除
  // 在  api.onGenerateFiles 的时候，把 layout 文件，写到临时文件夹里面。
  // 感觉像是将 examples/with-layout/layouts/index.vue 复制到 examples/with-layout/.umi/plugin-layout/index.vue

  // 使用 api.addLayouts 用 examples/with-layout/.umi/plugin-layout/index.vue 包裹项目
  
  // api.addLayouts(() => {
  //   return [
  //     {
  //       id: 'vue-layout',
  //        这里要注意路径
  //       file:index.vue,
  //     },
  //   ];
  // });
};
