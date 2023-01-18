import axios from "@axios";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchRecords(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`ivrs`, { params: queryParams })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    duplicateIvr(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`duplicate-ivr?uuid=${queryParams.uuid}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
};
