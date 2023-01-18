<template>
  <div>
    <div class="px-2 py-2  card">
      <hr class="mb-3" />
      <target-listing />
      <hr class="mb-3" />
      <RoutingPlans />
      <div class="campaign-pagination mt-5 mb-5">

      </div>
    </div>

  </div>
</template>
<script>
import {
  BRow,
  BCol,
  BFormCheckbox,
  BButton,
  BImg,
} from "bootstrap-vue";
import TargetListing from './targets/Index.vue'
import RoutingPlans from './routings/index.vue'
import { toastAlert } from "@core/mixins/ui/toast";
import store from '@/store'
import userStoreModule from "../store";
import { onUnmounted } from '@vue/composition-api';

import vSelect from 'vue-select'
export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormCheckbox,

    TargetListing,
    RoutingPlans,
    BImg,
    vSelect
  },
  mixins: [toastAlert],
  setup() {
    const APP_STORE_MODULE_NAME = "routingsAndTargets";

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, userStoreModule);
    store.dispatch('routingsAndTargets/searchClient', { q: 'c' })
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });
  }

};
</script>