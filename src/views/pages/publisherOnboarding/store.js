import axios from "@axios";

export default {
  namespaced: true,
  state: {
    payoutTypes: [],
    step: null,
    company_website: null,
    publisher_website: null,
    publisher_interest: null,
  },
  getters: {},
  mutations: {
    UPDATE_STEP(state, val) {
      state.step = val;
    },
    UPDATE_COMPANY_WEBSITE(state, val) {
      state.company_website = val;
    },
    UPDATE_PUBLISHER_WEBSITE(state, val) {
      state.publisher_website = val;
    },
    UPDATE_PUBLISHER_INTEREST(state, val) {
      state.publisher_interest = val;
    },
  },
  actions: {
    myPublisherProfileItem(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/my-publisher-profile-items`)
          .then((response) => {
            const {
              data: {
                data: { publisher_profile_item },
              },
            } = response;

            if (publisher_profile_item) {
              ctx.commit("UPDATE_STEP", publisher_profile_item.step);
              ctx.commit(
                "UPDATE_COMPANY_WEBSITE",
                publisher_profile_item.company_website
              );
            }
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
