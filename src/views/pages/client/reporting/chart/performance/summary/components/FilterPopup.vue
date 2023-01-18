<template>
  <div class="">
    <b-popover
      target="filter-pop"
      triggers="focus"
      placement="bottom"
      custom-class="customize-pop"
    >
      <ul>
        <li>
          <h5>Duration</h5>
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="today"
            >Today</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="yesterday"
            >Yesterday</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="lastTwoDays"
            >Last 2 days</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="lastSevenDays"
            >Last 7 days</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="thisWeek"
            >This Week</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="lastWeek"
            >Last Week</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="last30Days"
            >Last 30 Days</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="thisMonth"
            >This Month</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="lastMonth"
            >Last Month</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="last6Month"
            >Last 6 Months</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="lastYear"
            >Last Year</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getPerformanceChartHistory"
            value="weekly"
            >Weekly</b-form-checkbox
          >
        </li>
      </ul>
    </b-popover>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BButton,
  BFormCheckbox,
  BModal,
  VBModal,
  BBadge,
  BPopover,
} from "bootstrap-vue";

export default {
  data() {
    return {
      duration: "",
    };
  },
  components: {
    BRow,
    BCol,
    BButton,
    BFormCheckbox,
    BModal,
    VBModal,
    BBadge,
    BPopover,
  },
  methods: {
    getPerformanceChartHistory() {
      if (this.duration) {
        this.$store.dispatch(
          "manageClientReporting/getPerformanceChartHistory",
          {
            type: this.duration,
            value: "",
          }
        );
      }
    },
  },
};
</script>
