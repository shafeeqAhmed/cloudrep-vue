<template>
  <div class="onboarding-page">
    <b-row class="onboard-height align-items-center">
      <b-col lg="5" class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center">
        <ClientOnboardingNav />
      </b-col>
      <b-col lg="7" class="px-5 cient-content-wrap h-100 d-flex align-items-center ">
        <div class="w-100">
          <b-row>
          <b-col class="m-2">
            <div class="backBtn">
              <img class="cursor-pointer" src="@/assets/images/icons/arrow-left.svg" />
              <b-link class="ml-1 text-dark-custom" @click="backToHome">
                <small>Back To Home</small>
              </b-link>
            </div>
          </b-col>
        </b-row>
        <div class="client-content">
          <h2>I Need more</h2>
          <p>
            Thanks for choosing Cloud Rep, we're excited to get you started!
          </p>
          <b-row>
            <b-col md="4" class="mt-2" v-for="service in services" :key="service.id">
              <div @click="getServiceValue(service.uuid)" class="services-req-box"
                :class="{ selected: isSelected(service.uuid) }">
                <div class="text-center">
                  <div class="circle-white">
                    <feather-icon icon="PhoneIcon"></feather-icon>
                  </div>
                  <h4>{{ service.name }}</h4>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-col cols="12" v-if="services.length > 0" class="mt-5">
            <b-button
              v-if="isDisabled"
              disabled
              class="btn btn-primary submit-btn btn-large"
            >
              <div class="d-flex justify-content-center align-items-center">
                <b-spinner small />
                <span class="ml-1">Processing ...</span>
              </div>
            </b-button>
            <b-button
            v-else
              @click="storeServices"
              class="btn btn-primary submit-btn btnLarge"
            >
              {{ text }}
            </b-button>
          </b-col>
        </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ClientOnboardingNav from "./ClientOnboardingNav.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import clientOnBoardingStoreModule from "./clientOnBoardingStoreModule";
import Ripple from "vue-ripple-directive";

import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BButton,
  BSpinner
} from "bootstrap-vue";
export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    ClientOnboardingNav,
    BRow,
    BCol,
    BButton,
    BSpinner
  },
  directives: {
    Ripple,
  },
  mixins: [toastAlert],
  data() {
    return {
      services: [],
      icons: [],
      getServices: [],
      selectedServices: [],
      clientService: [],
      edit: false,
      text: "",
      isDisabled: false,
    };
  },
  methods: {
    getServiceValue(id) {
      if (!this.selectedServices.includes(id)) {
        //checking weather array contain the id
        this.selectedServices.push(id); //adding to array because value doesnt exists
        this.isSelected(id);
      } else {
        this.selectedServices.splice(this.selectedServices.indexOf(id), 1); //deleting
        this.isSelected(id);
      }
    },
    storeServices() {
      if(this.selectedServices.length == 0){
        this.errorToast("Error", "Please Select At Least One Services!");
        return false
      }

      this.selectedServices = this.selectedServices.join();

      if(this.selectedServices === this.$store.state.cob.clientServices){
        this.errorToast("Error", "Nothing To Update");
        return false
      }

      let url;
      if (this.edit == true) {
        url = "update-client-services";
      } else {
        url = "store-client-services";
      }
      this.isDisabled = true
      this.$http
        .post(url, {
          services: this.selectedServices,
        })
        .then((response) => {
          //update local state for step
          this.successToast("Success", response.data.message);

          this.$store.dispatch("cob/myClientProfileItem").then(() => {
            this.$router.push({ name: "business-information" });
          });
        })
        .catch((e) => {
          if (e.response.status == 422) {
            this.errorToast("Error", e.response.data.message);
          } else {
            this.errorToast("Error", "something is going wrong ");
          }
        }).finally(()=>{
          this.isDisabled = false
        })
    },
    isSelected(uuid) {
      return this.selectedServices.includes(uuid);
    },
    backToHome() {
      this.$router.push({ name: 'client-dashboard'}).catch(() => {});
    },
    assignValue(){
      this.$store.dispatch("cob/getServicesList").then(()=>{
      this.services = this.$store.state.cob.services
      })
      this.$store.dispatch("cob/getClientService").then(()=>{
        this.clientService = this.$store.state.cob.clientServices
        this.selectedServices = this.clientService;
        if (this.selectedServices.length) {
          this.text = "Update";
          this.edit = true;
        } else {
          this.text = "Save";
          this.edit = false;
        }
      })
    }
  },
  created() {
    const APP_STORE_MODULE_NAME = "cob";

    // // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME))
      this.$store.registerModule(
        APP_STORE_MODULE_NAME,
        clientOnBoardingStoreModule
      );

    this.assignValue()
  },
};
</script>
<style>
.backBtn {
  display: flex;
}
.btnLarge{
  padding: 1.5rem 3rem 2rem 3rem;
}
</style>