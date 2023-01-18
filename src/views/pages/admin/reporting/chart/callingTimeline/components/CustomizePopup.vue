<template>
  <div class="">
    <b-popover
      target="costomize-pop"
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
            @change="getReportingChartHistory"
            value="today"
            >Today</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="yesterday"
            >Yesterday</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="lastTwoDays"
            >Last 2 days</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="lastSevenDays"
            >Last 7 days</b-form-checkbox
          >
        </li>
        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="thisWeek"
            >This Week</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="lastWeek"
            >Last Week</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="last30Days"
            >Last 30 Days</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="thisMonth"
            >This Month</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="lastMonth"
            >Last Month</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="last6Month"
            >Last 6 Months</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
            value="lastYear"
            >Last Year</b-form-checkbox
          >
        </li>

        <li>
          <b-form-checkbox
            v-model="duration"
            @change="getReportingChartHistory"
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
  BFormCheckbox,
  BModal,
  VBModal,
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
    BFormCheckbox,
    BModal,
    VBModal,
    BPopover,
  },

  methods: {
    getReportingChartHistory() {
      if (this.duration) {
        const filter = this.$store.state.manageReporting.timeLineFilter;
        this.$store.dispatch("manageReporting/getReportingChartHistory", {
          type: this.duration,
          value: "",
          user_uuid: filter.timeLineFilterUuid,
          time_zone: filter.timeLineFilterTimeZone,

          dateRange: filter.timeLineFilterDateRange,

          customFilters: filter.customFilters,
        });
      }
    },
  },
};
</script>
