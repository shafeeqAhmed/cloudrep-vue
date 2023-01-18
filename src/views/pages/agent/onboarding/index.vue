<template>

  <div class="onboarding-page">
    <b-row class="onboard-height align-items-center">
      <b-col lg="5" class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center">
        <agentOnboardingNav />
      </b-col>
      <b-col lg="7" class="px-5 cient-content-wrap h-100 d-flex align-items-center ">
        <div class="w-100 m-auto">
          <div class="backBtn mb-4">
            <feather-icon size="18" icon="ArrowLeftIcon" />
            <b-link class="ml-1 text-dark-custom" to="/agent">
              <small>Back To Agent</small>
            </b-link>
          </div>
          <div class="client-content">
            <traficSource v-if="step == 0" />

            <location v-if="step == 1" />

            <device v-if="step == 2 || step == 3" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import aobStoreModule from "./aobStoreModule";
import agentOnboardingNav from "./components/agentOnboardingNav.vue";
import traficSource from "./components/traficSource.vue";
import location from "./components/location.vue";
import device from "./components/device.vue";
import { mapState } from "vuex";

import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";

export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    agentOnboardingNav,
    traficSource,
    location,
    device
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    step: (state) => state.aob.step,

  }),
  data() {
    return {
      currentUrl: ''
    }
  },
  created() {
    console.log('route==================')
    console.log(this.$route)

    const APP_STORE_MODULE_NAME = "aob";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {

      this.$store.registerModule(APP_STORE_MODULE_NAME, aobStoreModule);
    }
  },
  unmounted() {
    const APP_STORE_MODULE_NAME = "aob";

    // UnRegister on leave
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>