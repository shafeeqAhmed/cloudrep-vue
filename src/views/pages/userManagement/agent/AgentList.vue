<template>
  <div>
    <b-row class="mt-2 mb-2">
      <!-- filter -->
      <b-col md="12">
        <div class="d-flex align-items-center justify-content-between flex-wrap">
          <div class="filter-search">
            <b-form-group class="mb-0">
              <b-input-group>
                <div class="input-gradient">
                  <b-form-input id="filterInput" v-model="searchQuery" type="search" placeholder="Search..." />
                </div>
                <!-- <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''">
                        Clear
                      </b-button>
                    </b-input-group-append> -->
              </b-input-group>
            </b-form-group>
          </div>
          <div>
            <b-button variant="primary" @click="addNewUser" class="primary-btn">+ Add User</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mt-2">
        <b-table responsive :per-page="perPage" :current-page="currentPage" :items="fetchUsers" :fields="tableColumns"
          :sort-by.sync="sortBy" :sort-desc.sync="isSortDirDesc" :sort-direction="sortDirection" :filter="searchQuery"
          :filter-included-fields="filterOn" class="table-cr">
          <template #cell(step)="data">
            {{ data.item.step == 6 ? 'Active' : 'Inactive' }}
          </template>
          <template #cell(actions)="data">
            <b-dropdown :items="data.item.actions" variant="link" toggle-class="text-decoration-none" no-caret
              class="drop-with-trash">
              <template v-slot:button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="text-body  text-success align-middle mr-25" />
              </template>
              <b-dropdown-item v-if="data.item.step == 6" @click="loginAs(data.item.user_uuid)">
                <feather-icon icon="UserIcon" class="mr-50 text-success" />
                <span class="text-success">Login as</span>
              </b-dropdown-item>
              <b-dropdown-item v-else>
                <feather-icon icon="UserIcon" class="mr-50" />
                <span class="">Incomplete profile</span>

              </b-dropdown-item>
            </b-dropdown>
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
  </div>
</template>

<script>
import {
  BFormDatepicker,
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

import useAgent from "./useAgent.js";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import store from "@/store";
import {  onUnmounted } from "@vue/composition-api";
import userStoreModule from "../userStoreModule";
import { globalHelper } from "@core/mixins/ui/global";

export default {
  updated() {
    console.log('At this point, events and lifecycle have been initialized.')
  },
  components: {
    BFormDatepicker,
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
    AppBreadcrumb,
  },
  mixins: [globalHelper],

  data() {
    return {
      tabName: "",

      sortDirection: "asc",
      filterOn: []

    };
  },
  mounted() {
    this.tabName = router.currentRoute.query.type;
  },
  methods: {
    updateTab(tab) {
      const url = `${router.currentRoute.path}?type=${tab}`;
      return router.push(url).catch(() => { });
    },
    addNewUser() {
      this.$router.push({ name: 'add-new-user' }).catch(() => { })
    }
  },
  setup() {
    const APP_STORE_MODULE_NAME = "app-user";

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
      refUserListTable,
      refetchData,

    } = useAgent();


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
      refUserListTable,
    };
  },
};
</script>

<style>
</style>