<template>
  <!-- Complete Home Component Backup -->
  <div>
    <b-row class="mb-3">
      <b-col md="8">
        <p class="user-message">Hi {{ user.name }},</p>
        <h1>Welcome to Cloud Rep!</h1>
      </b-col>

      <!-- search-bar -->
      <b-col md="4">
        <b-input-group class="input-group-merge">
          <b-form-input placeholder="Search" />
          <b-input-group-append is-text>
            <feather-icon icon="SearchIcon" class="text-muted" />
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="align-self-stretched">
      <b-col lg="4" md="12" class="mb-2">
        <b-card no-body class="card-browser-states statistics-card py-3 h-100">
          <div
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <b-card-header>
              <div>
                <b-card-title
                  class="font-weight-bolder font-medium-5 text-center"
                >
                  078337 293 839
                </b-card-title>
                <b-card-sub-title class="mt-1 text-center">
                  Call Duration :
                  <span>06:47</span>
                </b-card-sub-title>
              </div>
            </b-card-header>
            <b-card-body>
              <b-img
                src="@/assets/images/dashboard/call-graph.png"
                alt="Calling"
                class="mt-3 mb-4"
              />
              <b-media no-body class="justify-content-center">
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="bg-skyblue cursor-pointer">
                    <feather-icon
                      class="font-medium-5 text-dark"
                      size="24"
                      icon="MicIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="bg-skyblue cursor-pointer">
                    <feather-icon
                      class="font-medium-5 text-dark"
                      size="24"
                      icon="Volume2Icon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="bg-skyblue cursor-pointer">
                    <feather-icon
                      class="font-medium-5 text-danger"
                      size="24"
                      icon="PhoneOffIcon"
                    />
                  </b-avatar>
                </b-media-aside>
              </b-media>
            </b-card-body>
          </div>
        </b-card>
      </b-col>
      <b-col lg="8" md="12" class="mb-2">
        <b-card no-body class="card-browser-states statistics-card px-2 h-100">
          <b-card-header>
            <div>
              <b-card-title>User Profile</b-card-title>
            </div>

            <b-dropdown
              variant="link"
              no-caret
              class="chart-dropdown"
              toggle-class="p-0"
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

          <!-- body -->
          <b-card-body>
            <b-row>
              <b-col lg="4" md="4" class="text-center">
                <b-img
                  src="@/assets/images/avatars/Avatar.png"
                  alt="browser img"
                  width="128"
                  height="128"
                />
              </b-col>
              <b-col lg="4" md="4">
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Name
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      Russell Flores
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Language
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      English
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Fraud Indicator
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      None
                    </h4>
                  </b-media-body>
                </b-media>
              </b-col>
              <b-col lg="4" md="4">
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Email
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      russel_1211@gmail.com
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Region
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      US ATL
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Signed Up
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      March 30,2022
                    </h4>
                  </b-media-body>
                </b-media>
              </b-col>
            </b-row>
          </b-card-body>
          <!--/ body -->
        </b-card>
      </b-col>
    </b-row>

    <b-row class="align-self-stretched">
      <b-col lg="4" md="12" class="mb-2">
        <b-card no-body class="card-browser-states statistics-card h-100">
          <b-card-header>
            <div>
              <b-card-title>Live Chat</b-card-title>
            </div>

            <b-dropdown
              variant="link"
              no-caret
              class="chart-dropdown"
              toggle-class="p-0"
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

          <!-- body -->
          <b-card-body>
            <div class="d-flex mb-2">
              <div class="mr-1">
                <b-img
                  class="live-chat-img"
                  src="@/assets/images/avatars/1.png"
                  alt="browser img"
                />
              </div>
              <div class="description-content">
                <h6 class="align-self-center my-auto">Wade Warren</h6>
                <p>Pretium duis rula aliquet.</p>
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="mr-1">
                <b-img
                  class="live-chat-img"
                  src="@/assets/images/avatars/1.png"
                  alt="browser img"
                />
              </div>
              <div class="description-content">
                <h6 class="align-self-center my-auto">Wade Warren</h6>
                <p>Pretium duis rula aliquet.</p>
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="mr-1">
                <b-img
                  class="live-chat-img"
                  src="@/assets/images/avatars/1.png"
                  alt="browser img"
                />
              </div>
              <div class="description-content">
                <h6 class="align-self-center my-auto">Wade Warren</h6>
                <p>Pretium duis rula aliquet.</p>
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="description-content-rtl text-right">
                <h6 class="align-self-center my-auto text-light">You</h6>
                <p>Pretium duis rula aliquet.</p>
              </div>
              <div class="ml-1">
                <b-img
                  class="live-chat-img"
                  src="@/assets/images/avatars/2.png"
                  alt="browser img"
                />
              </div>
            </div>
          </b-card-body>
          <!--/ body -->
        </b-card>
      </b-col>
      <b-col lg="8" md="12" class="mb-2">
        <b-card no-body class="card-browser-states statistics-card px-2 h-100">
          <b-card-header>
            <div>
              <b-card-title>Company Detail</b-card-title>
            </div>

            <b-dropdown
              variant="link"
              no-caret
              class="chart-dropdown"
              toggle-class="p-0"
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

          <!-- body -->
          <b-card-body>
            <b-row>
              <b-col md="6">
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Name
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      Russell Flores
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Language
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      English
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Fraud Indicator
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      None
                    </h4>
                  </b-media-body>
                </b-media>
              </b-col>
              <b-col md="6">
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Email
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      russel_1211@gmail.com
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Region
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      US ATL
                    </h4>
                  </b-media-body>
                </b-media>
                <b-media no-body class="mb-3">
                  <b-media-body class="my-auto">
                    <b-card-text class="font-medium-1 text-uppercase mb-0">
                      Signed Up
                    </b-card-text>
                    <h4 class="font-weight-bolder font-medium-1 font mb-0">
                      March 30,2022
                    </h4>
                  </b-media-body>
                </b-media>
              </b-col>
              <b-col md="12"></b-col>
            </b-row>
          </b-card-body>
          <!--/ body -->
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
  BFormCheckbox,
  BBadge,
  BButton,
  // BCardSubTitle
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import "@/assets/css/contact-center.css";
import ChartjsComponentBarChart from "../charts-components/ChartjsComponentBarChart.vue";
import ChartjsComponentDoughnutChart from "../charts-components/ChartjsComponentDoughnutChart.vue";
import ChartjsComponentPolarAreaChart from "../charts-components/ChartjsComponentPolarAreaChart.vue";
import VueApexCharts from "vue-apexcharts";
import apexChatData from "../charts-components/apex-chart/apexChartData";
import chartjsData from "../charts-components/chartjsData";
import Client from "../client/Client.vue";
import { getUserData } from '@/auth/utils'

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
    ChartjsComponentDoughnutChart,
    VueApexCharts,
    BDropdown,
    BDropdownItem,
    BTable,
    BFormCheckbox,
    Client,
    BBadge,
    BButton,
    // BCardSubTitle
  },
  data() {
    return {
      user: {},
      chartjsData,
      apexChatData,
      fields: [
        { key: "id", label: "#" },
        { key: "client", label: "CLient Name" },
        { key: "date", label: "Date" },
        { key: "time", label: "Time" },
        { key: "duration", label: "Duration" },
        { key: "status", label: "Status" },
      ],
      stockData: [
        {
          device: "Total Calls",
          symbol: "BoxIcon",
          color: "text-primary",
          percentage: 80,
          upDown: 2,
        },
        {
          device: "Waiting Calls",
          symbol: "BoxIcon",
          color: "text-warning",
          percentage: 10,
          upDown: 8,
        },
        {
          device: "Drop Calls",
          symbol: "BoxIcon",
          color: "text-success",
          percentage: 10,
          upDown: -5,
        },
      ],
      tableData: [
        {
          id: 1,
          avatarIcon: "PhoneIncomingIcon",
          avatarColor: "light-success",
          clientName: "Esther Howard",
          date: "Today",
          time: "1:00",
          duration: "68:05",
          status: 2,
        },
        {
          id: 2,
          avatarIcon: "PhoneIncomingIcon",
          avatarColor: "light-danger",
          clientName: "Esther Howard",
          date: "Today",
          time: "1:00",
          duration: "68:05",
          status: 1,
        },
        {
          id: 3,
          avatarIcon: "PhoneIncomingIcon",
          avatarColor: "light-danger",
          clientName: "Esther Howard",
          date: "Today",
          time: "1:00",
          duration: "68:05",
          status: 3,
        },
        {
          id: 4,
          avatarIcon: "PhoneIncomingIcon",
          avatarColor: "light-success",
          clientName: "Esther Howard",
          date: "Today",
          time: "1:00",
          duration: "68:05",
          status: 2,
        },
        {
          id: 5,
          avatarIcon: "PhoneIncomingIcon",
          avatarColor: "light-success",
          clientName: "Esther Howard",
          date: "Today",
          time: "1:00",
          duration: "68:05",
          status: 2,
        },
        {
          id: 6,
          avatarIcon: "PhoneIncomingIcon",
          avatarColor: "light-danger",
          clientName: "Esther Howard",
          date: "Today",
          time: "1:00",
          duration: "68:05",
          status: 1,
        },
      ],
      status: [
        {
          1: "Warm",
          2: "Cold",
          3: "Hot",
        },
        {
          1: "light-primary",
          2: "light-success",
          3: "light-danger",
        },
      ],
      // rangePicker: ["2019-05-01", "2019-05-10"],
    };
  },
    created() {
    this.user = getUserData()
  }
};
</script>

<style scoped>
</style>
