import axios from '@axios'
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  namespaced: true,
  state: {
    businessTypes: [],
    cloudrepWorkTypes: [],
    businessCategories: [],
    selectedService: '',
    selectedService2: '',
    preRegistration: [],
  },
  getters: {
    businessTypes: (state) => {
      return state.businessTypes
    },
    businessCategories: (state) => {
      return state.businessCategories
    },
    cloudrepWorkTypes: (state) => {
      return state.cloudrepWorkTypes
    },
  },
  mutations: {
    UPDATE_BUSINESS_TYPES(state, val) {
      state.businessTypes = val
    },
    UPDATE_BUSINESS_CATEGORIES(state, val) {
      state.businessCategories = val
    },
    UPDATE_SELECTED_SERVICE(state, val) {
      state.selectedService = val
    },
    UPDATE_SELECTED_SERVICE_2(state, val) {
      state.selectedService2 = val
    },
    UPDATE_CLOUDREP_WORK_TYPE(state, val) {
      state.cloudrepWorkTypes = val
    },
    UPDATE_PRE_REGISTRATION(state, val) {
      state.preRegistration = val
    },
  },
  actions: {
    getDropdownList(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`fetch-business-scale-type`)
          .then((response) => {
            const {
              data: {
                data: { dropdowns },
              },
            } = response;
            // this.businessType = dropdowns;

            ctx.commit('UPDATE_BUSINESS_TYPES', dropdowns)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    getDropdownListByCloudrepWork(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`fetch-cloud-rep-work-type`)
          .then((response) => {
            const {
              data: {
                data: { dropdowns },
              },
            } = response;
            // this.businessType = dropdowns;

            ctx.commit('UPDATE_CLOUDREP_WORK_TYPE', dropdowns)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    getBusinessCategoryList(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-categories`)
          .then((response) => {
            // console.log('business category ------------------------')
            // console.log(response)
            // return false
            const {
              data: {
                data: { bussines_categories },
              },
            } = response;
            // console.log(bussines_categories)

            ctx.commit('UPDATE_BUSINESS_CATEGORIES', bussines_categories)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    getSelectedRecords(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-selected-record`)
          .then((response) => {
            const {
              data: {
                data
              },
            } = response;
            if(data){
              if(data.preRegistration) {
                ctx.commit('UPDATE_PRE_REGISTRATION', data.preRegistration)
              }
              if(data.dropdown){
                ctx.commit('UPDATE_SELECTED_SERVICE', data.dropdown.uuid)
              }
              if(data.dropdown2){
                ctx.commit('UPDATE_SELECTED_SERVICE_2', data.dropdown2.uuid)
              }
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    get2fa(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-2fa-pre-reg`)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    verify2fa(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('verify-2fa-pre-reg', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeStepOne(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('store-preg-step-one', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeStepTwo(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('store-preg-step-two', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeStepThree(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('store-preg-step-three', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeStepFour(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('store-preg-step-four', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeStepSix(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('store-preg-step-six', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeStepEight(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('store-preg-step-eight', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeStepNine(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post('store-preg-step-nine', params)
          .then((response) => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },

}
