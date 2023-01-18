<template>
  <div class="lms-show-tables">
    <b-row>
      <b-col md="12" class="mt-3">
        <b-table
          responsive
          :items="questions"
          :fields="fields2"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          class="table-cr table-bb table-quiz"
        >
          <template #cell(thumbnail)="data">
            <feather-icon icon="BookIcon" size="22" class=""></feather-icon>
          </template>

          <template #cell(actions)="data">
            <b-dropdown
              :items="data.item.actions"
              variant="link"
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
              <b-dropdown-item>
                <feather-icon icon="Edit2Icon" class="mr-50" />
                <span
                  v-b-modal.create-ques
                  @click="editQuestion(data.item)"
                  >Edit Question</span
                >
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon icon="TrashIcon" class="mr-50" />
                <span @click="deleteQuestionOptions(data.item.uuid)"
                  >Delete Question</span
                >
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </b-col>
    </b-row>
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
export default {
  name: "QuestionList",
  components: {
    BRow,
    BCol,
    BButton,
    BTable,
    BImg,
    BDropdown,
    BDropdownItem,
  },
  props: {
    questions: Array,
  },
  data() {
    return {
      sortBy: null,
      sortDesc: false,
      fields2: [
        { key: "thumbnail", label: "", sortable: false },
        { key: "name", label: "Questions", sortable: true },
        { key: "created_at", label: "Date Added", sortable: true },
        { key: "actions", label: "Actions", sortable: false },
      ],
    };
  },
  methods: {
        editQuestion(record) {
          this.$store.commit('lms/UPDATE_EDIT_QUESTION_OPTIONS',record)

    },
   
    deleteQuestionOptions(uuid) {
      this.$http
        .delete("questions" + "/" + uuid)
        .then((response) => {
          this.successToast('Success','Question has been deleted Successfully!')
        this.$store.commit('lms/UPDATE_REFETCH_LESSON')
        })
        .catch((error) => {
         
        });
    },
  },
  mixins: [toastAlert],

  created() {},
};
</script>
<style scoped lang="scss">
  .questionlist-img{
    width: auto !important;
  }
</style>