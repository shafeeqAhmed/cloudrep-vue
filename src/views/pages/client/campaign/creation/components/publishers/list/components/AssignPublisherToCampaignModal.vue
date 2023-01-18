<template>
  <div>
    <b-modal
      id="add-publisher"
      centered
      modal-class="modal-number"
      hide-header
      hide-footer
      @hide="hide"
    >
      <validation-observer
        ref="assginPublisherToCampaign"
        #default="{ invalid }"
      >
        <b-form>
          <b-row class="mt-3 mb-2">
            <b-col cols="12">
              <h2>Assign Publisher</h2>
            </b-col>
          </b-row>
          <b-row class="align-items-center mb-1">
            <b-col cols="4">
              <div class="d-flex align-items-center">
                <label for="">Campaign Name</label>
                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="8">
              <label for=""> {{ campaignName }}</label>
            </b-col>
          </b-row>

          <b-row class="align-items-center mb-1">
            <b-col cols="4">
              <div class="d-flex align-items-center">
                <label for="">Publisher</label>

                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="8">
              <validation-provider
                #default="{ errors }"
                name="Publisher"
                vid="publisher"
                rules="required"
              >
                <div class="input-gradient">
                  <v-select
                    id="publisher"
                    v-model="record.publisher_uuid"
                    :options="publishers"
                    label="label"
                    :reduce="(publisher) => publisher.publisher_uuid"
                    placeholder="Select Publisher"
                    @input="selectedPublisher"
                  ></v-select>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row
            class="align-items-center mb-1"
            v-if="is_assigned_numbers"
          >
            <b-col cols="4">
              <div class="d-flex align-items-center">
                <label for="">Assigned Numbers</label>

                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="8">
              <validation-provider
                #default="{ errors }"
                name="Assigned Number"
                vid="assign_number"
                rules="required"
              >
                <div class="input-gradient">
                  <v-select
                    id="assign_number"
                    v-model="record.number_uuid"
                    :options="assignedPublisherNumber"
                    label="number"
                    :reduce="(number) => number.number_uuid"
                    placeholder="Select Number"
                  ></v-select>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>

          <div
            ref="create_number"
            v-if="isCreateNumber"
          >
            <b-row class="mt-3 mb-2">
              <b-col cols="12">
                <h2>Create Number</h2>
                <p>
                  When your balance falls below the selected balance we'll
                  automatically refill your account to prevent any service
                  interruption
                </p>
              </b-col>
            </b-row>
            <b-row class="align-items-center mb-1">
              <b-col cols="4">
                <div class="d-flex align-items-center">
                  <label for="">Country</label>
                  <feather-icon
                    icon="HelpCircleIcon"
                    size="20"
                    class="ml-1 cursor-pointer"
                  />
                </div>
              </b-col>
              <b-col cols="8">
                <b-form-group class="">
                  <validation-provider
                    #default="{ errors }"
                    name="Country"
                    vid="country"
                    rules="required"
                  >
                    <label class="font-medium-1 font-weight-bold"
                      >Country</label
                    >
                    <div class="input-gradient">
                      <v-select
                        id="country"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="countries"
                        :reduce="(country) => country.code"
                        label="name"
                        v-model="record.country"
                        placeholder="Select Your Country"
                        class="v-sel-sty"
                      />
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="align-items-center mb-1">
              <b-col cols="4">
                <div class="d-flex align-items-center">
                  <label for="">Bill Card</label>
                  <feather-icon
                    icon="HelpCircleIcon"
                    size="20"
                    class="ml-1 cursor-pointer"
                  />
                </div>
              </b-col>
              <b-col cols="8">
                <b-form-checkbox
                  checked="false"
                  switch
                  v-model="record.bill_card"
                ></b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="align-items-center mb-1">
              <b-col cols="4">
                <div class="d-flex align-items-center">
                  <label for="">Number Type</label>
                  <feather-icon
                    icon="HelpCircleIcon"
                    size="20"
                    class="ml-1 cursor-pointer"
                  />
                </div>
              </b-col>
              <b-col cols="8">
                <b-button-group>
                  <b-button
                    @click="type('local')"
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    :class="record.type == 'local' ? 'btn-primary' : ''"
                    >Local
                  </b-button>
                  <b-button
                    @click="type('mobile')"
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    :class="record.type == 'mobile' ? 'btn-primary' : ''"
                  >
                    Mobile
                  </b-button>
                  <b-button
                    @click="type('tollFree')"
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    :class="record.type == 'tollFree' ? 'btn-primary' : ''"
                  >
                    Toll Free</b-button
                  >
                </b-button-group>
              </b-col>
            </b-row>
            <b-row class="align-items-center mb-1">
              <b-col cols="4">
                <div class="d-flex align-items-center">
                  <label for="">Prefix</label>
                  <feather-icon
                    icon="HelpCircleIcon"
                    size="20"
                    class="ml-1 cursor-pointer"
                  />
                </div>
              </b-col>
              <b-col cols="8">
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="Prefix"
                    vid="prefix"
                  >
                    <div class="input-gradient">
                      <b-form-input
                        id="prefix"
                        v-model="record.prefix"
                        placeholder="Enter Prefix"
                      >
                      </b-form-input>
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="align-items-center mb-1">
              <b-col cols="4">
                <div class="d-flex align-items-center">
                  <label for="">Amount</label>
                  <feather-icon
                    icon="HelpCircleIcon"
                    size="20"
                    class="ml-1 cursor-pointer"
                  />
                </div>
              </b-col>
              <b-col cols="8">
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="Amount"
                    vid="amount"
                  >
                    <div class="input-gradient">
                      <b-form-input
                        id="amount"
                        v-model="record.amount"
                        placeholder="Enter Amount"
                      >
                      </b-form-input>
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="12">
                <b-button
                  class="secondary-btn w-100"
                  @click="createNumberAgainstPublisher"
                  >Create Number</b-button
                >
              </b-col>
            </b-row>
          </div>
        </b-form>
      </validation-observer>

      <b-row class="mt-2">
        <b-col cols="12">
          <b-button
            class="secondary-btn w-100"
            ref="add-publisher-btn"
            @click="assignPublisherToNumber"
            :disabled="is_disabled == 1"
            >Submit</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BForm,
  BButtonGroup,
  BFormCheckbox,
} from "bootstrap-vue";

import { globalHelper } from "@core/mixins/ui/global";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Ripple from "vue-ripple-directive";

export default {
  props: ["getPublishersForAssignToCampaign", "refetchData"],
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormSelect,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    BFormCheckbox,
    BButtonGroup,
  },
  directives: {
    Ripple,
  },
  mixins: [globalHelper],
  computed: {
    publishers() {
      return this.$store.state.clientCampaign.publishersForAssignToCampaign;
    },
    campaignName() {
      return this.$store.state.clientCampaign.campaign.campaign_name;
    },
    countries() {
      return this.$store.state.clientCampaign.countries;
    },
    assignedPublisherNumber() {
      return this.$store.state.clientCampaign.assignedPublisherNumbers;
    },
  },
  data() {
    return {
      record: {
        number_uuid: "",
        campaign_uuid: "",
        publisher_uuid: "",
        country: "US",
        bill_card: true,
        type: "local",
        prefix: "",
        amount: "",
      },
      isCreateNumber: 0,
      is_disabled: 1,
      is_assigned_numbers: 0,
    };
  },

  methods: {
    type(val) {
      this.record.type = val;
    },
    hide() {
      this.isCreateNumber = 0;
      this.is_disabled = 1;
      this.is_assigned_numbers = 0;
      this.record.publisher_uuid = "";
      this.record.number_uuid = "";
    },
    createNumberAgainstPublisher() {
      this.$store
        .dispatch("clientCampaign/buyTwilioNumber", this.record)
        .then((res) => {
          const {
            data: { data, status },
          } = res;

          if (status == true) {
            this.showAssignedNumbers(this.record.publisher_uuid, data.uuid);
          }
        });
    },
    assignPublisherToNumber() {
      this.$refs.assginPublisherToCampaign.validate().then((success) => {
        if (success) {
          this.record.campaign_uuid =
            this.$store.state.clientCampaign.campaignUuid;

          this.$store
            .dispatch("clientCampaign/assignPublisherToCampaign", this.record)
            .then((res) => {
              this.record.publisher_uuid = "";
              this.record.number_uuid = "";
              this.is_assigned_numbers = 0;
              this.getPublishersForAssignToCampaign();
              this.refetchData();
              this.$bvModal.hide("add-publisher");
            });
        }
      });
    },
    showAssignedNumbers(publisher_uuid, number_uuid = "") {
      this.record.number_uuid = "";
      this.$store
        .dispatch("clientCampaign/getAssignedPublisherNumbers", publisher_uuid)
        .then(() => {
          setTimeout(() => {
            if (this.assignedPublisherNumber.length == 0) {
              this.isCreateNumber = 1;
              this.is_assigned_numbers = 0;
              this.is_disabled = 1;
            } else {
              this.isCreateNumber = 0;
              this.is_assigned_numbers = 1;
              this.is_disabled = 0;
              if (number_uuid) {
                this.record.number_uuid = number_uuid;
              }
            }
          }, 1500);
        });
    },
    selectedPublisher() {
      this.showAssignedNumbers(this.record.publisher_uuid);
    },
  },
};
</script>
