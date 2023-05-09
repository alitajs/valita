export default {
    routes: [{
        path: '/',
        name: 'Home',
        component: 'index',
        routes: [
            {
                path: 'admin',
                name: 'Admin',
                component: '@/components/admin',
            },
            {
                path: 'normal',
                name: 'Normal',
                component: '@/components/normal',
            }
        ]
    }],
    access: {
        defaultRole: "normal",
        refreshAccess: true,
        roles: {
            admin: ['/admin'],
            normal: ['/normal']
        }
    }
};
