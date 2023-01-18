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
            Create your Dashboard
          </b-card-title>
          <p class="mt-2 mb-5">
            Create your own dashboard or choose from predefined ones
          </p>
          <b-row>
            <b-col md="6" lg="4">
              <b-card
                :img-src="require('@/assets/images/slider/cover-main-img.png')"
                img-alt="Card image cap"
                img-top
                title="Create Your Custom Dashboard "
                class="publisher-dashboard-card"
              >
              </b-card>
            </b-col>
            <b-col md="6" lg="4">
              <b-card
                :img-src="require('@/assets/images/slider/cover-img.png')"
                img-alt="Card image cap"
                img-top
                title="New Business"
              >
              </b-card>
            </b-col>
            <b-col md="6" lg="4">
              <b-card
                :img-src="require('@/assets/images/slider/cover-img.png')"
                img-alt="Card image cap"
                img-top
                title="Transfers of Accounts"
              >
              </b-card>
            </b-col>
            <b-col md="6" lg="4">
              <b-card
                :img-src="require('@/assets/images/slider/cover-img.png')"
                img-alt="Card image cap"
                img-top
                title="Tax Academy Introduction Full"
              >
              </b-card>
            </b-col>
            <b-col md="6" lg="4">
              <b-card
                :img-src="require('@/assets/images/slider/cover-img.png')"
                img-alt="Card image cap"
                img-top
                title="Tax Academy Introduction"
              >
              </b-card>
            </b-col>
            <b-col md="6" lg="4">
              <b-card
                :img-src="require('@/assets/images/slider/cover-img.png')"
                img-alt="Card image cap"
                img-top
                title="Transfer Pricing"
              >
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
