import axios from "@axios";
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  namespaced: true,
  state: {
    step: 1,
    userUuid: "",
    userDetail: {},
    campaignUuid: "",
    services: [],
    selectedServices: [],
    btnOneIsDisabled: false,
    userList: [],
    campaign: [],
    countries: [],
    categories: [],
    selectedCategoryUuid: "",
    verticals: [],
    selectedVerticalUuid: "",
    imageTypeForRemove: "",
    imageFileValidate: false,
    publishersForAssignToCampaign: [],
    target: [],
    routingPlan: [],
    assignedPublisherNumbers: [],
    isTargetsChanged: false,
    isRoutingChanged: false,
    currencies: [],
    tags: [],
    tagsFilters: [],
    states: [],
    filterRecord: [],
  },
  getters: {
    btn1: (state) => {
      return state.btnOneIsDisabled;
    },
    services: (state) => {
      if (state.campaign) {
        state.services.forEach((item) => {
          if (item.uuid == state.campaign.service_uuid) {
            item.is_selected = true;
          }
        });
      }

      return state.services;
    },
    userList: (state) => {
      const list = state.userList.map((user) => {
        return {
          title: `${user.name} - ${user.user_uuid.split("-", 1)}`,
          icon: "UserIcon",
          value: user.user_uuid,
        };
      });
      return list;
    },
    countries: (state) => {
      return state.countries;
    },

    campaign: (state) => {
      return state.campaign;
    },
    getTarget: (state) => {
      return state.target;
    },
    getRoutingPlan: (state) => {
      return state.routingPlan;
    },
  },
  mutations: {
    UPDATE_ASSIGNED_PUBLISHER_NUMBERS(state, val) {
      state.assignedPublisherNumbers = val;
    },

    UPDATE_TARGET_CHANGED(state, val) {
      state.isTargetsChanged = val;
    },
    UPDATE_CURRENCIES(state, val) {
      state.currencies = val;
    },
    UPDATE_ROUTING_CHANGED(state, val) {
      state.isRoutingChanged = val;
    },
    UPDATE_STEP(state, val) {
      state.step = val;
    },
    UPDATE_USER_UUID(state, val) {
      state.userUuid = val;
    },
    UPDATE_USER_DETAIL(state, val) {
      state.userDetail = val;
    },
    UPDATE_CAMPAIGN_UUID(state, val) {
      state.campaignUuid = val;
    },
    UPDATE_SERVICES(state, val) {
      state.services = val;
    },
    UPDATE_SELECTED_SERVICES(state, val) {
      state.selectedServices = val;
    },
    UPDATE_BTN_ONE(state, val) {
      state.btnOneIsDisabled = val;
    },
    UPDATE_USER_LIST(state, val) {
      state.userList = val;
    },
    UPDATE_CAMPAIGN(state, val) {
      state.campaign = val;
    },
    UPDATE_COUNTRIES(state, val) {
      state.countries = val;
    },
    UPDATE_CATEGORIES(state, val) {
      state.categories = val;
    },
    UPDATE_SELECTED_CATEGORY_UUID(state, val) {
      state.selectedCategoryUuid = val;
    },
    UPDATE_VERTICALS(state, val) {
      state.verticals = val;
    },
    UPDATE_SELECTED_VERTICAL_UUID(state, val) {
      state.selectedVerticalUuid = val;
    },
    RESET_STATE(state) {
      state.step = 1;
      state.userUuid = "";
      state.userDetail = {};
      state.campaignUuid = "";
      state.services = [];
      state.campaign = {};
      state.selectedCategoryUuid = "";
      state.selectedVerticalUuid = "";
    },

    IMAGE_TYPE_FOR_REMOVE(state, val) {
      state.imageTypeForRemove = val;
    },
    UPDATE_IMAGE_FILE_VALIDATE(state, val) {
      state.imageFileValidate = val;
    },

    UPDATE_PUBLISHER_FOR_ASSIGN_TO_CAMPAIGN(state, val) {
      state.publishersForAssignToCampaign = val;
    },
    UPDATE_TARGET(state, val) {
      state.target = val;
    },
    UPDATE_ROUTING_PLAN(state, val) {
      state.routingPlan = val;
    },
    UPDATE_CAMPAIGN_RATE(state, val) {
      state.campaign.campaign_rate = val;
    },
    UPDATE_TAGS(state, val) {
      state.tags = val;
    },
    UPDATE_TAG_FILTERS(state, val) {
      state.tagsFilters = val;
    },
    UPDATE_STATES(state, val) {
      state.states = val;
    },
    UPDATE_FILTER_RECORD(state, val) {
      state.filterRecord = val;
    },
  },
  actions: {
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

    getcurrencies(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-currencies`)
          .then((response) => {
            const {
              data: {
                data: { currencies },
              },
            } = response;

            ctx.commit("UPDATE_CURRENCIES", currencies);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },

    getServices(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.state.services.length == 0) {
          toastAlert.methods.showLoader();
        }
        axios
          .get(`/services?type=client`)
          .then((response) => {
            const {
              data: {
                data: { services },
              },
            } = response;

            ctx.commit("UPDATE_SERVICES", services);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getUserCampaignServices(ctx) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get(`/get-campaign-services?user_uuid=${ctx.state.userUuid}`)
          .then((response) => {
            const {
              data: {
                data: { services },
              },
            } = response;

            ctx.commit("UPDATE_SELECTED_SERVICES", services);

            ctx.state.services.forEach((item) => {
              if (item.uuid.includes(ctx.state.selectedServices)) {
                item.is_selected = true;
              }
            });

            ctx.commit("UPDATE_SERVICES", ctx.state.services);

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
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
    getCampaign(ctx) {
      if (ctx.state.campaignUuid) {
        return new Promise((resolve, reject) => {
          toastAlert.methods.showLoader();
          axios
            .get(`get-campaign/${ctx.state.campaignUuid}`)
            .then((response) => {
              const {
                data: {
                  data: { campaign },
                },
              } = response;
              if (campaign) {
                ctx.commit("UPDATE_USER_UUID", campaign.user_uuid);
              }
              ctx.commit("UPDATE_CAMPAIGN", campaign);
              resolve(response);
            })
            .catch((error) => reject(error))
            .finally(() => {
              toastAlert.methods.hideLoader();
            });
        });
      }
    },

    getCampaignPublishers(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-campaign-publishers/${ctx.state.campaignUuid}`, { params })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    getPublishersForAssignToCampaign(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-publishers-for-assign-to-campaign`)
          .then((response) => {
            const {
              data: {
                data: { publishers },
              },
            } = response;
            ctx.commit("UPDATE_PUBLISHER_FOR_ASSIGN_TO_CAMPAIGN", publishers);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },

    assignPublisherToCampaign(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post("assigned-publisher-campaign", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    searchUser(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/search-user/client?q=${params.q}`)
          .then((response) => {
            const {
              data: {
                data: { users },
              },
            } = response;

            ctx.commit("UPDATE_USER_LIST", users);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    getClientDetail(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.state.userUuid) {
          toastAlert.methods.showLoader();
          axios
            .get(`/get-client-detail/${ctx.state.userUuid}`)
            .then((response) => {
              const {
                data: {
                  data: { user_detail },
                },
              } = response;

              ctx.commit("UPDATE_USER_DETAIL", user_detail);

              resolve(response);
            })
            .catch((error) => reject(error))
            .finally(() => {
              toastAlert.methods.hideLoader();
            });
        }
      });
    },
    getAssignedPublisherNumbers(ctx, publisher_uuid) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get(`/get-assigned-publisher-numbers/${publisher_uuid}`)
          .then((response) => {
            const {
              data: {
                data: { numbers },
              },
            } = response;
            ctx.commit("UPDATE_ASSIGNED_PUBLISHER_NUMBERS", numbers);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    storeCampaignName(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-name`, params)
          .then((response) => {
            const {
              data: {
                data: { campaign },
              },
            } = response;
            ctx.commit("UPDATE_STEP", 2);
            ctx.commit("UPDATE_CAMPAIGN_UUID", campaign.uuid);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateCampaignName(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/update-campaign-name`, params)
          .then((response) => {
            const {
              data: {
                data: { campaign },
              },
            } = response;
            ctx.commit("UPDATE_STEP", 2);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    storeServiceAgainstCampaign(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post("store-services-against-campaign", params)
          .then((response) => {
            const {
              data: {
                data: { campaign },
              },
            } = response;

            ctx.commit("UPDATE_STEP", 3);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    updateServiceAgainstCampaign(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post("update-services-against-campaign", params)
          .then((response) => {
            ctx.commit("UPDATE_STEP", 3);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //Step Three (Client Information)
    storeCampaignClient(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post(`/store-campaign-client`, params)
          .then((response) => {
            ctx.commit("UPDATE_STEP", 4);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //Step Four (client address)
    storeCampaignClientAddress(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-client-address`, params)
          .then((response) => {
            ctx.commit("UPDATE_STEP", 5);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //Business Category & Verticals
    storeCampaignBusinessCateVertical(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-business-cate-vertical`, params)
          .then((response) => {
            ctx.commit("UPDATE_STEP", 6);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //Campaign Start & End Date/Time
    storeCampaignStartEndDateTime(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-start-end-date-time`, params)
          .then((response) => {
            ctx.commit("UPDATE_STEP", 7);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //Social & Website Links
    storeCampaignSocialWebsiteLinks(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-social-website-links`, params)
          .then((response) => {
            ctx.commit("UPDATE_STEP", 8);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //Campaign Rates
    storeCampaignRates(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-rates`, params)
          .then((response) => {
            ctx.commit("UPDATE_STEP", 9);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //Campaign Images
    storeCampaignImages(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-images`, params)
          .then((response) => {
            ctx.dispatch("getCampaign");
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    removeCampaignImage(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/remove-campaign-image`, params)
          .then((response) => {
            ctx.dispatch("getCampaign");

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    //storeStepOne

    getCategories(ctx, params) {
      return new Promise((resolve, reject) => {
        //toastAlert.methods.showLoader();
        axios
          .get(`/bussines-categories?q=${params.q}`)
          .then((response) => {
            const {
              data: {
                data: { bussines_categories },
              },
            } = response;

            ctx.commit("UPDATE_CATEGORIES", bussines_categories);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            //  toastAlert.methods.hideLoader();
          });
      });
    },
    getVerticals(ctx) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get("/get-all-verticals")
          .then((response) => {
            const {
              data: {
                data: { business_verticals },
              },
            } = response;

            ctx.commit("UPDATE_VERTICALS", business_verticals);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    storeCampaignLocation(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-location`, params)
          .then((response) => {
            ctx.dispatch("getCampaign");

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    deleteCampaignLocation(ctx, uuid) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/delete-campaign-location?uuid=${uuid}&_method=DELETE`)
          .then((response) => {
            ctx.dispatch("getCampaign");
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    storeCampaignPublish(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-publish/${params}`)
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
    updateRoutingPlan(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("update-routing-plan", params)
          .then((response) => {
            resolve(response);
            // ctx.commit(
            //   "UPDATE_TARGET_CHANGED",
            //   Math.floor(Math.random() * 11111)
            // )
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    storeRoutingPlan(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("store-routing-plan", params)
          .then((response) => {
            resolve(response);
            ctx.commit(
              "UPDATE_TARGET_CHANGED",
              Math.floor(Math.random() * 11111)
            );
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
      toastAlert.methods.showLoader();
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-target-detail/${uuid}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
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
      toastAlert.methods.showLoader();
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-routing-plan/detail/${uuid}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    deleteRoutingPlan(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .delete(`delete-routing-plan?uuid=${params.uuid}`)
          .then((response) => {
            resolve(response);
            ctx.commit(
              "UPDATE_ROUTING_CHANGED",
              Math.floor(Math.random() * 11111)
            );
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    deleteTarget(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .delete(`delete-target?uuid=${params.uuid}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    assignIvrCampaign(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("assign-ivr-to-campaign", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateRoutingTypeOfCampaign(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("update-routing-type-of-campaign", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateAddressTypeOfCampaign(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("update-address-type-of-campaign", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateSchedulingTypeOfCampaign(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("update-address-type-of-campaign", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateCampaignSettings(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("update-camapgin-settings", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getTags({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .get("get-tags")
          .then((response) => {
            const {
              data: { tags },
            } = response;
            commit("UPDATE_TAGS", tags);

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {});
      });
    },
    getTagFilters({ commit }, tagId) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get(`get-tag-operators?tag_uuid=${tagId}`)
          .then((response) => {
            const {
              data: { operators },
            } = response;
            commit("UPDATE_TAG_FILTERS", operators);

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getStates(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/state-list`)
          .then((response) => {
            const {
              data: { states },
            } = response;
            ctx.commit("UPDATE_STATES", states);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    storeCampaignFilterRecord(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("store-tag-filter-conditions", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    storeClientRatesAgainstTarget(ctx, params) {
      return new Promise((resolve, reject) => {
        // console.log(params);
        toastAlert.methods.showLoader();
        axios
          .post("store-custom-campaign-target-rates", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getClientRatesAgainstTarget(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get("get-custom-campaign-target-rates", { params })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getFilterRecord({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-campaign-filter-record`, { params })
          .then((response) => {
            const {
              data: {
                data: { filters },
              },
            } = response;

            commit("UPDATE_FILTER_RECORD", filters);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {});
      });
    },
  },
};
