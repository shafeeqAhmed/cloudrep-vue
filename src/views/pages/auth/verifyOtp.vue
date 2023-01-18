<template>
  <div class="auth_wrap">
    <b-row class="">
      <b-col lg="5" class="auth_left_side" :style="{ backgroundImage: 'url(' + backgroundImg + ')' }" ></b-col>

      <b-col lg="7" class="auth_right_side">
        <div class="login_form">
         <div class="w-100">
            <login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Add Security Code
            </b-card-title>
            <p class="text-nero p-subtitle">
              A 4-digit code has been sent to your phone number ending with
              <b><i>{{ phone_no }}</i></b>. Please enter the code below.
            </p>
            <validation-observer ref="simpleRules">
              <b-form class="auth-login-form mt-5" 
                @submit.prevent="verifyTwofaCode"
              >
                <div class="d-flex justify-content-between otp-verify-gradient">
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input
                      ref="codeOneInput"
                      v-model="n1"
                      class="verify"
                      id="h-number"
                      type="text"
                      placeholder="0"
                      v-on:keyup="gotoCodetwo"
                    />
                    </div>
                  </b-form-group>
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input
                      v-model="n2"
                      class="verify"
                      id="code2"
                      type="text"
                      placeholder="0"
                      v-on:keyup="gotoCodethree"
                    />
                    </div>
                    
                  </b-form-group>
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input
                      v-model="n3"
                      class="verify"
                      id="code3"
                      type="text"
                      placeholder="0"
                      v-on:keyup="gotoCodefour"
                    />
                    </div>
                    
                  </b-form-group>
                  <b-form-group class="mr-1">
                    <div class="input-gradient">
                      <b-form-input
                      v-model="n4"
                      class="verify"
                      id="code4"
                      type="text"
                      placeholder="0"
                      v-on:keyup="focusContinue"
                    />
                    </div>
                    
                  </b-form-group>
                </div>
                <p :class="isResendOtp == true ? 'resendOtpDisable' : ''">
                  <b-img src="@/assets/images/auth/Union.png" />
                  <b-link class="ml-1" @click="resendOtp">
                    <small>Resend Security Code</small>
                  </b-link>
                </p>
                  
                <!-- <b-button
                  type="submit"
                  variant="primary"
                  class="mt-2 text-uppercase"
                  id="continue"
                >
                  Continue
                </b-button> -->


                <b-button v-if="isDisabled" variant="primary" disabled class="submit-btn mt-3 text-uppercase">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-spinner small />
                    <span class="ml-1">Processing ...</span>
                  </div>
                </b-button>

                <b-button v-else id="continue" type="submit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="submit-btn mt-3 text-uppercase">
                  Continue
                </b-button>
              </b-form>
            </validation-observer>
         </div>
        </div>
      </b-col>
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
  BSpinner
} from "bootstrap-vue";
import { required, email } from "@validations";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";
import { toastAlert } from "@core/mixins/ui/toast";
import { getUserData, updateRegisterStep,getHomeRouteForLoggedInUser,save } from '@/auth/utils'
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
    BSpinner
  },
  mixins: [toastAlert],
  directives: {
    Ripple,
  },
  data() {
    return {
      isDisabled: false,
      n1: '',
      n2: '',
      n3: '',
      n4: '',
      phone_no: '',
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      backgroundImg: require("@/assets/images/auth/signin.png"),
      required,
      isResendOtp: false
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
  },
  methods: {
    resendOtp() {
      this.isResendOtp = true;
      this.$http.get('get-2fa').then(response=>{
        this.successToast('Success',response.data.message)
      })
      .catch()
      .finally(()=>{
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
          this.code = this.n1+this.n2+this.n3+this.n4
        useJwt.verifyTwofaCode({
            code: this.code,
          }).then(response => {
            
            localStorage.setItem('isVerified2fa', JSON.stringify(response.data.status))
            if(response.data.status){
              save('acountHealth',true)
              const userData = getUserData();
               this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
                .then(() => { this.successToast('Success',response.data.message) }).catch(() => {})
            } else {
              this.errorToast('error',response.data.message)
            }
            })
            .catch(error => {
              const res = error.response
              if(res.status) {
                this.errorToast('Error',res.data.message)
              }else{
              this.$refs.simpleRules.setErrors(error.response.data.errors)
              }
            }).finally(()=>{
              this.isDisabled = false
            })
        }
      })
    },
    getUserApplicationSetting() {
      this.$http
        .get("get-user-appilcation-setting")
        .then((response) => {
          const {
            data: {
              data: { userApplicationSetting },
            },
          } = response;
          this.$store.commit(
            "appConfig/UPDATE_SKIN",
            userApplicationSetting.is_dark_mode == 1 ? "dark" : "light"
          );
        })
    },
  },
  created() {
    this.getUserApplicationSetting()
    const userData = getUserData()
    if(userData) {
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

