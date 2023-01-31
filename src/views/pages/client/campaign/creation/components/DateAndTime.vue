<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-step-four campaign-steps">
        <validation-observer ref="stepFourForm" #default="{ errors }">
          <b-form>
            <b-row class="mb-1" :class="disableSchdeuling == true ? 'disable-campaign-end-date-and-time' : ''">
              <b-col lg="3">
                <h4 class="m-0">Campaign Scheduling</h4>
              </b-col>
              <b-col lg="2">
                <b-form-checkbox name="check-button" switch v-model="isScheduling"
                  :disabled="disableSchdeuling"></b-form-checkbox>
              </b-col>
            </b-row>
            <div v-if="isScheduling">
              <b-row>
                <!-- Time Zone -->
                <b-col lg="12" class="mb-1 px-xl-2 mx-auto cient-content">
                  <validation-provider #default="{ errors }" name="Timezone" vid="timeZone"
                    :rules="isScheduling == true ? 'required' : ''">
                    <b-form-group class="">
                      <label class="font-medium-1 font-weight-bold">TimeZone</label>
                      <div class="datepicker-cr">
                        <b-form-group>
                          <div class="input-gradient"
                            :class="disableStartDateTime == true ? 'disable-campaign-end-date-and-time' : ''">
                            <v-select :searchable="true" id="language" v-model="timezone" label="label"
                              :reduce="(list) => list.value" :options="timezones" placeholder="Choose Time Zone"
                              :disabled="disableStartDateTime"  @input="convertTimeZone" />
                          </div>
                        </b-form-group>
                      </div>
                    </b-form-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <!-- End Time Zone  -->

                <!-- Start Date  -->
                <b-col lg="6" class="mb-1 px-xl-2 mx-auto cient-content">
                  <validation-provider #default="{ errors }" name="Start Date" vid="startDate"
                    :rules="isScheduling == true ? 'required' : ''">
                    <b-form-group class="">
                      <label class="font-medium-1 font-weight-bold">Expected Start Date</label>
                      <div class="datepicker-cr input-date-time">
                        <b-form-group>

                          <div class="input-gradient cursor-pointer"
                            :class="disableStartDateTime == true ? 'disable-campaign-end-date-and-time' : ''">
                            <b-input-group class="input-group-merge">
                              <flatPickr v-model="stepFour.startDate" class="form-control"
                                placeholder="Select Start Date" name="date" :config="config"
                                :disabled="disableStartDateTime" />
                              <!-- <b-form-datepicker
                                class="form-control"
                                :class="errors.length > 0 ? 'is-invalid' : null"
                                v-model="stepFour.startDate"
                                id="startDate"
                                value="null"
                                placeholder="Select Start Date"
                                :minDate="new Date()"
                                :date-format-options="{
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: 'numeric',
                                }"
                              /> -->
                              <!-- < -->
                              <!-- <input type="date" class="form-control" :minDate="new Date()"></input> -->
                            </b-input-group>
                          </div>
                        </b-form-group>
                      </div>
                    </b-form-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <!-- End Start Date  -->

                <!-- Start Time  -->
                <b-col lg="6" class="mb-1 px-xl-2 mx-auto cient-content">
                  <validation-provider #default="{ errors }" name="Start Time" vid="startTime"
                    :rules="isScheduling == true ? 'required' : ''">
                    <div class="input-date-time">
                      <b-form-group class="">
                        <label class="font-medium-1 font-weight-bold">Expected Start Time</label>

                        <div class="input-gradient cursor-pointer"
                          :class="disableStartDateTime == true ? 'disable-campaign-end-date-and-time' : ''">
                          <b-input-group class="input-group-merge">

                            <flatPickr id="start_time" v-model="stepFour.startTime" class="form-control" placeholder="Select Time"
                              name="time" :config="configTime" :disabled="disableStartDateTime" />
                            <!-- <b-form-timepicker
                              :class="errors.length > 0 ? 'is-invalid' : null"
                              v-model="stepFour.startTime"
                              id="startTime"
                              :state="true"
                              placeholder="Choose a time"
                              locale="en"
                              :pickTime="false"
                            />
                            <b-input-group-prepend
                              @click="showStartTimePicker"
                              is-text
                            >
                              <feather-icon
                                icon="ClockIcon"
                                size="21"
                              /> -->
                            </b-input-group-prepend>
                          </b-input-group>
                        </div>
                      </b-form-group>
                    </div>

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <!-- End Start Time  -->

                <!-- Is Campaign Continue  -->

                <b-col cols="12" class="custom-control-input-hide mb-2">
                  <div class="d-flex align-items-center">
                    <div class="d-flex algin-items-center">
                      <h4 class="roleCenter m-0 mr-2">On Going</h4>
                      <b-form-checkbox v-model="campaignContinue" name="campaign_continue" switch inline>
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-col>

                <!-- End Date  -->
                <b-col lg="6" class="mb-1 px-xl-2 mx-auto cient-content">
                  <validation-provider #default="{ errors }" name="End Date" vid="endDate"
                    :rules="campaignContinue == false ? 'required' : ''">
                    <b-form-group class="">
                      <label class="font-medium-1 font-weight-bold">Expected End Date</label>
                      <div class="datepicker-cr input-date-time">
                        <b-form-group>
                          <div class="input-gradient"
                            :class="campaignContinue == true ? 'disable-campaign-end-date-and-time' : ''">
                            <b-input-group class="input-group-merge">
                              <flatPickr v-model="stepFour.endDate" class="form-control" placeholder="Select date"
                                name="date" :config="config" :disabled="campaignContinue == true" />
                              <!-- <b-form-datepicker
                                class="form-control"
                                :class="errors.length > 0 ? 'is-invalid' : null"
                                v-model="stepFour.endDate"
                                id="endDate"
                                value="null"
                                placeholder="Select End Date"
                                :disabled="campaignContinue == true"
                                :date-format-options="{
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: 'numeric',
                                }"
                              /> -->
                            </b-input-group>
                          </div>
                        </b-form-group>
                      </div>
                    </b-form-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <!-- End End Date  -->

                <!-- End Time  -->
                <b-col lg="6" class="mb-1 px-xl-2 mx-auto cient-content">
                  <validation-provider #default="{ errors }" name="End Time" vid="endTime"
                    :rules="campaignContinue == false ? 'required' : ''">
                    <b-form-group class="">
                      <label class="font-medium-1 font-weight-bold">Expected End Time</label>
                      <div class="input-gradient cursor-pointer"
                        :class="campaignContinue == true ? 'disable-campaign-end-date-and-time' : ''">
                        <b-input-group class="input-group-merge">
                          <flatPickr  id="end_time" v-model="stepFour.endTime" class="form-control" placeholder="Select Time"
                            name="time" :config="configTime" :disabled="campaignContinue == true" />
                          <!-- <b-form-timepicker
                            :class="errors.length > 0 ? 'is-invalid' : null"
                            v-model="stepFour.endTime"
                            id="endTime"
                            :state="true"
                            :hour12="false"
                            :disabled="campaignContinue == true"
                          />
                          <b-input-group-prepend
                            @click="showendTimePicker"
                            is-text
                          >
                            <feather-icon
                              icon="ClockIcon"
                              size="21"
                            /> -->
                          </b-input-group-prepend>
                        </b-input-group>
                      </div>
                    </b-form-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <!-- End end Time  -->

              </b-row>
            </div>
            <b-row>
              <b-col lg="12" class="mb-1 px-xl-2 mx-auto cient-content">
                <validation-provider #default="{ errors }" name="Description" vid="description" rules="required">
                  <b-form-group class="">
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="font-medium-1 font-weight-bold">Description</label>
                      <span class="text-danger" v-if="stepFour.description.length >= 500">Max limit reached (500)</span>
                      <div v-else class="lmsInputFieldCounter">
                        <span v-if="stepFour.description.length >= 1"><span>{{ stepFour.description.length }}</span> /
                          500</span>
                      </div>
                    </div>
                    <div class="input-gradient">
                      <b-form-textarea type="text" placeholder="Enter Description" class="description"
                        :class="errors.length > 0 ? 'is-invalid' : null" v-model="stepFour.description" id="description"
                        maxLength="500" />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </div>
      <div class="campaign-pagination mt-2">
        <div class="text-right">

          <b-button
            v-if="isDisabled"
            disabled
            type="submit"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="next-btn"
          >
            <div class="d-flex justify-content-center align-items-center">
              <b-spinner small />
              <span class="ml-1">Processing ...</span>
            </div>
          </b-button>

          <b-button v-else variant="primary" class="next-btn" @click="store">{{
              checkDescription(
                $store.state.clientCampaign.campaign.description
              )
            }}</b-button>
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
  BInputGroup,
  BFormTextarea,
  BFormDatepicker,
  BFormTimepicker,
  BForm,
  BInputGroupPrepend,
  BFormCheckbox,
  BSpinner
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
import moment from "moment";
import vSelect from "vue-select";
import { ref } from 'vue';
import 'flatpickr/dist/flatpickr.css';
import Ripple from "vue-ripple-directive";

export default {
  directives:{
    Ripple
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    BInputGroupPrepend,
    BImg,
    BListGroup,
    BListGroupItem,
    BInputGroup,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormDatepicker,
    BFormTimepicker,
    flatPickr,
    BForm,
    BFormCheckbox,
    vSelect,
    BSpinner
  },
  mixins: [toastAlert],
  data() {
    return {
      isScheduling: false,
      campaignContinue: true,
      stepFour: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        descripiton: "",
      },
      timezone: "",
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d',
        minDate: new Date()
      },
      configTime: {
         enableTime: true,
        noCalendar: true,
        altInput: true,
        dateFormat: "H:i:ss K",
       minTime:this.getCurrentTime(),
       defaultDate: this.getCurrentTime()
      // time_24hr: false
      },
      configEndTime: {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        dateFormat: "H:i:ss K",
        // time_24hr: false,
        // minTime: '00:00',
        // maxTime: "22:30",
      },
      disableStartDateTime: false,
      disableSchdeuling: false,
      isDisabled: false,
    };
  },
  computed: {
    timezones() {
      return this.$store.getters["app/utcList"];
    },
  },
  watch: {
    isScheduling: function (newVal, oldValue) {
      if (newVal == false) {
        this.deleteCampaignDateAndTime();
      }
    },
    campaignContinue: function (newVal, oldValue) {
      if (newVal == true) {
        this.deleteEndDateTime();
      }
    },
  },
  methods: {
    checkDescription(description) {
      if (description === null || description === "") {
        return "Save";
      } else {
        return "Update";
      }
    },
    convertTimeZone(event){
      this.$http
        .get(`/convert-time-to-timezone?timeZone=`+event)
        .then((response) => {

          this.configTime.defaultDate=response.data.data.time;
          this.configTime.minTime=response.data.data.time;
          this.stepFour.startTime=response.data.data.time;
          this.stepFour.endTime=response.data.data.time;
          flatpickr('#start_time',  this.configTime);
          flatpickr('#end_time',  this.configTime);
        })
        .catch((error) => console.log(error)
        )
        .finally(() => {

        });
    },
    getCurrentTime(){
      var d = new Date();
    var curr_hour = d.getHours()<10? '0'+d.getHours():d.getHours();
    var curr_min = d.getMinutes()<10? '0'+d.getMinutes():d.getMinutes();
    var time24 =  curr_hour + ":" + curr_min;
    return time24;
    },
    showStartTimePicker() {
      document.getElementById("startTime").click();
    },
    showendTimePicker() {
      document.getElementById("endTime").click();
    },
    deleteEndDateTime() {
      const uuid = this.$store.state.clientCampaign.campaignUuid;
      this.showLoader();
      this.$http
        .post(`/delete-end-date-time/${uuid}`)
        .then((response) => {
          this.$store.dispatch("clientCampaign/getCampaign").then(() => {
            const { campaign } = this.$store.state.clientCampaign;
            if (campaign) {
              const { end_date, end_time } = campaign;
              (this.stepFour.endDate = end_date),
                (this.stepFour.endTime = end_time);
            }
          });
        })
        .catch((error) => reject(error))
        .finally(() => {
          this.hideLoader();
        });
    },
    deleteCampaignDateAndTime() {
      const uuid = this.$store.state.clientCampaign.campaignUuid;
      this.showLoader();
      this.$http
        .post(`/delete-campaign-date-time/${uuid}`)
        .then((response) => {
          this.$store.dispatch("clientCampaign/getCampaign").then(() => {
            this.assignCampaignDetail()
          });
        })
        .catch((error) => reject(error))
        .finally(() => {
          this.hideLoader();
        });
    },
    store() {
      this.$refs.stepFourForm.validate().then((success) => {
        if (success) {

          //Checking If start date is not less then current date
          var CurrentDate = new Date().setHours(0, 0, 0, 0);
          var GivenDate = new Date(this.stepFour.startDate).setHours(0, 0, 0, 0);
          if (this.isScheduling && GivenDate < CurrentDate) {
            this.conditionalToast(
              "danger",
              "Error",
                "Start Date can be current date aur higher!.",
              "error"
            );
            return false;
          }

          if (this.isScheduling && this.stepFour.startDate == this.stepFour.endDate) {
            const st1 = this.stepFour.startTime.toString().split(" ");
            const st2 = this.stepFour.endTime.toString().split(" ");
            const time1 = st1[0];
            const time2 = st2[0];

            const timeOne = time1.split(':');

            const hours1 = timeOne[0]
            const minutes1 = timeOne[1]
            const seconds1 = timeOne[2]

            const timeTwo = time2.split(':');

            const hours2 = timeTwo[0]
            const minutes2 = timeTwo[1]
            const seconds2 = timeTwo[2]

            const date1 = new Date(2023, 0, 1, +hours1, +minutes1);
            const date2 = new Date(2023, 0, 1, +hours2, +minutes2);


            if (date1.getTime() > date2.getTime()) {
              // console.log('time1 is greater than time2');
              this.conditionalToast(
              "danger",
              "Error",
                "Start time cannot be greater then with end time for a same date!.",
              "error"
            );
              return false;
            } else if (date2.getTime() > date1.getTime()) {
              // ✅ this runs
              // console.log('time2 is greater than time1');
              this.storeCampaignStepFour().then(() => {
                return false;
              })
            } else {

              this.conditionalToast(
              "danger",
              "Error",
               "Both time cannot be same for a same date!.",
              "error"
            );
              return false;
            }
          }

          if (!this.campaignContinue  && this.stepFour.startDate > this.stepFour.endDate) {

            this.conditionalToast(
              "danger",
              "Error",
                 "Campaign start date cannot be greater then end date!.",
              "error"
            );

            return false;
          }

          this.storeCampaignStepFour();
        }
      });
    },

    storeCampaignStepFour() {
      const params = {
        campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        user_uuid: this.$store.state.clientCampaign.campaign.user_uuid,
        time_zone: this.timezone,
        start_date: this.stepFour.startDate,
        start_time: this.stepFour.startTime,
        end_date: this.stepFour.endDate != 0 ? this.stepFour.endDate : null,
        end_time: this.stepFour.endTime != 0 ? this.stepFour.endTime : null,
        descripiton: this.stepFour.description,
        step: 6,
      };
      this.isDisabled = true;
      this.$store
        .dispatch("clientCampaign/storeCampaignStartEndDateTime", params)
        .then((response) => {

          const { data } = response;
              if (data.status) {
                this.conditionalToast(
              "success",
              "Success",
              data.message,
              "success"
            );
                this.$store.dispatch('clientCampaign/getCampaign');
              } else {
                this.conditionalToast(
              "danger",
              "Error",
               data.message,
              "error"
            );
              }

        })
        .then((error) => {
          console.log(this.$refs);
        }).finally(()=>{
          this.isDisabled = false;
        });
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign) {
        const {
          start_date,
          end_date,
          start_time,
          end_time,
          description,
          timeZone,
          is_published,
        } = campaign;
        if (timeZone && start_date) {
          this.isScheduling = true
        }
        if (start_date) {
          this.config.minDate = ""
        }
        if (start_date && is_published == 1) {
          this.disableStartDateTime = true;
          this.disableSchdeuling = true
        }
        // if(is_published == 1){
        // }
        (this.stepFour.startDate = start_date),
          (this.stepFour.startTime = start_time),
          (this.stepFour.endDate = end_date);
        (this.stepFour.endTime = end_time),
          (this.stepFour.description = description != null ? description : "");
        this.timezone = timeZone;
        if (end_date || end_time) {
          this.campaignContinue = false;
        }
        // console.log(this.stepFour.startDate)
        // this.config.minDate = new Date();
      }
    },

  },
  created() {
    this.assignCampaignDetail();
    this.$store.dispatch("app/getUtcList");
  },
};

</script>
