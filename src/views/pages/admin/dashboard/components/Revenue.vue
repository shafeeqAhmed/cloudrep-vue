<template>
  <b-card
    v-if="data"
    class="card-tiny-line-stats"
    body-class="pb-50"
  >
    <h6>Revenue</h6>
    <h2 class="font-weight-bolder mb-1">
      {{ data.revenue[2]["title"] }}
    </h2>
    <!-- chart -->
    <vue-apex-charts
      height="70"
      :options="clientChart.chartOptions"
      :series="data.revenueSeries"
      ref="revenueChildChartRef"
    />
  </b-card>
</template>

<script>
import { BCard } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { clientChart } from "./data/chartData";

export default {
  components: {
    BCard,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      clientChart,
    };
  },
};
</script>
