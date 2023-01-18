<template>
  <div class="sidebar-nav-mobile-view">
    <div
      id="add-fav-menu-overlay"
      @click="menutoggleHide"
    ></div>
    <div
      class="main-menu-slidebar"
      :class="[
        {
          expanded:
            !isVerticalMenuCollapsed ||
            (isVerticalMenuCollapsed && isMouseHovered),
        },
        skin === 'semi-dark' ? 'menu-dark' : 'menu-light',
      ]"
      @mouseenter="updateMouseHovered(true)"
      @mouseleave="updateMouseHovered(false)"
    >
      <div class="menu-left-nav">
        <div class="dashboard-nav-bar">
          <div class="logo">
            <a href="#">
              <svg
                width="42"
                height="50"
                viewBox="0 0 42 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_4629_19403)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M42.1954 36.8234L21.1377 49.0032L0.0800781 36.8234L8.73272 31.8163L21.1377 38.9939L33.5428 31.8163L42.1954 36.8234Z"
                    fill="url(#paint0_linear_4629_19403)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.1377 0.0938721L42.1954 12.2762L33.5428 17.2808L21.1377 10.1032L8.73272 17.2808L0.0800781 12.2762L21.1377 0.0938721Z"
                    fill="url(#paint1_linear_4629_19403)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.079679 36.8217L0 36.7743V12.3199L0.079679 12.275L8.73232 17.2797L8.65264 17.3246V31.7697L8.73232 31.8146L0.079679 36.8217Z"
                    fill="url(#paint2_linear_4629_19403)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.918 21.4831L21.0548 18.5117L26.1916 21.4831L21.0548 24.4544L15.918 21.4831Z"
                    fill="url(#paint3_linear_4629_19403)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.191 21.4851L21.0542 24.4565L21.0293 24.4415V24.656V30.5688L21.0542 30.5838L26.191 27.6124L26.2707 27.565V21.5325L26.191 21.4851Z"
                    fill="url(#paint4_linear_4629_19403)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_4629_19403"
                    x1="0.0800781"
                    y1="40.411"
                    x2="42.1954"
                    y2="40.411"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#7B0B84" />
                    <stop
                      offset="0.17"
                      stop-color="#6C1C93"
                    />
                    <stop
                      offset="0.5"
                      stop-color="#444ABB"
                    />
                    <stop
                      offset="0.96"
                      stop-color="#0593FA"
                    />
                    <stop
                      offset="1"
                      stop-color="#0099FF"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_4629_19403"
                    x1="0.0800781"
                    y1="8.6861"
                    x2="42.1954"
                    y2="8.6861"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#0168E5" />
                    <stop
                      offset="0.54"
                      stop-color="#00BDF1"
                    />
                    <stop
                      offset="0.97"
                      stop-color="#00FDFA"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_4629_19403"
                    x1="-5.15673"
                    y1="31.6075"
                    x2="8.96653"
                    y2="17.5143"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#0168E5" />
                    <stop
                      offset="0.54"
                      stop-color="#00BDF1"
                    />
                    <stop
                      offset="0.97"
                      stop-color="#00FDFA"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_4629_19403"
                    x1="15.918"
                    y1="21.4831"
                    x2="26.1916"
                    y2="21.4831"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.03"
                      stop-color="#00FDFA"
                    />
                    <stop
                      offset="0.46"
                      stop-color="#00BDF1"
                    />
                    <stop
                      offset="1"
                      stop-color="#0168E5"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_4629_19403"
                    x1="21.0293"
                    y1="26.0332"
                    x2="26.2707"
                    y2="26.0332"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#7B0B84" />
                    <stop
                      offset="0.17"
                      stop-color="#6C1C93"
                    />
                    <stop
                      offset="0.5"
                      stop-color="#444ABB"
                    />
                    <stop
                      offset="0.96"
                      stop-color="#0593FA"
                    />
                    <stop
                      offset="1"
                      stop-color="#0099FF"
                    />
                  </linearGradient>
                  <clipPath id="clip0_4629_19403">
                    <rect
                      width="42"
                      height="49.0958"
                      fill="white"
                      transform="translate(0 0.0938721)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
          <div class="dashboard-nav">
            <div class="nav-bg">
              <div class="back-bg-nav">
                <b-img
                  src="@/assets/images/website/bar-light.png"
                  class="light-bar"
                ></b-img>
                <b-img
                  src="@/assets/images/website/bar-dark.png"
                  class="dark-bar"
                ></b-img>
              </div>
              <div class="parentMenuList">
                <div class="fav-icons-nav">
                  <div
                    v-for="(fMenu, index) in favMenuList"
                    :key="index"
                    class="mb-1"
                  >
                    <div
                      class="text-center"
                      :id="`menu-${fMenu.title}`"
                    >
                      <b-link
                        @click="gotoNextMenu(fMenu.route)"
                        class="bLinkforChildMenu"
                      >
                        <div class="input-gradient">
                          <div class="fav-icon-box">
                            <div class="shadow-icon"></div>
                            <b-img :src="fMenu.icon3D"></b-img>
                          </div>
                        </div>
                      </b-link>
                    </div>
                    <b-tooltip
                      id="menu-tooltip"
                      :target="`menu-${fMenu.title}`"
                      triggers="hover"
                      placement="right"
                    >
                      <span>{{ fMenu.title }}</span>
                    </b-tooltip>
                  </div>
                </div>
                <div
                  class="toggle-container text-center d-flex align-items-center justify-content-center"
                >
                  <b-button
                    @click="menutoggleShow"
                    id="plusCircleBtn"
                  >
                    <feather-icon
                      icon="PlusCircleIcon"
                      size="35"
                      class=""
                    />
                  </b-button>
                  <b-button
                    @click="menutoggleHide"
                    id="arrowCircleBtn"
                    class="arrowCircleBtn"
                  >
                    <feather-icon
                      icon="ArrowLeftCircleIcon"
                      size="35"
                    />
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-right-nav">
        <div
          class="dashboard-menu-bar"
          :toggleVerticalMenuActive="toggleVerticalMenuActive"
          :toggleCollapsed="toggleCollapsed"
          :collapseTogglerIcon="collapseTogglerIcon"
        >
          <div class="menu-nav-head">
            <h2>Explore</h2>
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon
                icon="XIcon"
                size="20"
                class="d-block d-xl-none"
                @click="toggleVerticalMenuActive"
              />
              <feather-icon
                icon="MenuIcon"
                size="20"
                class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed"
              />
            </b-link>
          </div>
          <div class="menu-navbar">
            <div v-if="!menuItem.children">
              <ul class="scroll-nav-bar-site">
                <vertical-nav-menu-items
                  :items="navMenuItems"
                  class="navigation-main-nav"
                />
                <ul class="navigation-main-nav">
                  <li class="nav-item">
                    <a
                      href=""
                      class="d-flex align-items-center router-link-active"
                      @click="logout"
                    >
                      <feather-icon
                        icon="LogOutIcon"
                        size="20"
                        class=""
                      />
                      <span class="menu-title text-truncate"> Logout </span>
                    </a>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="add-to-fav"
          id="addToFav"
        >
          <div
            class="d-flex align-items-center justify-content-center w-100 mb-3"
          >
            <div>
              <h2>Add to Favourites</h2>
            </div>
            <div>
              <feather-icon
                class="ml-1 star-icon"
                icon="StarIcon"
                size="20"
              />
            </div>
          </div>
          <div class="add-fav-menu">
            <ul class="fav-menu">
              <li
                v-for="(parentMenu, index) in navMenuItems"
                :key="index"
              >
                <a href="#">
                  <div
                    class="w-100 d-flex align-items-center justify-content-between"
                  >
                    <div
                      :class="
                        titleIsActive(parentMenu.title) ? 'cursorDisabled' : ''
                      "
                    >
                      <b-img
                        class="light-icon"
                        :src="parentMenu.icon2DLight"
                      ></b-img>
                      <b-img
                        class="dark-icon"
                        :src="parentMenu.icon2DDark"
                      ></b-img>
                      <span>{{ parentMenu.title }}</span>
                    </div>
                    <div
                      class="addRemoveMenuIcon"
                      v-if="!parentMenu.children"
                    >
                      <feather-icon
                        v-if="!titleIsActive(parentMenu.title)"
                        @click="addFavMenuItem(parentMenu)"
                        class="plus-icon"
                        icon="PlusCircleIcon"
                        size="20"
                      />
                      <feather-icon
                        v-else
                        class="minus-icon"
                        @click="removeFavMenuItem(parentMenu)"
                        icon="MinusCircleIcon"
                        size="20"
                      />
                    </div>
                  </div>
                </a>
                <div v-if="parentMenu.children">
                  <ul class="fav-menu">
                    <li
                      v-for="(childMenu, index) in parentMenu.children"
                      :key="index"
                    >
                      <a href="#">
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div
                            :class="
                              titleIsActive(childMenu.title)
                                ? 'cursorDisabled'
                                : ''
                            "
                          >
                            <b-img
                              class="light-icon"
                              :src="childMenu.icon2DLight"
                            ></b-img>
                            <b-img
                              class="dark-icon"
                              :src="childMenu.icon2DDark"
                            ></b-img>
                            <span>{{ childMenu.title }}</span>
                          </div>
                          <div class="addRemoveMenuIcon">
                            <feather-icon
                              v-if="!titleIsActive(childMenu.title)"
                              class="plus-icon"
                              @click="addFavMenuItem(childMenu)"
                              icon="PlusCircleIcon"
                              size="20"
                            />
                            <feather-icon
                              v-else
                              class="minus-icon"
                              @click="removeFavMenuItem(childMenu)"
                              icon="MinusCircleIcon"
                              size="20"
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom-side-nav">
        <div class="user-im">
          <b-img
            src="@/assets/images/logo/Profile.png"
            class="mr-1"
          ></b-img>
          <h3>sophiefortune</h3>
        </div>
        <div class="short-link">
          <ul>
            <li>
              <b-img
                src="@/assets/images/logo/Polygon.png"
                class="polygon-bg"
              ></b-img>
              <b-link>
                <feather-icon
                  icon="MicIcon"
                  size="21"
                />
              </b-link>
            </li>
            <li>
              <b-link>
                <feather-icon
                  icon="HeadphonesIcon"
                  size="21"
                />
              </b-link>
            </li>
            <li>
              <b-link>
                <feather-icon
                  icon="UserPlusIcon"
                  size="21"
                />
              </b-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { agent, client, publisher } from "@/navigation/vertical";
import { BLink, BImg, VBToggle, BTooltip, BButton } from "bootstrap-vue";
import { provide, computed, ref } from "@vue/composition-api";
import { $themeConfig } from "@themeConfig";
import { toastAlert } from "@core/mixins/ui/toast";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import useAppConfig from "@core/app-config/useAppConfig";
import VerticalNavMenuItems from "./components/vertical-nav-menu-items/VerticalNavMenuItems.vue";
import useVerticalNavMenu from "./useVerticalNavMenu";
import menuPopover from "./menuPopover.vue";
import useJwt from "@/auth/jwt/useJwt";
import store from "@/store";
export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
    BButton,
    VBToggle,
    BTooltip,
    menuPopover,
  },
  data() {
    return {
      menuItem: {},
      menuList: {},
      favMenuList: [],
      showMenu: true,
      hideMenu: false,
    };
  },
  mixins: [toastAlert],
  directives: {
    "b-toggle": VBToggle,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  methods: {
    titleIsActive(title) {
      if (this.favMenuList) {
        return this.favMenuList.find((item) => item.title === title);
      } else {
        return false;
      }
    },
    logout() {
      useJwt.logout();
      useJwt.logoutFromLocal();
    },
    addFavMenuItem(menuItem) {
      const menu = this.favMenuList;
      const checkMenu = menu.find((element) => {
        if (element.title === menuItem.title) {
          return true;
        } else {
          return false;
        }
      });
      if (!checkMenu) {
        if (this.favMenuList.length < 5) {
          const addMenuItem = this.favMenuList.push(menuItem);
          if (addMenuItem) {
            this.storeUserApplicationSetting(this.favMenuList);
            console.log(this.favMenuList);
          }
        } else {
          // this.errorToast("Error", 'You can add maximum 5 item in favorite list!');
          this.customToast(
            "warning",
            "You can add maximum 5 item in favorite list!"
          );
        }
      }
    },
    removeFavMenuItem(menuItem) {
      const index = this.favMenuList.findIndex(
        (menu) => menu.title === menuItem.title
      );
      const removeMenuItem = this.favMenuList.splice(index, 1);
      if (removeMenuItem) {
        this.storeUserApplicationSetting(this.favMenuList);
      }
    },
    gotoNextMenu(menu) {
      if (this.$router.currentRoute.name != menu) {
        this.$router.push({ name: menu });
      }
    },
    menutoggleShow() {
      var element = document.getElementById("addToFav");
      element.classList.add("openSideMenuFav");
      const showBtn = (document.getElementById("plusCircleBtn").style.display =
        "none");
      const hideBtn = (document.getElementById("arrowCircleBtn").style.display =
        "block");
      document
        .getElementById("add-fav-menu-overlay")
        .classList.add("activeClass");
    },
    menutoggleHide() {
      var element = document.getElementById("addToFav");
      element.classList.remove("openSideMenuFav");
      const hideBtn = (document.getElementById("arrowCircleBtn").style.display =
        "none");
      const showBtn = (document.getElementById("plusCircleBtn").style.display =
        "block");
      document
        .getElementById("add-fav-menu-overlay")
        .classList.remove("activeClass");
    },
    storeUserApplicationSetting(favMenu) {
      this.showLoader();
      const params = {
        favMenu: favMenu,
      };
      this.$http
        .post("store-user-appilcation-setting", params)
        .then((response) => {
          if (response.data.status == true) {
            const {
              data: {
                data: { userApplicationSetting },
              },
            } = response;
            this.favMenuList = [];
            userApplicationSetting.fav_menu.forEach((elem) => {
              this.favMenuList.push(elem);
            });
          }
        })
        .catch((error) => {
          // this.errorToast("Error", "something is going wrong ");
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    getUserApplicationSetting() {
      this.$http
        .get("get-user-appilcation-setting")
        .then((response) => {
          const {
            data: {
              data: { userApplicationSetting },
            },
          } = response;
          // this.favMenuList = userApplicationSetting.fav_menu;
          this.favMenuList = [];
          userApplicationSetting.fav_menu.forEach((elem) => {
            this.favMenuList.push(elem);
          });
          this.$store.commit(
            "appConfig/UPDATE_SKIN",
            userApplicationSetting.is_dark_mode == 1 ? "dark" : "light"
          );
        })
        .catch((error) => {
          // this.errorToast("Error", "something is going wrong ");
        });
    },
    getCampaignFilterReports() {
      this.$store.dispatch("app/updateCampaignFilterReportMenu", {
        menu: this.navMenuItems,
        role: this.role,
      });
    },
  },
  mounted() {
    this.getUserApplicationSetting();
    this.getCampaignFilterReports();
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props);

    const { skin } = useAppConfig();

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false);

    provide("isMouseHovered", isMouseHovered);

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    };

    const collapseTogglerIconFeather = computed(() =>
      collapseTogglerIcon.value === "unpinned" ? "CircleIcon" : "DiscIcon"
    );

    // App Name
    const { appName, appLogoImage } = $themeConfig.app;

    const role = store.getters["app/role"];

    let navMenuItems = [];
    if (role == "agent") {
      navMenuItems = agent;
    } else if (role == "client") {
      navMenuItems = client;
    } else if (role == "publisher") {
      navMenuItems = publisher;
    }

    return {
      navMenuItems,
      role,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoImage,
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";

.cursorDisabled {
  pointer-events: none;
  opacity: 0.5;
}

.addRemoveMenuIcon {
  cursor: pointer;

  svg {
    transition: all 0.5s ease-in-out;
  }
}

#menu-tooltip {
  .arrow {
    display: none;
  }
}
</style>
