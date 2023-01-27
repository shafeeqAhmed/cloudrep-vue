<template>
  <div>
    <b-row class="manag-ivr-tab mt-3">
      <b-col cols="12">
        <b-table
          ref="refListTable"
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="fetchRoutingPlans"
          :fields="tableColumns"
          :sort-by.sync="sortBy"
          :sort-desc.sync="isSortDirDesc"
          :sort-direction="sortDirection"
          :filter="searchQuery"
          :filter-included-fields="filterOn"
          class="table-cr"
        >
          <template #cell(status)="data">
            <div
              class="active-num d-flex align-items-center justify-content-left"
            >
              <div
                :class="`d-flex align-items-left text-${resolveUserStatusVariant(
                  data.item.status
                )}`"
              >
                {{ resolveUserStatusVariantText(data.item.status) }}
              </div>
            </div>
          </template>

          <template #cell(actions)="data">
            <div class="d-flex align-items-center justify-content-center">
              <TagsAndFilters :target_uuid="data.item.target.uuid" />
              <div class="action-btn">
                <feather-icon
                  size="18"
                  icon="EditIcon"
                  class="mr-50 cursor-pointer"
                  @click="edit(data.item.uuid)"
                />
                <feather-icon
                  icon="TrashIcon"
                  size="20"
                  class="mr-1"
                  @click="deletePlan(data.item.uuid)"
                />
              </div>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="mt-4 pb-1">
      <b-col
        md="6"
        sm="6"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">Show</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="perPageOptions"
            class="page-count-cr"
          />
          <label class="d-inline-block text-sm-left">entries</label>
        </b-form-group>
      </b-col>
      <b-col
        md="6"
        sm="6"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalTargets"
          :per-page="perPage"
          align="right"
          size="sm"
          class="my-0"
          hide-goto-end-buttons
        />
      </b-col>
    </b-row>

    <update-routing-plan :refetchData="refetchData" />
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
import router from "@/router";

import useAction from "./useAction.js";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";

import { globalHelper } from "@core/mixins/ui/global";
import vSelect from "vue-select";
import UpdateRoutingPlan from "./components/UpdateRoutingPlanModel.vue";
import TagsAndFilters from "./components/TagsAndFilters.vue";

export default {
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
    vSelect,
    BImg,
    UpdateRoutingPlan,
    TagsAndFilters,
  },
  mixins: [globalHelper],

  data() {
    return {
      tabName: "",
      sortDirection: "asc",
      filterOn: [],
    };
  },
  watch: {
    "$store.state.clientCampaign.isTargetsChanged": function () {
      this.refetchData();
    },
  },

  methods: {
    edit(uuid) {
      this.$bvModal.show("update-routing-plan");

      this.$store
        .dispatch("clientCampaign/getRoutingPlanDetail", uuid)
        .then((response) => {
          this.$store.commit(
            "clientCampaign/UPDATE_ROUTING_PLAN",
            response.data.data.routingPlan
          );
        });
    },
    deletePlan(uuid) {
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete this Plan`, {
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
              .dispatch("clientCampaign/deleteRoutingPlan", { uuid })
              .then((res) => {
                this.refetchData();
              });
          }
        });
    },
  },
  setup() {
    const {
      fetchRoutingPlans,
      tableColumns,
      perPage,
      currentPage,
      totalTargets,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      refetchData,
      resolveUserStatusVariant,
      resolveUserStatusVariantText,
    } = useAction();

    return {
      fetchRoutingPlans,
      tableColumns,
      perPage,
      currentPage,
      totalTargets,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      refetchData,
      resolveUserStatusVariant,
      resolveUserStatusVariantText,
    };
  },
};
</script>
