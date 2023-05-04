import { isPlainObject } from "@umijs/utils/compiled/lodash";
import { computed, reactive, unref } from "valita";

const state = reactive({
    roles: {{{roles}}},
    currentRoleId: '',
    currentAccessIds: []
});

function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
    );
}


const rolePromiseList: Promise<any>[] = [];
const accessPromiseList: Promise<any>[] = [];

const getAllowAccessIds = () => {
    const roleAccessIds = state.roles[state.currentRoleId];
    if (roleAccessIds.length > 0) {
        return state.currentAccessIds.concat(roleAccessIds);
    }
    return state.currentAccessIds;
}

const syncSetAccessIds = (promise: Promise<any>) => {
    accessPromiseList.push(promise);
    promise.then((accessIds) => {
        setAccess(accessIds);
    }).catch((e) => {
        console.error(e);
    }).then(() => {
        const index = accessPromiseList.indexOf(promise);
        if (index !== -1) {
            accessPromiseList.splice(index, 1);
        }
    })
}

const setAccess = async (access) => {
    if (isPromise(access)) {
        return syncSetAccessIds(access);
    }
    if (isPlainObject(access)) {
        if (access.accessIds) {
            setAccess(access.accessIds);
        }
        if (access.roleId) {
            setRoleId(access.roleId)
        }
        return;
    }
    state.currentAccessIds = access;
}

const syncSetRoleId = (promise: Promise<any>) => {
    rolePromiseList.push(promise);
    promise.then((roleId) => {
        setRole(roleId);
    }).catch((e) => {
        console.error(e);
    }).then(() => {
        const index = rolePromiseList.indexOf(promise);
        if (index !== -1) {
            rolePromiseList.splice(index, 1);
        }
    })
}

const setRole = async (role: Promise<any> | string) => {
    if (isPromise(role)) {
        return syncSetRoleId(role as Promise<any>);
    }
    state.currentRoleId = role as string;
}

const match = (path: string, accessIds: string[]) => {
    if (!path) {
        return false;
    }
    if (!Array.isArray(accessIds) || accessIds.length === 0) {
        return false;
    }
    let realPath = path.split('?')[0];
    if (realPath === '') {
        realPath = '/';
    }
    const len = accessIds.length;
    for (let i = 0; i < len; i++) {
        if (realPath === accessIds[i]) {
            return true;
        }
        const reg = new RegExp(`^${accessIds[i].replace("*", ".+")}$`);
        if (reg.test(realPath)) {
            return true;
        }
    }
    return false;
}

const isReady = () => {
    return rolePromiseList.length || accessPromiseList.length;
}

const hasAccess = async (path: string) => {
    if (!isReady()) {
        return match(path, getAllowAccessIds());
    }
    await Promise.all(rolePromiseList.concat(accessPromiseList));
    return match(path, getAllowAccessIds());
}

export const install = (app) => {
    app.directive("access", createDirective(useAccess));
    app.component("Access", createComponent(useAccess));
};

export const access = {
    hasAccess,
    isReady,
    setRole,
    setAccess,
    match,
    getAccess: getAllowAccessIds,
};

export const hasAccessSync = (path) => {
    return match(unref(path), getAllowAccessIds());
}

export const useAccess = (path) => {
    const allowPageIds = computed(getAllowAccessIds);
    const result = computed(() => {
        return match(unref(path), allowPageIds.value);
    });
    return result;
};
