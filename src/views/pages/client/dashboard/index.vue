<template>
  <section id="dashboard-ecommerce">
    <b-row>
      <b-col md="8">
        <p class="user-message">
          Hi {{ user.first_name }} {{ user.last_name }},
        </p>
        <h1>Welcome to Cloud Rep!</h1>
      </b-col>
    </b-row>
    <div class="dashboard_filters">
      <b-row class="mt-3">
        <b-col md="3">
          <div class="input-gradient">
            <v-select
              placeholder="Select Campaign"
              label="name"
              :options="filterRecord.campaigns"
              :reduce="(list) => list.uuid"
              v-model="campaign_uuid"
            ></v-select>
          </div>
        </b-col>

        <b-col md="4">
          <date-range-picker
            ref="picker"
            opens="left"
            v-model="dateRange"
          >
          </date-range-picker>
        </b-col>
        <b-col md="2">
          <b-button
            v-if="isFilterDisable"
            variant="primary"
            disabled
            class="mr-1"
          >
            <b-spinner small />
            Uploading...
          </b-button>

          <b-button
            v-else
            size="lg"
            class="float-right w-100 h-100"
            variant="primary"
            @click="getStats"
            >Filter</b-button
          >
        </b-col>
      </b-row>
    </div>
    <b-row class="match-height mt-3">
      <b-col
        xl="4"
        md="6"
      >
        <welcome :data="dashboardData.congratulations" />
      </b-col>
      <b-col
        xl="8"
        md="6"
      >
        <statistics :data="dashboardData.statisticsItems" />
      </b-col>
    </b-row>
    <b-row class="match-height mt-3">
      <b-col
        xl="4"
        md="6"
      >
        <goal-overview :data="dashboardData.goalOverview" />
      </b-col>
    </b-row>
    <!-- <b-row class="match-height">
      <b-col lg="4">
        <b-row class="match-height">
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-order-chart :data="data.statisticsOrder" />
          </b-col>

          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-profit-chart :data="data.statisticsProfit" />
          </b-col>
          <b-col
            lg="12"
            md="6"
          >
            <ecommerce-earnings-chart :data="data.earningsChart" />
          </b-col>
        </b-row>
      </b-col>

      <b-col lg="8">
        <ecommerce-revenue-report :data="data.revenue" />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="8">
        <ecommerce-company-table :table-data="data.companyTable" />
      </b-col>

      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-meetup :data="data.meetup" />
      </b-col>

      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-browser-states />
      </b-col>

      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-goal-overview :data="data.goalOverview" />
      </b-col>

      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-transactions :data="data.transactionData" />
      </b-col>
    </b-row> -->
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
} from "bootstrap-vue";

import { getUserData } from "@/auth/utils";
import { dashboardData } from "./components/data/dashboardData";
import Welcome from "./components/Welcome.vue";
import Statistics from "./components/Statistics.vue";
import GoalOverview from "./components/GoalOverview.vue";
/* import EcommerceRevenueReport from "./EcommerceRevenueReport.vue";
import EcommerceOrderChart from "./EcommerceOrderChart.vue";
import EcommerceProfitChart from "./EcommerceProfitChart.vue";
import EcommerceEarningsChart from "./EcommerceEarningsChart.vue";
import EcommerceCompanyTable from "./EcommerceCompanyTable.vue";
import EcommerceMeetup from "./EcommerceMeetup.vue";
import EcommerceBrowserStates from "./EcommerceBrowserStates.vue";
import EcommerceTransactions from "./EcommerceTransactions.vue"; */
import storeModule from "./storeModule";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import { BSpinner } from "bootstrap-vue";
import vSelect from "vue-select";

export default {
  components: {
    BRow,
    BCol,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    Welcome,
    Statistics,
    GoalOverview,
    /*   EcommerceRevenueReport,
    EcommerceOrderChart,
    EcommerceProfitChart,
    EcommerceEarningsChart,
    EcommerceCompanyTable,
    EcommerceMeetup,
    EcommerceBrowserStates,
    EcommerceTransactions, */
    BButton,
    vSelect,
    DateRangePicker,
    BSpinner,
  },
  data() {
    let startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let endofDay = new Date();
    endofDay.setDate(startOfDay.getDate());
    endofDay.setHours(23, 59, 59, 999);
    return {
      dateRange: { startDate: startOfDay, endDate: endofDay },
      user: {},
      dashboardData: dashboardData,
      user_uuid: "",
      campaign_uuid: "",
      isFilterDisable: 0,
    };
  },
  computed: {
    filterRecord() {
      return this.$store.getters["clientDashboard/getDashboardFilterRecord"];
    },
  },
  methods: {
    getStats() {
      this.isFilterDisable = 1;

      this.$store
        .dispatch("clientDashboard/getUserDashboardRecord", {
          user_uuid: this.user_uuid,
          campaign_uuid: this.campaign_uuid,
          dateRange: this.dateRange,
        })
        .then((data) => {
          const {
            total_converted,
            total_leads,
            total_expenditure,
            total_completed,
            total_goal,
            total_incomming,
          } = this.$store.getters["clientDashboard/getStatistics"];
          this.isFilterDisable = 0;
          this.dashboardData.statisticsItems[0]["title"] = total_completed;
          this.dashboardData.statisticsItems[1]["title"] = total_converted;
          this.dashboardData.statisticsItems[2]["title"] = total_leads;
          this.dashboardData.statisticsItems[3]["title"] = total_expenditure;
          this.dashboardData.statisticsItems[4]["title"] = total_incomming;

          this.dashboardData.goalOverview.series = [total_goal];
          this.dashboardData.goalOverview.completed = total_completed;
        });
    },
  },
  created() {
    const APP_STORE_MODULE_NAME = "clientDashboard";

    // // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, storeModule);
    }
    this.user = getUserData();
    this.dashboardData.congratulations.name = this.user.name;
    this.$store.dispatch("clientDashboard/getDashboardFilterRecord", {
      page: "1",
    });
    this.getStats();
  },
  destroyed() {
    // UnRegister on leave
    const APP_STORE_MODULE_NAME = "clientDashboard";
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>
