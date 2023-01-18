<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-fields campaign-step-six campaign-steps">
        <validation-observer
          ref="stepSixForm"
          #default="{ errors }"
        >
          <div class="rage-campaign">
            <!-- Client Rates  -->
            <h4>Client</h4>
            <b-row class="mt-3 mb-2 px-2">
              <b-col
                lg="6"
                md="6"
                sm="12"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Cost per call"
                  vid="costPerCall"
                  rules="required"
                >
                  <div class="rage-fields">
                    <div class="range-label-value mb-1">
                      <label
                        for=""
                        class="font-medium-1 font-weight-bold"
                        >Cost per Call</label
                      >
                      <div class="input-gradient">
                        <b-input-group>
                          <b-input-group-append is-text>
                            {{ $store.state.clientCampaign.campaign.currency }}
                          </b-input-group-append>
                          <b-form-input
                            type="number"
                            min="0"
                            max="100"
                            v-model="costPerCall"
                          />
                        </b-input-group>
                      </div>
                    </div>
                  </div>
                  <div class="rage-input">
                    <input
                      class="range-progress range-progress-1"
                      v-model="costPerCall"
                      id="rangevalue1"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                      type="range"
                      min="0"
                      max="100"
                      :style="`background:linear-gradient(to right, #00CBF2 0%, #6E178F ${costPerCall}%, #fff ${costPerCall}%, white 100%)  !important`"
                    />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small
                  ><br />
                  <small
                    class="text-danger"
                    v-if="costPerCall > 100"
                    >Cost per call value must be smaller then $100
                  </small>
                  <small
                    class="text-danger"
                    v-if="costPerCall < 0"
                    >Cost per call value must be greater then $0
                  </small>
                </validation-provider>
              </b-col>
              <b-col
                lg="6"
                md="6"
                sm="12"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Client Duration"
                  vid="duration_client"
                  rules="required"
                >
                  <div class="rage-fields">
                    <div class="range-label-value mb-1">
                      <label
                        for=""
                        class="font-medium-1 font-weight-bold"
                        >Duration</label
                      >
                      <div class="d-flex align-items-center">
                        <div class="input-gradient select-gradient mr-1">
                          <v-select
                            v-model="clientDurationType"
                            label="value"
                            :reduce="(value) => value.value"
                            :options="durationTypes"
                          />
                        </div>
                        <div class="input-gradient">
                          <b-form-input
                            type="number"
                            min="1"
                            max="180"
                            v-model="clientCallPerDuration"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="rage-input">
                      <input
                        type="range"
                        min="1"
                        max="180"
                        step="1"
                        id="duration_client"
                        v-model="clientCallPerDuration"
                        class="range-progress range-progress-2"
                        :style="`background:linear-gradient(to right, #00CBF2 0%, #6E178F ${rangeWidth}%, #fff ${rangeWidth}%, white 100%)  !important`"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small
                    ><br />
                    <small
                      class="text-danger"
                      v-if="clientCallPerDuration > 180"
                      >Duration(Client) must be smaller then 180 seconds.
                    </small>
                    <small
                      class="text-danger"
                      v-if="clientCallPerDuration < 1"
                      >Duration(Client) must be greater then 1
                    </small>
                  </div>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- End Client Rates  -->

            <h4>Publisher</h4>
            <b-row class="mt-3 mb-2 px-2">
              <b-col
                lg="6"
                md="6"
                sm="12"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Payout Per Call"
                  vid="install"
                  rules="required"
                >
                  <div class="rage-fields">
                    <div class="range-label-value mb-1">
                      <label
                        for=""
                        class="font-medium-1 font-weight-bold"
                        >Payout Per Call
                      </label>
                      <div class="input-gradient">
                        <b-input-group>
                          <!--    <b-input-group-append is-text>
                            <feather-icon
                              icon="DollarSignIcon"
                              size="21"
                              v-if="
                                $store.state.clientCampaign.campaign.currency ==
                                'Dollar'
                              "
                            />
                            <span
                              v-if="
                                $store.state.clientCampaign.campaign.currency ==
                                'Rs'
                              "
                              >Rs</span
                            >
                            <span
                              v-if="
                                $store.state.clientCampaign.campaign.currency ==
                                'Dirham'
                              "
                              >AED</span
                            >
                            <span
                              v-if="
                                $store.state.clientCampaign.campaign.currency ==
                                'Euro'
                              "
                              ><svg
                                style="width: 24px; height: 24px"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M15 18.5C12.5 18.5 10.32 17.08 9.24 15H15L16 13H8.58C8.53 12.67 8.5 12.34 8.5 12S8.53 11.33 8.58 11H15L16 9H9.24C10.32 6.92 12.5 5.5 15 5.5C16.61 5.5 18.09 6.09 19.23 7.07L21 5.3C19.41 3.87 17.3 3 15 3C11.08 3 7.76 5.5 6.5 9H3L2 11H6.06C6 11.33 6 11.66 6 12S6 12.67 6.06 13H3L2 15H6.5C7.76 18.5 11.08 21 15 21C17.31 21 19.41 20.13 21 18.7L19.22 16.93C18.09 17.91 16.62 18.5 15 18.5Z"
                                /></svg
                            ></span>
                          </b-input-group-append> -->

                          <b-input-group-append is-text>
                            {{ $store.state.clientCampaign.campaign.currency }}
                          </b-input-group-append>

                          <b-form-input
                            type="number"
                            min="0"
                            max="100"
                            v-model="payoutPerCall"
                          />
                        </b-input-group>
                      </div>
                    </div>
                    <div class="rage-input">
                      <input
                        class="range-progress range-progress-3"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        id="install"
                        v-model="payoutPerCall"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                        :style="`background:linear-gradient(to right, #00CBF2 0%, #6E178F ${payoutPerCall}%, #fff ${payoutPerCall}%, white 100%)  !important`"
                      />
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small
                    ><br />
                    <small
                      class="text-danger"
                      v-if="payoutPerCall > 100"
                      >Payout per call must be smaller then $100.
                    </small>
                    <small
                      class="text-danger"
                      v-if="payoutPerCall < 0"
                      >Payout per call value must be greater then $0
                    </small>
                  </div>
                </validation-provider>
              </b-col>
              <b-col
                lg="6"
                md="6"
                sm="12"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Publisher Duration"
                  vid="duration_publisher"
                  rules="required"
                >
                  <div class="rage-fields">
                    <div class="range-label-value mb-1">
                      <label
                        for=""
                        class="font-medium-1 font-weight-bold"
                        >Duration</label
                      >
                      <div class="d-flex align-items-center">
                        <div class="input-gradient select-gradient mr-1">
                          <v-select
                            class="IvrNodeVSelect"
                            v-model="publisherDurationType"
                            label="value"
                            :reduce="(value) => value.value"
                            :options="durationTypes"
                          >
                          </v-select>
                        </div>
                        <div class="input-gradient">
                          <b-form-input
                            type="number"
                            min="1"
                            max="180"
                            v-model="publisherPerCallDuration"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="rage-input">
                      <input
                        type="range"
                        v-model="publisherPerCallDuration"
                        id="duration_publisher"
                        min="1"
                        max="180"
                        step="1"
                        class="range-progress range-progress-4"
                        :style="`background:linear-gradient(to right, #00CBF2 0%, #6E178F ${rangeWidthPublisher}%, #fff ${rangeWidthPublisher}%, white 100%)  !important`"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small
                    ><br />
                    <small
                      class="text-danger"
                      v-if="publisherPerCallDuration > 180"
                      >Duration(publisher) must be smaller then 180 seconds.
                    </small>
                    <small
                      class="text-danger"
                      v-if="publisherPerCallDuration < 1"
                      >Duration(publisher) must be greater then 1
                    </small>
                  </div>
                </validation-provider>
              </b-col>
            </b-row>
            <h4>Agent</h4>
            <b-row class="mt-3 mb-2 px-2">
              <b-col
                cols="12"
                class="custom-control-input-hide mb-1"
              >
                <div class="d-flex align-items-center">
                  <b-form-checkbox
                    v-model="agentCheck"
                    @change="changeAgent"
                    name="agent_check"
                    switch
                    inline
                  >
                  </b-form-checkbox>

                  <h5 class="roleCenter m-0 mr-2">
                    Are Agent part of this campaign?
                  </h5>
                </div>
              </b-col>
              <b-col
                lg="6"
                md="6"
                sm="12"
                v-if="agentCheck == true"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Agent Campaign Rate"
                  vid="agentCampaignRate"
                  rules="required"
                >
                  <div class="rage-fields">
                    <div class="range-label-value mb-1">
                      <label
                        for=""
                        class="font-medium-1 font-weight-bold"
                        >Campaign Rate
                      </label>
                      <div class="input-gradient">
                        <b-input-group>
                          <b-input-group-append is-text>
                            {{ $store.state.clientCampaign.campaign.currency }}
                          </b-input-group-append>
                          <b-form-input
                            type="number"
                            v-model="campaignRate"
                          />
                        </b-input-group>
                      </div>
                    </div>
                    <div class="rage-input">
                      <input
                        class="range-progress range-progress-3"
                        id="agentCampaignRate"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        v-model="campaignRate"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                        :style="`background:linear-gradient(to right, #00CBF2 0%, #6E178F ${campaignRate}%, #fff ${campaignRate}%, white 100%)  !important`"
                      />
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small
                    ><br />
                    <small
                      class="text-danger"
                      v-if="campaignRate > 100"
                      >Payout per call must be smaller then $100.</small
                    >
                    <small
                      class="text-danger"
                      v-if="campaignRate < 1"
                      >Campaign rate must be greater then 1
                    </small>
                  </div>
                </validation-provider>
              </b-col>
            </b-row>
          </div>
        </validation-observer>

        <div class="text-right">
          <b-button
            variant="primary"
            class="next-btn"
            @click="store"
            >{{
              checkRate($store.state.clientCampaign.campaign.cost_per_call)
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
  BFormFile,
  BFormCheckbox,
  BInputGroup,
  BInputGroupAppend,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
// import useUploadImage from "@/views/pages/lms/useUploadImage";
import { client } from "@/navigation/vertical";
import vSelect from "vue-select";

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
    BFormFile,
    required,
    BFormCheckbox,
    vSelect,
    BInputGroup,
    BInputGroupAppend,
  },

  mixins: [toastAlert],
  data() {
    return {
      costPerCall: 0,
      clientCallPerDuration: 0,
      payoutPerCall: 0,
      publisherPerCallDuration: 0,
      campaignRate: 0,
      airTime: 0,
      agentCheck: false,
      durationTypes: [
        { key: 1, value: "Seconds" },
        { key: 2, value: "Minutes" },
        { key: 3, value: "Hours" },
      ],
      clientDurationType: "Seconds",
      publisherDurationType: "Seconds",
      rangeWidth: 0,
      rangeWidthPublisher: 0,
    };
  },
  watch: {
    "$store.state.clientCampaign.userDetail": function (newVal, oldVal) {
      this.asssignUserDetail(newVal);
    },
    clientCallPerDuration: function (newValue, oldValue) {
      this.rangeWidth = (newValue / 180) * 100;
    },
    publisherPerCallDuration: function (newValue, oldValue) {
      this.rangeWidthPublisher = (newValue / 180) * 100;
    },
  },
  methods: {
    checkRate(costCall) {
      if (costCall === null || costCall === "") {
        return "Save";
      } else {
        return "Update";
      }
    },
    changeAgent(e) {
      this.$store.commit("clientCampaign/UPDATE_CAMPAIGN_RATE", e);
      const { campaignUuid } = this.$store.state.clientCampaign;
      const params = {
        type: "is_agent",
        uuid: campaignUuid,
        value: e,
      };
      this.$store
        .dispatch("clientCampaign/updateCampaignSettings", params)
        .then(() => {
          this.$store.dispatch("clientCampaign/getCampaign");
        });
    },
    store() {
      //Campaign Rates Validation
      if (
        this.clientDurationType == null ||
        this.publisherDurationType == null
      ) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please Select Duration Type!",
          "error"
        );
        return false;
      }
      if (
        this.costPerCall < 0 ||
        this.clientCallPerDuration < 0 ||
        this.payoutPerCall < 0 ||
        this.publisherPerCallDuration < 0 ||
        this.campaignRate < 0
      ) {
        return false;
      }
      if (
        this.costPerCall > 100 ||
        this.clientCallPerDuration > 180 ||
        this.payoutPerCall > 100 ||
        this.publisherPerCallDuration > 180 ||
        this.campaignRate > 100
      ) {
        return false;
      }
      if (this.costPerCall <= this.payoutPerCall) {
        this.conditionalToast(
          "danger",
          "Error",
          "Cost Per Call must be greater then Payout Per Call!",
          "error"
        );
        return false;
      }
      const ccpd = this.clientCallPerDuration;
      const ppcd = this.publisherPerCallDuration;
      if (!this.isInt(ccpd) || !this.isInt(ppcd)) {
        if (!this.isInt(ccpd)) {
          this.conditionalToast(
            "danger",
            "Error",
            "Client call per duration must be integer!",
            "error"
          );
        }
        if (!this.isInt(ppcd)) {
          this.conditionalToast(
            "danger",
            "Error",
            "Publisher call per duration must be integer!",
            "error"
          );
        }
        return false;
      }
      //End Validations

      this.$refs.stepSixForm.validate().then((success) => {
        if (success) {
          const params = {
            campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
            user_uuid: this.$store.state.clientCampaign.campaign.user_uuid,
            cost_per_call: this.costPerCall,
            client_duration_type: this.clientDurationType,
            client_per_call_duration: this.clientCallPerDuration,
            payout_per_call: this.payoutPerCall,
            publisher_per_call_duration: this.publisherPerCallDuration,
            publisher_duration_type: this.publisherDurationType,
            campaign_rate: this.agentCheck == true ? this.campaignRate : null,
            // ear_time: this.airTime,
            step: 8,
          };
          this.$store
            .dispatch(`clientCampaign/storeCampaignRates`, params)
            .then((response) => {
              // console.log(response)
              if (response.data.status) {
                this.conditionalToast(
                  "success",
                  "Success",
                  "Campaign Rates has been updated successfully!",
                  "success"
                );
                this.$store.dispatch("clientCampaign/getCampaign");
              }
            })
            .catch((error) => {
              console.log(error.response.data.errors);
              this.$refs.stepSixForm.setErrors(error.response.data.errors);
            });
        }
      });
    },

    asssignUserDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign) {
        const {
          cost_per_call,
          client_per_call_duration,
          publisher_per_call_duration,
          payout_per_call,
          // ear_time,
          campaign_rate,
          client_duration_type,
          publisher_duration_type,
        } = campaign;
        this.costPerCall = cost_per_call ? cost_per_call : 25;
        this.clientCallPerDuration = client_per_call_duration
          ? client_per_call_duration
          : 30;
        this.payoutPerCall = payout_per_call ? payout_per_call : 20;
        this.publisherPerCallDuration = publisher_per_call_duration
          ? publisher_per_call_duration
          : 30;
        this.campaignRate = campaign_rate ? campaign_rate : 25;
        this.clientDurationType = client_duration_type
          ? client_duration_type
          : "Seconds";
        this.publisherDurationType = publisher_duration_type
          ? publisher_duration_type
          : "Seconds";
        // this.airTime = ear_time ? ear_time : 30;
        if (campaign_rate) {
          this.agentCheck = true;
        }
      }
    },
    isInt(value) {
      return (
        !isNaN(value) &&
        (function (x) {
          return (x | 0) === x;
        })(parseFloat(value))
      );
    },
  },
  created() {
    this.asssignUserDetail();
  },
};
</script>
