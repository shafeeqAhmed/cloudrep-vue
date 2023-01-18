<template>
  <div class="w-100 text-center">
    <b-img src="@/assets/images/auth/company-logo.png" class="company-logo mb-5 mx-auto" />
    <!-- List Group -->
    <b-list-group class="listing mx-lg-auto">
      <b-list-group-item :class="{ 'active-item': selected.includes(1) }" @click="updateMenu(0)">
        <!-- <b-link class="d-flex align-items-center" to="/agent-onboarding/trafic-source"> -->
        <b-link class="d-flex align-items-center">
          <b-avatar rounded class="avatar-link mr-2 float-left">
            <!-- <feather-icon
                icon="LayersIcon"
              /> -->
            <!-- {{completedSteps}} -->
            <feather-icon icon="UserIcon" />
            <!-- <feather-icon :icon="completedSteps.includes(1) ? 'CheckIcon' : 'LayersIcon'" /> -->
          </b-avatar>
          <span class="link-title">Trafic Source</span>
        </b-link>
      </b-list-group-item>

      <b-list-group-item :class="{ 'active-item': selected.includes(2) }" @click="updateMenu(1)">
        <b-link class="d-flex align-items-center">
          <b-avatar rounded class="avatar-link mr-2 float-left">
            <!-- <feather-icon
                icon="MapIcon"
              /> -->
              <feather-icon icon="MapPinIcon" />
            <!-- <feather-icon :icon="completedSteps.includes(2) ? 'CheckIcon' : 'MapIcon'" /> -->
          </b-avatar>
          <span class="link-title">Location</span>
        </b-link>
      </b-list-group-item>

      <b-list-group-item :class="{ 'active-item': selected.includes(3) }" @click="updateMenu(3)">
        <b-link class="d-flex align-items-center">
          <b-avatar rounded class="avatar-link mr-2 float-left">
            <!-- <feather-icon
                icon="AlignLeftIcon"
              /> -->
              <feather-icon icon="TabletIcon" />
            <!-- <feather-icon :icon="completedSteps.includes(3) ? 'CheckIcon' : 'AlignLeftIcon'" /> -->
          </b-avatar>
          <span class="link-title">Device</span>
        </b-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import "@/assets/css/auth.css";
import "@/assets/css/signup-menu.css";
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
    step: (state) => state.aob.step,
  }),
  data() {
    return {
      selected: [],
      completedSteps: [],
    };
  },
  watch: {
    "$store.state.aob.step": function () {
      this.updateStepClick();
      this.goToNextStep()
    },
  },
  methods: {
    updateMenu(nextStep) {
      // if (nextStep <= this.step) {
      this.$store.commit('aob/UPDATE_STEP', nextStep)
      // }
    },
    updateStepClick() {
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
    },
    goToNextStep() {
      this.selected = []
      if (this.step == 0) {
        this.selected.push(1);
      }

      if (this.step == 1) {
        this.selected.push(1, 2);
      }

      if (this.step >= 2) {
        this.selected.push(1, 2, 3);
      }

    },
    updateActiveClass(url) {


    },
  },
  created() {
    this.updateStepClick();
    this.goToNextStep()

    this.$store.dispatch("aob/myAgentProfileItem");
  },
};
</script>
