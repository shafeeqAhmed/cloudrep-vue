<template>
  <div>
    <validation-observer
      ref="infoRules"
      tag="form"
    >
      <b-row class="align-items-center">
        <b-col md="5">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Title"
              rules="required"
            >
              <div class="input-gradient">
                <b-form-input
                  id="name"
                  v-model="name"
                  placeholder="Section Name"
                  :state="errors.length > 0 ? false : null"
                  maxLength="70"
                />
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col
          md="7"
          class="text-right ml-auto"
        >
          <b-button
            class="btn btn-primary"
            variant="primary"
            @click="createLesson"
            >Create Section</b-button
          >
          <!-- <b-button
            class="btn btn-primary"
            variant="primary"
            @click="getLessons"
            >Get Section</b-button
          > -->
        </b-col>
      </b-row>
      <lesson-list :lessons="lessons" />

      <add-video />
      <add-quiz />
      <add-question-options />
    </validation-observer>
    <b-row>
      <b-col
        md="12"
        class="mt-3"
        v-if="lessons.length > 0"
      >
        <div class="d-flex justify-content-end">
          <b-button
            variant="primary"
            class=""
            @click="gotoNextPage()"
            >Next</b-button
          >
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
  BForm,
  BInputGroup,
  BModal,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref } from "@vue/composition-api";
import { toastAlert } from "@core/mixins/ui/toast";
import LessonList from "./LessonList.vue";
import AddVideo from "./modal/AddVideo.vue";
import AddQuiz from "./modal/AddQuiz.vue";
import AddQuestionOptions from "./modal/AddQuestionOptions.vue";
import EventBus from "@/event/EventBus";

export default {
  name: "CourseLesson",
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BForm,
    BInputGroup,
    ValidationProvider,
    ValidationObserver,
    LessonList,
    AddVideo,
    BModal,
    AddQuiz,
    AddQuestionOptions,
  },
  methods: {
    createLesson() {
      if (this.name == "" || this.name == null) {
        this.conditionalToast(
          "danger",
          "Error",
          "Lesson name can not be empty!",
          "error"
        );
        return false;
      }
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", "test description");
      formData.append("is_active", true);
      formData.append("course_uuid", this.$store.state.lms.courseUuid);

      this.showLoader();
      this.$http
        .post("lessons", formData)
        .then((response) => {
          const {
            data: {
              data: { lesson },
            },
          } = response;

          this.$store.commit("lms/UPDATE_LESSON_UUID", lesson.uuid);

          this.name = null;
          this.$nextTick(() => this.$refs.infoRules.reset());
          this.$store.commit("lms/UPDATE_REFETCH_LESSON");

          this.successToast("Success", "Lesson Created Successfully!");
        })
        .catch(() => {
          this.errorToast(
            "Error",
            "Something is going wrong please try again!"
          );
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    getLessons() {
      const uuid = this.$store.state.lms.courseUuid;
      this.$http
        .get(`get-course-lesson/${uuid}`)
        .then((response) => {
          const {
            data: {
              data: { lesson },
            },
          } = response;

          this.lessons = lesson;
          // this.getCourseReview()
          // this.$store.dispatch('lms/getCourseDetail')
        })
        .catch(() => {
          this.errorToast("Error", "Error Fetch Lessons");
        });
    },
    getCourseReview() {
      console.log("you are in getCourseReview");
      this.$store.dispatch("lms/getCourseDetail");
      // const uuid = this.$store.state.lms.courseUuid

      // this.$http
      //   .get(`courses/${uuid}`)
      //   // .get("courses" + "/" + uuid)
      //   .then((response) => {
      //     console.log(response.data.data.course);
      //     const {
      //       data: {
      //         data: { course },
      //       },
      //     } = response;
      //     course;
      //     this.$store.commit('lms/UPDATE_COURSE_DETAIL', course)
      //   })
    },
    gotoNextPage() {
      EventBus.$emit("updateTabIndex", 2);
    },
  },
  mixins: [toastAlert],
  watch: {
    "$store.state.lms.refetchLesson": function () {
      console.log("this is the refetch lesson call--------------------");
      this.getLessons();
    },
  },
  // mounted() {
  //   this.getLessons()
  // },
  setup() {
    const name = ref("");
    const lessons = ref([]);
    return {
      name,
      lessons,
    };
  },
};
</script>
<style scoped>
/* .lmsInputFieldCounter{
    position:absolute;
    top:0px;
    right:5px;
    color: lightgray;
  } */
</style>
