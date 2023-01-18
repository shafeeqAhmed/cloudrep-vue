<template>
    <div>
        <b-row>
            <b-col cols="12">
                <b-table ref="refListTable" responsive :per-page="perPage" :current-page="currentPage" :items="fetchUsers"
                    :fields="tableColumns" :sort-by.sync="sortBy" :sort-desc.sync="isSortDirDesc" :sort-direction="sortDirection"
                    :filter="searchQuery" :filter-included-fields="filterOn" class="table-cr">
                    <template #cell(status)="data">
                        <div class="active-num d-flex align-items-center justify-content-center">
                            <div v-if="data.item.status == 1" class="active-num d-flex align-items-center">
                                Active
                            </div>
                            <div v-else class="text-danger d-flex align-items-center">
                                Deactive
                            </div>
                        </div>
                    </template>
                    <template #cell(actions)="data">
                        <div class="d-flex align-items-center justify-content-center">
                            <div class="action-btn">
                                <feather-icon v-b-modal.add-tag icon="EditIcon" size="20" class="mr-1" />
                                <feather-icon icon="PlayIcon" size="20" class="mr-1" />
                                <feather-icon icon="DownloadIcon" size="20" />
                            </div>
                        </div>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row class="mt-5 pb-5 align-items-center">
            <b-col md="6" sm="6">
                <b-form-group class="mb-0">
                    <label class="d-inline-block text-sm-left mr-50">Show</label>
                    <b-form-select id="perPageSelect" v-model="perPage" :options="perPageOptions" class="page-count-cr" />
                    <label class="d-inline-block text-sm-left">entries</label>
                </b-form-group>
            </b-col>
            <b-col md="6" sm="6">
                <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" align="right" size="sm" class="my-0" hide-goto-end-buttons />
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
        VBModal,
        BPagination,
        BTable,
        BAvatar,
        BBadge,
      } from "bootstrap-vue";
      import { ValidationProvider, ValidationObserver } from "vee-validate";
      import useCampaign from "./useCampaign.js";
      import vSelect from "vue-select";
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
            VBModal,
            BPagination,
            BTable,
            BAvatar,
            BBadge,
            vSelect,
            ValidationProvider,
            ValidationObserver
        },
        directives: {
            "b-modal": VBModal,
        },
        setup(){
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
            } = useCampaign();
    
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
        }
      }
      </script>
      
      <style>
      
      </style>