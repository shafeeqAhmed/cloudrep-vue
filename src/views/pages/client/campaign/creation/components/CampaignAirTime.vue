<template>
    <div>
      <div class="campaign-header position-relative">
        <div class="camp-img">
            <b-img class="w-100" src="@/assets/images/campaign-img/bghead.png" ></b-img>
        </div>
        <div class="campaignhe-heading">
          <h1>Air Time & Recording</h1>
          <p>Enter your personal information brfore you can start using this platform.</p>
        </div>
      </div>
    <div class="card campaign-cards mt-2">
      <div class="campaign- campaign-fields campaign-steps">
          <div class="air-time">
            
            <b-row class="mt-2">
                <b-col lg="8" md="10" sm="12">
                    <div class="airtime-card">
                        <b-row>
                            <b-col cols="6" sm="3">
                                <label for="">Air Time</label>
                            </b-col>
                            <b-col cols="6" sm="9">
                                <b-form-checkbox checked="false" v-model="airtime" name="check-button" switch />
                            </b-col>
                        </b-row>
                        <!-- <b-row>
                            <b-col cols="" sm="5">
                                <p>Are we charging air time?</p>
                            </b-col>
                            <b-col cols="" sm="7">
                                <b-form-checkbox checked="false" name="check-chargeAirtime" switch />
                            </b-col>
                        </b-row> -->
                        <div  v-if="airtime == true">
                            <b-row class="mt-1 align-items-center">
                            <b-col cols="" sm="5">
                                <p>who's gonna pay for it?</p>
                            </b-col>
                            <b-col cols="" sm="7">
                                <div class="input-gradient">
                                    <v-select placeholder="Choose who’s gonna pay"></v-select>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="mt-1 align-items-center">
                            <b-col cols="" sm="5">
                                <p>How much?</p>
                            </b-col>
                            <b-col cols="" sm="7">
                                <div class="input-gradient">
                                    <b-form-input placeholder="Enter price"></b-form-input>
                                </div>
                            </b-col>
                        </b-row>
                        </div>
                        <hr>
                        <b-row class="mt-2">
                            <b-col cols="6" sm="3">
                                <label for="">Recording</label>
                            </b-col>
                            <b-col cols="6" sm="9">
                                <b-form-checkbox checked="false" v-model="recording" name="check-button" switch />
                            </b-col>
                        </b-row>
                        <div v-if="recording == true">
                            <b-row class="align-items-center">
                            <b-col cols="" sm="5">
                                <p>Call recording price</p>
                            </b-col>
                            <b-col cols="" sm="7">
                                <div class="input-gradient">
                                    <b-form-input placeholder="Enter price/minute"></b-form-input>
                                </div>
                            </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col cols="" sm="5">
                                    <p>Want transcripts?</p>
                                </b-col>
                                <b-col cols="" sm="7">
                                    <b-form-checkbox checked="false" name="check-chargeAirtime" switch />
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col cols="" sm="5">
                                    <p>Call storage?</p>
                                </b-col>
                                <b-col cols="" sm="7">
                                    <b-form-checkbox checked="false" name="check-chargeAirtime" switch />
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
            </b-row>
          </div>
      </div>
      <div class="campaign-pagination mt-5 mb-5">
        <div>
          <b-button class="back-btn" @click="$store.commit('clientCampaign/UPDATE_STEP', 7)">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1L1 5M1 5L5 9M1 5L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            Back
          </b-button>
          <b-button variant="primary" class="next-btn" @click="store">Next</b-button>
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
    BFormCheckbox
  } from "bootstrap-vue";
  import vSelect from 'vue-select'
  
  export default {
    components: {
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
      BFormCheckbox,
      vSelect,
    },
  
    data() {
      return {
            airtime: false,
            recording: false,
        }
    },
    methods: {
    },
  }
  </script>
  