<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div class="cust_table">
          <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine-dark"
            :columnDefs="columnDefs"
            @grid-ready="onGridReady"
            :defaultColDef="defaultColDef"
            :rowDragManaged="true"
            :animateRows="true"
            :suppressExcelExport="true"
            :popupParent="popupParent"
            :rowData="rowData"
          >
          </ag-grid-vue>
          <div>
            <b-collapse
              id="custom_grid_table"
              class="customize_column"
            >
              <div class="search_column">
                <b-form-input
                  placeholder="Search"
                  v-model="search"
                  @keyup.enter="searchColumn"
                ></b-form-input>
                <span
                  v-if="searchError"
                  class="text-danger"
                  >Please type as listed below!</span
                >
              </div>
              <div class="customize_table_column">
                <ul>
                  <li>
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <b-form-checkbox
                          v-model="selectAllCheckbox"
                          @change="changeSelectAllTableColumn"
                          >Select All</b-form-checkbox
                        >
                      </div>
                    </div>
                  </li>
                  <li
                    v-for="(
                      custom_Column, parentColumn
                    ) in columnDefsForSideMenu"
                    :key="parentColumn"
                  >
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <b-form-checkbox
                          v-model="custom_Column.checkbox"
                          @change="customizeTableColumn(custom_Column)"
                        ></b-form-checkbox>
                        <span>{{ custom_Column.headerName }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </b-collapse>
          </div>
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
  VBToggle,
  BPopover,
  BCollapse,
} from "bootstrap-vue";

// import useAction from "./useAction.js";
import dropdown from "./components/dropdown.vue";
import {
  columnDefs,
  columnDefsForSideMenu,
} from "../chart/data/gridTableData.js";
import { globalHelper } from "@core/mixins/ui/global";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
export default {
  props: ["exportData"],
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
    AgGridVue,
    VBToggle,
    BPopover,
    BCollapse,
    dropdown,
  },
  data() {
    return {
      columnDefs,
      columnDefsForSideMenu,
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      },
      rowData: null,
      tableColumn: false,
      selectAllCheckbox: false,
      search: "",
      searchError: false,
      popupParent: null,
    };
  },
  directives: {
    "b-toggle": VBToggle,
  },
  mixins: [globalHelper],
  watch: {
    search: function (newVal, oldVal) {
      if (newVal == "") {
        this.selectAllColumnDefArray();
      }
    },
    exportData: function (newVal, oldVal) {
      if (newVal) {
        this.onBtnExport();
      }
    },
  },
  computed: {
    summaryData() {
      return this.$store.getters["manageReporting/getSummaryData"];
    },
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      const updateData = (data) => params.api.setRowData(data);
      updateData(this.summaryData);
    },
    customizeTableColumn(col) {
      this.selectAllCheckbox = false;
      if (col.checkbox) {
        this.gridColumnApi.applyColumnState({
          state: [{ colId: col.colId, hide: false }],
          defaultState: { hide: false }, // important to say 'null' as undefined means 'do nothing'
        });
        const index = this.columnDefs.findIndex(
          (data) => data.colId == col.colId
        );
        if (index == -1) {
          this.columnDefs.push(col);
        }
      } else {
        this.gridColumnApi.applyColumnState({
          state: [{ colId: col.colId, hide: true }],
          defaultState: { hide: false }, // important to say 'null' as undefined means 'do nothing'
        });
        const index = this.columnDefs.findIndex(
          (data) => data.colId == col.colId
        );
        this.columnDefs.splice(index, 1);
      }
    },
    changeSelectAllTableColumn() {
      if (this.selectAllCheckbox) {
        this.selectAllColumnDefArray();
      } else {
        this.unSelectColumnDefArray();
      }
    },
    selectAllColumnDefArray() {
      this.columnDefs = [
        {
          field: "call_date",
          colId: "1",
          headerName: "Call Date",
          checkbox: true,
        },
        {
          field: "campaign_name",
          colId: "2",
          headerName: "Campaign Name",
          checkbox: true,
        },
        {
          field: "publisher_name",
          colId: "3",
          headerName: "Publisher Name",
          checkbox: true,
        },
        {
          field: "caller_id",
          colId: "4",
          headerName: "Caller ID",
          checkbox: true,
        },
        { field: "dialed", colId: "5", headerName: "Dialed", checkbox: true },
        {
          field: "time_to_call",
          colId: "6",
          headerName: "Time To Call",
          checkbox: true,
        },
        {
          field: "duplicate",
          colId: "7",
          headerName: "Duplicate",
          checkbox: true,
        },
        {
          field: "call_status",
          colId: "8",
          headerName: "Call Status",
          checkbox: true,
        },
        {
          field: "time_to_connect",
          colId: "9",
          headerName: "Time To Connect",
          checkbox: true,
        },
        {
          field: "target_name",
          colId: "10",
          headerName: "Target Name",
          checkbox: true,
        },
        {
          field: "revenue",
          colId: "11",
          headerName: "Revenue",
          checkbox: true,
        },
        { field: "payout", colId: "12", headerName: "Payout", checkbox: true },
        { field: "profit", colId: "13", headerName: "Profit", checkbox: true },
        {
          field: "duration",
          colId: "14",
          headerName: "Duration",
          checkbox: true,
        },
        {
          field: "recording",
          colId: "15",
          headerName: "Recording",
          checkbox: true,
        },
      ];
      this.columnDefsForSideMenu = [
        {
          field: "call_date",
          colId: "1",
          headerName: "Call Date",
          checkbox: true,
        },
        {
          field: "campaign_name",
          colId: "2",
          headerName: "Campaign Name",
          checkbox: true,
        },
        {
          field: "publisher_name",
          colId: "3",
          headerName: "Publisher Name",
          checkbox: true,
        },
        {
          field: "caller_id",
          colId: "4",
          headerName: "Caller ID",
          checkbox: true,
        },
        { field: "dialed", colId: "5", headerName: "Dialed", checkbox: true },
        {
          field: "time_to_call",
          colId: "6",
          headerName: "Time To Call",
          checkbox: true,
        },
        {
          field: "duplicate",
          colId: "7",
          headerName: "Duplicate",
          checkbox: true,
        },
        {
          field: "call_status",
          colId: "8",
          headerName: "Call Status",
          checkbox: true,
        },
        {
          field: "time_to_connect",
          colId: "9",
          headerName: "Time To Connect",
          checkbox: true,
        },
        {
          field: "target_name",
          colId: "10",
          headerName: "Target Name",
          checkbox: true,
        },
        {
          field: "revenue",
          colId: "11",
          headerName: "Revenue",
          checkbox: true,
        },
        { field: "payout", colId: "12", headerName: "Payout", checkbox: true },
        { field: "profit", colId: "13", headerName: "Profit", checkbox: true },
        {
          field: "duration",
          colId: "14",
          headerName: "Duration",
          checkbox: true,
        },
        {
          field: "recording",
          colId: "15",
          headerName: "Recording",
          checkbox: true,
        },
      ];
    },
    unSelectColumnDefArray() {
      this.columnDefs = [];
      this.columnDefsForSideMenu.forEach((element) => {
        element.checkbox = false;
      });
    },
    searchColumn() {
      const data = this.columnDefsForSideMenu.find(
        (e) => e.headerName === this.search
      );
      if (data == undefined) {
        this.searchError = true;
      } else {
        this.searchError = false;
        console.log(data);

        //Side Bar Column List Update
        this.columnDefsForSideMenu = [];
        data.checkbox = true;
        this.columnDefsForSideMenu.push(data);

        //Table Column List Update
        this.columnDefs = [];
        this.columnDefs.push(data);
      }
    },
    onBtnExport() {
      console.log("onBtnExport");
      console.log(this.gridApi.getDataAsCsv());
      this.gridApi.exportDataAsCsv();
    },
  },
};
</script>
