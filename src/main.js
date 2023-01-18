import Vue from "vue";
import { ToastPlugin, ModalPlugin } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";
import VueCountryCode from "vue-country-code-select";
import { get } from "@/auth/utils";

// import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";
// import Spline from 'vue-spline';

import router from "./router";
import store from "./store";
import App from "./App.vue";
// add user inforation into store
store.commit("app/UPDATE_USER", get("userData"));

// Global Components
import "./global-components";

// 3rd party plugins
import "@axios";
import "@/libs/acl";
import "@/libs/portal-vue";
import "@/libs/toastification";

/* ===AOS Animation=== */
import AOS from "aos";
import "aos/dist/aos.css";
/* ===AOS Animation=== */
import VueTypedJs from "vue-typed-js";

Vue.use(VueTypedJs);

import VueConfetti from "vue-confetti";
Vue.use(VueConfetti);

import FlowyPlugin from "@hipsjs/flowy-vue";
import "@hipsjs/flowy-vue/dist/lib/flowy-vue.css";
Vue.use(FlowyPlugin);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCPJ7LBYs6-BEfhhY7YDpxZYA6hjydLlq4",
    libraries: "places",
  },
  installComponents: true,
});

Vue.use(VueCountryCode);

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

// Vue.use(Vue3VideoPlayer,
//   { lang: 'en' }
// )

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    AOS.init();
  },
}).$mount("#app");
