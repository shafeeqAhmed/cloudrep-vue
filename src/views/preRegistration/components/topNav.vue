<template>
  <!--=========================== Header ============================-->
  <header class="site-header sticky-header header-bg mt-3 mt-md-0 mt-sm-0 mt-xs-0" id="headerSticky">
    <b-navbar toggleable="lg">
      <div class="container">
        <div class="header">
          <div class="site-logo">
            <b-navbar-brand>
              <a class="" href="#">
                <img class="cursor-pointer mainLogo customLogoWidth" src="@/assets/images/common/logo.png" />
              </a>
            </b-navbar-brand>
          </div>
          <div class="site-menu">
            <div class="mobile-menu-tog text-right">
              <svg class="close-menu" id="close-menu" @click="close_menu()" width="40" height="40" viewBox="0 0 40 40"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29 11L11 29M11 11L29 29" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
              <img class="open-menu" id="open-menu" @click="open_menu()" src="@/assets/images/website/bar.png" />
            </div>
            <div class="open-nav" id="navbar-toggle-collapse">
              <div class="overlay-nav"></div>
              <div class="menu-bar">
                <div class="menu-nav">
                  <div class="menu-logo">
                    <a class="" href="#">
                      <img class="cursor-pointer mainLogo customLogoWidth"
                        src="@/assets/images/common/new_logo2.svg" />
                    </a>
                  </div>
                  <b-navbar-nav class="ml-auto">
                    <b-nav-item>
                      <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 30.5C17.2152 30.5 14.5445 29.3938 12.5754 27.4246C10.6062 25.4555 9.5 22.7848 9.5 20C9.5 17.2152 10.6062 14.5445 12.5754 12.5754C14.5445 10.6062 17.2152 9.5 20 9.5C22.7848 9.5 25.4555 10.6062 27.4246 12.5754C29.3938 14.5445 30.5 17.2152 30.5 20C30.5 22.7848 29.3938 25.4555 27.4246 27.4246C25.4555 29.3938 22.7848 30.5 20 30.5ZM20 32C23.1826 32 26.2348 30.7357 28.4853 28.4853C30.7357 26.2348 32 23.1826 32 20C32 16.8174 30.7357 13.7652 28.4853 11.5147C26.2348 9.26428 23.1826 8 20 8C16.8174 8 13.7652 9.26428 11.5147 11.5147C9.26428 13.7652 8 16.8174 8 20C8 23.1826 9.26428 26.2348 11.5147 28.4853C13.7652 30.7357 16.8174 32 20 32V32Z"
                            fill="white" />
                          <path
                            d="M21.3949 17.882L17.9599 18.3125L17.8369 18.8825L18.5119 19.007C18.9529 19.112 19.0399 19.271 18.9439 19.7105L17.8369 24.9125C17.5459 26.258 17.9944 26.891 19.0489 26.891C19.8664 26.891 20.8159 26.513 21.2464 25.994L21.3784 25.37C21.0784 25.634 20.6404 25.739 20.3494 25.739C19.9369 25.739 19.7869 25.4495 19.8934 24.9395L21.3949 17.882ZM21.4999 14.75C21.4999 15.1478 21.3419 15.5294 21.0606 15.8107C20.7793 16.092 20.3978 16.25 19.9999 16.25C19.6021 16.25 19.2206 16.092 18.9393 15.8107C18.658 15.5294 18.4999 15.1478 18.4999 14.75C18.4999 14.3522 18.658 13.9706 18.9393 13.6893C19.2206 13.408 19.6021 13.25 19.9999 13.25C20.3978 13.25 20.7793 13.408 21.0606 13.6893C21.3419 13.9706 21.4999 14.3522 21.4999 14.75Z"
                            fill="white" />
                        </svg>
                      </span><span class="ani-item"> About Us</span>
                    </b-nav-item>
                    <b-nav-item>
                      <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 15H32M12 20H28M15 25H25" stroke="white" stroke-width="2"
                            stroke-linecap="round" />
                        </svg>
                      </span> <span class="ani-item">Our Services</span>
                    </b-nav-item>
                    <b-nav-item>
                      <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.5 14L16.6718 16.7812C18.285 17.8567 19.0917 18.3944 20 18.3944C20.9083 18.3944 21.715 17.8567 23.3282 16.7812L27.5 14M17.6 31H23.4C26.7603 31 28.4405 31 29.7239 30.346C30.8529 29.7708 31.7708 28.8529 32.346 27.7239C33 26.4405 33 24.7603 33 21.4V18.6C33 15.2397 33 13.5595 32.346 12.2761C31.7708 11.1471 30.8529 10.2292 29.7239 9.65396C28.4405 9 26.7603 9 23.4 9H17.6C14.2397 9 11.5595 9 10.2761 9.65396C9.14708 10.2292 8.2292 11.1471 7.65396 12.2761C7 13.5595 7 15.2397 7 18.6V21.4C7 24.7603 7 26.4405 7.65396 27.7239C8.2292 28.8529 9.14708 29.7708 10.2761 30.346C11.5595 31 14.2397 31 17.6 31Z"
                            stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                      </span> <span class="ani-item">Contact Us</span>
                    </b-nav-item>
                    <b-nav-item class="mobile-logs-nav" @click="login()">
                      <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 23.8C22.8995 23.8 25.25 21.3823 25.25 18.4C25.25 15.4177 22.8995 13 20 13C17.1005 13 14.75 15.4177 14.75 18.4C14.75 21.3823 17.1005 23.8 20 23.8ZM20 23.8C13 23.8 12.9385 27.4146 12.9385 31.391M20 23.8C27 23.9565 27.0615 27.4146 27.0615 31.391M27.0615 31.391C25.5913 32 23.7275 32 20 32C16.2725 32 14.4087 32 12.9385 31.391M27.0615 31.391C29.0217 30.5791 30.5791 29.0217 31.391 27.0615C32 25.5913 32 23.7275 32 20C32 16.2725 32 14.4087 31.391 12.9385C30.5791 10.9783 29.0217 9.42092 27.0615 8.60896C25.5913 8 23.7275 8 20 8C16.2725 8 14.4087 8 12.9385 8.60896C10.9783 9.42092 9.42092 10.9783 8.60896 12.9385C8 14.4087 8 16.2725 8 20C8 23.7275 8 25.5913 8.60896 27.0615C9.42092 29.0217 10.9783 30.5791 12.9385 31.391"
                            stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                      </span> <span class="ani-item">Sign In</span>
                    </b-nav-item>
                    <b-nav-item class="mobile-logs-nav" @click="register()">
                      <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M24 32C24 32.5523 24.4477 33 25 33C25.5523 33 26 32.5523 26 32H24ZM6 32C6 32.5523 6.44772 33 7 33C7.55228 33 8 32.5523 8 32H6ZM26 19C25.4477 19 25 19.4477 25 20C25 20.5523 25.4477 21 26 21V19ZM32 21C32.5523 21 33 20.5523 33 20C33 19.4477 32.5523 19 32 19V21ZM30 17C30 16.4477 29.5523 16 29 16C28.4477 16 28 16.4477 28 17H30ZM28 23C28 23.5523 28.4477 24 29 24C29.5523 24 30 23.5523 30 23H28ZM21.75 15.9C21.75 19.1793 19.155 21.8 16 21.8V23.8C20.3008 23.8 23.75 20.2422 23.75 15.9H21.75ZM16 21.8C12.845 21.8 10.25 19.1793 10.25 15.9H8.25C8.25 20.2422 11.6992 23.8 16 23.8V21.8ZM10.25 15.9C10.25 12.6207 12.845 10 16 10V8C11.6992 8 8.25 11.5578 8.25 15.9H10.25ZM16 10C19.155 10 21.75 12.6207 21.75 15.9H23.75C23.75 11.5578 20.3008 8 16 8V10ZM8 32C8 30.7142 8.00154 29.5712 8.13256 28.5457C8.26254 27.5283 8.51178 26.7083 8.95357 26.0545C9.79282 24.8125 11.6016 23.8 16 23.8V21.8C11.3984 21.8 8.70718 22.847 7.29643 24.9347C6.61322 25.9458 6.29996 27.1082 6.14869 28.2922C5.99846 29.468 6 30.7453 6 32H8ZM15.9778 23.7998C20.3878 23.8978 22.2076 24.9068 23.0504 26.1353C23.4902 26.7764 23.7382 27.5765 23.8677 28.5756C23.9984 29.5843 24 30.7136 24 32H26C26 30.7459 26.0016 29.4799 25.8511 28.3185C25.6993 27.1475 25.3848 26.0027 24.6996 25.0039C23.2924 22.9526 20.6122 21.9022 16.0222 21.8002L15.9778 23.7998ZM26 21H29V19H26V21ZM29 21H32V19H29V21ZM28 17V20H30V17H28ZM28 20V23H30V20H28Z"
                            fill="white" />
                        </svg>
                      </span> <span class="ani-item">Sign Up</span>
                    </b-nav-item>
                    <b-nav-item class="mobile-logs-nav" v-if="isLogin" @click="dashboard">
                      <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 13.035C8 11.4393 8 10.6415 8.2676 10.015C8.60289 9.22994 9.22672 8.60447 10.0097 8.2683C10.6346 8 11.4303 8 13.0218 8C14.6133 8 15.409 8 16.0339 8.2683C16.8169 8.60447 17.4407 9.22994 17.776 10.015C18.0436 10.6415 18.0436 11.4393 18.0436 13.035C18.0436 14.6306 18.0436 15.4285 17.776 16.055C17.4407 16.84 16.8169 17.4655 16.0339 17.8017C15.409 18.07 14.6133 18.07 13.0218 18.07C11.4303 18.07 10.6346 18.07 10.0097 17.8017C9.22672 17.4655 8.60289 16.84 8.2676 16.055C8 15.4285 8 14.6306 8 13.035Z"
                            stroke="white" stroke-width="2" />
                          <path
                            d="M21.9564 13.035C21.9564 11.4393 21.9564 10.6415 22.224 10.015C22.5593 9.22994 23.1831 8.60447 23.9661 8.2683C24.591 8 25.3867 8 26.9782 8C28.5697 8 29.3654 8 29.9903 8.2683C30.7733 8.60447 31.3971 9.22994 31.7324 10.015C32 10.6415 32 11.4393 32 13.035C32 14.6306 32 15.4285 31.7324 16.055C31.3971 16.84 30.7733 17.4655 29.9903 17.8017C29.3654 18.07 28.5697 18.07 26.9782 18.07C25.3867 18.07 24.591 18.07 23.9661 17.8017C23.1831 17.4655 22.5593 16.84 22.224 16.055C21.9564 15.4285 21.9564 14.6306 21.9564 13.035Z"
                            stroke="white" stroke-width="2" />
                          <path
                            d="M21.9564 26.965C21.9564 25.3694 21.9564 24.5715 22.224 23.945C22.5593 23.16 23.1831 22.5345 23.9661 22.1983C24.591 21.93 25.3867 21.93 26.9782 21.93C28.5697 21.93 29.3654 21.93 29.9903 22.1983C30.7733 22.5345 31.3971 23.16 31.7324 23.945C32 24.5715 32 25.3694 32 26.965C32 28.5607 32 29.3585 31.7324 29.985C31.3971 30.7701 30.7733 31.3955 29.9903 31.7317C29.3654 32 28.5697 32 26.9782 32C25.3867 32 24.591 32 23.9661 31.7317C23.1831 31.3955 22.5593 30.7701 22.224 29.985C21.9564 29.3585 21.9564 28.5607 21.9564 26.965Z"
                            stroke="white" stroke-width="2" />
                          <path
                            d="M8 26.965C8 25.3694 8 24.5715 8.2676 23.945C8.60289 23.16 9.22672 22.5345 10.0097 22.1983C10.6346 21.93 11.4303 21.93 13.0218 21.93C14.6133 21.93 15.409 21.93 16.0339 22.1983C16.8169 22.5345 17.4407 23.16 17.776 23.945C18.0436 24.5715 18.0436 25.3694 18.0436 26.965C18.0436 28.5607 18.0436 29.3585 17.776 29.985C17.4407 30.7701 16.8169 31.3955 16.0339 31.7317C15.409 32 14.6133 32 13.0218 32C11.4303 32 10.6346 32 10.0097 31.7317C9.22672 31.3955 8.60289 30.7701 8.2676 29.985C8 29.3585 8 28.5607 8 26.965Z"
                            stroke="white" stroke-width="2" />
                        </svg>
                      </span>Dashboard
                    </b-nav-item>
                  </b-navbar-nav>
                </div>
                <div class="float-right">
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
              <div class="robo-bg">
                <div class="robo-img">
                  <img src="@/assets/images/website/robo.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-navbar>
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

export default {
  components:{
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
  methods :{
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
      var menu = document.getElementById("navbar-toggle-collapse");
      var open_menu = document.getElementById("open-menu");
      var close_menu = document.getElementById("close-menu");

      menu.classList.add("slide-menu-right");
      open_menu.style.display = "none";
      close_menu.style.display = "block";
    },
    close_menu() {
      var open_menu1 = document.getElementById("open-menu");
      var close_menu1 = document.getElementById("close-menu");
      var menu1 = document.getElementById("navbar-toggle-collapse");

      menu1.classList.remove("slide-menu-right");
      open_menu1.style.display = "block";
      close_menu1.style.display = "none";
    },
  }
}
</script>

<style>

</style>