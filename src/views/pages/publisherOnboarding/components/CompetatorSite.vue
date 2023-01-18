<template>
  <div class="onboarding-page">
    <b-row class="onboard-height align-items-center">
      <!-- Left Text-->
      <b-col lg="5" class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center publisher-nav" >
        <left-publisher />
      </b-col>
      <b-col lg="7" class="px-5 cient-content-wrap h-100 d-flex align-items-center" >
        <div class="px-xl-2 mx-auto company-site-col client-content">
          <div class="mb-5">
            <img
              class="cursor-pointer"
              src="@/assets/images/icons/arrow-left.svg"
            />
            <b-link
              class="ml-1 text-dark-custom"
              to="/publisher/onboarding/publisher-company-site"
            >
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
            <b-form-input
              placeholder="Company Website"
              v-on:keyup.enter="storeCompetators"
            />
          </b-input-group>
          <p class="mt-1">
            <small
              >It's okay if you are unsure, you can always edit it later</small
            >
          </p>
          <!-- <div v-if="listCompetators"> -->
          <div v-for="competator in listCompetators" :key="competator.uuid">
            <p class="mt-3 bg-primary text-white pl-2 py-1 rounded">
              {{ competator.url }}
            </p>
            <!-- </div> -->
          </div>
          <b-button
            variant="primary"
            class="text-uppercase submit-btn publisher-finish-btn"
            block
            :disabled="isDisabled"
            @click="gotoDashboard"
          >
            Finish
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
  BLink,
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
    BLink,
  },
  mixins: [toastAlert],
  data() {
    return {
      competator: "",
      listCompetators: [],
      isDisabled: false,
      backgroundImg: require("@/assets/images/auth/background.png"),
    };
  },
  methods: {
    storeCompetators(e) {
      this.competator = e.target.value;
      if (this.competator) {
        if (this.listCompetators.length < 10) {
          this.$http
            .post("store-publisher-competators", {
              url: this.competator,
            })
            .then((response) => {
              this.getPublisherCompetatorEntered();
              e.target.value = "";
              this.successToast(
                "Success",
                "Competator Website Saved Successfully!"
              );
            })
            .catch((error) => {
              // this.errorToast("Error", "something is going wrong ");
            });
        } else {
          this.errorToast("Error", "Maximum 10 Competator Website allowed!");
        }
      } else {
        this.errorToast("Error", "Please Enter Competator Website!");
      }
      return false;
    },
    getPublisherCompetatorEntered() {
      this.$http
        .get("get-publisher-competators")
        .then((response) => {
          const {
            data: {
              data: { publisher_competator },
            },
          } = response;
          this.listCompetators = publisher_competator;
        })
        .catch((error) => {
          
        });
    },
    gotoDashboard() {
      this.$router.push("/publisher").catch(() => { });
    }
  },
  created() {
    this.$store.dispatch("pob/myPublisherProfileItem");
    this.getPublisherCompetatorEntered();
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
