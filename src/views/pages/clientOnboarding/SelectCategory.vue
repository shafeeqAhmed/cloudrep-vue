<template>
  <div class="onboarding-page">
    <b-row class="onboard-height align-items-center">
      <b-col lg="5" class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center">
        <ClientOnboardingNav />
      </b-col>
      <b-col lg="7" class="px-5 cient-content-wrap h-100 d-flex align-items-center">
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
            <h2>Select Business Category</h2>
            <p>
              Thanks for choosing Cloud Rep, we're excited to get you started!
            </p>
            <b-row>
              <b-col md="6" class="mb-2 mt-2">
                <b-form-group>
                  <v-select 
                    id="category" 
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" 
                    :options="categoryList"
                    label="name"
                    v-model="selectedCategory"
                    :reduce="name=>name.uuid"
                    placeholder="Select Buisness Category" 
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <h2>Select Company Vertical</h2>

            <b-row v-if="verticalList" >
              <b-col md="4" class="mt-2" v-for="vertical in verticalList" :key="vertical.id">
                <div @click="() => selectVerticalVal(vertical.uuid)" class="services-req-box"
                  :class="{ selected: isSelected(vertical.uuid) }">
                  <div class="text-center">
                    <div class="circle-white">
                      <feather-icon icon="PieChartIcon"></feather-icon>
                    </div>
                    <h4>{{ vertical.name }}</h4>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="verticalList.length == 0">
              <b-col md="12" class="mt-2">
                <div class="noVerticalMsg">
                  <p>No Vertical Found</p>
                </div>
              </b-col>
            </b-row>
            <!-- <b-col md="12" class="mt-4 px-0">
              <button v-if="text == 'Update'" class="btn btn-primary submit-btn btn-large" @click="storeVerticals()">
                Update
              </button>
              <button v-else class="btn btn-primary submit-btn btn-large" @click="storeVerticals()">
                Update
              </button>
            </b-col> -->
          <b-col cols="12" v-if="verticalList.length > 0" class="mt-5">
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
              @click="storeVerticals"
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
import vSelect from "vue-select";
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
  BFormGroup,
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
    BFormGroup,
    vSelect,
    BSpinner
  },
  directives: {
    Ripple,
  },
  mixins: [toastAlert],
  data() {
    return {
      // categoryList: [],
      selectedCategory: '',
      // verticals: [],
      firstCategory: null,
      category_id: null,
      selectedVerticals: [],
      edit: false,
      text: "",
      BusinessCategory: "",
      isDisabled: false,
    };
  },
  watch: {
    'selectedCategory':function(newVal, oldVal){
      if(newVal){
        this.$store.dispatch('cob/getVerticalList', this.selectedCategory)
      }
    }
  },
  computed: {
    categoryList() {
      return this.$store.state.cob.categoryList
    },
    verticalList() {
      return this.$store.state.cob.verticalList
    }
  },
  methods: {
    isSelected(uuid) {
      return this.selectedVerticals.includes(uuid);
    },
    selectVerticalVal(uuid) {
      if (!this.selectedVerticals.includes(uuid)) {
        //checking weather array contain the id
        this.selectedVerticals.push(uuid); //adding to array because value doesnt exists
        this.isSelected(uuid);
      } else {
        this.selectedVerticals.splice(this.selectedVerticals.indexOf(uuid), 1); //deleting
        this.isSelected(uuid);
      }
    },
    storeVerticals() {
      // if(this.selectedVerticals.length == 0){
      //   this.errorToast("Error", "Please Select At Least One Vertical!");
      //   return false
      // }
      this.isDisabled = true
      this.selectedVerticals = this.selectedVerticals.join();
      let url;
      if (this.edit == true) {
        url = `update-client-verticals`;
      } else {
        url = `store-client-verticals`;
      }
      this.$http
        .post(url, {
          verticals: this.selectedVerticals,
        })
        .then((response) => {

          this.$store.dispatch('cob/myClientProfileItem')
          this.$router.push({ name: "client-dashboard" });
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
    backToHome() {
      this.$router.push({ name: 'client-dashboard'}).catch(() => {});
    },
    assignValue(){
      // this.$store.dispatch("cob/getBusinessCategories")
      this.$store.dispatch("cob/getClientVerticals")
      this.$store.dispatch("cob/getBusinessCategories").then(()=>{
        const { selectedCategory, selectedVerticals } = this.$store.state.cob
        if(selectedCategory){
          this.selectedCategory = selectedCategory
        }
        this.selectedVerticals = selectedVerticals;
        if (this.selectedVerticals.length) {
          this.edit = true;
          this.text = "Update";
        } else {
          this.edit = false;
          this.text = "Save";
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

    const step = this.$store.state.cob.step
    if (!(step >= 2)) {
      if (step == 1) {
        this.errorToast('Error', 'please Fill business information First')
        this.$router.push({ name: 'business-information' })
      } else {
        this.errorToast('Error', 'please select Services First')
        this.$router.push({ name: 'services-required' })
      }

    }
    this.assignValue()
  }
};
</script>
<style lang="scss" scoped>
.backBtn {
  display: flex;
  /* justify-content: end; */
}
.noVerticalMsg{
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    font-size: 15px;
    font-weight: 600;
  }
}
</style>