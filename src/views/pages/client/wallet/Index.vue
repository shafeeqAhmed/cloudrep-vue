<template>
  <div>
    <div class="wallet-header mb-3">
        <WalletHeader/>
    </div>
    <div class="wallet-content pb-5">
        <b-row>
            <b-col md="4" sm="5">
                <div class="wallet-cards">
                    <b-card>
                        <b-card-header>
                            <div class="d-flex align-items-center justify-content-between w-100">
                                <div>
                                    <b-card-title>Total Balance</b-card-title>
                                </div>
                                <div>
                                    <!-- <feather-icon icon="MoreVerticalIcon" size="21" /> -->
                                </div>
                            </div>
                        </b-card-header>
                        <b-card-body>
                            <div class="wallet-balance mt-1 mb-2">
                                <h2>$35,580.00 <span>USD</span></h2>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="wallet-tag mr-2">
                                    <span>+14.67%</span>
                                </div>
                                <div class="wallet-date">
                                    <p>Mar 02, 2022</p>
                                </div>
                            </div>
                        </b-card-body>
                    </b-card>
                </div>
            </b-col>
            <b-col md="8" sm="7">
                <div class="wallet-cards">
                    <b-card>
                        <b-card-header>
                            <div class="d-flex align-items-center justify-content-between w-100">
                                <div>
                                    <b-card-title>Quick Links</b-card-title>
                                </div>
                            </div>
                        </b-card-header>
                        <b-card-body>
                            <div class="wallet-quick-links">
                                <b-row>
                                    <b-col md="3">
                                        <div class="quick-card" v-b-modal.deposit-modal>
                                            <div class="quick-link-img">
                                                <b-img src="@/assets/images/wallet/money-dollar.png"></b-img>
                                            </div>
                                            <h3>Deposit</h3>
                                        </div>
                                        <b-modal id="deposit-modal"  centered ok-only ok-title="Close" modal-class="modal-cr modal-uv" hide-header hide-footer>
                                            <Deposit/>
                                        </b-modal>
                                    </b-col>
                                    <b-col md="3">
                                        <div class="quick-card">
                                            <div class="quick-link-img">
                                                <b-img src="@/assets/images/wallet/withdraw.png"></b-img>
                                            </div>
                                            <h3>Withdraw</h3>
                                        </div>
                                        
                                    </b-col>
                                    <b-col md="3">
                                        <div class="quick-card" v-b-modal.transfer-modal>
                                            <div class="quick-link-img">
                                                <b-img src="@/assets/images/wallet/transfer.png"></b-img>
                                            </div>
                                            <h3>Transfer</h3>
                                        </div>
                                        <b-modal id="transfer-modal"  centered ok-only ok-title="Close" modal-class="modal-cr modal-uv" hide-header hide-footer>
                                            <Transfer/>
                                        </b-modal>
                                    </b-col>
                                    <b-col md="3">
                                        <div class="quick-card" v-b-modal.recharge-modal>
                                            <div class="quick-link-img">
                                                <b-img src="@/assets/images/wallet/money-dollar.png"></b-img>
                                            </div>
                                            <h3>Recharge</h3>
                                        </div>
                                        <b-modal id="recharge-modal"  centered ok-only ok-title="Close" modal-class="modal-cr modal-uv" hide-header hide-footer>
                                            <Recharge/>
                                        </b-modal>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-card-body>
                    </b-card>
                </div>
            </b-col>
        </b-row>
        <div class="wallet-lists">
            <b-row  class="mt-3 mb-3">
                <b-col md="4">
                    <h2>My Card List <span>(2)</span></h2>
                </b-col>
                <b-col md="8">
                    <div class="d-flex align-items-start justify-content-around list-wall">
                        <div>
                            <v-select :options="options" placeholder="Last 30Days"></v-select>
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
                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div>
                                        <b-card-title>Statistics</b-card-title>
                                    </div>
                                </div>
                            </b-card-header>
                            <b-card-body>
                            </b-card-body>
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
            <b-row>
                <b-col cols="12">
                    <table id="my-table" class="table">
                        <thead>
                            <tr>
                            <th scope="col"><div class="d-flex align-items-center">Date<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Admin Comment<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Status<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Amount<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Card Number<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Invoice<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="d-flex align-items-center">Mar 20, 2019 23:14</div></td>
                                <td>Thank you! That was very helpful!</td>
                                <td><div class="pending-transaction">Pending</div></td>
                                <td>$575.00</td>
                                <td>XXXX XXXX XXXX 8923</td>
                                <td><div class="d-flex align-items-center"><feather-icon class="mr-1" icon="EyeIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center">Mar 20, 2019 23:14</div></td>
                                <td>Thank you! That was very helpful!</td>
                                <td><div class="approved-transaction">Approved</div></td>
                                <td>$575.00</td>
                                <td>XXXX XXXX XXXX 8923</td>
                                <td><div class="d-flex align-items-center"><feather-icon class="mr-1" icon="EyeIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center">Mar 20, 2019 23:14</div></td>
                                <td>Thank you! That was very helpful!</td>
                                <td><div class="approved-transaction">Approved</div></td>
                                <td>$575.00</td>
                                <td>XXXX XXXX XXXX 8923</td>
                                <td><div class="d-flex align-items-center"><feather-icon class="mr-1" icon="EyeIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center">Mar 20, 2019 23:14</div></td>
                                <td>Thank you! That was very helpful!</td>
                                <td><div class="pending-transaction-danger">Pending</div></td>
                                <td>$575.00</td>
                                <td>XXXX XXXX XXXX 8923</td>
                                <td><div class="d-flex align-items-center"><feather-icon class="mr-1" icon="EyeIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center">Mar 20, 2019 23:14</div></td>
                                <td>Thank you! That was very helpful!</td>
                                <td><div class="approved-transaction">Approved</div></td>
                                <td>$575.00</td>
                                <td>XXXX XXXX XXXX 8923</td>
                                <td><div class="d-flex align-items-center"><feather-icon class="mr-1" icon="EyeIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center">Mar 20, 2019 23:14</div></td>
                                <td>Thank you! That was very helpful!</td>
                                <td><div class="pending-transaction-danger">Pending</div></td>
                                <td>$575.00</td>
                                <td>XXXX XXXX XXXX 8923</td>
                                <td><div class="d-flex align-items-center"><feather-icon class="mr-1" icon="EyeIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                        </tbody>
                    </table>
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import WalletHeader from "./components/WalletHeader.vue";
import Deposit from "./components/Deposit.vue";
import Recharge from "./components/Recharge.vue";
import Transfer from "./components/Transfer.vue";

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
        Transfer
    },
    directives: {
        "b-modal": VBModal,
    },
    data() {
        return {
        options: ["Last 30Days", "Last 15Days", "Last 7Days"],
        options2: ["Monthly", "Weekly"],
        }
    },
    methods: {
        gotoManageCard() {
            this.$router.push({ name: "manage-card" });
        }
    }
}

</script>

<style scoped lang="scss">
    @import "@/assets/scss/wallet/_wallet.scss";
</style>