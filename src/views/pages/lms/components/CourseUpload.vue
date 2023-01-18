<template>
<div>
  <b-button v-if="$store.state.lms.courseUuid" type="submit" @click="backToCourseList()" variant="primary" class="btn btn-primary btn-small mb-2">Back</b-button>
    <validation-observer ref="courseUploadFrom" #default="{ errors }">
      <b-row>
        <b-col md="12">
          <div class="lmsInputFieldCounter-container">
            <b-form-group>
              <div class="d-flex align-items-center justify-content-between">
                <label>Course Title</label>
                <span class="text-danger" v-if="form.title.length>= 70">Max limit reached (70)</span>
                <div v-else class="lmsInputFieldCounter">
                  <span v-if="form.title.length >= 1"><span >{{form.title.length}}</span> / 70</span>
                  <span v-if="form.title.length < 1">70</span>
                </div>
              </div>
              <validation-provider #default="{ errors }" name="Course Title" rules="required" vid="title"
                :state="errors.length > 0 ? false : null">
                <div class="input-gradient">
                  <b-form-input id="title" v-model="form.title" placeholder="Course Title" maxLength="70" />
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
          </b-form-group>
          </div>

          <div class="lmsInputFieldCounter-container">
            <b-form-group>
              <div class="d-flex align-items-center justify-content-between">
                <label>Course Tag Line</label>
                <span class="text-danger" v-if="form.tag_line.length>= 150">Max limit reached (150)</span>
                <div v-else class="lmsInputFieldCounter">
                  <span v-if="form.tag_line.length >= 1"><span >{{form.tag_line.length}}</span> / 150</span>
                  <span v-if="form.tag_line.length < 1">150</span>
                </div>
              </div>
            <validation-provider #default="{ errors }" name="Course tag line" rules="required" vid="tag_line"
              :state="errors.length > 0 ? false : null">
              <div class="input-gradient">
                <b-form-input id="tag_line" v-model="form.tag_line" placeholder="Course Tag Line" maxLength="150" />
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          </div>

          <!-- <b-form-group label="Course Description" label-for="courseDescription">
            <validation-provider #default="{ errors }" name="Course Description" rules="required"
              :state="errors.length > 0 ? false : null">
              <div class="input-gradient">
                <b-form-textarea id="courseDescription" class="textarea-course-description" v-model="form.description"
                placeholder="Type Course Description" rows="3" />
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group> -->
          <label>Course Description</label>
          <div class="input-gradient">
            <quill-editor v-model="form.description" :options="snowOption" />
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col md="6">
          <b-form-group>
            <validation-provider #default="{ errors }" name="Category" rules="required">
              <div class="d-flex align-items-center mb-1">
                <div class="form-group m-0">
                  <label class="m-0 mr-1">Category</label>
                </div>
              </div>
              <div class="input-gradient">
                <v-select id="category" v-model="form.categories" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="getCourseCategories" :reduce="(option) => option.value" label="name"
                placeholder="Select Course Category" />
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
        <b-form-group  class="m-0">
                <div class="d-flex align-items-center mb-1">
                  <div class="form-group m-0">
                    <label class="m-0 mr-1">Course Price</label>
                  </div>
                  <div>
                    <b-form-checkbox
                      v-model="coursePrice"
                      checked="false"
                      name="course_price"
                      switch
                      inline
                      id="coursePrice"
                      >
                    </b-form-checkbox>
                  </div>
                </div>
          <validation-provider #default="{ errors }" name="Price" vid="priceCour"  :rules="coursePrice == true ? 'required' : ''">
                <div class="input-gradient" v-if="coursePrice">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text class="dollar-price">
                      <span>$</span>
                    </b-input-group-prepend>
                    <b-form-input type="number" id="priceCour" v-model="form.price" :state="errors.length > 0 ? false : null" placeholder="Enter Price" />
                  </b-input-group>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        </b-col>
        
      </b-row>
      <b-row class="mt-2">
        <b-col md="6">
          <div class="input-gradient image-upload-lm">
            <div class="image-upload-box">
              <b-form-group class="w-100 m-0">
                <validation-provider #default="{ errors }" name="Course Image" vid="course_image"
                  :state="errors.length > 0 ? false : null">
                  
                  <b-form-file id="courseImage" @change="handleImageSelected" accept=".jpg, .png, .gif" plain
                    :hidden="true" />
                  <div @click="chooseFile('courseImage')" class="image-sub-upload-box">
                    <img v-if="imageUrl" :src="imageUrl" class="img-uploaded-any" />
                    <div v-else class="text-center">
                      <img src="@/assets/images/icons/upload-img.png" class="mb-3" />
                      <!-- <h2>Drag & Drop</h2>
                      <p> or click to upload</p> -->
                      <p>Click to upload</p>
                    </div>
                    
                    <span v-if="imageUrl" class="removeIcon" @click="removeImage">
                      <feather-icon size="1.5x" icon="TrashIcon" />
                    </span>
                  </div>
                  <small class="text-danger mt-1">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <label>Course Thumbnail</label>
          <p>Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</p>
        </b-col>
        <b-col md="12" class="mt-3">
          <b-button v-if="!$store.state.lms.courseUuid" type="submit" variant="primary" class="btn btn-primary btn-small" @click="courseUploadFrom">Save</b-button>
          <b-button v-if="$store.state.lms.courseUuid" type="submit" variant="primary" class="btn btn-primary btn-small" @click="courseUploadFrom">Update</b-button>
        </b-col>
      </b-row>
    </validation-observer>
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
  BInputGroupPrepend,
  BFormSelect,
  BFormCheckbox,
  BCardText
} from "bootstrap-vue";
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { quillEditor } from 'vue-quill-editor'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref } from "@vue/composition-api";
import useUploadImage from "@/views/pages/lms/useUploadImage";
import vSelect from "vue-select";
import { toastAlert } from "@core/mixins/ui/toast";
import { required } from "@validations";
import { BSpinner } from "bootstrap-vue";
import EventBus from "@/event/EventBus";
import store from "@/store";
import router from "@/router";

export default {
  name: "CourseUpload",
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
    BInputGroupPrepend,
    vSelect,
    BSpinner,
    BFormCheckbox,
    quillEditor,
    BCardCode,
    BCardText
  },
  data() {
    return {
      snowOption: {
        theme: 'snow',
      },
      coursePrice: false,
      content: '',
    };
  },
  methods: {
    courseStore(formData) {
      if (this.imageFile == "") {
        this.errorToast("Error", "Please upload Course Image!");
        return false;
      }
      this.showLoader();
      this.$http
        .post("courses", formData)
        .then((response) => {
          const {
            data: {
              data: { course },
            },
          } = response;
          this.$store.commit("lms/UPDATE_COURSE_UUID", course.uuid);
          
          EventBus.$emit("updateTabIndex", 1);

          // if(this.$store.state.lms.courseUuid){
          //   console.log('ab hook dobara chalai hai!')
          //   this.$store.dispatch('lms/getCourseDetail')
          // }
          this.successToast("Success", "Course Created Successfully");
          this.$store.commit('lms/UPDATE_REFETCH_LESSON')
        })
        .catch((error) => {
          this.errorToast("Error", "Something Going Wroing please try again!");
          this.$refs.courseUploadFrom.setErrors(error.response.data.errors)
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    courseUpdate(formData) {
      this.showLoader();
      const url = `courses/${this.$store.state.lms.courseUuid}`;
      this.$http
        .put(url, formData)
        .then((response) => {
          const {
            data: {
              data: { course },
            },
          } = response;
          this.$store.commit("lms/UPDATE_COURSE_UUID", course.uuid);
          EventBus.$emit("updateTabIndex", 1);
          this.$store.commit('lms/UPDATE_REFETCH_LESSON')
          this.successToast("Success", "Course Updated Successfully");
        })
        .catch(() => {
          this.errorToast("Error", "Something Going Wroing please try again!");
          this.$refs.courseUploadFrom.setErrors(error.response.data.errors)
        })
        .finally(() => {
          this.hideLoader();
        });
    },

    courseUploadFrom() {
      this.$refs.courseUploadFrom.validate().then((success) => {
        if (success) {
          const formData = new FormData();
          formData.append("course_image", this.imageFile);
          formData.append("title", this.form.title);
          formData.append("tag_line", this.form.tag_line);
          formData.append("categories", this.form.categories);
          formData.append("description", this.form.description);
          if(this.coursePrice == true) {
            formData.append("price", this.form.price);
          }

          // console.log(this.$store.state.lms.courseUuid);
          // this.showLoader();

          if (this.$store.state.lms.courseUuid) {
            this.courseUpdate(formData);
          } else {
            this.courseStore(formData);
          }
        } else {
          this.errorToast("Error", "Field Required");
        }
      });
    },
    getCourse() {
      this.showLoader()
      this.$http
        .get(`get-course/${this.$store.state.lms.courseUuid}`)
        .then((response) => {
          if(response.data.status === true){
            const {
              data: {
                data: { course },
              },
            } = response;
            course.categories.forEach((value) => {
              this.cateUuid = value.uuid
            });
            console.log('course',course)
            this.form.title= course.title
            this.form.tag_line= course.tag_line
            this.form.description= course.description
             if(course.price) {
              this.coursePrice = true
              this.form.price= course.price
            }
            this.form.course_image= course.thumbnail
            this.form.categories= this.cateUuid
            if(this.$store.state.lms.courseDetail.thumbnail){
              this.imageUrl = this.$store.state.lms.courseDetail.thumbnail
            } 
           
          }
        })
        .catch(() => {
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    backToCourseList() {
      this.$router.push({ name: 'list-course'});
    }
  },
  computed: {
    getCourseCategories() {
      return this.$store.getters['lms/courseCategories']
    }
  },
  mounted() {
    //This is for Course Editing
    if(this.$store.state.lms.courseUuid){
      this.getCourse()
    }
    
  },
  mixins: [toastAlert],
  setup() {
    const form = ref({
      title: "",
      tag_line: "",
      description: "",
      price: "",
      course_image: "",
      categories: "",
    });
    const cateUuid = ref('');
    const {
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
    } = useUploadImage();
    store.dispatch('lms/fetchCourseCategories')


    return {
      imageFile,
      imageUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
      form,
      cateUuid,
    };
  },
};
</script>
<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';
</style>
