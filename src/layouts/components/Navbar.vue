<template>
  <div class="navbar-container d-flex justify-content-between align-items-center">
    <!-- Nav Menu Toggler -->
    <div class="left-nav-menu d-flex align-items-center">
      <ul class="nav navbar-nav d-xl-none">
        <li class="nav-item">
          <b-link class="nav-link" @click="toggleVerticalMenuActive">
            <feather-icon icon="MenuIcon" size="21" />
          </b-link>
        </li>
      </ul>
      <ul class="m-0 p-0 list-style-none"><activity-drop-down v-if="$store.getters['app/role'] === 'agent'" /></ul>
    </div>
    <!-- <div class="explore-box">
      <b-input-group class="">
        <b-form-input class="" placeholder="Explore"></b-form-input>
      </b-input-group>
    </div> -->
    <!-- Left Col -->
    <div class="right-nav-menu">
      <b-navbar-nav class="nav align-items-center ml-auto">
        <!-- <div
          class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
        >
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
            <feather-icon icon="MenuIcon" size="21" />
          </b-link>
        </div> -->
        <!-- JR -->
      <!-- <b-form-group  
        <v-select
          v-model="$store.state.app.selectedWorkerActivity"
          :options="status"
          label="title"
          class="select-cr"
        >
          <template v-slot:selection="{ title, icon }">
            <img :src="icon" width="16" class="align-middle mr-50" />
            <span>{{ title }}</span>
          </template>
          <template #option="{ title, icon }">
            <img :src="icon" width="16" class="align-middle mr-50" />
            <span> {{ title }}</span>
          </template>
        </v-select>
      </b-form-group> -->


        <div class="right-nav-icons bookmark-wrapper align-items-center justify-content-end flex-grow-1 d-lg-flex">
          <dark-Toggler class="d-lg-block" id="tooltip-tri" />
          <b-tooltip target="tooltip-tri" id="tooltip-dark" triggers="hover">
            Dark Mode
          </b-tooltip>
          <b-tooltip target="tooltip-tri" id="tooltip-light" triggers="hover">
            Light Mode
          </b-tooltip>
          <b-link class="text-dark ml-1 d-none d-lg-block" v-if="$store.getters['app/role'] === 'agent'">
            <!-- <feather-icon icon="MicIcon" size="21" /> -->
          </b-link>
          <!-- <b-link class="d-none d-lg-block">
            <feather-icon icon="BellIcon" size="21" id="notifications"/>
            <b-tooltip target="notifications" triggers="hover">
              Notifications
            </b-tooltip>
          </b-link>
          <b-link class="d-none d-lg-block">
            <feather-icon icon="MessageCircleIcon" size="21" id="messages" />
            <b-tooltip target="messages" triggers="hover">
              Messages
            </b-tooltip>
          </b-link> -->

        </div>

        <b-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
          <template #button-content>
            <div class="d-sm-flex d-none user-nav">
              <!-- <span class="user-status">
                {{ userData.role }}
              </span> -->
            </div>
            <!-- class="badge-minimal" -->
            <!-- badge-variant="success" -->
            <!-- variant="light-primary" -->
            <!-- badge -->

            <!-- <b-avatar size="40" class="user-avatar" :src="require('@/assets/images/avatars/13-small.png')" /> -->
            <b-avatar size="40" class="user-avatar" :src="$store.state.app.user.profile_photo_path" />
            <!-- {{ $store }} -->
            <p class="user-name mb-0 text-capitalize">
              {{ $store.state.app.user.name }}
            </p>
          </template>

          <b-dropdown-item to="/account-setting" link-class="d-flex align-items-center">
            <feather-icon size="16" icon="UserIcon" class="mr-50" />

            <span>Profile</span>
          </b-dropdown-item>

          <!-- <b-dropdown-item link-class="d-flex align-items-center">
            <feather-icon
              size="16"
              icon="MailIcon"
              class="mr-50"
            />
            <span>Inbox</span>
          </b-dropdown-item> -->

          <!-- <b-dropdown-item link-class="d-flex align-items-center">
            <feather-icon
              size="16"
              icon="CheckSquareIcon"
              class="mr-50"
            />
            <span>Task</span>
          </b-dropdown-item> -->

          <!-- <b-dropdown-item link-class="d-flex align-items-center">
            <feather-icon
              size="16"
              icon="MessageSquareIcon"
              class="mr-50"
            />
            <span>Chat</span>
          </b-dropdown-item> -->

          <b-dropdown-divider />

          <b-dropdown-item @click="logout" link-class="d-flex align-items-center">
            <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
            <span>Logout</span>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
    </div>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BFormGroup,
  BImg,
  BInputGroup,
  BFormInput,
  BTooltip,
  VBToggle,
} from "bootstrap-vue";
import vSelect from "vue-select";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import { initialAbility } from "@/libs/acl/config";
import useJwt from "@/auth/jwt/useJwt";
import { avatarText } from "@core/utils/filter";
import { globalHelper } from "@core/mixins/ui/global";
import { getUserData } from "@/auth/utils";
import ActivityDropDown from "./ActivityDropDown.vue";


export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BDropdown,
    BFormGroup,
    BInputGroup,
    BFormInput,
    // Navbar Components
    DarkToggler,
    vSelect,
    BImg,
    ActivityDropDown,
    BTooltip,
    VBToggle,
  },
  directives: {
    "b-toggle": VBToggle,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },
  mixins: [globalHelper],

  created() {
    // console.log(this.$store.state.app.user)
    this.user = getUserData();
  },
  data() {
    return {
      user: "",
      userData: JSON.parse(localStorage.getItem("userData")),
      avatarText,

      status: [
        {
          title: "Available",
          icon: require("@/assets/images/icons/filled-circle.png"),
          sid: "WA5e8aec0498019ca3d820b75f83d69d33",
        },
        {
          title: "On Break",
          icon: require("@/assets/images/icons/snooze.png"),
          sid: "WA48865c059e1530bb53bd31dc2c741b31",
        },
        {
          title: "Offline",
          icon: require("@/assets/images/icons/negative.png"),
          sid: "WA244ab5956e96a2a773888d8ffeb7f2aa",
        },
      ],

    };
  },
  methods: {

    removeFromLocal() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);

      // Remove userData from localStorage
      localStorage.removeItem("userData");

      // Reset ability
      // this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: "auth-login" });
    },
    logout() {
      useJwt.logout()
    },

  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
<style scoped lang="scss">
.vs__actions {
  display: none !important;
}
.left-nav-menu{
  width:20%;
}
.right-nav-menu{
  width: 40%;
}
.explore-box{
  width: 40%;
  input{
    height: 2.5rem !important;
    text-align: center;
    font-size:18px;
  }
}
.right-nav-icons a{
  margin: 0px 15px;
  svg{
    color:#000;
  }
}
.dark-layout .right-nav-icons {
  svg{
    color:#fff;
  }
}
.dark-layout .explore-box{

  input{
    background: linear-gradient(180deg, rgba(46, 51, 90, 0.3) 0%, rgba(28, 27, 51, 0.3) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 4px !important;
    color: #fff  !important;
    text-align: center;
    &::placeholder{
      color: #fff;
    }
  }
  
}
</style>