<template>
    <div>
        <div class="wallet-modals text-center mt-3 mb-3">
            <h2>Recharge Settings</h2>
            <p>When your balance falls below the selected balance we'll automatically refill your account to prevent any service interruption</p>
            <b-row class="mt-4 align-items-center">
                <b-col md="4">
                    <div class="text-left">
                        <label for="">Auto Recharge </label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="text-left">
                        <b-form-checkbox  checked="true" switch inline> </b-form-checkbox>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-2 align-items-center">
                <b-col md="4">
                    <div class="text-left">
                        <label for="">Recharge Below </label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="input-gradient">
                        <v-select :options="options"  placeholder="Select Amount"></v-select>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-2 align-items-center">
                <b-col md="4">
                    <div class="text-left">
                        <label for="">Recharge Amount </label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="input-gradient">
                        <v-select :options="options"  placeholder="Select Amount"></v-select>
                    </div>
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
      BLink,
      BFormCheckbox
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
          BFormCheckbox
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