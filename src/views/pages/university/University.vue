<template>

    <div class="pb-3">
      <div class="header_title">
        <b-row class="align-items-center">
          <b-col lg="8" md="6" sm="12" cols="12">
            <h2>University</h2>
            <p>Courses to get you started</p>
          </b-col>
          <b-col lg="4" md="6" sm="12" cols="12">
            <b-form-group class="mb-0">
              <b-input-group class="input-group-merge">
                <div class="input-gradient">
                  <b-form-input v-model="searchQuery" placeholder="Search" />
                </div>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <b-row class="align-items-end mt-2 mb-2">
        <b-col lg="6" md="6">
          <label>Filter By Campaign</label>
          <v-select :clearable="false" v-model="selectedCampaign" placeholder="Filter by Campaign" :options="campaigns" label="campaign_name" :reduce="campaign => campaign.uuid" />
        </b-col>
        <b-col>
          <b-button class="primary-btn float-right" @click="resetFilter()">Reset</b-button>
        </b-col>
      </b-row>
      <div class="knowledge-base-content" v-if="campaignLms.length > 0">
        <b-row class="kb-search-content-info match-height">
          <b-col
            v-for="lms in campaignLms"
            :key="lms.uuid"
            lg="12"
            md="12"
            sm="12"
            class=" col-12 kb-search-content courses"
          >
            <div class="uni-course-card cursor-pointer"  @click=" $router.push({
                name: 'university-courses',
                params: { uuid: lms.course.uuid , campaign_uuid:lms.campaign.uuid},
            }) ">
              <div class="course-card-img">
                <div class="img-overlay"></div>
                <!-- :img-alt="item.course_image.slice(5)" -->
                <b-img :src="lms.course.thumbnail" img-top></b-img>
              </div>
              <div class="course-card-content">
                <h2>{{ lms.course.title }}</h2>
                <p class="mt-1"  style="display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                  {{ lms.course.description }}
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
                  <h2>$ {{ lms.course.price }}</h2>
                </div>
                <div class="course-det">
                  <h4 class="m-0">Lessons:</h4>
                  <p class="m-0 w-25">{{lms.course.lesson_count}}</p>
                </div>
                <div class="course-det">
                  <h4 class="m-0">Hours:</h4>
                  <p class="m-0  w-25">{{lms.course.course_duration}}</p>
                </div>
              </div>
            </div> 
          </b-col>
          <b-col v-show="!courseList.length" cols="12" class="text-center">
            <h4 class="mt-4">Search result not found!!</h4>
          </b-col>

          <b-col cols="12" class="mt-1">
            <div class="course-pagination">
              <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="center"
              size="sm"
              class="my-0"
            />
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="knowledge-base-content" v-else>
        <b-row class="kb-search-content-info match-height">
          <b-col
            v-for="item in courseList"
            :key="item.uuid"
            :per-page="perPage"
            :current-page="currentPage"
            lg="12"
            md="12"
            sm="12"
            class=" col-12 kb-search-content courses"
          >
            <div class="uni-course-card cursor-pointer"  @click=" $router.push({
                name: 'university-courses',
                params: { uuid: item.lms_course_uuid },
            }) ">
              <div class="course-card-img">
                <div class="img-overlay"></div>
                <!-- :img-alt="item.course_image.slice(5)" -->
                <b-img :src="item.course_image" img-top></b-img>
              </div>
              <div class="course-card-content">
                <h2>{{ item.title }}</h2>
                <p class="mt-1"  style="display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                  {{ item.tag_line }}
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
                  <h2>$ {{ item.price }}</h2>
                </div>
                <div class="course-det">
                  <h4 class="m-0">Lessons:</h4>
                  <p class="m-0 w-25">{{item.lesson_count}}</p>
                </div>
                <div class="course-det">
                  <h4 class="m-0">Hours:</h4>
                  <p class="m-0  w-25">{{item.course_duration}}</p>
                </div>
              </div>
            </div> 
          </b-col>
          <b-col v-show="!courseList.length" cols="12" class="text-center">
            <h4 class="mt-4">Search result not found!!</h4>
          </b-col>

          <b-col cols="12" class="mt-1">
            <div class="course-pagination">
              <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="center"
              size="sm"
              class="my-0"
            />
            </div>
          </b-col>
        </b-row>
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
  BImg,
  BButton
} from "bootstrap-vue";
import {debounce} from '@/commonFunction/helpers.js'

import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
import { getUserData } from '@/auth/utils'
export default {
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
    vSelect,
    BImg,
    BButton
  },
  mixins: [toastAlert],
  data() {
    return {
      user: {},
      courseList: [],
      perPage: 15,
      totalRows: 1,
      currentPage: 1,
      searchQuery: '',
      selectedCampaign: '',
      campaigns: [],
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
    },
    selectedCampaign(value) {
      this.getCoursesByCampaign();
    },

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
    getCampaigns() {
      // console.log(typeof(this.selectedCat))
      this.$http
        .get("get-campaigns-completed")
        // .get("get-campaigns-completed",{ category: this.selectedCat, vertical: this.selectedVertical })
        .then((response) => {
          const { data: { data: { campaigns } } } = response

          this.campaigns = campaigns.data;
          console.log('campaigns',this.campaigns)
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    getCoursesByCampaign() {
      // console.log(typeof(this.selectedCat))
      this.$http
        .get("get-courses-by-campaign?campaign_uuid=" + this.selectedCampaign
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
    resetFilter() {
      this.selectedCampaign = ''
      this.getCourse()
    },
  },
  computed: {
 
  },
  created() {
    this.getCourse(),
    this.getCampaigns(),
    this.user = getUserData()
    // console.log("kb data", this.kb[0].knowledgeBase);
    // this.$http.get('/kb/data/knowledge_base').then(res => { console.log('res', res); this.kb = res.data })
  },
  mounted() {
    // Set the initial number of items
    // this.totalRows = this.kb[0].knowledgeBase.length;
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-knowledge-base.scss";
@import "@/assets/scss/lms-style/agentlms.scss";
</style>
