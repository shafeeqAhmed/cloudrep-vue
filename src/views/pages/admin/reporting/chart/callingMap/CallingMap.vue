<template>
  <div>
    <b-row>
      <b-col cols="6" class="mb-3">
      </b-col>
      <b-col cols="6" class="mb-3">
        <b-button class="float-right" variant="primary" @click="refresh">
          Refresh
        </b-button>
      </b-col>

      <b-col cols="12">
        <b-card no-body>
          <b-card-body>
            <MapChart :countryData="countryData" :currencyAdd="false" highColor="#4af6e9" lowColor="#7a60e0"
              countryStrokeColor="#909090" defaultCountryFillColor="#ccc" legendFontColorHeader="#000"
              legendFontColorContent="#000" />
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
  BCardSubTitle,
  BButton,
} from "bootstrap-vue";

import VueApexCharts from "vue-apexcharts";
import { apexChatData, chartSeries } from "../data/apexChartData";
import MapChart from "vue-chart-map";

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
    MapChart,
    BButton,
  },
  data() {
    return {
      apexChatData,
      chartSeries,
    };
  },
  watch: {
    "$store.state.manageReporting.timeLineFilter": {
      handler() {
        this.refresh();
      },
      deep: true,
    },
  },
  methods: {
    refresh() {
      const filterState = this.$store.state.manageReporting.timeLineFilter;
      let payLoad = {
        page: "1",
        user_uuid: filterState.timeLineFilterUuid,
        time_zone: filterState.timeLineFilterTimeZone,
        dateRange: filterState.timeLineFilterDateRange,
        customFilters: filterState.customFilters,
      };

      this.$store.dispatch("manageReporting/getCallCountOfCountries", payLoad);
    },
  },
  computed: {
    countryData() {
      const countries = this.$store.state.manageReporting.callCountOfCountries;
      console.log('countries-----------------------============')
      console.log(countries)
      console.log(typeof countries)
      // if (countries) {
      //   return countries
      // }
      return {}
    },
  },
  created() {
    this.refresh();
  },
};
</script>
<style>
.vue-world-map {
  height: 600px !important;
}
</style>
