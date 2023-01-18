<template>
  <!-- Complete Home Component Backup -->
  <div>
    <b-row>
      <b-col md="8">
        <p class="user-message">Hi {{ user.name }},</p>
        <h1>Welcome to Cloud Rep!</h1>
      </b-col>

      <!-- search-bar -->
      <b-col md="4">
        <b-input-group class="input-group-merge">
          <div class="input-gradient d-flex">
            <b-form-input placeholder="Search" />
            <b-input-group-append is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-append>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col lg="3" md="6" class="d-flex">
        <b-card class="statistics-card flex-grow-1">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="50" class="bg-gradient-primary">
                <feather-icon
                  class="font-medium-5"
                  size="24"
                  icon="UsersIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <b-card-text class="font-medium-2 text-capitalize mb-0">
                Calls Taken
              </b-card-text>
              <h4 class="font-weight-bolder font-medium-5 font mb-0">3021</h4>
            </b-media-body>
            <b-media-aside class="mr-2">
              <b-img
                class="card-img"
                src="@/assets/images/dashboard/Graph.png"
              />
            </b-media-aside>
          </b-media>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" class="d-flex">
        <b-card class="statistics-card flex-grow-1">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="50" class="session-card">
                <feather-icon
                  class="font-medium-5 text-primary"
                  size="24"
                  icon="BarChart2Icon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <b-card-text class="font-medium-2 mb-0"> Earned </b-card-text>
              <h4 class="font-weight-bolder font-medium-5 font mb-0">
                $350.40
              </h4>
            </b-media-body>
          </b-media>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" class="d-flex">
        <b-card class="statistics-card flex-grow-1">
          <b-media no-body>
            <b-media-body class="my-auto">
              <b-card-text class="font-medium-2 mb-0">
                Avg. session duration
              </b-card-text>
              <h4 class="font-weight-bolder font-medium-5 font mb-0">
                6m 40sec
              </h4>
            </b-media-body>
            <b-media-aside class="mr-2">
              <b-img
                class="bar-chart-img"
                src="@/assets/images/dashboard/bar-chart.png"
              />
            </b-media-aside>
          </b-media>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" class="d-flex">
        <b-card class="statistics-card bg-gradient-primary flex-grow-1">
          <b-media no-body>
            <b-media-body class="my-auto">
              <b-card-text class="font-medium-2 mb-0"> Close rate </b-card-text>
              <h4 class="font-weight-bolder font-medium-5 font mb-0 text-white">
                21.90 %
              </h4>
            </b-media-body>
            <b-media-aside class="mr-2">
              <b-img
                class="bar-chart-img"
                src="@/assets/images/dashboard/Chart.png"
              />
            </b-media-aside>
          </b-media>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="align-self-stretched">
      <b-col lg="7" md="6" class="mb-2">
        <b-card no-body class="statistics-card h-100">
          <b-card-header>
            <b-card-text
              class="font-large-1 font-weight-bolder mb-0 active-user-main"
            >
              <span class="font-small-2 font-weight-normal active-user"
                >Daily Calls Taken</span
              >
              <br />
              10,900
            </b-card-text>
          </b-card-header>

          <!-- chart -->
          <b-card-body>
            <vue-apex-charts
              type="bar"
              height="300"
              :options="salesBar.chartOptions"
              :series="salesBar.series"
            />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="5" md="6" class="mb-2">
        <b-card no-body class="statistics-card h-100">
          <b-card-header>
            <b-card-text
              class="font-large-1 font-weight-bolder mb-0 active-user-main"
            >
              <span class="font-small-2 font-weight-normal active-user"
                >Amount Earned</span
              >
              <br />
              $682.5
              <b-media no-body class="my-1">
                <b-media-aside class="">
                  <b-avatar size="25" class="bg-green">
                    <feather-icon
                      class="font-medium-1"
                      size="16"
                      icon="CheckIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <h4 class="font-weight-bolder font-medium-1 text-green mb-0">
                    On track
                  </h4>
                </b-media-body>
              </b-media>
            </b-card-text>
            <!-- datepicker -->
            <div class="d-flex align-items-center spent-time">
              <!-- <feather-icon icon="CalendarIcon" size="16" /> -->
              <span class="font-weight-bolder font-medium-1 text-green"
                >+2.45%</span
              >
            </div>
            <!-- datepicker -->
          </b-card-header>

          <!-- chart -->
          <b-card-body>
            <vue-apex-charts
              height="300"
              :options="statisticsOrder.chartOptions"
              :series="statisticsOrder.series"
              class="apex-cr-bars"
            />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="align-self-stretched">
      <b-col lg="6" md="12" class="mb-2">
        <b-card no-body class="statistics-card h-100">
          <b-card-header class="card-header-camp align-items-center">
            <b-card-title>Campaign Earnings</b-card-title>

            <b-form-select class="mt-1" v-model="selected" :options="options" />

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
      <b-col lg="6" md="12" class="mb-2">
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
  BFormSelect,
  BFormGroup,
  // BCardSubTitle
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import flatPickr from 'vue-flatpickr-component';
import ChartjsComponentBarChart from "./charts-components/ChartjsComponentBarChart.vue";
import ChartjsComponentPolarAreaChart from "./charts-components/ChartjsComponentPolarAreaChart.vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";
import apexChatData from "./charts-components/apex-chart/apexChartData";
import chartjsData from "./charts-components/chartjsData";
import { getUserData } from "@/auth/utils";

const $barColor = "#f3f3f3";
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
    ChartjsComponentBarChart,
    ChartjsComponentPolarAreaChart,
    VueApexCharts,
    BDropdown,
    BDropdownItem,
    BFormSelect,
    flatPickr,
    BFormGroup,
    // BCardSubTitle
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.user = getUserData();
  },
  data() {
    return {
      dateNtim: null,
      user: "",
      chartjsData,
      apexChatData,
      selected: null,
      options: [
        { value: null, text: "Sort By" },
        { value: "a", text: "Campaigns" },
        { value: "b", text: "Pending Campaigns" },
      ],
      statisticsOrder: {
        series: [
          {
            name: "Amount Earned",
            data: [45, 85, 65, 45, 65, 70],
          },
        ],
        chartOptions: {
          chart: {
            type: "bar",
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%",
              startingShape: "rounded",
              colors: {
                backgroundBarColors: [
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                ],
                backgroundBarRadius: 8,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: [$themeColors.primary],

          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat/Sun"],
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },
      salesBar: {
        series: [
          {
            name: "Sessions",
            data: [75, 125, 225, 175, 125, 75, 25],
          },
        ],
        chartOptions: {
          chart: {
            sparkline: { enabled: true },
            toolbar: { show: false },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
          },
          states: {
            hover: {
              filter: "none",
            },
          },
          colors: [
            "#ebf0f7",
            "#ebf0f7",
            $themeColors.primary,
            "#ebf0f7",
            "#ebf0f7",
            "#ebf0f7",
          ],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
              borderRadius: 23,
              endingShape: "rounded",
            },
          },
          tooltip: {
            x: { show: false },
          },
          xaxis: {
            type: "numeric",
          },
        },
      },
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
      // rangePicker: ["2019-05-01", "2019-05-10"],
    };
  },
};
</script>

<style scoped>
</style>
