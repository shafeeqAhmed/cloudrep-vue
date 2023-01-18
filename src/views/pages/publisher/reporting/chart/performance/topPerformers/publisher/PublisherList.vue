<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        class="mt-2"
      >
        <b-table
          ref="refUserListTable"
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="fetchPublishers"
          :fields="tableColumns"
          :sort-by.sync="sortBy"
          :sort-desc.sync="isSortDirDesc"
          :sort-direction="sortDirection"
          :filter="searchQuery"
          :filter-included-fields="filterOn"
          class="table-cr"
        >
          <template #cell(payout)="data">
            <span v-if="isEmpty(data.item.payout)"> - </span>
            <span v-else>
              {{ getCurrencySign(data.item.currency) }} {{ data.item.payout }}
            </span>
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
          :total-rows="totalUsers"
          :per-page="perPage"
          align="right"
          size="sm"
          class="my-0"
          hide-goto-end-buttons
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BTable,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import router from "@/router";

import usePublisher from "./usePublisher.js";
import { globalHelper } from "@core/mixins/ui/global";

export default {
  components: {
    BTable,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BDropdown,
    BDropdownItem,
  },
  mixins: [globalHelper],

  data() {
    return {
      tabName: "",
      sortDirection: "asc",
      filterOn: [],
    };
  },
  mounted() {
    this.tabName = router.currentRoute.query.type;
  },
  methods: {
    isEmpty(val) {
      return val === "" || val === null;
    },
  },
  setup() {
    const {
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
      refetchData,
      onChangeRefetch,
    } = usePublisher();

    return {
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
      refetchData,
      onChangeRefetch,
    };
  },
};
</script>
