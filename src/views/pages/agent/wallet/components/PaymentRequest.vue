<template>
    <div>
      <div class="wallet-header mb-3">
        <div class="d-flex align-items-center justify-content-between">
            <div class="wallet-heading">
                <h1>Payment Request</h1>
            </div>
            <div>
                <v-select :options="options2" placeholder="Pending Request"></v-select>
            </div>
        </div>
      </div>
      <div class="wallet-content pb-5">
          <div class="payment-request">
            <div class="card">
                <div class="card-header">
                    <h2>Last Payment Request Submitted</h2>
                </div>
                <div class="card-body">
                    <div class="pay-submitted mt-2">
                        <ul>
                            <li>
                                <h4>ID:</h4>
                            </li>
                            <li>
                                <p>18922</p>
                            </li>
                            <li>
                                <h4>Status:</h4>
                            </li>
                            <li>
                                <p class="pending-status">Pending</p>
                            </li>
                            <li>
                                <h4>Request Date:</h4>
                            </li>
                            <li>
                                <p>May 15, 2022 8:00 am</p>
                            </li>
                            <li>
                                <h4>Payment amount:</h4>
                            </li>
                            <li>
                                <p>$250.00</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <h4>Country:</h4>
                            </li>
                            <li>
                                <p>Pakistan</p>
                            </li>
                            <li>
                                <h4>Invoice:</h4>
                            </li>
                            <li>
                                <div class="d-flex align-items-center">
                                    <a href="">View</a>&nbsp;<span> / </span>&nbsp;<a href="">Download</a>
                                </div>
                            </li>
                            <li>
                                <h4>User Comment:</h4>
                            </li>
                            <li>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </li>
                            <li>
                                <h4>Admin Comments:</h4>
                            </li>
                            <li>
                                <p></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
            options: ["Last 30Days", "Last 15Days", "Last 7Days"],
            options2: ["Monthly", "Weekly"],
          }
      }
  }
  
  </script>
  
  <style scoped lang="scss">
      @import "@/assets/scss/wallet/_wallet.scss";
  </style>