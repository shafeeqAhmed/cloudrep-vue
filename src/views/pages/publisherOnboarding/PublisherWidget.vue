<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col
        lg="4"
        :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
        class="d-none d-lg-flex align-items-center py-5 px-4 publisher-text"
      >
      </b-col>
      <b-col
        lg="8"
        class="d-flex align-items-center auth-bg px-0 p-lg-5 py-3 py-lg-0"
      >
        <b-col sm="12" md="12" lg="12" class="px-xl-2 mx-auto">
          <div class="mb-5">
            <img
              class="cursor-pointer"
              src="@/assets/images/icons/arrow-left.svg"
            />
            <b-link class="ml-1 text-dark-custom" @click="logout">
              <small>Back</small>
            </b-link>
          </div>
          <b-card-title title-tag="h1" class="mb-1 title">
            Edit according to your need
          </b-card-title>
          <p class="mt-2 mb-3">
            Create your own dashboard or choose from predefined ones
          </p>
          <b-nav class="mb-3">
            <b-nav-item active> Active </b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
          </b-nav>
          <div class="d-flex">
            <b-input-group class="input-group-merge mb-3 mr-2 w-50">
              <b-input-group-prepend is-text class="publisher-company-search">
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input placeholder="Company Website" />
            </b-input-group>
            <b-button variant="primary">search</b-button>
          </div>
          <b-row>
            <b-col md="6" lg="6">
              <b-card-title title-tag="h3" class="my-2">
                Selected Metrics
              </b-card-title>
              <b-form-group>
                <v-select
                  v-model="selected"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="option"
                />
              </b-form-group>
              <b-card-title title-tag="h4" class="my-2">
                Websites
              </b-card-title>
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text class="publisher-company-search">
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input placeholder="Add Website" />
              </b-input-group>
              <p class="mt-1">
                <small
                  >It's okay if you are unsure, you can always edit it
                  later</small
                >
              </p>
              <p class="mt-2 bg-primary text-white pl-2 py-1 rounded">
                Company Website
              </p>
              <p class="mt-2 bg-primary text-white pl-2 py-1 rounded">
                Company Website
              </p>
              <p class="mt-2 bg-primary text-white pl-2 py-1 rounded">
                Company Website
              </p>
              <b-button
                variant="primary"
                class="text-uppercase publisher-next-competatotr-btn"
                block
              >
                Next
              </b-button>
            </b-col>
            <b-col md="6" lg="6">
              <b-card-title title-tag="h3" class="mb-1"> Preview </b-card-title>
              <p class="mt-2 mb-3">Lorem Ipsum</p>

              <!-- apex chart -->
              <!-- <vue-apex-charts
                type="pie"
                height="325"
                class="mt-2 mb-1"
                :options="customersPie.chartOptions"
                :series="customersPie.series"
              /> -->

              <!-- list group -->
              <!-- <div class="pt-25">
                <div
                  v-for="(data, index) in chartData.listData"
                  :key="index"
                  class="d-flex justify-content-between"
                  :class="
                    index === Object.keys(chartData.listData).length - 1
                      ? ''
                      : 'mb-1'
                  "
                >
                  <div class="series-info">
                    <feather-icon
                      :icon="data.icon"
                      size="16"
                      class="mr-50"
                      :class="data.iconColor"
                    />
                    <span class="font-weight-bolder">{{ data.text }}</span>
                  </div>
                  <span>{{ data.result }}</span>
                </div>
              </div> -->
            </b-col>
          </b-row>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template> 
<script>
import {
  BRow,
  BCol,
  BImg,
  BCardTitle,
  BFormInput,
  BInputGroupPrepend,
  BInputGroup,
  BButton,
  BCard,
  BCardText,
  BNav,
  BNavItem,
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import VueApexCharts from 'vue-apexcharts'
import LeftPublisher from "./components/LeftPublisher.vue";
import vSelect from "vue-select";
export default {
  components: {
    BRow,
    BCol,
    BImg,
    BCardTitle,
    BFormInput,
    BInputGroupPrepend,
    BInputGroup,
    BButton,
    LeftPublisher,
    vSelect,
    BCard,
    BNav,
    BNavItem,
    BCardText,
    VueApexCharts,
  },
  data() {
    return {
      selected: { title: "Square" },
      backgroundImg: require("@/assets/images/auth/background.png"),
      option: [
        { title: "Square" },
        { title: "Rectangle" },
        { title: "Rombo" },
        { title: "Romboid" },
      ],
      // chartData: {},
      // customersPie: {
      //   series: [690, 258, 149],
      //   chartOptions: {
      //     chart: {
      //       toolbar: {
      //         show: false,
      //       },
      //     },
      //     labels: ['New', 'Returning', 'Referrals'],
      //     dataLabels: {
      //       enabled: false,
      //     },
      //     legend: { show: false },
      //     stroke: {
      //       width: 4,
      //     },
      //     colors: [$themeColors.primary, $themeColors.warning, $themeColors.danger],
      //   },
      // },
    }
  },
//    created() {
//     this.$http.get('/card/card-analytics/customers').then(res => { this.chartData = res.data })
//   },
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
