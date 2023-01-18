<template>
  <!-- Complete Home Component Backup -->
  <div>
    <b-row class="mb-3">
      <b-col md="8">
        <p class="user-message">Hi {{ user.name }},</p>
        <h1>Welcome to Cloud Rep!</h1>
      </b-col>

      <!-- search-bar -->
      <b-col md="4">
        <b-input-group class="input-group-merge">
          <b-form-input placeholder="Search" />
          <b-input-group-append is-text>
            <feather-icon icon="SearchIcon" class="text-muted" />
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="align-self-stretched">
      <b-col lg="8" class="mb-2">
        <b-card class="statistics-card h-100">
          <b-row>
            <b-col lg="5" md="5" sm="12">
              <b-card-title class="mb-1 font-large-1 font-weight-bolder">
                Cards
              </b-card-title>
              <b-card-text
                class="font-small-4 font-weight-bolder mt-3 border-left-light"
              >
                Wallet Balance<br />
                <span class="font-small-2 font-weight-normal"> $4,000 </span>
              </b-card-text>
              <b-card-text
                class="font-small-4 font-weight-bolder mt-2 border-left"
              >
                Amount<br />
                <span class="font-small-2 font-weight-normal"> $340 </span>
              </b-card-text>
            </b-col>

            <b-col lg="7" md="7" sm="12">
              <b-img
                class="cursor-pointer w-100"
                src="@/assets/images/dashboard/Illustration.png"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="4" class="mb-2">
        <b-card
          :img-src="require('@/assets/images/banner/banner-12.jpg')"
          img-alt="Profile Cover Photo"
          img-top
          class="card-profile statistics-card h-100"
        >
          <div class="profile-image-wrapper">
            <div class="profile-image p-0">
              <b-avatar
                size="114"
                variant="light"
                :src="require('@/assets/images/portrait/small/avatar-s-9.jpg')"
              />
            </div>
          </div>
          <h3 class="mt-3">Curtis Stone</h3>
          <h6 class="text-muted">Malaysia</h6>
          <b-badge class="profile-badge" variant="light-primary">
            Pro Level
          </b-badge>
          <hr class="mb-2" />

          <!-- follower projects rank -->
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="text-muted font-weight-bolder">Followers</h6>
              <h3 class="mb-0">10.3k</h3>
            </div>
            <div>
              <h6 class="text-muted font-weight-bolder">Projects</h6>
              <h3 class="mb-0">156</h3>
            </div>
            <div>
              <h6 class="text-muted font-weight-bolder">Rank</h6>
              <h3 class="mb-0">23</h3>
            </div>
          </div>
          <!--/ follower projects rank -->
        </b-card>
      </b-col>
    </b-row>

    <b-row class="align-self-stretched">
      <b-col lg="8" class="mb-2">
        <b-card
          v-if="tableData"
          no-body
          class="card-company-table statistics-card h-100"
        >
          <b-card-title class="font-medium-4 font-weight-bolder pl-2 pt-2">
            Your Transactions
          </b-card-title>
          <b-table
            :items="tableData"
            responsive
            :fields="fields"
            class="mb-0 table-cc"
          >
            <!-- id -->
            <template #cell(id)="data">
              <div>
                {{ data.item.id }}
              </div>
            </template>

            <!-- Transitions -->
            <template #cell(transition)="data">
              <div class="d-flex align-items-center">
                <b-avatar size="lg" class="mr-1" :src="data.item.avatar">
                </b-avatar>
                <span class="font-weight-bolder">{{
                  data.item.clientName
                }}</span>
              </div>
            </template>

            <!-- Date -->
            <template #cell(date)="data">
              <div class="d-flex flex-column">
                <span class="font-weight-bold mb-25">{{ data.item.date }}</span>
              </div>
            </template>

            <!-- Amount -->
            <template #cell(amount)="data">
              <b-badge variant="light-success">
                {{ data.item.amount }}
              </b-badge>
            </template>

            <!-- Status -->
            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>
          </b-table>
          <p class="text-right m-2">
            <b-link class="mr-1 font-weight-bolder text-nero text-primary">
              <small class="font-weight-bolder">View All</small>
            </b-link>
            <img
              class="cursor-pointer"
              src="@/assets/images/icons/arrow-right.png"
            />
          </p>
        </b-card>
      </b-col>
      <b-col lg="4" class="mb-2">
        <b-card no-body class="card-payment statistics-card h-100 pt-2 px-2">
          <b-card-header>
            <b-card-title class="font-medium-4 font-weight-bolder"
              >Transfers</b-card-title
            >
          </b-card-header>
          <b-card-body>
            <!-- form -->
            <b-form>
              <b-row>
                <b-col cols="12" class="mb-3">
                  <b-form-group>
                    <v-select
                      v-model="selected1"
                      :options="options"
                      label="title"
                    >
                      <template slot="option" slot-scope="option">
                        <img :src="option.cardImage" class="mr-1" />
                        {{ option.title }}
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" class="mb-3">
                  <b-form-group>
                    <label class="font-medium-1">Card Number</label>
                    <cleave
                      id="payment-card-number"
                      v-model="cardNumber"
                      class="form-control transfer-field"
                      :raw="false"
                      :options="options.creditCard"
                      placeholder="2133 3244 4567 8921"
                    />
                    <b-img
                      src="@/assets/images/dashboard/mastercard.png"
                      class="mastercard-img"
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="6" class="mb-3">
                  <b-form-group label="Expiry" label-for="expiry">
                    <label class="font-medium-1">Expiry</label>
                    <b-form-input
                      id="expiry"
                      type="number"
                      class="form-control transfer-field"
                      placeholder="MM/YY"
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="6" class="mb-3">
                  <b-form-group class="mb-2">
                    <label class="font-medium-1">CVV / CVC</label>
                    <b-form-input
                      id="cvv-cvc "
                      type="number"
                      placeholder="123"
                      class="form-control transfer-field"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    block
                    variant="primary"
                  >
                    Next
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
            <!--/ form -->
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
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
  // BCardSubTitle
} from "bootstrap-vue";
import "@/assets/css/auth.css";
import "@/assets/css/contact-center.css";
import Cleave from "vue-cleave-component";
import vSelect from "vue-select";
import "@core/scss/vue/libs/vue-select.scss";
import Client from "../client/Client.vue";
import { getUserData } from "@/auth/utils";

export default {
  components: {
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
    Client,
    BBadge,
    BButton,
    BModal,
    BFormTextarea,
    BFormFile,
    Cleave,
    vSelect,
    // BCardSubTitle
  },
  data() {
    return {
      user: {},
      cardNumber: "",
      options: {
        creditCard: {
          creditCard: true,
        },
      },
      selected1: {
        title: "Google Pay",
        cardImage: require("@/assets/images/dashboard/mastercard.png"),
      },
      fields: [
        { key: "id", label: "#" },
        { key: "transition", label: "Transitions" },
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount" },
        { key: "status", label: "Status" },
      ],
      tableData: [
        {
          id: 1,
          avatar: require("@/assets/images/portrait/small/avatar-s-20.jpg"),
          clientName: "From Manda Mike",
          date: "Today, 16:30",
          amount: "+$50",
          status: 2,
        },
        {
          id: 2,
          avatar: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
          clientName: "From Jadon S.",
          date: "Today, 16:30",
          amount: "+$50",
          status: 2,
        },
        {
          id: 3,
          avatar: require("@/assets/images/portrait/small/avatar-s-2.jpg"),
          clientName: "From Howard Moccoy",
          date: "Today, 16:30",
          amount: "+$50",
          status: 2,
        },
        {
          id: 4,
          avatar: require("@/assets/images/portrait/small/avatar-s-4.jpg"),
          clientName: "To Esther Howard",
          date: "Today, 16:30",
          amount: "+$50",
          status: 2,
        },
        {
          id: 5,
          avatar: require("@/assets/images/portrait/small/avatar-s-9.jpg"),
          clientName: "From Alex Manda",
          date: "Today, 16:30",
          amount: "+$50",
          status: 2,
        },
      ],
      status: [
        {
          1: "pending",
          2: "paid",
          3: "process",
        },
        {
          1: "light-primary",
          2: "light-success",
          3: "light-danger",
        },
      ],
      options: [
        {
          title: "Google Pay",
          cardImage: require("@/assets/images/dashboard/google.png"),
        },
        {
          title: "Mastercard",
          cardImage: require("@/assets/images/dashboard/mastercard.png"),
        },
      ],
    };
  },
  created() {
    this.user = getUserData();
  },
};
</script>

<style scoped>
</style>
