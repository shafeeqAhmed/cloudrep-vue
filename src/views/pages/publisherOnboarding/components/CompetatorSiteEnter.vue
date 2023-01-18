<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col
        lg="5"
        class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center publisher-nav"
      >
        <left-publisher />
      </b-col>
      <b-col
        lg="7"
        class="px-5 cient-content-wrap h-100 d-flex align-items-center"
      >
        <div class="px-xl-2 mx-auto company-site-col client-content">
          <div class="mb-5">
            <img
              class="cursor-pointer"
              src="@/assets/images/icons/arrow-left.svg"
            />
            <b-link class="ml-1 text-dark-custom" >
              <small>Back</small>
            </b-link>
          </div>
          <b-card-title title-tag="h1" class="mb-1 title">
            Choose a set of competators to compete against the website of
            interest define in the previous step
          </b-card-title>
          <p class="mt-2 mb-5">
            Now let's define the competition, Type their website
          </p>
          <!-- basic search -->
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text class="publisher-company-search">
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input placeholder="Company Website" v-on:keyup.enter="storeCompetators()"/>
          </b-input-group>
          <p class="mt-1">
            <small
              >It's okay if you are unsure, you can always edit it later</small
            >
          </p>
          <p class="mt-2 bg-primary text-white pl-2 py-1 rounded">
            Company Website
          </p>
          <!-- <p class="mt-2 bg-primary text-white pl-2 py-1 rounded">
            Company Website
          </p>
          <p class="mt-2 bg-primary text-white pl-2 py-1 rounded">
            Company Website
          </p> -->
          <b-button
            variant="primary"
            class="text-uppercase publisher-next-competatotr-btn"
            block
          >
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
  BLink
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import LeftPublisher from "./LeftPublisher.vue";
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
    BLink
  },
  data() {
    return {
      selected: { title: "Square" },
      competator: '',
      backgroundImg: require("@/assets/images/auth/background.png"),
      option: [
        { title: "Square" },
        { title: "Rectangle" },
        { title: "Rombo" },
        { title: "Romboid" },
      ],
    };
  },
  methods: {
    storeCompetators(e) {
      console.log('key enter function is --------------------')
      this.competator = e.target.value
      console.log(this.competator)
    }
  },
  created() {
    this.$store.dispatch("pob/myPublisherProfileItem").then(() => {});
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
