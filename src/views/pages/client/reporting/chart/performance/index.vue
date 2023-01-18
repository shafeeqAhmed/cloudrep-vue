<template>
  <div class="contract">
    <div class="upp-header">
      <div class="upp-img">
        <b-img
          class="w-100"
          src="@/assets/images/logo/upp-img.png"
        ></b-img>
      </div>
      <div class="upp-heading">
        <h1>Reporting Performance</h1>
      </div>
    </div>
    <div class="create-contract mt-2 pb-2">
      <performance-summary />
      <performance-report />
      <top-performers />
    </div>
  </div>
</template>

<script>
import { BImg } from "bootstrap-vue";

import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import PerformanceSummary from "./summary/Summary.vue";
import PerformanceReport from "./report/index.vue";
import TopPerformers from "./topPerformers/PerformersList.vue";
import userStoreModule from "../../store.js";

export default {
  components: {
    BImg,
    PerformanceSummary,
    PerformanceReport,
    TopPerformers,
  },

  setup() {
    const APP_STORE_MODULE_NAME = "manageClientReporting";
    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, userStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });
  },
};
</script>
