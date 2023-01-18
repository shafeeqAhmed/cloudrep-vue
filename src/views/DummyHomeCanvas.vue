<template>
    <div class="bg-1111 bg-doted clr-white ff-inter">
        <header class="sticky-header">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <nav class="navbar navbar-expand-lg d-flex justify-content-center">
                            <a class="navbar-brand" href="#">
                                <img class="cursor-pointer mainLogo customLogoWidth"
                                    src="@/assets/images/common/new_logo2.svg" /></a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon clr-white"></span>
                            </button>

                            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link clr-white" href="#">Buy / Sell </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link clr-white" href="#">Grow</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link clr-white" href="#">Markets</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link clr-white" href="#">Business</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link clr-white" href="#">Support</a>
                                    </li>
                                </ul>
                            </div>

                            <div class="float-right">
                                <div class="d-flex justify-content-end" v-if="isLogin" @click="dashboard">
                                    <b-link class="clr-white btn btn-primary">Dashboard</b-link>
                                </div>
                                <div class="d-flex justify-content-end" v-else>
                                    <b-button @click="login()" variant="bordered br-10 me-12" name="Primary">
                                        Sign in</b-button>
                                    <b-button @click="register()" variant="gradient-primary br-10" name="Primary">
                                        Sign up
                                    </b-button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="hero">
            <div>
                <canvas-three></canvas-three>
            </div>
        </section>
        <div class="doted-bg">
            <section class="mt-120 container">
                <div class="row">
                    <div class="col-md-10 offset-md-2">
                        <span class="clr-white next-bar">Popular teams who use Omega for appoinments</span>
                    </div>
                </div>
                <div class="container overflow-hidden">
                    <div class="row">
                        <div class="col-md-10 offset-md-2">
                            <div>
                                <ul class="logo-list-f mt-40">
                                    <li>
                                        <img class="mr-80" src="@/assets/images/common/flogo1.svg" />
                                    </li>
                                    <li>
                                        <img class="mr-80" src="@/assets/images/common/flogo2.svg" />
                                    </li>
                                    <li>
                                        <img class="mr-80" src="@/assets/images/common/flogo3.svg" />
                                    </li>
                                    <li>
                                        <img class="mr-80" src="@/assets/images/common/flogo4.svg" />
                                    </li>
                                    <li>
                                        <img class="mr-80" src="@/assets/images/common/flogo5.svg" />
                                    </li>
                                    <li>
                                        <img class="mr-80" src="@/assets/images/common/flogo6.svg" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="row mt-180">
                        <div class="col-md-6">
                            <h2 class="clr-white fs-64 fw-700 mt-180">
                                Wear Headset
                                <img src="@/assets/images/common/wear1.png" style="margin-top: -40px" />
                                and take a deep dive into the Future With
                                <img src="@/assets/images/common/wear2.png" style="margin-top: -25px" />
                                CloudRep.
                            </h2>
                            <div class="row">
                                <p class="fs-21 fw-450 lh-40 mt-40 col-8">
                                    These companies release their own versions of the operating
                                    systems with minor changes, and yet always with the same
                                    bottom line.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <img src="@/assets/images/common/wear3.png" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="row mt-190">
                        <div class="col-md-4">
                            <h2 class="clr-white fs-60">Why CloudRep?</h2>
                        </div>
                        <div class="col-md-5 offset-md-1">
                            <p class="fs-21 lh-40">
                                These companies release their own versions of the operating
                                systems with minor changes, and yet always with the same bottom
                                line.
                            </p>
                        </div>
                    </div>
                    <div class="row mt-100">
                        <div class="col-md-4">
                            <div class="d-flex">
                                <div class="mr-26">
                                    <img src="@/assets/images/common/whyicon1.svg" />
                                </div>
                                <div class="pr-100">
                                    <h4 class="fs-24 lh-30 fw-700 clr-white">
                                        Work from anywhere?
                                    </h4>
                                    <p class="clr-white-05">
                                        Many of us are able to work from home, a café, or a park
                                        whenever we want. Yay freedom!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex">
                                <div class="mr-26">
                                    <img src="@/assets/images/common/whyicon2.svg" />
                                </div>
                                <div class="pr-100">
                                    <h4 class="fs-24 lh-30 fw-700 clr-white">
                                        Work from anywhere?
                                    </h4>
                                    <p class="clr-white-05">
                                        Many of us are able to work from home, a café, or a park
                                        whenever we want. Yay freedom!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex">
                                <div class="mr-26">
                                    <img src="@/assets/images/common/whyicon3.svg" />
                                </div>
                                <div class="pr-100">
                                    <h4 class="fs-24 lh-30 fw-700 clr-white">
                                        Work from anywhere?
                                    </h4>
                                    <p class="clr-white-05">
                                        Many of us are able to work from home, a café, or a park
                                        whenever we want. Yay freedom!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-60">
                        <div class="col-md-4">
                            <div class="d-flex">
                                <div class="mr-26">
                                    <img src="@/assets/images/common/whyicon4.svg" />
                                </div>
                                <div class="pr-100">
                                    <h4 class="fs-24 lh-30 fw-700 clr-white">
                                        Work from anywhere?
                                    </h4>
                                    <p class="clr-white-05">
                                        Many of us are able to work from home, a café, or a park
                                        whenever we want. Yay freedom!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex">
                                <div class="mr-26">
                                    <img src="@/assets/images/common/whyicon5.svg" />
                                </div>
                                <div class="pr-100">
                                    <h4 class="fs-24 lh-30 fw-700 clr-white">
                                        Work from anywhere?
                                    </h4>
                                    <p class="clr-white-05">
                                        Many of us are able to work from home, a café, or a park
                                        whenever we want. Yay freedom!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex">
                                <div class="mr-26">
                                    <img src="@/assets/images/common/whyicon6.svg" />
                                </div>
                                <div class="pr-100">
                                    <h4 class="fs-24 lh-30 fw-700 clr-white">
                                        Work from anywhere?
                                    </h4>
                                    <p class="clr-white-05">
                                        Many of us are able to work from home, a café, or a park
                                        whenever we want. Yay freedom!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container mt-180">
                    <div class="row">
                        <div class="col-md-6">
                            <h2 class="fs-64 clr-white">
                                ClourdRep Metaworks is a highly advanced
                            </h2>
                            <p class="fw-450 lh-25 mt-40">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elit
                                pellentesque lacus tellus sollicitudin tincidunt consectetur.
                                Porttitor nunc diam facilisis commodo. Scelerisque massa
                                consequat semper ac ullamcorper fermentum, tortor ultrices. Erat
                                proin enim, et ut risus, odio convallis phasellus amet.
                            </p>
                            <p class="fw-450 lh-25 mt-20">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elit
                                pellentesque lacus tellus sollicitudin tincidunt consectetur.
                                Porttitor nunc diam facilisis commodo. Scelerisque massa
                                consequat semper ac ullamcorper fermentum, tortor ultrices. Erat
                                proin enim, et ut risus, odio convallis phasellus amet.
                            </p>
                        </div>
                        <div class="col-md-6"></div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="row mt-180">
                        <div class="col-md-6">
                            <h2 class="clr-white fw-700 fs-64 lh-77 next-bar-gradient">
                                Work Anywhere <br />
                                Anyplace<br />
                                Anytime
                            </h2>
                            <div class="row">
                                <p class="fs-24 lh-43 fw-450 col-9 mt-51">
                                    A People First, Impact Driven, Learn and Earn on-demand
                                    employment provider with a net zero carbon initiative for
                                    flexible remote work oppotunities for over 100 million +
                                    unemployed workforce around the global in the post pandemic
                                    Economy
                                </p>
                            </div>

                            <a href="#" class="btn btn-primary ml-80 mt-30 fs-16">Get Started</a>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex">
                                <div class="glass-card text-center">
                                    <img src="@/assets/images/common/wear2.png" />
                                    <h5 class="clr-white fs-16 mt-26">Loorem Ipsum</h5>
                                    <p class="fs-13 fw-400 mt-15">
                                        Students will no longer just hear and see, they will also
                                        participate and have practical experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="row mt-220">
                        <div class="col-12 text-center">
                            <h2 class="clr-white fs-64 fw-700 lh-77">
                                Live Your Life <br />
                                Love your
                                <img src="@/assets/images/common/wear2.png" style="margin-top: -25px" />
                                Work
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="row mt-215">
                        <div class="col-md-6">
                            <img />
                        </div>
                        <div class="col-md-6">
                            <h2 class="clr-white fw-700 fs-64 lh-77">
                                Making Students Creative
                                <img src="@/assets/images/common/wear1.png" /> Future
                            </h2>
                            <p class="fs-16 fw-450 lh-34 mt-30">
                                Give your child an easy way to understand science.fotonVR
                                increases interest, adds fun, has international level content,
                                helps to understand the hard concept and that's why each parent
                                order fotonVR kit for their child.
                            </p>
                            <ul>
                                <li>
                                    <p>Critical Solutions</p>
                                </li>
                                <li>
                                    <p>Critical Solutions</p>
                                </li>
                                <li>
                                    <p>Critical Solutions</p>
                                </li>
                                <li>
                                    <p>Critical Solutions</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pb-200">
                <div class="container">
                    <div class="row mt-200">
                        <div class="col-12 text-center">
                            <h2 class="fw-900 clr-white fs-112">
                                The Next Generation Fexible Remote Work Enviroment
                            </h2>
                            <p class="fw-500 fs-40">The Future is now</p>
                        </div>
                    </div>
                </div>
            </section>
            <!-- <section>
        <div class="container">
          <div class="row mt-230 contact-section">
            <div class="col-md-6">
              <h2 class="clr-white fs-60 fw-600">
                Get Experience Virtual Tours for Science
              </h2>
              <p>
                With VR, they aren't limited to word descriptions or book
                illustrations; they can explore the topic and see how things are
                put together.
              </p>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="d-flex">
                <ul>
                  <li>
                    <img />
                  </li>
                  <li>
                    <img />
                  </li>
                  <li>
                    <img />
                  </li>
                  <li>
                    <img />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2>Frequently Asked Question</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h5>What's gonna be your question?</h5>
              <p>
                Create custom landing pages with Omega that converts more
                visitors than any website. With lots of unique blocks, you can
                easily build a page without any design or custom coding. with
                Omega that converts more visitors than any website.
              </p>
            </div>
            <div class="col-md-6">
              <h5>What's gonna be your question?</h5>
              <p>
                Create custom landing pages with Omega that converts more
                visitors than any website. With lots of unique blocks, you can
                easily build a page without any design or custom coding. with
                Omega that converts more visitors than any website.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h5>What's gonna be your question?</h5>
              <p>
                Create custom landing pages with Omega that converts more
                visitors than any website. With lots of unique blocks, you can
                easily build a page without any design or custom coding. with
                Omega that converts more visitors than any website.
              </p>
            </div>
            <div class="col-md-6">
              <h5>What's gonna be your question?</h5>
              <p>
                Create custom landing pages with Omega that converts more
                visitors than any website. With lots of unique blocks, you can
                easily build a page without any design or custom coding. with
                Omega that converts more visitors than any website.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h5>What's gonna be your question?</h5>
              <p>
                Create custom landing pages with Omega that converts more
                visitors than any website. With lots of unique blocks, you can
                easily build a page without any design or custom coding. with
                Omega that converts more visitors than any website.
              </p>
            </div>
            <div class="col-md-6">
              <h5>What's gonna be your question?</h5>
              <p>
                Create custom landing pages with Omega that converts more
                visitors than any website. With lots of unique blocks, you can
                easily build a page without any design or custom coding. with
                Omega that converts more visitors than any website.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <p>Didn’t find your answer? <a href="#"> Contact us here</a></p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="d-flex">
                <h2>Subscribe for Our Updates</h2>
                <div>
                  <form>
                    <input type="email" />
                    <input type="submit" value="Pre Register" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
        </div>
        <footer class="front-footer">
            <section class="bg-202020">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-style-none">
                                <li>
                                    <img class="logo" src="@/assets/images/common/short-logo.svg" />
                                </li>
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                                <li>
                                    <a href="#">Services</a>
                                </li>
                                <li>
                                    <a href="#">Potfolio</a>
                                </li>
                                <li>
                                    <a href="#">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="social">
                                <li>
                                    <a href="#"><img src="@/assets/images/common/fb.svg" /></a>
                                </li>
                                <li>
                                    <a href="#"><img src="@/assets/images/common/tw.svg" /></a>
                                </li>
                                <li>
                                    <a href="#"><img src="@/assets/images/common/in.svg" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section class="bg-black">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            &copy; {{ new Date().getFullYear() }} The Basic Framework. All
                            right reserved.
                        </div>
                        <div class="col-md-6 text-right">
                            <div>
                                <a href="#" class="clr-white fs-13 fw-300">Terms and conditions
                                </a>
                                /
                                <a href="#" class="clr-white fs-13 fw-300"> Privacy policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    </div>
</template>


<script>
/* eslint-disable global-require */
import LayoutHorizontal from "@core/layouts/layout-horizontal/LayoutHorizontal.vue";
import AppCustomizer from "@core/layouts/components/app-customizer/AppCustomizer.vue";
import { $themeConfig } from "@themeConfig";


import {
    BLink,
    BButton,
    BImg,
    BFormGroup,
    BFormInput,
    BForm,
} from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import store from "@/store/index";
import {
    getHomeRouteForLoggedInUser,
    getUserData,
    isUserLoggedIn,
} from "@/auth/utils";

import Header from "./Header";

export default {
    components: {
        VuexyLogo,
        BLink,
        BButton,
        BImg,
        BFormGroup,
        BFormInput,
        BForm,
        LayoutHorizontal,
        AppCustomizer,
        Header,
    },
    data() {
        return {
            downImg: require("@/assets/images/pages/error.svg"),
            isLogin: false,
            bgX: "",
            bgY: "",
        };
    },
    methods: {
        login() {
            this.$router.push({ name: "auth-login" });
        },
        register() {
            this.$router.push({ name: "auth-account-type" });
        },
        dashboard() {
            if (this.isLogin) {
                const userData = getUserData();
                this.$router.replace(getHomeRouteForLoggedInUser(userData.role));
            }
        },
        hovering(e) {
            let moveX = (e.pageX * -1) / 15;
            let moveY = (e.pageY * -1) / 15;
            this.bgX = moveX;
            this.bgY = moveY;
        },
    },
    computed: {
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                this.downImg = require("@/assets/images/pages/error-dark.svg");
                return this.downImg;
            }
            return this.downImg;
        },
    },
    created() {
        this.isLogin = isUserLoggedIn();
    },
};
</script>

//
<style lang="scss" scoped>
.customLogoWidth {
    width: 250px;
}
</style>
