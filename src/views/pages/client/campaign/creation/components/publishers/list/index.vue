<template>
  <div>

    <div class="card  pt-3 pb-2 px-2 mt-2">
      <b-row class="mt-1 mb-1">
        <b-col cols="6" class="">
          <!-- <h2>Manage Publisher</h2> -->
        </b-col>
        <b-col cols="6" class="">
          <b-button variant="primary" class="float-right" @click="openPublisherModal('add-publisher')">Assign
            Publisher</b-button>
        </b-col>
      </b-row>
      <b-row class="manag-ivr-tab">
        <b-col cols="12" class="mt-2">
          <b-table ref="refListTable" responsive :per-page="perPage" :current-page="currentPage" :items="fetchRecords"
            :fields="tableColumns" :sort-by.sync="sortBy" :sort-desc.sync="isSortDirDesc" :filter="searchQuery"
            class="table-cr">
            <template #cell(country)="data">
              <country-flag :country="data.item.country" size="normal" />
            </template>

            <template #cell(number_pool)="data">
              <div class="d-flex align-items-center justify-content-center">
                --
              </div>
            </template>
            <template #cell(publisher_id)="data">
              <div class="d-flex align-items-center justify-content-center">
                <div class="">
                  <feather-icon v-b-modal.add-publisher icon="PlusIcon" size="21" class="cursor-pointer" />
                </div>
              </div>
            </template>

            <template #cell(status)="data">
              <div class="active-num d-flex align-items-center justify-content-center">

                <div class="active-num d-flex align-items-center">
                  Active
                </div>

                <!-- <div v-if="data.item.status != 1" class="active-num d-flex align-items-center">
                  Open
                </div>
                <div v-else class="text-danger d-flex align-items-center">
                  Close
                </div> -->
              </div>
            </template>

            <template #cell(actions)="data">
              <div class="d-flex align-items-center justify-content-center">
                <div class="mr-1">
                  <PublisherPayoutRates :publisher_uuid="data.item.publisher_uuid" :number="data.item.number" />
                </div>
                <div class="action-btn">
                  <feather-icon size="18" icon="EditIcon" class="mr-50 cursor-pointer" />
                </div>
              </div>

            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row class="mt-4 pb-5">
        <b-col md="6" sm="6">
          <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-50">Show</label>
            <b-form-select id="perPageSelect" v-model="perPage" :options="perPageOptions" class="page-count-cr" />
            <label class="d-inline-block text-sm-left">entries</label>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="6">
          <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" align="right" size="sm"
            class="my-0" hide-goto-end-buttons />
        </b-col>
      </b-row>
      <assign-publisher-to-campaign-modal :getPublishersForAssignToCampaign="getPublishersForAssignToCampaign"
        :refetchData="refetchData" />

    </div>
  </div>
</template>

<script>
import {
  BTable,
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BDropdown,
  BDropdownItem,
  BTabs,
  BTab,
  BCardText,
  BImg,
} from "bootstrap-vue";

import useAction from "./useAction.js";
// import userStoreModule from "../store";
import { globalHelper } from "@core/mixins/ui/global";
import CountryFlag from "vue-country-flag";
import vSelect from "vue-select";
import AssignPublisherToCampaignModal from "./components/AssignPublisherToCampaignModal.vue";
import PublisherPayoutRates from "./components/PublisherPayoutRates.vue";
export default {
  components: {
    BTable,
    BImg,
    BAvatar,
    BBadge,

    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BTabs,
    BTab,
    BCardText,
    vSelect,
    AssignPublisherToCampaignModal,
    PublisherPayoutRates,
  },
  mixins: [globalHelper],

  data() {
    return {};
  },
  methods: {
    openPublisherModal(id) {
      this.$bvModal.show(id);
    },
    // store() {
    //   this.$store.dispatch('clientCampaign/storeCampaignPublish', this.$store.state.clientCampaign.campaignUuid).then(() => {
    //     // this.$store.commit("clientCampaign/UPDATE_STEP", 15);
    //   })
    //   return this.$router.push({ name: 'success-campaign' })
    // },
    completeCampaign() {
      this.$store.commit('clientCampaign/RESET_STATE')
      return this.$router.push({ name: 'campaign-list-complete' })
    }
  },

  setup() {
    const {
      fetchRecords,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      getCountries,
      refetchData,
      getPublishersForAssignToCampaign,
    } = useAction();

    getPublishersForAssignToCampaign();
    getCountries();
    return {
      fetchRecords,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      getCountries,
      refetchData,
      getPublishersForAssignToCampaign,
    };
  },
};
</script>