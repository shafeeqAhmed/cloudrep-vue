<template>
  <div class="pb-1">
    <b-row class="align-items-center mb-4">
      <b-col md="12">
        <slot name="breadcrumb">
          <app-breadcrumb />
        </slot>
      </b-col>
    </b-row>

    <section class="card statistics-card mt-2 py-3 course-view">
      <b-row class="">
        <b-col md="6" class="course-view-about mt-1">
          <h1>All About NFTs</h1>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <ul class="ul-course-uni mt-2">
            <li>
              <span>4.5</span>
            </li>
            <li>
              <img src="@/assets/images/courses/Star.svg" alt="" />
              <img src="@/assets/images/courses/Star.svg" alt="" />
              <img src="@/assets/images/courses/Star.svg" alt="" />
              <img src="@/assets/images/courses/Star.svg" alt="" />
              <img src="@/assets/images/courses/Star.svg" alt="" />
            </li>
            <li>
              <span>2000 Ratings</span>
            </li>
            <li>
              <span>400,500 Student</span>
            </li>
          </ul>
          <p class="course-owner mt-2">
            Course created by
            <span class="text-primary">Biffco Enterprises Ltd.</span>
          </p>
          <p class="course-owner">
            <img
              src="@/assets/images/courses/cc.svg"
              alt=""
              class="pr-1"
            />English
          </p>
        </b-col>
        <b-col md="6" class="img-wrap">
          <img
            src="@/assets/images/courses/Play-vid.svg"
            v-b-modal.course-video
            class="play"
            alt=""
          />
          <img src="@/assets/images/courses/course4.jpg" alt="" />
        </b-col>

        <b-col md="12" class="mt-3">
          <b-row>
            <b-col md="6">
              <h1>Course Content</h1>
              <p>6 Sections - 43 Lectures - 9 hours 44 minutes total length</p>
            </b-col>
            <b-col md="6" class="btn-large">
              <button class="btn btn-primary btn-lg w-100">
                Buy Now For $19.23
              </button>
            </b-col>
          </b-row>

          <div class="collapse-course mt-2">
            <app-collapse class="mb-2">
              <app-collapse-item title="Introduction">
                <b-row>
                  <b-col md="12" class="">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/courses/play.svg" alt="" />
                        <div class="video-title">
                          <span>Video Number 1</span>
                          <feather-icon icon="ChevronDownIcon" size="16" />
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <router-link to="" class="preview">
                            Preview
                          </router-link>
                          <span>05:23</span>
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
                            <b-dropdown-item>
                              <span>Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <span>Delete Vidoe</span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="12" class="mb-1">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/courses/play.svg" alt="" />
                        <div class="video-title">
                          <span>Video Number 2</span>
                          <feather-icon icon="ChevronDownIcon" size="16" />
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <router-link to="" class="preview">
                            Preview
                          </router-link>
                          <span>05:23</span>
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
                            <b-dropdown-item>
                              <span>Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <span>Delete Vidoe</span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="12" class="">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <feather-icon icon="FileTextIcon" size="24" />
                        <div class="video-title">
                          <span>Video Number 2</span>
                        </div>
                      </div>
                      <div class="ml-auto video-preview vp-quiz">
                        <div class="d-flex align-items-center">
                          <span>Random Progress Questions</span>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </app-collapse-item>
            </app-collapse>

            <app-collapse class="mb-2">
              <app-collapse-item title="What To Expect From This Course">
                <b-row>
                  <b-col md="12" class="">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/courses/play.svg" alt="" />
                        <div class="video-title">
                          <span>Video Number 1</span>
                          <feather-icon icon="ChevronDownIcon" size="16" />
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <router-link to="" class="preview">
                            Preview
                          </router-link>
                          <span>05:23</span>
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
                            <b-dropdown-item>
                              <span>Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <span>Delete Vidoe</span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="12" class="">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/courses/play.svg" alt="" />
                        <div class="video-title">
                          <span>Video Number 2</span>
                          <feather-icon icon="ChevronDownIcon" size="16" />
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <router-link to="" class="preview">
                            Preview
                          </router-link>
                          <span>05:23</span>
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
                            <b-dropdown-item>
                              <span>Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <span>Delete Vidoe</span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </app-collapse-item>
            </app-collapse>

            <app-collapse>
              <app-collapse-item title="NFT Basic">
                <b-row>
                  <b-col md="12" class="">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/courses/play.svg" alt="" />
                        <div class="video-title">
                          <span>Video Number 1</span>
                          <feather-icon icon="ChevronDownIcon" size="16" />
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <router-link to="" class="preview">
                            Preview
                          </router-link>
                          <span>05:23</span>
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
                            <b-dropdown-item>
                              <span>Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <span>Delete Vidoe</span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="12" class="">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/courses/play.svg" alt="" />
                        <div class="video-title">
                          <span>Video Number 2</span>
                          <feather-icon icon="ChevronDownIcon" size="16" />
                        </div>
                      </div>
                      <div class="ml-auto video-preview">
                        <div class="d-flex align-items-center">
                          <router-link to="" class="preview">
                            Preview
                          </router-link>
                          <span>05:23</span>
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
                            <b-dropdown-item>
                              <span>Edit Video</span>
                            </b-dropdown-item>
                            <b-dropdown-item>
                              <span>Delete Vidoe</span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </app-collapse-item>
            </app-collapse>
          </div>
        </b-col>

        <b-col md="11" class="course-view-desc mt-3">
          <h1>Description</h1>
          <p class="font-weight-bold">
            Completely Updated for 2020 with 40 NEW lectures, course guides, and
            coding activities. Complete coverage of ES6!
          </p>

          <p>
            Do you ever browse the internet wondering how your favorite websites
            were built? Facebook, Twitter, Amazon—they were all created by
            people who at one point in time didn’t know anything about coding.
            How did they obtain this knowledge?
          </p>
          <p>
            In this comprehensive course, I’m going to show you everything you
            need to know so that you can follow in these people’s footsteps.
          </p>
          <p>
            You’re going to learn how to code AND you’re going to become a
            certified professional from a recognized international trainer. And
            best of all, you’re going to have fun doing it.
          </p>
          <p>You Don’t Have to Be a Genius or a Mathematical Wizard.</p>
          <p>
            So many people believe that you must have a special ‘gift’ to create
            professional-quality, dynamic websites/web apps. I’m here to tell
            you once and for all that this is false. All you need to have is the
            desire to learn and the ability to follow instructions—that’s it!
          </p>
          <p>
            Our course starts teaching basic coding principles and develops your
            coding skills in a variety of languages from beginner through to
            advanced. Here it is, once and for all, a complete guide that will
            take you from novice to web developer.
          </p>
          <p>
            Skip Hours of Frustration and Thousands of Wasted Dollars and Become
            100% Certified.
          </p>
          <p>
            The internet has changed the rules of doing business. More and more
            companies are migrating online while many new, never before seen
            businesses are created every day thanks to the power of this
            phenomenon. You know what that means? Higher demand for people just
            like you!
          </p>
          <p>
            But the problem for these businesses is that while demand is high,
            supply is short.
          </p>
          <p>
            Learn What It Takes to Code Dynamic, Professional Websites and Web
            Apps From The Comfort of Your Own Home. Please don’t let a lack of
            knowledge stop you from having the career of your dreams, not when
            the knowledge you need is right here and is extremely affordable.
          </p>
          <p>
            Don’t worry, you won’t need to buy any additional courses, it’s all
            here. No need to spend four years and over $15,000 per year in
            college tuition either—it really is all here. From HTML to CSS then
            to Javascript and finally PHP, you will learn how to Become a
            Certified Web Developer.
          </p>
          <p>It Doesn’t Matter Where You’re Starting From...You Can Do It!</p>
        </b-col>

        <b-col class="mt-3" md="9">
          <h1>Feedback</h1>
          <div class="d-flex mt-2 mb-2">
            <div>
              <img src="@/assets/images/courses/avatar.svg" alt="" />
            </div>
            <div class="feedback-content">
              <p class="name">Martin Geidt</p>
              <ul>
                <li>4.5</li>
                <li>
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                </li>
                <li>2 months ago</li>
              </ul>
              <p>
                The practical side is awesome! Since I'm a beginner I want to
                now what it stands for, for example. But I enjoy it so for!
              </p>
            </div>
          </div>
          <div class="d-flex mt-2 mb-2">
            <div>
              <img src="@/assets/images/courses/avatar.svg" alt="" />
            </div>
            <div class="feedback-content">
              <p class="name">Martin Geidt</p>
              <ul>
                <li>4.5</li>
                <li>
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                </li>
                <li>2 months ago</li>
              </ul>
              <p>
                The practical side is awesome! Since I'm a beginner I want to
                now what it stands for, for example. But I enjoy it so for!
              </p>
            </div>
          </div>
          <div class="d-flex mt-2 mb-2">
            <div>
              <img src="@/assets/images/courses/avatar.svg" alt="" />
            </div>
            <div class="feedback-content">
              <p class="name">Martin Geidt</p>
              <ul>
                <li>4.5</li>
                <li>
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                  <img src="@/assets/images/courses/Star.svg" alt="" />
                </li>
                <li>2 months ago</li>
              </ul>
              <p>
                The practical side is awesome! Since I'm a beginner I want to
                now what it stands for, for example. But I enjoy it so for!
              </p>
            </div>
          </div>
        </b-col>
        <b-col md="12" class="mt-3 text-center">
          <button class="btn btn-custom">See More Reviews</button>
        </b-col>
      </b-row>
    </section>

    <!-- video popup -->
    <b-modal
      id="course-video"
      centered
      title="Course Preview"
      ok-title=""
      cancel-title=""
      modal-class="modal-video-cr"
    >
      <b-row>
        <b-col md="12">
          <!-- <vue3-video-player
            :src="source"
            :view-core="viewCore.bind(null, 'video1')"
          >
          </vue3-video-player> -->
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { BRow, BCol, BDropdown, BDropdownItem, BModal } from "bootstrap-vue";
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
  },
  setup() {
    const source = 'https://static.smartisanos.cn/common/video/production/delta/jianguopro3-coming-for-u.mp4';

    return{
      source
    }
  },
  methods:{
    viewCore(id, player) {
      console.log(id, player);
      this.players[id] = player;
    },
  }
};
</script>
