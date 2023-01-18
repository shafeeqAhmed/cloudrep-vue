<template>
  <div>
    <div class="campaign-draft pb-3">
      <div class="campaign-heading mt-2 mb-3">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h2>Drafted Campaigns</h2>
          </div>
          <div>
            <!-- <b-button variant="primary" @click.prevent="showModal" class="float-right w-100 btn-add"> + Add </b-button> -->
          </div>
        </div>
      </div>
      <!-- <b-row class="mb-2">
        <b-col md="12">
          <div class="d-flex justify-content-between">
            <b-card-title>
              <h3>Drafted Campaign</h3>
            </b-card-title>
            <b-button variant="primary" @click.prevent="showModal" class="float-right btn-add">
              + Add
            </b-button>
          </div>
        </b-col>
      </b-row> -->
      <b-row class="mt-2 mb-2">
        <!-- entries -->
        <b-col md="8" sm="4" class="">
          <div class="show-listing">
            <b-form-group class="mb-0">
              <label class="d-inline-block text-sm-left mr-1">Show</label>
              <div class="input-gradient">
                <b-form-select id="perPageSelect" v-model="perPage" :options="perPageOptions" class="page-count-cr" />
              </div>
              <label class="d-inline-block text-sm-left ml-1">entries</label>
            </b-form-group>
          </div>
        </b-col>

        <!-- filter -->
        <b-col md="4" class="justify-content-end">
          <b-form-group class="mb-0">
            <b-input-group>
              <div class="input-gradient">
                <b-form-input id="filterInput" @input="searchAfterDelay($event)" v-on:keyup.enter="searchQueryFetch" v-model="searchQuery" type="search" placeholder="Search..." />
              </div>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-2  campaign-listing-page">
          <b-table responsive ref="refUserListTable" :items="fetchCampaigns" :fields="tableColumns" primary-key="id"
            :sort-by.sync="sortBy" show-empty empty-text="No records found" :sort-desc.sync="isSortDirDesc"
            class="table-cr">

            <template #cell(status)="data">
                <div class="d-flex align-items-center justify-content-start camp-status">
                  <span v-if="data.item.is_published == 1" class="live-camp">Live</span>
                  <span v-else class="paused-camp">Paused</span>
                </div>
            </template>

            <template #cell(actions)="data">
              <div class="d-flex align-items-center camp-actions">
                <feather-icon size="18" icon="EditIcon" class="mr-50 cursor-pointer" @click="toEdit(data.item.uuid)" />
                <feather-icon size="18" icon="TrashIcon" class="mr-50 cursor-pointer"
                  @click="showDeleteModal(data.item.uuid)" />
              </div>
            </template>

          </b-table>
         
        </b-col>

        <b-col cols="12">
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
} from "bootstrap-vue";

import router from "@/router";
import useCampaign from "./useCampaign.js";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
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
  },
  mixins: [globalHelper, toastAlert],

  data() {
    return {
      sortDirection: "asc",
      filterOn: [],
      isFormCreateUserMode: true,
      label: "",
      type: "",
      types: [],
      editUuid: "",
      deleteCampUuid:"",
    };
  },
  methods: {
    searchQueryFetch(){
      this.refetchData()
    },
    toDelete(uuid) {
      this.showLoader()
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
    toEdit(uuid) {
      // this.$router.push({ path: `/campaign-creation?campaign=${uuid}` })
      this.$router.push({ path: `/edit-campaign/${uuid}` })
    },
    showDeleteModal(uuid){
      this.$bvModal.show("delte-camp");
      this.deleteCampUuid=uuid
    },
    hideDeleteModal(){
      this.$bvModal.hide("delte-camp");
    },
    searchAfterDelay: debounce(function (event) {
      this.searchQueryFetch()
    }, 1000),
  },
  setup() {
    const APP_STORE_MODULE_NAME = "campaign";
    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, useStore);

    // UnRegister on leave
    onUnmounted(() => {
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

<style scoped lang="scss">
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
      color: #7A60E0 !important;
      stroke: #7A60E0;
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
    background: #5CB85C;
  }

  span.paused-camp {
    background: #F0AD4E;
  }
}

.dark-layout {
  .camp-actions {
    svg {
      color: #fff;
      stroke: #fff;

      &:hover {
        color: #7A60E0 !important;
        stroke: #7A60E0;
      }
    }
  }
}
</style>