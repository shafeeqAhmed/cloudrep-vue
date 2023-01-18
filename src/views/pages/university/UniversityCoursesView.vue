<template>
    <div class="pb-3">
      <!-- <div class="lmsagent-breadcrumbs">
        <b-row class="align-items-center mb-4">
          <b-col md="12">
            <slot name="breadcrumb">
              <app-breadcrumb />
            </slot>
          </b-col>
        </b-row>
      </div> -->
      <div class="lms-course-view">
        <div class="course-view-left">
            <b-row>
                <b-col md="12">
                    <div class="mb-3">
                        <h1>Become an Animation Master</h1>
                    </div>
                    <div class="course-video-lm mb-3">
                        <video src="@/assets/videos/any-wh.mp4" preload="auto" autoplay loop muted ></video>
                    </div>
                    <div class="course-view-tabs">
                        <b-tabs content-class="mt-3">
                            <b-tab title="Overview" active>
                                <div>
                                    <div class="mb-2">
                                        <h2 class="mb-1">About Course</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim urna tincidunt at imperdiet. Massa nisl consequat duis nullam. Faucibus tristique pellentesque malesuada eu urna morbi. Suscipit tristique consectetur massa tortor, elementum vulputate adipiscing sed. Cursus ornare placerat malesuada id. Et purus mattis ac nibh cras ut nulla eu tempor. Id pharetra, diam aliquet quam mauris. Neque, enim pulvinar nullam semper. Elit sed quam elementum elit vulputate volutpat. Lectus molestie sagittis ac felis id. Quam arcu massa viverra tortor. Sollicitudin dignissim phasellus magna pellentesque amet, sit.</p>
                                    </div>
                                    <div class="mb-2">
                                        <h2>What You’ll learn</h2>
                                        <ul class="listing-cour mt-1">
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                            <li>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </b-tab>
                            <b-tab title="Description">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim urna tincidunt at imperdiet. Massa nisl consequat duis nullam. Faucibus tristique pellentesque malesuada eu urna morbi. Suscipit tristique consectetur massa tortor, elementum vulputate adipiscing sed. Cursus ornare placerat malesuada id. Et purus mattis ac nibh cras ut nulla eu tempor. Id pharetra, diam aliquet quam mauris. Neque, enim pulvinar nullam semper. Elit sed quam elementum elit vulputate volutpat. Lectus molestie sagittis ac felis id. Quam arcu massa viverra tortor. Sollicitudin dignissim phasellus magna pellentesque amet, sit.
                                </p>
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div class="course-view-right">
            <div class="course-completion">
                <h2>Course Completion</h2>
                <div class="text-center mt-2 mb-2">
                    <b-img class="" src="@/assets/images/lms-img/vid-play.png"></b-img>
                </div>
            </div>
            <div class="course-content">
                <ul>
                    <li>
                        <div class="course-cont-tab">
                            <h2>Course Content</h2>
                        </div>
                    </li>
                    <li>
                        <div class="course-cont-tab">
                            <div class="d-flex align-items-start">
                                <div>
                                    <b-form-checkbox v-model="checked" disabled></b-form-checkbox>
                                </div>
                                <div>
                                    <h3>Section 1 : Introduction</h3>
                                    <p>0/2 Video Compled</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="course-cont-tab">
                            <div class="d-flex align-items-start">
                                <div>
                                    <b-form-checkbox v-model="checked" disabled></b-form-checkbox>
                                </div>
                                <div>
                                    <h3>Section 1 : Roapmap</h3>
                                    <p>0/3 Video Compled</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="course-cont-tab">
                            <div class="d-flex align-items-start">
                                <div>
                                    <b-form-checkbox v-model="checked" disabled></b-form-checkbox>
                                </div>
                                <div>
                                    <h3>Section 1 : Introduction</h3>
                                    <p>0/2 Video Compled</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="course-cont-tab">
                            <div class="d-flex align-items-start">
                                <div>
                                    <b-form-checkbox v-model="checked" disabled></b-form-checkbox>
                                </div>
                                <div>
                                    <h3>Section 1 : Introduction</h3>
                                    <p>0/2 Video Compled</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
  import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
  import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
  import { BRow, BCol, BDropdown, BDropdownItem, BModal , BLink , BImg , BFormGroup , BFormRadio , BTabs , BTab , BFormCheckbox} from "bootstrap-vue";
  import axiosIns from "@/libs/axios";
  import router from "@/router";
  import { ref } from "@vue/composition-api";
  import EventBus from '@/event/EventBus'
  import VideoPlayer from "../lms/components/lessons/modal/VideoPlayer.vue";
  
  
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
      BFormGroup,
      BFormRadio,
      BTabs,
      BTab,
      BFormCheckbox
    },
    methods:{
      preview(url) {
        EventBus.$emit('playerSrc', url)
      },
    },
    data() {
      return {
        checked: true,
      }
    }
    
  };
  </script>
  
  <style lang="scss">
    @import "@/assets/scss/lms-style/agentlms.scss";
  </style>