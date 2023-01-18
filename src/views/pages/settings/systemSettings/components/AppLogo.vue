<template>
  <div>
    <b-row>
      <b-col lg="6" md="6">
        <div class="d-flex justify-content-between">
          <b-card-title>
            <h3>App Logo Light</h3>
          </b-card-title>
        </div>
        <div class="input-gradient">
          <div class="image-upload-box">
            <b-form-group class="w-100">
              <b-form-file
                id="courseImage"
                @change="handleImageSelected"
                accept=".jpg, .png, .gif"
                plain
                :hidden="true"
              />
              <div v-if="!imageUrl" @click="chooseFile('courseImage')" class="image-sub-upload-box w-100" >
                <div class="text-center">
                  <img src="@/assets/images/icons/upload-img.png" class="mb-3" />
                  <p>click to upload.</p>
                </div>
              </div>
              <div v-if="isUploading == 1" class="image-sub-upload-box w-100">
                <div class="text-center">
                  <b-spinner class="ml-auto mb-1"></b-spinner><br />
                  <strong>Upload File...</strong>
                </div>
              </div>
              <div v-if="imageUrl && isUploading == 0" class="image-sub-upload-box w-100">
                <div>
                  <img :src="imageUrl" class="course-uploaded-image" />
                  <span class="removeIcon" @click="removeImage">
                    <feather-icon size="1.5x" icon="TrashIcon" />
                  </span>
                </div>
              </div>
              <!-- <div v-if="appLogo" class="img-sub-container">
                <div>
                  <img :src="appLogo" class="course-uploaded-image" />
                  <span class="removeIcon" @click="removeImage">
                    <feather-icon size="1.5x" icon="TrashIcon" />
                  </span>
                </div>
              </div> -->
            </b-form-group>
          </div>
        </div>
        <p class="mt-1"><b-badge class="mr-1">Note :</b-badge>You can upload logo 200*100</p>
      </b-col>
      <b-col lg="6" md="6">
        <div class="d-flex justify-content-between">
          <b-card-title>
            <h3>App Logo Dark</h3>
          </b-card-title>
        </div>
        <div class="input-gradient pointer-events-none">
          <div class="image-upload-box">
            <b-form-group class="w-100">
              <b-form-file
                id="courseImage"
                @change="handleImageSelected"
                accept=".jpg, .png, .gif"
                plain
                :hidden="true"
              />
              <div v-if="!imageUrl" @click="chooseFile('courseImage')" class="image-sub-upload-box w-100" >
                <div class="text-center">
                  <img src="@/assets/images/icons/upload-img.png" class="mb-3" />
                  <p>click to upload.</p>
                </div>
              </div>
              <div v-if="isUploading == 1" class="image-sub-upload-box w-100">
                <div class="text-center">
                  <b-spinner class="ml-auto mb-1"></b-spinner><br />
                  <strong>Upload File...</strong>
                </div>
              </div>
              <div v-if="imageUrl && isUploading == 0" class="image-sub-upload-box w-100">
                <div>
                  <img :src="imageUrl" class="course-uploaded-image" />
                  <span class="removeIcon" @click="removeImage">
                    <feather-icon size="1.5x" icon="TrashIcon" />
                  </span>
                </div>
              </div>
              <!-- <div v-if="appLogo" class="img-sub-container">
                <div>
                  <img :src="appLogo" class="course-uploaded-image" />
                  <span class="removeIcon" @click="removeImage">
                    <feather-icon size="1.5x" icon="TrashIcon" />
                  </span>
                </div>
              </div> -->
            </b-form-group>
          </div>
        </div>
        <p class="mt-1"><b-badge class="mr-1">Note :</b-badge>You can upload logo 200*100</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCardText,
  BCardTitle,
  BCard,
  BForm,
  BFormFile,
  BBadge,
  BSpinner,
} from "bootstrap-vue";
import { toastAlert } from "@core/mixins/ui/toast";
import useUploadImage from "./useUploadImage";
export default {
  components: {
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardText,
    BCardTitle,
    BCard,
    BForm,
    BFormFile,
    BBadge,
    BSpinner,
  },
  mixins: [toastAlert],

  data() {
    return {
      // isUploading: false,
      appLogo: ''
    };
  },
  methods: {
    getAppLogo() {
      this.$http
        .get("get-app-logo")
        .then((response) => {
          console.log('you are in getAPpLogo')
          const {data: {data}} = response
          this.appLogo = data.value
        })
        .catch((error) => {
          // this.errorToast("Error", error.response.data.message);
        })
        .finally(() => {
          // this.isDisabled = false;
        });
    },
  },
  mounted() {
    this.getAppLogo()
  },
  setup() {
    const {
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
      isUploading,
    } = useUploadImage();

    return {
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
      isUploading,
    };
  },
};
</script>

<style scoped>
.img-sub-container {
  border: 2.5px dashed rgb(57, 57, 57) !important;
  padding: 0px;
  min-height: 20.5rem;
  max-width: 34.929rem;
  position: relative;
}

.removeIcon {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 13px;
  background-color: #fef2f2;
  border-radius: 50%;
  cursor: pointer;
}

.video-preview-box {
  height: 193px;
  width: 417px;
}

.img-upload-default {
  position: absolute;
  top: 55%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}

.img-upload-default p {
  font-size: 1rem;
}

.textarea-course-description {
  min-height: 12.143rem !important;
}

.course-uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>