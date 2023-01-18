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
              <!-- <div class="form-group">
                <div class="form-controls">
                  <select @change="getBusinessVerticals($event)" class="form-control-s">
                    <option v-for="category in category" :value="category.uuid" :key="category.index">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div> -->
              <b-form-group>
                <v-select id="category" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="category"
                  label="name" @input="getBusinessVerticals($event)" placeholder="Select Buisness Category" />
              </b-form-group>
            </b-col>
          </b-row>
          <h2>Select Company Vertical</h2>

          <b-row>
            <b-col md="4" class="mt-2" v-for="vertical in verticals" :key="vertical.id">
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
          <b-col md="12" class="mt-4 px-0">
            <button v-if="text == 'Update'" class="btn btn-primary submit-btn btn-large" @click="storeVerticals()">
              Update
            </button>
            <button v-else class="btn btn-primary submit-btn btn-large" @click="storeVerticals()">
              Update
            </button>
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

import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BButton,
  BFormGroup
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
    vSelect
  },

  mixins: [toastAlert],
  data() {
    return {
      category: [],
      verticals: [],
      firstCategory: null,
      category_id: null,
      getVerticals: [],
      edit: false,
      text: "",
      BusinessCategory: ""
    };
  },

  methods: {
    clientVerticals() {
      this.$http
        .get("client-verticals")
        .then((response) => {
          this.getVerticals = response.data;
          if (this.getVerticals.length) {
            this.edit = true;
            this.text = "Update";
          } else {
            this.edit = false;
            this.text = "Save";
          }
        })
        .catch((e) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },

    renderVerticals(uuid) {
      // For Fetch First Business Category's Verticals
      this.$http
        .get("business-verticals/" + uuid)
        .then((response) => {
          const {
            data: {
              data: { business_verticals },
            },
          } = response;
          this.verticals = business_verticals;
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.errorToast("Error", error.response.data.message);
          } else {
            this.errorToast("Error", "something is going wrong ");
          }
        });
    },

    getBusinessVerticals(e) {
      // On Change Fetch Business Verticals
      // console.log(this.BusinessCategory)
      // console.log(e)
      // return false
      this.getVerticals = [];
      this.category_id = e.uuid;
      this.$http
        .get("business-verticals/" + this.category_id)
        .then((response) => {
          const {
            data: {
              data: { business_verticals },
            },
          } = response;
          this.verticals = business_verticals;

          this.clientVerticals();
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.errorToast("Error", error.response.data.message);
          } else {
            this.errorToast("Error", "something is going wrong ");
          }
        });
    },

    isSelected(uuid) {
      return this.getVerticals.includes(uuid);
    },

    selectVerticalVal(uuid) {
      if (!this.getVerticals.includes(uuid)) {
        //checking weather array contain the id
        this.getVerticals.push(uuid); //adding to array because value doesnt exists
        this.isSelected(uuid);
      } else {
        this.getVerticals.splice(this.getVerticals.indexOf(uuid), 1); //deleting
        this.isSelected(uuid);
      }
    },

    storeVerticals() {
      this.selectedVerticals = this.getVerticals.join();
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
          this.$router.push({ name: "client" });
        })
        .catch((e) => {
          if (e.response.status == 422) {
            this.errorToast("Error", e.response.data.message);
          } else {
            this.errorToast("Error", "something is going wrong ");
          }
        });
    },
    backToHome() {
      this.$router.push("/client").catch(() => { });
    }
  },

  mounted() {
    this.$http
      .get("bussines-categories")
      .then((response) => {
        this.category = response.data.data.bussines_categories;
        this.firstCategory = this.category[0].uuid;
        this.renderVerticals(this.firstCategory);
        this.clientVerticals();
      })
      .catch((error) => {
        if (error.response.status == 422) {
          this.errorToast("Error", error.response.data.message);
        } else {
          this.errorToast("Error", "something is going wrong ");
        }
      });
  },
  created() {
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
  }
};
</script>
<style>
.backBtn {
  display: flex;
  /* justify-content: end; */
}
</style>