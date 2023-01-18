<template>
  <div class="auth_wrap">
    <b-row class="">
      <!-- Left Text-->
      <b-col lg="5" class="auth_left_side">
        <auth-left-section />
      </b-col>
      <!-- /Left Text-->

      <!-- Set 2fa -->
      <b-col lg="7" class="auth_right_side">
        <div class="login_form">
          <div class="w-100">
            <login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Keep Your Account Safe
            </b-card-title>
            <p class="p-subtitle">
              Add your phone number for another layer of security. The phone
              number you enter must be able to receive text messages. We will
              never share your number with anyone else.
            </p>
            <!-- form -->
            <validation-observer ref="simpleRules">
              <b-form class="auth-login-form mt-5 two-form" @submit.prevent="updatePhoneNo">
                <b-form-group>
                  <validation-provider #default="{ errors }" name="Phone Number" vid="phone_no" rules="required|max:10">
                    <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                      <b-input-group-prepend>
                        <vue-country-code @onSelect="onSelect" defaultCountry="ca" :disabledFetchingCountry="true"
                          :disabled="true" :preferredCountries="['ca']">
                        </vue-country-code>
                      </b-input-group-prepend>
                      <b-form-input id="phone_no" v-model="phone_no" :state="errors.length > 0 ? false : null"
                        class="form-control-merge" type="number" name="phone_no" placeholder="Phone Number" />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- submit buttons -->
                <!-- <b-button type="submit" variant="primary" class="submit-btn mt-5 text-uppercase" block
                  :disabled="isDisabled">
                  Send Code
                </b-button> -->
                <div class="d-flex align-items-center mt-5 ">
                  <b-link class="log_back mr-2" :to="{ name: 'email-not-verified' }">
                    <div class="d-flex align-items-center">
                      <feather-icon icon="ArrowLeftIcon" size="21" class="mr-1"/>
                      <small>Back</small>
                    </div>
                  </b-link>
                  <b-button v-if="isDisabled" variant="primary" disabled class="submit-btn text-uppercase">
                    <div class="d-flex justify-content-center align-items-center">
                      <b-spinner small />
                      <span class="ml-1">Processing ...</span>
                    </div>
                  </b-button>

                  <b-button v-else type="submit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="submit-btn text-uppercase">
                    Send Code
                  </b-button>
                </div>
              </b-form>
            </validation-observer>
          </div>
        </div>
      </b-col>
      <!-- /Set 2fa -->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BAvatar,
  BButton,
  BListGroup,
  BListGroupItem,
  BInputGroupPrepend,
  BSpinner
} from "bootstrap-vue";
import { required, max } from "@validations";
import store from "@/store/index";
import AuthLeftSection from './component/AuthLeftSection'
import Cleave from 'vue-cleave-component';
import { toastAlert } from "@core/mixins/ui/toast";
import { getUserData, save, remove, updateRegisterStep, isUserLoggedIn } from '@/auth/utils'
import LoginBack from './component/LoginBack'
import "@/assets/css/auth.css"
import "@/assets/css/signup-menu.css";
import Ripple from 'vue-ripple-directive'


export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BAvatar,
    BButton,
    VuexyLogo,
    BListGroup,
    BListGroupItem,
    ValidationProvider,
    ValidationObserver,
    AuthLeftSection,
    Cleave,
    LoginBack,
    BSpinner
  },
  mixins: [toastAlert],
  directives: {
    Ripple,
  },
  data() {
    return {
      isDisabled: false,
      dialCode: '',
      phone_no: '',
      backgroundImg: require("@/assets/images/auth/background.png"),
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      googleImg: require("@/assets/images/auth/Group.png"),
      facebookImg: require("@/assets/images/auth/facebook.png"),
      // validation rulesimport store from '@/store/index'
      required,
      max
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    onSelect({ name, iso2, dialCode }) {
      this.dialCode = '+' + dialCode
      //  console.log(name, iso2, dialCode);
    },
    updatePhoneNo() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          this.isDisabled = true,
            this.$http.post('/update-phone-no', {
              phone_no: this.dialCode + this.phone_no
            }).then(response => {
              this.isDisabled = false

              const { data } = response
              const { user } = data.data
              if (data.status) {
                const userData = getUserData()
                userData.phone_no = this.phone_no
                userData.step = user.step

                save('userData', userData)
                this.successToast('Success', data.message)
                save('step', user.step)
                this.$store.commit('app/UPDATE_USER', userData)
                if (user.step == 6) {
                  this.$router.push('/registration-completed').catch(() => { })
                } else {
                  this.$router.push('/auth-2fa').catch(() => { })
                }

              }
            }).catch(error => {
              this.isDisabled = false,

                this.$refs.simpleRules.setErrors(error.response.data.errors);
            })
        }
      });
    },
  },
  created() {
    const userData = getUserData()
    if (userData) {
      this.phone_no = userData.phone_no
    }
  }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
