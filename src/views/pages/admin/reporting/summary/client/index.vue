<template>
  <div class="summary_content">
    <b-row>
      <b-col cols="12">
        <div>
          <b-table
            ref="refListTable"
            responsive
            :items="fetchTimeLineSummary"
            :fields="tableColumns"
            :sort-by.sync="sortBy"
            :sort-desc.sync="isSortDirDesc"
            :filter="searchQuery"
            class="table-cr"
            show-empty
            empty-text="No records found"
          >
            <template #cell(payout)="data">
              <span v-if="isEmpty(data.item.payout)"> - </span>
              <span v-else>
                {{ data.item.payout }}
              </span>
            </template>
            <template #cell(revenue)="data">
              <span v-if="isEmpty(data.item.revenue)"> - </span>
              <span v-else>
                {{ data.item.revenue }}
              </span></template
            >
            <template #cell(profit)="data">
              <span v-if="isEmpty(data.item.profit)"> - </span>
              <span v-else>
                {{ data.item.profit }}
              </span></template
            >
          </b-table>

          <!-- <span v-if="!totalUsers.length">
            <b-spinner small />
            Uploading...</span
          > -->
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormInvalidFeedback,
  BButton,
  BImg,
  BDropdown,
  BDropdownItem,
  BForm,
  BInputGroup,
  BFormFile,
  BInputGroupPrepend,
  BFormSelect,
  BFormCheckbox,
  BModal,
  BPagination,
  BTable,
  BAvatar,
  BBadge,
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  BCardSubTitle,
  BCollapse,
  VBToggle,
} from "bootstrap-vue";

import useAction from "./useAction.js";
import { globalHelper } from "@core/mixins/ui/global";
import { BSpinner } from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormInvalidFeedback,
    BButton,
    BImg,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormFile,
    BInputGroupPrepend,
    BFormSelect,
    BFormCheckbox,
    BModal,
    BPagination,
    BTable,
    BAvatar,
    BBadge,
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BCardSubTitle,
    BCollapse,
    VBToggle,
    BSpinner,
  },
  data() {
    return {
      fetchCampaignReporting: [{}],
    };
  },
  mixins: [globalHelper],
  watch: {
    "$store.state.manageReporting.timeLineFilter": {
      handler() {
        this.refetchData();
      },
      deep: true,
    },
  },
  methods: {
    isEmpty(myStr) {
      return myStr === null || myStr === "";
    },
  },

  setup() {
    const {
      fetchTimeLineSummary,
      tableColumns,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      totalUsers,
      refetchData,
    } = useAction();

    return {
      fetchTimeLineSummary,
      tableColumns,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      totalUsers,
      refetchData,
    };
  },
};
</script>
