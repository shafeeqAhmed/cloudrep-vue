<template>
  <b-card>
    <!-- form -->
    <validation-observer ref="changePassword" #default="{ invalid }">
      <b-form class="auth-register-form mt-2" @submit.prevent="saveChangePassword">


        <b-row>
          <!-- old password -->
          <b-col md="6">
            <b-form-group label="Old Password" label-for="old_password">
              <validation-provider #default="{ errors }" name="Old Password" vid="old_password" rules="required">

                <div class="input-gradient">
                  <b-input-group class="input-group-merge">
                    <b-form-input class="account-setting-password" id="old_password" v-model="old_password"
                      :state="errors.length > 0 ? false : null" name="old_password" :type="passwordFieldTypeOld"
                      placeholder="Old Password" />
                    <b-input-group-append is-text>
                      <feather-icon :icon="passwordToggleIconOld" class="cursor-pointer" @click="toggleAction('old')" />
                    </b-input-group-append>
                  </b-input-group>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!--/ old password -->
        </b-row>
        <b-row>
          <!-- new password -->
          <b-col md="6">
            <b-form-group label="Password" label-for="password">
              <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">

                <div class="input-gradient">
                  <b-input-group class="input-group-merge">
                    <b-form-input class="account-setting-password" id="password" v-model="password"
                      :state="errors.length > 0 ? false : null" name="password" :type="passwordFieldTypeNew"
                      placeholder=" Password" maxLength="25"/>
                    <b-input-group-append is-text>
                      <feather-icon :icon="passwordToggleIconNew" class="cursor-pointer" @click="toggleAction('new')" />
                    </b-input-group-append>
                  </b-input-group>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!--/ new password -->

          <!-- retype password -->
          <b-col md="6">
            <b-form-group label="Confirm Password" label-for="confirm_password">
              <validation-provider #default="{ errors }" name="Confirm Password" vid="confirm_password"
                rules="required|confirmed:password">

                <div class="input-gradient">
                  <b-input-group class="input-group-merge">
                    <b-form-input class="account-setting-password" id="confirm_password" v-model="password_confirmation"
                      :state="errors.length > 0 ? false : null" name="confirm_password" :type="passwordFieldTypeRetype"
                      placeholder="Confirm Password" />
                    <b-input-group-append is-text>
                      <feather-icon :icon="passwordToggleIconRetype" class="cursor-pointer" @click="toggleAction('rePassword')" />
                    </b-input-group-append>
                  </b-input-group>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!--/ retype password -->

          <b-col cols="12">
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
          <!-- buttons -->
          <b-col cols="12">

            <b-button v-if="isDisabled" variant="primary" disabled class="mt-1 mr-1">
              <div class="d-flex justify-content-center align-items-center">
                <b-spinner small />
                <span class="ml-1">Processing...</span>
              </div>
            </b-button>

            <b-button v-else type="submit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1">
              Update
            </b-button>

          </b-col>
          <!--/ buttons -->
        </b-row>



      </b-form>
    </validation-observer>

  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend, BSpinner
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import "@/assets/css/auth.css";
import "@/assets/css/contact-center.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations"
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
    BSpinner
  },
  mixins: [toastAlert],

  directives: {
    Ripple,
  },
  data() {
    return {
      old_password: '',
      password: '',
      password_confirmation: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
      has_minimum_lenth: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      isDisabled: false,
    }
  },
  computed: {
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
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
      if(type == 'old'){
        this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
      }
      if(type == 'new'){
        this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
      }
      if(type == 'rePassword'){
        this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
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
    saveChangePassword() {
      this.$refs.changePassword.validate().then(success => {
        if (success) {
          //Password Strength Validation
          if(!this.checkPassword()){
            return false;
          }

          if(this.old_password === this.password){
            this.errorToast('Error', 'New Password cannot be old password!')
            return false;
          }

          this.isDisabled = true;

          this.$http.post('change-password', {
            old_password: this.old_password,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
            .then(response => {
              if(response.data.status){
                this.successToast('Success', 'Password has been updated successfully!')
              }else{
                this.errorToast('Error', response.data.message)
              }
            })
            .catch(error => {
              console.log('error',error)
              this.errorToast('Error', 'Something going wrong please try again!')
              this.$refs.changePassword.setErrors(error.response.data.errors)
            }).finally(()=> {
              this.isDisabled = false;
            })
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
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
