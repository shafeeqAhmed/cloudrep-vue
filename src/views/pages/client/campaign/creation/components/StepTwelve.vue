<template>
  <div>
  <div class="upp-header">
        <div class="upp-img">
            <b-img class="w-100" src="@/assets/images/campaign-img/bghead.png" ></b-img>
        </div>
        <div class="upp-heading">
          <h1>Publisher Payout Settings</h1>
      <p> Now let's define the publisher payout settings</p>
        </div>
    </div>
  <div class="card campaign-cards mt-2 pb-2 pt-3">
    <div class="campaign-step-ten campaign-steps ml-1 mr-1 mb-5">
      <!--=======Payout Type========-->
      <b-row class="align-items-center">
        <b-col lg="3" md="3" sm="3" class="col-8">
          <label class="font-medium-1 font-weight-bold">Payout Type &nbsp;
          </label>
        </b-col>
        <b-col lg="1" md="1" sm="1" class="col-4">
          <b-form-checkbox checked="false" v-model="payouts.p_typecheck" name="check-button" switch />
        </b-col>
        <b-col sm="8">
          <div v-if="payouts.p_typecheck">
            <b-button-group size="my-1">
              <b-button @click="payType('fixed_amount')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary" :class="payAmt == 'fixed_amount' ? 'active' : ''">
                Fixed Amount
              </b-button>
              <b-button @click="payType('revshare_percentage')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary" :class="payAmt == 'revshare_percentage' ? 'active' : ''">
                Revshare Percentage
              </b-button>
            </b-button-group>
          </div>
        </b-col>
      </b-row>
      <div v-if="payouts.p_typecheck">
        <div class="mt-2" v-if="this.payAmt == 'fixed_amount' || this.payAmt == 'revshare_percentage'">
          <b-row class="align-items-center">
            <b-col sm="4">
              <label class="font-medium-1 font-weight-bold">Payout On
              </label>
            </b-col>
            <b-col lg="6" md="8" sm="8" >
              <div class="input-gradient">
                <v-select id="payoutOn" v-model="payouts.payoutOn" :options="payoutTypes" label="name"
                placeholder="Choose Type" />
              </div>
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-1"  v-if=" this.payouts.payoutOn == 'Call Length' && this.payAmt == 'fixed_amount' ">
              <b-col sm="4">
                <label class="font-medium-1 font-weight-bold">Length</label>
              </b-col>
              <b-col lg="6" md="8" sm="8">
                <div class="input-gradient">
                  <b-form-input type="number" placeholder="Call Length" class="form-control transfer-field"
                  id="length" v-model="payouts.length" />
                </div>
              </b-col>
          </b-row>
          <b-row class="align-items-center mt-2" v-if="this.payAmt != ''">
            <b-col sm="4">
              <label v-if="this.payAmt == 'fixed_amount'" class="font-medium-1 font-weight-bold">Payout Amount
                &nbsp;
              </label>
              <label v-if="this.payAmt == 'revshare_percentage'" class="font-medium-1 font-weight-bold">Payout
                Percentage</label>
            </b-col>
            <b-col  lg="6" md="8" sm="8">
              <div class="input-gradient">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend v-if="this.payAmt == 'fixed_amount'" is-text>
                    $
                  </b-input-group-prepend>
                  <b-input-group-prepend is-text v-if="this.payAmt == 'revshare_percentage'">
                    %
                  </b-input-group-prepend>
                  <b-form-input type="number" v-if="this.payAmt" placeholder="Enter Amount"
                    class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                </b-input-group>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <!--=======Payout Type========-->
      <!--=======Duplicate Payouts========-->
      <b-row class="align-items-center mt-3">
        <b-col lg="3" md="3" sm="3" >
          <label class="font-medium-1 font-weight-bold">Duplicate Payouts &nbsp;</label>
        </b-col>
        <b-col lg="1" md="1" sm="1">
          <b-form-checkbox checked="false" v-model="payouts.dup_paycheck" name="check-button" switch />
        </b-col>
        <b-col sm="8" v-if="payouts.dup_paycheck">
          <b-button-group>
            <b-button @click="dupPay('disable')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary" :class="duplicatePay == 'disable' ? 'active' : ''">
              Disable
            </b-button>
            <b-button @click="dupPay('enable')" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary"
              :class="duplicatePay == 'enable' ? 'active' : ''">
              Enable
            </b-button>
            <b-button @click="dupPay('time_limit')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary" :class="duplicatePay == 'time_limit' ? 'active' : ''">
              Time Limit
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <div v-if="payouts.dup_paycheck">
        <div class="mt-2" v-if="this.duplicatePay == 'time_limit'">
          <b-row class="align-items-center">
            <b-col lg="4" md="4" sm="4">
              <label class="font-medium-1 font-weight-bold">Days</label>
            </b-col>
            <b-col lg="6" md="8" sm="8">
              <div class="input-gradient">
                <b-form-input placeholder="0" class="form-control" id="days" v-model="payouts.days" />
              </div>
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-1">
            <b-col lg="4" md="4" sm="4">
              <label class="font-medium-1 font-weight-bold">Hours</label>
            </b-col>
            <b-col lg="6" md="8" sm="8">
              <div class="input-gradient">
                <b-form-input placeholder="0" class="form-control" id="hours" v-model="payouts.hours" />
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <!--=======Duplicate Payouts========-->
      <!--=======Payout Hours========-->
      <b-row class="align-items-center mt-3">
        <b-input-group class="input-group-merge">
          <b-col lg="3" md="3" sm="3" class="col-4">
            <label class="font-medium-1 font-weight-bold">
              Payout Hours</label>
          </b-col>
          <b-col lg="1" md="1" sm="1" class="col-2">
            <b-form-checkbox v-model="payouts.payHour" checked="false" name="check-button" switch />
          </b-col>
          <b-col lg="2" md="2" sm="2" class="col-2" v-if="this.payouts.payHour">
            <b-input-group-prepend is-text>
              12/24
            </b-input-group-prepend>
          </b-col>
          <b-col lg="3" md="3" sm="3" class="col-3" v-if="this.payouts.payHour">
            <b-input-group-prepend is-text>
              Advanced
            </b-input-group-prepend>
          </b-col>
          <b-col lg="3" md="3" sm="3" class="col-3" v-if="!this.payouts.payHour">
            <b-input-group-prepend is-text>
              Always Open
            </b-input-group-prepend>
          </b-col>
        </b-input-group>
      </b-row>
      <div class="mt-2" v-if="this.payouts.payHour">
        <b-row class="align-items-center">
          <b-col sm="12" class="">
            <label class="font-weight-bold"> Monday - Sunday </label>
          </b-col>
        </b-row>
        <b-row class="align-items-center mt-1">
          <b-col sm="4" >
            <label class="font-medium-1 mb-1">Open</label>
          </b-col>
          <b-col lg="6" md="8" sm="8">
            <b-form-group>
              <div class="input-gradient">
                <b-input-group class="input-group-merge">
                  <b-form-timepicker v-model="payouts.openTime" id="openTime" placeholder="Select Open Time" />
                  <b-input-group-prepend is-text>
                    <feather-icon icon="ClockIcon" size="21"/>
                  </b-input-group-prepend>
                </b-input-group>
              </div>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <label class="font-medium-1 mb-1">Close</label>
          </b-col>
          <b-col  lg="6" md="8" sm="8">
            <b-form-group>
              <div class="input-gradient">
                <b-input-group class="input-group-merge">
                  <b-form-timepicker v-model="payouts.closeTime" id="closeTime" placeholder="Select Close Time" />
                  <b-input-group-prepend is-text>
                    <feather-icon icon="ClockIcon" size="21"/>
                  </b-input-group-prepend>
                </b-input-group>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="align-items-center">
          <b-col sm="4">
            <label class="font-medium-1 font-weight-bold">Time Zone</label>
          </b-col>
          <b-col  lg="6" md="8" sm="8">
            <div class="input-gradient">
              <v-select id="language" v-model="payouts.timezone" :options="timezones" label="name"
              placeholder="Choose Time Zone" />
            </div>
          </b-col>
        </b-row>
      </div>
      <!--=======Payout Hours========-->
      <!--=====Limit Payout Sec=====-->
      <b-row class="align-items-center mt-2">
        <b-col lg="3" md="3" sm="3">
          <label class="font-medium-1 font-weight-bold">
            Limit Payout
          </label>
        </b-col>
        <b-col lg="1" md="1" sm="1">
          <b-form-checkbox checked="false" v-model="payouts.limit" name="check-button" switch />
        </b-col>
      </b-row>
      <div v-if="this.payouts.limit == true" class="">
        <b-row class="mt-2 align-items-center">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">
              Global Cap
            </label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" name="check-button" switch v-model="payouts.global" />
          </b-col>
          <b-col lg="6" md="8" sm="8">
              <p v-if="this.payouts.global == false">None</p>
              <div class="input-gradient" v-if="this.payouts.global == true">
                <b-input-group class="input-group-merge">
                  <b-form-input type="number" placeholder="Enter Amount"
                    class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                </b-input-group>
              </div>
          </b-col>
        </b-row>
        <b-row class="mt-2 align-items-center">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">
              Global Payout Cap
            </label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" name="check-button" switch v-model="payouts.globalPay">
            </b-form-checkbox>
          </b-col>
          <b-col lg="6" md="8" sm="8">
              <p v-if="this.payouts.globalPay == false">None</p>
              <div class="input-gradient" v-if="this.payouts.globalPay == true">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    $
                  </b-input-group-prepend>
                  <b-form-input type="number" placeholder="Enter Amount"
                    class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                </b-input-group>
              </div>
          </b-col>
        </b-row>
        <b-row class="mt-2 align-items-center">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">
              Monthly Cap
            </label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" name="check-button" switch v-model="payouts.monthly" />
          </b-col>
          <b-col lg="6" md="8" sm="8">
              <p v-if="this.payouts.monthly == false">None</p>
              <div class="input-gradient" v-if="this.payouts.monthly == true">
                <b-input-group class="input-group-merge">
                  <b-form-input type="number" placeholder="Enter Amount"
                    class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                </b-input-group>
              </div>
          </b-col>
        </b-row>
        <b-row class="mt-2 align-items-center">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">
              Monthly Payout Cap
            </label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" name="check-button" switch v-model="payouts.monthlyPay" />
          </b-col>
          <b-col lg="6" md="8" sm="8">
              <p v-if="this.payouts.monthlyPay == false">None</p>
              <div class="input-gradient" v-if="this.payouts.monthlyPay == true">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    $
                  </b-input-group-prepend>
                  <b-form-input type="number" placeholder="Enter Amount"
                    class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                </b-input-group>
              </div>
          </b-col>
        </b-row>
        <b-row class="mt-2 align-items-center">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">
              Daily Cap
            </label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" name="check-button" switch v-model="payouts.daily" />
          </b-col>
          <b-col lg="6" md="8" sm="8">
              <p v-if="this.payouts.daily == false">None</p>
              <div class="input-gradient" v-if="this.payouts.daily == true">
                <b-input-group class="input-group-merge">
                  <b-form-input type="number" placeholder="Enter Amount"
                    class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                </b-input-group>
              </div>
          </b-col>
        </b-row>
        <b-row class="mt-2 align-items-center">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">
              Daily Payout Cap
            </label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" name="check-button" switch v-model="payouts.dailyPay" />
          </b-col>
          <b-col lg="6" md="8" sm="8">
              <p v-if="this.payouts.dailyPay == false">None</p>
              <div class="input-gradient" v-if="this.payouts.dailyPay == true">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    $
                  </b-input-group-prepend>
                  <b-form-input type="number" placeholder="Enter Amount"
                    class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                </b-input-group>
              </div>
          </b-col>
        </b-row>
      </div>
      <!--=====Limit Payout Sec=====-->
      <b-row class="align-items-center mt-3">
        <b-col lg="4" md="4" sm="4" class="col-2">
          <label class="font-medium-1 font-weight-bold">Filters</label>
        </b-col>
        <b-col lg="6" md="8" sm="8" class="mt-1 mb-1">
          <div class="input-gradient">
            <v-select id="language" v-model="payouts.filters.list" :options="filterList" label="name"
            placeholder="Search By Tags" />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4"></b-col>
        <b-col lg="4" md="6" sm="6" class="col-8">
          <div class="input-gradient">
            <v-select id="language" v-model="payouts.filters.sign" :options="filterSign" label="name"
            placeholder="Operator" />
          </div>
        </b-col>
        <b-col lg="2" md="2" sm="2" class="col-4">
          <div class="input-gradient">
            <b-form-input placeholder="Value" id="filterValue" v-model="payouts.filters.value" />
          </div>
        </b-col>
      </b-row>

    </div>
    <div class="campaign-pagination mt-2">
      <div class="text-right">
        <b-button class="back-btn" @click="redirectBack">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 1L1 5M1 5L5 9M1 5L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
            Back
          </b-button>
          <b-button v-if="isUpdate" variant="primary" class="next-btn" @click="updatePayouts">Update
          </b-button>
          <b-button v-else variant="primary" class="next-btn" @click="storPayouts">Next</b-button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BFormGroup,
  BForm,
  BButtonGroup,
  BFormDatepicker,
  BFormTimepicker,
  BFormCheckbox,
  BInputGroupPrepend,
  BInputGroup,
  BCardTitle,
  BCard,
} from "bootstrap-vue";

import flatPickr from "vue-flatpickr-component";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import "@/assets/css/auth.css";

export default {
  directives: {
    Ripple,
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
    flatPickr,
    BButtonGroup,
    BFormDatepicker,
    BFormTimepicker,
    BFormCheckbox,
    BInputGroupPrepend,
    BInputGroup,
    BCardTitle,
    BCard,
  },
  mixins: [toastAlert],
  data() {
    return {
      backgroundImg: require("@/assets/images/auth/background.png"),
      isUpdate: false,
      editPayoutUuid: '',
      payouts: {
        payoutOn: "",
        length: "",
        amount: "",
        days: "",
        hours: "",
        payHour: "",
        openTime: "",
        closeTime: "",
        timezone: "",
        limit: "",
        global: "",
        globalPay: "",
        monthly: "",
        monthlyPay: "",
        daily: "",
        dailyPay: "",
        filters: {
          list: "",
          sign: "",
          value: "",
        },
      },
      payAmt: "fixed_amount",
      duplicatePay: "disable",
      payoutTypes: [
        "Call Length",
        "Call Successfully Connected",
        "Inbound Call",
        "Converted Call",
      ],
      timezones: ["PST", "GST", "UTZ"],
      filterList: ["Time", "Day"],
      filterSign: ["=", "<", ">", "!="],
      payoutType: true,
    };
  },
  methods: {
    payType(val) {
      this.payAmt = val;
    },
    dupPay(val) {
      this.duplicatePay = val;
    },
    storPayouts() {
      this.showLoader()
      this.$http
        .post("store-publisher-payout-settings", {
          user_uuid: this.$store.state.clientCampaign.userUuid,
          campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
          payout_type: this.payAmt,
          payout_on: this.payouts.payoutOn,
          length: this.payouts.length,
          payout_amount: this.payouts.amount,
          duplicate_payouts: this.duplicatePay,
          days: this.payouts.days,
          hours: this.payouts.hours,
          payout_hours: this.payouts.payHour,
          open_time: this.payouts.openTime,
          close_time: this.payouts.closeTime,
          time_zone: this.payouts.timezone,
          limit_payout: this.payouts.limit,
          global_cap: this.payouts.global,
          global_payout_cap: this.payouts.globalPay,
          monthly_cap: this.payouts.monthly,
          monthly_payout_cap: this.payouts.monthlyPay,
          daily_cap: this.payouts.daily,
          daily_payout_cap: this.payouts.dailyPay,
        })
        .then((response) => {
          this.conditionalToast(
              "success",
              "Success",
        "Publish Payout Saved Successfully!",
              "success"
            );
          this.$store.commit('clientCampaign/UPDATE_STEP', 13)
        })
        .catch((error) => {
          this.conditionalToast(
              "danger",
              "Error",
                 "something is going wrong ",
              "error"
            );
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    updatePayouts() {
      this.showLoader()
      this.$http
        .post("update-publisher-payout-setting", {
          uuid: this.editPayoutUuid,
          payout_type: this.payAmt,
          payout_on: this.payouts.payoutOn,
          length: this.payouts.length,
          payout_amount: this.payouts.amount,
          duplicate_payouts: this.duplicatePay,
          days: this.payouts.days,
          hours: this.payouts.hours,
          payout_hours: this.payouts.payHour,
          open_time: this.payouts.openTime,
          close_time: this.payouts.closeTime,
          time_zone: this.payouts.timezone,
          limit_payout: this.payouts.limit,
          global_cap: this.payouts.global,
          global_payout_cap: this.payouts.globalPay,
          monthly_cap: this.payouts.monthly,
          monthly_payout_cap: this.payouts.monthlyPay,
          daily_cap: this.payouts.daily,
          daily_payout_cap: this.payouts.dailyPay,
        })
        .then((response) => {
          this.conditionalToast(
              "success",
              "Success",
        "Publish Payout Update Successfully!",
              "success"
            );
          // this.$router.push({ path: "/publisher" });
          this.$store.commit('clientCampaign/UPDATE_STEP', 13)
        })
        .catch((error) => {
          this.conditionalToast(
              "danger",
              "Error",
                 "something is going wrong ",
              "error"
            );
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    fetchUserPayout() {
      const { campaign } = this.$store.state.clientCampaign
      if (campaign && campaign.publisher_payout_setting) {

        const settings = campaign.publisher_payout_setting

        if (settings.payout_type) {
          this.payouts.p_typecheck = true
        }

        this.editPayoutUuid = settings.uuid

        this.payAmt = settings.payout_type;
        this.payouts.payoutOn = settings.payout_on;
        this.payouts.length = settings.length;
        this.payouts.amount = settings.payout_amount;
        this.duplicatePay = settings.duplicate_payouts;
        this.payouts.days = settings.days;
        this.payouts.hours = settings.hours;
        this.payouts.payHour = settings.payout_hours;
        this.payouts.openTime = settings.open_time;
        this.payouts.closeTime = settings.close_time;
        this.payouts.timezone = settings.time_zone;
        this.payouts.limit = settings.limit_payout;
        this.payouts.global = settings.global_cap;
        this.payouts.globalPay = settings.global_payout_cap;
        this.payouts.monthly = settings.monthly_cap;
        this.payouts.monthlyPay = settings.monthly_payout_cap;
        this.payouts.daily = settings.daily_cap;
        this.payouts.dailyPay = settings.daily_payout_cap;
        this.isUpdate = true;
      }

    },
    redirectBack() {
      if(this.$store.state.clientCampaign.campaign.campaign_rate != null) {
          this.$store.commit("clientCampaign/UPDATE_STEP", 11);
      } else {
          this.$store.commit("clientCampaign/UPDATE_STEP", 10);
      }
    }
  },
  created() {
    this.fetchUserPayout();
  },
};
</script>