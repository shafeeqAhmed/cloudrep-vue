import axios from "@axios";

export default {
  namespaced: true,
  state: {
    countries: [],
  },
  getters: {
    countries: (state) => {
      return state.countries;
    },
  },
  mutations: {
    UPDATE_COUNTRIES(state, val) {
      state.countries = val;
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
            const {
              data: { countries },
            } = response;
            ctx.commit("UPDATE_COUNTRIES", countries);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
