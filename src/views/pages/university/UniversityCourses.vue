<template>
  <div class="pb-3">
    <div class="header_title">
      <b-row class="align-items-center">
        <b-col cols="6">
          <h2>University > University Course</h2>
          <p class="m-0">Enter your personal information brfore you can start using this platform.</p>
        </b-col>
        <b-col cols="6">
          <b-button variant="primary" @click="goback" class="float-right">Back</b-button>
        </b-col>
      </b-row>
    </div>
    <div class="card mt-3 py-3 course-view">
      <b-row class="">
        <b-col md="6" class="course-view-about mt-1">
          <h2>{{ course.title }}</h2>
          <p>
            {{ course.tag_line }}
          </p>
          <div class="users-enrolled mt-2 mb-1">
            <div>
              <ul class="d-flex align-items-center">
                <li>
                  <b-img src="@/assets/images/lms-img/1.png"></b-img>
                </li>
                <li>
                  <b-img src="@/assets/images/lms-img/2.png"></b-img>
                </li>
                <li>
                  <b-img src="@/assets/images/lms-img/3.png"></b-img>
                </li>
                <li>
                  <b-img src="@/assets/images/lms-img/4.png"></b-img>
                </li>
                <li>
                  <b-img src="@/assets/images/lms-img/5.png"></b-img>
                </li>
                <li>
                  <b-img src="@/assets/images/lms-img/6.png"></b-img>
                </li>
                <li>
                  <span class="ml-1">+46 User Inrolled</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="course-five-star d-flex align-items-center">
            <h4 class="mr-1 m-0">4.5</h4>
            <div class="ratings mr-1">
              <i data-star="4.5"></i>
            </div>
            <p>(256)</p>
          </div>
          <div class="course-user-profile d-flex align-items-start mt-1">
            <div>
              <b-img src="@/assets/images/lms-img/86.png"></b-img>
            </div>
            <div class="ml-2">
              <p class="course-owner">
                  Course created by
              </p>
              <b-link>Biffco Enterprises Ltd.</b-link>
            </div>
          </div>
        </b-col>
        <b-col md="6">
         <!-- <div class="course-thumb"  v-b-modal.video-viewer v-if="courseOrder.price_after_copon != 0 && courseOrder.course_price !== 0"> -->
            <!-- <div class="course-thumb-overlay"></div> -->
            <!-- <img src="@/assets/images/courses/Play-vid.svg" class="play" alt="" /> -->
            <img :src="course.thumbnail" alt="" class="w-100 course-thumb-img"/>
         <!-- </div> -->
        </b-col>
        <b-col cols="12">
          <b-row class="align-items-center course-cont">
            <b-col md="6">
              <h2>Course Content</h2>
              <p v-if="course">
                {{ course.lessons_count }} Sections -
                {{ course.videos_count }} Lectures -
                {{ course.course_duration }} total length
              </p>
            </b-col>
            <b-col md="6" class="btn-large" v-if="course && courseOrder.price_after_copon !== 0 && courseOrder.course_price !== 0" >
              <button @click="gotoPurchase(course.uuid)" class="btn btn-primary btn-lg w-100">
                <span v-if="course.price == 0">Enroll For Free</span>
                <span v-if="course.price != 0">Buy Now For ${{ course.price }}</span>
              </button>
            </b-col>
          </b-row>

          <div class="collapse-course mt-3" v-if="course">
            <app-collapse class="mb-2" v-for="lesson in course.lessons" :key="lesson.uuid">
              <app-collapse-item :title="lesson.name">

                  <b-row>
                  <b-col md="12" class="" v-for="video in lesson.videos" :key="video.uuid">
                    <div class="d-flex align-items-center mt-1">
                      <div class="d-flex align-items-center">
                        <img class="video-thumbnail" :src="video.video_thumbnail" alt="" />
                        <div class="video-title">
                          <span>{{ video.title }}</span>
                        </div>
                      </div>
                      <div class="ml-auto video-preview" >
                        <div class="d-flex align-items-center" >
                          <span  @click="preview(video.video_url)"  v-b-modal.video-viewer v-if="courseOrder.price_after_copon == 0 || video.is_free == true" >
                            <router-link to="" class="preview">
                              Preview
                            </router-link>
                          </span>
                          <span v-else><feather-icon icon="LockIcon" size="21" /></span>
                          <span> {{ video.duration }}</span>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  
                  <b-col md="12" class="mt-5">
                    <!-- <b-row>
                      <b-col md="12" class="mb-2">
                        <div class="video-title">
                          <span>{{ quiz.name }}</span>
                          <hr />
                        </div>
                      </b-col>
                    </b-row> -->

                    <div class="" v-for="quiz in lesson.quizes" :key="quiz.uuid">
                      <div class="quiz-table-course" v-for="(question, key) in quiz.questions" :key="key">
                        <div class="d-flex align-items-center mb-1">
                          <feather-icon icon="FileTextIcon" size="24" />
                          <div class="video-title">
                            <span class="p-0">{{ question.name }}</span>
                          </div>
                        </div>
                        <div class="ml-auto video-preview vp-quiz ">
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
    </div>
    <b-modal
      id="course-video"
      centered
      title="Course Preview"
      ok-title=""
      cancel-title=""
      modal-class="modal-video-cr"
    >
    
    </b-modal>
    <video-player />
  </div>
</template>

<script>
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { BRow, BCol, BDropdown, BDropdownItem, BModal , BLink , BImg,BButton} from "bootstrap-vue";
import axiosIns from "@/libs/axios";
import router from "@/router";
import { ref } from "@vue/composition-api";
import EventBus from '@/event/EventBus'
import VideoPlayer from "../lms/components/lessons/modal/VideoPlayer.vue";
import { getUserData } from '@/auth/utils'
import { toastAlert } from "@core/mixins/ui/toast";  


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
    VideoPlayer,
    BLink,
    BImg,
    BButton
  },
  mixins: [toastAlert],
  data() {
    return{
      user: {},
      source: 'https://static.smartisanos.cn/common/video/production/delta/jianguopro3-coming-for-u.mp4',
      course: {},
      is_enrolled: false,
      courseOrder: [],
    }
  },
  methods:{
    goback(){
      this.$router.push({ name: "university" });
    },
    gotoPurchase(uuid){
      if(this.courseOrder && this.courseOrder.copon_id && this.courseOrder.price_after_copon != null) {
        this.customToast('warning' ,'Warning!','You already have been enrolled in this course');
        this.$router.push({
              name: 'university-courses-purchase',
              params: { uuid: uuid },
          })
        
      } else {
        this.storeCourseOrder(uuid),
        this.$router.push({
              name: 'university-courses-purchase',
              params: { uuid: uuid },
          })
      }
      
    },
    preview(url) {
      EventBus.$emit('playerSrc', url)
    },
    getCourse(){
      this.showLoader();
      const uuid = this.$router.currentRoute.params.uuid
      this.$http
      .get("courses" + "/" + uuid)
      .then((response) => {
        const {
          data: { data: { course } },
        } = response;
        this.course = course;
      })
      .catch((error) => {
        // this.errorToast();
      })
      .finally(() => {
          this.hideLoader();
      });
    },
    storeCourseOrder(uuid) {
      const data = {course_uuid: uuid, course_price: this.course.price, campaign_uuid: this.$router.currentRoute.params.campaign_uuid}
            this.$http
          .post("store-course-order",data)
          .then((response) => {
            console.log(response)
            // const {
            //   data: {
            //     data: { promoCode },
            //   },
            // } = response;
          })
    },
    getCourseOrder() {
      this.$http
        .get("get-course-order?course_uuid=" + router.currentRoute.params.uuid
        + '&user_uuid=' + this.user.user_uuid)
        .then((response) => {
          const {
              data: {
                data: { courseOrder },
              },
            } = response;
            this.courseOrder = courseOrder
            // if(this.courseOrder.copon.is_applied == true) {
            //   this.coponDiscount = this.courseOrder.copon.amount
            //   this.totalAmount = this.courseOrder.price_after_copon
            // }
        });
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
  mounted(){
    this.getCourseOrder()
    },
  created(){
    this.getCourse(),
    this.user = getUserData()
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/lms-style/agentlms.scss";

.collapse-course{
  .collapse-icon ::after{
    transform: none;
  }
  .collapse-icon .open ::after{
    transform: rotate(180deg);
  }
}
</style>