import axios from '@axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchCompletedCampaigns(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/get-campaigns-completed`, { params: queryParams })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        fetchDraftedCampaigns(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/get-campaigns-drafted`, { params: queryParams })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },

    },
}
