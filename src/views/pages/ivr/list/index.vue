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
            <b-button variant="primary" @click="addIvr" class="add-u-btn btn-add">+ Add IVR</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="manag-ivr-tab">
      <b-col cols="12" class="mt-2">
        <b-table ref="refListTable" responsive :per-page="perPage" :current-page="currentPage" :items="fetchUsers"
          :fields="tableColumns" :sort-by.sync="sortBy" :sort-desc.sync="isSortDirDesc" :sort-direction="sortDirection"
          :filter="searchQuery" :filter-included-fields="filterOn" class="table-cr">
          <template #cell(step)="data">
            {{ data.item.step == 6 ? 'Active' : 'Inactive' }}
          </template>
          <template #cell(actions)="data">
            <div class="d-flex align-items-center justify-content-center">
              <feather-icon @click="edit(data.item.uuid)" icon="EditIcon" size="21" class="cursor-pointer mr-1" />
              <feather-icon @click="duplicate(data.item.uuid)" icon="CopyIcon" size="21" class="cursor-pointer mr-1" />
              <feather-icon @click="deleteIvr(data.item.uuid)" icon="TrashIcon" size="21" class="cursor-pointer" />
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

import useIvr from "./useIvr.js";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import userStoreModule from "../store";
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
    addIvr() {
      this.$router.push({ name: 'ivr-creation' }).catch(() => { })
    },
    duplicate(uuid) {
      this.$store.dispatch('ivrBuilder/duplicateIvr', { ivr_uuid: uuid })
        .then(response => {
          this.refetchData()
        })
    },
    deleteIvr(uuid) {
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete this ivr`, {
          title: "Please Confirm",
          size: "sm",
          okVariant: "primary",
          okTitle: "Yes",
          cancelTitle: "No",
          cancelVariant: "outline-secondary",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$store
              .dispatch("ivrBuilder/deleteIvr", { uuid })
              .then((res) => {
                this.refetchData()
              });
          }
        });
    },
    edit(uuid) {
      this.$store.commit('ivrBuilder/UPDATE_IS_EDITED', true)
      this.$router.push({ path: `/ivr/create?uuid=${uuid}` }).catch(() => { })
    }
  },
  setup() {
    const APP_STORE_MODULE_NAME = "ivrBuilder";

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
    } = useIvr();


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

<style lang="scss">
.manag-ivr-tab {
  table thead th {
    &:last-child {
      div {
        justify-content: center;
      }
    }
  }

  svg {
    stroke: #000 !important;

    &:hover {
      stroke: #7A60E0 !important;
    }
  }
}

.dark-layout {
  .manag-ivr-tab {
    svg {
      stroke: #fff !important;

      &:hover {
        stroke: #7A60E0 !important;
      }
    }
  }
}
</style>