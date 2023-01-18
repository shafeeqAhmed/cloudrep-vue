<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      
        <b-col sm="12" class="auth-bg px-1 p-sm-5 -wrap">
          <b-card class="p-1">
            <b-card-title title-tag="h1" class="mb-1 title">
              Publisher Payout Settings
            </b-card-title>
            <p class="mt-2 mb-5">
              Now let's define the publisher payout settings
            </p>
            <hr />
            <b-row>
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row class="align-items-center">
                  <b-col sm="3">
                    <label class="font-medium-1 font-weight-bold"
                      >Payout Type &nbsp;
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <b-button-group size="my-1">
                      <b-button
                        @click="payType('fixed_amount')"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        :class="payAmt == 'fixed_amount' ? 'active' : ''"
                      >
                        Fixed Amount
                      </b-button>
                      <b-button
                        @click="payType('revshare_percentage')"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        :class="payAmt == 'revshare_percentage' ? 'active' : ''"
                      >
                        Revshare Percentage
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                sm="8"
                class="py-2 px-xl-2 mx-auto"
                v-if="this.payAmt == 'fixed_amount'"
              >
                <b-row class="align-items-center">
                  <b-col sm="3">
                    <label class="font-medium-1 font-weight-bold"
                      >Payout On
                    </label>
                  </b-col>
                  <b-col sm="9">
                    <v-select
                      id="payoutOn"
                      v-model="payouts.payoutOn"
                      :options="payoutTypes"
                      label="name"
                      placeholder="Choose Type"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>

            <b-row
              class="align-items-center"
              v-if="
                this.payouts.payoutOn == 'Call Length' &&
                this.payAmt == 'fixed_amount'
              "
            >
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-col sm="3">
                    <label class="font-medium-1 font-weight-bold">Length</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      placeholder="Call Length"
                      class="form-control transfer-field"
                      id="length"
                      v-model="payouts.length"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                sm="8"
                class="py-2 px-xl-2 mx-auto"
                v-if="this.payAmt != ''"
              >
                <b-row class="align-items-center">
                  <b-col sm="4">
                    <label
                      v-if="this.payAmt == 'fixed_amount'"
                      class="font-medium-1 font-weight-bold"
                      >Payout Amount &nbsp;
                    </label>
                    <label
                      v-if="this.payAmt == 'revshare_percentage'"
                      class="font-medium-1 font-weight-bold"
                      >Payout Percentage</label
                    >
                  </b-col>
                  <b-col sm="8">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend
                        v-if="this.payAmt == 'fixed_amount'"
                        is-text
                      >
                        $
                      </b-input-group-prepend>
                      <b-input-group-prepend
                        is-text
                        v-if="this.payAmt == 'revshare_percentage'"
                      >
                        %
                      </b-input-group-prepend>
                      <b-form-input
                        v-if="this.payAmt"
                        placeholder="Enter Amount"
                        class="form-control transfer-field"
                        id="amount"
                        v-model="payouts.amount"
                      />
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row class="align-items-center">
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold"
                      >Duplicate Payouts &nbsp;</label
                    >
                  </b-col>
                  <b-col sm="8">
                    <b-button-group>
                      <b-button
                        @click="dupPay('disable')"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        :class="duplicatePay == 'disable' ? 'active' : ''"
                      >
                        Disable
                      </b-button>
                      <b-button
                        @click="dupPay('enable')"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        :class="duplicatePay == 'enable' ? 'active' : ''"
                      >
                        Enable
                      </b-button>

                      <b-button
                        @click="dupPay('time_limit')"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        :class="duplicatePay == 'time_limit' ? 'active' : ''"
                      >
                        Time Limit
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row
              class="align-items-center"
              v-if="this.duplicatePay == 'time_limit'"
            >
              <b-col sm="8" class="py-2 px-xl-6 mx-auto">
                <b-row>
                  <b-col sm="3"> </b-col>
                  <b-col sm="2">
                    <b-form-input
                      placeholder="0"
                      class="form-control"
                      id="days"
                      v-model="payouts.days"
                    />
                  </b-col>
                  <b-col sm="2">
                    <label class="font-medium-1 font-weight-bold">Days</label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-input
                      placeholder="0"
                      class="form-control"
                      id="hours"
                      v-model="payouts.hours"
                    />
                  </b-col>
                  <b-col sm="2">
                    <label class="font-medium-1 font-weight-bold">Hours</label>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-input-group class="input-group-merge">
                    <b-col sm="4">
                      <label class="font-medium-1 font-weight-bold">
                        Payout Hours</label
                      >
                    </b-col>
                    <b-col sm="2">
                      <b-form-checkbox
                        v-model="payouts.payHour"
                        checked="false"
                        name="check-button"
                        switch
                      />
                    </b-col>
                    <b-col sm="2" v-if="this.payouts.payHour">
                      <b-input-group-prepend is-text>
                        12/24
                      </b-input-group-prepend>
                    </b-col>
                    <b-col sm="3" v-if="this.payouts.payHour">
                      <b-input-group-prepend is-text>
                        Advanced
                      </b-input-group-prepend>
                    </b-col>
                    <b-col sm="3" v-if="!this.payouts.payHour">
                      <b-input-group-prepend is-text>
                        Always Open
                      </b-input-group-prepend>
                    </b-col>
                  </b-input-group>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center" v-if="this.payouts.payHour">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-col sm="6" class="p-0">
                  <label class="font-weight-bold"> Monday - Sunday </label>
                </b-col>
                <b-row>
                  <b-col lg="6">
                    <b-form-group>
                      <label class="font-medium-1 mb-1">Open</label>
                      <b-form-timepicker
                        v-model="payouts.openTime"
                        id="openTime"
                        placeholder="No Time"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="font-medium-1 mb-1">Close</label>
                      <b-form-timepicker
                        v-model="payouts.closeTime"
                        id="closeTime"
                        placeholder="No Time"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row v-if="this.payouts.payHour">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row class="align-items-center">
                  <b-col sm="3">
                    <label class="font-medium-1 font-weight-bold"
                      >Time Zone</label
                    >
                  </b-col>
                  <b-col sm="6">
                    <v-select
                      id="language"
                      v-model="payouts.timezone"
                      :options="timezones"
                      label="name"
                      placeholder="Choose Time Zone"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold">
                      Limit Payout
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-checkbox
                      checked="false"
                      v-model="payouts.limit"
                      name="check-button"
                      switch
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center" v-if="this.payouts.limit == true">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold">
                      Global Cap
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-checkbox
                      checked="false"
                      name="check-button"
                      switch
                      v-model="payouts.global"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center" v-if="this.payouts.limit == true">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold">
                      Global Payout Cap
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-checkbox
                      checked="false"
                      name="check-button"
                      switch
                      v-model="payouts.globalPay"
                    >
                    </b-form-checkbox>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center" v-if="this.payouts.limit == true">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold">
                      Monthly Cap
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-checkbox
                      checked="false"
                      name="check-button"
                      switch
                      v-model="payouts.monthly"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center" v-if="this.payouts.limit == true">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold">
                      Monthly Payout Cap
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-checkbox
                      checked="false"
                      name="check-button"
                      switch
                      v-model="payouts.monthlyPay"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center" v-if="this.payouts.limit == true">
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row>
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold">
                      Daily Cap
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-checkbox
                      checked="false"
                      name="check-button"
                      switch
                      v-model="payouts.daily"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center" v-if="this.payouts.limit == true">
              <b-col sm="8" class="py-2 px-l-2 mx-auto">
                <b-row>
                  <b-col sm="4">
                    <label class="font-medium-1 font-weight-bold">
                      Daily Payout Cap
                    </label>
                  </b-col>
                  <b-col sm="2">
                    <b-form-checkbox
                      checked="false"
                      name="check-button"
                      switch
                      v-model="payouts.dailyPay"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="8" class="py-2 px-xl-2 mx-auto">
                <b-row class="align-items-center">
                  <b-col sm="2">
                    <label class="font-medium-1 font-weight-bold"
                      >Filters</label
                    >
                  </b-col>

                  <b-col sm="3">
                    <v-select
                      id="language"
                      v-model="payouts.filters.list"
                      :options="filterList"
                      label="name"
                      placeholder="Tag"
                    />
                  </b-col>

                  <b-col sm="4">
                    <v-select
                      id="language"
                      v-model="payouts.filters.sign"
                      :options="filterSign"
                      label="name"
                      placeholder="Operator"
                    />
                  </b-col>

                  <b-col sm="2">
                    <b-form-input
                      placeholder="Value"
                      id="filterValue"
                      v-model="payouts.filters.value"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="align-items-center">
              <b-col sm="12" class="py-2 px-xl-2 mx-auto">
                <b-button
                  v-if="isUpdate"
                  variant="primary float-right"
                  class="mt-2"
                  @click="updatePayouts"
                  >Update</b-button
                >
                <b-button
                  v-else
                  variant="primary float-right"
                  class="mt-2"
                  @click="storPayouts"
                  >Complete</b-button
                >
              </b-col>
            </b-row>
          </b-card>
        </b-col>
    </b-row>
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
import LeftPublisher from "./LeftPublisher.vue";
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
    LeftPublisher,
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
      payAmt: "",
      duplicatePay: "",
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
      this.$http
        .post("store-publisher-payout-settings", {
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
          this.successToast("Success", "Publish Payout Saved Successfully!");
          this.$router.push({ path: "/publisher" });
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    updatePayouts() {
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
          this.successToast("Success", "Publish Payout Update Successfully!");
          this.$router.push({ path: "/publisher" });
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    fetchUserPayout() {
      this.$http
        .get("my-publisher-payout-setting")
        .then((response) => {
          const {
            data: {
              data: { publisher_payout_settings },
            },
          } = response;
          // console.log(publisher_payout_settings)
          this.editPayoutUuid = publisher_payout_settings.uuid
          this.payAmt = publisher_payout_settings.payout_type;
          this.payouts.payoutOn = publisher_payout_settings.payout_on;
          this.payouts.length = publisher_payout_settings.length;
          this.payouts.amount = publisher_payout_settings.payout_amount;
          this.duplicatePay = publisher_payout_settings.duplicate_payouts;
          this.payouts.days = publisher_payout_settings.days;
          this.payouts.hours = publisher_payout_settings.hours;
          this.payouts.payHour = publisher_payout_settings.payout_hours;
          this.payouts.openTime = publisher_payout_settings.open_time;
          this.payouts.closeTime = publisher_payout_settings.close_time;
          this.payouts.timezone = publisher_payout_settings.time_zone;
          this.payouts.limit = publisher_payout_settings.limit_payout;
          this.payouts.global = publisher_payout_settings.global_cap;
          this.payouts.globalPay = publisher_payout_settings.global_payout_cap;
          this.payouts.monthly = publisher_payout_settings.monthly_cap;
          this.payouts.monthlyPay =
            publisher_payout_settings.monthly_payout_cap;
          this.payouts.daily = publisher_payout_settings.daily_cap;
          this.payouts.dailyPay = publisher_payout_settings.daily_payout_cap;
          this.isUpdate = true;
        })
        .catch((error) => {
          // this.errorToast("Error", "something is going wrong ");
        });
    },
  },
  created() {
    this.fetchUserPayout();
  },
};
</script>

<style scoped>
.addBackgroundColor {
  background-color: antiquewhite !important;
}
</style>
