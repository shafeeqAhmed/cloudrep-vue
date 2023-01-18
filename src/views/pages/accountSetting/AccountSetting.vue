<template>
  <div class="account-settings">
    <b-row class="mb-3 align-items-center">
      <b-col md="8">
        <h1>Account Settings</h1>
      </b-col>

      <!-- search-bar -->
      <!-- <b-col md="4">
        <div class="input-gradient">
          <b-input-group class="input-group-merge">
            <b-form-input placeholder="Search" />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </div>
      </b-col> -->
    </b-row>
    <b-tabs
      vertical
      content-class="col-12 col-md-9 mt-1 mt-md-0"
      pills
      nav-wrapper-class="col-md-3 col-12"
      nav-class="nav-left"
    >
      <!-- general tab -->
      <b-tab
        active
        @click="updateTab('general')"
      >
        <!-- title -->
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">General</span>
        </template>

        <account-setting-general v-if="currentTab == 'general'" />
      </b-tab>
      <!--/ general tab -->

      <!-- change password tab -->
      <b-tab @click="updateTab('change-password')">
        <!-- title -->
        <template #title>
          <feather-icon
            icon="LockIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Change Password</span>
        </template>

        <account-setting-password v-if="currentTab == 'change-password'" />
      </b-tab>
      <!--/ change password tab -->

      <!-- info -->
      <b-tab @click="updateTab('information')">
        <!-- title -->
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Information</span>
        </template>

        <account-setting-information v-if="currentTab == 'information'" />
      </b-tab>

      <!-- social links -->
      <b-tab @click="updateTab('social')">
        <!-- title -->
        <template #title>
          <feather-icon
            icon="LinkIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Social</span>
        </template>

        <account-setting-social v-if="currentTab == 'social'" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {
  BTabs,
  BTab,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BRow,
  BCol,
} from "bootstrap-vue";
import AccountSettingGeneral from "./AccountSettingGeneral.vue";
import AccountSettingPassword from "./AccountSettingPassword.vue";
import AccountSettingInformation from "./AccountSettingInformation.vue";
import AccountSettingSocial from "./AccountSettingSocial.vue";
import userAccountStoreModule from "./userAccountStoreModule";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";

import "@/assets/css/auth.css";
import "@/assets/css/contact-center.css";
export default {
  components: {
    BTabs,
    BTab,
    BRow,
    BCol,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    AccountSettingGeneral,
    AccountSettingPassword,
    AccountSettingInformation,
    AccountSettingSocial,
  },
  data() {
    return {
      currentTab: "general",
    };
  },
  methods: {
    updateTab(type) {
      if (type == "general") {
        this.currentTab = "general";
      }
      if (type == "change-password") {
        this.currentTab = "change-password";
      }
      if (type == "information") {
        this.currentTab = "information";
      }
      if (type == "social") {
        this.currentTab = "social";
      }
    },
  },
  setup() {
    const APP_STORE_MODULE_NAME = "accountSetting";

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, userAccountStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      store.unregisterModule(APP_STORE_MODULE_NAME);
    });
    // store.dispatch("accountSetting/myDetail");
  },
};
</script>
