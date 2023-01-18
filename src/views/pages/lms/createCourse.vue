<template>
  <div>
    <div class="lms-creation pb-1">
      <div class="lms-steps">
        <form-wizard color="#7367F0" :title="null" :subtitle="null" shape="square" finish-button-text="Publish Course"
          back-button-text="Previous" class="mb-3 pb-2 vertical-steps customClass" ref="wizard" :hideButtons="true">
          <!-- Course Upload -->
          <tab-content title="Course Information" class="create-course-wrap">
            <course-upload />
          </tab-content>
          <!-- Add Sections -->
          <tab-content title="Add Sections" class="create-course-wrap">
            <create-lesson />
          </tab-content>

          <!-- Course Review  -->
          <tab-content title="Review Your Course">
            <course-review />
          </tab-content>
        </form-wizard>
        <video-player />
      </div>
      <div>
        <!-- <LmsCreationNav/> -->
      </div>
    </div>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import CourseUpload from "./components/CourseUpload.vue";
import CreateLesson from "./components/lessons/CreateLesson.vue";
import CourseReview from "./components/CourseReview.vue";
import lmsStoreModule from "./lmsStoreModule";
import VideoPlayer from "./components/lessons/modal/VideoPlayer.vue";
import LmsCreationNav from "./components/LmsCreationNav.vue";
import EventBus from "@/event/EventBus";
import store from '@/store'
export default {
  components: {
    CourseUpload,
    CreateLesson,
    CourseReview,
    LmsCreationNav,
    FormWizard,
    TabContent,
    VideoPlayer,
  },
  methods: {
    goNext(index) {
      if (index) {
        this.$refs.wizard.activateAll();
        this.$refs.wizard.nextTab();
      }
      // console.log(index)
      // console.log('this is the go next----------------')

    },
  },

  mounted() {
    EventBus.$on("updateTabIndex", this.goNext);
    
  },
  created() {
    
    const APP_STORE_MODULE_NAME = "lms";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, lmsStoreModule);
      const uuid = this.$route.params.course_uuid;
      if(uuid){
        this.$store.commit('lms/UPDATE_COURSE_UUID', uuid)
      }
    }
    // console.log('you are in create course main component!')
    // console.log(this.$route.params.course_uuid)
    
  },
  // unmounted() {
  //   const APP_STORE_MODULE_NAME = "lms";
  //   this.$store.commit("lms/UPDATE_COURSE_UUID", null);

  //   // UnRegister on leave
  //   if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
  //     this.$store.unregisterModule(APP_STORE_MODULE_NAME);
  //     EventBus.$off("updateTabIndex", this.goNext);
  //   }
  // },
  destroyed() {
    this.$store.commit("lms/UPDATE_COURSE_UUID", null);
    const APP_STORE_MODULE_NAME = "lms";


    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }

  }
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>