<template>
  <div>
    <div class="">
      <div class="">
        <div
          :id="`${publisher_uuid}-publisher-payout-rates`"
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
        :target="`${publisher_uuid}-publisher-payout-rates`"
        custom-class="route_filter_modal "
        :show.sync="show"
      >
        <div class="manage_publisher_popover">
          <h4
            class="mt-1 mb-1 d-flex align-items-center justify-content-between"
          >
            Publisher Payout Rates
            <feather-icon
              icon="XIcon"
              class="cursor-pointer"
              size="21"
              @click="onClose"
            />
          </h4>
          <b-form-group
            label="Payout per call"
            label-for="input-1"
          >
            <b-form-input id="input-1" v-model="payout_per_call" type="number" trim></b-form-input>
          </b-form-group>
          <b-form-group
            label="Payout per call Duration"
            label-for="input-2"
          >
            <b-form-input id="input-2" v-model="payout_per_call_duration" type="number" trim></b-form-input>
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
  props: ["publisher_uuid", "number"],
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
      payout_per_call:'',
      payout_per_call_duration:'',
    };
  },

  methods: {
    openPopup() {
      this.$root.$emit("bv::hide::popover");
      this.show = !this.show;
      this.assignValue();
    },
    onClose() {
      this.show = false;
    },
    save(){
      const state = this.$store.state.clientCampaign
      const campaign_uuid = state.campaignUuid
      const client_uuid = state.campaign.user_uuid

      const payload = {
        campaign_uuid: campaign_uuid,
        client_uuid: client_uuid,
        publisher_uuid: this.publisher_uuid,
        type: 'publisher_number',
        payout_per_call: this.payout_per_call,
        payout_per_call_duration: this.payout_per_call_duration,
        number: this.number
      };

      this.$store.dispatch("clientCampaign/storePayoutRatesAgainstPublisher", payload)
          .then(() => {
            this.assignValue();
          });

        this.onClose();
    },
    assignValue() {
      let payload = {
        campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        publisher_uuid: this.publisher_uuid,
      };

      this.$store
        .dispatch("clientCampaign/getPayoutRatesAgainstPublisher", payload)
        .then((response) => {
          const { data: { data: { rates }}} = response;
          this.payout_per_call = rates.payout_per_call
          this.payout_per_call_duration = rates.payout_per_call_duration
        });
    },
  },
};
</script>
<style scoped lang="scss">
.manage_publisher_popover{
  width: 300px;
}
</style>
