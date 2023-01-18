<template>
  <div>
    <div class="user-management">
      <div class="upp-header">
        <div class="upp-img">
          <b-img
            class="w-100"
            src="@/assets/images/logo/upp-img.png"
          ></b-img>
        </div>
        <div class="upp-heading">
          <h1>User Management</h1>
        </div>
      </div>
      <!-- <div class="header_title">
        <b-row class="align-items-center">
          <b-col cols="12">
            <h2>User Management</h2>
          </b-col>
        </b-row>
      </div> -->
      <div class="mt-3">
        <b-tabs
          pills
          class="tabs-cr"
        >
          <b-tab
            title="Clients"
            class=""
            :active="tabName == 'client'"
            @click="updateTab('client')"
          >
            <!-- table -->
            <client-list />
          </b-tab>

          <b-tab
            title="Publishers"
            class=""
            :active="tabName == 'publisher'"
            @click="updateTab('publisher')"
          >
            <!-- table -->
            <publisher-list />
          </b-tab>

          <b-tab
            title="Agents"
            class=""
            :active="tabName == 'agent'"
            @click="updateTab('agent')"
          >
            <!-- table -->
            <agent-list />
          </b-tab>
        </b-tabs>
      </div>
    </div>
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
  BImg,
} from "bootstrap-vue";
import router from "@/router";

import store from "@/store";
import { ref, onUnmounted, computed, onMounted } from "@vue/composition-api";
import userStoreModule from "./userStoreModule";
import useUsersManagement from "./useUsersManagement";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import AgentList from "./agent/AgentList.vue";
import ClientList from "./client/ClientList.vue";
import PublisherList from "./publisher/PublisherList.vue";
import flatPickr from "vue-flatpickr-component";

export default {
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
    flatPickr,
    AppBreadcrumb,
    AgentList,
    ClientList,
    PublisherList,
    BImg,
  },
  data() {
    return {
      selectedDate: null,
      tabName: "",

      sortDirection: "asc",
      filterOn: [],
    };
  },

  mounted() {
    // Set the initial number of items
    this.tabName = ref(router.currentRoute.query.type);
    // console.log('tab name', this.tabName)
  },
  methods: {
    updateTab(tab) {
      const url = `${router.currentRoute.path}?type=${tab}`;
      return router.push(url).catch(() => {});
    },
    addNewUser() {
      this.$router.push({ name: "add-new-user" }).catch(() => {});
    },
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
      fetchAgents,
      fetchClients,
      fetchPublishers,

      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,

      resolveUserStatusVariant,
    } = useUsersManagement();

    computed(() => {
      // Create an options list from our fields
      return tableColumns
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    });

    return {
      fetchAgents,
      fetchClients,
      fetchPublishers,

      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,

      // onFiltered,
      resolveUserStatusVariant,
    };
  },
};
</script>

<style></style>
