<template>
  <div class="offerwall-tabs">
    <b-row class="align-items-center">
      <b-col md="2">
        <div class="off-img">
          <img
            class="img-fluid" v-if="this.user.role == 'agent'" :src="campaign.agent_image" />
          <img
            class="img-fluid" v-if="this.user.role == 'publisher'" :src="campaign.publisher_image" />
          <img
            class="img-fluid" v-if="this.user.role == 'client'" :src="campaign.client_image" />
        </div>
      </b-col>
      <b-col md="10">
        <h2>{{campaign.title}}</h2>
      </b-col>
      <b-col md="12" cols="12">
        <!-- About Section -->
        <div class="mt-3">
          <h3>About the Client</h3>
          <div class="mt-1">
            <p>Client Name : {{campaign.name}}</p>
            <p>Client Title : {{campaign.title}}</p>
            <p>Client Email : {{campaign.email}}</p>
          </div>
        </div>
        <hr />
        <!-- Contact Details -->
        <div class="mt-2">
          <h3>Contact Details</h3>
          <div class="mt-1">
            <p>Phone Number : {{campaign.phone_no}}</p>
          </div>
        </div>
        <hr />
        <!-- Address Section -->
        <div class="mt-2">
          <h3>Address Details</h3>
          <div class="mt-1">
            <p>Street Address : {{campaign.address}}</p>
          <p>
            City : {{campaign.city}}
          </p>
          <p>
            Country : {{campaign.country}}
          </p>
          <p>
            Zipcode : {{campaign.zipcode}}
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
    props: ['campaign', 'user'],
  components: {
    BCard,
    BRow,
    BCol,
  },
  created() {
    // console.log()
  }
};
</script>

<style>
</style>