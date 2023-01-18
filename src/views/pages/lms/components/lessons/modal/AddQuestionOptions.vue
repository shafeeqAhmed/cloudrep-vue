<template>
  <div>
    <!-- add Question modal -->
    <b-modal
      id="create-ques"
      centered
      title="Enter your Question"
      ok-title="cancel"
      ok-only
      modal-class="modal-cr"
      hide-footer
    >
      <validation-observer ref="createQuestionForm" #default="{ invalid }">
        <b-row>
          <b-col md="1" class="">
            <feather-icon icon="BookOpenIcon" size="22" class=""></feather-icon>
            <!-- <b-img src="@/assets/images/courses/Document.svg" /> -->
          </b-col>
          <b-col md="11">
            <validation-provider
              #default="{ errors }"
              name="Name"
              vid="name"
              rules="required"
            >
              <b-input-group class="input-group-merge">
               <div class="input-gradient">
                <b-form-textarea placeholder="Enter a Question"
                  rows="4"
                  v-model="form.question"
                  no-resize
                  maxLength="150"
                ></b-form-textarea>
               </div>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
              <span v-if="form.question.length >= 1"><span >{{form.question.length}}</span> / 150</span>
              <span v-if="form.question.length < 1">150</span>
          </b-col>

          <b-col md="12" class="mt-3">
            <h4>Enter Your Options &amp; Select The Correct One</h4>
            <div class="ques-opts mt-3">
              <div
                class="d-flex align-items-center mb-2"
                v-for="(option, key) in form.options"
                :key="key"
              >
                <div class="check-circle">
                  <b-form-checkbox
                    v-model="option.is_true"
                    value="true"
                    class="custom-control-success"
                    @change="selectCheckBox(key)"
                    :key="key"
                  >
                  </b-form-checkbox>
                </div>
                <div class="ml-2 w-100">
                  <validation-provider
                    #default="{ errors }"
                    :name='`Option-${key}`'
                    rules="required"
                  >
                    <b-form-group class="mb-0 form-group-cr">
                      <div class="input-gradient">
                        <b-form-input
                        id="opt1"
                        v-model="option.name"
                        class="form-control-merge form-control-cr"
                        type="text"
                        name="opt1"
                        placeholder="Enter First Option"
                        value="Option 1"
                        maxLength="70"
                      />
                      </div>
                    </b-form-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                  <div class="lmsInputFieldCounter">
                    <span v-if="option.length >= 1"><span >{{option.length}}</span> / 70</span>
                    <span v-if="option.length < 1">70</span>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="12" class="mt-5">
            <div class="d-flex justify-content-end">
              <!-- <b-button
            v-if="isQuestionOptionsUpdate === true"
            @click="updateQuestionOptions"
            class="ml-3"
            >Update -->
              <!-- </b-button> -->
              <!-- <b-button @click="saveQuestionOptions" class="ml-3">Upload</b-button> -->

              <b-button
                v-if="isDisable"
                variant="primary"
                disabled
                class="mr-1"
              >
                <b-spinner small />
                Uploading...
              </b-button>

              <b-button v-else @click="saveQuestionOptions" variant="primary">
                Save
              </b-button>
            </div>
          </b-col>
        </b-row>
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
  BFormCheckbox,
  BImg,
  BSpinner,
} from "bootstrap-vue";
import { quillEditor } from "vue-quill-editor";

import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
// eslint-disable-next-line
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";
import { codeIcon } from "../../../code.js";
import { required } from "@validations";

export default {
  name: "AddQuestionOptions",
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
    quillEditor,
    BFormCheckbox,
    BImg,
    BSpinner,
  },

  data() {
    return {
      required,
      form: {
        question: "",
        options: [
          {
            name: "",
            is_true: false,
            is_active: true,
          },
          {
            name: "",
            is_true: false,
            is_active: true,
          },
          {
            name: "",
            is_true: false,
            is_active: true,
          },
          {
            name: "",
            is_true: false,
            is_active: true,
          },
        ],
      },

      codeIcon,
      isDisable: false,
    };
  },
  methods: {
    updateRecord() {
      this.$http
        .put(`questions/${this.$store.state.lms.editQuestionOptions.uuid}`, {
          name: this.form.question,
          options: this.form.options,
          quiz_uuid: this.$store.state.lms.quizUuid,
        })
        .then((response) => {
          this.$store.commit("lms/UPDATE_REFETCH_LESSON");
          this.successToast(
            "Success",
            "Question Has been updated successfully!"
          );
          this.$bvModal.hide("create-ques");
          Object.assign(this.$data, this.$options.data());
        })
        .catch((error) => {
          this.errorToast();
        })
        .finally(() => {
          this.isDisable = false;
        });
    },
    storeRecord() {
      this.$http
        .post("questions", {
          name: this.form.question,
          options: this.form.options,
          quiz_uuid: this.$store.state.lms.quizUuid,
        })
        .then((response) => {
          this.$store.commit("lms/UPDATE_REFETCH_LESSON");
          this.successToast("Success", "Question Has been added successfully!");
          this.$bvModal.hide("create-ques");
          Object.assign(this.$data, this.$options.data());
          this.$nextTick(() => this.$refs.createQuestionForm.reset());
        })
        .catch((error) => {
          this.errorToast();
        })
        .finally(() => {
          this.isDisable = false;
        });
    },
    saveQuestionOptions() {
      this.$refs.createQuestionForm.validate().then((success) => {
        if (success) {
          //check option is selected or not
          let isSelected = false;
          this.form.options.forEach((option) => {
            if (option.is_true) {
              isSelected = true;
            }
          });
          if (!isSelected) {
            this.errorToast("Error", "Please Select the Correct Option");
            return false
          }

          this.isDisable = true;

          if (this.$store.state.lms.editQuestionOptions) {
            this.updateRecord();
          } else {
            this.storeRecord();
          }
        }
      });
    },
    updateQuestionOptions() {
      this.$http
        .put("questions" + "/" + this.questionUuid, {
          name: this.form.question,
          options: this.form.options,
          question_uuid: this.questionUuid,
        })
        .then((response) => {
          const {
            data: { data },
          } = response;
          this.form.question = data.question.name;
          this.form.options = data.question.questionOptions;
          this.questionUuid = data.question.uuid;
          // console.log(this.form.options)
          // return true
          // this.getLessons();
          this.$bvModal.hide("create-ques");
          // this.$toast({
          //   component: ToastificationContent,
          //   props: {
          //     title: "Question Updated Successfully.",
          //     icon: "EditIcon",
          //     variant: "success",
          //   },
          // });
        })
        .catch((error) => {
          // this.$toast({
          //   component: ToastificationContent,
          //   props: {
          //     title: "Error Fetch Lessons",
          //     icon: "AlertTriangleIcon",
          //     variant: "danger",
          //   },
          // });
        });
    },
    selectCheckBox(key) {
      this.form.options.forEach((option, index) => {
        if (key == index) {
          option.is_true = true;
        } else {
          option.is_true = false;
        }
      });
    },
  },
  mixins: [toastAlert],
  watch: {
    "$store.state.lms.editQuestionOptions": function (newVal, oldVal) {
      console.log(newVal);
      if (newVal) {
        this.form.question = newVal.name;
        this.form.options = newVal.questionOptions;
      }
      if (newVal == null) {
        Object.assign(this.$data, this.$options.data());
      }
    },
  },
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
