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
          </b-table>
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
  },
  data() {
    return {
      fetchCampaignReporting: [{}],
    };
  },
  mixins: [globalHelper],
  watch: {
    "$store.state.managePublisherReporting.timeLineFilter": {
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
      refetchData,
    } = useAction();

    return {
      fetchTimeLineSummary,
      tableColumns,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      refetchData,
    };
  },
};
</script>
