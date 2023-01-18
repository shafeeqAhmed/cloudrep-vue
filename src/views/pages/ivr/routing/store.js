import axios from "@axios";
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  namespaced: true,
  state: {
    clientList: [],
    target: [],
    routingPlan: [],
    fetchRoutingPlan: 0,
    fetchTargets: 0,
  },
  getters: {
    clientList(state) {
      return state.clientList;
    },
    getTarget(state) {
      return state.target;
    },
    getRoutingPlan(state) {
      return state.routingPlan;
    },
  },
  mutations: {
    UPDATE_CLIENT_LIST(state, val) {
      state.clientList = val;
    },
    UPDATE_TARGET(state, val) {
      state.target = val;
    },
    UPDATE_ROUTING_PLAN(state, val) {
      state.routingPlan = val;
    },
    UPDATE_FETCH_ROUTING_PLAN(state, val) {
      state.fetchRoutingPlan = val;
    },
    UPDATE_FETCH_TARGETS(state, val) {
      state.fetchTargets = val;
    },
  },
  actions: {
    routings(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get("routings", { params })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    storeRouting(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("store-routing", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateRouting(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("update-routing", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    deleteRouting(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("delete-routing", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    storeTarget(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("store-target", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateTarget(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("update-target", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getTargets(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-target-listing`, { params })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    getTargetByDetail(ctx, uuid) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-target-detail/${uuid}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    getRoutingPlans(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-routing-plan`, { params })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    getRoutingPlanDetail(ctx, uuid) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-routing-plan/detail/${uuid}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    deleteRoutingPlan(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .delete(`delete-routing-plan?uuid=${params.uuid}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    searchClient(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/search-user/client?q=${params.q}`)
          .then((response) => {
            const {
              data: {
                data: { users },
              },
            } = response;

            ctx.commit("UPDATE_CLIENT_LIST", users);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },

    storeRoutingPlan(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("store-routing-plan", params)
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
