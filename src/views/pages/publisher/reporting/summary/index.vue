<template>
  <div>
    <div class="user-management">
      <div class="mt-1">
        <b-tabs
          pills
          class="tabs-cr"
        >
          <b-tab
            title="Campaign"
            class=""
            :active="tabName == 'campaign'"
          >
            <campaign />
          </b-tab>

          <b-tab
            @click="activeTab('dialed')"
            title="Dialed"
            class=""
            :active="tabName == 'dialed'"
          >
            <dialed v-if="tab == 'dialed'" />
          </b-tab>

          <b-tab
            @click="activeTab('duplicate')"
            title="Duplicate"
            class=""
            :active="tabName == 'duplicate'"
          >
            <duplicate v-if="tab == 'duplicate'" />
          </b-tab>

          <b-tab
            @click="activeTab('date')"
            title="Date"
            class=""
            :active="tabName == 'date'"
          >
            <date v-if="tab == 'date'" />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { BImg, BTabs, BTab } from "bootstrap-vue";

import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import campaign from "./campaign/index.vue";
import dialed from "./dialed/index.vue";
import duplicate from "./duplicate/index.vue";
import date from "./date/index.vue";
import userStoreModule from "../store.js";

export default {
  components: {
    BTabs,
    BTab,
    BImg,
    campaign,
    dialed,
    duplicate,
    date,
  },
  data() {
    return {
      tabName: "",
      tab: "",
    };
  },
  methods: {
    activeTab(val) {
      this.tab = val;
    },
  },
  setup() {
    const APP_STORE_MODULE_NAME = "managePublisherReporting";
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
