<template>
  <div class="offer-wall-view">
    <b-row class="align-items-center mb-2">
      <b-col md="10"> 
        <h1>Offer Wall Detail</h1>
      </b-col>
      <b-col md="2">
        <b-button variant="primary" class="register-btn">
          Register
        </b-button>
      </b-col>
    </b-row>

    <b-tabs pills class="tabs-cr">
      <hr />
      <b-tab title="Overview" class="card p-3" :active="tabName == 'overview'">
        <overview :campaign='campaign' :user='user'/>
      </b-tab>
      <b-tab
        title="Campaign Details"
        class="card p-3"
        :active="tabName == 'detail'"
      >
        <Detail :campaign='campaign'/>
      </b-tab>
      <b-tab
        title="Pre-requisite"
        class="card p-3"
        :active="tabName == 'detail'"
      >
        <CourseDetail :campaign='campaign' :user='user'/>
      </b-tab>
      <b-tab
        title="Payout"
        class="card p-3"
        :active="tabName == 'payout'"
        v-if="this.user.role == 'agent' || this.user.role == 'publisher'"
      >
        <Payout :campaign='campaign'/>
      </b-tab>
      <b-tab
        title="Pricing Details"
        class="card p-3"
        :active="tabName == 'pricing'"
        v-if="this.user.role == 'client'"
      >
        <Pricing :campaign='campaign'/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {
  BFormDatepicker,
  BTable,
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BDropdown,
  BDropdownItem,
  BTabs,
  BTab,
  BCardText,
} from "bootstrap-vue";
import router from "@/router";

import store from "@/store";
import { ref, onUnmounted, computed, onMounted } from "@vue/composition-api";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import { getUserData } from '@/auth/utils';
import Overview from "./components/Overview.vue";
import Detail from "./components/Detail.vue";
import CourseDetail from "./components/CourseDetail.vue";
import Payout from "./components/Payout.vue";
import Pricing from "./components/Pricing.vue";
import flatPickr from "vue-flatpickr-component";

export default {
  components: {
    BFormDatepicker,
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BTabs,
    BTab,
    BCardText,
    flatPickr,
    AppBreadcrumb,
    Overview,
    Detail,
    Payout,
    Pricing,
    CourseDetail
  },
  data() {
    return {
      selectedDate: null,
      tabName: "",

      sortDirection: "asc",
      filterOn: [],
      campaign: [],
      user: [],
    };
  },

  mounted() {
    // Set the initial number of items
    this.tabName = ref(router.currentRoute.query.type);
    // console.log('tab name', this.tabName)
  },
  methods: {
    fetchRecord() {
      const url = this.$route.params.uuid;
      this.$http
        .get(`get-single-campaign/${url}`)
        .then((response) => {
          const {
            data: {
              data: { campaign },
            },
          } = response;
        //   console.log('----------------sjdfgsjfgkj')
        //   console.log(campaign)
          this.campaign = campaign;
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
  },
  mounted() {
    this.fetchRecord();
  },
  created() {
    this.user = getUserData()
  },
};
</script>

<style>
</style>