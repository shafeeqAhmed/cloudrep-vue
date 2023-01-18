<template>
  <div class="bg-111111 clr-white ff-inter">
    <header>

      <div class="container d-flex justify-content-center">
        <div class="row landingNavRow">
          <div class="col-12">
            <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="#">
                <img class="cursor-pointer mainLogo" src="@/assets/images/common/logo.svg" /></a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
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
                <div class="d-flex justify-content-end" v-if="isLogin">
                  <b-link class="nav-link clr-white" @click="dashboard">
                    dashboard
                  </b-link>
                </div>
                <div class="d-flex justify-content-end" v-else>
                  <b-button @click="login" variant="bordered br-10 me-12" name="Primary">
                    Sign in</b-button>
                  <b-button @click="register" variant="gradient-primary br-10" name="Primary">
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
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <h1 class="clr-white fs-85 resizeFont ff-inter fw-900">
              <!-- Future of Work <br />With CloudRep -->
              Introducing <span class="clr-white fs-85 resizeFont ff-inter fw-900 mt-4 mb-0 pb-0"
                style="color:#0099FF">CloudRep AI</span> <br /> The World's First Web3 Gig Economy
            </h1>
            <p class="clr-white fs-16 mt-15 mb-15 heroDescription">

              Live your life, love your work, and earn from anywhere in the world
            </p>
            <b-button variant="gradient-primary" name="Primary" @click="register()">
              Pre Register for Beta
            </b-button>
          </div>
        </div>
      </div>
    </section>
    <!-- Video Section -->
    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <iframe class="videoPlayer mt-165 mb-165" height="auto" src="https://www.youtube.com/embed/L4CIQGnemmA"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </section>
    <!-- Why Cloud Rep -->
    <!-- <section>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="fs-70 clr-white fw-700 mb-40 ff-inter">Why Cloud Rep</h2>
          </div>
          <div class="col-md-6">
            <p class="clr-white fw-300 fs-24">
              The Basics Framework is a new desktop application filled with
              powerful features for your work.
            </p>
            <p class="clr-white fs-18 fw-400 mt-20 mb-30">
              Dash is smart enough to figure out when you've forgotten to
              respond to or act on a message from one of your most important
              contacts. Dash is your new last line of defense.
            </p>
            <hr class="light" />
            <div class="row">
              <div class="col-md-4">
                <div class="d-flex mt-2">
                  <span class="mr-2">
                    <img class="cursor-pointer" src="@/assets/images/common/icon1.svg" /></span>
                  <span class="mr-2"><img class="cursor-pointer" src="@/assets/images/common/icon2.svg" /></span>
                  <span class="mr-2"><img class="cursor-pointer" src="@/assets/images/common/icon3.svg" /></span>
                </div>
              </div>
              <div class="col-md-8 mt-2">
                This product contains components and complex blocks which can
                easily be integrated into almost any design.
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <img class="cursor-pointer" src="@/assets/images/common/dashboard.png" />
          </div>
        </div>
      </div>
    </section> -->
    <!-- Our Features -->
    <!-- <section>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="fs-70 clr-white fw-700 mb-40 ff-inter mt-165">
              Our Features
            </h2>
          </div>
          <div class="col-md-4 offset-md-4 text-center">
            <p class="clr-white">
              A better way to work for designers and developers for creating new
              wonderfull resources.
            </p>
          </div>
        </div>
        <div class="row mt-60">
          <div class="col-md-4">
            <div class="text-center mb-40">
              <img class="mb-20" src="@/assets/images/common/circle.svg" />
              <h3 class="clr-white fw-700 fs-26">Save Your Time</h3>
              <div class="row">
                <div class="col-md-8 offset-md-2">
                  <p class="clr-white fs-18 fw-200">
                    Basics contains components and blocks which can easily be
                    integrated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="text-center mb-40">
              <img class="mb-20" src="@/assets/images/common/circle.svg" />
              <h3 class="clr-white fw-700 fs-26">Save Your Time</h3>
              <div class="row">
                <div class="col-md-8 offset-md-2">
                  <p class="clr-white fs-18 fw-200">
                    Basics contains components and blocks which can easily be
                    integrated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="text-center mb-40">
              <img class="mb-20" src="@/assets/images/common/circle.svg" />
              <h3 class="clr-white fw-700 fs-26">Save Your Time</h3>
              <div class="row">
                <div class="col-md-8 offset-md-2">
                  <p class="clr-white fs-18 fw-200">
                    Basics contains components and blocks which can easily be
                    integrated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="text-center mb-40">
              <img class="mb-20" src="@/assets/images/common/circle.svg" />
              <h3 class="clr-white fw-700 fs-26">Save Your Time</h3>
              <div class="row">
                <div class="col-md-8 offset-md-2">
                  <p class="clr-white fs-18 fw-200">
                    Basics contains components and blocks which can easily be
                    integrated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="text-center mb-40">
              <img class="mb-20" src="@/assets/images/common/circle.svg" />
              <h3 class="clr-white fw-700 fs-26">Save Your Time</h3>
              <div class="row">
                <div class="col-md-8 offset-md-2">
                  <p class="clr-white fs-18 fw-200">
                    Basics contains components and blocks which can easily be
                    integrated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="text-center mb-40">
              <img class="mb-20" src="@/assets/images/common/circle.svg" />
              <h3 class="clr-white fw-700 fs-26">Save Your Time</h3>
              <div class="row">
                <div class="col-md-8 offset-md-2">
                  <p class="clr-white fs-18 fw-200">
                    Basics contains components and blocks which can easily be
                    integrated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- Choose Plan -->
    <!-- <section>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="fs-70 clr-white fw-700 mb-40 ff-inter mt-165">Choose Plan</h2>
          </div>
          <div class="col-md-6 offset-md-3 text-center">
            <p>
              Semplice is the first fully responsive case study portfolio system
              based on WordPress. Built by designers, for designers.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="price-card border border-primary text-center">
              <h4>Freelance</h4>
              <div>
                <span>$9</span>
                <span>/mo</span>
              </div>
              <p>Up to 30 Users Unlimited Queries Full Statistic</p>
              <b-button variant="relief-primary">Primary</b-button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="price-card border border-primary text-center">
              <h4>Freelance</h4>
              <div>
                <span>$9</span>
                <span>/mo</span>
              </div>
              <p>Up to 30 Users Unlimited Queries Full Statistic</p>
              <b-button variant="relief-primary">Primary</b-button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="price-card border border-primary text-center">
              <h4>Freelance</h4>
              <div>
                <span>$9</span>
                <span>/mo</span>
              </div>
              <p>Up to 30 Users Unlimited Queries Full Statistic</p>
              <b-button variant="relief-primary">Primary</b-button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <p>
              <strong>Limited Offer:</strong> All plans are
              <strong>FREE</strong> for 14 days!
            </p>
          </div>
        </div>
      </div>
    </section> -->
    <!-- FAQ -->
    <!-- <section>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2>FAQ</h2>
          </div>
          <div class="col-md-6 text-center offset-md-3">
            <p>
              The Basics is the first fully responsive case study portfolio
              system based on WordPress. Built by designers, for designers.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="faqq d-flex">
              <div class="mr-2">icon</div>
              <div>
                <h5>What do you mean by item & end product?</h5>
                <p>
                  Basics contains components and complex blocks which can easily
                  be integrated into almost any design.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="faqq d-flex">
              <div class="mr-2">icon</div>
              <div>
                <h5>What do you mean by item & end product?</h5>
                <p>
                  Basics contains components and complex blocks which can easily
                  be integrated into almost any design.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="faqq d-flex">
              <div class="mr-2">icon</div>
              <div>
                <h5>What do you mean by item & end product?</h5>
                <p>
                  Basics contains components and complex blocks which can easily
                  be integrated into almost any design.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="faqq d-flex">
              <div class="mr-2">icon</div>
              <div>
                <h5>What do you mean by item & end product?</h5>
                <p>
                  Basics contains components and complex blocks which can easily
                  be integrated into almost any design.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="faqq d-flex">
              <div class="mr-2">icon</div>
              <div>
                <h5>What do you mean by item & end product?</h5>
                <p>
                  Basics contains components and complex blocks which can easily
                  be integrated into almost any design.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="faqq d-flex">
              <div class="mr-2">icon</div>
              <div>
                <h5>What do you mean by item & end product?</h5>
                <p>
                  Basics contains components and complex blocks which can easily
                  be integrated into almost any design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- Subscribe -->
    <!-- <section>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2>Subscribe</h2>
          </div>
          <div class="col-md-6 offset-md-3 text-center">
            <p>
              Semplice is the first fully responsive case study portfolio system
              based on WordPress. Built by designers, for designers.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <b-form>
              <div class="d-flex justify-content-center">
                <b-form-group>
                  <b-form-input placeholder="First Name" />
                </b-form-group>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                  class="mr-1"
                >
                  Submit
                </b-button>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </section> -->

    <footer>
      <hr style="background: white" />
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="
                navbar navbar-expand-lg
                text-center
                d-block
                mb-2
                text-center
                mt-2
                footerText
              ">
              © CloudRep {{ new Date().getFullYear() }}. All Rights Reserved.
            </nav>
          </div>
        </div>
      </div>
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
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require("@/assets/images/pages/error-dark.svg");
        return this.downImg;
      }
      return this.downImg;
    },
  },
  created() {
    this.isLogin = isUserLoggedIn();
    // if (isLoggedIn) {
    //   const userData = getUserData();
    //   this.$router.replace(getHomeRouteForLoggedInUser(userData.role));
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/pages/page-misc.scss";

.footerText {
  font-size: 18px;
}

.heroDescription {
  line-height: 30px;
  font-size: 18px;
  margin-bottom: 20px;
}

.landingNavRow {
  margin-top: 10px;
  margin-bottom: 10px;
}

@media (min-width: 320px) and (max-width: 419px) {
  .resizeFont {
    font-size: 40px !important;
  }

  .hero {
    padding-top: 100px;
    padding-bottom: 115px;
  }

  .mb-165 {
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .footerText {
    font-size: 12px;
  }

  .videoPlayer {
    min-height: 200px !important;
  }

  .navbar {
    flex-wrap: unset;
  }

  .mainLogo {
    width: 200px;
  }
}

@media (min-width: 420px) and (max-width: 519px) {
  .resizeFont {
    font-size: 40px !important;
  }

  // .hero {
  //   padding-top: 50px;
  //   padding-bottom: 65px;
  // }
}

@media (min-width: 520px) and (max-width: 719px) {
  .resizeFont {
    font-size: 50px !important;
  }

  .hero {
    padding-top: 250px;
    padding-bottom: 265px;
  }

  // .videoPlayer {
  //   min-height: 400px !important;
  // }
  .mb-165 {
    margin-top: 130px;
    margin-bottom: 130px;
  }

  .videoPlayer {
    min-height: 400px !important;
  }
}

@media (min-width: 720px) and (max-width: 991px) {
  .resizeFont {
    font-size: 50px !important;
  }

  .hero {
    padding-top: 200px;
    padding-bottom: 175px;
  }

  .videoPlayer {
    min-height: 600px !important;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .resizeFont {
    font-size: 60px !important;
  }

  .hero {
    padding-top: 300px;
    padding-bottom: 215px;
  }
}

@media (min-width: 1200px) and (max-width: 1399.98px) {
  .resizeFont {
    font-size: 70px !important;
  }
}

@media (min-width: 1400px) {
  .hero {
    padding-top: 150px;
    padding-bottom: 165px;
  }
}
</style>
