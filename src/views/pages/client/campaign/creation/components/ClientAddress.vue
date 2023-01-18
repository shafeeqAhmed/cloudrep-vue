<template>
  <div>
    <div
      v-if="!userUuid"
      class="text-danger font-medium-1 font-weight-bold mt-1"
    >
      please Select Client from Client Information section
    </div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-step-two campaign-fields campaign-steps">
        <validation-observer
          ref="stepTwoForm"
          #default="{ error }"
        >
          <b-form>
            <b-row>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <b-form-group class="">
                  <label class="font-medium-1 font-weight-bold"
                    >Client ID
                  </label>
                  <div class="input-gradient">
                    <b-form-input
                      type="text"
                      v-model="userUuid"
                      :disabled="true"
                      placeholder="Enter State"
                      class="form-control transfer-field"
                    />
                  </div>
                </b-form-group>
              </b-col>
              <b-col lg="6"></b-col>
              <b-col
                lg="12"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="address"
                  vid="address"
                  rules="required"
                >
                  <b-form-group class="">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <label class="font-medium-1 font-weight-bold"
                        >Primary Company Address</label
                      >
                      <span
                        class="text-danger"
                        v-if="info.address.length >= 150"
                        >Max limit reached (150)</span
                      >
                      <div
                        v-else
                        class="lmsInputFieldCounter"
                      >
                        <span v-if="info.address.length >= 1"
                          ><span>{{ info.address.length }}</span> / 150</span
                        >
                      </div>
                    </div>

                    <div class="input-gradient">
                      <b-form-input
                        id="address"
                        v-model="info.address"
                        type="text"
                        placeholder="Enter Address"
                        autocomplete="off"
                        maxLength="150"
                        class="form-control transfer-field"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="country"
                  vid="country"
                  rules="required"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >Country</label
                    >
                    <div class="input-gradient">
                      <v-select
                        v-model="info.country"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="countries"
                        :reduce="(name) => name.name"
                        label="name"
                        placeholder="Select Your Country"
                        class="v-sel-sty"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="state"
                  vid="state"
                  rules="required"
                >
                  <b-form-group class="">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <label class="font-medium-1 font-weight-bold"
                        >State</label
                      >
                      <span
                        class="text-danger"
                        v-if="info.state.length >= 70"
                        >Max limit reached (70)</span
                      >
                      <div
                        v-else
                        class="lmsInputFieldCounter"
                      >
                        <span v-if="info.state.length >= 1"
                          ><span>{{ info.state.length }}</span> / 70</span
                        >
                      </div>
                    </div>
                    <div class="input-gradient">
                      <b-form-input
                        id="state"
                        type="text"
                        v-model="info.state"
                        placeholder="Enter State"
                        autocomplete="off"
                        maxLength="50"
                        class="form-control transfer-field"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="City or Twon"
                  vid="city_town"
                  rules="required"
                >
                  <b-form-group class="">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <label class="font-medium-1 font-weight-bold"
                        >City / Town</label
                      >
                      <div v-if="info.city">
                        <span
                          class="text-danger"
                          v-if="info.city.length >= 70"
                          >Max limit reached (70)</span
                        >
                        <div
                          v-else
                          class="lmsInputFieldCounter"
                        >
                          <span v-if="info.city.length >= 1"
                            ><span>{{ info.city.length }}</span> / 70</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="input-gradient">
                      <b-form-input
                        id="city_town"
                        type="text"
                        v-model="info.city"
                        placeholder="Enter City / Town"
                        autocomplete="off"
                        maxLength="70"
                        class="form-control transfer-field"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <!-- <b-col lg="6" class="py-2 px-xl-2 mx-auto cient-content">
                <validation-provider
                  #default="{ errors }"
                  name="zip code"
                  vid="zipCode"
                  rules="required"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold">Zip Code</label>
                    <div class="input-gradient">
                      <b-form-input
                        rules="required"
                        id="zipCode"
                        type="text"
                        v-model="info.zipcode"
                        placeholder="Enter Zip Code"
                        class="form-control transfer-field"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small><br />
                  <small id="customError" class="text-danger"></small>
                </validation-provider>
              </b-col> -->
            </b-row>
          </b-form>
        </validation-observer>
      </div>
      <div class="campaign-pagination mt-2">
        <div class="text-right">
          <b-button
            variant="primary"
            class="next-btn"
            @click="store"
          >
            {{
              checkClientAddress($store.state.clientCampaign.campaign.address)
            }}</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BFormGroup,
  BForm,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
import { debounce } from "@/commonFunction/helpers.js";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
  },
  mixins: [toastAlert],
  watch: {
    campaignChange() {
      this.assignCampaignDetail();
    },
  },
  data() {
    return {
      selectedOption: {},
      userUuid: "",
      selectedCountry: "",
      info: {
        address: "",
        country: "",
        state: "",
        city: "",
        // zipcode: "",
      },
    };
  },

  methods: {
    checkClientAddress(id) {
      if (id === null || id === "") {
        return "Save";
      } else {
        return "Update";
      }
    },
    store() {
      this.$refs.stepTwoForm.validate().then((success) => {
        if (success) {
          const { address, city, country, state } =
            this.$store.state.clientCampaign.campaign;

          if (
            address == this.info.address &&
            city == this.info.city &&
            state == this.info.state &&
            country == this.info.country
          ) {
            /* this.conditionalToast(
              "danger",
              "Error",
              "Client Address Already Exist!",
              "error"
            ); */
          } else {
            const params = {
              campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
              user_uuid: this.$store.state.clientCampaign.campaign.user_uuid,
              address: this.info.address,
              country: this.info.country,
              state: this.info.state,
              city: this.info.city,
              step: 4,
              // zipcode: this.info.zipcode,
            };
            this.$store
              .dispatch("clientCampaign/storeCampaignClientAddress", params)
              .then((response) => {
                const { data } = response;
                if (data.status) {
                  this.conditionalToast(
                    "success",
                    "Success",
                    data.message,
                    "success"
                  );
                  this.$store.dispatch("clientCampaign/getCampaign");
                } else {
                  this.conditionalToast(
                    "danger",
                    "Error",
                    data.message,
                    "error"
                  );
                }
              })
              .then((error) => {
                console.log(this.$refs);
              });
          }
        }
      });
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign && campaign.address) {
        this.info.address = campaign.address != null ? campaign.address : "";
        this.info.state = campaign.state != null ? campaign.state : "";
        this.info.city = campaign.city != null ? campaign.city : "";
        this.userUuid = campaign.user_uuid;
        // this.info.zipcode = campaign.zipcode;
        // this.info.country = parseInt(campaign.country);
        const country = campaign.country != null ? campaign.country : "";
        this.selectedUserCountry(country);
        // this.countries.forEach((element) => {
        //   if (element.name == campaign.country) {
        //     this.info.country = element.name;
        //   }
        // });
      } else {
        this.assignDetailAgainstUser();
      }
    },
    assignDetailAgainstUser() {
      const { userDetail } = this.$store.state.clientCampaign;

      if (userDetail) {
        this.info.address =
          userDetail.bussines_address != null
            ? userDetail.bussines_address
            : "";
        const country = userDetail.country != null ? userDetail.country : "";
        this.selectedUserCountry(country);
        (this.info.state = userDetail.state != null ? userDetail.state : ""),
          (this.info.city = userDetail.city != null ? userDetail.city : ""),
          // (this.info.zipcode = userDetail.zipcode);
          (this.userUuid = userDetail.uuid);
      }
    },
    searchUser: debounce(function (event) {
      this.$store.dispatch("clientCampaign/searchUser", {
        q: event,
      });
    }, 500),

    selectedUserCountry(country) {
      this.countries.forEach((element) => {
        if (element.name == country) {
          this.info.country = element.name;
        }
      });
    },
  },
  computed: {
    countries() {
      return this.$store.getters["clientCampaign/countries"];
    },
    userList() {
      return this.$store.getters["clientCampaign/userList"];
    },
    campaignChange() {
      return this.$store.state.clientCampaign.campaign;
    },
  },
  created() {
    this.$store.dispatch("clientCampaign/getCountries");
    this.assignCampaignDetail();
  },
};
function isAlphanumeric(str) {
  return /^[a-z0-9]+$/i.test(str);
}
function is_numeric(str) {
  return /^\d+$/.test(str);
}
</script>
<style scoped>
.campaign-steps .v-select .vs__dropdown-toggle .vs__selected-options input {
  color: transparent !important;
}
</style>
