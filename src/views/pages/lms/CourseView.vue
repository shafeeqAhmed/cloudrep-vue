<template>
  <div class="pb-3">
    <div class="header_title">
      <b-row class="align-items-center">
        <b-col
          lg="8"
          md="6"
          sm="12"
          cols="12"
        >
          <h2>LMS > Course View</h2>
          <p class="m-0">
            Enter your personal information brfore you can start using this
            platform.
          </p>
        </b-col>
        <b-col
          lg="4"
          md="6"
          sm="12"
          cols="12"
        >
          <b-button
            variant="primary"
            @click="goback"
            class="float-right"
            >Back</b-button
          >
        </b-col>
      </b-row>
    </div>
    <section class="card mt-3 py-3 course-view">
      <b-row class="mb-4">
        <b-col
          md="6"
          class="course-view-about mt-1"
        >
          <h2>{{ course.title }}</h2>
          <p
            style="
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 12;
              -webkit-box-orient: vertical;
            "
          >
            {{ course.tag_line }}
          </p>
        </b-col>
        <b-col
          md="6"
          class=""
        >
          <img
            :src="course.thumbnail"
            alt=""
            class="course-thumb-img"
          />
        </b-col>
        <b-col cols="12">
          <b-row class="course-cont">
            <b-col cols="12">
              <h2>Course Content</h2>
              <p class="">
                {{ course.lessons_count }} Sections -
                {{ course.videos_count }} Lectures -
                {{ course.course_duration }} total length
              </p>
            </b-col>
          </b-row>

          <div
            class="collapse-course mt-3"
            v-for="lesson in course.lessons"
            :key="lesson.uuid"
          >
            <app-collapse class="mb-2">
              <app-collapse-item :title="lesson.name">
                <b-row>
                  <b-col
                    md="12"
                    class=""
                    v-for="video in lesson.videos"
                    :key="video.uuid"
                  >
                    <div class="d-flex align-items-center m-1">
                      <div class="d-flex align-items-center">
                        <img
                          @click="preview(video.video_url)"
                          v-b-modal.video-viewer
                          class="video-thumbnail"
                          :src="video.video_thumbnail"
                          alt=""
                        />
                        <div class="video-title">
                          <span>{{ video.title }}</span>
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <span
                            @click="preview(video.video_url)"
                            v-b-modal.video-viewer
                          >
                            <router-link
                              to=""
                              class="preview"
                            >
                              Preview
                            </router-link>
                          </span>
                          <span> {{ video.duration }}</span>
                          <b-dropdown
                            variant="link"
                            right
                            toggle-class="text-decoration-none"
                            no-caret
                            class="drop-with-trash"
                          >
                            <template v-slot:button-content>
                              <feather-icon
                                icon="MoreVerticalIcon"
                                size="16"
                                class="text-body align-middle mr-25"
                              />
                            </template>
                            <b-dropdown-item v-b-modal.add-video>
                              <feather-icon
                                icon="Edit2Icon"
                                class="mr-50"
                              />
                              <span @click="editVideo(video)">Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <feather-icon
                                icon="TrashIcon"
                                class="mr-50"
                              />
                              <span @click="deleteLessonVideo(video.uuid)"
                                >Delete Video</span
                              >
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col
                    md="12"
                    class="mt-2"
                  >
                    <h2 class="my-1">Quizes</h2>
                    <hr />
                    <div
                      class="d-flex align-items-center mt-1"
                      v-for="quiz in lesson.quizes"
                      :key="quiz.uuid"
                    >
                      <div class="d-flex align-items-center">
                        <feather-icon
                          icon="FileTextIcon"
                          size="24"
                        />
                        <div class="video-title">
                          <span>{{ quiz.name }}</span>
                        </div>
                      </div>
                      <div class="ml-auto video-preview vp-quiz">
                        <div class="d-flex align-items-center">
                          <b-link
                            @click="gotoQuiz(quiz.uuid)"
                            class="preview"
                          >
                            <span>Take Quiz</span>
                          </b-link>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </app-collapse-item>
            </app-collapse>
          </div>
        </b-col>
        <b-col
          cols="12"
          class="course-cont"
        >
          <hr />
          <h2>Description :</h2>
          <div>
            <div
              id="course-des"
              class="course-desc mt-2"
              v-html="course.description"
            ></div>
            <b-button
              id="show-btn"
              class="primary-btn mt-2"
              @click="showMoreRead"
              >Show More</b-button
            >
            <b-button
              id="hide-btn"
              class="primary-btn mt-2"
              @click="hideMoreRead"
              >Show Less</b-button
            >
          </div>
        </b-col>
      </b-row>
    </section>
    <video-player />
  </div>
</template>

<script>
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import {
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BModal,
  BFormGroup,
  BFormInput,
  BLink,
  BButton,
} from "bootstrap-vue";
import lmsStoreModule from "./lmsStoreModule";
import axiosIns from "@/libs/axios";
import { toastAlert } from "@core/mixins/ui/toast";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import AddVideo from "./components/lessons/modal/AddVideo.vue";
import EventBus from "@/event/EventBus";

import VideoPlayer from "./components/lessons/modal/VideoPlayer.vue";

export default {
  components: {
    AppBreadcrumb,
    BRow,
    BCol,
    AppCollapse,
    AppCollapseItem,
    BDropdown,
    BDropdownItem,
    BModal,
    AddVideo,
    VideoPlayer,
    BFormGroup,
    BFormInput,
    BLink,
    BButton,
  },
  mixins: [toastAlert],
  data() {
    return {
      course: {},
    };
  },
  watch: {
    "$store.state.lms.refetchLesson": function () {
      this.getCourse();
    },
  },
  methods: {
    goback() {
      this.$router.push({ name: "list-course" });
    },
    preview(url) {
      EventBus.$emit("playerSrc", url);
    },
    deleteLessonVideo(uuid) {
      this.$http
        .post("delete-lesson-video" + "/" + uuid)
        .then((response) => {
          this.successToast("Success", "Lesson Video Deleted Successfully!");
          this.$store.commit("lms/UPDATE_REFETCH_LESSON");
        })
        .catch((error) => {
          this.errorToast(
            "Error",
            "Something is going wrong please try again!"
          );
        });
    },
    editVideo(record) {
      this.$store.commit("lms/UPDATE_EDIT_VIDEO_RECORD", record);
    },
    getCourse() {
      const param = this.$router.currentRoute.params.uuid;
      this.$http
        .get("courses" + "/" + param)
        .then((response) => {
          const {
            data: { data },
          } = response;
          this.course = data.course;
        })
        .catch((error) => {
          // this.errorToast();
        });
    },
    gotoQuiz(param) {
      this.$router.push({ name: "take-quiz", params: { uuid: param } });
    },
    showMoreRead() {
      var show = document.getElementById("course-des");
      var shbtn = document.getElementById("show-btn");
      var hbtn = document.getElementById("hide-btn");

      show.classList.add("showMore");
      shbtn.style.display = "none";
      hbtn.style.display = "block";
    },
    hideMoreRead() {
      var show = document.getElementById("course-des");
      var shbtn = document.getElementById("show-btn");
      var hbtn = document.getElementById("hide-btn");

      show.classList.remove("showMore");
      shbtn.style.display = "block";
      hbtn.style.display = "none";
    },
  },

  created() {
    const APP_STORE_MODULE_NAME = "lms";

    // // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME))
      this.$store.registerModule(APP_STORE_MODULE_NAME, lmsStoreModule);

    this.getCourse();
  },
  // UnRegister on leave
  onUnmounted() {
    if (this.$store.hasModule(APP_STORE_MODULE_NAME))
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
  },
};
</script>
