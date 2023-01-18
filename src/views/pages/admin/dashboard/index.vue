<template>
  <section id="dashboard-ecommerce">
    <b-row>
      <b-col md="8">
        <p class="user-message">
          Hi {{ user.first_name }} {{ user.last_name }},
        </p>
        <h1>Welcome to Cloud Rep!</h1>
      </b-col>

      <!-- search-bar -->
    </b-row>
    <div class="dashboard_filters">
      <b-row class="mt-3">
        <b-col md="3">
          <div class="input-gradient">
            <v-select
              v-model="user_uuid"
              placeholder="Select User"
              label="name"
              :options="getUsers"
              :reduce="(list) => list.uuid"
            />
          </div>
        </b-col>
        <b-col md="3">
          <div class="input-gradient">
            <v-select
              v-model="campaign_uuid"
              placeholder="Select Campaign"
              label="name"
              :options="filterRecord.campaigns"
              :reduce="(list) => list.uuid"
            />
          </div>
        </b-col>

        <b-col md="4">
          <date-range-picker
            ref="picker"
            v-model="dateRange"
            opens="left"
          />
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
      <b-col xl="2">
        <payout
          :data="dashboardData.statisticsProfit"
          ref="payoutParentChartRef"
        />
      </b-col>
      <b-col xl="2">
        <profit
          :data="dashboardData.statisticsProfit"
          ref="profitParentChartRef"
        />
      </b-col>
      <b-col xl="2">
        <revenue
          :data="dashboardData.statisticsProfit"
          ref="revenueParentChartRef"
        />
      </b-col>

      <b-col
        xl="6"
        md="6"
      >
        <calls :data="dashboardData.callsItems" />
      </b-col>

      <b-col
        xl="6"
        md="6"
      >
        <goal-overview
          :data="dashboardData.goalOverview"
          chart-id="chartId"
        />
      </b-col>
    </b-row>
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
  BSpinner,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { getUserData } from "@/auth/utils";
import DateRangePicker from "vue2-daterange-picker";
import { dashboardData } from "./components/data/dashboardData";
import Welcome from "./components/Welcome.vue";
import Calls from "./components/Calls.vue";
import Revenue from "./components/Revenue.vue";
import Profit from "./components/Profit.vue";
import Payout from "./components/Payout.vue";
import GoalOverview from "./components/GoalOverview.vue";
import storeModule from "./storeModule";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: {
    BRow,
    BCol,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    Welcome,
    Calls,
    Revenue,
    Profit,
    Payout,
    GoalOverview,
    vSelect,
    DateRangePicker,
    BSpinner,
  },
  data() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endofDay = new Date();
    endofDay.setDate(startOfDay.getDate());
    endofDay.setHours(23, 59, 59, 999);
    return {
      dateRange: { startDate: startOfDay, endDate: endofDay },
      user: {},
      dashboardData,
      user_uuid: "",
      campaign_uuid: "",
      isFilterDisable: 0,
    };
  },
  computed: {
    getUsers() {
      return this.$store.getters["adminDashboard/getUsers"];
    },
    filterRecord() {
      return this.$store.getters["adminDashboard/getDashboardFilterRecord"];
    },
  },
  created() {
    const APP_STORE_MODULE_NAME = "adminDashboard";

    // // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, storeModule);
    }
    this.user = getUserData();
    this.dashboardData.congratulations.name = this.user.name;

    this.$store.dispatch("adminDashboard/getAllUsers");
    this.$store.dispatch("adminDashboard/getDashboardFilterRecord", {
      page: "1",
    });
    this.getStats();
  },
  destroyed() {
    // UnRegister on leave
    const APP_STORE_MODULE_NAME = "adminDashboard";
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
  methods: {
    getStats() {
      this.isFilterDisable = 1;
      this.$store
        .dispatch("adminDashboard/getUserDashboardRecord", {
          user_uuid: this.user_uuid,
          campaign_uuid: this.campaign_uuid,
          dateRange: this.dateRange,
        })
        .then((data) => {
          const {
            total_converted,
            total_leads,
            total_payout,
            total_expenditure,
            total_profit,
            total_duplicate,
            total_completed,
            total_incomming,
            total_goal,
            payout_trend,
            profit_trend,
            revenue_trend,
          } = this.$store.getters["adminDashboard/getStatistics"];
          this.isFilterDisable = 0;
          this.dashboardData.callsItems[0].title = total_leads;
          this.dashboardData.callsItems[1].title = total_converted;
          this.dashboardData.callsItems[2].title = total_duplicate;
          this.dashboardData.callsItems[3].title = total_completed;
          this.dashboardData.callsItems[4].title = total_incomming;
          this.dashboardData.statisticsProfit.revenue[0].title = total_payout;
          this.dashboardData.statisticsProfit.revenue[1].title = total_profit;
          this.dashboardData.statisticsProfit.revenue[2].title =
            total_expenditure;
          this.dashboardData.goalOverview.series = [total_goal];
          this.dashboardData.goalOverview.completed = total_completed;
          this.dashboardData.goalOverview.inProgress = total_incomming;

          const payoutTrend = payout_trend.map((item) =>
            item != null ? item : 0
          );

          const profitTrend = profit_trend.map((item) =>
            item != null ? item : 0
          );

          const RevenueTrend = revenue_trend.map((item) =>
            item != null ? item : 0
          );

          this.dashboardData.statisticsProfit.payoutSeries[0].data =
            payoutTrend;

          this.$refs.payoutParentChartRef.$refs.payoutChildChartRef.updateSeries(
            this.dashboardData.statisticsProfit.payoutSeries,
            true
          );

          this.dashboardData.statisticsProfit.profitSeries[0].data =
            profitTrend;

          this.$refs.profitParentChartRef.$refs.profitChildChartRef.updateSeries(
            this.dashboardData.statisticsProfit.profitSeries,
            true
          );

          this.dashboardData.statisticsProfit.revenueSeries[0].data =
            RevenueTrend;

          this.$refs.revenueParentChartRef.$refs.revenueChildChartRef.updateSeries(
            this.dashboardData.statisticsProfit.revenueSeries,
            true
          );
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>
