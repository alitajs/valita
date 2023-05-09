import { access, useAccess } from "./index";

//无权限时要不要拦截路由跳转？
/**
export function onRouterCreated({ router }) {
    router.beforeEach(async (to, from, next) => {
        const routeAccess = useAccess(to.matched[to.matched.length - 1].path);
        if(routeAccess.hasAccess.value){
            return next();
        }else{
            return next(false);
        }
    })
}
**/


export function onMounted({ app }) {
    app.use(access);
}