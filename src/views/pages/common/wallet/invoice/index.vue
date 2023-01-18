<template>
    <div>
      <div class="pb-5">
        <div class="transaction-wallet wallet-lists">
          <b-row class="mt-4 mb-2">
            <b-col cols="12">
              <div class="d-flex align-items-center justify-content-between w-100">
                <h2>Invoice's</h2>
              </div>
            </b-col>
          </b-row>
          <hr />
          <b-row class="mt-2 mb-2">
            <b-col md="4">
                <div class="d-flex justify-content-start">
                  <v-select
                  id="timezone"
                  v-model="selectedCampaign"
                  :options="campaignList"
                  label="campaign_name"
                  :reduce="(list) => list.uuid"
                  
                  placeholder="Fiter by campaign"
                  ></v-select>
                </div>
            </b-col>
            <b-col md="4"></b-col>
            <b-col md="4">
                <div class="d-flex justify-content-end">
                  <date-range-picker
                    ref="picker"
                    opens="left"
                    v-model="dateRange"
                    @update="actionOnFilter"
                    :locale-data="locale"
                  >
                  <div slot="input" slot-scope="picker">{{ dateRange.startDate | date }} - {{  dateRange.endDate | date }}</div>
                  </date-range-picker>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2 mb-2">
            <b-col cols="12" class="mt-2 campaign-listing-page">
              <b-table
                responsive
                ref="refListTable"
                :items="fetchTransactions"
                :fields="tableColumns"
                :sort-by.sync="sortBy"
                show-empty
                empty-text="No records found"
                :sort-desc.sync="isSortDirDesc"
                class="table-cr"
              >
                <template #cell(date)="data">
                    <div class="">
                      <span class="">{{dateFormater(data.item.created_at)}}</span>
                    </div>
                </template>
                <template #cell(type)="data">
                    <div class="">
                      <!-- <span class="">{{capitalizeFirstLetter(data.item.type)}}</span> -->
                      <span v-if="data.item.type == 'withdraw'">Credit</span>
                      <span v-if="data.item.type == 'deposit'">Debit</span>
                    </div>
                </template>
                <template #cell(description)="data">
                    <div class="">
                      <span class="">{{capitalizeFirstLetter(data.item.meta.description)}}</span>
                    </div>
                </template>
                <template #cell(amount)="data">
                    <div>
                      <span v-if="data.item.wallet.meta.currency == 'USD'">$</span>
                      <span class="ml-1">{{ data.item.amount }}</span>
                    </div>
                </template>
                <template #cell(card_type)="data">
                    <div class="">
                      <span class="">Visa</span>
                    </div>
                </template>
                <template #cell(cardNo)="data">
                    <div class="">
                      <span class="">XXXX XXXX XXXX 8923</span>
                    </div>
                </template>
                <template #cell(invoice)="data">
                    <div class="d-flex justify-content-around">
                      <div class="cursor-pointer" @click="gotoPreview(data.item.uuid)">
                        <feather-icon class="" icon="EyeIcon" size="25"/>
                      </div>
                      <div class="cursor-pointer">
                        <feather-icon class="" icon="DownloadIcon" size="25"/>
                      </div>
                    </div>
                </template>
              </b-table>
            </b-col>
            <!-- entries -->
            <b-col cols="6">
              <div class="show-listing">
                <b-form-group class="mb-0">
                  <label class="d-inline-block text-sm-left mr-50">Show</label>
                  <div class="input-gradient">
                    <b-form-select
                      id="perPageSelect"
                      v-model="perPage"
                      :options="perPageOptions"
                      class="page-count-cr"
                    />
                  </div>
                  <label class="d-inline-block text-sm-left ml-1">entries</label>
                </b-form-group>
              </div>
            </b-col>
            <b-col cols="6">
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
      </div>
    </div>
  </template>
  
  <script>
  import {
    BRow,
    BCol,
    BImg,
    BCard,
    BCardBody,
    BCardHeader,
    BCardFooter,
    BCardGroup,
    BCardImg,
    BCardTitle,
    BFormInput,
    BInputGroupPrepend,
    BInputGroup,
    BButton,
    BFormGroup,
    BLink,
    BModal,
    VBModal,
    BFormSelect,
    BTable,
    BPagination,
  } from "bootstrap-vue";
  import DateRangePicker from "vue2-daterange-picker";
  import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
  import { globalHelper } from "@core/mixins/ui/global";
  import { toastAlert } from "@core/mixins/ui/toast";
  import useAction from "./useAction.js";
  import store from "@/store";
  import vSelect from "vue-select";
  import useStore from "./useStore";
  import { onUnmounted } from "@vue/composition-api";
  import moment from 'moment'
  
  export default {
    components: {
      BRow,
      BCol,
      BImg,
      BCard,
      BCardBody,
      BCardHeader,
      BCardFooter,
      BCardGroup,
      BCardImg,
      BCardTitle,
      BFormInput,
      BInputGroupPrepend,
      BInputGroup,
      BButton,
      BFormGroup,
      BLink,
      vSelect,
      BModal,
      VBModal,
      BFormSelect,
      BTable,
      BPagination,
      DateRangePicker,
    },
    directives: {
      "b-modal": VBModal,
      // Ripple,
    },
    filters: {
      date(val) {
        return val ? moment(val).format("YYYY-MM-DD") : "";
      }
    },
    mixins: [globalHelper, toastAlert],
    data() {
      // let obj = store.state.transaction.dateRange
      let startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      let endofDay = new Date();
      endofDay.setDate(startOfDay.getDate());
      endofDay.setHours(23, 59, 59, 999);

      return {
        dateRange: { startDate: startOfDay, endDate: endofDay },
        campaignList: [],
        locale: {
          direction: 'ltr', //direction of text
          format: 'mm/dd/yyyy',
          separator: ' - ', //separator between the two ranges
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
          monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
          firstDay: 1 //ISO first day of week - see moment documenations for details
        }
      }
      
    },
    methods: {
      getUserCampaigns(){
        this.$http
        .get("get-campaigns-by-user")
        .then((response) => {
          const { data: { data: { campaigns } }} = response
            this.campaignList = campaigns
        })
        .catch((error) => {
        })
        .finally(() => {
        });
      },
      dateFormater(val) {
        let d = new Date(val);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        var t = this.formatAMPM(d)
        return `${mo} ${da}, ${ye} - ${t}`;
      },
      formatAMPM(date){
        let hours = date.getHours();
        let minutes = date.getMinutes();    
        const ampm = hours >= 12 ? 'pm' : 'am';

        hours %= 12;
        hours = hours || 12;    
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        const strTime = `${hours}:${minutes} ${ampm}`;

        return strTime;
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      actionOnFilter() {
        this.$store.commit("transaction/UPDATE_DATE_RANGE", this.dateRange)

        this.refetchData()
      },
      gotoPreview(uuid){
        // this.$router.push( name: 'transaction-view', pa)
        // console.log('gotoPreview')
        // console.log(uuid)
        // return false
        // this.$router.push({ path: `/transaction-view?transaction=${uuid}` })
        this.$router.push({ name: 'transaction-view', params: { uuid: uuid } })
      }
    },
    mounted() {
      this.getUserCampaigns()
      // console.log(this.$store.state.wallet)
    },
    setup() {

      const APP_STORE_MODULE_NAME = "transaction";

      // Register module
      if (!store.hasModule(APP_STORE_MODULE_NAME))
        store.registerModule(APP_STORE_MODULE_NAME, useStore);

      // UnRegister on leave
      onUnmounted(() => {
        store.unregisterModule(APP_STORE_MODULE_NAME);
      });


      const {
        fetchTransactions,
        tableColumns,
        perPage,
        currentPage,
        totalUsers,
        perPageOptions,
        // searchQuery,
        sortBy,
        isSortDirDesc,
        refListTable,
        refetchData,
        selectedCampaign,
        // dateRange
      } = useAction();
  
      return {
        fetchTransactions,
        tableColumns,
        perPage,
        currentPage,
        totalUsers,
        perPageOptions,
        // searchQuery,
        sortBy,
        isSortDirDesc,
        refListTable,
        refetchData,
        selectedCampaign,
        // dateRange
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  // @import "@/assets/scss/wallet/_wallet.scss";
  </style>
  