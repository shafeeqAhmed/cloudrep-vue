import Vue from "vue";
import VueRouter from "vue-router";

// Routes
import { canNavigate } from "@/libs/acl/routeProtection";
import {
  isUserLoggedIn,
  isUserEmailVerified,
  isTwoFaChecked,
  getUserData,
  getHomeRouteForLoggedInUser,
  get,
  save,
} from "@/auth/utils";
import common from "./routes/common";
import admin from "./routes/admin";
import agent from "./routes/agent";
import client from "./routes/client";
import publisher from "./routes/publisher";
import dummy from "./routes/dummy";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    ...common,
    ...admin,
    ...agent,
    ...client,
    ...publisher,
    ...dummy,
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});
router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn();
  const userData = getUserData();
  const twofa = isTwoFaChecked();
  // console.log(to);

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    return next(getHomeRouteForLoggedInUser(userData ? userData.role : null));
  }

  //if user is not loging redirect him on login page
  if (
    !isLoggedIn &&
    to.name != "spline-page" &&
    to.name != "public-index" &&
    to.name != "auth-login" &&
    to.name != "home" &&
    to.name != "home-3" &&
    to.name != "homev21" &&
    to.name != "home-check" &&
    to.name != "auth-register" &&
    to.name != "auth-forgot-password" &&
    to.name != "auth-reset" &&
    to.name != "auth-account-type" &&
    to.name != "auth-account-basic-info" &&
    to.name != "email-not-verified" &&
    to.name != "set-2fa" &&
    to.name != "auth-2fa" &&
    to.name != "registration-completed" &&
    to.name != "pre-registration"
  ) {
    console.log("THIS IS THE LOGIN TEST----------------");
    // email verification information for email verification
    if (to.name == "verify-email") {
      save("id", to.params.id);
      save("hash", to.params.hash);
    }
    return next({ name: "auth-login" });
  }

  if (
    isLoggedIn &&
    !isUserEmailVerified() &&
    to.name != "auth-login" &&
    to.name != "email-not-verified" &&
    to.name != "verify-email" &&
    to.name != "auth-account-type" &&
    to.name != "auth-account-basic-info" &&
    to.name != "set-2fa" &&
    to.name != "verify-otp" &&
    to.name != "auth-2fa" &&
    to.name != "registration-completed"
  ) {
    next({ name: "email-not-verified" });
  }

  if (
    isLoggedIn &&
    isUserEmailVerified() &&
    !twofa &&
    to.name != "verify-otp" &&
    to.name != "auth-login" &&
    to.name != "email-not-verified" &&
    to.name != "verify-email" &&
    to.name != "auth-account-type" &&
    to.name != "auth-account-basic-info" &&
    to.name != "email-not-verified" &&
    to.name != "set-2fa" &&
    to.name != "auth-2fa" &&
    to.name != "registration-completed"
  ) {
    return next({ name: get("step") == null ? "verify-otp" : "auth-2fa" });
  }

  //if user is login and not verified

  if (
    isLoggedIn &&
    isUserEmailVerified() &&
    twofa &&
    !canNavigate(to) &&
    to.name != "home" &&
    to.name != "misc-not-authorized" &&
    to.name != "verify-email" &&
    to.name != "error-404" &&
    to.name != "auth-login" &&
    to.name != "auth-register" &&
    to.name != "auth-forgot-password" &&
    to.name != "auth-reset" &&
    to.name != "auth-account-type" &&
    to.name != "auth-account-basic-info" &&
    to.name != "email-not-verified" &&
    to.name != "set-2fa" &&
    to.name != "verify-otp" &&
    to.name != "auth-2fa" &&
    to.name != "registration-completed" &&
    to.name != getHomeRouteForLoggedInUser(userData.role)
  ) {
    // If logged in => not authorized
    // return next({ name: 'misc-not-authorized' })
  }

  //if user is login and by mistake access the following route redirect hime according to his role

  return next();
});
// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
