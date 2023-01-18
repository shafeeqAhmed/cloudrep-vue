<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-step-nine campaign-steps ml-1 mr-1">
        <div class="">
          <!--=====commissions Sec=====-->
          <b-row class="align-items-center">
            <b-col sm="3">

              <div class="d-flex align-items-center">
                <b-form-checkbox checked="false" v-model="payouts.commission" name="check-button" switch />
                <h3 class="mr-2 m-0">Commission</h3>
              </div>

            </b-col>
            <b-col lg="8" md="8" sm="8" v-if="payouts.commission">
              <div>
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

          <div v-if="payouts.commission">
            <div class="mt-2" v-if="this.payAmt == 'fixed_amount' || this.payAmt == 'revshare_percentage'">
              <!--=Payout On=-->
              <b-row class="align-items-center">
                <b-col sm="4" class="mb-1">
                  <label class="font-medium-1 font-weight-bold">Payout On
                  </label>
                </b-col>
                <b-col lg="6" md="8" sm="8">
                  <div class="input-gradient">
                    <v-select id="payoutOn" v-model="payouts.payoutOn" :options="payoutTypes" label="name"
                      placeholder="Choose Type" />
                  </div>
                </b-col>
              </b-row>
              <!--=Payout On=-->

              <b-row class="align-items-center mt-1"
                v-if="this.payouts.payoutOn == 'Call Length' && this.payAmt == 'fixed_amount'">
                <b-col sm="4" class="mb-1">
                  <label class="font-medium-1 font-weight-bold">Length</label>
                </b-col>
                <b-col lg="6" md="8" sm="8">
                  <div class="input-gradient">
                    <b-form-input type="number" placeholder="Call Length" class="form-control transfer-field"
                      id="length" v-model="payouts.length" />
                  </div>
                </b-col>
                <!-- <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>

                </b-row>
              </b-col> -->
              </b-row>
              <b-row class="align-items-center mt-1" v-if="this.payAmt != ''">
                <b-col sm="4" class="mb-1">
                  <label v-if="this.payAmt == 'fixed_amount'" class="font-medium-1 font-weight-bold">Commission Amount
                    &nbsp;
                  </label>
                  <label v-if="this.payAmt == 'revshare_percentage'" class="font-medium-1 font-weight-bold">Payout
                    Percentage</label>
                </b-col>
                <b-col lg="6" md="8" sm="8">
                  <div class="input-gradient">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend v-if="this.payAmt == 'fixed_amount'" is-text>
                        $
                      </b-input-group-prepend>
                      <b-input-group-prepend is-text v-if="this.payAmt == 'revshare_percentage'">
                        %
                      </b-input-group-prepend>
                      <b-form-input type="number" v-if="payAmt != '' && payAmt != 'none'" placeholder="Enter Amount"
                        class="form-control transfer-field" id="amount" v-model="payouts.amount" />
                    </b-input-group>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
          <!--=====commissions Sec=====-->
          <!--=====Bounties Sec=====-->
          <!--=====Bounties Sec=====-->
          <!--=====Tips Sec=====-->
          <b-row class="align-items-center mt-2">
            <b-col sm="3">

              <div class="d-flex align-items-center">
                <b-form-checkbox checked="false" v-model="payouts.tips" name="check-button" switch />
                <h3 class="mr-2 m-0">Tips</h3>
              </div>

            </b-col>
          </b-row>
          <!--=====Tips Sec=====-->
          <!--=====Bonus Sec=====-->
          <b-row class="align-items-center mt-2">
            <b-col sm="3">

              <div class="d-flex align-items-center">
                <b-form-checkbox checked="false" v-model="payouts.bonus" name="check-button" switch />
                <h3 class="mr-2 m-0">Bonus</h3>
              </div>

            </b-col>
            <b-col lg="4" md="6" sm="6" v-if="payouts.bonus">
              <div class="input-gradient">
                <v-select id="bonusType" v-model="payouts.bonusType" :options="bonusTypes" label="name"
                  placeholder="Choose Type" />
              </div>
            </b-col>
            <b-col md="2" sm="6" v-if="payouts.bonus">
              <div class="input-gradient">
                <b-form-input type="text" placeholder="Value" id="bonusValue" v-model="payouts.bonusValue" />
              </div>
            </b-col>
          </b-row>
          <!--=====Bonus Sec=====-->
        </div>

        <!--=====Duplicate Payouts Sec=====-->
        <!-- <b-row class="align-items-center mt-2">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">Duplicate Payouts &nbsp;</label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" v-model="payouts.duplipay" name="check-button" switch />
          </b-col>
          <b-col sm="8">
            <div v-if="payouts.duplipay">
              <b-button-group>
                <b-button @click="dupPay('disable')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary" :class="duplicatePay == 'disable' ? 'active' : ''">
                  Disable
                </b-button>
                <b-button @click="dupPay('enable')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary" :class="duplicatePay == 'enable' ? 'active' : ''">
                  Enable
                </b-button>

                <b-button @click="dupPay('time_limit')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary" :class="duplicatePay == 'time_limit' ? 'active' : ''">
                  Time Limit
                </b-button>
              </b-button-group>
            </div>
          </b-col>
        </b-row> -->
        <!--=time limit On=-->
        <!-- <div v-if="payouts.duplipay">
          <div class="" v-if="this.duplicatePay == 'time_limit'">
            <b-row class="align-items-center mt-1">
              <b-col lg="4" md="4" sm="4" >
                <label class="font-medium-1 font-weight-bold">Days</label>
              </b-col>
              <b-col lg="6" md="8" sm="8" >
                <div class="input-gradient">
                  <b-form-input type="number" placeholder="0" class="form-control" id="days" v-model="payouts.days" />
                </div>
              </b-col>
            </b-row>
            <b-row class="align-items-center mt-1">
              <b-col lg="4" md="4" sm="4" >
                <label class="font-medium-1 font-weight-bold">Hours</label>
              </b-col>
              <b-col lg="6" md="8" sm="8" >
                <div class="input-gradient">
                  <b-form-input type="number" placeholder="0" class="form-control" id="hours"
                  v-model="payouts.hours" />
                </div>
              </b-col>
            </b-row>

          </div>
        </div> -->
        <!--=time limit On=-->
        <!--=====Duplicate Payouts Sec=====-->
        <!--=====Payout Hours Sec=====-->
        <!-- <b-row class="align-items-center mt-2">
          <b-input-group class="input-group-merge">
            <b-col lg="3" md="3" sm="3">
              <label class="font-medium-1 font-weight-bold">
                Payout Hours</label>
            </b-col>
            <b-col lg="1" md="1" sm="1">
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
        </b-row> -->

        <!-- <div class="" v-if="this.payouts.payHour"> -->
        <!--=days=-->
        <!-- <b-row class="align-items-center">
            <b-col sm="12" class="p-0 m-1">
              <label class="font-weight-bold"> Monday - Sunday </label>
            </b-col>
          </b-row>
          <b-row class="align-items-center mt-1">
            <b-col lg="4" md="4" sm="4">
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
          </b-row>
          <b-row class="align-items-center mt-1">
            <b-col lg="4" md="4" sm="4">
              <label class="font-medium-1 mb-1">Close</label>
            </b-col>
            <b-col lg="6" md="8" sm="8">
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
          </b-row> -->
        <!--=days=-->
        <!--=time zone=-->
        <!-- <b-row class="align-items-center mt-1">
            <b-col sm="4">
              <label class="font-medium-1 font-weight-bold">Time Zone</label>
            </b-col>
            <b-col lg="6" md="8" sm="8" >
              <div class="input-gradient">
                <v-select id="language" v-model="payouts.timezone" :options="timezones" label="name"
                placeholder="Choose Time Zone" />
              </div>
            </b-col>
          </b-row> -->
        <!--=time zone=-->
        <!-- </div> -->
        <!--=====Payout Hours Sec=====-->
        <!--=====Limit Payout Sec=====-->
        <!-- <b-row class="align-items-center mt-2">
          <b-col lg="3" md="3" sm="3">
            <label class="font-medium-1 font-weight-bold">
              Limit Payout
            </label>
          </b-col>
          <b-col lg="1" md="1" sm="1">
            <b-form-checkbox checked="false" v-model="payouts.limit" name="check-button" switch />
          </b-col>
        </b-row> -->
        <!-- <div v-if="this.payouts.limit == true" class="">
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
        </div> -->
        <!--=====Limit Payout Sec=====-->
        <!--=====Filter Sec=====-->
        <!-- <b-row class="align-items-center mt-3">
          <b-col lg="4" md="4" sm="4">
            <label class="font-medium-1 font-weight-bold">Filters</label>
          </b-col>

          <b-col lg="6" md="8" sm="8" class="col-10">
            <div class="input-gradient">
              <v-select id="language" v-model="payouts.filters.condition" :options="filterList" label="name"
              placeholder="Tag" />
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-1 mb-5">
          <b-col sm="4"></b-col>
          <b-col lg="4" md="6" sm="6" >
            <div class="input-gradient">
              <v-select id="language" v-model="payouts.filters.operator" :options="filterSign" label="name"
              placeholder="Operator" />
            </div>
          </b-col>

          <b-col lg="2" md="2" sm="2" class="col-4">
            <div class="input-gradient">
              <b-form-input placeholder="Value" id="filterValue" v-model="payouts.filters.value" />
            </div>
          </b-col>
        </b-row> -->
        <!--=====Filter Sec=====-->
      </div>
      <div class="campaign-pagination mt-2">
        <div class="text-right">
          <!-- <b-button class="back-btn" @click="$store.commit('clientCampaign/UPDATE_STEP', 10)">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L1 5M1 5L5 9M1 5L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Back
          </b-button> -->
          <b-button v-if="isUpdate" variant="primary" class="next-btn" @click="updatePayouts">
            Save
          </b-button>
          <b-button v-else variant="primary" class="next-btn" @click="storPayouts">Save</b-button>
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
      editPayoutUuid: "",
      payouts: {
        commission: false,
        tips: false,
        bonusType: '',
        bonusValue: '',
        duplipay: false,
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
        bonus: "",
        filters: {
          condition: "",
          operator: "",
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
      payoutType: 1,
      bonusTypes: [
        "Annual",
        "Sales",
        "Performance",
        "Dependability",
      ],
    };
  },
  computed: {
    agentPayoutSetting() {
      return this.$store.clientCampaign.campaign.agent_payout_setting
    }
  },
  methods: {
    payType(val) {
      this.payAmt = val;
    },
    dupPay(val) {
      this.duplicatePay = val;
    },
    storPayouts() {
      this.showLoader();
      this.$http
        .post("store-agent-payout-settings", {
          user_uuid: this.$store.state.clientCampaign.userUuid,
          campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
          commission_type: this.payAmt,
          commission: this.payouts.commission,
          tips: this.payouts.tips,
          bonus_type: this.payouts.bonusType,
          bonus_value: this.payouts.bonusValue,
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
          bounties_condition: this.payouts.filters.condition,
          bounties_operator: this.payouts.filters.perator,
          bounties_value: this.payouts.filters.value,
          step: 11,
        })
        .then((response) => {

this.conditionalToast(
              "success",
              "Success",
        "Publish Payout Saved Successfully!",
              "success"
            );

          this.$store.commit('clientCampaign/UPDATE_STEP', 12)
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
        .post("update-agent-payout-setting", {
          uuid: this.editPayoutUuid,
          campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
          commission_type: this.payAmt,
          commission: this.payouts.commission,
          tips: this.payouts.tips,
          bonus_type: this.payouts.bonusType,
          bonus_value: this.payouts.bonusValue,
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
          bounties_condition: this.payouts.filters.condition,
          bounties_operator: this.payouts.filters.perator,
          bounties_value: this.payouts.filters.value

          // payout_type: this.payAmt,
          // payout_on: this.payouts.payoutOn,
          // length: this.payouts.length,
          // payout_amount: this.payouts.amount,
          // duplicate_payouts: this.duplicatePay,
          // days: this.payouts.days,
          // hours: this.payouts.hours,
          // payout_hours: this.payouts.payHour,
          // open_time: this.payouts.openTime,
          // close_time: this.payouts.closeTime,
          // time_zone: this.payouts.timezone,
          // limit_payout: this.payouts.limit,
          // global_cap: this.payouts.global,
          // global_payout_cap: this.payouts.globalPay,
          // monthly_cap: this.payouts.monthly,
          // monthly_payout_cap: this.payouts.monthlyPay,
          // daily_cap: this.payouts.daily,
          // daily_payout_cap: this.payouts.dailyPay,
          // bounties_condition: this.payouts.filters.condition,
          // bounties_operator: this.payouts.filters.perator,
          // bounties_value: this.payouts.filters.value

        })
        .then((response) => {
          this.conditionalToast(
              "success",
              "Success",
        "Publish Payout Update Successfully!",
              "success"
            );
          this.$store.commit('clientCampaign/UPDATE_STEP', 12)
        })
        .catch((error) => {
          this.conditionalToast(
              "danger",
              "Error",
                "something is going wrong",
              "error"
            );
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    fetchUserPayout() {


      const { campaign } = this.$store.state.clientCampaign
      if (campaign && campaign.agent_payout_setting) {

        const { agent_payout_setting } = campaign
        this.editPayoutUuid = agent_payout_setting.uuid;
        this.payAmt = agent_payout_setting.payout_type;
        this.payouts.payoutOn = agent_payout_setting.payout_on;
        this.payouts.commission = agent_payout_setting.commission;
        this.payouts.tips = agent_payout_setting.tips;
        this.payouts.length = agent_payout_setting.length;
        this.payouts.amount = agent_payout_setting.payout_amount;
        this.duplicatePay = agent_payout_setting.duplicate_payouts;
        this.payouts.days = agent_payout_setting.days;
        this.payouts.hours = agent_payout_setting.hours;
        this.payouts.payHour = agent_payout_setting.payout_hours;
        this.payouts.openTime = agent_payout_setting.open_time;
        this.payouts.closeTime = agent_payout_setting.close_time;
        this.payouts.timezone = agent_payout_setting.time_zone;
        this.payouts.limit = agent_payout_setting.limit_payout;
        this.payouts.global = agent_payout_setting.global_cap;
        this.payouts.globalPay = agent_payout_setting.global_payout_cap;
        this.payouts.monthly = agent_payout_setting.monthly_cap;
        this.payouts.monthlyPay = agent_payout_setting.monthly_payout_cap;
        this.payouts.daily = agent_payout_setting.daily_cap;
        this.payouts.dailyPay = agent_payout_setting.daily_payout_cap;
        if (agent_payout_setting.bonus_type) {
          this.payouts.bonus = true
        }
        if (agent_payout_setting.duplicate_payouts) {
          this.payouts.duplipay = true
        }
        this.payouts.bonusType = agent_payout_setting.bonus_type
        this.payouts.bonusValue = agent_payout_setting.bonus_value
        this.payouts.filters.condition = agent_payout_setting.bounties_condition
        this.payouts.filters.perator = agent_payout_setting.bounties_operator
        this.payouts.filters.value = agent_payout_setting.bounties_value
        this.isUpdate = true;

      }
    },
  },
  created() {
    this.fetchUserPayout();
    const agent = this.$store.getters['clientCampaign/campaign']
    // console.log()
  },
};
</script>


