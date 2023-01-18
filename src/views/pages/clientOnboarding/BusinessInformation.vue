<template>
  <div class="onboarding-page">
    <b-row class="h-100 align-items-center">
      <b-col
        lg="5"
        class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center"
      >
        <ClientOnboardingNav />
      </b-col>
      <b-col
        lg="7"
        class="px-5 py-5 cient-content-wrap h-100 d-flex align-items-center"
      >
        <div class="w-100">
          <b-row>
            <b-col class="m-2">
              <div class="backBtn">
                <img
                  class="cursor-pointer"
                  src="@/assets/images/icons/arrow-left.svg"
                />
                <b-link
                  class="ml-1 text-dark-custom"
                  @click="backToHome"
                >
                  <small>Back To Home</small>
                </b-link>
              </div>
            </b-col>
          </b-row>
          <div class="client-content">
            <h2>Add Company Details</h2>
            <p>
              Thanks for choosing Cloud Rep, we're excited to get you started!
            </p>
            <validation-observer
              ref="infoForm"
              #default="{ errors }"
            >
              <b-form
                class="auth-login-form mt-2"
                @submit.prevent="updateBusinessInfo"
              >
                <b-row>
                  <b-col
                    md="12"
                    class="mt-5"
                  >
                    <b-form-group class="mb-2">
                      <google-autocomplete
                        :selectedAddress="info.bussines_address"
                        @address="address"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group class="mb-2">
                      <label>Business Name</label>
                      <validation-provider
                        #default="{ errors }"
                        name="Business Name"
                        vid="businessName"
                        rules="required"
                      >
                        <b-input-group class="input-group-merge">
                          <b-form-input
                            id="businessName"
                            v-model="info.bussines_name"
                            class="form-control-merge form-control-i"
                            type="text"
                            name="businessName"
                            placeholder="Enter Business Name"
                            :state="errors.length > 0 ? false : null"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group class="mb-4">
                      <label>Phone Number</label>
                      <validation-provider
                        #default="{ errors }"
                        name="Phone Number"
                        vid="phoneNo"
                        rules="required"
                      >
                        <b-input-group class="input-group-merge">
                          <b-form-input
                            id="phoneNo"
                            v-model="info.bussines_phone_no"
                            class="form-control-merge form-control-i"
                            type="text"
                            name="phoneNo"
                            placeholder="Enter Phone No"
                            :state="errors.length > 0 ? false : null"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
                <h2>Social Profiles</h2>
                <b-row class="mt-3">
                  <b-col md="6">
                    <b-form-group class="mb-2">
                      <label>Google My Business</label>
                      <b-form-input
                        id="phoneNo"
                        v-model="info.google_my_bussines"
                        class="form-control-merge form-control-i"
                        type="text"
                        name="googleMyBusiness"
                        placeholder="Enter Account Link"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    md="6"
                    class="mb-2"
                  >
                    <b-form-group class="mb-2">
                      <label>Crunchbase</label>
                      <b-form-input
                        id="crunchbase"
                        v-model="info.crunchbase"
                        class="form-control-merge form-control-i"
                        type="text"
                        name="crunchbase"
                        placeholder="Enter Account Link"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    md="6"
                    class="mb-2"
                  >
                    <b-form-group class="mb-2">
                      <label>LinkedIn</label>
                      <b-form-input
                        id="linkedin"
                        v-model="info.linkedin"
                        class="form-control-merge form-control-i"
                        type="text"
                        name="linkedin"
                        placeholder="Enter Account Link"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    md="6"
                    class="mb-2"
                  >
                    <b-form-group class="mb-2">
                      <label>Twitter</label>
                      <b-form-input
                        id="twitter"
                        v-model="info.twitter"
                        class="form-control-merge form-control-i"
                        type="text"
                        name="twitter"
                        placeholder="Enter Account Link"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="mt-5">
                  <b-col cols="12">
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
                    type="submit"
                      class="btn btn-primary submit-btn btnLarge"
                    >
                      {{ text }}
                    </b-button>
                  </b-col>
                </b-row>
                <!-- <b-col
                  md="12"
                  class="mt-1 px-0"
                >
                  <b-button
                    v-if="text == 'Update'"
                    type="submit"
                    variant="primary"
                    class="btn btn-primary submit-btn btn-large"
                    :disabled="isDisabled"
                  >
                    Update
                  </b-button>
                  <b-button
                    v-else
                    type="submit"
                    variant="primary"
                    class="btn btn-primary submit-btn btn-large"
                    :disabled="isDisabled"
                  >
                    Save
                  </b-button>
                </b-col> -->
              </b-form>
            </validation-observer>
          </div>
        </div>
      </b-col>
    </b-row>
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
  BFormGroup,
  BInputGroup,
  BFormInput,
  BButton,
  BForm,
  BSpinner
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ClientOnboardingNav from "./ClientOnboardingNav.vue";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
import GoogleAutocomplete from "@/commonFunction/GoogleAutocomplete.vue";
import Ripple from "vue-ripple-directive";

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
    ValidationProvider,
    ValidationObserver,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BButton,
    BForm,
    GoogleAutocomplete,
    BSpinner
  },
  directives: {
    Ripple,
  },
  mixins: [toastAlert],
  data() {
    return {
      info: [],
      required,
      isDisabled: false,
      text: null,
      isDisabled: false,
    };
  },

  methods: {
    address(event) {
      this.info.country = event.country;
      (this.info.state = event.state), (this.info.city = event.city);
      this.info.zipcode = event.zipcode;
      this.info.bussines_address = event.address;
    },
    updateBusinessInfo() {
      this.$refs.infoForm.validate().then((success) => {
        if (success) {
          this.isDisabled = true;
          let url;
          if (this.edit == true) {
            url = `update-client-profile-item`;
          } else {
            url = `store-client-profile-item`;
          }
          this.$http
            .post(url, {
              bussines_name: this.info.bussines_name,
              bussines_address: this.info.bussines_address,
              bussines_phone_no: this.info.bussines_phone_no,
              google_my_bussines: this.info.google_my_bussines,
              crunchbase: this.info.crunchbase,
              linkedin: this.info.linkedin,
              twitter: this.info.twitter,
              country: this.info.country,
              state: this.info.state,
              city: this.info.city,
              zipcode: this.info.zipcode,
            })
            .then((response) => {

              if (response.data.status == true) {
                this.$store.dispatch("cob/myClientProfileItem").then(() => {
                  this.$router.push({ name: "select-category" });
                });
              } else {
                this.successToast("Success ", response.data.message);
              }
            })
            .catch((error) => {
              this.isDisabled = false;
              if (error.response.data) {
                this.errorToast("Error", error.response.data.data.message);
              } else {
                this.errorToast("Error", "something is going wrong ");
              }

              this.$refs.infoForm.setErrors(error.response.data.errors);
            }).finally(()=>{
              this.isDisabled = false
            })
        }
      });
    },
    backToHome() {
      this.$router.push({ name: 'client-dashboard'}).catch(() => {});
    },
    assignValue(){
      const client_profile_items = this.$store.state.cob.clientInformation
      if (client_profile_items) {
        this.info = client_profile_items;
        this.text = "Update";
        this.edit = true;
      } else {
        this.text = "Save";
        this.edit = false;
      }
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

    const check = this.$store.state.cob.step >= 1;
    if (!check) {
      this.errorToast("Error", "please select Services First");
      this.$router.push({ name: "services-required" });
    }
    this.assignValue()
  },
};
</script>
<style>
.backBtn {
  display: flex;
  /* justify-content: end; */
}
.btnLarge{
  padding: 1.5rem 3rem 2rem 3rem;
}
</style>
