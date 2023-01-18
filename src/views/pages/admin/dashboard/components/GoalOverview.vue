<template>
  <b-card
    v-if="data"
    no-body
  >
    <b-card-header>
      <h4 class="mb-0">Goal Overview</h4>
    </b-card-header>

    <!-- apex chart -->

    <vue-apex-charts
      type="radialBar"
      height="245"
      class="my-2"
      :options="goalOverviewRadialBar"
      :series="data.series"
      ref="chartId"
    />
    <b-row class="text-center mx-0">
      <b-col
        cols="6"
        class="border-top border-right d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0"> Connected </b-card-text>
        <h3 class="font-weight-bolder mb-0">
          {{ data.completed }}
        </h3>
      </b-col>

      <b-col
        cols="6"
        class="border-top d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0"> In Progress </b-card-text>
        <h3 class="font-weight-bolder mb-0">
          {{ data.inProgress }}
        </h3>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { goalOverviewRadialBar } from "./data/chartData";

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      goalOverviewRadialBar,
    };
  },
};
</script>
