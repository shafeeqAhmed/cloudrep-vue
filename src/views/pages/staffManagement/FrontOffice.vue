<template>
  <div class="staff-management pb-3">
    <div class="upp-header">
          <div class="upp-img">
              <b-img class="w-100" src="@/assets/images/logo/upp-img.png" ></b-img>
          </div>
          <div class="upp-heading">
              <h1>Front Office</h1>
          </div>
      </div>
    <b-tabs pills class="tabs-cr mt-3">
      <b-tab title="Sales Department" :active="tabName == 'sales'" @click="updateTab('sales')">
        <b-row class="mt-3">
          <b-col md="4" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <span class="font-small-3 font-weight-normal active-user">Spent this month</span>
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon icon="ChevronUpIcon" size="16" class="text-green" />
                    <span class="font-weight-bolder font-medium-1 text-green">+2.45%</span>
                  </b-col>
                </b-row>

                <b-card-text class="
                    font-large-1 font-weight-bolder
                    mb-0
                    active-user-main
                    my-0p5
                  ">$682.5</b-card-text>
                <b-media no-body class="my-0p5">
                  <b-media-aside class="">
                    <b-avatar size="25" class="bg-green">
                      <feather-icon class="font-medium-1" size="16" icon="CheckIcon" />
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
                <vue-apex-charts height="200" :options="statisticsOrder.chartOptions" :series="statisticsOrder.series"
                  class="apex-cr-bars" />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col md="8">
            <div class="card statistics-card revenue-chart">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <h4>Revenue</h4>
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon icon="SettingsIcon" class="text-right text-muted" size="16" />
                  </b-col>
                </b-row>
                <div class="d-flex align-items-center mt-1">
                  <div class="mr-3">
                    <p class="text-raven font-small-3 mb-0">This Month</p>
                    <h2 class="text-purple font-weight-bolder">$86,584</h2>
                  </div>
                  <div>
                    <p class="text-raven font-small-3 mb-0">Last Month</p>
                    <h2 class="text-nero font-weight-bolder">$73,584</h2>
                  </div>
                </div>
              </b-card-header>
              <b-card-body>
                <vue-apex-charts height="250" :options="lineChartSimple.chartOptions"
                  :series="lineChartSimple.series" />
              </b-card-body>
            </div>
          </b-col>
        </b-row>

        <div class="card py-3 px-2 statistics-card">
          <h2>Sales Department</h2>
          <b-table responsive :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields"
            class="table-cr mt-2">
            <template #cell(full_name)="data">
              <b-avatar :src="data.item.avatar" />
              <span class="ml-1">{{ data.value }}</span>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-dropdown :items="data.item.actions" variant="link" toggle-class="text-decoration-none" no-caret
                class="drop-with-trash">
                <template v-slot:button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
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
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm"
              class="my-0" hide-goto-end-buttons />
          </div>
        </div>
      </b-tab>
      <b-tab title="Support Department" :active="tabName == 'support'" @click="updateTab('support')">
        <b-row class="mt-3">
          <b-col md="4" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <span class="font-small-3 font-weight-normal active-user">Spent this month</span>
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon icon="ChevronUpIcon" size="16" class="text-green" />
                    <span class="font-weight-bolder font-medium-1 text-green">+2.45%</span>
                  </b-col>
                </b-row>

                <b-card-text class="
                    font-large-1 font-weight-bolder
                    mb-0
                    active-user-main
                    my-0p5
                  ">$682.5</b-card-text>
                <b-media no-body class="my-0p5">
                  <b-media-aside class="">
                    <b-avatar size="25" class="bg-green">
                      <feather-icon class="font-medium-1" size="16" icon="CheckIcon" />
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
                <vue-apex-charts height="200" :options="statisticsOrder.chartOptions" :series="statisticsOrder.series"
                  class="apex-cr-bars" />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col md="8">
            <div class="card p-2 statistics-card">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <h4>Revenue</h4>
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon icon="SettingsIcon" class="text-right text-muted" size="16" />
                  </b-col>
                </b-row>
                <div class="d-flex align-items-center mt-1">
                  <div class="mr-3">
                    <p class="text-raven font-small-3 mb-0">This Month</p>
                    <h2 class="text-purple font-weight-bolder">
                      <sup class="text-dark-custom">$</sup>86,584
                    </h2>
                  </div>
                  <div>
                    <p class="text-raven font-small-3 mb-0">Last Month</p>
                    <h2 class="text-nero font-weight-bolder">
                      <sup class="text-dark-custom">$</sup>73,584
                    </h2>
                  </div>
                </div>
              </b-card-header>
              <vue-apex-charts height="250" :options="lineChartSimple.chartOptions" :series="lineChartSimple.series" />
            </div>
          </b-col>
        </b-row>

        <div class="card py-3 px-2 statistics-card">
          <h2>Support Department</h2>
          <b-table responsive :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields"
            class="table-cr mt-2">
            <template #cell(full_name)="data">
              <b-avatar :src="data.item.avatar" />
              <span class="ml-1">{{ data.value }}</span>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-dropdown :items="data.item.actions" variant="link" toggle-class="text-decoration-none" no-caret
                class="drop-with-trash">
                <template v-slot:button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
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
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm"
              class="my-0" hide-goto-end-buttons />
          </div>
        </div>
      </b-tab>
      <b-tab title="Onboarding Department" :active="tabName == 'onboarding'" @click="updateTab('onboarding')">
        <b-row class="mt-3">
          <b-col md="4" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <span class="font-small-3 font-weight-normal active-user">Spent this month</span>
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon icon="ChevronUpIcon" size="16" class="text-green" />
                    <span class="font-weight-bolder font-medium-1 text-green">+2.45%</span>
                  </b-col>
                </b-row>

                <b-card-text class="
                    font-large-1 font-weight-bolder
                    mb-0
                    active-user-main
                    my-0p5
                  ">$682.5</b-card-text>
                <b-media no-body class="my-0p5">
                  <b-media-aside class="">
                    <b-avatar size="25" class="bg-green">
                      <feather-icon class="font-medium-1" size="16" icon="CheckIcon" />
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
                <vue-apex-charts height="200" :options="statisticsOrder.chartOptions" :series="statisticsOrder.series"
                  class="apex-cr-bars" />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col md="8">
            <div class="card p-2 statistics-card">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <h4>Revenue</h4>
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon icon="SettingsIcon" class="text-right text-muted" size="16" />
                  </b-col>
                </b-row>
                <div class="d-flex align-items-center mt-1">
                  <div class="mr-3">
                    <p class="text-raven font-small-3 mb-0">This Month</p>
                    <h2 class="text-purple font-weight-bolder">
                      <sup class="text-dark-custom">$</sup>86,584
                    </h2>
                  </div>
                  <div>
                    <p class="text-raven font-small-3 mb-0">Last Month</p>
                    <h2 class="text-nero font-weight-bolder">
                      <sup class="text-dark-custom">$</sup>73,584
                    </h2>
                  </div>
                </div>
              </b-card-header>
              <vue-apex-charts height="250" :options="lineChartSimple.chartOptions" :series="lineChartSimple.series" />
            </div>
          </b-col>
        </b-row>

        <div class="card py-3 px-2 statistics-card">
          <h2>Onboarding Department</h2>
          <b-table responsive :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields"
            class="table-cr mt-2">
            <template #cell(full_name)="data">
              <b-avatar :src="data.item.avatar" />
              <span class="ml-1">{{ data.value }}</span>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-dropdown :items="data.item.actions" variant="link" toggle-class="text-decoration-none" no-caret
                class="drop-with-trash">
                <template v-slot:button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
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
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm"
              class="my-0" hide-goto-end-buttons />
          </div>
        </div>
      </b-tab>
    </b-tabs>
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
  BImg
} from "bootstrap-vue";
import { $themeColors } from "@themeConfig";
import router from "@/router";
import { ref } from "@vue/composition-api";
const $barColor = "#f3f3f3";
import VueApexCharts from "vue-apexcharts";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import flatPickr from 'vue-flatpickr-component'

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
    AppBreadcrumb,
    flatPickr,
    BImg
  },

  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },

  data() {
    return {
      selectedDate: null,
      perPage: 5,
      totalRows: 1,
      currentPage: 1,
      //   chartjsData,
      //   apexChatData,
      statisticsOrder: {
        series: [
          {
            name: "2020",
            data: [45, 85, 65, 45, 65, 70, 78],
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
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

            // labels: {
            //   show: false,
            // },
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

      lineChartSimple: {
        series: [
          {
            data: [
              280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150,
              100, 50,
            ],
          },
          {
            data: [
              285, 270, 240, 200, 240, 220, 170, 50, 260, 100, 150, 130, 90,
              120, 70,
            ],
          },
        ],
        chartOptions: {
          chart: {
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
          markers: {
            strokeWidth: 7,
            strokeOpacity: 1,
            strokeColors: [$themeColors.light],
            colors: [$themeColors.primary, "#dcdae3"],
          },
          colors: [$themeColors.primary, "#dcdae3"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            dashArray: [0, 5],
            width: [2],
          },
          grid: {
            xaxis: {
              lines: {
                show: false,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
          },
          tooltip: {
            custom(data) {
              return `${'<div class="px-1 py-50"><span>'}${data.series[data.seriesIndex][data.dataPointIndex]
                }%</span></div>`;
            },
          },
          xaxis: {
            categories: [
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
            ],
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            // opposite: isRtl,
          },
        },
      },

      fields: [
        { key: "id", label: "ID#", sortable: true },
        { key: "full_name", label: "Full Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "phone", label: "Phone", sortable: true },
        { key: "status", label: "Status", sortable: true },
        "actions",
      ],
      items: [
        {
          id: 1,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 2,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 3,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 4,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 4,
          actions: "",
        },
        {
          id: 5,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 6,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 7,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 8,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 9,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 10,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 11,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 12,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
      ],
      status: [
        {
          2: "$767.50",
          4: "$928.41",
        },
        {
          2: "light-success",
          4: "light-warning",
        },
      ],
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.tabName = ref(router.currentRoute.query.type);
    // console.log('tab name', this.tabName)
  },
  setup() {
    const tabName = ref(router.currentRoute.query.type);
    const updateTab = (tab) => {
      const url = `${router.currentRoute.path}?type=${tab}`;
      return router.push(url).catch(() => { });
    };

    return {
      tabName,
      updateTab,
    };
  },
};
</script>
