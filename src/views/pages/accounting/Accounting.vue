<template>
  <div>
    <div class="header_title">
      <b-row class="align-items-center">
        <b-col cols="12">
          <h2>Accounting</h2>
        </b-col>
      </b-row>
    </div>
    <b-row class="align-self-stretched mt-3">
      <b-col lg="6" md="12" class="mb-2rem">
        <b-card no-body class="statistics-card h-100">
          <b-card-header>
            <b-card-title>Users</b-card-title>
            <!-- dropdown -->
            <b-dropdown
              dropright
              variant="link"
              toggle-class="p-0 bordered"
              no-caret
            >
              <template #button-content>
                <feather-icon class="text-body" icon="MoreVerticalIcon" />
              </template>
              <b-dropdown-item> Last 28 Days </b-dropdown-item>
              <b-dropdown-item> Last Month </b-dropdown-item>
              <b-dropdown-item> Last Year </b-dropdown-item>
            </b-dropdown>
            <!--/ dropdown -->
          </b-card-header>

          <!-- chart -->
          <b-card-body>
            <chartjs-component-polar-area-chart
              :height="300"
              :data="chartjsData.polarChart.data"
              :options="chartjsData.polarChart.options"
            />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="6" md="12" class="mb-2rem">
        <b-card no-body class="statistics-card h-100 card-metrics">
          <b-card-header>
            <b-card-title> Incoming Call <br />Metrics </b-card-title>
          </b-card-header>
          <b-card-body>
            <b-row class="align-items-center">
              <b-col lg="4" md="4" sm="12">
                <b-card-text
                  class="font-small-5 font-weight-bolder border-left"
                >
                  Average handle time<br />
                  <span class="font-small-2 font-weight-normal">
                    00:02:20
                  </span>
                </b-card-text>
                <b-card-text
                  class="font-small-5 font-weight-bolder mt-2 border-left"
                >
                  Service level threshold<br />
                  <span class="font-small-2 font-weight-normal"> 30S </span>
                </b-card-text>
                <!-- <p>
                <b-link class="mr-1 font-weight-bolder text-nero text-primary">
                  <small>More details</small>
                </b-link>
                <img
                  class="cursor-pointer"
                  src="@/assets/images/icons/arrow-right.png"
                />
              </p> -->
              </b-col>

              <b-col lg="8" md="8" sm="12">
                <vue-apex-charts
                  height="250"
                  :options="earningsChart.chartOptions"
                  :series="earningsChart.series"
                />
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <!-- profit and loss -->
      <b-col md="12">
        <b-card no-body class="statistics-card">
          <b-card-header>
            <h2>Profit &amp; Loss</h2>
            <!-- dropdown -->
            <b-dropdown
              dropright
              variant="link"
              toggle-class="p-0 bordered"
              no-caret
            >
              <template #button-content>
                <feather-icon class="text-body" icon="MoreVerticalIcon" />
              </template>
              <b-dropdown-item> Last 28 Days </b-dropdown-item>
              <b-dropdown-item> Last Month </b-dropdown-item>
              <b-dropdown-item> Last Year </b-dropdown-item>
            </b-dropdown>
            <!--/ dropdown -->
          </b-card-header>

          <!-- table -->
          <b-card-body>
            <b-table
              responsive
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="table-cr table-accouting"
            >
            </b-table>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- cash flow -->
      <b-col md="12">
        <b-card no-body class="statistics-card">
          <b-card-header>
            <h2>Cash Flow</h2>
            <!-- dropdown -->
            <b-dropdown
              dropright
              variant="link"
              toggle-class="p-0 bordered"
              no-caret
            >
              <template #button-content>
                <feather-icon class="text-body" icon="MoreVerticalIcon" />
              </template>
              <b-dropdown-item> Last 28 Days </b-dropdown-item>
              <b-dropdown-item> Last Month </b-dropdown-item>
              <b-dropdown-item> Last Year </b-dropdown-item>
            </b-dropdown>
            <!--/ dropdown -->
          </b-card-header>

          <!-- table -->
          <b-card-body>
            <b-table
              responsive
              :items="items2"
              :fields="fields2"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="table-cr table-accouting"
            >
            </b-table>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- watchlist -->
      <b-col md="12">
        <b-card no-body class="statistics-card">
          <b-card-header>
            <h2>Account Watchlist</h2>
            <!-- dropdown -->
            <b-dropdown
              dropright
              variant="link"
              toggle-class="p-0 bordered"
              no-caret
            >
              <template #button-content>
                <feather-icon class="text-body" icon="MoreVerticalIcon" />
              </template>
              <b-dropdown-item> Last 28 Days </b-dropdown-item>
              <b-dropdown-item> Last Month </b-dropdown-item>
              <b-dropdown-item> Last Year </b-dropdown-item>
            </b-dropdown>
            <!--/ dropdown -->
          </b-card-header>

          <!-- table -->
          <b-card-body>
            <b-table
              responsive
              :items="items3"
              :fields="fields3"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="table-cr table-accouting tbl-wl"
            >
            </b-table>

            <b-table
              responsive
              :items="items4"
              :fields="fields4"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="table-cr table-accouting tbl-wl"
            >
            </b-table>
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
  BCardText,
  BLink,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BMedia,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BImg,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BTable,
  // BCardSubTitle
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import ChartjsComponentPolarAreaChart from "../agent/charts-components/ChartjsComponentPolarAreaChart.vue";
import chartjsData from "../agent/charts-components/chartjsData";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import { $themeColors } from "@themeConfig";
const $earningsStrokeColor2 = "#C4BBF7";
const $earningsStrokeColor3 = "#DCD6F9";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardText,
    BLink,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BImg,
    BCardHeader,
    BCardBody,
    BCardTitle,
    VueApexCharts,
    ChartjsComponentPolarAreaChart,
    BDropdown,
    BDropdownItem,
    AppBreadcrumb,
    BTable,
    // BCardSubTitle
  },
  data() {
    return {
      sortBy: null,
      sortDesc: false,
      // sortDirection: "asc",
      chartjsData,

      earningsChart: {
        series: [53, 16, 31],
        chartOptions: {
          chart: {
            type: "donut",
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [2, -3, 8],
          labels: ["App", "Service", "Product"],
          stroke: { width: 0 },
          colors: [
            $earningsStrokeColor2,
            $earningsStrokeColor3,
            $themeColors.primary,
          ],
          grid: {
            padding: {
              right: -20,
              bottom: -8,
              left: -20,
            },
          },
          plotOptions: {
            pie: {
              startAngle: -10,
              donut: {
                labels: {
                  show: true,
                  name: {
                    offsetY: 15,
                  },
                  value: {
                    offsetY: -15,
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${parseInt(val)}%`;
                    },
                  },
                  total: {
                    show: true,
                    offsetY: 15,
                    label: "App",
                    formatter() {
                      return "53%";
                    },
                  },
                },
              },
            },
          },
          responsive: [
            {
              breakpoint: 1367,
              options: {
                chart: {
                  height: 270,
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  height: 220,
                },
              },
            },
            {
              breakpoint: 1045,
              options: {
                chart: {
                  height: 200,
                },
              },
            },
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 220,
                },
              },
            },
          ],
        },
      },

      useCustomIcons: true,
      sortIconNeutral:
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e",
      sortIconDesc:
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='black' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e",
      sortIconAsc:
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='black' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e",

      fields: [
        { key: "period", label: "Period", sortable: true },
        { key: "income", label: "Income", sortable: true },
        { key: "expense", label: "Expense", sortable: true },
        { key: "total", label: "Total", sortable: true },
      ],

      items: [
        {
          period: "Nov 2021",
          income: "449003",
          expense: "651535",
          total: "449003",
        },
        {
          period: "Current Year",
          income: "653518",
          expense: "558612",
          total: "653518",
        },
      ],

      fields2: [
        { key: "period", label: "Period", sortable: true },
        { key: "moneyin", label: "Money In", sortable: true },
        { key: "moneyout", label: "Money Out", sortable: true },
        { key: "total", label: "Total", sortable: true },
      ],

      items2: [
        {
          period: "Nov 2021",
          moneyin: "449003",
          moneyout: "651535",
          total: "449003",
        },
        {
          period: "Current Year",
          moneyin: "653518",
          moneyout: "558612",
          total: "653518",
        },
      ],

      fields3: [
        { key: "account", label: "Period", sortable: true },
        { key: "total", label: "Total", sortable: true },
      ],

      items3: [
        {
          account: "Retained earnings",
          total: "449003",
        },
        {
          account: "Sales Income",
          total: "653518",
        },
      ],

      fields4: [
        { key: "account", label: "Period", sortable: true },
        { key: "total", label: "Total", sortable: true },
      ],

      items4: [
        {
          account: "Retained earnings",
          total: "449003",
        },
        {
          account: "Sales Income",
          total: "653518",
        },
        {
          account: "Sales Income",
          total: "653518",
        },
      ],
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>