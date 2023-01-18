<template>
  <div
    class="app-content content"
    :class="[
      { 'show-overlay': $store.state.app.shallShowOverlay },
      $route.meta.contentClass,
      ,
    ]"
  >
  <!-- { 'app-content-pad': role !== 'admin' } -->
    <div class="content-overlay" />
    <div class="header-navbar-shadow" />
    <div
      class="content-wrapper"
      :class="contentWidth === 'boxed' ? 'container p-0' : null"
    >
      <slot name="breadcrumb">
        <!-- <app-breadcrumb v-if="role === 'admin'" /> -->
      </slot>
      <div class="content-body">
        <transition :name="routerTransition" mode="out-in">
          <slot />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import useAppConfig from "@core/app-config/useAppConfig";
import {
  isUserLoggedIn,
  getUserData,
} from "@/auth/utils";
export default {
  components: {
    AppBreadcrumb,
  },
  setup() {
    const { routerTransition, contentWidth } = useAppConfig();
const isUserLogin = isUserLoggedIn();
    let user = "";
    let role = "";

    if (isUserLogin) {
      user = getUserData();
      role = user.role;
    }
    return {
      routerTransition,
      contentWidth,
      isUserLogin,
      user, role
    };
  },
};
</script>

<style>
</style>
