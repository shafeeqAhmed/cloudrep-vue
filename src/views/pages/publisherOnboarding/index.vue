<template>
  <div>
    <CompanySite v-if="$route.path == '/publisher/onboarding/index'"/>
    <PublisherCompanyWebsite v-if="$route.path == '/publisher/onboarding/publisher-company-site'"/>
    <CompetatorSite v-if="$route.path == '/publisher/onboarding/competator-site'"/>
    <CompetatorSiteEnter v-if="$route.path == '/publisher/onboarding/competator-site-enter'"/>
  </div>
</template>
<script>
import CompanySite from './components/CompanySite.vue';
import PublisherCompanyWebsite from './components/PublisherCompanyWebsite.vue';
import CompetatorSite from './components/CompetatorSite.vue';
import CompetatorSiteEnter from './components/CompetatorSiteEnter.vue';
import store from './store.js';



export default {
  components: {
    CompanySite,
    PublisherCompanyWebsite,
    CompetatorSite,
    CompetatorSiteEnter
},
  created() {
    const APP_STORE_MODULE_NAME = "pob";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, store);
    }
  },
  unmounted() {
    const APP_STORE_MODULE_NAME = "pob";
    // UnRegister on leave
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};

</script>
