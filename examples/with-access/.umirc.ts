export default {
    plugins: ['@alitajs/access'],
    access: {
        roles: {
            admin: ['/admin'],
            normal: ['/normal']
        }
    }
};
