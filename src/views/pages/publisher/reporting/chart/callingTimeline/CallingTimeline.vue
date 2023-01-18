<template>
  <b-row>
    <b-col cols="12">
      <b-card no-body>
        <!--  <b-card-header>

          <b-button
            id="costomize-pop"
            variant="primary"
            class="float-right"
            >Search</b-button
          >
          <CustomizePopup />



          <div class="d-flex align-items-center">
            <flat-pickr
              v-model="rangePicker"
              :config="{ mode: 'range' }"
              class="form-control flat-picker bg-transparent border-0 shadow-none"
              placeholder="YYYY-MM-DD"
              @on-change="getTimeChartHistory"
            />
          </div>
        </b-card-header> -->
        <b-card-body>
          <vue-apex-charts
            ref="bar"
            type="bar"
            height="400"
            :options="apexChatData.chartOptions"
            :series="chartSeries.series"
          />
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  BCardSubTitle,
  BButton,
} from "bootstrap-vue";

//import CustomizePopup from "./components/CustomizePopup.vue";
import VueApexCharts from "vue-apexcharts";
import flatPickr from "vue-flatpickr-component";
import { apexChatData, chartSeries } from "../data/apexChartData";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BCardSubTitle,
    VueApexCharts,
    flatPickr,
    //CustomizePopup,
    BButton,
  },
  data() {
    return {
      apexChatData,
      rangePicker: ["2022-12-01", "2022-12-03"],
      chartSeries,
    };
  },
  computed: {
    getReportHistory() {
      return this.$store.getters["managePublisherReporting/getTimeLine"];
    },
  },
  methods: {
    /*   getTimeChartHistory() {
      const filterState =
        this.$store.state.managePublisherReporting.timeLineFilter;
      this.$store.dispatch(
        "managePublisherReporting/getReportingChartHistory",
        {
          type: "range",
          value: this.rangePicker,
          user_uuid: filterState.timeLineFilterUuid,
          time_zone: filterState.timeLineFilterTimeZone,
          dateRange: filterState.timeLineFilterDateRange,
          customFilters: filterState.customFilters,
        }
      );
    }, */
    getTodayTimeline() {
      const filterState =
        this.$store.state.managePublisherReporting.timeLineFilter;
      this.$store.dispatch(
        "managePublisherReporting/getReportingChartHistory",
        {
          type: "range",
          value: filterState.timeLineFilterDateRange,
          user_uuid: filterState.timeLineFilterUuid,
          time_zone: filterState.timeLineFilterTimeZone,
          customFilters: filterState.customFilters,
        }
      );
    },
  },
  watch: {
    "$store.state.managePublisherReporting.timeLineFilter": {
      handler() {
        this.getTodayTimeline();
      },
      deep: true,
    },
    getReportHistory(timeLine, oldValue) {
      if (timeLine) {
        let calls = [];
        let date = [];
        timeLine.forEach((element, index) => {
          calls[index] = element.count;
          date[index] = element.Date;
        });

        this.chartSeries.series[0].data = calls;
        this.apexChatData.chartOptions.xaxis.categories = date;
        this.$refs.bar.updateOptions(
          this.apexChatData.chartOptions,
          false,
          true
        );
        this.$refs.bar.updateSeries(this.chartSeries.series, true);
      }
    },
  },
  created() {
    this.getTodayTimeline();
  },
};
</script>
