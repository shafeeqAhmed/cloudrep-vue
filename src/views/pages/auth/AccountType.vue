<template>
  <div class="auth_wrap">
    <b-row class="">
      <!-- Left Text-->
      <b-col lg="5" class="auth_left_side">
        <auth-left-section />
      </b-col>
      <!-- /Left Text-->

      <!-- Account Type-->
      <b-col lg="7" class="auth_right_side">
        <div class="login_form">
          <div class="w-100">
            <login-back />
            <div class="mt-2 mb-3">
              <b-card-title title-tag="h1" class="mb-1 rs-title">
                Choose Account Type
              </b-card-title>
              <p class="p-subtitle">
                Thanks for choosing Cloud Rep, we're excited to get you started!
              </p>
            </div>
            <div>
              <b-link @click="assignRole('agent')">
                <div class="p-1 d-flex align-items-center signup-card mb-2"
                  :class="role == 'agent' ? 'signup-card-selected' : ''">
                  <b-img src="@/assets/images/auth/Client.png" class="client-img" />
                  <div class="pt-2 pl-2">
                    <p class=" b-title">Agent</p>
                    <p class="text-nero p-subtitle">I am looking to be my own boss and work on my own terms</p>
                  </div>
                  <b-img src="@/assets/images/auth/arrow.png" class="arrow-img" />
                </div>
              </b-link>
              <b-link @click="assignRole('client')">
                <div class="p-1 d-flex align-items-center signup-card mb-2"
                  :class="role == 'client' ? 'signup-card-selected' : ''">
                  <b-img src="@/assets/images/auth/Client.png" class="client-img" />
                  <div class="pt-2 pl-2">
                    <p class=" b-title">Client</p>
                    <p class="text-nero p-subtitle">I am looking to grow my business exponentially</p>
                  </div>
                  <b-img src="@/assets/images/auth/arrow.png" class="arrow-img" />
                </div>
              </b-link>
              <b-link @click="assignRole('publisher')">
                <div class="p-1 d-flex align-items-center signup-card mb-2"
                  :class="role == 'publisher' ? 'signup-card-selected' : ''">
                  <b-img src="@/assets/images/auth/Client.png" class="client-img" />
                  <div class="pt-2 pl-2">
                    <p class=" b-title">Publisher</p>
                    <p class="text-nero p-subtitle">I am looking for the highest conversions and payouts for my efforts
                    </p>
                  </div>
                  <b-img src="@/assets/images/auth/arrow.png" class="arrow-img" />
                </div>
              </b-link>
            </div>
          </div>
        </div>
      </b-col>
      <!-- /Account -->
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
  // BCard,
  // BCardBody
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import AuthLeftSection from './component/AuthLeftSection'
import "@/assets/css/auth.css"
import "@/assets/css/signup-menu.css";
import useAuthLogic from "./useAuthLogic";
import { globalHelper } from "@core/mixins/ui/global";
import LoginBack from './component/LoginBack'
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
    // BCard,
    // BCardBody
  },
  mixins: [togglePasswordVisibility, globalHelper],
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
    loginBack() {
      this.$router.push("{ name: 'auth-login' }")
    }
  },
  setup() {
    const { assignRole, role } = useAuthLogic()
    return {
      assignRole,
      role
    }
  }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
