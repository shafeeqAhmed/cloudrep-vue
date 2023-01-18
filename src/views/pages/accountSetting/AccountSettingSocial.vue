<template>
  <div>
    <b-card v-if="!isDataLoading">
      <div class="d-flex justify-content-center align-items-center">
        <b-spinner small />
        <span class="ml-1">Loading...</span>
      </div>
    </b-card>
    <b-card v-else>
      <!-- form -->
      <validation-observer ref="socialLink" #default="{ invalid }" @submit.prevent="updateSocialLink">
        <b-form class="auth-register-form mt-2" >
          <b-row>
            <b-col cols="12">
              <div class="d-flex align-items-center mb-2">
                <feather-icon icon="LinkIcon" size="18" />
                <h4 class="mb-0 ml-75">Social Links</h4>
              </div>
            </b-col>

            <!-- twitter -->
            <b-col md="6">
              <b-form-group label="Twitter" label-for="twiter">
                <validation-provider #default="{ errors }" name="Twitter" vid="twitter" rules="required|url">
                  <div class="input-gradient">
                    <b-form-input id="twitter" v-model="twitter" :state="errors.length > 0 ? false : null"
                    placeholder="Twitter Url" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ twitter -->

            <!-- facebook -->
            <b-col md="6">
              <b-form-group label="Facebook" label-for="facebook">
                <validation-provider #default="{ errors }" name="Facebook" vid="facebook" rules="required|url">
                  <div class="input-gradient">
                    <b-form-input id="facebook" v-model="facebook" name="facebook" :state="errors.length > 0 ? false : null"
                    placeholder="Facebook Url" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ facebook -->

            <!-- google+ -->
            <b-col md="6">
              <b-form-group label="Google+" label-for="google">
                <validation-provider #default="{ errors }" name="Google" vid="google" rules="required|url">
                  <div class="input-gradient">
                    <b-form-input id="google" v-model="google" name="google" :state="errors.length > 0 ? false : null"
                    placeholder="Google Url" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ google+ -->

            <!-- linkedin -->
            <b-col md="6">
              <b-form-group label="Linkedin" label-for="linkedin">
                <validation-provider #default="{ errors }" name="linkedin" vid="linkedin" rules="required|url">
                  <div class="input-gradient">
                    <b-form-input id="linkedin" v-model="linkedin" name="linkedin" :state="errors.length > 0 ? false : null"
                    placeholder="Linkedin Url" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- linkedin -->

            <!-- instagram -->
            <b-col md="6">
              <b-form-group label="Instagram" label-for="instagram">
                <validation-provider #default="{ errors }" name="instagram" vid="instagram" rules="required|url">
                  <div class="input-gradient">
                    <b-form-input id="linkedin" v-model="instagram" name="instagram"
                    :state="errors.length > 0 ? false : null" placeholder="Instagram Url" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ instagram -->

            <!-- quora -->
            <b-col md="6">
              <b-form-group label="Quora" label-for="quora">
                <validation-provider #default="{ errors }" name="quora" vid="quora" rules="required|url">
                  <div class="input-gradient">
                    <b-form-input id="quora" v-model="quora" name="quora" :state="errors.length > 0 ? false : null"
                    placeholder="Quora Url" />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--/ quora -->


            <!-- Profile Connections -->
            <!-- <b-col cols="12" class="mt-1">
              <div class="d-flex align-items-center mb-3">
                <feather-icon icon="UserIcon" size="18" />
                <h4 class="mb-0 ml-75">Profile Connections</h4>
              </div>
              <b-row class="text-center">
                <b-col md="3" cols="6" class="mb-1">
                  <b-card-text class="font-weight-bold">
                    Twitter
                  </b-card-text>
                  <div class="mb-1">
                    <b-avatar size="40" src="@/assets/images/avatars/1-small.png" />
                  </div>
                  <b-card-text class="mb-0"> </b-card-text>
                  <b-link> Disconnect </b-link>
                </b-col>

                <b-col md="3" cols="6" class="mb-1">
                  <b-card-text class="font-weight-bold mb-2">
                    Facebook
                  </b-card-text>
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">
                    Connect
                  </b-button>
                </b-col>

                <b-col md="3" cols="6" class="mb-1">
                  <b-card-text class="font-weight-bold">
                    Your Google
                  </b-card-text>
                  <div class="mb-1">
                    <b-avatar size="40" src="@/assets/images/avatars/2-small.png" />
                  </div>
                  <b-card-text class="mb-0"> </b-card-text>
                  <b-link> Disconnect </b-link>
                </b-col>

                <b-col md="3" cols="6" class="mb-1">
                  <b-card-text class="font-weight-bold mb-2">
                    Your GitHub
                  </b-card-text>
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">
                    Connect
                  </b-button>
                </b-col>
              </b-row>
            </b-col> -->

            <b-col cols="12">
              <b-button
                v-if="isDisabled"
                disabled
                type="submit"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
              >
                <div class="d-flex justify-content-center align-items-center">
                  <b-spinner small />
                  <span class="ml-1">Processing ...</span>
                </div>
              </b-button>
              <b-button
              v-else
                type="submit"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
              >
                {{ btnText }}
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>

<script>
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
  BAvatar,
  BSpinner
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import "@/assets/css/auth.css";
import "@/assets/css/contact-center.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
import useAccountSetting from "./useAccountSetting";
import store from "@/store";
// import { facebook_url, linked_in_url, twitter_url } from "@core/utils/validations/validations"

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BCardText,
    BLink,
    BAvatar,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
    required
  },
  directives: {
    Ripple,
  },
  mixins: [toastAlert],

  data() {
    return {
      isDataLoading: false,
      isDisabled: false,
      isUpdate: false,
      btnText: 'Save',
    };
  },
  methods: {
    updateSocialLink() {
      this.$refs.socialLink.validate().then((success) => {
        if (success) {
          const check = this.checkValue();
          if(check){
            this.isDisabled = true;
            this.$http
              .post("update-social-link", {
                twitter: this.twitter,
                facebook: this.facebook,
                google: this.google,
                linkedin: this.linkedin,
                instagram: this.instagram,
                quora: this.quora,
              })
              .then((response) => {
                if(response.data.status){
                  this.assignValue();
                  this.successToast( "Success", "Social Link has been updated successfully!");
                }else{
                  this.errorToast('Error', response.data.message)
                }
              })
              .catch((error) => {
                this.errorToast(
                  "Error",
                  "Somethign going wrong please try again!"
                );
                this.$refs.socialLink.setErrors(error.response.data.errors);
              }).finally(()=>{
                this.isDisabled = false;
              })
          }
        }
      });
    },
    checkValue(){
      const data = this.$store.state.accountSetting.setting
      if (
        data 
        && this.twitter == data.twitter
        && this.facebook == data.facebook
        && this.google == data.google
        && this.linkedin == data.linkedin
        && this.instagram == data.instagram
        && this.quora == data.quora
        ) 
      {
        return false;
      }else{
        return true;
      }
    },
    assignValue(){
      this.$store.dispatch('accountSetting/myDetail').then((response)=>{
        const data = this.$store.state.accountSetting.setting
        if (Object.keys(data).length > 0) {
          this.twitter = data.twitter;
          this.facebook = data.facebook;
          this.google = data.google;
          this.linkedin = data.linkedin;
          this.instagram = data.instagram;
          this.quora = data.quora;
          this.isDataLoading = true
        }
        if(data.twitter.length > 0){
          this.isUpdate = true
          this.btnText = 'Update'
        }
      })
    }
  },
  mounted() {
    this.assignValue();
  },
  setup() {
    const { twitter, facebook, google, linkedin, instagram, quora } =
      useAccountSetting();

    return {
      twitter,
      facebook,
      google,
      linkedin,
      instagram,
      quora,
    };
  },
};
</script>
