<template>
  <div class="input-gradient">
    <div class="image-upload-box">
      <b-form-group class="w-100 m-0">
        <validation-observer ref="imageUpload" #default="{ errors }" class="w-100">
          <validation-provider #default="{ errors }" name="Course Image" vid="course_image"
            :state="errors.length > 0 ? false : null">
            <label class="mb-1">{{ title }}</label>
            <b-form-file :id="courseImage" @change="handleImageSelected" accept=".jpg, .png, .gif" plain :hidden="true" />
            <div @click="chooseFile(courseImage)" class="image-sub-upload-box">
                <img v-if="imageUrl || preveiwImage" :src="imageUrl == '' ? preveiwImage : imageUrl"
                  class="img-uploaded-any"  />

                <!-- <img v-if="imageUrl" :src="imageUrl" class="course-uploaded-image" /> -->
                <div v-else class="text-center" >
                  <img src="@/assets/images/campaign-img/Cloud.png" class="" />
                  <!-- <h2>Drag & Drop</h2> -->
                  <p>Click to upload</p>
                </div>

                <small class="text-danger mt-1">{{ errors[0] }}</small>
            </div>
            <span v-if="imageUrl || preveiwImage" class="removeIcon" @click="getType(courseImage)">
              <feather-icon size="1.5x" icon="TrashIcon" />
            </span>
          </validation-provider>
        </validation-observer>
      </b-form-group>
  </div>
  </div>
  
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormInvalidFeedback,
  BButton,
  BImg,
  BDropdown,
  BDropdownItem,
  BForm,
  BInputGroup,
  BFormFile,
  BFormSelect,
  BCard,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref } from "@vue/composition-api";
import useUploadImage from "@/views/pages/client/campaign/creation/useUploadImage";
import vSelect from "vue-select";
import { toastAlert } from "@core/mixins/ui/toast";
import { BSpinner } from "bootstrap-vue";
export default {
  name: "ImageUpload",
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormInvalidFeedback,
    BButton,
    BImg,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormFile,
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    BSpinner,
    BCard,
  },
  props: [
    'title',
    'courseImage',
    'preveiwImage',
    
  ],
  mixins: [toastAlert],
  methods: {
    getType(param) {
      this.$store.commit('clientCampaign/IMAGE_TYPE_FOR_REMOVE', param)
      this.removeImage()
    },
  },
  setup() {

    const {
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
    } = useUploadImage();

    return {
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
    };
  },
};
</script>

<style scoped>
.img-sub-container {
  border: 2.5px dashed rgb(57, 57, 57) !important;
  padding: 0px;
  height: 15rem;
  max-width: 34.929rem;
  position: relative;
}
.imageContainer  label{
  font-size: 14px;
}
.removeIcon {
  position: absolute;
  right: 23px;
  top: 30px;
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
  font-size: 14px;
  color: #fff;
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