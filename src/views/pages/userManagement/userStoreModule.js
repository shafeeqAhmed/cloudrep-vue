import axios from '@axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchUsers(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/users/${queryParams.type}`, { params: queryParams })
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

    },
}
