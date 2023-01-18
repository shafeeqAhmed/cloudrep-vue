<template>
    <div>
      <div class="wallet-header mb-3">
        <div class="wallet-heading">
            <h1>Manage You Digital Wallets</h1>
        </div>
      </div>
      <div class="wallet-content pb-5">
          <div class="transaction-wallet wallet-lists">
              <b-row class="mt-3 mb-2">
                  <b-col cols="12">
                      <div class="d-flex align-items-center justify-content-between w-100">
                          <h2>Card Added <span>(3)</span></h2>
                      </div>
                  </b-col>
              </b-row>
              <b-row>
                  <b-col cols="12">
                    <b-table ref="refListTable" responsive :per-page="perPage" :current-page="currentPage" :items="fetchRecords"
                    :fields="tableColumns" :sort-by.sync="sortBy" :sort-desc.sync="isSortDirDesc" :filter="searchQuery"
                    class="table-cr">
                            <template #cell(primary)="data">
                                <div class=""><div class="manage-card-img"><b-img src="@/assets/images/wallet/apple.png"></b-img></div></div>
                            </template>
                            <template #cell(card_nickname)="data">
                                <div class="">
                                    <b-form-checkbox checked="false" name="check-button" switch v-model="digitalwallet.applePay"></b-form-checkbox>
                                </div>
                            </template>
                            <template #cell(actions)="data">
                                <div>
                                    <div class="d-flex align-items-center justify-content-center" v-if="this.digitalwallet.applePay == true" >
                                            <button class="manage-wallet-btn">Manage</button>
                                            <feather-icon icon="TrashIcon" size="21"/>
                                    </div>
                                    <button v-else class="connect-wallet-btn">Connect</button>
                                </div>
                            </template>
                        </b-table>
                  </b-col>
              </b-row>
              <b-row class="mt-4 pb-5">
                <b-col md="6" sm="6">
                    <b-form-group class="mb-0">
                    <label class="d-inline-block text-sm-left mr-50">Show</label>
                        <b-form-select id="perPageSelect" v-model="perPage" :options="perPageOptions" class="page-count-cr" />
                        <label class="d-inline-block text-sm-left">entries</label>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="6">
                    <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" align="right" size="sm"
                    class="my-0" hide-goto-end-buttons />
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
      BFormCheckbox,
    BTable,
    BPagination,
    BFormSelect
  } from "bootstrap-vue";
  import vSelect from "vue-select";
  import WalletHeader from "../components/WalletHeader.vue";
  import useManageDigitalWallet from "./useManageDigitalWallet";
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
          WalletHeader,
          BFormCheckbox,
          BTable,
          BPagination,
          BFormSelect
      },
      
      data() {
          return {
            digitalwallet: {
                applePay:false,
                googlePay:false,
                paypalPay:false,
                samsungPay:false,
            }
          }
      },
      setup() {
        const {
        fetchRecords,
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
        } = useManageDigitalWallet();

        return {
        fetchRecords,
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
    },
  }
  
  </script>
  
  <style scoped lang="scss">
      @import "@/assets/scss/wallet/_wallet.scss";
  </style>