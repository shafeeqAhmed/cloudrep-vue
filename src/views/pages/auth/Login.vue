<template>
  <div class="auth_wrap">
    <b-row>
      <b-col lg="5" :style="{ backgroundImage: 'url(' + backgroundImg + ')' }" class="auth_left_side"></b-col>

      <b-col lg="7" class="auth_right_side">
        <div class="login_form">
          <div class="w-100">
            <b-img src="@/assets/images/auth/company-logo.png" class="company-logo mb-5" />
            <h2>Sign Into Your Account</h2>
            <validation-observer ref="loginForm" #default="{ invalid }">
              <b-form class="auth-login-form mt-2" @submit.prevent="login">
                <!-- Company ID -->
                <b-form-group class="mb-2">
                  <label>Email ID</label>
                  <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                    <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                      <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                        <b-input-group-prepend is-text>
                          <feather-icon class="" icon="BriefcaseIcon" />
                        </b-input-group-prepend>
                        <b-form-input 
                          type="email" 
                          id="email" 
                          name="email"
                          v-model="userEmail"
                          class="form-control-merge" 
                          placeholder="Email address" 
                          autocomplete="off"
                          :state="errors.length > 0 ? false : null" 
                        />
                      </b-input-group>
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group>
                  <label>Password</label>
                  <validation-provider #default="{ errors }" name="Password" rules="required">
                    <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                      <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                        <b-input-group-prepend is-text>
                          <feather-icon class="" icon="LockIcon" />
                        </b-input-group-prepend>
                        <b-form-input id="login-password" autocomplete="off" v-model="password"
                          :state="errors.length > 0 ? false : null" class="form-control-merge" :type="passwordFieldType"
                          name="login-password" placeholder="Password" />
                        <b-input-group-append is-text>
                          <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                            @click="togglePasswordVisibility" />
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-form-group>
                  <div class="d-flex justify-content-between mt-1">
                    <b-form-checkbox id="register-privacy-policy" v-model="status" name="checkbox-1">
                      Remember me
                    </b-form-checkbox>
                    <b-link :to="{ name: 'auth-forgot-password' }">
                      <small>Forgot Password?</small>
                    </b-link>
                  </div>
                </b-form-group>
                <!-- submit buttons -->
                <!-- <b-button type="submit" variant="primary" class="submit-btn mt-3 text-uppercase" block
                  :disabled="isDisabled">
                  Sign in
                </b-button> -->
                <b-button v-if="isDisabled" variant="primary" disabled class="submit-btn mt-3 text-uppercase">
                  <div class="d-flex justify-content-center align-items-center">
                    <b-spinner small />
                    <span class="ml-1">Processing ...</span>
                  </div>
                </b-button>

                <b-button v-else type="submit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="submit-btn mt-3 text-uppercase">
                  Sign in
                </b-button>
              </b-form>
            </validation-observer>
            <b-card-text class="text-left mt-2 account">
              <span>Don’t have an account yet? </span>
              <b-link :to="{ name: 'auth-register' }">
                <span class="signup-link">&nbsp;Sign Up Now</span>
              </b-link>
            </b-card-text>
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
  BSpinner
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { toastAlert } from "@core/mixins/ui/toast";
import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser, save } from '@/auth/utils'
import store from "@/store/index";
import "@/assets/css/auth.css"
import useAuthLogic from "./useAuthLogic";
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
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BSpinner
  },
  mixins: [togglePasswordVisibility, toastAlert],
  directives: {
    Ripple,
  },
  data() {
    return {
      isDisabled: false,
      status: "",
      password: "",
      userEmail: "",
      backgroundImg: require("@/assets/images/auth/signin.png"),
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
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.isDisabled = true
          useJwt.login({
            email: this.userEmail,
            password: this.password,
          })
            .then(response => {
              this.isDisabled = false
              const { data: { data } } = response
              const { userData, accessToken, refreshToken, isVerified2fa } = data

              userData.accessToken = accessToken
              userData.isVerified2fa = isVerified2fa

              useJwt.setToken(accessToken)
              useJwt.setRefreshToken(refreshToken)
              localStorage.setItem('userData', JSON.stringify(userData))
              localStorage.setItem('isVerified2fa', isVerified2fa)
              localStorage.setItem('rememberMe', JSON.stringify(this.status))
              this.$ability.update(userData.ability)
              if (userData.step != 6) {
                save('step', userData.step)
                save('role', userData.role)
                const { getCurrentStepRoute } = useAuthLogic();
                return this.$router.push({ name: getCurrentStepRoute(userData.step) }).catch(() => { })
              }
              store.commit('app/UPDATE_USER', userData)

              // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
              this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
                .then(() => {
                  this.successToast(`Welcome ${userData.name}`, `You have successfully logged in as ${userData.role}. Now you can start to explore!`)
                })
                .catch(() => { })
            })
            .catch(error => {
              this.$refs.loginForm.setErrors(error.response.data.errors)
            }).finally(()=>{
              this.isDisabled = false
            });
        }
      })
    },
  },
  created() {
    if (this.$store.state.app.isLogoutOn401) {
      this.customToast('warning', 'Wargin', 'Your access token has been expired please login again!')
      store.commit('app/UPDATE_IS_LOGOUT_ON_401', false)

    }
  }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";

.login-left-side {
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0px;
  }


}
</style>
