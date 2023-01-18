<template>
  <div>
    <b-row class="mt-2 mb-2">
      <!-- filter -->
      <!-- <b-col md="12">
        <div class="d-flex align-items-center justify-content-between flex-wrap">
          <div class="filter-search">
            <b-form-group class="mb-0">
              <b-input-group>
                <div class="input-gradient">
                  <b-form-input id="filterInput" v-model="searchQuery" type="search" placeholder="Search..." />
                </div>
             
              </b-input-group>
            </b-form-group>
          </div>
          <div>
            <b-button variant="primary" v-b-modal.create-numer class="add-u-btn btn-add">+ Add IVR</b-button>
          </div>
        </div>
      </b-col> -->
      <b-col cols="6" class="mb-3">
        <h2>Manage Number</h2>
      </b-col>
      <b-col cols="6" class="mb-3">
        <b-button variant="primary" class="float-right" v-b-modal.create-numer>+ Create Number</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mt-2">
        <b-table ref="refListTable" responsive :per-page="perPage" :current-page="currentPage" :items="fetchUsers"
          :fields="tableColumns" :sort-by.sync="sortBy" :sort-desc.sync="isSortDirDesc" :sort-direction="sortDirection"
          :filter="searchQuery" :filter-included-fields="filterOn" class="table-cr">
          <template #cell(country)="data">
            <country-flag v-if="data.item.country" :country='data.item.country' size='normal' />
          </template>

          <template #cell(number_pool)="data">
            <div class="d-flex align-items-center justify-content-center">
              --
            </div>
          </template>
          <template #cell(publisher_id)="data">
            <div class="d-flex align-items-center justify-content-center">

              <div v-if="data.item.publisher_name">
                <feather-icon @click="openPublisherModal('add-publisher', data.item)" icon="XIcon" size="21"
                  class="cursor-pointer" />
                {{ data.item.publisher_name }}
              </div>
              <div v-else>
                <feather-icon @click="openPublisherModal('add-publisher', data.item)" icon="PlusIcon" size="21"
                  class="cursor-pointer" />
              </div>
            </div>
          </template>

          <template #cell(status)="data">
            <div class="active-num d-flex align-items-center justify-content-center">
              <div v-if="data.item.status == 1" class="active-num d-flex align-items-center">
                Active
              </div>
              <div v-else class="text-danger d-flex align-items-center">
                Deactive
              </div>
            </div>
          </template>



          <template #cell(actions)="data">

            <div class="d-flex align-items-center justify-content-center">
              <div class="action-btn d-flex align-items-center">
                <feather-icon @click="openTagsModal('add-tag', data.item)" icon="EditIcon" size="20" class="cursor-pointer mr-1" />
                <feather-icon icon="PlayIcon" size="20" class=" cursor-pointer mr-1" />
                <feather-icon icon="DownloadIcon" class="cursor-pointer" size="20" />
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
    <create-number-modal :refetchData="refetchData" />
    <assign-publisher-modal :refetchData="refetchData" :editRecord="editRecord" />
    <add-tags-modal :refetchData="refetchData" :editRecord="editRecord" />


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
} from "bootstrap-vue";
import router from "@/router";

import useAction from "./useAction.js";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import userStoreModule from "../store";
import { globalHelper } from "@core/mixins/ui/global";
import CountryFlag from 'vue-country-flag'
import vSelect from "vue-select";
import CreateNumberModal from './components/CreateNumberModal.vue'
import AssignPublisherModal from './components/AssignPublisherModal.vue'
import AddTagsModal from './components/AddTagsModal.vue'


export default {
  updated() {
    console.log('At this point, events and lifecycle have been initialized.')
  },
  components: {
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
    CountryFlag,
    vSelect,
    CreateNumberModal,
    AssignPublisherModal,
    AddTagsModal
  },
  mixins: [globalHelper],

  data() {
    return {
      tabName: "",
      sortDirection: "asc",
      filterOn: [],
      editRecord: []

    };
  },
  mounted() {
    this.tabName = router.currentRoute.query.type;
  },
  methods: {
    openPublisherModal(id, record) {
      this.editRecord = record
      this.$bvModal.show(id)
    },
    openTagsModal(id, record) {
      this.editRecord = record
      this.$bvModal.show(id)
    }
  },
  setup() {
    const APP_STORE_MODULE_NAME = "manageNumbers";

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, userStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });

    const {
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      refetchData,
      getCountries,
      getPublishers,
    } = useAction();

    getCountries(),
      getPublishers()
    return {
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      refetchData
    };
  },
};
</script>
