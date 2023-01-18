<template>
    <div>
        <div class="wallet-modals text-center mt-3 mb-3">
            <h2>Withdraw</h2>
            <p>Please enter user information that you want to send money and enter an amount</p>
            <b-row class="mt-4 align-items-center">
                <b-col md="12" class="mb-2">
                    <h3>Enter Details</h3>
                </b-col>
                <b-col md="4">
                    <div>
                        <label for="">Amount</label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="input-gradient">
                        <b-form-input placeholder="Enter Amount"></b-form-input>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="4">
                    <div>
                        <label for="">Comments</label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="input-gradient">
                        <b-form-textarea placeholder="Enter Comments"></b-form-textarea>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-2 align-items-center">
                <b-col md="4">
                    <div>
                        <label for="">Currency</label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="input-gradient">
                        <v-select :options="options"  placeholder="Select Currency"></v-select>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-2 align-items-center" v-if="hideaddCard">
                <b-col md="4">
                    <div>
                        <label for="">Select Card</label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="input-gradient">
                        <v-select :options="options2"  placeholder="Select Card"></v-select>
                    </div>
                </b-col>
            </b-row>
            
            <div v-if="addCard" class="addcard-details mt-2">
                <b-row class="mt-2 align-items-center">
                    <b-col md="4">
                        <div>
                            <label for="">Card Number</label>
                        </div>
                    </b-col>
                    <b-col md="8">
                        <div class="input-gradient">
                            <b-form-input placeholder="XXXX XXXX XXXX 8923"></b-form-input>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-2 align-items-center">
                    <b-col md="4">
                        <div>
                            <label for="">Expiration</label>
                        </div>
                    </b-col>
                    <b-col md="4">
                        <div class="input-gradient">
                            <v-select :options="options2"  placeholder="Month"></v-select>
                        </div>
                    </b-col>
                    <b-col md="4">
                        <div class="input-gradient">
                            <v-select :options="options2"  placeholder="Year"></v-select>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-2 align-items-center">
                    <b-col md="4">
                        <div>
                            <label for="">CVV</label>
                        </div>
                    </b-col>
                    <b-col md="4">
                        <div class="input-gradient">
                            <b-form-input placeholder=""></b-form-input>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="1"></b-col>
                    <b-col md="1" class="text-right">
                        <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted" > </b-form-checkbox>
                    </b-col>
                    <b-col md="9" class="text-left">
                        <p class="m-0">Save this card for future</p>
                    </b-col>
                </b-row>
            </div>

            <b-row class="mt-4 align-items-center">
                <b-col class="mb-2" md="12" cols="12">
                    <button class="add-cart" v-if="hideaddCard" @click="showcarddet">Add Card</button>
                </b-col>
                <b-col v-if="addCard" @click="showExcard" class="mb-2" md="12" cols="12">
                    <button class="add-cart">Select Existing Card</button>
                </b-col>
                <b-col md="12" cols="12">
                    <button class="upd" @click="gotoPaymentRequest">Request Payout</button>
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
      BFormTextarea,
      BInputGroupPrepend,
      BInputGroup,
      BButton,
      BFormGroup,
      BLink,
      BFormCheckbox,
  } from "bootstrap-vue";
  import vSelect from "vue-select";
  import WalletHeader from "./WalletHeader.vue";
import { methods } from 'vue-echarts';
  
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
          BFormTextarea,
          BInputGroupPrepend,
          BInputGroup,
          BButton,
          BFormGroup,
          BLink,
          vSelect,
          WalletHeader,
          BFormCheckbox,
      },
      data() {
          return {
            options: ["USD", "PKR", "Dollar"],
            options2: ["Visa", "Master"],
            addCard: false,
            hideaddCard: true,
          }
      },
      methods :{
        showcarddet(){
            this.addCard = true
            this.hideaddCard = false
        },
        showExcard(){
            this.addCard = false
            this.hideaddCard = true
        },
        gotoPaymentRequest(){
            this.$router.push({ name: "payment-request" });
        }
      }
  }
  
  </script>
  
  <style scoped lang="scss">
      @import "@/assets/scss/wallet/_wallet.scss";
  </style>