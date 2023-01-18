<template>
  <div class="auth_wrap">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col
        lg="5"
        :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
        class="auth_left_side"
      >
      </b-col>
      <!-- Login-->
      <b-col
        lg="7"
        class="auth_right_side"
      >
        <div class="login_form">
          <div class="w-100">
            <b-img src="@/assets/images/auth/company-logo.png" class="company-logo mb-2" />
            <LoginBack />
            <div class="mt-3">
              <b-card-title title-tag="h1" class="mb-1 rs-title">
                New Password
              </b-card-title>
              <p class="text-dark">Never share your password with anyone.</p>
            </div>
            <!-- form -->
            <validation-observer ref="registerForm" #default="{ invalid }">
              <b-form class="auth-login-form mt-5" @submit.prevent="reset">
                
                <!-- Company ID -->
                <b-form-group class="mb-3">
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    vid="email"
                    rules="required|email"
                  >
                  <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon
                          class="cursor-pointer"
                          icon="BriefcaseIcon"
                        />
                      </b-input-group-prepend>
                      <b-form-input
                        id="email"
                        v-model="userEmail"
                        :state="errors.length > 0 ? false : null"
                        class="form-control-merge"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </b-input-group>
                  </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- Password -->
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="Password"
                    vid="password"
                    rules="required"
                  >
                  <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon
                          class="cursor-pointer"
                          icon="LockIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-prepend>
                      <b-form-input
                        id="password"
                        v-model="password"
                        type="password"
                        :state="errors.length > 0 ? false : null"
                        class="form-control-merge"
                        name="password"
                        placeholder="Password"
                      />
                    </b-input-group>
                  </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <!-- Re-Type Password -->
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="New Password"
                    vid="confirmPassword"
                    rules="required|confirmed:password"
                  >
                  <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon
                          class="cursor-pointer"
                          icon="LockIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-prepend>
                      <b-form-input
                        id="login-newPassword"
                        v-model="password_confirmation"
                        type="password"
                        :state="errors.length > 0 ? false : null"
                        class="form-control-merge"
                        name="login-password"
                        placeholder="Re-Type Password"
                      />
                    </b-input-group>
                  </div>
                    
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <!-- submit buttons -->
                <b-button
                  type="submit"
                  variant="primary"
                  class="submit-btn mt-5 text-uppercase"
                  block
                  :disabled="isDisabled"
                >
                  Reset Password
                </b-button>
              </b-form>
            </validation-observer>
          </div>
        </div>
      </b-col>
      <!-- /Login-->
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
  BButton,
  BInputGroupPrepend,
} from "bootstrap-vue";
import { required, confirmed } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import "@/assets/css/auth.css"
import { toastAlert } from "@core/mixins/ui/toast";
import {  getUserData  } from '@/auth/utils'
import useJwt from "@/auth/jwt/useJwt";
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
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    LoginBack,
  },
  mixins: [togglePasswordVisibility,toastAlert],
  created() {
      const userData = getUserData()
    if(userData) {
      this.userEmail = userData.email
    }
    this.token = this.$route.query.token
    if(!this.token) {
      this.$router.push('/login')
    }
  },
  data() {
    return {
      isDisabled: false,
      token : '',
      userEmail: '',
      password: "",
      password_confirmation: '',
      backgroundImg: require("@/assets/images/auth/signin.png"),
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      googleImg: require("@/assets/images/auth/Group.png"),
      facebookImg: require("@/assets/images/auth/facebook.png"),
      // validation rulesimport store from '@/store/index'
      required,
      confirmed,
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
   reset() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.isDisabled = true
          useJwt
            .resetPassword({
              token: this.token,
              email: this.userEmail,
              password: this.password,
              password_confirmation: this.password_confirmation,
              })
            .then((response) => {
              this.isDisabled = false
              const { data } = response

            if(data.status) {
              this.successToast('Congratulation',data.message)
              this.$router.push("/login");
            }else {
            this.errorToast('Error',data.message)

            }
            })
            .catch((error) => {
              this.isDisabled = false
              this.$refs.registerForm.setErrors(error.response.data.errors);
            });
        }
      });
    },
  },
  
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
