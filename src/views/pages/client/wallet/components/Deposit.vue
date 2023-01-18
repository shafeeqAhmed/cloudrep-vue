<template>
    <div>
        <div class="wallet-modals text-center mt-3 mb-3">
            <h2>Add Funds</h2>
            <p>Fill up your wallet with balance</p>
            <b-row class="mt-4 align-items-center">
                <b-col md="4">
                    <div>
                        <label for="">Current Balance</label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="float-right">
                        <h2>$826.77</h2>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-2 align-items-center">
                <b-col md="4">
                    <div>
                        <label for="">Recharge Below </label>
                    </div>
                </b-col>
                <b-col md="8">
                    <b-form-input placeholder="Enter Amount"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mt-2 align-items-center">
                <b-col md="4">
                    <div>
                        <label for="">Recharge Below </label>
                    </div>
                </b-col>
                <b-col md="8">
                    <v-select :options="options"   placeholder="Select Amount"></v-select>
                </b-col>
            </b-row>
            <b-row class="mt-4 align-items-center">
                <b-col md="3"></b-col>
                <b-col md="6" cols="12">
                    <button class="upd">Update</button>
                </b-col>
                <b-col md="3"></b-col>
            </b-row>
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
      BLink
  } from "bootstrap-vue";
  import vSelect from "vue-select";
  import WalletHeader from "./WalletHeader.vue";
  
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
      },
      data() {
          return {
          options: ["1", "2", "3"],
          }
      }
  }
  
  </script>
  
  <style scoped lang="scss">
      @import "@/assets/scss/wallet/_wallet.scss";
  </style>