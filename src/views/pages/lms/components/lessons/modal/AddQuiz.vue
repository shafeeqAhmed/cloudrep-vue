<template>
  <div>
    <!-- add Quiz modal -->
    <b-modal
      id="create-quiz"
      lessonId="'lessonId'"
      centered
      size="sm"
      title="Add Quiz"
      ok-title="Cancel"
      ok-only
      modal-class="modal-cr"
      hide-footer
    >
      <validation-observer
        ref="createQuizForm"
        #default="{ invalid }"
      >
        <b-form class="mt-2">
          <b-row>
            <b-col
              md="12"
              class="mb-2"
            >
              <h4>Enter Quiz Name</h4>
              <validation-provider
                #default="{ errors }"
                name="title"
                vid="titlequiz"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <div class="input-gradient">
                    <b-form-input
                      v-model="title"
                      id="titlequiz"
                      placeholder="Quiz Name"
                      maxLength="70"
                    />
                  </div>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <div class="lmsInputFieldCounter">
                <span v-if="title.length >= 1"
                  ><span>{{ title.length }}</span> / 70</span
                >
                <span v-if="title.length < 1">70</span>
              </div>
            </b-col>
            <b-col
              md="12"
              class="mb-2"
            >
              <h4>Quiz Duration</h4>

              <!-- <p class="text-small">Quiz attempt duration in minutes.</p> -->
              <validation-provider
                #default="{ errors }"
                name="duration"
                vid="duration"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <div class="input-gradient">
                    <b-form-input
                      type="number"
                      v-model="duration"
                      id="duration"
                      placeholder="Quiz duration"
                    />
                    <!-- <b-time v-model="duration" locale="en"></b-time> -->
                  </div>
                  <!-- <small class="text-danger" v-if=" duration == 0">Minimum duration should be 1</small> -->
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small
                ><br />
              </validation-provider>
              <span
                class="text-warning"
                style="font-size: 10px"
                >Note: Quiz attempt duration in minutes.</span
              >
            </b-col>
            <b-col
              md="12"
              class="mb-2"
            >
              <h4>Number of Questions</h4>
              <validation-provider
                #default="{ errors }"
                name="No of Questions"
                vid="noOfQuestion"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <div class="input-gradient">
                    <b-form-input
                      type="number"
                      v-model="noOfQuestion"
                      id="duration"
                      placeholder="Number of Question"
                    />
                    <!-- <b-time v-model="duration" locale="en"></b-time> -->
                  </div>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col
              md="12"
              class="mb-2"
            >
              <h4>Set Passing Percentage</h4>
              <validation-provider
                #default="{ errors }"
                name="persentage"
                vid="persentage"
                rules="required"
              >
                <div class="input-gradient">
                  <b-form-select
                    v-model="percentage"
                    :options="QuizPercentageoptions"
                    size="lg"
                    id="persentage"
                  ></b-form-select>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col
              md="12"
              class="mt-5"
            >
              <div class="d-flex justify-content-end">
                <!-- <b-button variant="primary" @click="createQuiz()"
                  >Save</b-button
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

                <b-button
                  v-else
                  @click="createQuiz"
                  variant="primary"
                >
                  Save
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
  BSpinner,
  BTime,
} from "bootstrap-vue";

import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import { required } from "@validations";

export default {
  name: "AddQuiz",
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
    BTime,
  },
  data() {
    return {
      title: "",
      percentage: null,
      isDisable: false,
      QuizPercentageoptions: [
        { value: null, text: "Select Percentage" },
        { value: "70", text: "70 %" },
        { value: "80", text: "80 %" },
        { value: "90", text: "90 %" },
      ],
      required,
      duration: "",
      noOfQuestion: "",
    };
  },
  methods: {
    createQuiz() {
      // console.log(this.duration)
      // return true

      this.$refs.createQuizForm.validate().then((success) => {
        if (this.duration < 1) {
          this.conditionalToast(
            "danger",
            "Error",
            "The Minimum Duration should be 1",
            "error"
          );
          return false;
        }
        if (this.noOfQuestion < 1) {
          this.conditionalToast(
            "danger",
            "Error",
            "The Minimum Question should be 1",
            "error"
          );

          return false;
        }
        if (success) {
          this.isDisable = true;
          const formData = new FormData();
          formData.append("name", this.title);
          formData.append("percentage", this.percentage);
          formData.append("duration", this.duration);
          formData.append("noOfQuestion", this.noOfQuestion);
          formData.append("uuid", this.$store.state.lms.lessonUuid);
          this.$http
            .post("quizes", formData)
            .then((response) => {
              console.log(response);
              const {
                data: {
                  data: { quiz },
                },
              } = response;
              this.$store.commit("lms/UPDATE_REFETCH_LESSON");
              this.$bvModal.hide("create-quiz");
              this.resetInput();
            })
            .catch((error) => {})
            .finally(() => {
              this.isDisable = false;
            });
        }
      });
    },
    resetInput() {
      this.title = "";
      this.percentage = "";
      this.duration = "";
      this.$nextTick(() => this.$refs.createQuizForm.reset());
    },
  },
  mixins: [toastAlert],
};
</script>
<style>
/* .lmsInputFieldCounter{
    position:absolute;
    top:0px;
    right:5px;
    color: lightgray;
  } */
</style>
