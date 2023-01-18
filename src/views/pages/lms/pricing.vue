<template>
    <div>
        <div class="lms-creation">
          <div class="lms-steps">
            <div class="lmsHeader">
                <LmsHeader/>
            </div>
            <div class="course-creation pb-5">
                <b-row class="p-1  mt-2 mb-2">
                    <b-col sm="12" class="text-orange">
                        <p>Here’s where you add course content—like lectures, course sections, assignments, and more. Click a + icon on the left to get started.</p>
                    </b-col>                    
                </b-row>

                <!--===================================================-->
                <!--===================Section=========================-->
                <div class="pricing-section">
                    <b-row>
                        <b-col sm="12" class="mb-5">
                            <h2>Choose Course Price</h2>
                        </b-col>
                        <b-col sm="12" class="">
                            <div class="d-flex align-items-center">
                                <div class="input-gradient input-dolar mr-1">
                                    <v-select :options="options" label="name" placeholder="USD"></v-select>
                                </div>
                                <div class="input-gradient">
                                    <v-select :options="options2" label="name" placeholder="Select"></v-select>
                                </div>
                            </div>
                        </b-col>
                        <b-col sm="12" class="mt-1 mb-1">
                            <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                <b-button class="active ml-1">Save</b-button>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <!--===================================================-->
                <!--===================================================-->
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
          VBModal,
          BCollapse,
          VBToggle,
          BTabs,
          BTab,
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
            VBModal,
            BCollapse,
            VBToggle,
            BTabs,
            BTab,
          },
          directives: {
            "b-modal": VBModal,
            "b-toggle": VBToggle,
          },
          data() {
            return {
            
                options: [
                    { id: 1, name: "10" },
                    { id: 2, name: "20" },
                ],
                options2: [
                    { id: 1, name: "English" },
                    { id: 2, name: "Spanish" },
                ],
                }
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