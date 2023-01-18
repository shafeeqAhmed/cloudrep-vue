<template>
  <div class="auth_wrap">
    <b-row class="">
      <!-- Left Text-->
      <b-col lg="5" class="auth_left_side">
        <auth-left-section />
      </b-col>
      <!-- /Left Text-->

      <!-- Basic Info -->
      <b-col lg="7" class="auth_right_side">
        <div class="login_form">
          <div class="w-100">
              <login-back />
            <b-card-title title-tag="h1" class="mt-2 mb-1 rs-title">
              Sign Up
            </b-card-title>
            <p class="p-subtitle mb-3">
              To get started, Fill this Form!
            </p>
            <!-- form -->
            <!--  -->
            <validation-observer ref="registerForm" #default="{ invalid }">
              <b-form class="auth-login-form sign-up-form-fields mt-2" @submit.prevent="register">
                <!-- Company ID -->
                <b-row>
                  <b-col md="6">
                    <b-form-group class="mb-4">
                      <validation-provider #default="{ errors }" name="First Name" vid="first_name" rules="required" min="15">
                        <div class="input-gradient"  :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                            <b-input-group-prepend is-text>
                              <feather-icon class="" icon="UserIcon" />
                            </b-input-group-prepend>
                            <b-form-input id="first_name" v-model="first_name" :state="errors.length > 0 ? false : null"
                              class="form-control-merge" type="text"  name="first_name" maxLength="25" placeholder="First Name" 
                              @keydown="checkKeyDownAlpha($event)"
                              />
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group class="mb-4">
                      <validation-provider #default="{ errors }" name="Last Name" vid="last_name" rules="required">
                        <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                            <b-input-group-prepend is-text>
                              <feather-icon class="" icon="UserIcon" />
                            </b-input-group-prepend>
                            <b-form-input id="last_name" v-model="last_name" :state="errors.length > 0 ? false : null"
                              class="form-control-merge" type="text" name="last_name" maxLength="25" placeholder="Last Name" 
                              @keydown="checkKeyDownAlpha($event)"
                              />
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>

                <!-- Email -->
                <b-form-group class="mb-4">
                  <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                    <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                      <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                        <b-input-group-prepend is-text>
                          <feather-icon class="" icon="MailIcon" />
                        </b-input-group-prepend>

                        <b-form-input id="register-email" v-model="userEmail" name="register-email"
                          :state="errors.length > 0 ? false : null" placeholder="Email" type="email" />
                      </b-input-group>
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- Password -->
                <b-row>
                  <b-col md="6">
                    <b-form-group>
                      <validation-provider #default="{ errors }" name="Password" vid="password"
                        :rules="step < 3 ? required : ''">
                        <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                            <b-input-group-prepend is-text>
                              <feather-icon class="" icon="LockIcon"/>
                            </b-input-group-prepend>
                            <b-form-input id="password" v-model="password" :state="errors.length > 0 ? false : null"
                              class="form-control-merge" :type="passwordFieldTypeNew" name="password" maxLength="25" placeholder="Password"/>
                            <b-input-group-append is-text>
                              <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                                @click="toggleAction('new')" />
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group>
                      <validation-provider #default="{ errors }" name="Confirm Password" vid="password_confirmation"
                        :rules="step < 3 ? 'required|confirmed:password' : ''">
                        <div class="input-gradient"  :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                            <b-input-group-prepend is-text>
                              <feather-icon class="" icon="LockIcon" />
                            </b-input-group-prepend>
                            <b-form-input id="confirmPassword" v-model="password_confirmation"
                              :state="errors.length > 0 ? false : null" class="form-control-merge" :type="passwordFieldTypeRetype"
                              name="confirmPassword" placeholder="Re-Typed Password" />
                            <b-input-group-append is-text>
                              <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                                @click="toggleAction('confirm')" />
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <div class="passwordSuggestion">
                      <ul id="passwordHelp" class="form-text text-muted">Password should contain
                        <li ref="has_minimum_lenth" :class="has_minimum_lenth ? 'has_required' : ''">atleast 8 chacters</li>
                        <li ref="has_lowercase" :class="has_lowercase ? 'has_required' : ''">one lowercase letter</li>
                        <li ref="has_uppercase" :class="has_uppercase ? 'has_required' : ''">one uppercase letter</li>
                        <li ref="has_number" :class="has_number ? 'has_required' : ''">One number</li>
                        <li ref="has_special" :class="has_special ? 'has_required' : ''">one special character.</li>
                      </ul>
                    </div>
                  </b-col>
                  <b-col md="6"></b-col>
                </b-row>

                <!-- submit buttons -->
                <b-row>
                  <b-col lg="6" md="6">
                    <!-- <b-button type="submit" variant="primary" class="submit-btn mt-3 text-uppercase" block
                      :disabled="isDisabled">
                      Next
                    </b-button> -->
                    <div class="d-flex align-items-center mt-3 ">
                      <b-link class="log_back mr-2" :to="{ name: 'auth-account-type' }">
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
                        Next
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </div>
        </div>
      </b-col>
      <!-- Basic Info -->
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
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import AuthLeftSection from "./component/AuthLeftSection";
import "@/assets/css/auth.css";
import "@/assets/css/signup-menu.css";
import useAuthLogic from "./useAuthLogic";
import useJwt from "@/auth/jwt/useJwt";
import { toastAlert } from "@core/mixins/ui/toast";
import {
  isUserLoggedIn,
  getUserData,
  updateRegisterStep,
  get,
  save,
} from "@/auth/utils";
import { globalHelper } from "@core/mixins/ui/global";
import LoginBack from "./component/LoginBack";
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
    LoginBack,
    BSpinner
  },
  mixins: [togglePasswordVisibility, toastAlert, globalHelper],
  directives: {
    Ripple,
  },
  data() {
    return {
      backgroundImg: require("@/assets/images/auth/background.png"),
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      googleImg: require("@/assets/images/auth/Group.png"),
      facebookImg: require("@/assets/images/auth/facebook.png"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      has_minimum_lenth: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
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
    step() {
      return get('step')
    }
  },
  watch:{
    password(){
      this.has_minimum_lenth = (this.password.length > 8);
      this.has_number    = /\d/.test(this.password);
      this.has_lowercase = /[a-z]/.test(this.password);
      this.has_uppercase = /[A-Z]/.test(this.password);
      this.has_special   = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
    }
  },
  methods: {
    toggleAction(type){
      if(type == 'new'){
        this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
      }
      if(type == 'confirm'){
        this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
      }
    },
    checkKeyDownAlpha(event) {
      if (!/[a-zA-Z\s]/.test(event.key)) {
        event.preventDefault();
      }
    },
    checkPassword() {
      if (this.has_minimum_lenth && this.has_number && this.has_lowercase && this.has_uppercase && this.has_special) {
        return true;
      }else{
        if(!this.has_minimum_lenth){
          this.$refs.has_minimum_lenth.style.color = 'red';
        }
        if(!this.has_number){
          this.$refs.has_number.style.color = 'red';
        }
        if(!this.has_lowercase){
          this.$refs.has_lowercase.style.color = 'red';
        }
        if(!this.has_uppercase){
          this.$refs.has_uppercase.style.color = 'red';
        }
        if(!this.has_special){
          this.$refs.has_special.style.color = 'red';
        }
        return false;
      }
    },
    insertForm(formData) {
      useJwt
        .register(formData)
        .then((response) => {
          this.isDisabled = false;

          const {
            data: { data },
          } = response;
          const { userData, accessToken, refreshToken, isVerified2fa } = data;
          userData.accessToken = accessToken
          userData.refreshToken = refreshToken

          this.$store.commit('app/UPDATE_USER', userData)

          useJwt.setToken(accessToken);
          useJwt.setRefreshToken(refreshToken);
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("isVerified2fa", isVerified2fa);
          this.$ability.update(userData.ability);

          this.successToast("Success", response.data.message);
          updateRegisterStep(3);
          this.$router.push("/email-not-verified").catch(() => { });
        })
        .catch((error) => {

          if (error.response.status == 422) {
            this.errorToast("Error", error.response.data.message);
          } else {
            this.errorToast("Error", "something is going wrong ");
          }

          this.$refs.registerForm.setErrors(error.response.data.errors);
        }).finally(() => {
          this.isDisabled = false;

        });
    },
    updateForm(formData) {
      this.$http.post('/update-basic-info', formData)
        .then((response) => {
          this.successToast("Success", response.data.message);
          this.isDisabled = false;
          const { data: { data } } = response;

          console.log('---------11111111111---------')
          console.log(data)

          const userData = get('userData')
          userData.first_name = data.first_name
          userData.last_name = data.last_name
          userData.email = data.email
          userData.step = data.step
          console.log('---------222222222222222222---------')
          console.log(data)

          this.$store.commit('app/UPDATE_USER', userData)
          save('userData', userData)
          save('step', data.step)

          if (data.step == 3) {
            save('isVerified2fa', false)
            this.$router.push("/email-not-verified").catch(() => { });
          } else {
            this.$router.push("/set-2fa").catch(() => { });

          }


        })
        .catch((error) => {

          if (error.response.status == 422) {
            this.errorToast("Error", error.response.data.message);
          } else {
            this.errorToast("Error", "something is going wrong ");
          }

          this.$refs.registerForm.setErrors(error.response.data.errors);
        }).finally(() => {
          this.isDisabled = false;
        });

    },
    register() {

      if(!this.checkPassword()){
        return false
      }

      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.isDisabled = true;
          const formData = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.userEmail,
            password: this.password,
            password_confirmation: this.password_confirmation,
          };
          // console.log('===============================')
          // console.log(formData)
          // console.log(get('step'))
          if (get('step') < 3) {
            formData.role = get("role")
            this.insertForm(formData)
          } else {

            this.updateForm(formData)

          }
        }
      });
    },
  },
  setup() {
    const {
      role,
      first_name,
      last_name,
      userEmail,
      password,
      password_confirmation,
      isDisabled,
    } = useAuthLogic();

    const isUserLogin = isUserLoggedIn();
    if (isUserLogin) {
      const user = getUserData();
      console.log(user.email);
      first_name.value = user.first_name;
      last_name.value = user.last_name;
      userEmail.value = user.email;
    }

    return {
      isUserLogin,
      role,
      first_name,
      last_name,
      userEmail,
      password,
      password_confirmation,
      isDisabled,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
.passwordSuggestion{
  border: 1px solid #b9b9c3;
  padding: 15px 0px;
  margin-top: 10px;
  border-radius: 5px;
  ul{
    margin: auto;
    li{
      margin: 5px;
    }
  }
}
.has_required{
    text-decoration: line-through !important;
    color:#689868 !important ;
}
</style>
