<template>
  <b-card
    v-if="data"
    class="card-tiny-line-stats"
    body-class="pb-50"
  >
    <h6>Profit</h6>
    <h2 class="font-weight-bolder mb-1">
      {{ data.revenue[1]["title"] }}
    </h2>
    <!-- chart -->
    <vue-apex-charts
      height="70"
      :options="profiltChart.chartOptions"
      :series="data.profitSeries"
      ref="profitChildChartRef"
    />
  </b-card>
</template>

<script>
import { BCard } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { profiltChart } from "./data/chartData";

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
      profiltChart,
    };
  },
};
</script>
