<template>
  <div>
    <div class="header_title">
      <b-row class="align-items-center">
        <b-col cols="6">
          <h2>Financials</h2>
        </b-col>
        <b-col cols="6">
          <b-button variant="primary" class="float-right" v-b-modal.create-center>Create Campaign</b-button>
        </b-col>
      </b-row>
    </div>
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
              <b-card-text class="font-medium-1 mb-0"> New User </b-card-text>
              <h4 class="font-weight-bolder font-medium-3 font mb-0">3021</h4>
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
              <b-card-text class="font-medium-1 mb-0"> Revenue </b-card-text>
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
              <b-card-text class="font-medium-1 mb-0"> Cost </b-card-text>
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
        <b-card class="statistics-card flex-grow-1">
          <b-media no-body>
            <b-media-body class="my-auto">
              <b-card-text class="font-medium-1 mb-0"> Profit </b-card-text>
              <h4 class="font-weight-bolder font-medium-5 font mb-0">
                21.90 %
              </h4>
            </b-media-body>
            <b-media-aside class="mr-2">
              <b-img
                class="bar-chart-img"
                src="@/assets/images/dashboard/Chart-sm.svg"
              />
            </b-media-aside>
          </b-media>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="align-self-stretched">
      <b-col lg="8" md="6" class="mb-2">
        <b-card no-body class="statistics-card h-100">
          <b-card-header>
            <b-card-text
              class="font-large-1 font-weight-bolder mb-0 active-user-main"
            >
              <span class="font-small-3 font-weight-normal active-user"
                >Daily Active User</span
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
      <b-col lg="4" md="6" class="mb-2">
        <b-card no-body class="statistics-card h-100">
          <b-card-header class="d-block">
            <b-row class="align-items-center">
              <b-col md="6">
                <span class="font-small-3 font-weight-normal active-user"
                  >Spent this month</span
                >
              </b-col>
              <b-col md="6" class="text-right">
                <feather-icon
                  icon="ChevronUpIcon"
                  size="16"
                  class="text-green"
                />
                <span class="font-weight-bolder font-medium-1 text-green"
                  >+2.45%</span
                >
              </b-col>
            </b-row>

            <b-card-text
              class="
                font-large-1 font-weight-bolder
                mb-0
                active-user-main
                my-0p5
              "
              >$682.5</b-card-text
            >
            <b-media no-body class="my-0p5">
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
            <!-- datepicker -->

            <!-- datepicker -->
          </b-card-header>

          <!-- chart -->
          <b-card-body>
            <vue-apex-charts
              height="200"
              :options="statisticsOrder.chartOptions"
              :series="statisticsOrder.series"
              class="apex-cr-bars"
            />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="7" class="mb-2">
        <b-card no-body class="statistics-card h-100">
          <b-card-header class="d-block">
            <b-row class="align-items-center">
              <b-col md="6">
                <h4 class="mb-0">Revenue</h4>
              </b-col>
              <b-col md="6" class="text-right">
                <feather-icon
                  icon="SettingsIcon"
                  class="text-right text-muted"
                  size="16"
                />
              </b-col>
            </b-row>
            <div class="mt-p5">
              <p class="text-raven font-small-3 mb-0">
                2020 Total Sales: 12.84K
              </p>
            </div>
          </b-card-header>

          <!-- chart -->
          <b-card-body>
            <vue-apex-charts
              type="line"
              height="250"
              :options="gradientChart.chartOptions"
              :series="gradientChart.series"
            />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="5" class="mb-2">
        <b-card class="card-transaction statistics-card h-100" no-body>
          <b-card-header>
            <b-card-title>Employee Task</b-card-title>

            <b-dropdown
              variant="link"
              no-caret
              class="chart-dropdown"
              toggle-class="p-0"
              right
            >
              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="18"
                  class="text-body cursor-pointer"
                />
              </template>
              <b-dropdown-item href="#"> Last 28 Days </b-dropdown-item>
              <b-dropdown-item href="#"> Last Month </b-dropdown-item>
              <b-dropdown-item href="#"> Last Year </b-dropdown-item>
            </b-dropdown>
          </b-card-header>

          <b-card-body>
            <div class="transaction-item">
              <b-media no-body class="align-items-center">
                <b-media-aside>
                  <b-img
                    width="50"
                    rounded
                    src="@/assets/images/avatars/1-small.png"
                  />
                </b-media-aside>
                <b-media-body>
                  <h6 class="transaction-title mb-0">Louisa Norton</h6>
                  <small class="text-raven">UI Designer</small>
                </b-media-body>
              </b-media>
              <div class="d-flex align-items-center">
                <span class="font-weight-bold text-muted mr-1">9hr 20m</span>
                <vue-apex-charts
                  type="radialBar"
                  height="30"
                  width="30"
                  :options="chartData.options"
                  :series="chartData.series"
                />
              </div>
            </div>
            <div class="transaction-item">
              <b-media no-body class="align-items-center">
                <b-media-aside>
                  <b-img
                    width="50"
                    rounded
                    src="@/assets/images/avatars/5-small.png"
                  />
                </b-media-aside>
                <b-media-body>
                  <h6 class="transaction-title mb-0">Helena Payene</h6>
                  <small class="text-raven">Full Stack Developer</small>
                </b-media-body>
              </b-media>
              <div class="d-flex align-items-center">
                <span class="font-weight-bold text-muted mr-1">9hr 20m</span>
                <vue-apex-charts
                  type="radialBar"
                  height="30"
                  width="30"
                  :options="chartData.options"
                  :series="chartData.series"
                />
              </div>
            </div>
            <div class="transaction-item">
              <b-media no-body class="align-items-center">
                <b-media-aside>
                  <b-img
                    width="50"
                    rounded
                    src="@/assets/images/avatars/4-small.png"
                  />
                </b-media-aside>
                <b-media-body>
                  <h6 class="transaction-title mb-0">Ryan Harrington</h6>
                  <small class="text-raven">iOS Developer</small>
                </b-media-body>
              </b-media>
              <div class="d-flex align-items-center">
                <span class="font-weight-bold text-muted mr-1">9hr 20m</span>
                <vue-apex-charts
                  type="radialBar"
                  height="30"
                  width="30"
                  :options="chartData.options"
                  :series="chartData.series"
                />
              </div>
            </div>
            <div class="transaction-item">
              <b-media no-body class="align-items-center">
                <b-media-aside>
                  <b-img
                    width="50"
                    rounded
                    src="@/assets/images/avatars/2-small.png"
                  />
                </b-media-aside>
                <b-media-body>
                  <h6 class="transaction-title mb-0">Jayden Duncan</h6>
                  <small class="text-raven">Java Developer</small>
                </b-media-body>
              </b-media>
              <div class="d-flex align-items-center">
                <span class="font-weight-bold text-muted mr-1">9hr 20m</span>
                <vue-apex-charts
                  type="radialBar"
                  height="30"
                  width="30"
                  :options="chartData.options"
                  :series="chartData.series"
                />
              </div>
            </div>
            <div class="transaction-item">
              <b-media no-body class="align-items-center">
                <b-media-aside>
                  <b-img
                    width="50"
                    rounded
                    src="@/assets/images/avatars/3-small.png"
                  />
                </b-media-aside>
                <b-media-body>
                  <h6 class="transaction-title mb-0">Cynthia Howell</h6>
                  <small class="text-raven">Angular Developer</small>
                </b-media-body>
              </b-media>
              <div class="d-flex align-items-center">
                <span class="font-weight-bold text-muted mr-1">9hr 20m</span>
                <vue-apex-charts
                  type="radialBar"
                  height="30"
                  width="30"
                  :options="chartData.options"
                  :series="chartData.series"
                />
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <div class="card py-3 px-2 statistics-card">
      <b-row class="align-items-center">
        <b-col md="7">
          <h2>Campaigns</h2>
        </b-col>
        <b-col md="5" class="text-right">
          <b-form-group class="mb-0">
            <b-input-group>
              <div class="input-gradient">
                <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="Search..."
              />
              </div>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :items="items"
        :fields="fields"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
        class="table-cr mt-2"
      >
        <template #cell(netprofit)="data">
          <b-badge :variant="netprofit[1][data.value]">
            {{ netprofit[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(revenue)="data">
          <b-badge :variant="revenue[1][data.value]">
            {{ revenue[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(actions)="data">
          <b-dropdown
            :items="data.item.actions"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            class="drop-with-trash"
          >
            <template v-slot:button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="text-body align-middle mr-25"
              />
            </template>
            <b-dropdown-item>
              <feather-icon icon="Edit2Icon" class="mr-50" />
              <span>Edit</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="TrashIcon" class="mr-50" />
              <span>Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

      <div class="mt-2">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          size="sm"
          class="my-0"
          hide-goto-end-buttons
        />
      </div>
    </div>

    <!-- create campaign modal -->
    <b-modal id="create-center" centered title="Create New Campain" ok-title="Save Customer" cancel-title="Cancel" modal-class="modal-cr">
      <b-row>
        <b-col md="6">
          <div class="form-group-cr">
            <b-form-group>
              <label>Campaign Name</label>
              <div class="input-gradient">
                <b-form-input type="text" />
              </div>
            </b-form-group>
          </div>
        </b-col>
        <b-col md="6">
          <div class="form-group-cr">
            <label>Campaign Type</label>
            <div class="input-gradient">
              <b-form-input type="text" />
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <div class="form-group-cr">
            <label>Campaign Email</label>
            <div class="input-gradient">
              <b-form-input type="text" />
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <div class="form-group-cr">
            <label>Campaign Number</label>
            <div class="input-gradient">
              <b-form-input type="text" />
            </div>
          </div>
        </b-col>
        <b-col md="12">
          <div class="form-group-cr">
            <label>Notes</label>
            <div class="input-gradient">
              <b-form-textarea type="text" rows="4"></b-form-textarea>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import {
  BTable,
  BPagination,
  BRow,
  BCol,
  BFormDatepicker,
  BTabs,
  BTab,
  BButton,
  BCardHeader,
  BCardText,
  BCard,
  BCardBody,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BBadge,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BMedia,
  BImg,
  BFormInput,
  BInputGroup,
  BFormGroup,
  BModal,
  BFormTextarea
} from "bootstrap-vue";
import { $themeColors } from "@themeConfig";
const $barColor = "#f3f3f3";
const $trackBgColor = "#e9ecef";
import VueApexCharts from "vue-apexcharts";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
export default {
  components: {
    VueApexCharts,
    BRow,
    BCol,
    BFormDatepicker,
    BTabs,
    BTab,
    BButton,
    BCardHeader,
    BCardText,
    BCard,
    BCardBody,
    BCardTitle,
    BTable,
    BPagination,
    BDropdown,
    BDropdownItem,
    BBadge,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BMedia,
    BImg,
    BFormInput,
    BInputGroup,
    BFormGroup,
    BModal,
    AppBreadcrumb,
    BFormTextarea
  },
  data() {
    return {
      perPage: 5,
      totalRows: 1,
      currentPage: 1,
      filter: null,
      filterOn: [],
      statisticsOrder: {
        series: [
          {
            name: "2020",
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
            // labels: {
            //   show: false,
            // },
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
            data: [75, 125, 225, 175, 125, 75, 25],
          },
        ],
        chartOptions: {
          chart: {
            // sparkline: { enabled: true },
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
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
              borderRadius: 23,
              //   endingShape: "rounded",
            },
          },
          tooltip: {
            enabled: true,
          },
          yaxis: {
            show: false,
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        },
      },

      gradientChart: {
        series: [
          {
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: "line",
            dropShadow: {
              enabled: true,
              top: 5,
              left: 0,
              blur: 4,
              opacity: 0.1,
            },
            toolbar: { show: false },
          },
          stroke: {
            width: 5,
            curve: "smooth",
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            axisTicks: {
              show: false,
            },
          },

          colors: [
            $themeColors.primary,
            $themeColors.primary,
            $themeColors.primary,
            $themeColors.primary,
            $themeColors.primary,
            $themeColors.primary,
          ],
          dropShadow: {
            enabled: true,
            top: 10,
            left: 0,
            blur: 5,
            opacity: 0.5,
            color: "yellow",
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              gradientToColors: ["#c660e0"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 192, 96, 224],
            },
          },
          yaxis: {
            categories: ["150", "200", "250", "300", "350"],
          },
        },
      },

      chartData: {
        series: [54.4],
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [$themeColors.primary],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "30%",
              },
              track: {
                background: $trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },

      fields: [
        { key: "id", label: "ID#", sortable: true },
        { key: "item", label: "Item", sortable: true },
        { key: "quantity", label: "Quantity", sortable: true },
        { key: "date", label: "Date", sortable: true },
        { key: "revenue", label: "Revenue", sortable: true },
        { key: "netprofit", label: "Net Profit", sortable: true },
        "actions",
      ],
      items: [
        {
          id: 1,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 2,
          netprofit: 2,
          actions: "",
        },
        {
          id: 2,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 1,
          netprofit: 1,
          actions: "",
        },
        {
          id: 3,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 2,
          netprofit: 2,
          actions: "",
        },
        {
          id: 4,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 1,
          netprofit: 1,
          actions: "",
        },
        {
          id: 5,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 2,
          netprofit: 2,
          actions: "",
        },
        {
          id: 6,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 2,
          netprofit: 2,
          actions: "",
        },
        {
          id: 7,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 1,
          netprofit: 1,
          actions: "",
        },
        {
          id: 8,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 2,
          netprofit: 2,
          actions: "",
        },
        {
          id: 9,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 2,
          netprofit: 2,
          actions: "",
        },
        {
          id: 10,
          item: "Transfer Pricing",
          quantity: "826",
          date: "5/9/21",
          revenue: 1,
          netprofit: 1,
          actions: "",
        },
      ],
      revenue: [
        {
          1: "$767.50",
          2: "$928.41",
        },
        {
          1: "light-success",
          2: "light-warning",
        },
      ],
      netprofit: [
        {
          2: "$767.50",
          1: "$928.41",
        },
        {
          2: "light-success",
          1: "light-warning",
        },
      ],
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style>
</style>