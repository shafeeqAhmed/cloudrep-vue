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
      <b-col md="10">
        <h2>{{campaign.title}}</h2>
      </b-col>
      <b-col md="12">
        <!-- About Section -->
        <div class="mt-3">
          <h3>About</h3>
          <div class="mt-1">
            <p>Campaign Category : {{campaign.category.name}}</p>
          <p>
            Category Verticals : {{campaign.vertical.name}}
          </p>
          <p>
            Campaign Description : {{campaign.descripiton}}
          </p>
          </div>
        </div>
        <hr />
        <!-- Starting Section -->
        <div class="mt-2">
          <h3>Date & Time</h3>
          <div class="mt-1">
            <p>Expected Start Date : {{campaign.start_date}}</p>
          <p>
            Expected Start Time : {{campaign.start_time}}
          </p>
          <p>
            Expected End Date : {{campaign.end_date}}
          </p>
          <p>
            Expected End Time : {{campaign.end_time}}
          </p>
          </div>
        </div>
        <hr />
        <!-- Starting Section -->
        <div class="mt-2">
          <h3>Social Links</h3>
          <div class="mt-1">
            <p>
            Website URL  : {{campaign.website_url}}</p>
          <p>
            Blog Link : {{campaign.blog_url}}
          </p>
          <p>
            Facebook/Meta Link : {{campaign.facebook_url}}
          </p>
          <p>
            Twitter Link : {{campaign.twitter_url}}
          </p>
          <p>
            LinkedIn Link : {{campaign.linkedin_url}}
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