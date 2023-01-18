<template>
  <div class="auth_wrap">
    <b-row class="">
      <!-- Left Text-->
      <b-col lg="5" class="auth_left_side">
        <auth-left-section />
      </b-col>
      <!-- /Left Text-->
      <b-col lg="7" v-if="setp > 5" class="auth_right_side">
        <div class="login_form">
          <div class="w-100">
            <login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Add Security Code
            </b-card-title>
            <div>
              <b-alert variant="success" show>
                <div class="alert-body">
                  <span><strong>Congratulations!</strong> You have been verified your phone no successfully.</span>
                </div>
              </b-alert>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Register-->
      <b-col lg="7" v-else class="auth_right_side">
        <div class="login_form">
          <div class="w-100">
            <login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Add Security Code
            </b-card-title>
            <p class="p-subtitle">
              A 4-digit code has been sent to your phone number ending with
              <b><i>{{ phone_no }}</i></b>. Please enter the code below.
            </p>
            <!-- form -->
            <validation-observer ref="simpleRules">
              <b-form class="auth-login-form mt-5" @submit.prevent="verifyTwofaCode">
                <div class="d-flex justify-content-between otp-verify-gradient">
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input ref="codeOneInput" v-model="n1" class="verify" id="h-number" type="text" placeholder="0"
                      v-on:keyup="gotoCodetwo" />
                    </div>
                  </b-form-group>
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input v-model="n2" class="verify" id="code2" type="text" placeholder="0"
                      v-on:keyup="gotoCodethree" />
                    </div>
                  </b-form-group>
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input v-model="n3" class="verify" id="code3" type="text" placeholder="0"
                      v-on:keyup="gotoCodefour" />
                    </div>
                  </b-form-group>
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input v-model="n4" class="verify" id="code4" type="text" placeholder="0"
                      v-on:keyup="focusContinue" />
                    </div>
                  </b-form-group>
                </div>
                <p :class="isResendOtp == true ? 'resendOtpDisable' : ''">
                  <b-img src="@/assets/images/auth/Union.png" />
                  <b-link class="ml-1" @click="resendOtp">
                    <small>Resend Security Code</small>
                  </b-link>
                </p>
                <!-- buttons -->
                <b-row>
                  <b-col lg="6">
                    <!-- <b-button :disabled="isDisabled" type="submit" variant="primary" class="mt-3 text-uppercase" block
                      id="continue">
                      Continue
                    </b-button> -->
                    <div class="d-flex align-items-center mt-3 ">
                      <b-link class="log_back mr-2" :to="{ name: 'set-2fa' }">
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

                      <b-button v-else id="continue" type="submit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="submit-btn text-uppercase">
                        Continue
                      </b-button>
                    </div>
                  </b-col>
                  <b-col lg="6">
                    <b-button type="submit" variant="outline-primary" class="mt-3 text-uppercase" block
                      @click="$router.push({ name: 'set-2fa' })">
                      Change Number
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </div>
        </div>
      </b-col>
      <!-- /Register-->
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
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BImg,
  BCardTitle,
  BCardText,
  BListGroup,
  BListGroupItem,
  BAvatar,
  Cleave,
  BAlert,
  BSpinner
} from "bootstrap-vue";
import { required } from "@validations";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";
import { toastAlert } from "@core/mixins/ui/toast";
import { isUserLoggedIn, getUserData, updateRegisterStep, save, get } from '@/auth/utils'
import AuthLeftSection from './component/AuthLeftSection'
import LoginBack from './component/LoginBack'
import Ripple from 'vue-ripple-directive'
import "@/assets/css/auth.css";
import "@/assets/css/signup-menu.css";
export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BInputGroupPrepend,
    // validations
    ValidationProvider,
    ValidationObserver,
    AuthLeftSection,
    LoginBack,
    BAlert,
    BSpinner
  },
  mixins: [toastAlert],
  directives: {
    Ripple,
  },
  data() {
    return {
      isDisabled: false,
      isResendOtp: false,
      n1: '',
      n2: '',
      n3: '',
      n4: '',
      phone_no: '',
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      required,
    };
  },

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
    setp() {
      return this.$store.state.app.user.step
    }
  },
  methods: {
    resendOtp() {

      this.isResendOtp = true
      this.$http.get('get-2fa').then(response => {
        this.isDisabled = false
        this.successToast('Success', response.data.message)
      }).catch(() => {
      }).finally(()=>{
        this.isResendOtp = false
      })
    },

    gotoCodetwo() {
      if (is_numeric(this.n1)) {
        if (
          parseInt(this.n1) >= 0 &&
          parseInt(this.n1) <= 9 &&
          this.n1.length < 2
        ) {
          document.getElementById("code2").focus();
        } else {
          this.n1 = "";
        }
      } else {
        // it isn't
        this.n1 = "";
      }
    },
    gotoCodethree() {
      if (is_numeric(this.n2)) {
        if (
          parseInt(this.n2) >= 0 &&
          parseInt(this.n2) <= 9 &&
          this.n2.length < 2
        ) {
          document.getElementById("code3").focus();
        } else {
          this.n2 = "";
        }
      } else {
        // it isn't
        this.n2 = "";
      }
    },
    gotoCodefour() {
      if (is_numeric(this.n3)) {
        if (
          parseInt(this.n3) >= 0 &&
          parseInt(this.n3) <= 9 &&
          this.n3.length < 2
        ) {
          document.getElementById("code4").focus();
        } else {
          this.n3 = "";
        }
      } else {
        // it isn't
        this.n3 = "";
      }
    },
    focusContinue() {
      if (is_numeric(this.n4)) {
        if (
          parseInt(this.n4) >= 0 &&
          parseInt(this.n4) <= 9 &&
          this.n4.length < 2
        ) {
          document.getElementById("continue").focus();
        } else {
          this.n4 = "";
        }
      } else {
        // it isn't
        this.n4 = "";
      }
    },

    verifyTwofaCode() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.isDisabled = true
          this.code = this.n1 + this.n2 + this.n3 + this.n4
          useJwt.verifyTwofaCode({
            code: this.code,
          }).then(response => {
            console.log(response.data)
            save('isVerified2fa', JSON.stringify(response.data.status))
            if (response.data.status) {
              save('step', 6)
              // const userData = getUserData();
              this.$router.push('/registration-completed').catch(() => { })
              //  this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
              //   .then(() => { this.successToast('Success',response.data.message) }).catch(() => {})
              // const userData = getUserData();
              //  this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
              //   .then(() => { this.successToast('Success',response.data.message) }).catch(() => {})
            } else {
              this.errorToast('error', response.data.message)
            }
          })
            .catch(error => {
              const res = error.response
              if (res.status) {
                this.errorToast('Error', res.data.message)
              }
            }).finally(()=>{
              this.isDisabled = false
            })
        }
      })
    },
  },
  created() {
    const userData = getUserData()
    if (userData) {
      this.phone_no = userData.phone_no
    }
  },

};

function is_numeric(str) {
  return /^\d+$/.test(str);
}
/* eslint-disable global-require */
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/pages/page-auth.scss";
.resendOtpDisable{
  pointer-events: none;
  cursor:none;
  opacity: 0.5;
}
</style>

