<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>Welcome your offer wall</h2>
      <div class="datepicker-cr">
        <b-form-group>
          <flat-pickr
            class="form-control"
            value="null"
            :config="{ mode: 'range' }"
          />
        </b-form-group>
      </div>
    </div>
    <div class="tab-pane card py-3 px-2 statistics-card mt-30 active">
      <h1>Agents Offer Wall</h1>
      <div class="w-100 d-flex justify-content-end">
        <div>
          <b-form-select
            :options="options"
            class="page-count-cr"
            value="Filter By Categories"
          />
        </div>
        <div>
          <b-form-select
            :options="options"
            class="page-count-cr"
            value="Filter By Categories"
          />
        </div>
      </div>
      <div class="row mt-5">
        <template v-for="n in 9">
          <div class="col-md-4">
            <campaign-card></campaign-card>
          </div>
        </template>
      </div>
      <div class="row">
        <div class="mt-30 col-md-11 offset-md-1">
          <b-pagination-nav :number-of-pages="10" use-router class="mb-0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import CampaignCard from "./CampaignCard.vue";
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
  BFormSelect,
  BFormGroup,
  BFormTextarea,
  BFormDatepicker,
  BFormTimepicker,
  BPaginationNav,
} from "bootstrap-vue";

export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormSelect,
    BFormInput,
    BFormTextarea,
    BFormDatepicker,
    BFormTimepicker,
    BPaginationNav,
    flatPickr,
    CampaignCard,
  },
  data() {
    return {
      options: [
        "Filter By Categories",
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.custom-select {
  padding-right: 2.5rem;
  background-position: 95% center;
}
</style>
