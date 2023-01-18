<template>
  <div class="offerwall-tabs">
    <b-row class="align-items-center">
      <b-col md="2" v-if="this.user.role == 'agent'">
          <div class="off-img">
            <img
          class="img-fluid br-6"
          :src="campaign.agent_image" />
          </div>
      </b-col>
      <b-col md="2" v-if="this.user.role == 'publisher'">
          <img
          class="img-fluid br-6"
          :src="campaign.publisher_image" />
      </b-col>
      <!-- {{campaign}} -->
      <b-col md="10">
        <h2>{{campaign.title}}</h2>
      </b-col>
      <b-col md="12">
        <!-- About Section -->
        <div class="mt-3">
          <h3>About Payout</h3>
          <div class="mt-1" v-if="this.user.role == 'agent'">
            <p>Campaign Rate : ${{campaign.campaign_rate}}</p>
               <p>Commission : {{campaign.agent_payout_setting.payout_amount}}%</p>
          </div>
          <div class="mt-1" v-if="this.user.role == 'publisher'">
            <p>Payout Call : {{campaign.payout_per_call}}</p>
          <p>
            Duration : {{campaign.publisher_per_call_duration}} Seconds
          </p>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BRow, BCol } from "bootstrap-vue";
import { getUserData } from '@/auth/utils';
export default {
  props: ['campaign'],
  components: {
    BCard,
    BRow,
    BCol,
  },
  created() {
    this.user = getUserData()
  },
};
</script>

<style>
</style>