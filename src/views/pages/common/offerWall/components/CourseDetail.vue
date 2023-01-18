<template>
    <div class="knowledge-base-content">
        <h1>Requried Courses</h1>
        <div class="collapse-course mt-2 course-sec" v-if="campaignLms.length">
            <app-collapse accordion v-for="item in campaignLms" :key="item.uuid">
              <app-collapse-item  class="mb-2" :title="item.type"    >
                <b-row class="kb-search-content-info match-height">
                  <b-col
                    lg="12"
                    md="12"
                    sm="12"
                    class=" col-12 kb-search-content courses"
                  >
                    <div class="uni-course-card cursor-pointer"  @click=" $router.push({
                        name: 'university-courses',
                        params: { uuid: item.course.uuid },
                    }) ">
                      <div class="course-card-img">
                        <div class="img-overlay"></div>
                        <!-- <b-img :src="item.course_image" :img-alt="item.course_image.slice(5)" img-top></b-img> -->
                        <b-img :src="item.course.thumbnail" img-top></b-img>
                      </div>
                      <div class="course-card-content">
                        <h2>{{ item.course.title }}</h2>
                        <p class="mt-1"  style="display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                          {{ item.course.description }}
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
                        <div class="course-price">
                          <h2>$ {{ item.course.price }}</h2>
                        </div>
                        <div class="course-det">
                          <h4 class="m-0">Lessons:</h4>
                          <p class="m-0 w-25">{{item.course.lesson_count}}</p>
                        </div>
                        <div class="course-det">
                          <h4 class="m-0">Hours:</h4>
                          <p class="m-0  w-25">{{item.course.course_duration}}</p>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col v-show="!campaignLms.length" cols="12" class="text-center">
                    <h4 class="mt-4">Search result not found!</h4>
                  </b-col>
                </b-row>
              </app-collapse-item>
            </app-collapse>
        </div>
        <div v-else>
          <h4 class="mt-4">Result not found!</h4>
        </div>
      </div>
  </template>

  <script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BForm,
  BInputGroup,
  BFormInput,
  BCardText,
  BInputGroupPrepend,
  BPagination,
  BFormGroup,
  BImg
} from "bootstrap-vue";
import {debounce} from '@/commonFunction/helpers.js'
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import router from "@/router";
export default {
  props: ['campaign', 'user'],
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BPagination,
    BFormGroup,
    BImg,
    AppCollapse,
    AppCollapseItem
  },
  mixins: [toastAlert],
  data() {
    return {
      courseList: [],
      searchQuery: '',
      campaignLms: [],
    };
  },
  watch: {
    searchQuery: debounce(function () {
      this.getCourse()
      }, 500),
    perPage() {
      this.getCourse()
    },
    currentPage() {
      this.getCourse()
    }

  },
  methods: {
    getCourse() {
      this.showLoader();
      this.$http.get('/get-course-list', { params: {
         q: this.searchQuery,
         perPage: this.perPage,
         page: this.currentPage,

      }
      })
      .then((response) => {
        const { data: { data: { courses }}} = response
        this.courseList = courses.data
        this.currentPage = courses.current_page
        this.totalRows = courses.total
        this.perPage = courses.per_page

      })
      .catch(() => {
        this.errorToast("Error",'Error fetching Course')
      })
      .finally(() => {
          this.hideLoader();
        });
    },
    getCoursesByCampaign() {
      // console.log(typeof(this.selectedCat))
      this.$http
        .get("get-courses-by-campaign?campaign_uuid=" + router.currentRoute.params.uuid
        + '&type=' + this.user.role)
        // .get("get-campaigns-completed",{ category: this.selectedCat, vertical: this.selectedVertical })
        .then((response) => {
          const { data: { data: { campaignLms } } } = response

          this.campaignLms = campaignLms;
          console.log('campaignLms',this.campaignLms)
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    getAllCoursesByCampaign() {
      // console.log(typeof(this.selectedCat))
      this.$http
        .get("get-all-courses-by-campaign?campaign_uuid=" + router.currentRoute.params.uuid)
        // .get("get-campaigns-completed",{ category: this.selectedCat, vertical: this.selectedVertical })
        .then((response) => {
          const { data: { data: { campaignLms } } } = response

          this.campaignLms = campaignLms;
          console.log('campaignLms',this.campaignLms)
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
  },
  computed: {

  },
  mounted() {
    if(this.user.role == 'admin') {
      this.getAllCoursesByCampaign()
    } else {
      this.getCoursesByCampaign()
    }
  },
  created() {
    this.getCourse(),
    console.log('route',router.currentRoute.params.uuid)
    console.log('campaign',this.campaign.uuid)
  },
}
  </script>

  <style>
  </style>