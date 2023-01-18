import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchToken(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/get-call-access-token')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
