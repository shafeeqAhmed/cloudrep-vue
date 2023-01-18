<template>
  <div class="system-settings">
    <b-card class="p-1">
      <systemSettings />
      <hr class="my-5" />
      <appLogo />
      <hr class="my-5" />
      <csvUpload />
    </b-card>
  </div>
</template>

<script>
import { BCard } from "bootstrap-vue";
import { ref, onUnmounted, computed, onMounted } from "@vue/composition-api";
import systemSettings from './components/systemSetting';
import appLogo from './components/AppLogo';
import csvUpload from './components/csvUpload';
import store from "@/store";
import useStore from "./useStore";
export default {
  components: {
    systemSettings,
    appLogo,
    csvUpload,
    BCard
  },
  setup() {
    const APP_STORE_MODULE_NAME = "systemSettings";
      // Register module
      if (!store.hasModule(APP_STORE_MODULE_NAME))
        store.registerModule(APP_STORE_MODULE_NAME, useStore);
  
      // UnRegister on leave
      onUnmounted(() => {
        if (store.hasModule(APP_STORE_MODULE_NAME))
          store.unregisterModule(APP_STORE_MODULE_NAME);
      });
  }
}
</script>

<style>

</style>