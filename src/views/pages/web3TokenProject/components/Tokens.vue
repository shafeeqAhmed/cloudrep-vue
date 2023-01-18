<template>
    <b-row class="pb-5">
        <b-col cols="12">
            <div class="web3-tokens mt-5 mb-3">
                <h2>Please select the Token that you would like to proceed with</h2>
            </div>
        </b-col>
        <b-col cols="12">
            <div class="web-tokens">
                <div class="token-box" @click="gotoToken_1()">
                    <h3>ERC - 20 Token</h3>
                </div>
                <div class="token-box" @click="gotoToken_2()">
                    <h3>ERC 20 AirLock Token</h3>
                </div>
                <div class="token-box" @click="gotoToken_3()">
                    <h3>ERC-721 for  Store Front</h3>
                </div>
                <div class="token-box" @click="gotoToken_4()">
                    <h3>Simple ERC-721 Contract</h3>
                </div>
                <div class="token-box" @click="gotoToken_5()">
                    <h3>ERC-721 Airlock NFT</h3>
                </div>
                <div class="token-box" @click="gotoToken_6()">
                    <h3>Simple ERC-1155 Collection</h3>
                </div>
                <div class="token-box" @click="gotoToken_7()">
                    <h3>Simple ERC 1155 Airlock Token</h3>
                </div>
            </div>
        </b-col>
    </b-row>
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
      },
      methods : {
        gotoToken_1(){
            this.$router.push({name:'erc-20-token'})
        },
        gotoToken_2(){
            this.$router.push({name:'erc-20-airlocktoken'})
        },
        gotoToken_3(){
            this.$router.push({name:'erc-721-forstorefront'})
        },
        gotoToken_4(){
            this.$router.push({name:'simple-erc-721-contract'})
        },
        gotoToken_5(){
            this.$router.push({name:'erc-721-airlock-nft'})
        },
        gotoToken_6(){
            this.$router.push({name:'simple-erc-1155-collection'})
        },
        gotoToken_7(){
            this.$router.push({name:'simple-erc-1155-airlock-token'})
        },
      }
  }
  </script>
  
  <style>
  
  </style>