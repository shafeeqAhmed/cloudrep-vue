<template>
  <div>
    <h2>Select Location</h2>
    <p>This information will be stored for security purposes.</p>
    <b-row>
      <b-col md="12" class="mt-5">
        <b-form-group>
          <label for="">Country</label>
          <v-select v-model="selectedCountry" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="countries"
            label="name" placeholder="Select Your Country" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="mt-5">
        <b-button @click="storeCountry" variant="primary" :disabled="isDisabled"
          class="btn btn btn-primary btn-large btn-primary submit-btn mt-3">
          Next
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { BRow, BCol, BButton, BFormGroup } from "bootstrap-vue";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormGroup,
    vSelect,
  },
  mixins: [toastAlert],
  data() {
    return {
      selectedCountry: "",
      isDisabled: false,
    };
  },
  computed: {
    countries() {
      return this.$store.getters['aob/countries']
    }
  },
  methods: {
    storeCountry() {
      this.isDisabled = true
      this.$http
        .post("store-agent-location", {
          location: this.selectedCountry.name,
        })
        .then(() => {
          this.$store.dispatch("aob/myAgentProfileItem");
          this.successToast("Success", "Agent Location Saved Successfully!");
          this.$store.dispatch('aob/myAgentProfileItem')

        })
        .catch((e) => {
          this.errorToast("Error", "something is going wrong ");
        }).finally(() => {
          this.isDisabled = false
        });
    },
  },
  created() {
    if (this.step < 1) {
      this.$store.dispatch('aob/myAgentProfileItem')
    }
    this.$store.dispatch('aob/getCountries')
      .catch(() => {
        this.errorToast("Error", "something is going wrong ");
      })
    this.selectedCountry = this.$store.getters['aob/location']
  },
};
</script>
