<template>
  <div>
    <h2>Select Device </h2>
    <p>
      The device that each user used to opt in to the platform.
    </p>
    <b-row>
      <b-col md="12" class="mt-5">
        <b-form-group>
          <v-select v-model="selectedDevice" @input="storeDevice" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="devices" :selectable="(option) => !option.value.includes('select_value')" label="text"
            placeholder="Select Your Device" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="mt-5">
        <b-button @click="finish" variant="primary" class="btn btn btn-primary btn-large btn-primary submit-btn mt-3">
          Finish
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { BRow, BCol, BButton, BFormGroup } from "bootstrap-vue";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
import { mapState } from "vuex";

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormGroup,
    vSelect
  },
  mixins: [toastAlert],
  watch: {
    '$store.state.aob.device': function (newVal, oldVal) {
      this.selectedDevice = newVal
    }
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    step: (state) => state.aob.step,
    device: (state) => state.aob.device,
  }),
  data() {
    return {
      selectedDevice: '',
      devices: [
        { value: "select_value", text: "Select Value" },
        { value: "1", text: "Desktop" },
        { value: "2", text: "Mobile" },
        { value: "3", text: "Both Desktop / Mobile" },
      ],
    };
  },
  methods: {
    finish() {
      this.$store.commit('aob/UPDATE_STEP', 3)
      this.$router.push({ name: 'agent' })
    },
    storeDevice() {
      this.$http
        .post("store-agent-device", {
          device: this.selectedDevice.text,
        })
        .then((response) => {
          this.successToast("Success", response.data.message);
          this.$store.dispatch("aob/myAgentProfileItem");

        })
        .catch((e) => {
          this.errorToast("Error", "something is going wrong");
        });
    },

  },
  created() {
    if (this.step < 2) {
      this.$store.dispatch('aob/myAgentProfileItem')
    } this.selectedDevice = this.device
  },
};
</script>