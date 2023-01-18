import { $themeBreakpoints } from "@themeConfig";
import axios from "@axios";

export default {
  namespaced: true,
  state: {
    loader: false,
    incomingCall: false,
    pNo: "",
    windowWidth: 0,
    shallShowOverlay: false,
    user: {},
    workerActivity: "",
    selectedWorkerActivity: "available",
    incomingCallNumber: "",
    callStatus: "closed",
    isMuted: false,
    callDirection: "",
    workerCapabilityToken: "",
    rejectTask: false,
    isLogoutOn401: "",
    btnOne: false,
    btnTwo: false,
    btnThree: false,
    btnFour: false,
    ivrNode: {},
    utcList: [],
    campaignClients: {},
    campaignFilterReports:[],
    isToastActive:1,
    isCustomToastActive:1,
    isErrorToastActive:1,
    isSuccessToastActive:1,
  },
  getters: {
    getCampaignFilterReports: (state) => {
      return state.campaignFilterReports;
    },
    getActiveToast: (state) => {
      return state.isToastActive;
    },
    currentBreakPoint: (state) => {
      const { windowWidth } = state;
      if (windowWidth >= $themeBreakpoints.xl) return "xl";
      if (windowWidth >= $themeBreakpoints.lg) return "lg";
      if (windowWidth >= $themeBreakpoints.md) return "md";
      if (windowWidth >= $themeBreakpoints.sm) return "sm";
      return "xs";
    },
    incomingCall: (state) => {
      return state.incomingCall;
    },
    utcList: (state) => {
      const list = state.utcList.map((time) => {
        return {
          label: `(UTC ${time.dst_offset}) ${time.timezone}`,
          value: time.timezone,
        };
      });

      return list;
    },
    phoneNumber: (state) => {
      return state.pNo;
    },
    isLogin: (state) => {
      if (state.user) {
        return state.user.accessToken === null ||
          state.user.accessToken.trim() === ""
          ? false
          : true;
      }
      return false;
    },
    role: (state) => {
      if (state.user) {
        return state.user.role;
      }
      return "";
    },
    getCampaignClients: (state) => {
      const list = state.campaignClients.map((user) => {
        return {
          title: `${user.name} - ${user.user_uuid.split("-", 1)}`,
          icon: "UserIcon",
          value: user.user_uuid,
        };
      });
      return list;
    },
  },
  mutations: {
    UPDATE_LOADER(state, val) {
      state.loader = val;
    },
    UPDATE_TOASTER(state, val) {
      state.isToastActive = val;
    },
    UPDATE_TOASTR(state, val) {

      if(val.type==='custom'){
        state.isCustomToastActive = val.value;
      }else if(val.type==='error'){
        state.isErrorToastActive =  val.value;
      }else if(val.type==='success'){
        state.isSuccessToastActive =  val.value;
      }

    },
    UPDATE_UTC_LIST(state, val) {
      state.utcList = val;
    },
    UPDATE_CAMPAIGN_FILTER_REPORTS(state, val) {
      state.campaignFilterReports = val;
    },
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val;
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay =
        val !== undefined ? val : !state.shallShowOverlay;
    },
    UPDATE_USER(state, val) {
      state.user = val;
    },
    UPDATE_INCOMING_CALL(state, val) {
      state.incomingCall = val;
    },
    UPDATE_PHONE_NUMBER(state, val) {
      state.pNo = val;
    },
    UPDATE_WORKER_ACTIVITY(state, val) {
      state.workerActivity = val;
    },
    UPDATE_SELECTED_WORKER_ACTIVITY(state, val) {
      state.selectedWorkerActivity = val;
    },
    UPDATE_INCOMING_CALL_NUMBER(state, val) {
      state.incomingCallNumber = val;
    },
    UPDATE_IS_LOGOUT_ON_401(state, val) {
      state.isLogoutOn401 = val;
    },
    UPDATE_BTN_ONE(state, val) {
      state.btnOne = val;
    },
    UPDATE_BTN_TWO(state, val) {
      state.btnTwo = val;
    },
    UPDATE_BTN_THREE(state, val) {
      state.btnThree = val;
    },
    UPDATE_BTN_FOURE(state, val) {
      state.btnFour = val;
    },
    UPDATE_IVR_NODE(state, val) {
      state.ivrNode = {};
      state.ivrNode = val;
    },
    UPDATE_CAMPAIGN_CLIENTS(state, val) {
      state.campaignClients = val;
    },
    UPDATE_CALL_STATUS(state, val) {
      state.callStatus = val;
    },
    UPDATE_CALL_DIRECTION(state, val) {
      state.callDirection = val;
    },
    UPDATE_IS_MUTED(state, val) {
      state.isMuted = val;
    },
    UPDATE_WORKER_CAPABILITY_TOKEN(state, val) {
      state.workerCapabilityToken = val;
    },
    UPDATE_REJECT_TASK(state, val) {
      state.rejectTask = val;
    },
  },
  actions: {

    getCallAccessToken(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-call-access-token`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    getUtcList(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-utc-list`)
          .then((response) => {
            const {
              data: {
                data: { utcList },
              },
            } = response;

            ctx.commit("UPDATE_UTC_LIST", utcList);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    getWorkerCapabilityToken(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-worker-capability-token`)
          .then((response) => {
            const {
              data: {
                data: { workerCapability },
              },
            } = response;
            ctx.commit("UPDATE_WORKER_CAPABILITY_TOKEN", workerCapability);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },

    updateCampaignFilterReportMenu(ctx,params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-campaign-filter_reports`)
          .then((response) => {
            const {
              data: {
                data: { campaignFilterReports },
              },
            } = response;
          ctx.commit("UPDATE_CAMPAIGN_FILTER_REPORTS", campaignFilterReports);

            const reportingIndex=params.menu.findIndex(data=>data.title==='Reporting');

             if(params.role=='admin'){

              params.menu[reportingIndex].children[2].children = [];
              campaignFilterReports.forEach((report) => {
                params.menu[reportingIndex].children[2].children.push({
                  title: report.filter_report_name,
                  route: { path: `/reporting-filter-report?report=${report.uuid}` },
                  delete_route: {
                    path: `/trash-filter-report?report_delete=${report.uuid}`,
                  },
                });
              });

             }else{

              params.menu[reportingIndex].children[2].children = [];
              campaignFilterReports.forEach((report) => {
                params.menu[reportingIndex].children[2].children.push({
                  title: report.filter_report_name,

                  route: {
                    path: `/${params.role}/reporting-filter-report?report=${report.uuid}`,
                  },

                  delete_route: {
                    path: `/${params.role}/trash-filter-report?report_delete=${report.uuid}`,
                  },

                  action: "all",
                  resource: params.role,
                });
              });


             }
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    deleteTask(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/delete-task?sid=${params.sid}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    updateUserApplication(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/update-user-appilcation-setting`, params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
};
