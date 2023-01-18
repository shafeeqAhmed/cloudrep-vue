<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col
        lg="4"
        :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
        class="d-none d-lg-flex align-items-center py-5 px-4 publisher-text"
      >
      </b-col>
      <b-col
        lg="8"
        class="d-flex align-items-center auth-bg px-0 p-lg-5 py-3 py-lg-0"
      >
        <b-col sm="12" md="12" lg="12" class="px-xl-2 mx-auto">
          <div class="mb-5">
            <img
              class="cursor-pointer"
              src="@/assets/images/icons/arrow-left.svg"
            />
            <b-link class="ml-1 text-dark-custom" @click="logout">
              <small>Back</small>
            </b-link>
          </div>
          <b-card-title title-tag="h1" class="mb-1 title">
            Edit according to your need
          </b-card-title>
          <p class="mt-2 mb-3">
            Create your own dashboard or choose from predefined ones
          </p>
          <b-nav class="mb-3">
            <b-nav-item active> Active </b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
          </b-nav>
          <div class="d-flex">
            <b-input-group class="input-group-merge mb-3 mr-2 w-50">
              <b-input-group-prepend is-text class="publisher-company-search">
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input placeholder="Company Website" />
            </b-input-group>
            <b-button variant="primary">search</b-button>
          </div>
          <b-row>
            <b-col md="6" lg="6">
              <b-card class="earnings-card custom-dashboard-card py-3 px-2">
                <b-row>
                  <b-col cols="8">
                    <b-card-title class="mb-1"> Morbi habitasse felis nulla arcu, morbi ultricies. </b-card-title>
                    <b-card-text class="text-muted font-small-2">
                      <span class="font-weight-bolder">Commodo ullamcorper lectus vel euismod fringilla egestas. Vitae platea viverra vulputate cursus mi. Quis sapien quis velit elit tempus est sed pharetra facilisi. Non molestie odio.</span>
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" align-self="center">
                    <img :src="require('@/assets/images/slider/Image.png')" width="66px" height="66px">
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col md="6" lg="6">
              <b-card class="earnings-card custom-dashboard-card py-3 px-2">
                <b-row>
                  <b-col cols="8">
                    <b-card-title class="mb-1"> Morbi habitasse felis nulla arcu, morbi ultricies. </b-card-title>
                    <b-card-text class="text-muted font-small-2">
                      <span class="font-weight-bolder">Commodo ullamcorper lectus vel euismod fringilla egestas. Vitae platea viverra vulputate cursus mi. Quis sapien quis velit elit tempus est sed pharetra facilisi. Non molestie odio.</span>
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" align-self="center">
                    <img :src="require('@/assets/images/slider/Image.png')" width="66px" height="66px">
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col md="6" lg="6">
              <b-card class="earnings-card custom-dashboard-card py-3 px-2">
                <b-row>
                  <b-col cols="8">
                    <b-card-title class="mb-1"> Morbi habitasse felis nulla arcu, morbi ultricies. </b-card-title>
                    <b-card-text class="text-muted font-small-2">
                      <span class="font-weight-bolder">Commodo ullamcorper lectus vel euismod fringilla egestas. Vitae platea viverra vulputate cursus mi. Quis sapien quis velit elit tempus est sed pharetra facilisi. Non molestie odio.</span>
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" align-self="center">
                    <img :src="require('@/assets/images/slider/Image.png')" width="66px" height="66px">
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col md="6" lg="6">
              <b-card class="earnings-card custom-dashboard-card py-3 px-2">
                <b-row>
                  <b-col cols="8">
                    <b-card-title class="mb-1"> Morbi habitasse felis nulla arcu, morbi ultricies. </b-card-title>
                    <b-card-text class="text-muted font-small-2">
                      <span class="font-weight-bolder">Commodo ullamcorper lectus vel euismod fringilla egestas. Vitae platea viverra vulputate cursus mi. Quis sapien quis velit elit tempus est sed pharetra facilisi. Non molestie odio.</span>
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" align-self="center">
                    <img :src="require('@/assets/images/slider/Image.png')" width="66px" height="66px">
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template> 
<script>
import {
  BRow,
  BCol,
  BImg,
  BCardTitle,
  BFormInput,
  BInputGroupPrepend,
  BInputGroup,
  BButton,
  BCard,
  BCardText,
  BNav,
  BNavItem,
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import LeftPublisher from "./components/LeftPublisher.vue";
import vSelect from "vue-select";
export default {
  components: {
    BRow,
    BCol,
    BImg,
    BCardTitle,
    BFormInput,
    BInputGroupPrepend,
    BInputGroup,
    BButton,
    LeftPublisher,
    vSelect,
    BCard,
    BNav,
    BNavItem,
    BCardText,
  },
  data() {
    return {
      selected: { title: "Square" },
      backgroundImg: require("@/assets/images/auth/background.png"),
      option: [
        { title: "Square" },
        { title: "Rectangle" },
        { title: "Rombo" },
        { title: "Romboid" },
      ],
    };
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
