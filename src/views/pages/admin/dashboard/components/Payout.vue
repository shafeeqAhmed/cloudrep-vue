<template>
  <b-card
    v-if="data"
    body-class="pb-50"
  >
    <h6>Payout</h6>
    <h2 class="font-weight-bolder mb-1">{{ data.revenue[0]["title"] }}</h2>
    <!-- chart -->
    <vue-apex-charts
      height="70"
      :options="payoutChart.chartOptions"
      :series="data.payoutSeries"
      ref="payoutChildChartRef"
    />
  </b-card>
</template>

<script>
import { BCard } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { payoutChart } from "./data/chartData";

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
      payoutChart,
    };
  },
};
</script>
