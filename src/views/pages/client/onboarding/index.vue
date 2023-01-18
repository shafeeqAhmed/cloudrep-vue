<template>
    <div class="onboarding-page">
        <b-row class="onboard-height align-items-center">
            <b-col lg="5" class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center">
                <ClientOnboardingNav />
            </b-col>
            <b-col lg="7" class="px-5 cient-content-wrap h-100 d-flex align-items-center ">
                <services-required />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ClientOnboardingNav from "./components/ClientOnboardingNav.vue";
import ServicesRequired from "./components/ServicesRequired.vue";
import storeModule from "./storeModule";

import {
    BRow,
    BCol,
} from "bootstrap-vue";
export default {
    components: {
        BRow,
        BCol,
        ClientOnboardingNav,
        ServicesRequired
    },

    data() {
        return {

        };
    },
    created() {
        const APP_STORE_MODULE_NAME = "cob";
        alert('this is the ')
        // Register module
        if (!this.$store.hasModule(APP_STORE_MODULE_NAME))
            this.$store.registerModule(
                APP_STORE_MODULE_NAME,
                storeModule
            );

        // // UnRegister on leave
        // if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
        //     this.$store.unregisterModule(APP_STORE_MODULE_NAME);
        // }

    },
};
</script>
