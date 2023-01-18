import axios from "@axios";
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  namespaced: true,
  state: {
    countries: [],
    publishers: [],
  },
  getters: {
    countries: (state) => {
      return state.countries;
    },
    publishers: (state) => {
      return state.publishers;
    },
  },
  mutations: {
    UPDATE_COUNTRIES(state, val) {
      state.countries = val;
    },
    UPDATE_PUBLISHERS(state, val) {
      state.publishers = val;
    },
  },
  actions: {
    getNumbers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-twilio-number`, { params: queryParams })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    getCountries(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/country-list`)
          .then((response) => {
            console.log("countries", response);
            const {
              data: { countries },
            } = response;
            ctx.commit("UPDATE_COUNTRIES", countries);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    getPublishers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/users/${queryParams.type}`)
          .then((response) => {
            console.log("publisher-response", response);
            const {
              data: {
                data: { data },
              },
            } = response;
            ctx.commit("UPDATE_PUBLISHERS", data);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    buyTwilioNumber(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("/buy-twilio-number", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    assignPublisherToNumber(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("assigned-publisher-to-number", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    storeTwilioNumberTag(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("/store-twilio-number-tag", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
  },
};
