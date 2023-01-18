<template>
    <div class="web3-token-project">
        <div class="web3-token-bg"></div>
        <div class="webtoken-project pb-5">
            <div class="deployed-contracts">
                <div class="container">
                    <Header/>
                    <div class="token-space-50"></div>
                    <b-row>
                        <b-col cols="12" class="mb-4">
                            <h2>Deployed Contracts</h2>
                            <p>The list of contact instannces that this wallet has developed across all mainnets</p>
                        </b-col>
                        <b-col cols="12">
                            <table id="my-table" class="table">
                                <thead>
                                    <tr>
                                        <th scope="col"><div class="d-flex align-items-center">NameToken</div></th>
                                        <th scope="col"><div class="d-flex align-items-center">Created By</div></th>
                                        <th scope="col"><div class="d-flex align-items-center">Token Address</div></th>
                                        <th scope="col"><div class="d-flex align-items-center"></div></th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr>
                                        <td><div class="text-left">Simple ERC - 20 Token</div></td>
                                        <td><div class="text-left">Simple ERC - 20 Token</div></td>
                                        <td><div class="text-left">7a94362d-8c67-45cf-811f-b9fda1447353</div></td>
                                        <td><div class="text-left cursor-pointer" @click="gotoDeployedTokens()"><feather-icon icon="ArrowRightIcon" size="21"/></div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="text-left">ERC 20 AirLock Token</div></td>
                                        <td><div class="text-left">ERC 20 AirLock Token</div></td>
                                        <td><div class="text-left">13c5136c-d115-4de6-b918-8978c4487fa9</div></td>
                                        <td><div class="text-left cursor-pointer" @click="gotoDeployedTokens()"><feather-icon icon="ArrowRightIcon" size="21"/></div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="text-left">ERC-721 for  Store Front</div></td>
                                        <td><div class="text-left">ERC-721 for  Store Front</div></td>
                                        <td><div class="text-left">13c5136c-d115-4de6-b918-8978c4487fa9</div></td>
                                        <td><div class="text-left cursor-pointer" @click="gotoDeployedTokens()"><feather-icon icon="ArrowRightIcon" size="21"/></div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="text-left">Simple ERC-721 Contract</div></td>
                                        <td><div class="text-left">Simple ERC-721 Contract</div></td>
                                        <td><div class="text-left">7a94362d-8c67-45cf-811f-b9fda1447353</div></td>
                                        <td><div class="text-left cursor-pointer" @click="gotoDeployedTokens()"><feather-icon icon="ArrowRightIcon" size="21"/></div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="text-left">ERC-721 Airlock NFT</div></td>
                                        <td><div class="text-left">ERC-721 Airlock NFT</div></td>
                                        <td><div class="text-left">44572d46-f7ee-4f6d-b2a2-a722d7785fa6</div></td>
                                        <td><div class="text-left cursor-pointer" @click="gotoDeployedTokens()"><feather-icon icon="ArrowRightIcon" size="21"/></div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="text-left">Simple ERC-1155 Collection</div></td>
                                        <td><div class="text-left">Simple ERC-1155 Collection</div></td>
                                        <td><div class="text-left">14e51793-6547-4948-8c44-dfc1e9701810</div></td>
                                        <td><div class="text-left cursor-pointer" @click="gotoDeployedTokens()"><feather-icon icon="ArrowRightIcon" size="21"/></div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="text-left">Simple ERC 1155 Airlock Token</div></td>
                                        <td><div class="text-left">Simple ERC 1155 Airlock Token</div></td>
                                        <td><div class="text-left">dbfe2b88-7683-48dc-a945-984a18171aab</div></td>
                                        <td><div class="text-left cursor-pointer" @click="gotoDeployedTokens()"><feather-icon icon="ArrowRightIcon" size="21"/></div></td>
                                    </tr>
                                </tbody>
                            </table>
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
    },
    methods : {
        gotoDeployedTokens(){
            this.$router.push({name:'deployed-contracts-token'})
        }
      }
}
</script>

<style>

</style>