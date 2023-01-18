<template>
  <div class="lms-show-tables">
    <b-row>
      <b-col md="12" class="mt-3">
        <b-table
          responsive
          :items="videos"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          class="table-cr table-bb"
        >
          <template #cell(thumbnail)="data">
            <div @click="preview(data.item.video_url)"
            v-b-modal.video-viewer
            class="btn">
              <b-img
                class="video-thumbnail"
                :src="data.item.video_thumbnail"
              ></b-img>
            </div>
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
                  v-b-modal.add-video
                  @click="editVideo(data.item)"
                  >Edit Video</span
                >
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon icon="TrashIcon" class="mr-50" />
                <span @click="deleteLessonVideo(data.item.uuid)"
                  >Delete Video</span
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
import EventBus from '@/event/EventBus'
export default {
  name: "VideoList",
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
    videos: Array,
  },
  data() {
    return {
      sortBy: null,
      sortDesc: false,
      isDisable: false,
      fields: [
        { key: "thumbnail", label: "Thumbnail", sortable: true },
        { key: "title", label: "Video Title", sortable: true },
        { key: "description", label: "Video Description", sortable: false },
        { key: "actions", label: "Actions", sortable: false },
      ],
    };
  },
  methods: {
    preview(url) {
      EventBus.$emit('playerSrc', url)
    },
    deleteLessonVideo(uuid) {
      console.log(uuid);
      this.$http
        .post("delete-lesson-video" + "/" + uuid)
        .then((response) => {
          this.successToast("Success", "Lesson Video Deleted Successfully!");
          this.$store.commit('lms/UPDATE_REFETCH_LESSON')
        })
        .catch((error) => {
          this.errorToast(
            "Error",
            "Something is going wrong please try again!"
          );
        });
    },
    editVideo(record) {
      this.$store.commit('lms/UPDATE_EDIT_VIDEO_RECORD', record)
    }

  },
  mixins: [toastAlert],

  created() {},
};
</script>
<style scoped lang="scss">
.lms-show-tables{
  .btn{
    padding: 0px;
    text-align: left;
  }
  img.video-thumbnail{
    width: 40%;
  }
}
</style>
