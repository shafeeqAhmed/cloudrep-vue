<template>
    <div>
        <div class="wallet-modals text-center mt-3 mb-3">
            <h2>Transfer</h2>
            <p>Please enter user information that you want to send money and enter an amount</p>
            <b-row class="mt-4 mb-3 align-items-center">
                <b-col md="12">
                    <div class="text-left">
                        <h2>Select Method</h2>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-1 mb-1 align-items-center">
                <b-col md="4">
                    <div>
                        <label for="">Amount</label>
                    </div>
                </b-col>
                <b-col md="8">
                    <b-form-input placeholder="Enter Amount"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col cols="12">
                    <div class="credit-method tr-met mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <b-img src="@/assets/images/wallet/credit.png"></b-img>
                            </div>
                            <div>
                                <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                            </div>
                        </div>
                    </div>
                    <div class="credit-method tr-met mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <b-img src="@/assets/images/wallet/apple.png"></b-img>
                            </div>
                            <div>
                                <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                            </div>
                        </div>
                    </div>
                    <div class="credit-method tr-met mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <b-img src="@/assets/images/wallet/google.png"></b-img>
                            </div>
                            <div>
                                <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                            </div>
                        </div>
                    </div>
                    <div class="credit-method tr-met mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <b-img src="@/assets/images/wallet/paypal.png"></b-img>
                            </div>
                            <div>
                                <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                            </div>
                        </div>
                    </div>
                    <div class="credit-method tr-met mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <b-img src="@/assets/images/wallet/samsung.png"></b-img>
                            </div>
                            <div>
                                <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-4 align-items-center">
                <b-col cols="12">
                    <button class="upd">Continue</button>
                </b-col>
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
      BFormRadio,
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
          BFormRadio,
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