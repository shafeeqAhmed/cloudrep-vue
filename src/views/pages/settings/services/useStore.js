import axios from '@axios'

export default {
    namespaced: true,
    state: {
        iconUrl: '',
        imageUrl: '',
    },
    getters: {},
    mutations: {
        ICON_URL(state, val) {
            state.iconUrl = val
        },
        IMAGE_URL(state, val) {
            state.imageUrl = val
        },
    },
    actions: {
        storeService(ctx, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`services`, data)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },

    },
}
