<template>
  <div id="elId" class="campaign-creation-nav">
    <div class=" w-100 d-lg-flex align-items-center justify-content-center">
      <div class="w-100 text-center">
        <b-row>
          <b-col cols="12">
            <div class="camp-steps">
              <ul class="steps">
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(1) }"  @click="nextTab(1)">
                  <span class="step__icon">
                    <span class="text-no">1</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(2) }" @click="nextTab(2)">
                  <span class="step__icon">
                    <span class="text-no">2</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(3) }" @click="nextTab(3)">
                  <span class="step__icon">
                    <span class="text-no">3</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(4) }" @click="nextTab(4)">
                  <span class="step__icon">
                    <span class="text-no">4</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(5) }" @click="nextTab(5)">
                  <span class="step__icon">
                    <span class="text-no">5</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(6) }" @click="nextTab(6)">
                  <span class="step__icon">
                    <span class="text-no">6</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(7) }" @click="nextTab(7)">
                  <span class="step__icon">
                    <span class="text-no">7</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(8) }" @click="nextTab(8)">
                  <span class="step__icon">
                    <span class="text-no">8</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(9) }" @click="nextTab(9)">
                  <span class="step__icon">
                    <span class="text-no">9</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(10) }" @click="nextTab(10)">
                  <span class="step__icon">
                    <span class="text-no">10</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(11) }" @click="nextTab(11)">
                  <span class="step__icon">
                    <span class="text-no">11</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(12) }" @click="nextTab(12)">
                  <span class="step__icon">
                    <span class="text-no">12</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(13) }" @click="nextTab(13)">
                  <span class="step__icon">
                    <span class="text-no">13</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
                <li class="step--incomplete" :class="{ 'step--active step--complete': activitedTabs.includes(14) }" @click="nextTab(14)">
                  <span class="step__icon">
                    <span class="text-no">14</span>
                  </span>
                  <span class="step__label">Step</span>
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/auth.css";
import "@/assets/css/signup-menu.css";

import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
} from "bootstrap-vue";
import { data } from "vue-echarts";
export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
  },
  computed: {
    step() {
      return this.$store.state.clientCampaign.step
    },
    activitedTabs() {
      this.activeTabs = []
      for (var i = 0; i <= this.step; i++) {
        this.activeTabs.push(i)
      }
      return this.activeTabs
    }

  },
  data() {
    return {
      activeTabs: []
    }
  },
  methods: {
    nextTab(step) {

      const { campaign } = this.$store.state.clientCampaign
      
      if (campaign && step <= campaign.step) {
        if (step == 11 && campaign.campaign_rate == null) {
          console.log('you have not selected agent!')
        }else{
          this.$store.commit('clientCampaign/UPDATE_STEP', step)
        }
      }
    },
  },
  
}

</script>
