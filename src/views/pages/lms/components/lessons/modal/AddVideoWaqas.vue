<template>
  <div>
    <b-modal
      id="add-video"
      centered
      title="Upload Video"
      ok-only
      ok-title="Close"
      modal-class="modal-cr modal-uv"
      hide-footer
    >
      <validation-observer ref="uploadVideoForm" #default="{ errors }">
        <b-form class="mt-2">
          <b-row>
            <b-col md="6">
              <!-- {{lessonId.id}} -->
              <b-form-group class="mb-2 form-group-cr">
                <label>Video Title</label>
                <validation-provider
                  #default="{ errors }"
                  name="Video Title"
                  vid="videoTitle"
                  rules="required"
                  :state="errors.length > 0 ? false : null"
                >
                  <b-input-group class="input-group-merge">
                    <div class="input-gradient">
                      <b-form-input
                      id="videoTitle"
                      v-model="title"
                      class="form-control-merge form-control-cr"
                      type="text"
                      name="videoTitle"
                      placeholder="Enter Title"
                    />
                    </div>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group class="mb-2 form-group-cr">
                <label>Video Description</label>
                <validation-provider
                  #default="{ errors }"
                  name="Video Description"
                  vid="videoDescription"
                  rules="required"
                  :state="errors.length > 0 ? false : null"
                >
                  <b-input-group class="input-group-merge">
                    <div class="input-gradient">
                      <b-form-textarea
                      id="videoTitle"
                      v-model="description"
                      class="textarea textarea-course-description"
                      type="text"
                      name="videoTitle"
                      placeholder="Type here"
                    />
                    </div>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group class="form-group-cr">
                <label>Video Thambnail</label>
                <b-form-file
                  id="courseVideo"
                  @change="handleVideoUpload"
                  accept=".mp4"
                  plain
                  :hidden="true"
                />
                
                <div v-if="isPreview" class="video-preview-box">
                  <video
                    id="video-preview"
                    ref="videoPreview"
                    class="video-tag"
                    controls
                  />
                </div>
                <!-- <img v-if="imageUrl" :src="imageUrl" class="course-uploaded-image"/> -->

                <div v-else @click="chooseFile('courseVideo')" class="img-sub-container">
                    <div class="img-upload-default">
                    <img src="@/assets/images/icons/upload-img.png" class="mb-5"  />
                    <p>Drop the file or click to upload.</p>
                    </div>
                </div>
                <div class="mt-2">
                  <b-button v-if="!video" @click="chooseFile('courseVideo')"
                    >Choose</b-button
                  >
                  <b-button v-else @click="removeVideo">Remove</b-button>
                </div>
              </b-form-group>
            </b-col>
            <b-col md-12 class="mt-5">
              <div class="d-flex justify-content-end">
                <!-- <b-button
              v-if="isVideoUpdate === true"
              @click="updateVideo"
              variant="primary"
              >Update</b-button
            > -->

                <b-button
                  v-if="isDisable"
                  variant="primary"
                  disabled
                  class="mr-1"
                >
                  <b-spinner small />
                  Uploading...
                </b-button>

                <b-button v-else @click="uploadVideo" variant="primary">
                  Upload
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BForm,
  BInputGroup,
  BModal,
  BFormFile,
  BFormSelect,
} from "bootstrap-vue";
import { required } from "@validations";

import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import { BSpinner } from "bootstrap-vue";

export default {
  name: "AddVideo",
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton,
    BForm,
    BInputGroup,
    BModal,
    BFormFile,
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
  },
  // props: {
  //   lessonId: String
  // },
  data() {
    return {
      title: "",
      description: "",
      video: "",
      lesson: "",
      isDisable: false,
      required,
      isPreview: false,
    };
  },
  methods: {
    uploadVideo() {
      this.$refs.uploadVideoForm.validate().then((success) => {
        if (this.video == "") {
          this.errorToast("Error", "Please upload Course Video!");
          return false;
        }

        if (success && this.video != "") {
          this.isDisable = true;
          const formData = new FormData();
          formData.append("video", this.video);
          formData.append("title", this.title);
          formData.append("description", this.description);
          formData.append("lesson_uuid", this.$store.state.lms.lessonUuid);
          this.$http
            .post("upload-lesson-video", formData)
            .then((response) => {
              this.isDisable = false;
              this.$store.commit("lms/UPDATE_REFETCH_LESSON");
              this.$bvModal.hide("add-video");
              this.resetInput();
            })
            .catch((error) => {
              this.isDisable = false;
            });
        }
      });
    },
    chooseFile(fileId) {
      document.getElementById(fileId).value = null;
      document.getElementById(fileId).click();
    },
    handleVideoUpload(event) {
      this.isPreview = true
      this.video = event.target.files[0];
      this.previewVideo();
    },
    removeVideo() {
      this.video = "";
      let el = document.getElementById("video-preview");
      el.src = "";
    },
    previewVideo() {
      let el = document.getElementById("video-preview");
      let reader = new FileReader();

      reader.readAsDataURL(this.video);
      reader.addEventListener("load", () => {
        el.setAttribute("src", reader.result);
      });
    },
    resetInput() {
      this.video = "";
      this.title = "";
      this.description = "";
      this.$nextTick(() => this.$refs.uploadVideoForm.reset());
    },
  },
  mixins: [toastAlert],
};
</script>
<style scoped lang="scss">
.textarea-course-description{
    min-height: 12.143rem !important;
}
.imageContainer {
    position: relative;
}

.img-sub-container {
    border: 2.5px dashed rgb(57, 57, 57) !important;
    padding: 0px;
    height: 19.5rem;
    width: 100%;
    /* max-width: 34.929rem; */
    position: relative;
}

.removeIcon {
    position: absolute;
    right: 10px;
    top: 37px;
    padding: 13px;
    background-color: beige;
    border-radius: 50%;
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
.img-upload-default p{
    font-size: 1rem;
}
.textarea-course-description{
    min-height: 12.143rem !important;
}
.course-uploaded-image{
    width:100%;
    height: 100%;
    object-fit:contain;
}
.dark-layout .modal-title{
  color: #fff !important;
}
</style>
