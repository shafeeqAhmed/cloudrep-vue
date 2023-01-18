<template>
<div>
    <div class="lms-creation">
      <div class="lms-steps">
        <div class="lmsHeader">
            <LmsHeader/>
        </div>
        <div class="course-creation p-1 pb-5">
            <validation-observer ref="courseUploadFrom" #default="{ errors }">
                <b-row>
                    <b-col sm="12">
                        <p>You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.</p>
                    </b-col>
                    <b-col sm="12">
                        <b-form-group label="Course Title" label-for="title">
                            <validation-provider #default="{ errors }" name="Course Title" rules="required" vid="title"
                            :state="errors.length > 0 ? false : null">
                            <div class="input-gradient">
                                <b-form-input id="title" placeholder="Type Course Title" />
                            </div>
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col sm="12">
                        <b-form-group label="Course Subtitle" label-for="courseSubtitle">
                            <validation-provider #default="{ errors }" name="Course Subtitle" rules="required"
                            :state="errors.length > 0 ? false : null">
                            <div class="input-gradient">
                                <b-form-textarea id="courseSubtitle" class="textarea-course-Subtitle"
                                placeholder="Type Course Subtitle" rows="3" />
                            </div>
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col sm="12">
                        <b-form-group label="Course Description" label-for="courseDescription">
                            <validation-provider #default="{ errors }" name="Course Description" rules="required"
                            :state="errors.length > 0 ? false : null">
                            <div class="input-gradient">
                                <b-form-textarea id="courseDescription" class="textarea-course-description"
                                placeholder="Type Course Description" rows="3" />
                            </div>
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" class="mt-4 ">
                        <p>You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.</p>
                    </b-col>                    
                </b-row>
                <b-row class="mt-1">
                    <b-col lg="6" md="12">
                        <b-form-group label="Category" label-for="category">
                            <validation-provider #default="{ errors }" name="Category" rules="required">
                            <div class="input-gradient">
                                <v-select id="category" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                :options="getCourseCategories" :reduce="(option) => option.value" label="name"
                                placeholder="Select Course Category" />
                            </div>
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6" md="12" sm="12">
                        <b-form-group label="Sub Category" label-for="subcategory">
                            <validation-provider #default="{ errors }" name="SubCategory" rules="required">
                            <div class="input-gradient">
                                <v-select id="subcategory" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                :options="getCourseCategories" :reduce="(option) => option.value" label="name"
                                placeholder="Select Course Sub Category" />
                            </div>
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="mt-5">
                    <b-col lg="6" md="12" sm="12">
                        <div class="input-gradient">
                            <div class="imageContainer">
                                <div class="img-border-upload">
                                    <b-form-group>
                                        <validation-provider #default="{ errors }" name="Course Image" vid="course_image"
                                            :state="errors.length > 0 ? false : null">
                                            <b-form-file id="courseImage" @change="handleImageSelected" accept=".jpg, .png, .gif" plain
                                            :hidden="true" />
                                            <div @click="chooseFile('courseImage')" class="img-sub-container">
                                            <img v-if="imageUrl" :src="imageUrl" class="course-uploaded-image" />
                                            <div v-else class="img-upload-default">
                                                <img src="@/assets/images/icons/upload-img.png" class="mb-2" />
                                                <p>click to upload.</p>
                                            </div>
                                            <small class="text-danger mt-1">{{ errors[0] }}</small>
                                            <span v-if="imageUrl" class="removeIcon" @click="removeImage">
                                                <feather-icon size="1.5x" icon="TrashIcon" />
                                            </span>
                                            </div>
                                        </validation-provider>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col lg="6" md="12" sm="12" class="mt-1">
                        <label>Course Thambnail</label>
                        <p>Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</p>
                    </b-col>
                </b-row>
                <b-row class="mt-5">
                    <b-col lg="6" md="12" sm="12">
                        <div class="input-gradient">
                            <div class="imageContainer">
                                <div class="img-border-upload">
                                    <b-form-group>
                                        <validation-provider #default="{ errors }" name="Course Image" vid="course_image"
                                            :state="errors.length > 0 ? false : null">
                                            <b-form-file id="courseImage" @change="handleImageSelected" accept=".jpg, .png, .gif" plain
                                            :hidden="true" />
                                            <div @click="chooseFile('courseImage')" class="img-sub-container">
                                            <img v-if="imageUrl" :src="imageUrl" class="course-uploaded-image" />
                                            <div v-else class="img-upload-default">
                                                <img src="@/assets/images/icons/upload-img.png" class="mb-2" />
                                                <p>click to upload.</p>
                                            </div>
                                            <small class="text-danger mt-1">{{ errors[0] }}</small>
                                            <span v-if="imageUrl" class="removeIcon" @click="removeImage">
                                                <feather-icon size="1.5x" icon="TrashIcon" />
                                            </span>
                                            </div>
                                        </validation-provider>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col lg="6" md="12" sm="12" class="mt-1">
                        <label>Promotional video</label>
                        <p>Students who watch a well-made promo video are 5X more likely to enroll in your course. We've seen that statistic go up to 10X for exceptionally awesome videos.</p>
                    </b-col>
                </b-row>
            </validation-observer>
        </div>
      </div>
      <div>
        <LmsCreationNav/>
      </div>
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
    } from "bootstrap-vue";
    import LmsCreationNav from "./components/LmsCreationNav.vue";
    import LmsHeader from "./components/LmsHeader.vue";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import { ref } from "@vue/composition-api";
    import useUploadImage from "@/views/pages/lms/useUploadImage";
    import vSelect from "vue-select";
    import { toastAlert } from "@core/mixins/ui/toast";
    import { required } from "@validations";
    import { BSpinner } from "bootstrap-vue";
    import EventBus from "@/event/EventBus";
    import store from "@/store";
    export default {
      name: "CourseUpload",
      components: {
        LmsCreationNav,
        LmsHeader,
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
      },
      methods: {
        courseStore(formData) {
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
    
              this.successToast("Success", "Course Created Successfully");
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
          const url = `courses/${this.$store.state.lms.courseUuid}?_method=PUT`;
          this.$http
            .post(url, formData)
            .then((response) => {
              const {
                data: {
                  data: { course },
                },
              } = response;
              this.$store.commit("lms/UPDATE_COURSE_UUID", course.uuid);
              EventBus.$emit("updateTabIndex", 1);
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
          if (this.imageFile == "") {
            this.errorToast("Error", "Please upload Course Image!");
            return false;
          }
          this.$refs.courseUploadFrom.validate().then((success) => {
            if (success && this.imageFile != "") {
              const formData = new FormData();
              formData.append("course_image", this.imageFile);
              formData.append("title", this.form.title);
              formData.append("categories", this.form.categories);
              formData.append("description", this.form.description);
              formData.append("price", this.form.price);
    
              // console.log(this.$store.state.lms.courseUuid);
              this.showLoader();
    
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
      },
      computed: {
        getCourseCategories() {
          return this.$store.getters['lms/courseCategories']
        }
      },
      mixins: [toastAlert],
      setup() {
        const form = ref({
          title: "",
          description: "",
          price: "",
          course_image: "",
          categories: "",
        });
    
    
    
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
        };
      },
    };
    </script>