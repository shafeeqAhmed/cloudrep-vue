import axios from '@axios'

export default {
    namespaced: true,
    state: {
        step: '',
        services: [],
        clientServices: [],
        clientInformation: {},
        categoryList: [],
        selectedCategory: '',
        verticalList: [],
        selectedVerticals: [],
    },
    getters: {
        services: state => {
            return state.services
        },
        categoryList: state => {
            return state.categoryList
        },
        verticalList: state => {
            return state.verticalList
        },
    },
    mutations: {
        UDPATE_STEP(state, val) {
            state.step = val
        },
        UDPATE_SERVICES(state, val) {
            state.services = val
        },
        UDPATE_CLIENT_SERVICES(state, val) {
            state.clientServices = val
        },
        UDPATE_CLIENT_INFORMATION(state, val) {
            state.clientInformation = val
        },
        UDPATE_IS_STEP_ONE_LOADING(state, val) {
            state.isStepOneLoading = val
        },
        UDPATE_CATEGORY_LIST(state, val) {
            state.categoryList = val
        },
        UDPATE_SELECTED_CATEGORY(state, val) {
            state.selectedCategory = val
        },
        UDPATE_VERTICAL_LIST(state, val) {
            state.verticalList = val
        },
        UDPATE_SELECTED_VERTICAL(state, val) {
            state.selectedVerticals = val
        },
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

                        ctx.commit('UDPATE_CLIENT_INFORMATION',client_profile_items)
                        ctx.commit('UDPATE_STEP',client_profile_items.step)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        getServicesList(ctx) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/services`)
                    .then((response) =>{
                        const {
                            data: {
                              data: { services },
                            },
                          } = response;

                        ctx.commit('UDPATE_SERVICES',services)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        getClientService(ctx) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/client-services`)
                    .then((response) =>{
                        const { data } = response;
                        ctx.commit('UDPATE_CLIENT_SERVICES',data)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        getBusinessCategories(ctx) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/bussines-categories`)
                    .then((response) =>{
                        const { data: { data: { bussines_categories }} } = response;
                        ctx.commit('UDPATE_CATEGORY_LIST',bussines_categories)
                        ctx.commit('UDPATE_SELECTED_CATEGORY',bussines_categories[0].uuid)
                        // ctx.dispatch('getVerticalList',bussines_categories[0].uuid)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        getVerticalList(ctx, uuid) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/business-verticals/${uuid}`)
                    .then((response) =>{
                        const {
                            data: {
                              data: { business_verticals },
                            },
                          } = response;
                        ctx.commit('UDPATE_VERTICAL_LIST',business_verticals)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        getClientVerticals(ctx) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/client-verticals`)
                    .then((response) =>{
                        const { data } = response;
                        ctx.commit('UDPATE_SELECTED_VERTICAL',data)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },

    },
}
