<template>
    <div>
        <div class="lms-creation">
          <div class="lms-steps">
            <div class="lmsHeader">
                <LmsHeader/>
            </div>
            <div class="course-creation p-1  pb-5">
                <validation-observer ref="courseUploadFrom" #default="{ errors }">
                    <b-row>
                        <b-col sm="12" class="mt-2 mb-2 text-orange">
                            <p>You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.</p>
                        </b-col>
                        <b-col sm="12">
                          <h2>What will students learn in your course?</h2>
                          <p>You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.</p>
                        </b-col>                  
                    </b-row>
                    <b-row class="mt-2">
                        <b-col sm="8">
                          <b-form-group>
                              <validation-provider #default="{ errors }" name="Course Title" rules="required" vid="title"
                              :state="errors.length > 0 ? false : null">
                              <div class="input-gradient">
                                  <b-form-input id="title" placeholder="Objective 1" />
                              </div>
                              <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                          </b-form-group>
                        </b-col>
                        <b-col sm="4">
                          <div class="add-object-btn">
                            <b-link>+ Add More Objectives</b-link>
                          </div>
                        </b-col>
                        <b-col sm="8">
                          <b-form-group>
                              <validation-provider #default="{ errors }" name="Course Title" rules="required" vid="title"
                              :state="errors.length > 0 ? false : null">
                              <div class="input-gradient">
                                  <b-form-input id="title" placeholder="Objective 2" />
                              </div>
                              <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                          </b-form-group>
                        </b-col>
                        <b-col sm="8">
                          <b-form-group>
                              <validation-provider #default="{ errors }" name="Course Title" rules="required" vid="title"
                              :state="errors.length > 0 ? false : null">
                              <div class="input-gradient">
                                  <b-form-input id="title" placeholder="Objective 3" />
                              </div>
                              <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                          </b-form-group>
                        </b-col>
                        <b-col sm="8">
                          <b-form-group>
                              <validation-provider #default="{ errors }" name="Course Title" rules="required" vid="title"
                              :state="errors.length > 0 ? false : null">
                              <div class="input-gradient">
                                  <b-form-input id="title" placeholder="Objective 4" />
                              </div>
                              <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                          </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col sm="12">
                          <h2>What are the requirements or prerequisites for taking your course?</h2>
                          <p>List the required skills, experience, tools or equipment learners should have prior to taking your course.
If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>
                        </b-col>                  
                    </b-row>
                    <b-row class="mt-2">
                        <b-col sm="8">
                          <b-form-group>
                              <validation-provider #default="{ errors }" name="Course Title" rules="required" vid="title"
                              :state="errors.length > 0 ? false : null">
                              <div class="input-gradient">
                                  <b-form-input id="title" placeholder="Enter Requirements" />
                              </div>
                              <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                          </b-form-group>
                        </b-col>
                        <b-col sm="4">
                          <div class="add-object-btn">
                            <b-link>+ Add More Requirements</b-link>
                          </div>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col sm="12">
                          <h2>Who is this course for?</h2>
                          <p>Write a clear description of the intended learners for your course who will find your course content valuable.
This will help you attract the right learners to your course.</p>
                        </b-col>                  
                    </b-row>
                    <b-row class="mt-2">
                        <b-col sm="12">
                          <b-form-group>
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
          BLink,
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
            BLink,
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
<style scoped lang="scss">
    .lms-steps{
      padding: 0px 250px 0px 0px;
    }
    .course-creation{
        p{
            color: rgba(244, 247, 254, 0.8);
            font-size: 15px;
        }
    }
    .add-object-btn{
      float: right;
        a{
            text-decoration: underline;
        }
    }
</style>