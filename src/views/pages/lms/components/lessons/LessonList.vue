<template>
  <div>
    <b-row class="row-courses">
      <b-col md="12">
        <div v-for="item in lessons" :key="item.id">
          <div class="courses-box mb-3">
            <b-row>
              <b-col md="5">
                <h2>{{ item.name }}</h2>
              </b-col>
              <b-col md="7" class="text-right ml-auto">
                <b-button
                  class="btn mr-2"
                  variant="primary"
                  v-b-modal.add-video
                  lesson="'item'"
                  @click="setLessionUuid(item.uuid)"
                  >+&nbsp;Add Video</b-button
                >
                <b-button
                  class="btn mr-2"
                  variant="primary"
                  v-b-modal.create-quiz
                  lessonId="'item'"
                   @click="setLessionUuid(item.uuid)"
                  >+&nbsp;Create Quiz</b-button
                >
                <!-- <b-button class="btn btn-delete" @click="deleteLesson">
                  <feather-icon icon="TrashIcon" />
                </b-button> -->
              </b-col>

            </b-row>
            <video-list :videos="item.videos" />
            <quiz-list :quizes="item.quizes" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";

import { toastAlert } from "@core/mixins/ui/toast";
import VideoList from "./VideoList.vue"
import QuizList from "./QuizList.vue"
export default {
  name: "LessonList",
  components: {
    BRow,
    BCol,
    BButton,
    VideoList,
    QuizList,
  },
  props: {
    lessons: Array
  },
  data() {
    return {
      lessonId: '',
    }
  },
  methods: {
    setLessionUuid(uuid) {
      this.$store.commit('lms/UPDATE_LESSON_UUID',uuid);
      this.$store.commit('lms/UPDATE_EDIT_VIDEO_RECORD', null)
    },
  },
  mixins: [toastAlert],

  created() {
    
  }
};
</script>
