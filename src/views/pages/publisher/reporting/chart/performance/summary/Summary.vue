<template>
  <div>
    <b-row class="mb-1">
      <b-col cols="6">
        <h2>Performance</h2>
      </b-col>
      <b-col cols="6">
        <b-button
          id="filter-pop"
          variant="primary"
          class="float-right"
          >Search</b-button
        >
        <FilterPopup />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card no-body>
          <b-card-header>
            <!-- title and legend -->
            <b-card-title class="mb-50"> Summary </b-card-title>
            <div class="d-flex align-items-center">
              <flat-pickr
                v-model="rangePicker"
                :config="{ mode: 'range' }"
                class="form-control flat-picker bg-transparent border-0 shadow-none"
                placeholder="YYYY-MM-DD"
                @on-change="getPerformanceChartHistory"
              />
            </div>
          </b-card-header>
          <b-card-body>
            <vue-apex-charts
              ref="bar"
              type="bar"
              height="400"
              :options="publisherPerformanceChatData.chartOptions"
              :series="publisherPerformanceChartSeries.series"
            />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  BButton,
} from "bootstrap-vue";

import FilterPopup from "./components/FilterPopup.vue";
import VueApexCharts from "vue-apexcharts";
import flatPickr from "vue-flatpickr-component";
import {
  publisherPerformanceChatData,
  publisherPerformanceChartSeries,
} from "../../data/apexChartData";

import { globalHelper } from "@core/mixins/ui/global";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    VueApexCharts,
    flatPickr,
    FilterPopup,
    BButton,
  },
  mixins: [globalHelper],
  data() {
    return {
      rangePicker: ["2022-12-01", "2022-12-03"],
      publisherPerformanceChatData,
      publisherPerformanceChartSeries,
    };
  },
  computed: {
    getPerformanceHistory() {
      return this.$store.getters[
        "managePublisherReporting/getPerformanceSummary"
      ];
    },
  },
  methods: {
    getPerformanceChartHistory() {
      this.$store.dispatch(
        "managePublisherReporting/getPerformanceChartHistory",
        {
          type: "range",
          value: this.rangePicker,
        }
      );
    },
    getTodayPerformance() {
      this.$store.dispatch(
        "managePublisherReporting/getPerformanceChartHistory",
        {
          type: "today",
          value: "",
        }
      );
    },
  },
  watch: {
    getPerformanceHistory(performance, oldValue) {
      if (performance) {
        let date = [];
        let calls = [];
        let payouts = [];
        let connected = [];
        performance.forEach((element, index) => {
          date[index] = element.Date;
          const currency = this.getCurrencySign(element.currency);
          if (element.call_status == "completed") {
            payouts[index] = element.payout;
            connected[index] = element.count;
            calls[index] = 0;
          } else {
            calls[index] = element.count;
            payouts[index] = 0;
            connected[index] = 0;
          }
        });

        this.publisherPerformanceChartSeries.series[0].data = payouts;
        this.publisherPerformanceChartSeries.series[1].data = calls;
        this.publisherPerformanceChartSeries.series[2].data = connected;
        this.publisherPerformanceChatData.chartOptions.labels = date;
        this.$refs.bar.updateOptions(
          this.publisherPerformanceChatData.chartOptions,
          false,
          true
        );
        this.$refs.bar.updateSeries(
          this.publisherPerformanceChartSeries.series,
          true
        );
      }
    },
  },
  created() {
    this.getTodayPerformance();
  },
};
</script>
