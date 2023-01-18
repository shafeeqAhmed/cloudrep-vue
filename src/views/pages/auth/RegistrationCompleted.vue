<template>
  <div class="auth_wrap">
    <b-row class="">
      <!-- Left Text-->
      <b-col lg="5" class="auth_left_side">
        <auth-left-section />
      </b-col>
      <!-- /Left Text-->

      <!-- Regitration Completed -->
     <b-col lg="7" class="auth_right_side" >
        <div class="login_form">
          <div class="w-100">
            <login-back />
          <div>
            <b-card-title title-tag="h1" class="mb-1 rs-title mt-2">
            Great, all done!
            </b-card-title>
            <div class="text-center mt-3 w-75">
                <img src="@/assets/images/auth/done.png" class="mb-2" alt="">
              <div>
                <p class="verication-message"
                >You have successfully
                created your account</p>
              </div>
              <!-- form -->
              <b-row>
                <b-col lg="12">
                  <b-button
                    type="submit"
                    variant="primary"
                    class="mt-5 text-uppercase"
                    @click="completeRegistration"
                  >
                    Continue
                  </b-button>
                </b-col>
              </b-row>
            </div>
            
          </div>
          </div>
        </div>
      </b-col>
      <!-- /Regitration Completed -->
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
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import AuthLeftSection from './component/AuthLeftSection'
import { remove,save, getHomeRouteForLoggedInUser,getUserData } from '@/auth/utils'
import { toastAlert } from "@core/mixins/ui/toast";
import LoginBack from './component/LoginBack'

import "@/assets/css/auth.css"
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
    LoginBack
  },
  mixins: [togglePasswordVisibility,toastAlert],
  data() {
    return {
      status: "",
      password: "",
      companyId: "",
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
  },
  methods: {
    completeRegistration() {
      const userData = getUserData()
      remove('step')
      save('acountHealth',true)
        this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
          .then(() => {
            const message = "Welcome "+userData.name+" You have successfully logged in as "+userData.role+". Now you can start to explore!"
          this.successToast('success',message)
                })
          .catch(() => {})
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
