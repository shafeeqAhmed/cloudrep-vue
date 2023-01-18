<template>
  <div>
      <div v-for="quiz in quizes" :key="quiz.id" class="mt-3">
        <b-row class="align-items-center">
          <b-col md="6">
            <h2 class="m-0">Quiz : {{quiz.name}}</h2>
          </b-col>
          <b-col md="6" class="text-right ml-auto">
            <b-button
              class="btn"
              variant="success"
              @click="addQuestion(quiz.uuid)"
              v-b-modal.create-ques
              >+&nbsp;Create Question</b-button
            >
          </b-col>
        </b-row>
        <question-list :questions="quiz.questions" />
      </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BButton,
  BTable,
  BImg,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import { toastAlert } from "@core/mixins/ui/toast";
import QuestionList from "./QuestionList.vue";

export default {
  name: "QuizList",
  components: {
    BRow,
    BCol,
    BButton,
    BTable,
    BImg,
    BDropdown,
    BDropdownItem,
    QuestionList,
  },
  props: {
    quizes: Array,
  },
  data() {
    return {
      quizUuid: "",
      fields: [
        { key: "thumbnail", label: "Thumbnail", sortable: true },
        { key: "title", label: "Video Title", sortable: true },
        { key: "description", label: "Video Description", sortable: false },
        { key: "actions", label: "Actions", sortable: false },
      ],
    };
  },
  methods: {
    addQuestion(uuid) {
      this.$store.commit("lms/UPDATE_QUIZ_UUID", uuid);
      this.$store.commit('lms/UPDATE_EDIT_QUESTION_OPTIONS',null)
    },
  },
  mixins: [toastAlert],

  created() {},
};
</script>
