<template>
<div class="bg-doted clr-white">

    <div class="bg-site-over"></div>
    <div id="cursor" class="cursor">
      <div class="video-hov">
        <video id="bd-video" autoplay muted loop>
          <source src="@/assets/videos/bg-vid.mp4" type="video/mp4">
        </video>
        <video id="bd-video-2" autoplay muted loop>
          <source src="@/assets/videos/any-wh (2).mp4" type="video/mp4">
        </video>
        <video id="bd-video-3" autoplay muted loop>
          <source src="@/assets/videos/any-wh (3).mp4" type="video/mp4">
        </video>
      </div>
    </div>
    <!--=========================== header ============================-->
    <headerHome />
    <!--=========================== header ============================-->
    <!--=========================== Hero Section ============================-->
    <HeroSection />
    <!--=========================== Hero Section ============================-->
    <!--=========================== Hero Section 1============================-->
    <section class="bg-grad-black rotate-bg"></section>
    <heroSection1 />
    <!--=========================== Hero Section 1============================-->
    <!--=========================== Hero Section 2============================-->
    <section class="bg-grad-black"></section>
    <heroSection2 />
    <section class="bg-grad-black rotate-bg"></section>
    <!--=========================== Hero Section 2============================-->
    <!--=========================== Hero Section 3============================-->
    <heroSection3 />
    <!--=========================== Hero Section 3============================-->
    <!--=========================== Hero Section 4============================-->
    <section class="bg-grad-black"></section>
    <heroSection4 />
    <section class="bg-grad-black rotate-bg"></section>
    <!--=========================== Hero Section 4============================-->
    <!--=========================== Hero Section 5============================-->
    <heroSection5 />
    <!--=========================== Hero Section 5============================-->
    <!--=========================== Hero Section 6============================-->
    <section class="bg-grad-black"></section>
    <heroSection6 />
    <section class="bg-grad-black rotate-bg"></section>
    <!--=========================== Hero Section 6============================-->
    <!--=========================== Hero Section 7============================-->
    <heroSection7 />
    <!--=========================== Hero Section 7============================-->
    <!--=========================== Hero Section 8============================-->
    <heroSection8 />
    <!--=========================== Hero Section 8============================-->
    <!--=========================== Hero Section 9============================-->
    <heroSection9 />
    <!--=========================== Hero Section 9============================-->
    <!--=========================== Hero Section 10============================-->
    <heroSection10 />
    <!--=========================== Hero Section 10============================-->
    <!--=========================== Others Section ============================-->
    <!--=========================== Footer ============================-->
    <footerHome />
    <!--=========================== Footer ============================-->
</div>
</template>


<script>
/* eslint-disable global-require */
import LayoutHorizontal from "@core/layouts/layout-horizontal/LayoutHorizontal.vue";
import AppCustomizer from "@core/layouts/components/app-customizer/AppCustomizer.vue";
import { $themeConfig } from "@themeConfig";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import store from "@/store/index";
import Header from "./Header";
import headerHome from "./homeComponents/headerHome.vue";
import heroSection from "./homeComponents/heroSection.vue";
import heroSection1 from "./homeComponents/heroSection1.vue";
import heroSection2 from "./homeComponents/heroSection2.vue";
import heroSection3 from "./homeComponents/heroSection3.vue";
import heroSection4 from "./homeComponents/heroSection4.vue";
import heroSection5 from "./homeComponents/heroSection5.vue";
import heroSection6 from "./homeComponents/heroSection6.vue";
import heroSection7 from "./homeComponents/heroSection7.vue";
import heroSection8 from "./homeComponents/heroSection8.vue";
import heroSection9 from "./homeComponents/heroSection9.vue";
import heroSection10 from "./homeComponents/heroSection10.vue";
import footerHome from "./homeComponents/footerHome.vue";
import HeroSection from "./homeComponents/heroSection.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BImg,
  BFormGroup,
  BFormInput,
  BForm,
  BModal,
  BEmbed,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavItem,
  BCarousel,
  BCarouselSlide,
} from "bootstrap-vue";
import {
  getHomeRouteForLoggedInUser,
  getUserData,
  isUserLoggedIn,
} from "@/auth/utils";
export default {
  components: {
    headerHome,
    heroSection,
    heroSection1,
    heroSection2,
    heroSection3,
    heroSection4,
    heroSection5,
    heroSection6,
    heroSection7,
    heroSection8,
    heroSection9,
    heroSection10,
    footerHome,
    VuexyLogo,
    BRow,
    BCol,
    BLink,
    BButton,
    BImg,
    BFormGroup,
    BFormInput,
    BForm,
    BModal,
    BEmbed,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavItem,
    BCarousel,
    BCarouselSlide,
    LayoutHorizontal,
    AppCustomizer,
    Header,
    HeroSection
},
  data() {
    return {
      downImg: require("@/assets/images/pages/error.svg"),
      isLogin: false,
      bgX: "",
      bgY: "",
      hooperSettings: {
        itemsToShow: 1,
        transition: 700,
        wheelControl: false,
      },
      currentSlid: 2,
      still: {
        left: '',
        top: '',
        right: '',
      }
    };
  },
  methods: {
    testSl(e) {
      //  const lastChild = document.getElementsByClassName('hooper-track')[0].lastChild
      console.log(e.currentSlide)
      this.currentSlid = e.currentSlid
    },
    hovering(e) {
      let moveX = (e.pageX * -1) / 15;
      let moveY = (e.pageY * -1) / 15;
      this.bgX = moveX;
      this.bgY = moveY;
    },
    hover_mou() {
      var hov_cur = document.getElementById("cursor");
      var hov_vid = document.getElementById("bd-video");

      hov_cur.style.transform = "scale(20)";
      hov_vid.style.display = "block";
    },
    hover_moul() {
      var hov_cur = document.getElementById("cursor");
      var hov_vid = document.getElementById("bd-video");

      hov_cur.style.transform = "scale(1)";
      hov_vid.style.display = "none";
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
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    let panelsSection = document.querySelector(".hero-section-2"),
	  panelsContainer = document.querySelector(".section-scroll"),
	  tween;

    let sections = gsap.utils.toArray(".panels-scroll");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".section-scroll",
        pin: true,
        scrub: 1,
        start: "top top",
        // snap: 1 / (sections.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        end:  () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
      }
    });
    
    document.addEventListener("mousemove", function (event) {
      const x = event.pageX - 10;
      const y = event.pageY - 10;
      const cursor = document.querySelector("#cursor");
      if (cursor) {
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
      }
    });

  }
};

</script>

<style lang="scss" scoped>
.customLogoWidth {
  width: 250px;
}
</style>
