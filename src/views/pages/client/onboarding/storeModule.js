import axios from '@axios'

export default {
    namespaced: true,
    state: {
        step: '',
    },
    getters: {},
    mutations: {
        UDPATE_STEP(state, val) {
            state.step = val
        }
    },
    actions: {
        myClientProfileItem(ctx) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/my-client-profile-items`)
                    .then((response) =>{
                        const {
                            data: {
                              data: { client_profile_items },
                            },
                          } = response;

                        ctx.commit('UDPATE_STEP',client_profile_items.step)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },

    },
}
