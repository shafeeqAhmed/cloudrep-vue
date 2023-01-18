<template>
  <!--=========================== Header ============================-->
  <header id="header" class="header">
    <div class="container">
      <div class="site-header">
        <div class="site-branding">
          <a class="" href="#">
            <img class="site-logo" src="@/assets/images/common/logo.png" />
          </a>
        </div>
        <div class="site-menu">
          <ul class="navigation">
            <li>
              <b-link>About us</b-link>
            </li>
            <li>
              <b-link>Our Services</b-link>
            </li>
            <li>
              <b-link>Contact us</b-link>
            </li>
            <li>
              <b-link>Call Screen</b-link>
            </li>
          </ul>
          <div class="toggle-btn">
            <svg class="close-menu" id="close-menu" @click="close_menu()" width="40" height="40" viewBox="0 0 40 40"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29 11L11 29M11 11L29 29" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
            <img class="open-menu" id="open-menu" @click="open_menu()" src="@/assets/images/website/bar.png" />
          </div>
        </div>
        <div class="header-right float-right">
            <div class="d-flex justify-content-end log-btns" v-if="isLogin" @click="dashboard">
              <b-link class="clr-white btn btn-primary">Dashboard</b-link>
            </div>
            <div class="d-flex justify-content-end log-btns" v-else>
              <svg @click="login()" width="40" height="40" viewBox="0 0 40 40" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 23.8C22.8995 23.8 25.25 21.3823 25.25 18.4C25.25 15.4177 22.8995 13 20 13C17.1005 13 14.75 15.4177 14.75 18.4C14.75 21.3823 17.1005 23.8 20 23.8ZM20 23.8C13 23.8 12.9385 27.4146 12.9385 31.391M20 23.8C27 23.9565 27.0615 27.4146 27.0615 31.391M27.0615 31.391C25.5913 32 23.7275 32 20 32C16.2725 32 14.4087 32 12.9385 31.391M27.0615 31.391C29.0217 30.5791 30.5791 29.0217 31.391 27.0615C32 25.5913 32 23.7275 32 20C32 16.2725 32 14.4087 31.391 12.9385C30.5791 10.9783 29.0217 9.42092 27.0615 8.60896C25.5913 8 23.7275 8 20 8C16.2725 8 14.4087 8 12.9385 8.60896C10.9783 9.42092 9.42092 10.9783 8.60896 12.9385C8 14.4087 8 16.2725 8 20C8 23.7275 8 25.5913 8.60896 27.0615C9.42092 29.0217 10.9783 30.5791 12.9385 31.391"
                  stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
              <b-button @click="register()" variant="gradient-primary br-10" name="Primary">
                Sign up
              </b-button>
            </div>
        </div>
      </div>
    </div>
    <div id="mobile_nav" class="mobile_nav">
      <div class="menu-logo">
        <a class="" href="#">
          <img class="cursor-pointer mainLogo customLogoWidth" src="@/assets/images/common/new_logo2.svg" />
        </a>
      </div>
      <ul class="navigation">
        <li>
          <b-link>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 30.5C17.2152 30.5 14.5445 29.3938 12.5754 27.4246C10.6062 25.4555 9.5 22.7848 9.5 20C9.5 17.2152 10.6062 14.5445 12.5754 12.5754C14.5445 10.6062 17.2152 9.5 20 9.5C22.7848 9.5 25.4555 10.6062 27.4246 12.5754C29.3938 14.5445 30.5 17.2152 30.5 20C30.5 22.7848 29.3938 25.4555 27.4246 27.4246C25.4555 29.3938 22.7848 30.5 20 30.5ZM20 32C23.1826 32 26.2348 30.7357 28.4853 28.4853C30.7357 26.2348 32 23.1826 32 20C32 16.8174 30.7357 13.7652 28.4853 11.5147C26.2348 9.26428 23.1826 8 20 8C16.8174 8 13.7652 9.26428 11.5147 11.5147C9.26428 13.7652 8 16.8174 8 20C8 23.1826 9.26428 26.2348 11.5147 28.4853C13.7652 30.7357 16.8174 32 20 32V32Z"
                fill="white" />
              <path
                d="M21.3949 17.882L17.9599 18.3125L17.8369 18.8825L18.5119 19.007C18.9529 19.112 19.0399 19.271 18.9439 19.7105L17.8369 24.9125C17.5459 26.258 17.9944 26.891 19.0489 26.891C19.8664 26.891 20.8159 26.513 21.2464 25.994L21.3784 25.37C21.0784 25.634 20.6404 25.739 20.3494 25.739C19.9369 25.739 19.7869 25.4495 19.8934 24.9395L21.3949 17.882ZM21.4999 14.75C21.4999 15.1478 21.3419 15.5294 21.0606 15.8107C20.7793 16.092 20.3978 16.25 19.9999 16.25C19.6021 16.25 19.2206 16.092 18.9393 15.8107C18.658 15.5294 18.4999 15.1478 18.4999 14.75C18.4999 14.3522 18.658 13.9706 18.9393 13.6893C19.2206 13.408 19.6021 13.25 19.9999 13.25C20.3978 13.25 20.7793 13.408 21.0606 13.6893C21.3419 13.9706 21.4999 14.3522 21.4999 14.75Z"
                fill="white" />
            </svg>
            About us
          </b-link>
        </li>
        <li>
          <b-link>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 15H32M12 20H28M15 25H25" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
            Our Services
          </b-link>
        </li>
        <li>
          <b-link>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.5 14L16.6718 16.7812C18.285 17.8567 19.0917 18.3944 20 18.3944C20.9083 18.3944 21.715 17.8567 23.3282 16.7812L27.5 14M17.6 31H23.4C26.7603 31 28.4405 31 29.7239 30.346C30.8529 29.7708 31.7708 28.8529 32.346 27.7239C33 26.4405 33 24.7603 33 21.4V18.6C33 15.2397 33 13.5595 32.346 12.2761C31.7708 11.1471 30.8529 10.2292 29.7239 9.65396C28.4405 9 26.7603 9 23.4 9H17.6C14.2397 9 11.5595 9 10.2761 9.65396C9.14708 10.2292 8.2292 11.1471 7.65396 12.2761C7 13.5595 7 15.2397 7 18.6V21.4C7 24.7603 7 26.4405 7.65396 27.7239C8.2292 28.8529 9.14708 29.7708 10.2761 30.346C11.5595 31 14.2397 31 17.6 31Z"
                stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
            Contact us
          </b-link>
        </li>
        <li>
          <b-link  @click="callScreen">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.5 14L16.6718 16.7812C18.285 17.8567 19.0917 18.3944 20 18.3944C20.9083 18.3944 21.715 17.8567 23.3282 16.7812L27.5 14M17.6 31H23.4C26.7603 31 28.4405 31 29.7239 30.346C30.8529 29.7708 31.7708 28.8529 32.346 27.7239C33 26.4405 33 24.7603 33 21.4V18.6C33 15.2397 33 13.5595 32.346 12.2761C31.7708 11.1471 30.8529 10.2292 29.7239 9.65396C28.4405 9 26.7603 9 23.4 9H17.6C14.2397 9 11.5595 9 10.2761 9.65396C9.14708 10.2292 8.2292 11.1471 7.65396 12.2761C7 13.5595 7 15.2397 7 18.6V21.4C7 24.7603 7 26.4405 7.65396 27.7239C8.2292 28.8529 9.14708 29.7708 10.2761 30.346C11.5595 31 14.2397 31 17.6 31Z"
                stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
            Call Screen
          </b-link>
        </li>
      </ul>
    </div>
  </header>
  <!--=========================== Header ============================-->
</template>

<script>
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
} from "bootstrap-vue";
import {
  getHomeRouteForLoggedInUser,
  getUserData,
  isUserLoggedIn,
} from "@/auth/utils";
export default {
  components: {
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
  },
  data() {
    return {
      isLogin: ''
    };
  },
  methods: {
    callScreen() {
      this.$router.push({ name: 'make-call' })
    },
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
    open_menu() {
      var menu = document.getElementById("mobile_nav");
      var open_menu = document.getElementById("open-menu");
      var close_menu = document.getElementById("close-menu");

      menu.classList.add("open_mb_nav");
      open_menu.style.display = "none";
      close_menu.style.display = "block";
    },
    close_menu() {
      var open_menu1 = document.getElementById("open-menu");
      var close_menu1 = document.getElementById("close-menu");
      var menu1 = document.getElementById("mobile_nav");

      menu1.classList.remove("open_mb_nav");
      open_menu1.style.display = "block";
      close_menu1.style.display = "none";
    },
  },
  created() {
    this.isLogin = isUserLoggedIn();

  },
  mounted(){
    const navbar = document.getElementById('header')
    // OnScroll event handler
    const onScroll = () => {
    // Get scroll value
    const scroll = document.documentElement.scrollTop
    // If scroll value is more than 0 - add class
    if (scroll > 0) {
    navbar.classList.add("fixed");
    } else {
    navbar.classList.remove("fixed")
    }
    }
    // Use the function
    window.addEventListener('scroll', onScroll)
  }
}
</script>

<style>

</style>