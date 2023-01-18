import axios from '@axios'

export default {
  namespaced: true,
  state: {
    step: 0,
    countries: [],
    location: '',
    source: [],
    agentSources: [],
    device: '',
  },
  getters: {
    countries: state => {
      return state.countries
    },
    location: state => {
      return state.location
    },
    source: state => {
      return state.source
    },
    agentSources: state => {
      return state.agentSources
    },


  },
  mutations: {
    UPDATE_STEP(state, val) {
      state.step = val
    },
    UPDATE_COUNTRIES(state, val) {
      state.countries = val
    },
    UPDATE_LOCATION(state, val) {
      state.location = val
    },
    UPDATE_DEVICE(state, val) {
      state.device = val
    },
    UPDATE_SOURCE(state, val) {
      state.source = val
    },
    UPDATE_AGENT_SOURCE(state, val) {
      state.agentSources = val
    },


  },
  actions: {
    myAgentProfileItem(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/my-agent-profile-items`)
          .then((response) => {
            const {
              data: {
                data: { agent_profile_items },
              },
            } = response;
            console.log(ctx)
            if (agent_profile_items) {
              // if (agent_profile_items.step == 1 && ctx.state.step == 0) {
              //   console.log('state wala')
              //   ctx.commit('UPDATE_STEP', 2)

              // } else {
              //   console.log('else wala')

              // }
              ctx.commit('UPDATE_STEP', agent_profile_items.step)

              ctx.commit('UPDATE_LOCATION', agent_profile_items.location)
              ctx.commit('UPDATE_DEVICE', agent_profile_items.device)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    getCountries(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/country-list`)
          .then((response) => {
            const {
              data: { countries },
            } = response;
            ctx.commit('UPDATE_COUNTRIES', countries)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // getAgentCountry(ctx) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(`/my-agent-profile-items`)
    //       .then((response) => {
    //         const { data: { data: { agent_profile_items } } } = response
    //         ctx.commit('UPDATE_AGENT_COUNTRY', agent_profile_items.location)

    //         resolve(response)
    //       })
    //       .catch(error => reject(error))
    //   })
    // },
    getSource(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/trafic-source`)
          .then((response) => {
            const {
              data: {
                data: { source },
              },
            } = response;
            ctx.commit('UPDATE_SOURCE', source)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

  },
}
