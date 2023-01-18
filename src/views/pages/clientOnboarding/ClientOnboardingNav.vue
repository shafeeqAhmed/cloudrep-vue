<template>
  <div
    class="
      w-100
      d-lg-flex
      aling-items-center
      justify-content-center
      px-lg-5 px-md-5 px-sm-0
      mb-5
    "
  >
    <div class="w-100 text-center">
      <b-img
        src="@/assets/images/auth/company-logo.png"
        class="company-logo mb-5 mx-auto"
      />
      <!-- List Group -->
      <b-list-group class="listing mx-lg-auto">
        <b-list-group-item :class="{ 'active-item': selected.includes(1) }">
          <b-link
            class="d-flex align-items-center"
            :to="{ name: 'services-required' }"
          >
            <b-avatar rounded class="avatar-link mr-2 float-left">
              <feather-icon
                :icon="completedSteps.includes(1) ? 'CheckIcon' : 'LayersIcon'"
              />
            </b-avatar>
            <span class="link-title">Services Required </span>
          </b-link>
        </b-list-group-item>

        <b-list-group-item :class="{ 'active-item': selected.includes(2) }">
          <b-link
            class="d-flex align-items-center"
            :to="{ name: 'business-information' }"
          >
            <b-avatar rounded class="avatar-link mr-2 float-left">
              <feather-icon
                :icon="completedSteps.includes(2) ? 'CheckIcon' : 'TargetIcon'"
              />

              <!-- <feather-icon icon="CheckIcon" /> -->
            </b-avatar>
            <span class="link-title">Business Information</span>
          </b-link>
        </b-list-group-item>

        <b-list-group-item :class="{ 'active-item': selected.includes(3) }">
          <b-link
            class="d-flex align-items-center"
            :to="{ name: 'select-category' }"
          >
            <b-avatar rounded class="avatar-link mr-2 float-left">
              <feather-icon
                :icon="
                  completedSteps.includes(3) ? 'CheckIcon' : 'AlignLeftIcon'
                "
              />
              <!-- <feather-icon icon="CheckIcon" /> -->
            </b-avatar>
            <span class="link-title">Select Category</span>
          </b-link>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import "@/assets/css/auth.css";
import "@/assets/css/signup-menu.css";
import clientOnBoardingStoreModule from "./clientOnBoardingStoreModule";
import { mapState } from "vuex";

import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
} from "bootstrap-vue";
export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    step: (state) => state.cob.step,
  }),
  data() {
    return {
      selected: [],
      completedSteps: [],
    };
  },
  watch: {
    "$store.state.cob.step": function () {
      console.log('step change-----------')
      this.updateStepClick();
    },
  },
  methods: {
    updateStepClick() {
      if (this.step) {
        this.completedSteps = [];

        if (this.step == 1) {
          this.completedSteps.push(1);
        }
        if (this.step == 2) {
          this.completedSteps.push(1, 2);
        }
        if (this.step == 3) {
          this.completedSteps.push(1, 2, 3);
        }
      }
    },
  },
  created() {
    const APP_STORE_MODULE_NAME = "cob";

    // // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME))
      this.$store.registerModule(
        APP_STORE_MODULE_NAME,
        clientOnBoardingStoreModule
      );

    // UnRegister on leave

    if (this.$route.name == "services-required") {
      this.selected.push(1);
    }
    if (this.$route.name == "business-information") {
      this.selected.push(1, 2);
    }
    if (this.$route.name == "select-category") {
      this.selected.push(1, 2, 3);
    }

    this.$store.dispatch("cob/myClientProfileItem")
     this.updateStepClick()
  },
};
</script>
