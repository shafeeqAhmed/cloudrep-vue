<template>
  <div>
    <b-card v-if="!isDataLoading">
      <div class="d-flex justify-content-center align-items-center">
        <b-spinner small />
        <span class="ml-1">Loading...</span>
      </div>
    </b-card>
    <b-card v-else>
      <!-- media -->
      <b-media no-body>
        <b-media-aside>
          <b-link>
            <!-- <b-img rounded src="@/assets/images/avatars/1-small.png" height="80" /> -->
            <b-avatar
              v-if="!isImageUploading"
              rounded
              size="80"
              :src="$store.state.app.user.profile_photo_path"
            />
            <div v-else class="image-upload-loader">
              <b-spinner small />
              <span>Uploading</span>
            </div>
          </b-link>
          <!--/ avatar -->
        </b-media-aside>

        <b-media-body class="mt-75 ml-75">
          <div class="d-flex">
            <!-- upload button -->
            <b-button
              @click="chooseFile('profileImage')"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              size="sm"
              class="mb-75 mr-75"
              :disabled="isImageUploading"
            >
              Browse
            </b-button>
            <b-form-file
              id="profileImage"
              @change="handleImageSelected"
              accept=".jpg, .png, .gif"
              plain
              :hidden="true"
            />
            <!--/ upload button -->

            <!-- reset -->
            <div v-if="$store.state.app.user.profile_photo_path">
              <b-button
                v-if="isImageRemoving"
                disabled
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                variant="outline-primary"
                size="sm"
                class="mb-75 mr-75"
              >
                <div class="d-flex justify-content-center align-items-center">
                  <b-spinner small />
                  <span class="ml-1">Processing ...</span>
                </div>
              </b-button>
              <b-button
                v-else
                @click="removeImage"
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                variant="outline-primary"
                size="sm"
                class="mb-75 mr-75"
              >
                Reset
              </b-button>
            </div>
            <!--/ reset -->
          </div>
          <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
        </b-media-body>
      </b-media>
      <!--/ media -->
      <!-- form -->
      <validation-observer
        ref="generalInformationForm"
        #default="{ invalid }"
      >
        <b-form
          class="auth-register-form mt-2"
          @submit.prevent="updateGeneralInformationForm"
        >
          <b-row>
            <b-col sm="6">
              <!-- username -->
              <b-form-group
                label="First Name"
                label-for="first_name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  vid="first_name"
                  rules="required"
                >
                  <div class="input-gradient">
                    <b-form-input
                      id="first_name"
                      v-model="first_name"
                      name="first_name"
                      :state="errors.length > 0 ? false : null"
                      maxLength="25"
                      placeholder="First Name"
                      @keydown="checkKeyDownAlpha($event)"
                    />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <!-- username -->
              <b-form-group
                label="Last Name"
                label-for="last_name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Last Name"
                  vid="last_name"
                  rules="required"
                >
                  <div class="input-gradient">
                    <b-form-input
                      id="last_name"
                      v-model="last_name"
                      maxLength="25"
                      name="last_name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Last Name"
                      @keydown="checkKeyDownAlpha($event)"
                    />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="6">
              <!-- username -->
              <b-form-group
                label="Email"
                label-for="email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="email"
                  vid="email"
                >
                  <div class="input-gradient">
                    <b-form-input
                      :disabled="true"
                      v-model="email"
                      id="email"
                      name="email"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Email"
                    />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
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
  BFormFile,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BAlert,
  BCard,
  BCardText,
  BMedia,
  BMediaAside,
  BMediaBody,
  BLink,
  BImg,
  BAvatar,
  BSpinner,
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import "@/assets/css/contact-center.css";
import useUploadImage from "@/commonFunction/useUploadImage";
import useAccountSetting from "./useAccountSetting";
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
// import store from '@/store';

export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    BAvatar,
    ValidationProvider,
    ValidationObserver,
    required,
    BSpinner,
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
    checkKeyDownAlpha(event) {
      if (!/[a-zA-Z\s]/.test(event.key)) {
        event.preventDefault();
      }
    },
    updateGeneralInformationForm() {
      this.$refs.generalInformationForm.validate().then((success) => {
        if (success) {
          const check = this.checkValue();
          if (check) {
            this.isDisabled = true;
            this.$http
              .post("update-general-information", {
                first_name: this.first_name,
                last_name: this.last_name,
              })
              .then((response) => {
                if (response.data.status) {
                  this.assignValue();
                  this.successToast(
                    "Success",
                    "General information has been updated successfully!"
                  );
                } else {
                  this.errorToast("Error", response.data.message);
                }
              })
              .catch((error) => {
                this.errorToast(
                  "Error",
                  "Somethign going wrong please try again!"
                );
                this.$refs.generalInformationForm.setErrors(
                  error.response.data.errors
                );
              })
              .finally(() => {
                this.isDisabled = false;
              });
          }
        }
      });
    },
    checkValue() {
      const data = this.$store.state.accountSetting.setting;
      if (
        data &&
        this.first_name == data.first_name &&
        this.last_name == data.last_name
      ) {
        return false;
      } else {
        return true;
      }
    },
    assignValue() {
      this.$store.dispatch("accountSetting/myDetail").then((response) => {
        const data = this.$store.state.accountSetting.setting;
        if (Object.keys(data).length > 0) {
          this.first_name = data.first_name;
          this.last_name = data.last_name;
          this.email = data.email;
          this.isDataLoading = true;
        }
        if (data.first_name.length > 0) {
          this.isUpdate = true;
          this.btnText = 'Update'
        }
      });
    },
  },
  mounted() {
    this.assignValue();
  },

  setup() {
    const {
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
      isImageUploading,
      isImageRemoving,
    } = useUploadImage();

    const { first_name, last_name, email } = useAccountSetting();

    return {
      first_name,
      last_name,
      email,
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
      isImageUploading,
      isImageRemoving
    };
  },
};
</script>
<style lang="scss" scoped>
.image-upload-loader{
  width: 80px;
  height: 80px;
  font-size: 12px;
  border: 1px solid #7A60E0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span{
    margin-top: 10px;
  }
}
</style>
