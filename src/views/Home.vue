<template>
    <div>
        <old-home v-if="baseUrl == 'https://cloudrep.ai'" />
        <new-home v-else />
    </div>
</template>

<script>

import {
    BLink,
    BButton,
    BImg,
    BFormGroup,
    BFormInput,
    BForm,
} from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import OldHome from "./OldHome.vue";
import NewHome from "./NewHome.vue";

export default {
    components: {
        VuexyLogo,
        BLink,
        BButton,
        BImg,
        BFormGroup,
        BFormInput,
        BForm,
        OldHome,
        NewHome,

    },
    data() {
        return {
            downImg: require("@/assets/images/pages/error.svg"),
            isLogin: false,
            baseUrl: ''
        };
    },
    created() {
        this.baseUrl = new URL(location.href).origin
    }
};
</script>
