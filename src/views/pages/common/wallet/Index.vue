<template>
  <div>
    <div class="wallet-header mb-3">
      <WalletHeader />
    </div>
    <div class="wallet-content pb-5">
      <b-row>
        <b-col md="3" sm="5">
          <div class="wallet-cards">
            <b-card>
              <b-card-header>
                <div
                  class="d-flex align-items-center justify-content-between w-100"
                >
                  <div>
                    <b-card-title>Total Balance</b-card-title>
                  </div>
                  <div>
                    <!-- <feather-icon icon="MoreVerticalIcon" size="21" /> -->
                  </div>
                </div>
              </b-card-header>
              <b-card-body>
                <div class="wallet-balance mt-1 mb-2" v-if="walletDetail">
                  <!-- {{walletDetail.meta.currency}} -->
                  <h2><span v-if="walletDetail.meta.currency == 'USD'" class="mr-1 wallet-balance-content">$</span>{{walletDetail.balance}}<span v-if="walletDetail.meta.currency == 'USD'" class="ml-1 wallet-balance-content">USD</span></h2>
                  <!-- <h2>$35,580.00 <span>USD</span></h2> -->
                </div>
                <div class="d-flex align-items-center">
                  <div class="wallet-tag mr-2">
                    <span>+14.67%</span>
                  </div>
                  <div class="wallet-date">
                    <!-- <p>Mar 02, 2022</p> -->
                    <p>{{walletDetail.created_at}}</p>
                  </div>
                </div>
              </b-card-body>
            </b-card>
          </div>
        </b-col>
        <b-col md="9" sm="7">
          <div class="wallet-cards">
            <b-card>
              <b-card-header>
                <div
                  class="d-flex align-items-center justify-content-between w-100"
                >
                  <div>
                    <b-card-title>Quick Links</b-card-title>
                  </div>
                </div>
              </b-card-header>
              <b-card-body>
                <div class="wallet-quick-links">
                  <b-row>
                    <b-col md="3" v-if="userData.role == 'client'">
                      <div class="quick-card" v-b-modal.deposit-modal>
                        <div class="quick-link-img mb-1">
                          <b-img
                            src="@/assets/images/wallet/money-dollar.png"
                          ></b-img>
                        </div>
                        <h3>Deposit</h3>
                      </div>
                      <b-modal
                        id="deposit-modal"
                        centered
                        ok-only
                        ok-title="Close"
                        modal-class="modal-cr modal-uv"
                        hide-header
                        hide-footer
                      >
                        <Deposit :walletDetail="walletDetail"  :refetchData="refetchData" @refetchWalletBalance="refetchWalletBalance($event)" />
                      </b-modal>
                    </b-col>
                    <b-col md="3" v-if="userData.role == 'publisher' || userData.role == 'agent'">
                      <div class="quick-card">
                        <div class="quick-link-img mb-1" v-b-modal.withdraw-modal>
                          <b-img
                            src="@/assets/images/wallet/withdraw (2).png"
                          ></b-img>
                        </div>
                        <h3>Withdraw</h3>
                      </div>
                      <b-modal id="withdraw-modal"  centered ok-only ok-title="Close" modal-class="modal-cr modal-uv" hide-header hide-footer>
                          <withdraw/>
                      </b-modal>
                    </b-col>
                    <b-col md="3">
                      <div class="quick-card" v-b-modal.transfer-modal>
                        <div class="quick-link-img mb-1">
                          <b-img
                            src="@/assets/images/wallet/transfer.png"
                          ></b-img>
                        </div>
                        <h3>Transfer</h3>
                      </div>
                      <b-modal
                        id="transfer-modal"
                        centered
                        ok-only
                        ok-title="Close"
                        modal-class="modal-cr modal-uv"
                        hide-header
                        hide-footer
                      >
                        <Transfer />
                      </b-modal>
                    </b-col>
                    <b-col md="3" v-if="userData.role == 'client'">
                      <div class="quick-card" v-b-modal.recharge-modal>
                        <div class="quick-link-img mb-1">
                          <b-img
                            src="@/assets/images/wallet/recharge.png"
                          ></b-img>
                        </div>
                        <h3>Recharge</h3>
                      </div>
                      <b-modal
                        id="recharge-modal"
                        centered
                        ok-only
                        ok-title="Close"
                        modal-class="modal-cr modal-uv"
                        hide-header
                        hide-footer
                      >
                        <Recharge />
                      </b-modal>
                    </b-col>
                    <b-col md="3" v-if="userData.role == 'publisher' || userData.role == 'agent'">
                        <div class="quick-card" v-b-modal.request-modal>
                            <div class="quick-link-img mb-1">
                                <b-img src="@/assets/images/wallet/request-payout.png"></b-img>
                            </div>
                            <h3>Request Payout</h3>
                        </div>
                        <b-modal id="request-modal"  centered ok-only ok-title="Close" modal-class="modal-cr modal-uv" hide-header hide-footer>
                            <Request/>
                        </b-modal>
                    </b-col>
                    <b-col md="3" >
                      <div class="quick-card">
                        <div class="quick-link-img mb-1">
                          <b-img
                            src="@/assets/images/wallet/rewards.png"
                          ></b-img>
                        </div>
                        <h3>Rewards</h3>
                      </div>
                    </b-col>
                    <b-col md="3" >
                      <div class="quick-card" @click="gotoInovicing">
                        <div class="quick-link-img mb-1">
                          <b-img
                            src="@/assets/images/wallet/rewards.png"
                          ></b-img>
                        </div>
                        <h3>Invoice</h3>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </b-card-body>
            </b-card>
          </div>
        </b-col>
      </b-row>
      <div class="wallet-lists">
        <b-row class="mt-3 mb-3">
          <b-col md="4">
            <h2>My Card List <span>(2)</span></h2>
          </b-col>
          <b-col md="8">
            <div
              class="d-flex align-items-start justify-content-around list-wall"
            >
              <div>
                <v-select
                  :options="options"
                  placeholder="Last 30Days"
                ></v-select>
              </div>
              <div>
                <h4>Transactions</h4>
                <span>56</span>
              </div>
              <div>
                <h4>Total Spent</h4>
                <span>$24,692.00</span>
              </div>
              <div>
                <h4>Total Cashback</h4>
                <span>$24,692.00</span>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <div class="master-card">
              <b-img src="@/assets/images/wallet/master.png"></b-img>
              <button @click="gotoManageCard" class="mt-5">Manage Cards</button>
            </div>
          </b-col>
          <b-col md="8">
            <div class="wallet-cards">
              <b-card>
                <b-card-header>
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <div>
                      <b-card-title>Statistics</b-card-title>
                    </div>
                  </div>
                </b-card-header>
                <b-card-body> </b-card-body>
              </b-card>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="transaction-wallet wallet-lists">
        <b-row class="mt-4 mb-2">
          <b-col cols="12">
            <div class="d-flex align-items-center justify-content-between w-100">
              <h2>Transaction</h2>
              <div>
                <v-select :options="options2" placeholder="Monthly"></v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-2 mb-2">
          <!-- entries -->
          <b-col md="8" sm="4" class="">
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
          <!-- filter -->
          <b-col md="4" class="justify-content-end">
            <b-form-group class="mb-0">
              <b-input-group>
                <div class="input-gradient">
                  <b-form-input
                    id="filterInput"
                    v-on:keyup.enter="searchQueryFetch"
                    v-model="searchQuery"
                    type="search"
                    placeholder="Search..."
                  />
                </div>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" class="mt-2 campaign-listing-page">
            <b-table
              responsive
              ref="refListTable"
              :items="fetchUsers"
              :fields="tableColumns"
              primary-key="id"
              :sort-by.sync="sortBy"
              show-empty
              empty-text="No records found"
              :sort-desc.sync="isSortDirDesc"
              class="table-cr"
            >
              <template #cell(type)="data">
                  <div class="">
                    <span class="">{{data.item.meta.description}}</span>
                  </div>
              </template>
              <!-- <template #cell(Amount)="data">
                  <div class="">
                    <span class="">{{data.item.Amount}}</span>
                  </div>
              </template> -->
              <template #cell(meta)="data">
                  <div class="">
                    <span class="">Thank you! That was very helpful!</span>
                  </div>
              </template>
              <template #cell(transaction_type)="data">
                  <div class="">
                    <span v-if="(Math.sign(data.item.Amount) === -1)">Credit</span>
                    <span v-else >Debit</span>
                  </div>
              </template>
              <template #cell(cardNo)="data">
                  <div class="">
                    <span class="" v-if="data.item.type == 'deposit'">XXXX XXXX XXXX 8923</span>
                  </div>
              </template>
            </b-table>
          </b-col>
          <b-col cols="12">
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
import WalletHeader from "./components/WalletHeader.vue";
import Deposit from "./components/Deposit.vue";
import Recharge from "./components/Recharge.vue";
import Transfer from "./components/Transfer.vue";
import withdraw from "./components/withdraw.vue";
import Request from "./components/Request.vue";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";

import { globalHelper } from "@core/mixins/ui/global";
import { toastAlert } from "@core/mixins/ui/toast";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import useWallet from "./useWallet.js";
import useStore from "./useStore";
import { getUserData } from '@/auth/utils'

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
    Deposit,
    BModal,
    VBModal,
    Recharge,
    Transfer,
    Request,
    BFormSelect,
    BTable,
    BPagination,
    withdraw
  },
  directives: {
    "b-modal": VBModal,
    // Ripple,
  },
  mixins: [globalHelper, toastAlert],
  data() {
    return {
      userData: '',
      walletDetail: '',
      options: ["Last 30Days", "Last 15Days", "Last 7Days"],
      options2: ["Monthly", "Weekly"],
    };
  },
  methods: {
    gotoManageCard() {
      this.$router.push({ name: "manage-card" });
    },
    gotoInovicing(){
      this.$router.push({ name: "invoices-detail" });
    },
    searchQueryFetch() {
      this.refetchData();
    },
    getWallet(){
      this.showLoader()
      this.$http.get('get-wallet-balance').then((response)=>{
          const { data: { wallet } } = response
          this.walletDetail = wallet
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(()=>{
        this.hideLoader();
      })
    },
    refetchWalletBalance(event){
      this.getWallet()
    }
  },
  mounted() {
    this.userData = getUserData()
    this.getWallet()
  },
  setup() {
    const APP_STORE_MODULE_NAME = "wallet";

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, useStore);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });

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
    } = useWallet();

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
      refetchData,
    };
  },
};
function isNegative(num) {
  if (Math.sign(num) === -1) {
    return true;
  }

  return false;
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/wallet/_wallet.scss";

.wallet-balance{
  .wallet-balance-content{
    font-size: 30px !important;
  }
}
</style>
