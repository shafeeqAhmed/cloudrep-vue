import axios from '@axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchDropdowns(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/dropdowns`, { params: queryParams })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },

    },
}
