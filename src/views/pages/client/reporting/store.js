import axios from "@axios";
import { toastAlert } from "@core/mixins/ui/toast.js";
let startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

let endofDay = new Date();
endofDay.setDate(startOfDay.getDate());
endofDay.setHours(23, 59, 59, 999);

export default {
  namespaced: true,
  state: {
    timeline: [],
    users:[],
    timeLineFilter:{
      timeLineFilterUuid:'',
      timeLineFilterTimeZone:'',
      timeLineFilterDateRange:{ startDate: startOfDay, endDate: endofDay },
      customFilters:[],
    },
    performanceSummary:[],
    callCountOfCountries: [],
    campaignReportingRecord:[],
    summaryData:[],
  },
  getters: {
    getTimeLine: (state) => {
      return state.timeline;
    },
    getPerformanceSummary: (state) => {
      return state.performanceSummary;
    },
    getCampaignReportingRecord: (state) => {
    return  state.campaignReportingRecord;
    },
    getUsers: (state) => {
      return  state.users;
    },
    getSummaryData: (state) => {
      return  state.summaryData;
    },
  },
  mutations: {
    UPDATE_TIMELINE(state, val) {
      state.timeline = val;
    },
    UPDATE_USERS(state, val) {
      state.users = val;
    },
    UPDATE_PERFORMANCE_SUMMARY(state,val){
    state.performanceSummary=val;
    },
    UPDATE_CALL_COUNT_OF_COUNTRIES(state, val) {
      state.callCountOfCountries = val;
    },
    UPDATE_TIMELINE_FILTER_UUID(state,val){
      state.timeLineFilter.timeLineFilterUuid=val.uuid;
      state.timeLineFilter.timeLineFilterTimeZone=val.timeZone;
      state.timeLineFilter.timeLineFilterDateRange=val.dateRange;
    },
    UPDATE_TIMELINE_FILTER(state,val){
      state.timeLineFilter.timeLineFilterUuid=val.uuid;
      state.timeLineFilter.timeLineFilterTimeZone=val.timeZone;
      state.timeLineFilter.timeLineFilterDateRange=val.dateRange;
      state.timeLineFilter.customFilters=val.customFilters;
    },
    UPDATE_TIMELINE_CUSTOM_FILTER(state,val){
      state.timeLineFilter.customFilters=val;
    },
    UPDATE_CAMPAIGN_USERS(state,val){
     state.campaignReportingRecord=val;
    },
    UPDATE_SUMMARY_DATA(state,val){
      state.summaryData = val;
    }
  },
  actions: {
    getReportingChartHistory(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get(`/get-timeline`, { params })
          .then((response) => {
            const {
              data: {
                data: { timeLine },
              },
            } = response;
            ctx.commit("UPDATE_TIMELINE", timeLine);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    deleteFilterReport(ctx, params) {
      return new Promise((resolve, reject) => {
       toastAlert.methods.showLoader();
        axios
          .delete(`delete-filter-report?uuid=${params.uuid}`)
          .then((response) => {
            resolve(response);

          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    storeCampaigFilterReport(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/store-campaign-filter-report`, params)
          .then((response) => {
            const {
              data: {
                data: { campaign },
              },
            } = response;

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    updateCampaigFilterReport(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(`/update-campaign-filter-report`, params)
          .then((response) => {
            const {
              data: {
                data: { CampaignReporting },
              },
            } = response;

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getTimeLineSummaryRecord(ctx, queryParams) {
      return new Promise((resolve, reject) => {

        axios
          .get(`/get-timeline-summary`, { params: queryParams })
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      });
    },
    getPerformanceChartHistory(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get(`/get-performance-summary`, { params })
          .then((response) => {
            const {
              data: {
                data: { performanceSummary },
              },
            } = response;
            ctx.commit("UPDATE_PERFORMANCE_SUMMARY", performanceSummary);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    getCampaignReporting(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get(`/get-campaign-reporting`, { params: queryParams })
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getPerformanceReport(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        //toastAlert.methods.showLoader();
        axios
          .get(`/get-performance-report`, { params: queryParams })
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
         //   toastAlert.methods.hideLoader();
          });
      });
    },

    getAllUsers(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-users`)
          .then((response) =>{
             const{
              data:{
                data:{users},
              },
             }=response;
             ctx.commit('UPDATE_USERS',users.data);
            resolve(response);
          })

          .catch((error) => reject(error))
          .finally(() => {
          });
      });
    },

    getCampaignUsers(ctx,params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-campaign-users`,{params})
          .then((response) =>{
             const{
              data:{
                data:{users},
              },
             }=response;

             ctx.commit('UPDATE_CAMPAIGN_USERS',users);
            resolve(response);
          })

          .catch((error) => reject(error))
          .finally(() => {
          });
      });
    },


    getTopPerformers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-top-performers`, { params: queryParams })
          .then((response) => resolve(response))
          .catch((error) => reject(error))
          .finally(() => {
          });
      });
    },
    getCallCountOfCountries(ctx, params) {
      return new Promise((resolve, reject) => {
        // toastAlert.methods.showLoader();
        axios
          .get(`/get-call-count-of-coutries`, { params })
          .then((response) => {
            const {
              data: {
                data: { map },
              },
            } = response;
            console.log(typeof map);
            ctx.commit("UPDATE_CALL_COUNT_OF_COUNTRIES", map);
            resolve(response);
          })
          .catch((error) => reject(error));
        // .finally(() => {
        //   toastAlert.methods.hideLoader();
        // });
      });
    },
  },
};
