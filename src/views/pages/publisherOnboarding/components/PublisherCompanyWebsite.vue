<template>
  <div class="onboarding-page">
    <b-row class="onboard-height align-items-center">
      <!-- Left Text-->
      <b-col
        lg="5"
        class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center publisher-nav"
      >
        <left-publisher />
      </b-col>
      <b-col
        lg="7"
        class="px-5 cient-content-wrap h-100 d-flex align-items-center "
      >
        <div class="px-xl-2 mx-auto company-site-col client-content">
          <div class="mb-5">
            <img
              class="cursor-pointer"
              src="@/assets/images/icons/arrow-left.svg"
            />
            <b-link
              class="ml-1 text-dark-custom"
              to="/publisher/onboarding/index"
            >
              <small>Back</small>
            </b-link>
          </div>
          <b-card-title title-tag="h1" class="mb-1 title">
            To get started, enter the URL of your company's website.
          </b-card-title>
          <p class="mt-2 mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
            sagittis nibh egestas tristique.
          </p>
          <!-- basic search -->
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text class="publisher-company-search">
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input placeholder="Company Website" />
          </b-input-group>
          <p class="mt-1">
            <small
              >It's okay if you are unsure, you can always edit it later</small
            >
          </p>
          <p class="mt-3 bg-primary text-white pl-2 py-1 rounded">
            <!-- Company Website -->
            {{$store.state.pob.company_website}}
          </p>
          <div class="d-flex align-items-center">
            <p class="align-self-end">This website is</p>
            <b-form-group class="publisher-select">
              <v-select
                v-model="selectedDropdown1"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="publisher_website"
                label="label"
              />
            </b-form-group>
          </div>
          <div class="d-flex align-items-center">
            <p class="align-self-end">I’m interested in</p>
            <b-form-group class="publisher-select">
              <v-select
                v-model="selectedDropdown2"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="publisher_interest"
                label="label"
              />
            </b-form-group>
          </div>
          <b-button class="text-uppercase publisher-next-button" block @click="storeWebisteOptions" :disabled="isDisabled">
            Next
          </b-button>
        </div>
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
  BFormGroup,
  BLink
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import LeftPublisher from "./LeftPublisher.vue";
import { toastAlert } from "@core/mixins/ui/toast";
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
    BFormGroup,
    BLink
  },
  mixins: [toastAlert],
  data() {
    return {
      selectedDropdown1: '',
      selectedDropdown2: '',
      backgroundImg: require("@/assets/images/auth/background.png"),
      publisher_website: [],
      publisher_interest: [],
      isDisabled: false
    };
  },
  methods: {
    storeWebisteOptions() {
      this.isDisabled = true
      this.$http
        .post("store-publisher-options", {
          publisher_website:this.selectedDropdown1.id,
          publisher_interest:this.selectedDropdown2.id,
          publisher_interest_name:this.selectedDropdown2.label
        })
        .then((response) => {
          this.$store.dispatch("pob/myPublisherProfileItem").then(() => {
          });
          this.successToast("Success", 'Publish Interest Saved Successfully!');
          this.$router.push({ path: "/publisher/onboarding/competator-site" });
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    getPublisherDropdownsList() {
      this.$http
        .get("get-publisher-dropdowns-list")
        .then((response) => {
          const { data: { data }} = response
          if(data) {
            this.publisher_interest = data.publish_interest_dropdown
          this.publisher_website = data.publish_website_dropdown
          }

        })
        .catch((error) => {
        });
    },
    getSelectedPublisherDropdown() {
      this.$http
        .get("get-publisher-selected-dropdowns")
        .then((response) => {
          console.log(response.data)
          const { data: { data}} = response
          if(data.dropdown.value){
            this.selectedDropdown1 = data.dropdown.label
          }
          if(data.publisher_interest.label){
            this.selectedDropdown2 = data.publisher_interest.label
          }
        })
        .catch((error) => {
        });
    },
    
  },
  created() {
    this.$store.dispatch("pob/myPublisherProfileItem");
    this.getPublisherDropdownsList()
    this.getSelectedPublisherDropdown()

  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
