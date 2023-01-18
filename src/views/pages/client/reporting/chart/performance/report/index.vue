<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        class="mb-1"
      >
        <h2>Report</h2>
      </b-col>

      <b-col cols="12">
        <b-table
          ref="refListTable"
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="fetchPerformanceReport"
          :fields="tableColumns"
          :sort-by.sync="sortBy"
          :sort-desc.sync="isSortDirDesc"
          :filter="searchQuery"
          class="table-cr"
          show-empty
          empty-text="No records found"
        >
          <template #cell(revenue)="data">
            <span v-if="isEmpty(data.item.revenue)"> - </span>
            <span v-else>
              {{ getCurrencySign(data.item.currency) }} {{ data.item.revenue }}
            </span>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BTable, BButton } from "bootstrap-vue";

import useAction from "./useAction.js";
import { globalHelper } from "@core/mixins/ui/global";

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BButton,
  },
  mixins: [globalHelper],
  methods: {
    isEmpty(val) {
      return val === "" || val === null;
    },
  },
  setup() {
    const {
      fetchPerformanceReport,
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
    } = useAction();

    return {
      fetchPerformanceReport,
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
    };
  },
};
</script>
