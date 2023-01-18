import axios from '@axios'

export default {
    namespaced: true,
    state: {
        setting: {}
    },
    getters: {},
    mutations: {
        UPDATE_ACCOUNT_SETTING(state, val) {
            state.setting = val
        },
    },
    actions: {
        myDetail({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`my-detail`)
                    .then(response => {
                        const { data: { data: { userData } } } = response
                        commit('UPDATE_ACCOUNT_SETTING', userData)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        uploadProfileImage(ctx, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`upload-profile-image`, data)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        removeProfileImage(ctx, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`remove-profile-image`, data)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        updateGeneralInformation(ctx, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`update-general-information`, data)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },


    },
}
