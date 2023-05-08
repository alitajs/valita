export default {
    plugins: ['@alitajs/vue-access'],
    access: {
        defaultRole: "normal",
        roles: {
            admin: ['/admin', '/normal'],
            normal: ['/normal']
        }
    }
};
