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
                <b-row class="mt-2 mb-3">
                    <b-col sm="12" class="">
                        <div class="add-section-btn curriculum-btn">
                            <b-button v-b-modal="'modal-section-title'">Add Section +</b-button>
                        </div>
                    </b-col>
                </b-row>
                <!--===================================================-->
                <!--====================Section-title Modal============-->
                <b-modal id="modal-section-title"  centered title="Section Title" ok-only ok-title="Close" modal-class="modal-cr modal-uv" hide-footer>
                  <b-row>
                    <b-col sm="12">
                      <b-form-group>
                          <div class="input-gradient">
                              <b-form-input placeholder="Enter a Title"></b-form-input>
                          </div>
                      </b-form-group>
                      <b-form-group>
                        <label for="">What Student will be able to do after completing this section?</label>
                          <div class="input-gradient">
                              <b-form-input placeholder="Enter a Title"></b-form-input>
                          </div>
                      </b-form-group>
                    </b-col>
                    <b-col sm="12">
                      <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                          <b-button>Cancel</b-button>
                          <b-button class="active ml-1">Save Section</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-modal>
                <!--===================================================-->
                <!--===================================================-->

                <!--===================================================-->
                <!--===================Section=========================-->
                <div class="curriculum-section mt-2 mb-2">
                    <div class="lectures mb-3 d-flex align-items-center justify-content-between">
                        <div class="lecture-heading">
                            <h2>
                                <span>Section-1 - &nbsp;</span>
                                <span>Introduction</span>
                                <span></span>
                            </h2>
                        </div>
                        <div class="lecture-btn curriculum-btn">
                            <b-button>Add Content +</b-button>
                        </div>
                    </div>
                    <!--===================================================-->
                    <!--======================Select lecture================-->
                    <div class="select-lecture mt-2 mb-2 d-flex align-items-center justify-content-center">
                        <b-link>+ Lecture</b-link>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<b-link>+ Add Quiz</b-link>
                    </div>
                    <!--===================================================-->
                    <!--===================================================-->

                    <!--===================================================-->
                    <!--======================Add Lecture==================-->
                    <div class="addnew-lecture">
                        <b-row class="">
                            <b-col sm="2"  class="mt-1">
                                <h3>New Lecture :</h3>
                            </b-col>
                            <b-col sm="10">
                                <b-form-group>
                                    <div class="input-gradient">
                                        <b-form-input placeholder="Enter a Title"></b-form-input>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="12" class="mt-1 mb-1">
                                <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                    <b-button>Cancel</b-button>
                                    <b-button class="active ml-1">Save</b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="">
                        <div class="input-gradient">
                            <div class="lecture-box">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="lecture-heading">
                                        <h2>
                                            <span>Lecture-1 - &nbsp;</span>
                                            <span>Introduction</span>
                                            <span></span>
                                        </h2>
                                    </div>
                                    <div class="lecture-btn curriculum-btn d-flex align-items-center">
                                        <b-button>+ Add Content</b-button>
                                        <div class="lecture-toggle ml-1" v-b-toggle.lecture-box-toggle>
                                            <feather-icon icon="ChevronDownIcon" size="21" />
                                        </div>
                                    </div>
                                </div>

                                <b-collapse id="lecture-box-toggle">
                                  <div class="lecture-det mt-2 mb-2">
                                    <!--=======================================-->
                                    <!--=============Lecture vid===============-->
                                    <ddiv class="lecture-video">
                                      <b-row>
                                        <b-col sm="12">
                                          <div class="lecture-vid"></div>
                                        </b-col>
                                        <b-col sm="12" class="mt-1 mb-1">
                                            <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                                <b-button>Cancel</b-button>
                                                <b-button class="active ml-1">Add Video</b-button>
                                            </div>
                                        </b-col>
                                      </b-row>

                                      <div class="mb-3 mt-2">
                                        <b-row>
                                          <b-col md="3">
                                            <h3>Filename</h3>
                                          </b-col>
                                          <b-col md="3">
                                            <h3>Date</h3>
                                          </b-col>
                                          <b-col md="3">
                                            <h3>Length</h3>
                                          </b-col>
                                          <b-col md="3">
                                            <h3>Status</h3>
                                          </b-col>
                                        </b-row>
                                        <hr>
                                        <b-row class="mb-3">
                                          <b-col md="3">
                                            <span>001 Overview</span>
                                          </b-col>
                                          <b-col md="3">
                                            <span>15 May 2022</span>
                                          </b-col>
                                          <b-col md="3">
                                            <span>7: 30</span>
                                          </b-col>
                                          <b-col md="3"></b-col>
                                        </b-row>
                                      </div>

                                      <b-row class=" mb-1">
                                        <b-col sm="12">
                                          <div class="d-flex align-items-center">
                                            <div class="video-lec">
                                              <b-img class="w-100" src="@/assets/images/lms-img/vid-thumb.png"></b-img>
                                            </div>
                                            <div class="lec-vid-det ml-1">
                                              <h3>001 Course Outline.mp4</h3>
                                              <span>07:30</span>
                                              <div class="d-flex align-items-center">
                                                <feather-icon icon="RepeatIcon" class="mr-1" size="21" />
                                                <b-link>Replace Video</b-link>
                                              </div>
                                            </div>
                                          </div>
                                        </b-col>
                                      </b-row>
                                    </ddiv>
                                    <!--=======================================-->
                                    <!--=======================================-->

                                    <!--=======================================-->
                                    <!--===========Lecture description=========-->
                                    <div class="lecture-discription">
                                      <!--=======================================-->
                                      <!--=============Discription Data==========-->
                                      <b-row class="">
                                        <b-col sm="12">
                                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus elementum arcu mauris vel. Arcu vitae sagittis dignissim sit magna etiam egestas lectus diam. Viverra mi a, id eget mattis netus.</p>
                                        </b-col>
                                      </b-row>
                                      <!--=======================================-->
                                      <!--=======================================-->
                                      <b-row>
                                        <b-col sm="12">
                                          <b-form-group>
                                            <label for="">Lecture Description</label>
                                              <div class="input-gradient">
                                                  <b-form-textarea placeholder="Quiz Description"></b-form-textarea>
                                              </div>
                                          </b-form-group>
                                        </b-col>
                                        <b-col sm="12" class="mt-1 mb-1">
                                            <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                                <b-button>Cancel</b-button>
                                                <b-button class="active ml-1">Save</b-button>
                                            </div>
                                        </b-col>
                                      </b-row>
                                      <!--=======================================-->
                                      <!--=======================================-->
                                    </div>
                                    <!--=======================================-->
                                    <!--=======================================-->

                                    <!--=======================================-->
                                    <!--=======================================-->
                                    <div class="lecture-resource">
                                      <!--=======================================-->
                                      <!--==============Resource Data============-->
                                      <b-row class="mb-1">
                                        <b-col sm="12">
                                          <div>
                                            <label for="">Downloadable materials</label>
                                            <div class="p-1 d-flex align-items-center justify-content-between">
                                              <div class="d-flex align-items-center">
                                                <feather-icon icon="ImageIcon" class="mr-1" size="21" />
                                                <span>HTML 5 most common Tags.pdf</span>
                                              </div>
                                              <div>
                                                <feather-icon icon="TrashIcon" size="21" />
                                              </div>
                                            </div>
                                          </div>
                                        </b-col>
                                        <b-col sm="12">
                                          <div>
                                            <label for="">External resources</label>
                                            <div class="p-1 d-flex align-items-center justify-content-between">
                                              <div class="d-flex align-items-center">
                                                <feather-icon icon="LinkIcon" class="mr-1" size="21" />
                                                <span>MDN Docs</span>
                                              </div>
                                              <div>
                                                <feather-icon icon="TrashIcon" size="21" />
                                              </div>
                                            </div>
                                          </div>
                                        </b-col>
                                      </b-row>
                                      <!--=======================================-->
                                      <!--=======================================-->
                                      <b-row>
                                        <b-col sm="12">
                                          <b-tabs content-class="mt-2 mb-2">
                                            <b-tab title="Downloadable File" active>
                                              <b-row>
                                                <b-col sm="12">
                                                  <div class="upload-file"></div>
                                                </b-col>
                                                <b-col sm="12" class="mt-1 mb-1">
                                                    <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                                        <b-button>Cancel</b-button>
                                                        <b-button class="active ml-1">Save</b-button>
                                                    </div>
                                                </b-col>
                                              </b-row>
                                            </b-tab>
                                            <b-tab title="External Resource">
                                              <div class="external-resource">
                                                <b-row>
                                                  <b-col sm="12">
                                                      <b-form-group>
                                                        <label for="">Title</label>
                                                          <div class="input-gradient">
                                                              <b-form-input placeholder="A descriptive title"></b-form-input>
                                                          </div>
                                                      </b-form-group>
                                                  </b-col>
                                                  <b-col sm="12">
                                                      <b-form-group>
                                                        <label for="">URL</label>
                                                          <div class="input-gradient">
                                                              <b-form-input placeholder="https://www.example.com"></b-form-input>
                                                          </div>
                                                      </b-form-group>
                                                  </b-col>
                                                  <b-col sm="12" class="mt-1 mb-1">
                                                      <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                                          <b-button>Cancel</b-button>
                                                          <b-button class="active ml-1">Add Link</b-button>
                                                      </div>
                                                  </b-col>
                                                </b-row>
                                              </div>
                                            </b-tab>
                                          </b-tabs>
                                        </b-col>
                                      </b-row>
                                      <!--=======================================-->
                                      <!--=======================================-->
                                    </div>

                                    <b-row>
                                      <b-col sm="12">
                                        <div class="curriculum-btn d-flex align-items-center">
                                          <b-button class="mr-1">+ Add Description</b-button>
                                          <b-button>+ Resource</b-button>
                                        </div>
                                      </b-col>
                                    </b-row>
                                    <!--=======================================-->
                                    <!--=======================================-->

                                  </div>
                                </b-collapse>
                            </div>
                        </div>
                    </div>
                    <!--===================================================-->
                    <!--===================================================-->

                    <!--===================================================-->
                    <!--=====================Add Quiz======================-->
                    <div class="addnew-quiz mt-2">
                        <b-row class="">
                            <b-col sm="2" class="mt-1">
                                <h3>New Quiz :</h3>
                            </b-col>
                            <b-col sm="10">
                                <b-form-group>
                                    <div class="input-gradient">
                                        <b-form-input placeholder="Enter a Title"></b-form-input>
                                    </div>
                                </b-form-group>
                                <b-form-group>
                                    <div class="input-gradient">
                                        <b-form-textarea placeholder="Quiz Description"></b-form-textarea>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="12" class="mt-1 mb-1">
                                <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                    <b-button>Cancel</b-button>
                                    <b-button class="active ml-1">Add Quiz</b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="">
                        <div class="input-gradient">
                            <div class="quiz-box">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="quiz-heading">
                                        <h2>
                                            <span>Quiz - &nbsp;</span>
                                            <span>Overview</span>
                                            <span></span>
                                        </h2>
                                    </div>
                                    <div class="quiz-btn curriculum-btn d-flex align-items-center">
                                        <b-button>+ Add Question</b-button>
                                        <div class="quiz-toggle ml-1" v-b-toggle.quiz-box-toggle>
                                            <feather-icon icon="ChevronDownIcon" size="21" />
                                        </div>
                                    </div>
                                </div>

                                <b-collapse id="quiz-box-toggle">
                                  <div class="questions-box mt-2">
                                  <b-row>
                                    <b-col sm="12">
                                      <b-form-group>
                                          <label for="">Questions :</label>
                                          <div class="input-gradient">
                                              <b-form-input placeholder="Enter the Question you want to ask"></b-form-input>
                                          </div>
                                      </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                      <b-form-group>
                                          <label for="">Answer 1 :</label>
                                          <b-row>
                                            <b-col class="col-2" sm="1">
                                              <div class="lms-check-quiz">
                                                <feather-icon icon="CheckIcon" size="21" />
                                              </div>
                                            </b-col>
                                            <b-col class="col-10" sm="11">
                                              <div class="input-gradient">
                                                <b-form-input placeholder="Add Answer"></b-form-input>
                                            </div>
                                            </b-col>
                                          </b-row>
                                      </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                      <b-form-group>
                                          <label for="">Answer 2 :</label>
                                          <b-row>
                                            <b-col class="col-2" sm="1">
                                              <div class="lms-check-quiz">
                                                <feather-icon icon="CheckIcon" size="21" />
                                              </div>
                                            </b-col>
                                            <b-col class="col-10" sm="11">
                                              <div class="input-gradient">
                                                <b-form-input placeholder="Add Answer"></b-form-input>
                                            </div>
                                            </b-col>
                                          </b-row>
                                      </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                      <b-form-group>
                                          <label for="">Answer 3 :</label>
                                          <b-row>
                                            <b-col class="col-2" sm="1">
                                              <div class="lms-check-quiz">
                                                <feather-icon icon="CheckIcon" size="21" />
                                              </div>
                                            </b-col>
                                            <b-col class="col-10" sm="11">
                                              <div class="input-gradient">
                                                <b-form-input placeholder="Add Answer"></b-form-input>
                                            </div>
                                            </b-col>
                                          </b-row>
                                      </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                      <b-form-group>
                                          <label for="">Answer 4 :</label>
                                          <b-row>
                                            <b-col class="col-2" sm="1">
                                              <div class="lms-check-quiz">
                                                <feather-icon icon="CheckIcon" size="21" />
                                              </div>
                                            </b-col>
                                            <b-col class="col-10" sm="11">
                                              <div class="input-gradient">
                                                <b-form-input placeholder="Add Answer"></b-form-input>
                                            </div>
                                            </b-col>
                                          </b-row>
                                      </b-form-group>
                                    </b-col>
                                    <b-col sm="12" class="mt-1 mb-1">
                                        <div class="curriculum-btn active d-flex align-items-center justify-content-end">
                                            <b-button>Cancel</b-button>
                                            <b-button class="active ml-1">Add Quiz</b-button>
                                        </div>
                                    </b-col>
                                  </b-row>
                                  </div>
                                  <div class="question-save mt-2 mb-2">
                                    <b-row>
                                      <b-col sm="12">
                                        <div class="d-flex align-items-center">
                                          <feather-icon icon="ArrowRightCircleIcon" size="21" />
                                          <label for=""> Question 1 :</label>
                                          <p>Where is script tag used?</p>
                                        </div>
                                      </b-col>
                                    </b-row>
                                  </div>
                                </b-collapse>
                            </div>
                        </div>
                    </div>
                    <!--===================================================-->
                    <!--===================================================-->
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