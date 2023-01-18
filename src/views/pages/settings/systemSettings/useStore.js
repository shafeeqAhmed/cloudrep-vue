import axios from '@axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchSystemSettings(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/system-settings`, { params: queryParams })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },

    },
}
