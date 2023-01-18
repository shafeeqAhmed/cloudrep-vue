<template>
  <div>
    <b-form-group class="mb-2">
      <label class="font-medium-1 mb-2 font-weight-bold"
        >Business Category</label
      >
      <v-select
        v-model="selectedOption"
        @search="searchCategory($event)"
        @input="actionOnSelectCategory"
        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        :reduce="(category) => category.uuid"
        :options="categories"
        label="name"
      >
      </v-select>
    </b-form-group>
  </div>
</template>
<script>
import { BFormGroup } from "bootstrap-vue";

import vSelect from "vue-select";
import { toastAlert } from "@core/mixins/ui/toast";
import { debounce } from "@/commonFunction/helpers.js";

export default {
  props: {
    options: {
      type: Array,
      require: true,
    },
  },
  components: {
    BFormGroup,
    vSelect,
  },
  mixins: [toastAlert],
  data() {
    return {
      selectedOption: "",
    };
  },
  methods: {
    searchCategory: debounce(function (event) {
      this.$store.dispatch("clientCampaign/getCategories", {
        q: event,
      });
    }, 500),

    actionOnSelectCategory(event) {
      this.$store.commit("clientCampaign/UPDATE_SELECTED_CATEGORY_UUID", event);
      this.stepThree.vertical = "";
      this.$store.dispatch("clientCampaign/getVerticals");
    },
    actionOnSelectVertical(event) {
      this.$store.commit("clientCampaign/UPDATE_SELECTED_VERTICAL_UUID", event);
    },
  },
  computed: {
    categories() {
      return this.$store.state.clientCampaign.categories;
    },
    verticals() {
      return this.$store.state.clientCampaign.verticals;
    },
  },
  created() {
    // const info = this.$store.state.clientCampaign
    // console.log('---------------------------info-------------------')
    // console.log(info)
    // this.stepThree.vertical = info.vertical_id
    // // this.stepThree.category = info.category_id
    // this.stepThree.language = info.language,
    //   this.stepThree.currency = info.currency

    this.$store.dispatch("clientCampaign/getCategories", { q: "" });
  },
};
</script>

<style></style>
