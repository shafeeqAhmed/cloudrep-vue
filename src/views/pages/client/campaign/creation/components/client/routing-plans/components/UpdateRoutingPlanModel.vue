<template>
  <div>
    <b-modal
      id="update-routing-plan"
      centered
      modal-class="modal-number"
      hide-header
      hide-footer
    >
      <h2>Update Target Routing Plan</h2>
      <validation-observer
        ref="updateTargetRoutingPlanForm"
        #default="{ invalid }"
      >
        <b-form>
          <b-row class="align-items-center mt-2 mb-1">
            <b-col cols="2">
              <div class="d-flex align-items-center">
                <label for="">Name</label>

                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="10">
              <div class="d-flex align-items-center">
                <label for="">{{ routingPlan.name }}</label>
              </div>
            </b-col>
          </b-row>

          <b-row class="align-items-center mt-2 mb-1">
            <b-col cols="2">
              <div class="d-flex align-items-center">
                <label for="">Priority</label>
                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="10">
              <validation-provider
                #default="{ errors }"
                name="Priority"
                vid="priority"
                rules="required"
              >
                <div class="input-gradient">
                  <b-form-input
                    id="priority"
                    type="number"
                    v-model="routingPlan.priority"
                    placeholder="Enter Priority"
                  ></b-form-input>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="align-items-center mt-2 mb-1">
            <b-col cols="2">
              <div class="d-flex align-items-center">
                <label for="">Weight</label>
                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="10">
              <validation-provider
                #default="{ errors }"
                name="Weight"
                vid="weight"
                rules="required"
              >
                <div class="input-gradient">
                  <b-form-input
                    id="weight"
                    type="number"
                    v-model="routingPlan.weight"
                    placeholder="Enter Weight"
                  ></b-form-input>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="align-items-center mt-2 mb-1">
            <b-col cols="2">
              <div class="d-flex align-items-center">
                <label for="">Revenue</label>
                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="10">
              <validation-provider
                #default="{ errors }"
                name="Revenue"
                vid="revenue"
                rules="required"
              >
                <div class="input-gradient">
                  <b-form-input
                    id="revenue"
                    type="number"
                    v-model="routingPlan.revenue"
                    placeholder="Enter Revenue"
                  ></b-form-input>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="align-items-center mt-2 mb-1">
            <b-col cols="2">
              <div class="d-flex align-items-center">
                <label for="">Convert On</label>
                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="10">
              <validation-provider
                #default="{ errors }"
                name="Convert On"
                vid="convert_on"
                rules="required"
              >
                <div class="input-gradient">
                  <v-select
                    id="payoutOn"
                    v-model="routingPlan.convert_on"
                    :options="convertOnTypes"
                    label="Convert On"
                    placeholder="Choose Type"
                  />
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="align-items-center mt-3">
            <b-col
              lg="3"
              md="3"
              sm="3"
              class="col-8"
            >
              <label class="font-medium-1 font-weight-bold"
                >Duplicate Conversation &nbsp;
              </label>
            </b-col>

            <b-col sm="8">
              <b-button-group size="my-1">
                <b-button
                  @click="ConversationType('Disabled')"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  :class="
                    routingPlan.duplicate_conversation_type == 'Disabled'
                      ? 'active'
                      : ''
                  "
                >
                  Disabled
                </b-button>
                <b-button
                  @click="ConversationType('Enabled')"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  :class="
                    routingPlan.duplicate_conversation_type == 'Enabled'
                      ? 'active'
                      : ''
                  "
                >
                  Enabled
                </b-button>

                <b-button
                  @click="ConversationType('Time Limit')"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  :class="
                    routingPlan.duplicate_conversation_type == 'Time Limit'
                      ? 'active'
                      : ''
                  "
                >
                  Time Limit
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>

          <div
            class="mt-2"
            v-if="routingPlan.duplicate_conversation_type == 'Time Limit'"
          >
            <b-row class="align-items-center">
              <b-col
                lg="3"
                md="3"
                sm="3"
              >
                <label class="font-medium-1 font-weight-bold">Days</label>
              </b-col>
              <b-col
                lg="6"
                md="6"
                sm="6"
              >
                <div class="input-gradient">
                  <b-form-input
                    placeholder="0"
                    class="form-control"
                    id="days"
                    v-model="routingPlan.time_limit_days"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row class="align-items-center mt-1">
              <b-col
                lg="3"
                md="3"
                sm="3"
              >
                <label class="font-medium-1 font-weight-bold">Hours</label>
              </b-col>
              <b-col
                lg="6"
                md="6"
                sm="6"
              >
                <div class="input-gradient">
                  <b-form-input
                    placeholder="0"
                    class="form-control"
                    id="hours"
                    v-model="routingPlan.time_limit_hours"
                  />
                </div>
              </b-col>
            </b-row>
          </div>

          <b-row class="align-items-center mt-3">
            <b-col
              lg="3"
              md="3"
              sm="3"
              class="col-8"
            >
              <label class="font-medium-1 font-weight-bold"
                >Status &nbsp;
              </label>
            </b-col>

            <b-col sm="8">
              <b-button-group size="my-1">
                <b-button
                  @click="statusChange('active')"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  :class="routingPlan.status == 'active' ? 'active' : ''"
                >
                  Open
                </b-button>
                <b-button
                  @click="statusChange('inactive')"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  :class="routingPlan.status == 'inactive' ? 'active' : ''"
                >
                  Close
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col
              sm="3"
              cols="6"
            >
              <b-button
                class="secondary-btn w-100"
                @click="updateRoutingPlan"
                >Save</b-button
              >
            </b-col>
            <b-col
              sm="3"
              cols="6"
            >
              <b-button
                block
                @click="$bvModal.hide('update-routing-plan')"
                class="secondary-btn w-100"
              >
                Cancel</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormSelect,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BButtonGroup,
} from "bootstrap-vue";
import { globalHelper } from "@core/mixins/ui/global";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";

const initialRoutingPlan = {
  uuid: "",
  name: "",
  priority: "",
  weight: "",
  revenue: "",
  convert_on: "",
  duplicate_conversation_type: "Disabled",
  status: "inactive",
  time_limit_days: 0,
  time_limit_hours: 0,
};

export default {
  directives: {
    Ripple,
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormSelect,
    BInputGroup,
    BButtonGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    ToastificationContent,
    vSelect,
  },
  mixins: [globalHelper, toastAlert],
  props: ["refetchData"],
  data() {
    return {
      routingPlan: Object.assign({}, initialRoutingPlan),
      convertOnTypes: [
        "Call Length",
        "Call Successfully Connected",
        "Postback/Webhook",
        "Denied",
      ],
    };
  },
  computed: {
    getRoutingPlan() {
      return this.$store.getters["clientCampaign/getRoutingPlan"];
    },
  },
  watch: {
    getRoutingPlan(routingPlan, oldValue) {
      if (routingPlan) {
        this.routingPlan.name = routingPlan.name;
        this.routingPlan.priority = routingPlan.priority;
        this.routingPlan.weight = routingPlan.weight;
        this.routingPlan.revenue = routingPlan.revenue;
        this.routingPlan.convert_on = routingPlan.convert_on;
        this.routingPlan.duplicate_conversation_type =
          routingPlan.duplicate_conversation_type;
        this.routingPlan.time_limit_days = routingPlan.time_limit_days;
        this.routingPlan.time_limit_hours = routingPlan.time_limit_hours;
        this.routingPlan.uuid = routingPlan.uuid;
        this.routingPlan.status = routingPlan.status;
      }
    },
  },
  methods: {
    statusChange(val) {
      this.routingPlan.status = val;
    },
    ConversationType(val) {
      this.routingPlan.duplicate_conversation_type = val;
    },

    resetModal() {
      this.routingPlan = Object.assign({}, initialRoutingPlan);
    },

    updateRoutingPlan() {
      this.$refs.updateTargetRoutingPlanForm.validate().then((success) => {
        if (success) {
          this.$store
            .dispatch("clientCampaign/updateRoutingPlan", this.routingPlan)
            .then(() => {
              this.successToast(
                "Routing Plan Updated Successfully.",
                "success"
              );
              this.refetchData();
              this.resetModal();
              this.$bvModal.hide("update-routing-plan");
            })
            .catch((error) => {
              this.errorToast("Error", error.response.data.message);
            });
        }
      });
    },
  },
};
</script>
