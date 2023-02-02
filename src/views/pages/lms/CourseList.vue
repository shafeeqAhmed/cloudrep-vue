<template>
  <div>
    <div class="header_title">
      <b-row class="align-items-center">
        <b-col
          lg="8"
          md="6"
          sm="12"
          cols="12"
        >
          <h2>LMS > Course View</h2>
          <p>
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
          <b-form-group>
            <div class="input-gradient">
              <b-form-input
                v-model="searchQuery"
                placeholder="Search"
              ></b-form-input>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div
      class="lms-courselist mb-5"
      v-if="courseList"
    >
      <b-row class="kb-search-content-info match-height">
        <b-col
          sm="12"
          v-for="course in courseList"
          :key="course.id"
        >
          <div class="uni-course-card">
            <div
              class="course-card-img"
              @click="courseView(course.lms_course_uuid)"
            >
              <div class="img-overlay"></div>
              <b-img :src="course.course_image"></b-img>
            </div>
            <div class="course-card-content">
              <h2 @click="courseView(course.lms_course_uuid)">
                {{ course.title }}
              </h2>
              <p
                style="
                  display: -webkit-box;
                  overflow: hidden;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                "
              >
                {{ course.tag_line }}
              </p>
              <div class="auther-name mt-3 mb-1">
                <h4 class="m-0">Jose Portilla</h4>
              </div>
              <div class="course-five-star d-flex align-items-center">
                <h4 class="mr-1 m-0">4.5</h4>
                <div class="ratings mr-1">
                  <i data-star="4.5"></i>
                </div>
                <p>(256)</p>
              </div>
              <div class="course-det">
                <h4 class="m-0">Lessons:</h4>
                <p class="m-0 w-25">18</p>
              </div>
              <div class="course-det">
                <h4 class="m-0">Hours:</h4>
                <p class="m-0 w-25">7.5</p>
              </div>
              <div
                class="courselist-edit"
                v-b-toggle="`courseEdit-${course.id}`"
              >
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="21"
                />
              </div>
              <b-collapse
                :id="`courseEdit-${course.id}`"
                class="courseEdit"
              >
                <div class="course-edit-box">
                  <b-button
                    class="courseedit-btn mb-1"
                    @click="editCourse(course.lms_course_uuid)"
                    >Edit</b-button
                  >
                  <b-button
                    class="coursedelete-btn"
                    @click="deleteCourse(course.lms_course_uuid)"
                    >Delete</b-button
                  >
                </div>
              </b-collapse>
            </div>
          </div>
        </b-col>

        <b-col
          cols="12"
          class="mt-1 pb-5"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
          />
        </b-col>
      </b-row>
    </div>
    <div
      v-else
      class="lms-listing-none mt-4 mb-5 d-flex align-items-center justify-content-center"
    >
      <b-img src="@/assets/images/lms-img/list-none.png"></b-img>
      <p class="mt-1">Looks Like You Haven’t Created Any Course Yet</p>
      <button class="mt-1">Create Your Course</button>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BImg,
  BDropdown,
  BDropdownItem,
  BPagination,
  BButton,
  BCollapse,
  BTooltip,
  VBToggle,
  BButtonGroup,
  BFormGroup,
  BFormInput,
} from "bootstrap-vue";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import LmsHeader from "./components/LmsHeader.vue";
import vSelect from "vue-select";
import { debounce } from "@/commonFunction/helpers.js";
export default {
  components: {
    AppBreadcrumb,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BPagination,
    LmsHeader,
    BImg,
    BButton,
    BCollapse,
    BTooltip,
    VBToggle,
    BButtonGroup,
    BFormGroup,
    BFormInput,
    vSelect,
  },
  directives: {
    "b-toggle": VBToggle,
  },
  mixins: [toastAlert],
  data() {
    return {
      courseList: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      searchQuery: "",
    };
  },
  watch: {
    searchQuery: debounce(function () {
      this.getCourse();
    }, 500),
    perPage() {
      this.getCourse();
    },
    currentPage() {
      this.getCourse();
    },
  },
  methods: {
    editCourse(param) {
      this.$router.push({
        name: "create-course",
        params: { course_uuid: param },
      });
    },
    getCourse() {
      this.showLoader();
      this.$http
        .get("/get-course-list", {
          params: {
            q: this.searchQuery,
            perPage: this.perPage,
            page: this.currentPage,
          },
        })
        .then((response) => {
          const {
            data: {
              data: { courses },
            },
          } = response;
          this.courseList = courses.data;
          this.currentPage = courses.current_page;
          this.totalRows = courses.total;
          this.perPage = courses.per_page;
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: "Error fetching Course",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    deleteCourse(uuid) {
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete this Course`, {
          title: "Please Confirm",
          size: "md",
          okVariant: "primary",
          okTitle: "Yes",
          cancelTitle: "No",
          cancelVariant: "outline-secondary",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.showLoader();
      this.$http
        .delete(`courses/${uuid}`)
        .then(() => {
          this.successToast("Success", "Course has been deleted Successfully");
          this.getCourse();
        })
        .catch((error) => {
          this.errorToast();
        })
        .finally(() => {
          this.hideLoader();
        });
          }
        });
     
    },
    courseView(uuid) {
      this.$router.push({ path: `/view-course/${uuid}` });
    },
  },
  created() {
    this.getCourse();
  },
};
</script>
