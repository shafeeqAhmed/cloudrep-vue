<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div class="upp-header">
          <div class="upp-img">
            <b-img
              class="w-100"
              src="@/assets/images/campaign-img/bghead.png"
            ></b-img>
          </div>
          <div class="upp-heading">
            <h1>Create Campaign</h1>
            <!-- <p>Enter the Campaign Name</p> -->
          </div>
        </div>

        <b-col class="campn-content mt-2 mb-5">
          <b-row class="mb-1">
            <b-col cols="12">
              <div class="float-right text-right">
                <!-- <b-button variant="primary" class="mr-1" @click="expandTab">Expand </b-button>
                <b-button variant="primary" class="mr-1" @click="closeTab">Close </b-button> -->
                <b-button
                  variant="primary"
                  class="next-btn"
                  @click="storeCampaignPublish"
                  >Publish Campaign</b-button
                >
              </div>
            </b-col>
          </b-row>
          <!-- Campaign Name -->
          <step-header
            heading="Campaign Name"
            name="name"
            @toggleTab="updateCollapse"
            class="camp_req"
          />
          <b-collapse
            v-model="campaignStep.name"
            class="p-1"
          >
            <campaign-name />
          </b-collapse>

          <!-- Services -->
          <step-header
            heading="Services"
            name="services"
            @toggleTab="updateCollapse"
            class="camp_not_req"
          />
          <b-collapse
            v-model="campaignStep.services"
            class="p-1"
          >
            <Services v-if="campaignStep.services" />
          </b-collapse>

          <!-- Client Information -->
          <step-header
            heading="Client Information "
            name="clientInformation"
            @toggleTab="updateCollapse"
            class="camp_req"
          />
          <b-collapse
            v-model="campaignStep.clientInformation"
            class="p-1"
          >
            <ClientInformation v-if="campaignStep.clientInformation" />
          </b-collapse>

          <!-- Client Address -->
          <step-header
            heading="Client Address"
            name="clientAddress"
            @toggleTab="updateCollapse"
            class="camp_not_req"
          />
          <b-collapse
            v-model="campaignStep.clientAddress"
            class="p-1"
          >
            <client-address v-if="campaignStep.clientAddress" />
          </b-collapse>

          <!-- Business Category & Verticals -->
          <step-header
            class="camp_not_req"
            heading="Business Category & Verticals"
            name="bussinessCategoryAndVertical"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.bussinessCategoryAndVertical"
            class="p-1"
          >
            <business-category-vertical
              v-if="campaignStep.bussinessCategoryAndVertical"
            />
          </b-collapse>

          <!-- Business Category & Verticals -->
          <step-header
            class="camp_not_req"
            heading="Date & Time"
            name="campaignDateTime"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.campaignDateTime"
            class="p-1"
          >
            <date-and-time v-if="campaignStep.campaignDateTime" />
          </b-collapse>

          <!-- Social Links -->
          <step-header
            class="camp_not_req"
            heading="Social Links"
            name="socialLinks"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.socialLinks"
            class="p-1"
          >
            <social-links v-if="campaignStep.socialLinks" />
          </b-collapse>

          <!-- Campaign Rates -->
          <step-header
            class="camp_req"
            heading="Rates"
            name="campaignRates"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.campaignRates"
            class="p-1"
          >
            <campaign-rates v-if="campaignStep.campaignRates" />
          </b-collapse>

          <!-- Campaign Images -->
          <step-header
            class="camp_not_req"
            heading="Images"
            name="campaignImages"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.campaignImages"
            class="p-1"
          >
            <campaign-images v-if="campaignStep.campaignImages" />
          </b-collapse>

          <!-- Campaign Add LMS -->
          <step-header
            class="camp_not_req"
            heading="Add LMS"
            name="campaignAndLms"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.campaignAndLms"
            class="p-1"
          >
            <campaign-add-lms v-if="campaignStep.campaignAndLms" />
          </b-collapse>

          <!-- Campaign Agent Payout Setting -->
          <step-header
            class="camp_not_req"
            heading="Agent Payout Settings"
            name="agentPayoutSetting"
            @toggleTab="updateCollapse"
            v-if="$store.state.clientCampaign.campaign.is_agent_include == 1"
          />
          <b-collapse
            v-model="campaignStep.agentPayoutSetting"
            class="p-1"
            v-if="$store.state.clientCampaign.campaign.is_agent_include == 1"
          >
            <agent-payout-settings v-if="campaignStep.agentPayoutSetting" />
          </b-collapse>

          <!-- Campaign Addresses -->
          <step-header
            class="camp_not_req"
            heading="Campaign Addresses"
            name="campaignAddress"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.campaignAddress"
            class="p-1"
          >
            <campaign-address v-if="campaignStep.campaignAddress" />
          </b-collapse>

          <!-- Campaign Target & Routing -->
          <step-header
            class="camp_req"
            heading="Target & Routing"
            name="targetsAndRoutings"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.targetsAndRoutings"
            class="p-1"
          >
            <targets-and-routings v-if="campaignStep.targetsAndRoutings" />
          </b-collapse>

          <!-- Campaign Manage Publisher -->
          <step-header
            class="camp_req"
            heading="Manage Publisher"
            name="managePublishers"
            @toggleTab="updateCollapse"
          />
          <b-collapse
            v-model="campaignStep.managePublishers"
            class="p-1"
          >
            <campaign-publisher v-if="campaignStep.managePublishers" />
          </b-collapse>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BCollapse,
  VBToggle,
  BButton,
} from "bootstrap-vue";
import { toastAlert } from "@core/mixins/ui/toast";

import store from "./store";
import campaignHeader from "./components/campaignHeader.vue";
import campaignCreationNav from "./components/campaignCreationNav.vue";
import StepHeader from "./components/StepHeader.vue";

import CampaignName from "./components/CampaignName.vue"; //Campaign Name
import Services from "./components/Services.vue";
import ClientInformation from "./components/ClientInformation.vue";
import ClientAddress from "./components/ClientAddress.vue";
import BusinessCategoryVertical from "./components/BusinessCategoryVertical.vue";
import DateAndTime from "./components/DateAndTime.vue";
import SocialLinks from "./components/SocialLinks.vue";
import CampaignRates from "./components/CampaignRates.vue";
import CampaignAirTime from "./components/CampaignAirTime.vue";
import CampaignImages from "./components/CampaignImages.vue";
import CampaignAddLms from "./components/CampaignAddLms.vue";
import AgentPayoutSettings from "./components/AgentPayoutSettings.vue";
import StepTwelve from "./components/StepTwelve.vue";
import CampaignAddress from "./components/CampaignAddress.vue"; //Campaign Address
import TargetsAndRoutings from "./components/TargetsAndRoutings.vue"; //Campaign Target & Routing
import CampaignPublisher from "./components/publishers/list/index.vue";
import CampaignSuccessMessage from "./components/CampaignSuccessMessage.vue";

export default {
  components: {
    campaignHeader,
    campaignCreationNav,
    CampaignName,
    Services,
    ClientInformation,
    ClientAddress,
    BusinessCategoryVertical,
    DateAndTime,
    SocialLinks,
    CampaignRates,
    CampaignAirTime,
    CampaignImages,
    CampaignAddLms,
    AgentPayoutSettings,
    StepTwelve,
    CampaignAddress,
    TargetsAndRoutings,
    CampaignPublisher,
    CampaignSuccessMessage,
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BCollapse,
    VBToggle,
    StepHeader,
    BButton,
  },
  directives: {
    "b-toggle": VBToggle,
  },
  mixins: [toastAlert],

  data() {
    return {
      campaignStep: {
        name: true,
        services: false,
        clientInformation: false,
        clientAddress: false,
        bussinessCategoryAndVertical: false,
        campaignDateTime: false,
        socialLinks: false,
        campaignRates: false,
        campaignImages: false,
        campaignAndLms: false,
        agentPayoutSetting: false,
        campaignAddress: false,
        targetsAndRoutings: false,
        managePublishers: false,
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.clientCampaign.step;
    },
  },
  watch: {
    "$route.params.uuid": function (newVal, oldVal) {
      if (!newVal) {
        this.$store.commit("clientCampaign/RESET_STATE");
        this.resetTabs();
      }
    },
  },
  methods: {
    expandTab() {
      const steps = Object.keys(this.campaignStep);
      steps.forEach((key) => {
        this.campaignStep[key] = true;
      });
    },
    closeTab() {
      const steps = Object.keys(this.campaignStep);
      steps.forEach((key) => {
        this.campaignStep[key] = false;
      });
    },
    updateCollapse(name) {
      const { campaignUuid } = this.$store.state.clientCampaign;
      const clientID = this.$store.state.clientCampaign.campaign?.user_uuid;

      // if campaign first step completed then user can move further
      if (
        (typeof campaignUuid === "string" && campaignUuid.length > 0) ||
        name == "name"
      ) {
        if (!["name", "services", "clientInformation"].includes(name)) {
          if (clientID) {
            return (this.campaignStep[name] = !this.campaignStep[name]);
          } else {
            this.customAlert("Please fill the client information first.");
          }
        } else {
          return (this.campaignStep[name] = !this.campaignStep[name]);
        }
      } else {
        this.customAlert("Please fill the first step of campaign.");
      }
    },
    getEditedRecord() {
      this.$store.commit("clientCampaign/RESET_STATE");
      const uuid = this.$route.params.uuid;
      // const uuid = this.$route.query.hasOwnProperty("campaign");
      if (uuid) {
        this.$store.commit(
          "clientCampaign/UPDATE_CAMPAIGN_UUID",
          // this.$route.query.campaign
          uuid
        );
        this.$store.dispatch("clientCampaign/getCampaign").then(() => {});
      } else {
        this.$store.commit("clientCampaign/RESET_STATE");
      }
    },
    storeCampaignPublish() {
      if (this.$store.state.clientCampaign.campaignUuid) {
        this.$store
          .dispatch(
            "clientCampaign/storeCampaignPublish",
            this.$store.state.clientCampaign.campaignUuid
          )
          .then(() => {
            return this.$router.push({ name: "success-campaign" });
          });
      } else {
        this.customAlert("Please fill the first step of campaign.");
      }
    },
    customAlert(message) {
      this.conditionalToast("warning", "Warning", message, "custom");
    },
    resetTabs() {
      this.campaignStep.name = true;
      this.campaignStep.services = false;
      this.campaignStep.clientInformation = false;
      this.campaignStep.clientAddress = false;
      this.campaignStep.bussinessCategoryAndVertical = false;
      this.campaignStep.campaignDateTime = false;
      this.campaignStep.socialLinks = false;
      this.campaignStep.campaignRates = false;
      this.campaignStep.campaignImages = false;
      this.campaignStep.campaignAndLms = false;
      this.campaignStep.agentPayoutSetting = false;
      this.campaignStep.campaignAddress = false;
      this.campaignStep.targetsAndRoutings = false;
      this.campaignStep.managePublishers = false;
    },
  },
  created() {
    const APP_STORE_MODULE_NAME = "clientCampaign";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, store);
    }
    // this.$store.dispatch("clientCampaign/searchUser", { q: "" });
    this.getEditedRecord();

    // this.$store.dispatch('clientCampaign/getServices')
  },
  destroyed() {
    // UnRegister on leave
    const APP_STORE_MODULE_NAME = "clientCampaign";
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};
</script>
