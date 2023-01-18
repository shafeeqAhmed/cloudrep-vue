<template>
  <div class="auth_wrap">
    <b-row class="">
      <b-col lg="5" :style="{ backgroundImage: 'url(' + backgroundImg + ')' }" class="auth_left_side" >
      </b-col>
      <b-col lg="7"  class="auth_right_side" >
        <div class="login_form">
          <div class="w-100">
            <b-img src="@/assets/images/auth/company-logo.png"  class="company-logo mb-2" />
            <LoginBack />
            <div class="mt-3">
              <b-card-title title-tag="h1" class="mb-1 rs-title mt-3">
                Reset Password
              </b-card-title>
              <p class="text-nero p-subtitle">
                Enter the email associated with your account to recieve a link to
                reset your password. Never share your password with anyone.
              </p>
            </div>
            <!-- form -->
            <validation-observer ref="simpleRules">
              <b-form class="auth-login-form mt-5" 
                @submit.prevent="forgotPassword"
              >
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="Email Address"
                    vid="email"
                    rules="required|email"
                  >
                  <div class="input-gradient"  :class="errors.length > 0 ? 'is-invalid' : null">
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
                        placeholder="Company ID"
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
                  Send Link In Email
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
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "@/assets/css/auth.css"
import useJwt from '@/auth/jwt/useJwt'
import { toastAlert } from "@core/mixins/ui/toast";
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
    LoginBack
  },
  mixins: [togglePasswordVisibility,toastAlert],
  data() {
    return {
      isDisabled: false,
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
    forgotPassword() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.isDisabled= true
        useJwt.forgotPassword({
            email: this.userEmail,
          }).then(response => {
                      this.isDisabled= false
            if(!response.data.status) {
                    this.$refs.simpleRules.setErrors({email: [response.data.message]})
            }
            if(response.data.status){
              this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: response.data.message,
                    },
                  })
            }
            })
            .catch(error => {
                        this.isDisabled= false
              this.$refs.simpleRules.setErrors(error.response.data.errors)
            })
        }
      })
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
