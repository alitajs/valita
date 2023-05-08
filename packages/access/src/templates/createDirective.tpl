const setDisplay = (el, access) => {
    el.style.display = access.value ? el._display : 'none';
}

const cache = new WeakMap();

const createDirective = (useAccess) => {
    return {
        beforeMount(el) {
            const ctx = {};
            ctx.watch = (path: string) => {
                el._display = el._display || el.style.display;
                const access = useAccess(path);
                setDisplay(el, access);
                return watch(access, () => {
                    setDisplay(el, access);
                })
            }
            cache.set(el, ctx);
        },
        mounted(el, binding) {
            const ctx = cache.get(el);
            if (ctx.unwatch) {
                ctx.unwatch();
            }
            ctx.unwatch = ctx.watch(binding.value)
        },
        updated(el, binding) {
            const ctx = cache.get(el);
            if (ctx.unwatch) {
                ctx.unwatch();
            }
            ctx.unwatch = ctx.watch(binding.value);
        },
        beforeUnmount(el) {
            const ctx = cache.get(el);
            if (ctx.unwatch) {
                ctx.unwatch();
            }
        },
    }
}

export default createDirective;