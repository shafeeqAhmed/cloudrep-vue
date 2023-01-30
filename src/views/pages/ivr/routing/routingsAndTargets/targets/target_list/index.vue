<template>
  <div>
    <b-row class="mb-2">
      <b-col
        cols="6"
        class="mb-3"
      >
        <h2>Manage Targets</h2>
      </b-col>
      <b-col
        cols="6"
        class="mb-3"
      >
        <b-button
          class="primary-btn float-right"
          variant="primary"
          v-b-modal.add-target
          >+ Add Target</b-button
        >
      </b-col>
    </b-row>
    <b-row class="manag-ivr-tab">
      <b-col cols="12">
        <b-table
          ref="refListTable"
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="fetchTargets"
          :fields="tableColumns"
          :sort-by.sync="sortBy"
          :sort-desc.sync="isSortDirDesc"
          :sort-direction="sortDirection"
          :filter="searchQuery"
          :filter-included-fields="filterOn"
          class="table-cr"
        >
          <template #cell(is_primary)="data">
            <div
              class="active-num d-flex align-items-center justify-content-left"
            >
              <div
                :class="`d-flex align-items-left text-${isPrimaryVariant(
                  data.item.is_primary
                )}`"
              >
                {{ isPrimaryVariantText(data.item.is_primary) }}
              </div>
            </div> </template
          ><template #cell(status)="data">
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
              <TagsAndFilters :target_uuid="data.item.uuid" />
              <div class="action-btn">
                <feather-icon
                  size="18"
                  icon="EditIcon"
                  class="mr-50 cursor-pointer"
                  @click="action(data.item.uuid, 'edit')"
                />
                <feather-icon
                  icon="PlayIcon"
                  size="20"
                  class="mr-1"
                  @click="action(data.item.uuid, 'routing_plan')"
                />
              </div>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="mt-4 pb-5">
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

    <add-target-model :refetchData="refetchData" />
    <update-target-model :refetchData="refetchData" />
    <add-target-routing-plan-model :refetchData="refetchData" />
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
import { globalHelper } from "@core/mixins/ui/global";
import vSelect from "vue-select";
import AddTargetModel from "./components/AddTargetModel.vue";
import UpdateTargetModel from "./components/UpdateTargetModel.vue";
import AddTargetRoutingPlanModel from "./components/AddTargetRoutingPlanModel.vue";
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
    AddTargetModel,
    UpdateTargetModel,
    AddTargetRoutingPlanModel,
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
    "$store.state.routingsAndTargets.fetchTargets": function () {
      this.refetchData();
    },
  },
  methods: {
    action(uuid, action) {
      if (action == "routing_plan") {
        this.$bvModal.show("add-target-routing-plan");
      } else if (action == "edit") {
        this.$bvModal.show("update-target");
      }

      this.$store
        .dispatch("routingsAndTargets/getTargetByDetail", uuid)
        .then((response) => {
          this.$store.commit(
            "routingsAndTargets/UPDATE_TARGET",
            response.data.data.targetData
          );
        });
    },
  },
  setup() {
    const {
      fetchTargets,
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
      isPrimaryVariant,
      isPrimaryVariantText,
    } = useAction();

    return {
      fetchTargets,
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
      isPrimaryVariant,
      isPrimaryVariantText,
    };
  },
};
</script>
