<template>
    <div>
      <div class="wallet-header mb-3">
        <div class="wallet-heading">
            <h1>Manage Cards</h1>
        </div>
      </div>
      <div class="wallet-content pb-5">
          <div class="transaction-wallet wallet-lists">
              <b-row class="mt-3 mb-2">
                  <b-col cols="12">
                      <div class="d-flex align-items-center justify-content-between w-100">
                          <h2>Card Added <span>(3)</span></h2>
                      </div>
                  </b-col>
              </b-row>
              <b-row>
                  <b-col cols="12">
                      <table id="my-table" class="table">
                          <thead>
                              <tr>
                              <th scope="col"><div class="d-flex align-items-center justify-content-center">Primary<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                              <th scope="col"><div class="d-flex align-items-center justify-content-center">Card Nickname<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                              <th scope="col"><div class="d-flex align-items-center justify-content-center">Card Type<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                              <th scope="col"><div class="d-flex align-items-center justify-content-center">Card Number<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                              <th scope="col"><div class="d-flex align-items-center justify-content-center">Expiration<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                              <th scope="col"><div class="d-flex align-items-center justify-content-center">Last Failed Attempt<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                              <th scope="col"><div class="d-flex align-items-center justify-content-center">Action<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                              </tr>
                          </thead>
                          <tbody class="text-center">
                              <tr>
                                  <td><div><feather-icon id="star-card-fill" @click="starfill()" icon="StarIcon" size="21"/></div></td>
                                  <td>Customer Service V1</td>
                                  <td><div class="vis-card-img"><b-img src="@/assets/images/wallet/visa.png"></b-img></div></td>
                                  <td>XXXX XXXX XXXX 8923</td>
                                  <td>4/23</td>
                                  <td>September 1, 2022</td>
                                  <td><div><feather-icon icon="EditIcon" class="cursor-pointer mr-1" size="21"/><feather-icon icon="TrashIcon" class="cursor-pointer" size="21"/></div></td>
                              </tr>
                              <tr>
                                  <td><div class=""><feather-icon id="star-card-fill" @click="starfill()" icon="StarIcon" size="21"/></div></td>
                                  <td>Customer Service V1</td>
                                  <td><div class="vis-card-img"><b-img src="@/assets/images/wallet/mast.png"></b-img></div></td>
                                  <td>XXXX XXXX XXXX 8923</td>
                                  <td>4/23</td>
                                  <td>September 1, 2022</td>
                                  <td><div><feather-icon icon="EditIcon" class="cursor-pointer mr-1" size="21"/><feather-icon icon="TrashIcon" class="cursor-pointer" size="21"/></div></td>
                              </tr>
                              <tr>
                                  <td><div class=""><feather-icon id="star-card-fill" @click="starfill()" icon="StarIcon" size="21"/></div></td>
                                  <td>Customer Service V1</td>
                                  <td><div class="vis-card-img"><b-img src="@/assets/images/wallet/visa.png"></b-img></div></td>
                                  <td>XXXX XXXX XXXX 8923</td>
                                  <td>4/23</td>
                                  <td>September 1, 2022</td>
                                  <td><div><feather-icon icon="EditIcon" class="cursor-pointer mr-1" size="21"/><feather-icon icon="TrashIcon" class="cursor-pointer" size="21"/></div></td>
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
      BLink
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
          options: ["Last 30Days", "Last 15Days", "Last 7Days"],
          options2: ["Monthly", "Weekly"],
          }
      },
      methods : {
        starfill(){
            var staricon = document.getElementById('star-card-fill');
            staricon.style.fill="#FBBF24";            
        }
      }
  }
  
  </script>
  
  <style scoped lang="scss">
      @import "@/assets/scss/wallet/_wallet.scss";
      #star-card-fill{
        cursor: pointer;
        stroke: #FBBF24;
    }
  </style>