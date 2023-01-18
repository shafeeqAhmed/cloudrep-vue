import axios from '@axios'
export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchTransaction(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/get-transactions`, { params: queryParams })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
    },
}