<template>
  <div class="offerwall-tabs">
    <b-row class="align-items-center">
      <b-col md="2">
          <div class="off-img">
            <img
          class="img-fluid br-6"
          :src="campaign.agent_image" />
          </div>
      </b-col>
      <!-- {{campaign}} -->
      <b-col md="10">
        <h2>{{campaign.title}}</h2>
      </b-col>
      <b-col md="12">
        <!-- About Section -->
        <div class="mt-3">
          <h3>Pricing Details</h3>
          <div class="mt-1">
            <p>Cost Per Call : ${{campaign.cost_per_call}}</p>
          <p>
            Call Duration : {{campaign.client_per_call_duration}} Seconds
          </p>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BRow, BCol } from "bootstrap-vue";
export default {
  props: ['campaign'],
  components: {
    BCard,
    BRow,
    BCol,
  },
};
</script>

<style>
</style>