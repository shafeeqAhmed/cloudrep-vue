<template>
  <div>
    <b-card v-if="!isDataLoading">
      <div class="d-flex justify-content-center align-items-center">
        <b-spinner small />
        <span class="ml-1">Loading...</span>
      </div>
    </b-card>
    <b-card v-else>
      <validation-observer ref="personalInformation" #default="{ invalid }" @submit.prevent="updatePersonalInformation">
        <!-- form -->
        <b-form>
          <b-row>
            <!-- bio -->
            <b-col cols="12">
              <b-form-group>
                <div class="d-flex align-items-center justify-content-between">
                  <label>Course Tag Line</label>
                  <div v-if="bio">
                    <span class="text-danger" v-if="bio>= 150">Max limit reached (150)</span>
                    <div v-else class="lmsInputFieldCounter">
                      <span v-if="bio.length >= 1"><span >{{bio.length}}</span> / 150</span>
                      <span v-if="bio.length < 1">150</span>
                    </div>
                  </div>
                </div>
                <validation-provider #default="{ errors }" name="bio" vid="bio" rules="required">
                  <div class="input-gradient">
                    <b-form-textarea id="bio" v-model="bio" name="bio" :state="errors.length > 0 ? false : null"
                    placeholder="Bio" maxLength="150" rows="3" no-resize />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ bio -->

            <!-- birth date -->
            <b-col md="6">
              <b-form-group label="Birth Date" label-for="birth_date">
                <validation-provider #default="{ errors }" name="Birth Date" vid="birth_date" rules="required">
                  <div class="input-gradient">
                    <b-form-input id="birth_date" type="date" v-model="birth_date" name="bio"
                    :state="errors.length > 0 ? false : null" placeholder="Birth Date" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ birth date -->

            <!-- website -->
            <b-col md="6">
              <b-form-group label-for="website" label="Website">
                <validation-provider #default="{ errors }" name="Website" vid="website" rules="required|url">
                  <div class="input-gradient">
                    <b-form-input type="url" v-model="website" id="website" name="website" placeholder="Website address" :state="errors.length > 0 ? false : null" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ website -->

            <!-- phone -->
            <b-col md="6">
              <b-form-group label-for="phone" label="Phone">
              <div class="input-gradient">
                <cleave id="phone" v-model="phone_no" class="form-control" name="phone" :raw="false" :options="clevePhone"
                              :disabled="true" placeholder="Phone number" />
              </div>
              </b-form-group>
            </b-col>
            <!-- phone -->

            <b-col cols="12">
              <b-button
                v-if="isDisabled"
                disabled
                type="submit"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
              >
                <div class="d-flex justify-content-center align-items-center">
                  <b-spinner small />
                  <span class="ml-1">Processing ...</span>
                </div>
              </b-button>
              <b-button
              v-else
                type="submit"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
              >
                {{ btnText }}
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>

<script>
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BFormTextarea,
  BSpinner
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import Ripple from "vue-ripple-directive";
import Cleave from "vue-cleave-component";
import "@/assets/css/auth.css";
import "@/assets/css/contact-center.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
import "cleave.js/dist/addons/cleave-phone.us";
import useAccountSetting from "./useAccountSetting";
import store from "@/store";

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormTextarea,
    flatPickr,
    Cleave,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
    required
  },
  directives: {
    Ripple,
  },
  mixins: [toastAlert],
  data() {
    return {
      isDataLoading: false,
      isDisabled: false,
      isUpdate: false,
      btnText: 'Save',
    };
  },
  methods: {
    updatePersonalInformation() {
      this.$refs.personalInformation.validate().then((success) => {
        if (success) {
          const check = this.checkValue();
          if(check){
            this.isDisabled = true;
            this.$http
              .post("update-personal-information", {
                bio: this.bio,
                birth_date: this.birth_date,
                country: this.country,
                website: this.website,
              })
              .then((response) => {
                if(response.data.status){
                  this.assignValue();
                  this.successToast("Success","Personal information has been updated successfully!");
                }else{
                  this.errorToast('Error', response.data.message)
                }
              })
              .catch((error) => {
                this.errorToast(
                  "Error",
                  "Somethign going wrong please try again!"
                );
                this.$refs.personalInformation.setErrors(
                  error.response.data.errors
                );
              }).finally(()=> {
                this.isDisabled = false;
              })
          }
        }
      });
    },
    checkValue(){
      const data = this.$store.state.accountSetting.setting
      if (data && this.bio == data.bio
        && this.birth_date == data.birth_date
        && this.website == data.website
        && this.countryOption == data.countryOption
        ) 
      {
        return false;
      }else{
        return true;
      }
    },
    assignValue(){
      this.$store.dispatch('accountSetting/myDetail').then((response)=>{
        const data = this.$store.state.accountSetting.setting
        if (Object.keys(data).length > 0) {
          this.bio = data.bio;
          this.birth_date = data.birth_date;
          // this.country = data.country;
          this.website = data.website;
          this.phone_no = data.phone_no;
          this.countryOption = data.countryOption;
          this.isDataLoading = true;
        }
        if(data.bio.length > 0){
          this.isUpdate = true
          this.btnText = 'Update'
        }
      })
    }
  },
  mounted() {
    this.assignValue()
  },
  setup() {

    const {
      bio,
      birth_date,
      country,
      website,
      phone_no,
      countryOption,
      clevePhone,
    } = useAccountSetting();

    return {
      bio,
      birth_date,
      country,
      website,
      phone_no,
      countryOption,
      clevePhone,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
#bio{
  height: 100px !important;
}
</style>
