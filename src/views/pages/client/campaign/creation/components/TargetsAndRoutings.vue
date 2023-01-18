<template>
  <div>
    <div class="card pb-2 px-2">
      <b-row class="">
        <b-col
          lg="12"
          class="py-2"
        >
          <div class="d-flex align-items-center">
            <b-form-checkbox
              @change="updateRoutingTypeOfCampaign"
              name="check-button"
              switch
              v-model="isIvrListing"
            ></b-form-checkbox>
            <h3 class="mr-2 m-0">IVR Routing</h3>
          </div>
        </b-col>
      </b-row>
      <div
        class="py-2"
        v-if="!isIvrListing"
      >
        <!-- <hr class="mb-3" /> -->
        <target-listing />
        <hr class="mb-3" />
        <RoutingPlans />
        <hr class="" />
      </div>
      <div
        class="py-2"
        v-if="isIvrListing"
      >
        <b-row>
          <b-col lg="6">
            <div class="input-gradient">
              <v-select
                :searchable="false"
                placeholder="Select an route"
                v-model="ivrRoute"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="ivrRouteList"
                label="name"
                :reduce="(name) => name.uuid"
                class="v-sel-sty"
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <div
        class="campaign-pagination text-right mt-3"
        v-if="isIvrListing"
      >
        <b-button
          variant="primary"
          class="next-btn"
          @click="store"
          >Save</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { BRow, BCol, BFormCheckbox, BButton, BImg } from "bootstrap-vue";
import StepEleven from "./AgentPayoutSettings.vue";
import StepTwelve from "./StepTwelve.vue";
import TargetListing from "./client/target/Index.vue";
import RoutingPlans from "./client/routing-plans/index.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormCheckbox,
    StepEleven,
    StepTwelve,
    TargetListing,
    RoutingPlans,
    BImg,
    vSelect,
  },
  mixins: [toastAlert],

  computed: {
    getCampaignLocation() {
      return this.$store.state.clientCampaign.campaign.campaign_location;
    },
  },
  data() {
    return {
      isStandardListing: false,
      isIvrListing: false,
      ivrRouteList: [],
      ivrRoute: "",
      // isActive: false
    };
  },
  methods: {
    updateRoutingTypeOfCampaign() {
      const data = {
        routing_type: this.isIvrListing == true ? "ivr" : "standard",
        campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        step: 13,
      };
      this.$store.dispatch("clientCampaign/updateRoutingTypeOfCampaign", data);
    },
    store() {
      if (this.isIvrListing) {
        const data = {
          ivr_uuid: this.ivrRoute,
          campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        };

        this.$store
          .dispatch("clientCampaign/assignIvrCampaign", data)
          .then(() => {
            this.$store.commit("clientCampaign/UPDATE_STEP", 14);
            this.$store.dispatch("clientCampaign/getCampaign");
          });
      } else {
        this.updateRoutingTypeOfCampaign();
        this.$store.commit("clientCampaign/UPDATE_STEP", 14);
      }
    },

    getIvrRouteListing() {
      this.$http
        .get("ivrs")
        .then((response) => {
          const {
            data: {
              data: { data },
            },
          } = response;
          this.ivrRouteList = data;
          // console.log(this.ivrRouteList)
          const { campaign } = this.$store.state.clientCampaign;
          if (campaign.ivr_id) {
            this.ivrRouteList.forEach((element) => {
              if (element.id == campaign.ivr_id) {
                // console.log('element.id', element.id)
                // console.log('campaign.ivr_id', campaign.ivr_id)
                this.ivrRoute = element.uuid;
              }
            });
          }
        })
        .catch((error) => {
          this.conditionalToast(
            "danger",
            "Error",
            "something is going wrong",
            "error"
          );
        });
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign) {
        this.isIvrListing = campaign.routing == "ivr" ? true : false;
      }
    },
  },
  created() {
    this.getIvrRouteListing();
    this.assignCampaignDetail();
  },
};
</script>
