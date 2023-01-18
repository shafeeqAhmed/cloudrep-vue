<template>
    <div>
        <div class="wallet-modals text-center mt-3 mb-3">
            <h2>Add Funds</h2>
            <p>Fill up your wallet with balance</p>
            <b-row class="mt-4 align-items-center">
                <b-col md="4">
                    <div class="text-left">
                        <label for="">Current Balance</label>
                    </div>
                </b-col>
                <b-col md="8" v-if="walletDetail">
                    <div class="d-flex align-items-center">
                        <h2>{{walletDetail.balance}}</h2>
                        <span v-if="walletDetail.meta.currency == 'USD'" class="ml-1">USD</span>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-2 align-items-center">
                <b-col md="4">
                    <div class="text-left">
                        <label for="">Amount </label>
                    </div>
                </b-col>
                <b-col md="8">
                    <div class="input-gradient">
                        <b-form-input type="number" placeholder="Enter Amount" v-model="balance" maxLength="5"></b-form-input>
                    </div>
                    <div class="d-block">
                        <span class="text-danger text-left" v-if="balance.length > 6">Please enter valid value!</span>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-4 align-items-center">
                <b-col md="3"></b-col>
                <b-col md="6" cols="12">
                    <b-button v-if="isDisabled" class="upd" disabled>
                        <div class="d-flex align-items-center justify-content-center">
                            <b-spinner small />
                            <span class="ml-1">Processing...</span>
                        </div>
                    </b-button>
                    <b-button v-else class="upd" @click="store" :disabled="isDisabled">Update</b-button>
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
      BSpinner
  } from "bootstrap-vue";
  import vSelect from "vue-select";
  import WalletHeader from "./WalletHeader.vue";
  import { toastAlert } from "@core/mixins/ui/toast";
  export default {
    props: ['walletDetail','refetchData'],
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
          BSpinner
      },
      mixins: [toastAlert],
      data() {
          return {
            balance:'',
            options: ["1", "2", "3"],
            isDisabled:false
          }
      },
      methods: {
        store(){
            //Check enter value 
            if(this.balance.length > 6){
                return false
            }

            this.isDisabled = true;
            this.$http.post('add-wallet-balance', {
                balance:this.balance
            }).then((response)=>{
                if(response.data.status == true){
                    this.successToast('Success', 'Wallet Balance Added Successfully!');
                    this.$emit('refetchWalletBalance', 'refetch')
                    this.refetchData()
                    this.$bvModal.hide('deposit-modal')
                }
            })
            .finally(()=>{
                this.isDisabled= false;
            });
        }
      }
  }
  
  </script>
  
  <style scoped lang="scss">
      @import "@/assets/scss/wallet/_wallet.scss";
  </style>