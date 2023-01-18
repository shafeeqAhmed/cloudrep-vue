import axios from '@axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchLabels(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/labels`, { params: queryParams })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },

    },
}
