<template>
  <div>
    <section class="py-3 course-view">
      <b-row class="mb-4" v-if="course">
        <b-col md="6" class="course-view-about mt-1">
          <h2>{{ course.title }}</h2>
          <p>{{ course.tag_line }}</p>
        </b-col>
        <b-col md="6" class="">
          <img :src="course.thumbnail" alt="" class="course-thumb-img"/>
        </b-col>

        <b-col md="12">
          <div class="course-cont">
            <h2>Course Content</h2>
            <p>{{ course.lessons_count }} Sections - {{ course.videos_count }} Lectures - {{ course.course_duration }}
              total length</p>
          </div>

          <div class="collapse-course mt-3" v-for="(lesson, key) in course.lessons" :key="key">
            <app-collapse class="mb-2">
              <app-collapse-item :title="lesson.name">
                <b-row>
                  <b-col md="12" class="" v-for="(video, key) in lesson.videos" :key="key">
                    <div class="d-flex align-items-center mt-1">
                      <div class="d-flex align-items-center">
                        <img class="video-thumbnail" :src="video.video_thumbnail" alt="" />
                        <div class="video-title">
                          <span>{{ video.title }}</span>
                          <feather-icon icon="ChevronDownIcon" size="16" />
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <span 
                            @click="preview(video.video_url)"
                            v-b-modal.video-viewer>
                            <router-link to="" class="preview">
                              Preview
                            </router-link>
                          </span>
                          <span> {{ video.duration }}</span>
                          <b-dropdown variant="link" right toggle-class="text-decoration-none" no-caret
                            class="drop-with-trash">
                            <template v-slot:button-content>
                              <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                            </template>
                            <b-dropdown-item>
                              <feather-icon icon="Edit2Icon" class="mr-50" />
                              <span @click="editVideo(video)">Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <feather-icon icon="TrashIcon" class="mr-50" />
                              <span @click="deleteLessonVideo(video.uuid)">Delete Video</span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  
                  <b-col md="12" class="mt-4">
                    <div  v-for="(quiz, key) in lesson.quizes" :key="key">
                      <h2 class="my-1">Quiz : {{quiz.name}}</h2>
                      <hr />
                      <div class="d-flex align-items-center" v-for="(question, key) in quiz.questions" :key="key">
                        <div class="d-flex align-items-center mb-2">
                          <feather-icon icon="FileTextIcon" size="24" />
                          <div class="video-title">
                            <span>{{ question.name }}</span>
                          </div>
                        </div>
                        <div class="ml-auto video-preview vp-quiz">
                          <div class="d-flex align-items-center">
                            <span>Random Progress Questions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </app-collapse-item>
            </app-collapse>
          </div>
        </b-col>
        <b-col cols="12" class="course-cont">
          <hr>
          <h2>Description :</h2>
          <div>
            <div id="course-des" class="course-desc mt-2" v-html="course.description"></div>
            <b-button id="show-btn" class="primary-btn mt-2" @click="showMoreRead">Show More</b-button>
            <b-button id="hide-btn" class="primary-btn mt-2" @click="hideMoreRead">Show Less</b-button>
          </div>
        </b-col>

      </b-row>

    </section>
    <b-row>
      <b-col md="12" class="mt-3">
        <div class="d-flex justify-content-end">
            <b-button class="mr-1" variant="primary" @click="publishCourse">Publish Course</b-button>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { mapState } from 'vuex'
import EventBus from '@/event/EventBus'

export default {
  name: "CourseReview",
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
    vSelect,
    AppCollapse,
    AppCollapseItem
  },
  mixins: [toastAlert],
  data() {
    return {
    }
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    course: state => state.lms.courseDetail,
  }),
  watch: {
    '$store.state.lms.refetchLesson': function () {
      this.getCourseDetail()
    }
  },
  methods: {
    preview(url) {
      EventBus.$emit('playerSrc', url)
    },
    getCourseDetail() {
      this.$http
        .get("courses" + "/" + this.$store.state.lms.courseUuid)
        // .get("courses" + "/" + uuid)
        .then((response) => {
          console.log(response.data.data.course);
          const {
            data: {
              data: { course },
            },
          } = response;
          course;
          this.$store.commit('lms/UPDATE_COURSE_DETAIL', course)
        })
    },
    deleteLessonVideo(uuid) {
      console.log(uuid);
      this.$http
        .post("delete-lesson-video" + "/" + uuid)
        .then((response) => {
          this.getCourseDetail()
          this.successToast('Success', 'Video has been deleted successfully!')
        })
        .catch((error) => {
          this.errorToast()
        });
    },
    editVideo(record) {
      this.$store.commit('lms/UPDATE_EDIT_VIDEO_RECORD', record)
      this.$bvModal.show('add-video')
    },
    publishCourse(){
      const course = this.$store.state.lms.courseDetail
      if(course.lessons_count > 0){
        this.$http
        .post("course-published" + "/" + course.uuid)
        .then((response) => {
          if(response.data.status == true){
            this.$router.push({name:'list-course'})
          }
        })
        .catch((error) => {
          // this.errorToast('')
        });
      }else{
        this.errorToast('Error', 'Course must have atleast one section!')
      }
    },
    showMoreRead(){
      var show = document.getElementById('course-des')
      var shbtn = document.getElementById('show-btn')
      var hbtn = document.getElementById('hide-btn')

      show.classList.add("showMore");
      shbtn.style.display = "none";
      hbtn.style.display = "block";
    },
    hideMoreRead(){
      var show = document.getElementById('course-des')
      var shbtn = document.getElementById('show-btn')
      var hbtn = document.getElementById('hide-btn')

      show.classList.remove("showMore");
      shbtn.style.display = "block";
      hbtn.style.display = "none";
    }
  },

};
</script>
