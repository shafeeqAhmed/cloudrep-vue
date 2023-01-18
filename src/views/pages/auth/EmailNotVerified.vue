<template>
  <div class="auth_wrap">
    <b-row class="">
      <!-- Left Text-->
      <b-col lg="5" class="auth_left_side">
        <auth-left-section />
      </b-col>
      <!-- /Left Text-->
      <b-col v-if="setp > 3" lg="7" class="auth_right_side">
        <!-- validate first part -->
        <div class="login_form">
          <div class="w-100">
            <Login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Validate Your Email Address
            </b-card-title>
            <div>
              <b-alert variant="success" show>
                <div class="alert-body">
                  <span><strong>Congratulations!</strong> You have been verified your email successfully.</span>
                </div>
              </b-alert>
            </div>
          </div>
        </div>
        <!-- success message -->
        <div class="login_form d-none">
          <div  class="w-100">
            <Login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Validate Your Email Address
            </b-card-title>
            <div class="mt-3">
              <div class="d-flex align-items-center">
                <b-avatar rounded class="validate-avatar mr-1 float-left" variant="primary">
                  <feather-icon icon="CheckIcon" size="16" />
                </b-avatar>
                <span class="verication-message">You have successfully <br />
                  created your account</span>
              </div>
              <b-row>
                <b-col lg="10">
                  <b-button type="submit" variant="primary" class="mt-100 text-uppercase" block>
                    continue
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
      <!-- Email verification -->
      <b-col v-else lg="7" class="auth_right_side">
        <!-- validate first part -->
        <div class="login_form">
          <div class="w-100">
            <Login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Validate Your Email Address
            </b-card-title>
            <div>
              <p class="p-subtitle" v-if="linkExpired">
                <b-img src="@/assets/images/auth/Info.png" width="auto" />
                <span class="verication-message ml-2">Your link has expired!</span>
              </p>
              <p class="p-subtitle">
                Your email validation is pending. A confirmation link has been
                sent to
                <b>
                  <i> {{ userEmail }} </i>
                </b>.
              </p>
              <b-row>
                <b-col md="6">
                  <!-- <b-button type="submit" variant="primary" class="mt-3 text-uppercase" block :disabled="isDisabled"
                    @click="resendEmail()">
                    Resend Link
                  </b-button> -->
                  <div class="d-flex align-items-center mt-3 ">
                    <b-link class="log_back mr-2" :to="{ name: 'auth-account-basic-info' }">
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
                    <b-button v-else @click="resendEmail()" type="submit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="submit-btn text-uppercase">
                      Resend Link
                    </b-button>
                  </div>
                </b-col>
                <b-col md="6">
                  <b-button type="submit" variant="outline-primary" class="mt-3 text-uppercase" block @click="changeEmail()">
                    Change Email
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>

        <!-- success message -->
        <div class="login_form d-none">
          <div class="w-100">
            <Login-back />
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
              Validate Your Email Address
            </b-card-title>

            <div class="mt-3">
              <div class="d-flex align-items-center">
                <b-avatar rounded class="validate-avatar mr-1 float-left" variant="primary">
                  <feather-icon icon="CheckIcon" size="16" />
                </b-avatar>
                <span class="verication-message">You have successfully <br />
                  created your account</span>
              </div>
              <b-row>
                <b-col lg="10">
                  <b-button type="submit" variant="primary" class="mt-100 text-uppercase" block>
                    continue
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
      <!-- / Email verification  -->
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
  BAlert,
  BSpinner
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import AuthLeftSection from "./component/AuthLeftSection";
import useJwt from "@/auth/jwt/useJwt";
import { toastAlert } from "@core/mixins/ui/toast";
import { isUserLoggedIn, getUserData, updateRegisterStep, get, save, remove } from '@/auth/utils'
import LoginBack from './component/LoginBack'
import Ripple from 'vue-ripple-directive'
import "@/assets/css/auth.css";
import "@/assets/css/signup-menu.css";

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
    LoginBack,
    BAlert,
    BSpinner
  },
  mixins: [togglePasswordVisibility, toastAlert],
  directives: {
    Ripple,
  },
  data() {
    return {
      isDisabled: false,
      userEmail: '',
      linkExpired: false,
      backgroundImg: require("@/assets/images/auth/background.png"),
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      googleImg: require("@/assets/images/auth/Group.png"),
      facebookImg: require("@/assets/images/auth/facebook.png"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
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
    setp() {
      return this.$store.state.app.user.step
    }
  },
  methods: {
    changeEmail(){
      this.$router.push({ name: 'auth-account-basic-info' });
    },
    resendEmail() {
      this.isDisabled = true;
      useJwt
        .resendEmailVerification()
        .then((response) => {
          const { data } = response;
          this.successToast("Message", data.message);
          this.isDisabled = false;
          this.linkExpired = false;
          save('linkExpired', false)
        })
        .catch(() => {
          this.errorToast(
            "Message",
            "Maximum Try reached!"
          )
        }).finally(()=>{
          this.isDisabled = false;
        })
    },
  },
  created() {

    const isLoggedIn = isUserLoggedIn()
    if (isLoggedIn) {
      const userData = getUserData()
      this.userEmail = userData.email
      this.linkExpired = get('linkExpired')
    }


    const id = get('id')
    const hash = get('hash')
    if (id && hash) {
      const url = `/email/verify/${id}/${hash}`
      this.$http.post(url).then(response => {
        const { data } = response
        localStorage.setItem('userData', JSON.stringify(data.data.userData))
        this.successToast('Success', data.message)

        save('step', 4)
        remove('id')
        remove('hash')

        this.$router.push("/set-2fa").catch(() => { });
      }).catch(() => {
        this.errorToast('Error', "There is some thing going wrong");
        save('linkExpired', true)
        this.linkExpired = true
        this.$router.push("/email-not-verified").catch(() => { });
      })
    }
  }

};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
