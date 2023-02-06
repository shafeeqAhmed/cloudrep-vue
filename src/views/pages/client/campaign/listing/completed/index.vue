<template>
  <div>
    <div class="campaign-completed pb-3">
      <div class="campaign-heading mt-2 mb-3">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h2>Completed Campaigns</h2>
          </div>
          <div class="w-50">
            <b-button variant="primary" @click.prevent="showModal" class="float-right">
              + Add
            </b-button>
          </div>
        </div>
      </div>
      <b-row class="mt-2 mb-2">
        <!-- filter -->
        <b-col lg="4" md="6" class="justify-content-end">
          <b-form-group class="mb-0">
            <b-input-group>
              <div class="input-gradient">
                <b-form-input id="filterInput" @input="searchAfterDelay($event)" v-on:keyup.enter="searchQueryFetch"
                  v-model="searchQuery" type="search" placeholder="Search..." />
              </div>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-2 campaign-listing-page">
          <b-table responsive ref="refUserListTable" :items="fetchCampaigns" :fields="tableColumns" primary-key="id"
            :sort-by.sync="sortBy" show-empty empty-text="No records found" :sort-desc.sync="isSortDirDesc"
            class="table-cr">
            <template #cell(state)="data">
              <div class="d-flex align-items-center justify-content-start camp-status">
                <span v-if="data.item.is_published != null" class="live-camp">Live</span>
                <span v-if="data.item.is_published == null" class="paused-camp d-none">Paused</span>
                <!-- <span class="live-camp">Live</span>
                  <span class="paused-camp d-none">Paused</span> -->
              </div>
            </template>
            <template #cell(country)="data">
              <div class="d-flex align-items-center justify-content-center camp-recording">
                {{ data.item.country }}
              </div>
            </template>
            <!--  <template #cell(recording)="data">
              <div
                class="d-flex align-items-center justify-content-center camp-recording"
              >
                <span class="">Yes</span>
              </div>
            </template> -->

            <template #cell(status)="data">
              <div class="d-flex align-items-center justify-content-center camp-recording">
                <span v-if="data.item.status === 'complete'">Complete</span>

                <span v-else>Incomplete</span>
              </div>
            </template>

            <template #cell(actions)="data">
              <div>
                <div class="d-flex align-items-center justify-content-center camp-actions">
                  <feather-icon size="18" icon="EditIcon" class="mr-50 cursor-pointer"
                    @click="toEdit(data.item.uuid)" />
                  <feather-icon size="18" icon="CopyIcon" class="mr-50 cursor-pointer" />
                  <feather-icon size="18" icon="PieChartIcon" class="mr-50 cursor-pointer" />
                  <feather-icon size="18" icon="PauseIcon" class="mr-50 cursor-pointer" />
                  <feather-icon size="18" icon="PlayIcon" class="mr-50 cursor-pointer d-none" />
                  <feather-icon size="18" icon="TrashIcon" class="mr-50 cursor-pointer"
                    @click="showDeleteModal(data.item.uuid)" />
                </div>
              </div>
              <!-- <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret class="drop-with-trash">
                <template v-slot:button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="text-body text-success align-middle mr-25" />
                </template>
                <b-dropdown-item @click="toEdit(data.item.uuid)">
                  <div class="d-flex align-items-center">
                    <feather-icon icon="EditIcon" class="mr-50 text-success" />
                    <span class="text-success">Edit</span>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item @click="toDelete(data.item.uuid)">
                  <div class="d-flex align-items-center">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span class="">Delete</span>
                  </div>
                </b-dropdown-item>
              </b-dropdown> -->
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col md="6" sm="4" class="">
          <div class="show-listing">
            <b-form-group class="mb-0">
              <label class="d-inline-block text-sm-left mr-50">Show</label>
              <div class="input-gradient">
                <b-form-select id="perPageSelect" v-model="perPage" :options="perPageOptions" class="page-count-cr" />
              </div>
              <label class="d-inline-block text-sm-left ml-1">entries</label>
            </b-form-group>
          </div>
        </b-col>
        <b-col md="6">
          <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" align="right" size="sm"
            class="my-0" hide-goto-end-buttons />
        </b-col>
      </b-row>
    </div>
    <!--/////////////Delete Modal///////////////-->
    <b-modal id="delte-camp" centered modal-class="modal-number" hide-header hide-footer>
      <h2>Are you sure?</h2>
      <b-row class="mt-3">
        <b-col cols="12" class="text-center">
          <b-button class="mr-1" @click="hideDeleteModal">No</b-button>
          <b-button variant="primary" @click="toDelete(deleteCampUuid)">Yes</b-button>
        </b-col>
      </b-row>
    </b-modal>
    <!--/////////////Delete Modal///////////////-->
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
  BCardTitle,
  BCard,
  BForm,
  VBToggle,
} from "bootstrap-vue";

import useCampaign from "./useCampaign.js";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import vSelect from "vue-select";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import useStore from "../useStore";
import { globalHelper } from "@core/mixins/ui/global";
import { toastAlert } from "@core/mixins/ui/toast";
import { debounce } from "@/commonFunction/helpers.js";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
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
    BCardTitle,
    AppBreadcrumb,
    BCard,
    BForm,
    required,
    vSelect,
    VBToggle,
  },
  directives: {
    "b-toggle": VBToggle,
  },
  mixins: [globalHelper, toastAlert],

  data() {
    return {
      deleteCampUuid: "",
    };
  },
  // watch: {
  //   'searchQuery': function (newVal, oldVal) {
  //     if(!newVal){
  //       this.searchQueryFetch()
  //     }
  //   }
  // },
  methods: {
    searchQueryFetch() {
      this.refetchData();
    },
    toEdit(uuid) {
      // this.$router.push({ path: `/campaign-creation?campaign=${uuid}` })
      this.$router.push({ path: `/edit-campaign/${uuid}` });
    },
    showModal() {
      this.$router.push({ path: `/campaign-creation` });
    },
    toDelete(uuid) {
      this.showLoader();
      this.$http
        .post(`delete-campaign/${uuid}`)
        .then((response) => {
          console.log(response.data);
          this.$bvModal.hide("delte-camp");
          this.refDropdowntest = Math.random();
          this.successToast("Success", response.data.message);
        })
        .catch((error) => {
          // this.errorToast("Error", "Something is wrong!");
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    showDeleteModal(uuid) {
      this.$bvModal.show("delte-camp");
      this.deleteCampUuid = uuid;
    },
    hideDeleteModal() {
      this.$bvModal.hide("delte-camp");
    },
    searchAfterDelay: debounce(function (event) {
      this.searchQueryFetch();
    }, 1000),
  },
  setup() {
    const APP_STORE_MODULE_NAME = "campaign";
    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, useStore);

    // UnRegister on leave
    onUnmounted(() => {
      console.log("on leave un mounted-------------------");
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });

    const {
      fetchCampaigns,
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
      refDropdowntest,
    } = useCampaign();

    return {
      fetchCampaigns,
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
      refDropdowntest,
    };
  },
};
</script>
<style lang="scss">
.campaign-completed {
  table thead th {
    div {
      justify-content: center;
    }
  }

  table thead th {
    &:first-child {
      div {
        justify-content: left;
      }
    }
  }

  table thead th {
    &:nth-child(2) {
      div {
        justify-content: left;
      }
    }
  }
}
</style>
<style
  scoped
  lang="scss"
>
.privateBtn {
  padding: 5px 10px 5px 10px;
}

.campaign-heading {
  h2 {
    font-size: 24px;
    line-height: 22px;
  }

  p {
    font-size: 15px;
    line-height: 18px;
  }
}

.camp-actions {
  svg {
    color: #393939;
    stroke: #393939;

    &:hover {
      color: #7a60e0 !important;
      stroke: #7a60e0;
    }
  }
}

.camp-status {
  span {
    padding: 4px 10px;
    color: #fff;
    border-radius: 4px;
  }

  span.live-camp {
    background: #5cb85c;
  }

  span.paused-camp {
    background: #f0ad4e;
  }
}

.campaign-listing-page {
  .table thead th {
    &:nth-child(4) {
      div {
        justify-content: center;
      }
    }
  }
}

.dark-layout {
  .camp-actions {
    svg {
      color: #fff;
      stroke: #fff;

      &:hover {
        color: #7a60e0 !important;
        stroke: #7a60e0;
      }
    }
  }
}
</style>
