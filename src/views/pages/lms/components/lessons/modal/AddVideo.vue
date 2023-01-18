<template>
  <div>
    <b-modal id="add-video" centered title="Upload Video" ok-only ok-title="Close" modal-class="modal-cr modal-uv"
      hide-footer>
      <validation-observer ref="uploadVideoForm" #default="{ errors }">
        <b-form class="mt-2">
          <b-row>
            <b-col md="6">
              <!-- {{lessonId.id}} -->
              <b-form-group class="mb-2 form-group-cr">
                <div class="d-flex align-items-center justify-content-between">
                  <label>Video Title</label>
                    <span class="text-danger" v-if="title.length>= 70">Max limit reached (70)</span>
                    <div v-else class="lmsInputFieldCounter">
                        <span v-if="title.length >= 1"><span >{{title.length}}</span> / 70</span>
                        <span v-if="title.length < 1">70</span>
                    </div>
                </div>
                <validation-provider #default="{ errors }" name="Video Title" vid="videoTitle" rules="required"
                  :state="errors.length > 0 ? false : null">
                  <b-input-group class="input-group-merge">
                   <div class="input-gradient">
                    <b-form-input id="videoTitle" v-model="title" class="form-control-merge form-control-cr" type="text"
                      name="videoTitle" placeholder="Enter Title" maxLength="70"/>
                   </div>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group class="mb-2 form-group-cr">
                <div class="d-flex align-items-center justify-content-between">
                  <label>Video Description</label>
                  <span class="text-danger" v-if="description.length>= 200">Max limit reached (200)</span>
                    <div v-else class="lmsInputFieldCounter">
                        <span v-if="description.length >= 1"><span >{{description.length}}</span> / 200</span>
                        <span v-if="description.length < 1">200</span>
                    </div>
                </div>
                
                <validation-provider #default="{ errors }" name="Video Description" vid="videoDescription"
                  rules="required" :state="errors.length > 0 ? false : null">
                  <b-input-group class="input-group-merge">
                    <div class="input-gradient">
                      <b-form-textarea id="videoTitle" v-model="description" class="textarea textarea-course-description"
                      type="text" name="videoTitle" placeholder="Type here" maxLength="200" />
                    </div>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-checkbox
                          v-model="isFree"
                          checked="false"
                          name="available_for_preview"
                          switch
                          inline
                        >
                          <h5 class="roleCenter">Available for Preview</h5>
              </b-form-checkbox>
            </b-col>
            <b-col md="6">
              <b-form-group class="form-group-cr">
                <label>Video Thambnail</label>
                <b-form-file id="courseVideo" @change="handleVideoUpload" accept=".mp4" plain :hidden="true" />

                <div class="video-preview-box">
                  <video id="video-preview" ref="videoPreview" class="video-tag" :src="video" controls />
                </div>
              <span class="text-warning" style="font-size:10px">Note: Video Limit (Max:720)/(Min:480) </span>
                <div class="mt-2">
                  <b-button class="primary-btn" v-if="!video" @click="chooseFile('courseVideo')">Choose</b-button>
                  <b-button class="primary-btn" v-else @click="removeVideo">Remove</b-button>
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

                <b-button v-if="isDisable" variant="primary" disabled class="mr-1">
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
    <canvas id="canvas" style="overflow:auto" :hidden="true"></canvas>
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
  BFormCheckbox
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
    BFormCheckbox
  },

  data() {
    return {
      title: "",
      description: "",
      video: "",
      lesson: "",
      isDisable: false,
      required,
      thumbnail: '',
      duration: '',
      isFree: false,
    };
  },
  methods: {
    storeVideo(formData) {
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
    },
    updateVideo(formData) {
      const url = `update-lesson-video/${this.$store.state.lms.editVideoRecord.uuid}`;
      this.$http
        .post(url, formData)
        .then((response) => {
          this.isDisable = false;
          this.$store.commit("lms/UPDATE_REFETCH_LESSON");
          this.$bvModal.hide("add-video");
          this.resetInput();
        })
        .catch((error) => {
          this.isDisable = false;
        });
    },
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
          formData.append("duration", this.duration);
          formData.append("thumbnail", this.thumbnail);
          formData.append("description", this.description);
          formData.append("isFree", this.isFree);
          formData.append("lesson_uuid", this.$store.state.lms.lessonUuid);

          if (this.$store.state.lms.editVideoRecord) {
            this.updateVideo(formData);
          } else {
            this.storeVideo(formData);
          }
        }
      });
    },
    chooseFile(fileId) {
      document.getElementById(fileId).value = null;
      document.getElementById(fileId).click();
    },
    handleVideoUpload(event) {
      this.video = event.target.files[0];
      if (this.video.size > 2048 * 2048 || this.video.size < 1024 * 1024) {
        this.errorToast("Error", "Please choose file between 1 Mb to 2 Mb");
        this.video = "";
      }
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
        this.captureImage()
        this.getDuration()
      });
    },

    captureImage() {
      let canvas = document.createElement("canvas");
      let video = document.getElementById("video-preview");

      video.addEventListener("seeked", () => {
        canvas.width = 200;
        canvas.height = 120;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        this.thumbnail = canvas.toDataURL("image/jpeg");

      });

      video.currentTime = 2;
    },
    getDuration() {
      setTimeout(() => {
        let video = document.getElementById("video-preview");
        this.duration = parseFloat((video.duration)).toFixed(2)
      }, 2000);

    },
    resetInput() {
      this.video = "";
      this.title = "";
      this.description = "";
      this.$nextTick(() => this.$refs.uploadVideoForm.reset());
    },
  },
  mixins: [toastAlert],
  watch: {
    "$store.state.lms.editVideoRecord": function (newVal, oldVal) {
      if (newVal) {
        this.video = newVal.video_url;
        this.title = newVal.title;
        this.description = newVal.description;
      }
      if (newVal == null) {
        this.video = "";
        this.title = "";
        this.description = "";
      }
    },
  },
};
</script>
<style scoped>
.textarea-course-description {
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
  height: 212px;
  width: 417px;
}

.video-tag {
  height: 100% !important;
  width: 100% !important;
  object-fit: cover;
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
  object-fit: contain;
}
.dark-layout .modal-title{
  color: #fff !important;
}
</style>
