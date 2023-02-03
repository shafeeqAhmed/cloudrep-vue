<template>
  <div>
    <div class="">
      <div class="">
        <div
          :id="`${parent_uuid}-client-rates`"
          class="popover-btn"
          @click="openPopup"
        >
          <feather-icon
            icon="DollarSignIcon"
            class="cursor-pointer"
            size="18"
          />
        </div>
      </div>

      <b-popover
        :target="`${parent_uuid}-client-rates`"
        custom-class="route_filter_modal"
        :show.sync="show"
      >
        <div>
          <h4
            class="mt-1 mb-1 d-flex align-items-center justify-content-between"
          >
            Client Rates
            <feather-icon
              icon="XIcon"
              class="cursor-pointer"
              size="21"
              @click="onClose"
            />
          </h4>
          <b-form-group
            label="Cost per call"
            label-for="input-1"
          >
            <b-form-input id="input-1" v-model="cost_per_call" type="number" trim></b-form-input>
          </b-form-group>
          <b-form-group
            label="Cost per call Duration"
            label-for="input-2"
          >
            <b-form-input id="input-2" v-model="cost_per_call_duration" type="number" trim></b-form-input>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button variant="primary" class="" @click="save">Save</b-button>
          </div>
        </div>
      </b-popover>
    </div>
  </div>
</template>

<script>
import {
  BPopover,
  BButton,
  BFormInput,
  BListGroup,
  BListGroupItem,
  BFormGroup,
} from "bootstrap-vue";
import { DollarSignIcon } from "vue-feather-icons";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  props: ["parent_uuid"],
  directives: {
    Ripple,
  },
  components: {
    BPopover,
    BButton,
    BFormInput,
    vSelect,
    BListGroup,
    BListGroupItem,
    BFormGroup,
  },
  mixins: [toastAlert],
  data() {
    return {
      show: false,
      cost_per_call:'',
      cost_per_call_duration:'',
    };
  },

  methods: {
    openPopup() {
      this.$root.$emit("bv::hide::popover");
      this.show = !this.show;
      // this.assignValue();
    },
    onClose() {
      this.show = false;
    },
    save(){
      alert('Functionality yet have to decide!')
      // const state = this.$store.state.clientCampaign
      // const campaign_uuid = state.campaignUuid
      // const client_uuid = state.campaign.user_uuid

      // const payload = {
      //   campaign_uuid: campaign_uuid,
      //   client_uuid: client_uuid,
      //   target_uuid: this.parent_uuid,
      //   type: 'target',
      //   cost_per_call: this.cost_per_call,
      //   cost_per_call_duration: this.cost_per_call_duration,
      // };

      // this.$store.dispatch("clientCampaign/storeClientRatesAgainstTarget", payload)
      //     .then(() => {
      //       // this.assignValue();
      //     });

        this.onClose();
    },
    assignValue() {
      let payload = {
        campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        target_uuid: this.parent_uuid,
      };

      this.$store
        .dispatch("clientCampaign/getClientRatesAgainstTarget", payload)
        .then((response) => {
          const { data: { data: { rates }}} = response;
          this.cost_per_call = rates.cost_per_call
          this.cost_per_call_duration = rates.cost_per_call_duration
        });
    },
  },
};
</script>
