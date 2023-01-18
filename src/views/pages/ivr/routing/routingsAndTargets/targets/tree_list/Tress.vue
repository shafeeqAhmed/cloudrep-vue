<template>
    <div>
        <b-row>
            <b-col cols="12">
                <b-table ref="refListTable" responsive :per-page="perPage" :current-page="currentPage" :items="fetchUsers"
                    :fields="tableColumns" :sort-by.sync="sortBy" :sort-desc.sync="isSortDirDesc"
                    :filter="searchQuery" class="table-cr">
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
      import useTress from "./useTress.js";
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
            vSelect
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
            } = useTress();
    
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