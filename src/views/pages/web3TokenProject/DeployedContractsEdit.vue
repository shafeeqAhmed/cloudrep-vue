<template>
    <div class="web3-token-project">
        <div class="web3-token-bg"></div>
        <div class="webtoken-project pb-5">
            <div class="deployed-contracts">
                <div class="container">
                    <h2>ERC - 20 Token</h2>
                    <b-row class="knowledge-base-content">
                        <b-col cols="12">
                            <div class="deployed-tokens">
                                <app-collapse accordion>
                                    <app-collapse-item title="Total Minted Tokens">
                                        <b-row>
                                            <b-col sm="4" class="mt-1">
                                                <div class="web3-btn-connect">
                                                    <b-button>Total Mint Token</b-button>
                                                </div>
                                            </b-col>
                                            <b-col sm="6"  class="mt-1">
                                                <b-form-input placeholder="9,887,811"></b-form-input>
                                            </b-col>
                                        </b-row>
                                    </app-collapse-item>
                                    <app-collapse-item title="Maximum supply">
                                        <b-row>
                                            <b-col sm="4" class="mt-1">
                                                <div class="web3-btn-connect">
                                                    <b-button>Maximum Supply</b-button>
                                                </div>
                                            </b-col>
                                            <b-col sm="6"  class="mt-1">
                                                <b-form-input placeholder="9,887,811"></b-form-input>
                                            </b-col>
                                        </b-row>
                                    </app-collapse-item>
                                    <app-collapse-item title="Mint Tokens">
                                        <b-row>
                                            <b-col sm="6"  class="mt-1">
                                                <label for="">Receiver Address</label>
                                                <b-form-input placeholder="Enter Address"></b-form-input>
                                            </b-col>
                                            <b-col sm="6"  class="mt-1">
                                                <label for="">Amount</label>
                                                <b-form-input placeholder="Enter Amount"></b-form-input>
                                            </b-col>
                                            <b-col cols="12" class="mt-2">
                                                <div class="web3-btn-connect">
                                                    <b-button>Mint Token</b-button>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </app-collapse-item>
                                    <app-collapse-item title="Transfer Tokens">
                                        <b-row>
                                            <b-col sm="6" class="mt-1">
                                                <label for="">Sender Address</label>
                                                <b-form-input placeholder="Enter Sender Address"></b-form-input>
                                            </b-col>
                                            <b-col sm="6" class="mt-1">
                                                <label for="">Receiver Address</label>
                                                <b-form-input placeholder="Enter Address"></b-form-input>
                                            </b-col>
                                            <b-col sm="6" class="mt-1">
                                                <label for="">Amount</label>
                                                <b-form-input placeholder="Enter Amount"></b-form-input>
                                            </b-col>
                                            <b-col cols="12" class="mt-2">
                                                <div class="web3-btn-connect">
                                                    <b-button>Transfer Token</b-button>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </app-collapse-item>
                                    <app-collapse-item title="Burn Tokens">
                                        <b-row>
                                            <b-col sm="6"  class="mt-1">
                                                <label for="">User</label>
                                                <b-form-input placeholder="Enter User"></b-form-input>
                                            </b-col>
                                            <b-col sm="6"  class="mt-1">
                                                <label for="">Amount</label>
                                                <b-form-input placeholder="Enter Amount"></b-form-input>
                                            </b-col>
                                            <b-col cols="12" class="mt-2">
                                                <div class="web3-btn-connect">
                                                    <b-button>Burn Token</b-button>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </app-collapse-item>
                                    <app-collapse-item title="Update Max Supply">
                                        <b-row>
                                            <b-col sm="6"  class="mt-1">
                                                <label for="">Amount</label>
                                                <b-form-input placeholder="Enter Amount"></b-form-input>
                                            </b-col>
                                            <b-col cols="12" class="mt-2">
                                                <div class="web3-btn-connect">
                                                    <b-button>Update Max Supply</b-button>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </app-collapse-item>
                                </app-collapse>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BMedia,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BImg,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BTable,
  BFormCheckbox,
  BBadge,
  BButton,
  BModal,
  BFormTextarea,
  BFormFile,
} from "bootstrap-vue";
import Header from './components/Header.vue';
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
export default {
    components : {
        BRow,
        BCol,
        BCard,
        BCardText,
        BLink,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BMedia,
        BAvatar,
        BMediaAside,
        BMediaBody,
        BImg,
        BCardHeader,
        BCardBody,
        BCardTitle,
        BDropdown,
        BDropdownItem,
        BTable,
        BFormCheckbox,
        BBadge,
        BButton,
        BModal,
        BFormTextarea,
        BFormFile,  
        Header,
        AppCollapse,
        AppCollapseItem,
    }
}
</script>

<style>

</style>