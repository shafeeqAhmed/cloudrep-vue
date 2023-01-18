<template>
  <div>
    <div class="card campaign-cards mt-2 p-2 pt-3 pb-2">
      <div class="campaign-step-one campaign-fields campaign-steps">
        <validation-observer
          ref="stepThirteenForm"
          #default="{ errors }"
        >
          <b-form>
            <b-row>
              <b-col lg="3"></b-col>
              <b-col
                lg="6"
                class="cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Campaign Name"
                  vid="campaign_name"
                  rules="required"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-group class="">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <!-- <h4 class="text-center">Campaign Name :</h4> -->
                      </div>
                      <span
                        class="text-danger"
                        v-if="campaignName.length >= 70"
                        >Max limit reached (70)</span
                      >
                      <div
                        v-else
                        class="lmsInputFieldCounter"
                      >
                        <span v-if="campaignName.length >= 1"
                          ><span>{{ campaignName.length }}</span> / 70</span
                        >
                        <span v-if="campaignName.length < 1">70</span>
                      </div>
                    </div>

                    <div class="input-gradient">
                      <b-form-input
                        id="campaign_name"
                        type="text"
                        v-model="removeSpaces"
                        placeholder="Enter Campaign Name"
                        autocomplete="off"
                        maxLength="70"
                        onkeydown="return (event.keyCode!=13);"
                        v-on:keyup.enter="store()"
                        :disabled="isCampaignNameDisable === 1"
                      />
                      <!-- onkeydown="return (event.keyCode!=13);" -->
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col lg="3"></b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </div>
      <div class="campaign-pagination mt-2">
        <div class="text-right">
          <b-button
            variant="primary"
            class="primary-btn"
            ref="saveCampaignBtn"
            @click="store"
          >
            {{
              $store.state.clientCampaign.campaignUuid == "" ? "Save" : "Update"
            }}</b-button
          >
        </div>
      </div>
    </div>
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
  BFormInput,
  BButton,
  BFormGroup,
  BForm,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BForm,
    required,
  },

  mixins: [toastAlert],
  data() {
    return {
      selectedClient: {},
      campaignName: "",
      isCampaignNameDisable: 0,
    };
  },
  watch: {
    "$route.params.uuid": function (newVal, oldVal) {
      if (!newVal) {
        this.campaignName = "";
      }
    },
    "$store.state.clientCampaign.campaign": function () {
      this.assignCampaignDetail();
    },
  },
  computed: {
    removeSpaces: {
      get() {
        return this.campaignName;
      },
      set(value) {
        this.campaignName = value.trim().replace(/\s+/g, " ");
      },
    },
  },
  methods: {
    store() {
      this.$refs.stepThirteenForm.validate().then((success) => {
        if (success) {
          if (
            this.campaignName ==
            this.$store.state.clientCampaign.campaign.campaign_name
          ) {
            this.$store.commit("clientCampaign/UPDATE_STEP", 2);
            this.isCampaignNameDisable = 0;

            /*    this.conditionalToast(
              "danger",
              "Error",
              "Campaign name already exist.",
              "error"
            ); */
          } else {
            if (this.$store.state.clientCampaign.campaignUuid) {
              this.isCampaignNameDisable = 1;

              this.$store
                .dispatch(`clientCampaign/updateCampaignName`, {
                  campaign_name: this.campaignName,
                  uuid: this.$store.state.clientCampaign.campaignUuid,
                })
                .then((response) => {
                  this.successToast(
                    "Success",
                    "Campaign name update successfully!"
                  );
                  // this.$store.dispatch('clientCampaign/getServices')
                  this.isCampaignNameDisable = 0;

                  this.$store.commit("clientCampaign/UPDATE_STEP", 2);
                  this.$store.dispatch("clientCampaign/getCampaign");
                })
                .catch((error) => {
                  this.conditionalToast(
                    "danger",
                    "Error",
                    error.response.data.message,
                    "error"
                  );

                  this.isCampaignNameDisable = 0;
                });
            }
            if (!this.$store.state.clientCampaign.campaignUuid) {
              this.isCampaignNameDisable = 1;

              this.$store
                .dispatch(`clientCampaign/storeCampaignName`, {
                  campaign_name: this.campaignName,
                  step: 1,
                })
                .then((response) => {
                  this.successToast(
                    "Success",
                    "Campaign name saved successfully!"
                  );
                  // this.$store.dispatch('clientCampaign/getServices')
                  this.$store.commit("clientCampaign/UPDATE_STEP", 2);
                  this.isCampaignNameDisable = 0;
                  this.$store.dispatch("clientCampaign/getCampaign");
                  this.$router.push({
                    path: `/edit-campaign/${this.$store.state.clientCampaign.campaignUuid}`,
                  });
                })
                .catch((error) => {
                  this.conditionalToast(
                    "danger",
                    "Error",
                    error.response.data.message,
                    "error"
                  );

                  this.isCampaignNameDisable = 0;
                });
            }
          }
        }
      });
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign && campaign.campaign_name) {
        this.campaignName =
          campaign.campaign_name != null ? campaign.campaign_name : "";
      }
    },
  },
  created() {
    this.assignCampaignDetail();
  },
};
</script>
