<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <b-col lg="5" class="d-flex p-1 p-lg-5 p-md-5 left-text bg-white">
        <!-- <ClientOnboardingNav /> -->
      </b-col>
      <b-col lg="7" class="d-flex auth-bg px-1 p-lg-5 bg-light"> </b-col>
    </b-row>
  </div>
</template>

<script>
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { BRow, BCol, BFormGroup, BFormInput } from "bootstrap-vue";
import ClientOnboardingNav from "./ClientOnboardingNav.vue";
import clientOnBoardingStoreModule from "./clientOnBoardingStoreModule";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ClientOnboardingNav,
  },
  setup() {
    console.log('step cc===================')
    //   const APP_STORE_MODULE_NAME = "cob";

    // // Register module
    // if (!store.hasModule(APP_STORE_MODULE_NAME))
    //   store.registerModule(APP_STORE_MODULE_NAME, clientOnBoardingStoreModule);

    // // UnRegister on leave
    // onUnmounted(() => {
    //   console.log('unmunted call-----------------------0000000000')
    //   if (store.hasModule(APP_STORE_MODULE_NAME))
    //     store.unregisterModule(APP_STORE_MODULE_NAME);
    // });





    codeIcon;
    return {
      codeIcon,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>