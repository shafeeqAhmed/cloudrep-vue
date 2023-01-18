<template>
  <div>
    <div class="user-management">
      <div class="upp-header">
        <br />
        <h2>Top Performers</h2>
      </div>

      <div class="mt-1">
        <b-tabs
          pills
          class="tabs-cr"
        >
          <b-tab
            title="Publishers"
            class=""
            :active="tabName == 'publisher'"
          >
            <!-- table -->
            <publisher-list />
          </b-tab>

          <b-tab
            title="Campaigns"
            class=""
            :active="tabName == 'campaign'"
          >
            <!-- table -->
            <campaign-list />
          </b-tab>

          <b-tab
            title="Targets"
            class=""
            :active="tabName == 'target'"
          >
            <!-- table -->
            <target-list />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { BTabs, BTab } from "bootstrap-vue";
import PublisherList from "./publisher/PublisherList.vue";
import CampaignList from "./campaign/CampaignList.vue";
import TargetList from "./target/TargetList.vue";

export default {
  components: {
    BTabs,
    BTab,
    PublisherList,
    CampaignList,
    TargetList,
  },
  data() {
    return {
      selectedDate: null,
      tabName: "",
      sortDirection: "asc",
      filterOn: [],
    };
  },
};
</script>
