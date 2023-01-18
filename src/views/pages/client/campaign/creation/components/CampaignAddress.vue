<template>
  <div>
    <!-- <div class="p-3 mt-2 card campaignAddressSteps_header">

    </div> -->
    <div class="px-2 py-2 card">
      <div>
        <b-row class="">
          <b-col
            lg="12"
            class="py-2"
          >
            <div class="d-flex align-items-center">
              <b-form-checkbox
                @change="updateAddressTypeOfCampaign"
                name="check-button"
                switch
                v-model="isCsvUpload"
              ></b-form-checkbox>
              <h3 class="mr-2 m-0">CSV Upload</h3>
            </div>
          </b-col>
        </b-row>
      </div>
      <CampaignCsvUpload v-if="isCsvUpload" />
      <CampaignManualAddress v-else />

      <!-- <div class="campaign-pagination mt-2">
        <div class="text-right">
          <b-button variant="primary" class="next-btn" @click="store">Save</b-button>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { BRow, BCol, BFormCheckbox, BButton, BImg } from "bootstrap-vue";
import CampaignManualAddress from "./CampaignManualAddress.vue";
import CampaignCsvUpload from "./CampaignCsvUpload.vue";
import { toastAlert } from "@core/mixins/ui/toast";
export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormCheckbox,
    CampaignManualAddress,
    CampaignCsvUpload,
    BImg,
  },
  mixins: [toastAlert],
  watch: {
    // "isManualAddress": function (newVal, oldValue) {
    //   if(newVal == true){
    //     this.isCsvUpload = false
    //   }
    // },
    // "isCsvUpload": function (newVal, oldValue) {
    //   if(newVal == true){
    //     this.isManualAddress = false
    //   }
    // },
  },
  computed: {
    getCampaignLocation() {
      return this.$store.state.clientCampaign.campaign.campaign_location;
    },
  },
  data() {
    return {
      isCsvUpload: false,
    };
  },
  methods: {
    updateAddressTypeOfCampaign() {
      const data = {
        address_type: this.isCsvUpload == true ? "csv" : "manual",
        campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        step: 12,
      };
      this.$store.dispatch("clientCampaign/updateAddressTypeOfCampaign", data);
      this.$store.dispatch("clientCampaign/getCampaign");
    },
    store() {
      if (!this.isCsvUpload) {
        if (Object.keys(this.getCampaignLocation).length === 0) {
          this.conditionalToast(
            "danger",
            "Error",
            "Please select at least one geo location",
            "error"
          );
        } else {
          this.$store.commit("clientCampaign/UPDATE_STEP", 13);
        }
      }
      if (this.isCsvUpload) {
        this.$store.commit("clientCampaign/UPDATE_STEP", 13);
      }
    },
    redirectBack() {
      if (this.$store.state.clientCampaign.campaign.campaign_rate != null) {
        this.$store.commit("clientCampaign/UPDATE_STEP", 11);
      } else {
        this.$store.commit("clientCampaign/UPDATE_STEP", 10);
      }
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign) {
        this.isCsvUpload = campaign.addressType == "csv" ? true : false;
      }
    },
  },
  created() {
    this.assignCampaignDetail();
  },
};
</script>
