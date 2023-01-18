<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div class="cust_table">
          <b-table
            ref="refListTable"
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="fetchCampaignReporting"
            :fields="tableColumns"
            :sort-by.sync="sortBy"
            :sort-desc.sync="isSortDirDesc"
            :filter="searchQuery"
            class="table-cr"
            show-empty
            empty-text="No records found"
          >
            <template #cell(duplicate)="data">
              <span v-if="data.item.duplicate"> Yes </span>
              <span v-else> No </span>
            </template>

            <template #cell(payout)="data">
              <span v-if="isEmpty(data.item.payout)"> - </span>
              <span v-else>
                {{ getCurrencySign(data.item.currency) }} {{ data.item.payout }}
              </span>
            </template>

            <template #cell(time_to_call)="data">
              <span v-if="data.item.time_to_call">
                {{ data.item.time_to_call }}
              </span>
              <span v-else> 00:00:00 </span>
            </template>
            <template #cell(target_name)="data">
              <span v-if="data.item.target_name">
                {{ data.item.target_name }}
              </span>
              <span v-else> - </span>
            </template>

            <template #cell(recording)="data">
              <span v-if="data.item.recording">
                <a
                  :href="data.item.recording"
                  target="_blank"
                >
                  <feather-icon
                    class="text-body"
                    icon="PlayIcon"
                  />
                </a>
              </span>
              <span v-else> - </span>
            </template>

            <template #cell(call_status)="data">
              <div v-if="data.item.call_status">
                <span
                  v-if="data.item.call_status == 'failed'"
                  class="fail-call"
                  >Failed</span
                >
                <span
                  v-if="
                    ['completed', 'in-progress'].includes(data.item.call_status)
                  "
                  class="complete-call"
                  >Complete</span
                >
                <span
                  v-if="data.item.call_status == 'no-answer'"
                  class="no-ans-call"
                  >no-answer</span
                >
              </div>
              <div v-else>
                <span class="initiated-call">Initiated</span>
              </div>
            </template>
          </b-table>
          <div>
            <b-collapse
              id="customize_column"
              class="customize_column"
            >
              <div class="search_column">
                <b-form-input placeholder="Search"></b-form-input>
              </div>
              <div class="customize_table_column">
                <ul>
                  <li
                    v-for="(custom_Column, parentColumn) in tableColumnArray"
                    :key="parentColumn"
                  >
                    <div class="d-flex align-items-center">
                      <div
                        class="dropdown_cloumn mr-1"
                        v-b-toggle="`cloumn_child-${custom_Column.name}`"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="10"
                          role="presentation"
                          class=""
                        >
                          <path
                            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
                          ></path>
                        </svg>
                      </div>
                      <div class="d-flex align-items-center">
                        <b-form-checkbox></b-form-checkbox>
                        <span>{{ custom_Column.name }}</span>
                      </div>
                    </div>
                    <b-collapse :id="`cloumn_child-${custom_Column.name}`">
                      <ul>
                        <li
                          v-for="(
                            custom_links, childColumn
                          ) in custom_Column.links"
                          :key="childColumn"
                        >
                          <div class="d-flex align-items-center">
                            <b-form-checkbox></b-form-checkbox>
                            <span>{{ custom_links.name }}</span>
                          </div>
                        </li>
                      </ul>
                    </b-collapse>
                  </li>
                </ul>
              </div>
            </b-collapse>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3 pb-2 align-items-center">
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
  BButtonGroup,
} from "bootstrap-vue";

import useAction from "./useAction.js";
import { tableColumnArray } from "../chart/data/filterColumnArray";
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
    BButtonGroup,
  },
  data() {
    return {
      tableColumnArray
    };
  },
  directives: {
    "b-toggle": VBToggle,
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
      fetchCampaignReporting,
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
      center,
    } = useAction();

    return {
      fetchCampaignReporting,
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
      center,
    };
  },
};
</script>
