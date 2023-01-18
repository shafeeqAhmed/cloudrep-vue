<template>
  <div>
    <b-row class="mb-3">
      <b-col md="8">
        <p class="user-message">Hi {{ user.name }},</p>
        <h1>Welcome to Cloud Rep!</h1>
      </b-col>

      <!-- search-bar -->
      <b-col md="4">
        <div class="input-gradient">
          <b-input-group class="input-group-merge">
            <b-form-input placeholder="Search" />
            <b-input-group-append is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-append>
          </b-input-group>
        </div>
      </b-col>
    </b-row>
    <!-- <IncomingCall/>  -->
    <div class="ag-contact-center main-contcenter">
      <b-row>
        <b-col lg="8" md="10">
          <!-- <incoming-call-window /> -->
        </b-col>
      </b-row>

      <b-row class="align-self-stretched">
        <b-col lg="4" md="4" class="mb-2">
          <dail-pad />
        </b-col>
        <b-col lg="8" md="8" class="mb-2">
          <div class="contactcenter-right">
            <div class="ag-contcenter-cards">
              <b-card>
                <b-card-header>
                  <div class="w-100 d-flex align-items-center justify-content-between">
                    <div>
                      <b-card-title>User Profile</b-card-title>
                    </div>
                    <div>
                      <feather-icon icon="MoreVerticalIcon" size="21" />
                    </div>
                  </div>
                </b-card-header>
                <b-card-body>
                  <div>
                    <b-row>
                      <b-col cols="2">
                        <b-img src="@/assets/images/contact-center/Avatar.png"></b-img>
                      </b-col>
                      <b-col cols="10">
                        <ul class="cont-user-details">
                          <li>
                            <h3>Full Name</h3>
                            <p>Russell Flores</p>
                          </li>
                          <li>
                            <h3>Email Address</h3>
                            <p>russell_1122@gmail.com</p>
                          </li>
                          <li>
                            <h3>Language</h3>
                            <p>English</p>
                          </li>
                          <li>
                            <h3>Fraud Indicators</h3>
                            <p>None</p>
                          </li>
                          <li>
                            <h3>Signed Up</h3>
                            <p>March 23, 2021</p>
                          </li>
                          <li>
                            <h3>Region</h3>
                            <p>US ATL</p>
                          </li>
                        </ul>
                      </b-col>
                    </b-row>
                  </div>
                </b-card-body>
              </b-card>
              <b-card>
                <b-card-header>
                  <div>
                    <b-card-title>Search</b-card-title>
                  </div>
                </b-card-header>
                <b-card-body>
                  <b-row>
                    <b-col md="12">
                      <div class="input-gradient">
                        <b-form-input placeholder="Type Name or Email, Phone Number"></b-form-input>
                      </div>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card>
              <!---/////////////////////////Create Order////////////////////////////////--->
              <b-card>
                <b-card-header>
                  <div>
                    <b-card-title>Create New Order</b-card-title>
                  </div>
                </b-card-header>
                <b-card-body>
                  <b-row class="mb-2">
                    <b-col cols="12">
                      <div class="contactcenter-steps">
                        <ul class="">
                          <li class="" :class="{ 'step-active': step === 1, 'step-done': step > 1 }">
                            <feather-icon class="icon" icon="UserIcon" size="21" />
                            <strong>Customer Information</strong>
                          </li>
                          <li class="" :class="{ 'step-active': step === 2, 'step-done': step > 2 }">
                            <feather-icon class="icon" icon="BriefcaseIcon" size="21" />
                            <strong>Order Information</strong>
                          </li>
                          <li class="" :class="{ 'step-active': step === 3, 'step-done': step > 3 }">
                            <feather-icon class="icon" icon="TruckIcon" size="21" />
                            <strong>Shipping Address</strong>
                          </li>
                          <li class="" :class="{ 'step-active': step === 4, 'step-done': step > 4 }">
                            <feather-icon class="icon" icon="CreditCardIcon" size="21" />
                            <strong>Payment</strong>
                          </li>
                          <li class="" :class="{ 'step-active': step === 5, 'step-done': step > 5 }">
                            <feather-icon class="icon" icon="FlagIcon" size="21" />
                            <strong>Finish</strong>
                          </li>
                        </ul>
                      </div>
                    </b-col>
                  </b-row>
                  <!--=================-->
                  <!-- <CustomerInfo v-show="step === 1" /> -->
                  <transition name="slide-fade">
                    <div v-show="(step === 1)">
                      <CustomerInfo />
                      <b-row>
                        <b-col sm="12">
                          <b-button @click.prevent="next()" variant="primary">Next</b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </transition>
                  <!-- <OrderInfo v-show="step === 2" /> -->
                  <transition name="slide-fade">
                    <div class="" v-show="step === 2">
                      <Orderinfo />
                      <b-row>
                        <b-col sm="12">
                          <b-button @click.prevent="prev()" class="primary-btn mr-1">Prev</b-button>
                          <b-button @click.prevent="next()" class="primary-btn">Next</b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </transition>
                  <!-- <ShippingAddress v-show="step === 3" /> -->
                  <transition name="slide-fade">
                    <div v-show="step === 3">
                      <ShippingAddress />
                      <b-row>
                        <b-col sm="12">
                          <b-button @click.prevent="prev()" class="primary-btn mr-1">Prev</b-button>
                          <b-button @click.prevent="next()" class="primary-btn">Next</b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </transition>
                  <!-- <Payment v-show="step === 4"/> -->
                  <transition name="slide-fade">
                    <div v-show="step === 4">
                      <Payment />
                      <b-row>
                        <b-col sm="12">
                          <b-button @click.prevent="prev()" class="primary-btn mr-1">Prev</b-button>
                          <b-button @click.prevent="next()" class="primary-btn">Next</b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </transition>
                  <!-- <Finish v-show="step === 5" /> -->
                  <transition name="slide-fade">
                    <b-row v-show="step === 5">
                      <b-col cols="12">
                        <div class="text-center py-3">
                          <svg width="142" height="142" viewBox="0 0 142 142" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M44.4959 24.5306C49.063 24.1659 53.3987 22.3695 56.8854 19.3973C60.8235 16.0432 65.8273 14.201 71.0002 14.201C76.173 14.201 81.1769 16.0432 85.115 19.3973C88.6017 22.3695 92.9373 24.1659 97.5045 24.5306C102.662 24.9428 107.504 27.1786 111.163 30.8372C114.822 34.4959 117.057 39.3381 117.47 44.4958C117.832 49.0611 119.628 53.3992 122.603 56.8853C125.957 60.8234 127.799 65.8272 127.799 71.0001C127.799 76.1729 125.957 81.1768 122.603 85.1149C119.631 88.6016 117.834 92.9372 117.47 97.5043C117.057 102.662 114.822 107.504 111.163 111.163C107.504 114.822 102.662 117.057 97.5045 117.47C92.9373 117.834 88.6017 119.631 85.115 122.603C81.1769 125.957 76.173 127.799 71.0002 127.799C65.8273 127.799 60.8235 125.957 56.8854 122.603C53.3987 119.631 49.063 117.834 44.4959 117.47C39.3382 117.057 34.496 114.822 30.8374 111.163C27.1787 107.504 24.9429 102.662 24.5307 97.5043C24.166 92.9372 22.3697 88.6016 19.3974 85.1149C16.0433 81.1768 14.2012 76.1729 14.2012 71.0001C14.2012 65.8272 16.0433 60.8234 19.3974 56.8853C22.3697 53.3985 24.166 49.0629 24.5307 44.4958C24.9429 39.3381 27.1787 34.4959 30.8374 30.8372C34.496 27.1786 39.3382 24.9428 44.4959 24.5306ZM97.3199 61.8198C98.6132 60.4807 99.3288 58.6872 99.3127 56.8256C99.2965 54.964 98.5498 53.1832 97.2334 51.8668C95.917 50.5504 94.1362 49.8037 92.2746 49.7876C90.413 49.7714 88.6196 50.487 87.2805 51.7804L63.9002 75.1607L54.7199 65.9804C53.3808 64.687 51.5873 63.9714 49.7257 63.9876C47.8641 64.0037 46.0834 64.7504 44.767 66.0668C43.4506 67.3832 42.7039 69.164 42.6877 71.0256C42.6715 72.8872 43.3872 74.6807 44.6805 76.0198L58.8805 90.2197C60.2119 91.5508 62.0175 92.2985 63.9002 92.2985C65.7828 92.2985 67.5884 91.5508 68.9199 90.2197L97.3199 61.8198Z"
                              fill="#10B981" />
                          </svg>
                          <h2 class="mt-2 mb-2">Order Completed</h2>
                          <p class="mb-1">Thank you for provinding your personal information</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br> Diam placerat dui sed blandit
                            ullamcorper accumsan. </p>
                        </div>
                      </b-col>
                    </b-row>
                  </transition>
                  <!--=================-->
                </b-card-body>
              </b-card>
              <!---/////////////////////////Create Order////////////////////////////////--->
            </div>
          </div>
        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
  BFormGroup,
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
  BModal,
  BFormTextarea,
  BFormFile,
  BFormDatepicker
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
import DailPad from './DailPad.vue'
// import IncomingCall from './IncomingCall.vue'
import card from './components/card.vue'
import { GridLayout, GridItem } from "vue-grid-layout"
import vSelect from "vue-select";
import CustomerInfo from './OrderComponents/CustomerInfo.vue'
import Orderinfo from './OrderComponents/Orderinfo.vue'
import ShippingAddress from './OrderComponents/ShippingAddress.vue'
import Payment from './OrderComponents/Payment.vue'
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardText,
    BLink,
    BFormGroup,
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
    BModal,
    BFormTextarea,
    BFormFile,
    DailPad,
    GridLayout,
    GridItem,
    card,
    // IncomingCall,
    vSelect,
    BFormDatepicker,
    CustomerInfo,
    Orderinfo,
    ShippingAddress,
    Payment
  },
  data() {
    return {
      device: {},
      inCommingCall: false,
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
      steps: {},
      step: 1,
    };
  },
  methods: {
    prev() {
      this.step--;
    },

    next() {
      this.step++;
    },
    /* Hook up the agent Activity buttons to Worker.js */
    /* Update the UI to reflect a change in Activity */

    pressDigit(digit) {
      const audio = new Audio("https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-1.mp3");
      audio.play()
    },
  },
  created() {
    this.user = getUserData()
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoidjEiLCJmcmllbmRseV9uYW1lIjoiV0s1MjNkOWQ3ZDM4MzFiYmQ2YTFhM2I5ZGVjNWU2OWVhNSIsImlzcyI6IkFDMDFhMWE0ZjA3YzBjMDA5YTJiMmUxMmJiZGVlYWI0NjUiLCJleHAiOjE2NTY4MTIxNTgsImFjY291bnRfc2lkIjoiQUMwMWExYTRmMDdjMGMwMDlhMmIyZTEyYmJkZWVhYjQ2NSIsImNoYW5uZWwiOiJXSzUyM2Q5ZDdkMzgzMWJiZDZhMWEzYjlkZWM1ZTY5ZWE1Iiwid29ya3NwYWNlX3NpZCI6IldTMzE1MmMwZjQxYzg0NzA2MTk5ZDRkYmQ4MmVkNjgzYjMiLCJ3b3JrZXJfc2lkIjoiV0s1MjNkOWQ3ZDM4MzFiYmQ2YTFhM2I5ZGVjNWU2OWVhNSIsInBvbGljaWVzIjpbeyJ1cmwiOiJodHRwczpcL1wvZXZlbnQtYnJpZGdlLnR3aWxpby5jb21cL3YxXC93c2NoYW5uZWxzXC9BQzAxYTFhNGYwN2MwYzAwOWEyYjJlMTJiYmRlZWFiNDY1XC9XSzUyM2Q5ZDdkMzgzMWJiZDZhMWEzYjlkZWM1ZTY5ZWE1IiwibWV0aG9kIjoiR0VUIiwiYWxsb3ciOnRydWV9LHsidXJsIjoiaHR0cHM6XC9cL2V2ZW50LWJyaWRnZS50d2lsaW8uY29tXC92MVwvd3NjaGFubmVsc1wvQUMwMWExYTRmMDdjMGMwMDlhMmIyZTEyYmJkZWVhYjQ2NVwvV0s1MjNkOWQ3ZDM4MzFiYmQ2YTFhM2I5ZGVjNWU2OWVhNSIsIm1ldGhvZCI6IlBPU1QiLCJhbGxvdyI6dHJ1ZX0seyJ1cmwiOiJodHRwczpcL1wvdGFza3JvdXRlci50d2lsaW8uY29tXC92MVwvV29ya3NwYWNlc1wvV1MzMTUyYzBmNDFjODQ3MDYxOTlkNGRiZDgyZWQ2ODNiM1wvV29ya2Vyc1wvV0s1MjNkOWQ3ZDM4MzFiYmQ2YTFhM2I5ZGVjNWU2OWVhNSIsIm1ldGhvZCI6IkdFVCIsImFsbG93Ijp0cnVlfSx7InVybCI6Imh0dHBzOlwvXC90YXNrcm91dGVyLnR3aWxpby5jb21cL3YxXC9Xb3Jrc3BhY2VzXC9XUzMxNTJjMGY0MWM4NDcwNjE5OWQ0ZGJkODJlZDY4M2IzXC9BY3Rpdml0aWVzIiwibWV0aG9kIjoiR0VUIiwiYWxsb3ciOnRydWV9LHsidXJsIjoiaHR0cHM6XC9cL3Rhc2tyb3V0ZXIudHdpbGlvLmNvbVwvdjFcL1dvcmtzcGFjZXNcL1dTMzE1MmMwZjQxYzg0NzA2MTk5ZDRkYmQ4MmVkNjgzYjNcL1Rhc2tzXC8qKiIsIm1ldGhvZCI6IkdFVCIsImFsbG93Ijp0cnVlfSx7InVybCI6Imh0dHBzOlwvXC90YXNrcm91dGVyLnR3aWxpby5jb21cL3YxXC9Xb3Jrc3BhY2VzXC9XUzMxNTJjMGY0MWM4NDcwNjE5OWQ0ZGJkODJlZDY4M2IzXC9Xb3JrZXJzXC9XSzUyM2Q5ZDdkMzgzMWJiZDZhMWEzYjlkZWM1ZTY5ZWE1XC9SZXNlcnZhdGlvbnNcLyoqIiwibWV0aG9kIjoiR0VUIiwiYWxsb3ciOnRydWV9LHsidXJsIjoiaHR0cHM6XC9cL3Rhc2tyb3V0ZXIudHdpbGlvLmNvbVwvdjFcL1dvcmtzcGFjZXNcL1dTMzE1MmMwZjQxYzg0NzA2MTk5ZDRkYmQ4MmVkNjgzYjNcL1dvcmtlcnNcL1dLNTIzZDlkN2QzODMxYmJkNmExYTNiOWRlYzVlNjllYTVcLyoqIiwibWV0aG9kIjoiR0VUIiwiYWxsb3ciOnRydWUsInF1ZXJ5X2ZpbHRlciI6e30sInBvc3RfZmlsdGVyIjp7fX0seyJ1cmwiOiJodHRwczpcL1wvdGFza3JvdXRlci50d2lsaW8uY29tXC92MVwvV29ya3NwYWNlc1wvV1MzMTUyYzBmNDFjODQ3MDYxOTlkNGRiZDgyZWQ2ODNiM1wvV29ya2Vyc1wvV0s1MjNkOWQ3ZDM4MzFiYmQ2YTFhM2I5ZGVjNWU2OWVhNSIsIm1ldGhvZCI6IlBPU1QiLCJhbGxvdyI6dHJ1ZSwicXVlcnlfZmlsdGVyIjp7fSwicG9zdF9maWx0ZXIiOnsiQWN0aXZpdHlTaWQiOnsicmVxdWlyZWQiOnRydWV9fX0seyJ1cmwiOiJodHRwczpcL1wvdGFza3JvdXRlci50d2lsaW8uY29tXC92MVwvV29ya3NwYWNlc1wvV1MzMTUyYzBmNDFjODQ3MDYxOTlkNGRiZDgyZWQ2ODNiM1wvVGFza3NcLyoqIiwibWV0aG9kIjoiUE9TVCIsImFsbG93Ijp0cnVlLCJxdWVyeV9maWx0ZXIiOnt9LCJwb3N0X2ZpbHRlciI6e319LHsidXJsIjoiaHR0cHM6XC9cL3Rhc2tyb3V0ZXIudHdpbGlvLmNvbVwvdjFcL1dvcmtzcGFjZXNcL1dTMzE1MmMwZjQxYzg0NzA2MTk5ZDRkYmQ4MmVkNjgzYjNcL1dvcmtlcnNcL1dLNTIzZDlkN2QzODMxYmJkNmExYTNiOWRlYzVlNjllYTVcL1Jlc2VydmF0aW9uc1wvKioiLCJtZXRob2QiOiJQT1NUIiwiYWxsb3ciOnRydWUsInF1ZXJ5X2ZpbHRlciI6e30sInBvc3RfZmlsdGVyIjp7fX1dfQ.ymDkyr0WEnEauIf1H1UPbZgC5h-qB5Gn2T7MVCO6TfA"

    // const worker = new Twilio.TaskRouter.Worker(token);
    // worker.on('ready', function (worker) {
    //   // agentActivityChanged(worker.activityName);
    //   logger("Successfully registered as: " + worker.friendlyName)
    //   logger("Current activity is: " + worker.activityName);
    // });

    // worker.on('activity.update', function(worker) {
    //     agentActivityChanged(worker.activityName);
    //     logger("Worker activity changed to: " + worker.activityName);
    // });

    // worker.on("reservation.created", function(reservation) {
    //   logger("-----");
    //   logger("You have been reserved to handle a call!");
    //   logger("Call from: " + reservation.task.attributes.from);
    //   logger("Selected language: " + reservation.task.attributes.selected_language);
    //   logger("-----");
    // });

    // worker.on("reservation.accepted", function(reservation) {
    //   logger("Reservation " + reservation.sid + " accepted!");
    // });

    // worker.on("reservation.rejected", function(reservation) {
    //   logger("Reservation " + reservation.sid + " rejected!");
    // });

    // worker.on("reservation.timeout", function(reservation) {
    //   logger("Reservation " + reservation.sid + " timed out!");
    // });

    // worker.on("reservation.canceled", function(reservation) {
    //   logger("Reservation " + reservation.sid + " canceled!");
    // });









    // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQ1ZTU3YzU3ZjkyM2U1YzNjMDkwM2Y0OGI3MGJhOWRlLTE2NTYwOTUyNjMiLCJpc3MiOiJTSzQ1ZTU3YzU3ZjkyM2U1YzNjMDkwM2Y0OGI3MGJhOWRlIiwic3ViIjoiQUMwMWExYTRmMDdjMGMwMDlhMmIyZTEyYmJkZWVhYjQ2NSIsImV4cCI6MTY1NjA5ODg2MywiZ3JhbnRzIjp7ImlkZW50aXR5IjoiZGFmZmRmd2Vyd2VkcyIsInZvaWNlIjp7ImluY29taW5nIjp7ImFsbG93Ijp0cnVlfX19fQ.9xiFGXMZXoBurnrRN4p3y0AhuwO4KVxg8T4K7o_HtDk"

    // this.device = new Device(accessToken, {
    //   logLevel: 1,
    //   // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
    //   // providing better audio quality in restrained network conditions.
    //   codecPreferences: ["opus", "pcmu"]
    // });

    // const handleSuccessfulRegistration = () => {
    //   console.log('The device is ready to receive incoming calls.')
    // }

    // this.device.register();
    // this.device.on('registered', handleSuccessfulRegistration);


    // this.device.on('error', (twilioError, call) => {
    //   console.log('An error has occurred: ', twilioError);
    // });

    // this.device.on('incoming', call => {
    //   console.log('call received-----------------')
    //   console.log(call)
    //   this.inCommingCall = true
    // });
  },
  // setup() {
  //   const user = getUserData()
  //   const APP_STORE_MODULE_NAME = 'contactCenter'

  //   // Register module
  //   if (!store.hasModule(APP_STORE_MODULE_NAME)) store.registerModule(APP_STORE_MODULE_NAME, contactCenterStoreModule)

  //   // UnRegister on leave
  //   onUnmounted(() => {
  //     if (store.hasModule(APP_STORE_MODULE_NAME)) store.unregisterModule(APP_STORE_MODULE_NAME)
  //   })

  //   const { startupClient, token } = contactCenterLogic()

  //   startupClient()
  //   return {
  //     startupClient,
  //     user,
  //     token
  //   }
  // },

}
</script>