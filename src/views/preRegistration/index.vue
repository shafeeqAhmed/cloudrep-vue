<template>
  <div class="pre-reg-page">
    <div class="pre-reg-bg">
      <!-- <img src="@/assets/images/pre-registration/pre_reg_bg_1.png" /> -->
    </div>
    <div class="pre-bg-inner"></div>
    <div class="pre-bg-inner-1"></div>
    <!--=========================== Header ============================-->
    <topNav />
    <!--=========================== Header ============================-->

    <div class="reg-panel">
      <div class="reg-panel-container">
        <!--=========================== Pre registration Section 1(Business Type) ============================-->
        <section class="pre-reg-hero" id="reg-section-1">
          <div class="container">
            <div class="pre-reg-content">
              <h2 class="mb-5">
                Would you like to start earning an income or would like to scale
                their busines ?
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse amet luctus et mattis elit.
              </p>
              <b-row class="py-5">
                <b-col lg="3" md="6" sm="6" v-for="option in businessTypes" :key="option.id">
                  <div class="pre-reg-opt-content optionDivhover" @click="storeValue(option.uuid, 'section1')"
                    :class="selectedService == option.uuid ? 'selected' : ''">
                    <img src="@/assets/images/pre-registration/Ellipse.png" />
                    <p>{{ option.label }}</p>
                  </div>
                </b-col>
              </b-row>
              <div class="pre-reg-btnArea preReg-Section1-btnArea">
                <div class="reg-panels-navigation">
                  <div class="nav-panel" data-sign="plus">
                    <a @click="gotoNext('section1', 'next')" class="reg-anchor pre-reg-content-btn"
                      :class="isDisabled ? 'disabledBtn' : ''" v-if="selectedService">Next</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== END Pre registration Section 1 ============================-->
        <!--=========================== Pre registration Section 2(Name) ============================-->
        <section class="pre-reg-hero" id="reg-section-2">
          <div class="container">
            <b-row>
              <b-col>
                <div class="pre-reg-content">
                  <h2>Please enter your name</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <validation-observer ref="registerName" #default="{ invalid }">
                    <b-form-group class="pre-reg-formGroup">
                      <validation-provider #default="{ errors }" name="name" vid="name" rules="required">
                        <label class="pre-reg-label">Your Name</label>
                        <b-form-input id="name" v-model="name" @keyup.enter="storeValue('', 'section2')"
                          class="pre-reg-input" :state="errors.length > 0 ? false : null"></b-form-input>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </validation-observer>
                  <div class="pre-reg-btnArea">
                    <div class="reg-panels-navigation">
                      <div class="reg-nav-panel" data-sign="minus">
                        <a @click="gotoNext('section2', 'prev')" class="reg-anchor pre-reg-backBtn">
                          <img src="@/assets/images/pre-registration/arrow-left.svg" />
                          <span> Back</span>
                        </a>
                      </div>
                      <div class="nav-panel" data-sign="plus">
                        <a @click="gotoNext('section2', 'next')" class="reg-anchor pre-reg-content-btn"
                          :class="isDisabled ? 'disabledBtn' : ''" v-if="name">Next</a>
                      </div>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </section>
        <!--=========================== END Pre registration Section 2============================-->
        <!--=========================== Pre registration Section 3(Email) ============================-->
        <section class="pre-reg-hero" id="reg-section-3">
          <div class="container">
            <div class="pre-reg-content">
              <h2>Please enter your email address</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <validation-observer ref="registerEmail" #default="{ invalid }">
                <b-form-group class="pre-reg-formGroup">
                  <validation-provider #default="{ errors }" name="email" vid="email" rules="required|email">
                    <label class="pre-reg-label">Your Email Address</label>
                    <b-form-input id="email" v-model="email" @keyup.enter="storeValue('', 'section3')" type="email"
                      class="pre-reg-input" :state="errors.length > 0 ? false : null"></b-form-input>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </validation-observer>
              <div class="pre-reg-btnArea">
                <div class="reg-nav-panel" data-sign="minus">
                  <a @click="gotoNext('section3', 'prev')" class="reg-anchor pre-reg-backBtn">
                    <img src="@/assets/images/pre-registration/arrow-left.svg" />
                    <span> Back</span>
                  </a>
                </div>
                <div class="nav-panel" data-sign="plus">
                  <a v-if="email" @click="gotoNext('section3', 'next')" class="reg-anchor pre-reg-content-btn"
                    :class="isDisabled ? 'disabledBtn' : ''">Next</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== END Pre registration Section 3 ============================-->
        <!--=========================== Pre registration Section 4(Number) ============================-->
        <section class="pre-reg-hero" id="reg-section-4">
          <div class="container">
            <div class="pre-reg-content">
              <h2>Please enter your contact number</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <validation-observer ref="registerPhoneNumber" #default="{ invalid }">
                <b-form-group class="pre-reg-formGroup">
                  <validation-provider #default="{ errors }" name="Phone Number" vid="phone_no" rules="required|min:10">
                    <label class="pre-reg-label">Enter Phone Number</label>
                    <b-input-group class="pre-reg-inputGroup">
                      <b-input-group-prepend>
                        <vue-country-code defaultCountry="ca" :disabledFetchingCountry="true" :disabled="true"
                          :preferredCountries="['ca']" class="pre-reg-inputGroup-dropdown">
                        </vue-country-code>
                      </b-input-group-prepend>
                      <b-form-input v-model="phone_no" @keyup.enter="storeValue('', 'section4')" id="phone_no"
                        class="pre-reg-input" type="number" :state="errors.length > 0 ? false : null" min="11" />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </validation-observer>
              <div class="pre-reg-btnArea">
                <div class="reg-nav-panel" data-sign="minus">
                  <a @click="gotoNext('section4', 'prev')" class="reg-anchor pre-reg-backBtn">
                    <img src="@/assets/images/pre-registration/arrow-left.svg" />
                    <span> Back</span>
                  </a>
                </div>
                <div class="nav-panel" data-sign="plus">
                  <a v-if="phone_no" @click="gotoNext('section4', 'next')" class="reg-anchor pre-reg-content-btn"
                    :class="isDisabled ? 'disabledBtn' : ''">Next</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== END Pre registration Section 4 ============================-->
        <!--=========================== Pre registration Section 5(OTP) ============================-->
        <section class="pre-reg-hero otpDisplayNone" id="reg-section-5">
          <div class="container">
            <div class="pre-reg-content">
              <h2>OTP Verification</h2>
              <p>
                We will send you a one time password on this Mobile Number :
                {{ phone_no }}
              </p>
              <div class="pre-reg-otp-container">
                <span class="pre-reg-otp-text">Enter OTP</span>
                <div class="d-flex mt-1 mb-5">
                  <b-form-input v-model="n1" type="number" class="pre-reg-otp-input customOtpInput" id="code1"
                    placeholder="0" v-on:keyup="gotoCodeTwo"></b-form-input>
                  <b-form-input v-model="n2" type="number" class="pre-reg-otp-input customOtpInput" id="code2"
                    placeholder="0" v-on:keyup="gotoCodeThree"></b-form-input>
                  <b-form-input v-model="n3" type="number" class="pre-reg-otp-input customOtpInput" id="code3"
                    placeholder="0" v-on:keyup="gotoCodeFour"></b-form-input>
                  <b-form-input v-model="n4" type="number" class="pre-reg-otp-input customOtpInput" id="code4"
                    placeholder="0" v-on:keyup="focusContinue"></b-form-input>
                </div>
                <div class="mb-1">
                  <b-row>
                    <b-col md="6">
                      <div class="text-center">
                        <!-- <p>00:00</p> -->
                        <p id="countdown"></p>
                        <p>
                          Did not receive the OTP?
                          <b-link @click="resendOtp" id="resend-otp-btn">Resend Again</b-link>
                        </p>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="pre-reg-btnArea otpCustomMargin">
                <div class="reg-nav-panel" data-sign="minus">
                  <a @click="gotoNext('section5', 'prev')" class="reg-anchor pre-reg-backBtn">
                    <img src="@/assets/images/pre-registration/arrow-left.svg" />
                    <span> Back </span>
                  </a>
                </div>
                <div class="nav-panel" data-sign="plus">
                  <a v-if="n4" id="continue" @click="gotoNext('section5', 'next')"
                    class="reg-anchor pre-reg-content-btn" :class="isDisabled ? 'disabledBtn' : ''">Next</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== END Pre registration Section 5 ============================-->
        <!--=========================== Pre registration Section 6(Cloud rep work type) ============================-->
        <section class="pre-reg-hero" id="reg-section-6">
          <div class="container">
            <div class="pre-reg-content pre-reg-section7-content">
              <h2>
                Would you like to start earning an income or would like to scale
                their busines ?
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse amet luctus et mattis elit.
              </p>
              <b-row class="py-5">
                <b-col lg="3" md="6" sm="6" v-for="option in cloudrepWorkTypes" :key="option.id">
                  <div class="pre-reg-opt-content optionDivhover" @click="storeValue(option.uuid, 'section6')"
                    :class="selectedService2 == option.uuid ? 'selected' : ''">
                    <img src="@/assets/images/pre-registration/Ellipse.png" />
                    <p>{{ option.label }}</p>
                  </div>
                </b-col>
              </b-row>
              <div class="pre-reg-btnArea otpCustomMargin">
                <div class="reg-nav-panel" data-sign="minus">
                  <a @click="gotoNext('section6', 'prev')" class="reg-anchor pre-reg-backBtn">
                    <img src="@/assets/images/pre-registration/arrow-left.svg" />
                    <span> Back</span>
                  </a>
                </div>
                <div class="nav-panel" data-sign="plus">
                  <a v-if="selectedService2" @click="gotoNext('section6', 'next')"
                    class="reg-anchor pre-reg-content-btn" :class="isDisabled ? 'disabledBtn' : ''">Next</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== END Pre registration Section 6 ============================-->
        <!--=========================== Pre registration Section 7(Social) ============================-->
        <section class="pre-reg-hero" id="reg-section-7">
          <div class="container">
            <div class="pre-reg-content">
              <h2>
                Get rewarded 50 CloudRep tokens for Each completed action from
                the following
              </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <b-row class="py-5">
                <b-col lg="3" md="6" sm="6">
                  <div class="pre-reg-social-content optionDivhover ">
                    <img src="@/assets/images/pre-registration/fb_logo.png" />
                    <p>Connect Your Facebook</p>
                  </div>
                </b-col>
                <b-col lg="3" md="6" sm="6">
                  <div class="pre-reg-social-content optionDivhover">
                    <img src="@/assets/images/pre-registration/twitter.png" />
                    <p>Connect Your Twitter</p>
                  </div>
                </b-col>
                <b-col lg="3" md="6" sm="6">
                  <div class="pre-reg-social-content optionDivhover">
                    <img src="@/assets/images/pre-registration/linkedIn.png" />
                    <p>Connect Your LinkedIn</p>
                  </div>
                </b-col>
                <b-col lg="3" md="6" sm="6">
                  <div class="pre-reg-social-content optionDivhover">
                    <img src="@/assets/images/pre-registration/social_logo.png" />
                    <p>Connect Your Social</p>
                  </div>
                </b-col>
              </b-row>
              <div class="pre-reg-btnArea otpCustomMargin">
                <div class="reg-nav-panel" data-sign="minus">
                  <a @click="gotoNext('section7', 'prev')" class="reg-anchor pre-reg-backBtn">
                    <img src="@/assets/images/pre-registration/arrow-left.svg" />
                    <span> Back</span>
                  </a>
                </div>
                <div class="nav-panel" data-sign="plus">
                  <a @click="gotoNext('section7', 'next')" class="reg-anchor pre-reg-content-btn"
                    :class="isDisabled ? 'disabledBtn' : ''">Next</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== END Pre registration Section 7 ============================-->
        <!--=========================== Pre registration Section 8(Business Category) ============================-->
        <section class="pre-reg-hero section8" id="reg-section-8">
          <div class="container">
            <div class="pre-reg-content">
              <h2>Please Select Your Business Category</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <b-row class="py-5">
                <b-col md="6">
                  <validation-observer ref="businessCategoryForm" #default="{ invalid }">
                    <b-form-group>
                      <validation-provider #default="{ errors }" name="bCategory" rules="required">
                        <label>Business Category</label>
                        <v-select id="bCategory" class="pre-reg-vSelect" placeholder="Select Category"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" v-model="selectedBCategory"
                          :options="businessCategories" label="name" :reduce="(name) => name.uuid"
                          @input="storeValue('', 'section8')" />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </validation-observer>
                </b-col>
                <b-col md="6"></b-col>
              </b-row>
              <div class="pre-reg-btnArea otpCustomMargin">
                <div class="reg-nav-panel" data-sign="minus">
                  <a @click="gotoNext('section8', 'prev')" class="reg-anchor pre-reg-backBtn">
                    <img src="@/assets/images/pre-registration/arrow-left.svg" />
                    <span> Back</span>
                  </a>
                </div>
                <div class="nav-panel" data-sign="plus">
                  <a v-if="selectedBCategory" @click="gotoNext('section8', 'next')"
                    class="reg-anchor pre-reg-content-btn" :class="isDisabled ? 'disabledBtn' : ''">Next</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== END Pre registration Section 8 ============================-->
        <!--=========================== Pre registration Section 9(Name) ============================-->
        <section class="pre-reg-hero" id="reg-section-9">
          <div class="container">
            <div class="pre-reg-content">
              <h2>Please enter your business name</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <validation-observer ref="registerBusinessName" #default="{ invalid }">
                <b-form-group class="pre-reg-formGroup">
                  <validation-provider #default="{ errors }" name="businessName" vid="businessName" rules="required">
                    <label class="pre-reg-label">Your Business Name</label>
                    <b-form-input id="b_name" v-model="businessName" @keyup.enter="storeValue('', 'section9')"
                      class="pre-reg-input" :state="errors.length > 0 ? false : null"></b-form-input>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </validation-observer>
              <div class="pre-reg-btnArea">
                <div class="reg-panels-navigation">
                  <div class="reg-nav-panel" data-sign="minus">
                    <a @click="gotoNext('section9', 'prev')" class="reg-anchor pre-reg-backBtn">
                      <img src="@/assets/images/pre-registration/arrow-left.svg" />
                      <span> Back</span>
                    </a>
                  </div>
                  <div class="nav-panel" data-sign="plus">
                    <a @click="gotoNext('section9', 'finish')" class="reg-anchor pre-reg-content-btn"
                      :class="isDisabled ? 'disabledBtn' : ''" v-if="businessName && editUuid">Finish</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--=========================== Pre registration Section 9(Name) ============================-->
      </div>
    </div>
  </div>
</template>


<script>
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BImg,
  BFormGroup,
  BFormInput,
  BForm,
  BInputGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";
import store from "./store";
import topNav from "./components/topNav.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import moment from "moment";
import vSelect from "vue-select";

export default {
  components: {
    topNav,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BLink,
    BButton,
    BImg,
    BFormGroup,
    BFormInput,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    required,
    email,
    vSelect,
  },
  mixins: [toastAlert],
  data() {
    return {
      businessType: [],
      selectedService: "",
      selectedService2: "",
      isDisabled: false,
      verfiyOtpBtnDisabled: false,
      isNumberVerified: "",
      editUuid: "",
      name: "",
      email: "",
      phone_no: "",
      n1: "",
      n2: "",
      n3: "",
      n4: "",
      code: "",
      selectedBCategory: "",
      businessName: "",
      otpTimer: {}
    };
  },
  methods: {
    storeValue(uuid, type) {
      //Business Type
      if (type == "section1") {
        this.isDisabled = true;
        this.selectedService = uuid;
        const params = {
          business_scale_type: this.selectedService,
        };
        this.$store
          .dispatch("preRegistration/storeStepOne", params)
          .then((response) => {
            this.isDisabled = false;
            const { data } = response;
            this.refetchSavedRecord();
            if (data.status) {
              this.successToast("Success", data.message);
              document.getElementById("reg-section-2").scrollIntoView();
              document.getElementById('name').focus();
            } else {
              this.errorToast("Error", data.message);
            }
          })
          .catch((error) => {
            console.log(error.response.data.errors);
          });
      }
      //Name
      if (type == "section2") {
        if (this.editUuid) {
          this.$refs.registerName.validate().then((success) => {
            if (success) {
              this.isDisabled = true;
              const params = {
                name: this.name,
                uuid: this.editUuid,
              };
              this.$store
                .dispatch("preRegistration/storeStepTwo", params)
                .then((response) => {
                  this.isDisabled = false;
                  const { data } = response;
                  this.refetchSavedRecord();
                  if (data.status) {
                    this.successToast("Success", data.message);
                    document.getElementById("reg-section-3").scrollIntoView();
                    document.getElementById('email').focus();
                  } else {
                    this.errorToast("Error", data.message);
                  }
                })
                .catch((error) => {
                  console.log(error.response.data.errors);
                });
            }
          });
        } else {
          this.errorToast("Error", "Please Select Business Type First!");
          document.getElementById("reg-section-1").scrollIntoView();
        }
      }
      //Email
      if (type == "section3") {
        if (this.editUuid) {
          this.$refs.registerEmail.validate().then((success) => {
            if (success) {
              this.isDisabled = true;
              const params = {
                uuid: this.editUuid,
                email: this.email,
              };
              this.$store
                .dispatch("preRegistration/storeStepThree", params)
                .then((response) => {
                  this.isDisabled = false;
                  const { data } = response;
                  this.refetchSavedRecord();
                  if (data.status) {
                    this.successToast("Success", data.message);
                    document.getElementById("reg-section-4").scrollIntoView();
                    document.getElementById('phone_no').focus();
                  } else {
                    this.errorToast("Error", data.message);
                  }
                })
                .catch((error) => {
                  console.log(error.response.data.errors);
                });
            }
          });
        } else {
          this.errorToast("Error", "Please Select Business Scale Type First!");
          document.getElementById("reg-section-1").scrollIntoView();
        }
      }
      //Phone Number
      if (type == "section4") {
        if (this.editUuid) {
          this.$refs.registerPhoneNumber.validate().then((success) => {
            if (success) {
              this.isDisabled = true;
              const params = {
                uuid: this.editUuid,
                phone_no: this.phone_no,
              };
              this.$store
                .dispatch("preRegistration/storeStepFour", params)
                .then((response) => {
                  this.isDisabled = false;
                  const { data } = response;
                  this.refetchSavedRecord();
                  // console.log('check number --------------------------')
                  // console.log(data)
                  // return false
                  if (data.status) {
                    this.successToast("Success", data.message);
                    document.getElementById("reg-section-5").classList.remove("otpDisplayNone");
                    this.$store
                      .dispatch("preRegistration/get2fa")
                      .then((response) => {
                        const { data } = response;
                        if (data.status) {
                          this.successToast("Success", data.message);
                          this.countDownTimer();
                          document.getElementById("reg-section-5").scrollIntoView();
                          document.getElementById('code1').focus();
                        } else {
                          this.errorToast("Error", data.message);
                        }
                      })
                      .catch((error) => {
                        console.log(error.response.data.errors);
                      });
                  } else {
                    this.errorToast("Error", data.message);
                  }
                })
                .catch((error) => {
                  console.log(error.response.data.errors);
                });
            }
          });
        } else {
          this.errorToast("Error", "Please Select Business Scale Type First!");
          document.getElementById("reg-section-1").scrollIntoView();
        }
      }
      //OTP
      if (type == "section5") {
        //nothing to do here!
      }
      //Work Type
      if (type == "section6") {
        if (this.editUuid) {
          this.isDisabled = true;
          this.selectedService2 = uuid;
          const params = {
            work_type: this.selectedService2,
            uuid: this.editUuid,
          };
          this.$store
            .dispatch("preRegistration/storeStepSix", params)
            .then((response) => {
              this.isDisabled = false;
              const { data } = response;
              this.refetchSavedRecord();
              if (data.status) {
                this.successToast("Success", data.message);
                document.getElementById("reg-section-7").scrollIntoView();
              } else {
                this.errorToast("Error", data.message);
              }
            })
            .catch((error) => {
              console.log(error.response.data.errors);
            });
        } else {
          this.errorToast("Error", "Please Select Business Scale Type First!");
          document.getElementById("reg-section-1").scrollIntoView();
        }
      }
      //Social Login
      if (type == "section7") {
        alert("This Section is pending!");
      }
      //Business Category
      if (type == "section8") {
        if (this.editUuid) {
          this.isDisabled = true;
          const params = {
            business_category: this.selectedBCategory,
            uuid: this.editUuid,
          };
          this.$store
            .dispatch("preRegistration/storeStepEight", params)
            .then((response) => {
              this.isDisabled = false;
              const { data } = response;
              this.refetchSavedRecord();
              if (data.status) {
                this.successToast("Success", data.message);
                document.getElementById("reg-section-9").scrollIntoView();
                document.getElementById('b_name').focus();
              } else {
                this.errorToast("Error", data.message);
              }
            })
            .catch((error) => {
              console.log(error.response.data.errors);
            });
        } else {
          this.errorToast("Error", "Please Select Business Scale Type First!");
          document.getElementById("reg-section-1").scrollIntoView();
        }
      }
      //Business Name
      if (type == "section9") {
        if (this.editUuid) {
          this.$refs.registerBusinessName.validate().then((success) => {
            if (success) {
              this.isDisabled = true;
              const params = {
                business_name: this.businessName,
                uuid: this.editUuid,
              };
              this.$store
                .dispatch("preRegistration/storeStepNine", params)
                .then((response) => {
                  this.isDisabled = false;
                  const { data } = response;
                  this.refetchSavedRecord();
                  if (data.status) {
                    this.successToast("Success", data.message);
                    document.getElementById("reg-section-1").scrollIntoView();
                  } else {
                    this.errorToast("Error", data.message);
                  }
                })
                .catch((error) => {
                  console.log(error.response.data.errors);
                });
            }
          });
        } else {
          this.errorToast("Error", "Please Select Business Scale Type First!");
          document.getElementById("reg-section-1").scrollIntoView();
        }
      }
    },
    assignSelectedService() {
      let record = this.$store.state.preRegistration.preRegistration;
      let selectedOptionOne = this.$store.state.preRegistration.selectedService;
      let selectedOptionTwo =
        this.$store.state.preRegistration.selectedService2;
      if (record) {
        this.editUuid = record.uuid;
        if (record.name) {
          this.name = record.name;
        }
        if (record.email) {
          this.email = record.email;
        }
        if (record.phone_no) {
          this.phone_no = record.phone_no;
        }
        if (record.business_category) {
          this.selectedBCategory = record.business_category.uuid;
        }
        if (record.business_name) {
          this.businessName = record.business_name;
        }
        if (record.is_verified) {
          this.isNumberVerified = record.is_verified;
        }
      }
      if (selectedOptionOne) {
        this.selectedService = selectedOptionOne;
      }
      if (selectedOptionTwo) {
        this.selectedService2 = selectedOptionTwo;
      }
    },
    gotoNext(section, paginate) {
      //Business Type
      if (section == "section1") {
        if (this.selectedService) {
          this.isDisabled = true;
          const params = {
            business_scale_type: this.selectedService,
          };
          this.$store
            .dispatch("preRegistration/storeStepOne", params)
            .then((response) => {
              this.isDisabled = false;
              const { data } = response;
              this.refetchSavedRecord();
              if (data.status) {
                this.successToast("Success", data.message);
                document.getElementById("reg-section-2").scrollIntoView();
                document.getElementById('name').focus();
              } else {
                this.errorToast("Error", data.message);
              }
            })
            .catch((error) => {
              console.log(error.response.data.errors);
            });
        } else {
          this.errorToast("Error", "Please Select an Option!");
        }
      }
      //Name
      if (section == "section2") {
        if (paginate == "next") {
          if (this.editUuid) {
            this.$refs.registerName.validate().then((success) => {
              if (success) {
                this.isDisabled = true;
                const params = {
                  name: this.name,
                  uuid: this.editUuid,
                };
                this.$store
                  .dispatch("preRegistration/storeStepTwo", params)
                  .then((response) => {
                    this.isDisabled = false;
                    const { data } = response;
                    this.refetchSavedRecord();
                    if (data.status) {
                      this.successToast("Success", data.message);
                      document.getElementById("reg-section-3").scrollIntoView();
                    } else {
                      this.errorToast("Error", data.message);
                    }
                  })
                  .catch((error) => {
                    console.log(error.response.data.errors);
                  });
              }
            });
          } else {
            this.errorToast(
              "Error",
              "Please Select Business Scale Type First!"
            );
            document.getElementById("reg-section-1").scrollIntoView();
          }
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-1").scrollIntoView();
        }
      }
      //Email
      if (section == "section3") {
        if (paginate == "next") {
          if (this.editUuid) {
            this.$refs.registerEmail.validate().then((success) => {
              if (success) {
                this.isDisabled = true;
                const params = {
                  uuid: this.editUuid,
                  email: this.email,
                };
                this.$store
                  .dispatch("preRegistration/storeStepThree", params)
                  .then((response) => {
                    this.isDisabled = false;
                    const { data } = response;
                    this.refetchSavedRecord();
                    if (data.status) {
                      this.successToast("Success", data.message);
                      document.getElementById("reg-section-4").scrollIntoView();
                    } else {
                      this.errorToast("Error", data.message);
                    }
                  })
                  .catch((error) => {
                    console.log(error.response.data.errors);
                  });
              }
            });
          } else {
            this.errorToast(
              "Error",
              "Please Select Business Scale Type First!"
            );
            document.getElementById("reg-section-1").scrollIntoView();
          }
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-2").scrollIntoView();
        }
      }
      //Phone Number
      if (section == "section4") {
        if (paginate == "next") {
          if (this.editUuid) {
            this.isDisabled = true;
            const params = {
              uuid: this.editUuid,
              phone_no: this.phone_no,
            };
            this.$store
              .dispatch("preRegistration/storeStepFour", params)
              .then((response) => {
                this.isDisabled = false;
                const { data } = response;
                this.refetchSavedRecord();
                if (data.status) {
                  this.successToast("Success", data.message);
                  document.getElementById("reg-section-5").classList.remove("otpDisplayNone");
                  this.$store
                    .dispatch("preRegistration/get2fa")
                    .then((response) => {
                      const { data } = response;
                      if (data.status) {
                        this.successToast("Success", data.message);
                        this.countDownTimer();
                        document.getElementById("reg-section-5").scrollIntoView();
                        document.getElementById('code1').focus();
                      } else {
                        this.errorToast("Error", data.message);
                      }
                    })
                    .catch((error) => {
                      console.log(error.response.data.errors);
                    });
                } else {
                  this.errorToast("Error", data.message);
                }
              })
              .catch((error) => {
                console.log(error.response.data.errors);
              });
          } else {
            this.errorToast(
              "Error",
              "Please Select Business Scale Type First!"
            );
            document.getElementById("reg-section-1").scrollIntoView();
          }
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-3").scrollIntoView();
        }
      }
      //OTP
      if (section == "section5") {
        if (paginate == "next") {
          if (this.editUuid) {
            if (this.verfiyOtpBtnDisabled) {
              this.code = this.n1 + this.n2 + this.n3 + this.n4;
              const params = {
                code: this.code,
              };
              this.$store
                .dispatch("preRegistration/verify2fa", params)
                .then((response) => {
                  const { data } = response;
                  console.log(data)
                  console.log('after number -------------------------------')
                  if (data.status) {
                    this.successToast("Success", data.message);
                    this.refetchSavedRecord();
                    document.getElementById("reg-section-5").classList.add("otpDisplayNone");
                    document.getElementById("reg-section-6").scrollIntoView();
                    this.n1 = "";
                    this.n2 = "";
                    this.n3 = "";
                    this.n4 = "";
                  } else {
                    this.errorToast("Error", data.message);
                  }
                })
                .catch((error) => {
                  console.log(error.response.data.errors);
                });
            } else {
              this.errorToast(
                "Error",
                "Time Expired! Please verify OTP again."
              );
            }
          } else {
            this.errorToast(
              "Error",
              "Please Select Business Scale Type First!"
            );
            document.getElementById("reg-section-1").scrollIntoView();
          }
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-4").scrollIntoView();
        }
      }
      //Work Type
      if (section == "section6") {
        if (paginate == "next") {
          if (this.editUuid) {
            this.isDisabled = true;
            // this.selectedService2 = uuid;
            const params = {
              work_type: this.selectedService2,
              uuid: this.editUuid,
            };
            this.$store
              .dispatch("preRegistration/storeStepSix", params)
              .then((response) => {
                this.isDisabled = false;
                const { data } = response;
                this.refetchSavedRecord();
                if (data.status) {
                  this.successToast("Success", data.message);
                  document.getElementById("reg-section-7").scrollIntoView();
                } else {
                  this.errorToast("Error", data.message);
                }
              })
              .catch((error) => {
                console.log(error.response.data.errors);
              });
          } else {
            this.errorToast(
              "Error",
              "Please Select Business Scale Type First!"
            );
            document.getElementById("reg-section-1").scrollIntoView();
          }
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-5").scrollIntoView();
        }
      }
      //social login
      if (section == "section7") {
        // alert("This section is pending!");
        if (paginate == "next") {
          document.getElementById("reg-section-8").scrollIntoView();
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-6").scrollIntoView();
        }
      }
      //Business Category
      if (section == "section8") {
        if (paginate == "next") {
          if (this.editUuid) {
            this.isDisabled = true;
            const params = {
              business_category: this.selectedBCategory,
              uuid: this.editUuid,
            };
            this.$store
              .dispatch("preRegistration/storeStepEight", params)
              .then((response) => {
                this.isDisabled = false;
                const { data } = response;
                this.refetchSavedRecord();
                if (data.status) {
                  this.successToast("Success", data.message);
                  document.getElementById("reg-section-9").scrollIntoView();
                  document.getElementById('b_name').focus();
                } else {
                  this.errorToast("Error", data.message);
                }
              })
              .catch((error) => {
                console.log(error.response.data.errors);
              });
          } else {
            this.errorToast(
              "Error",
              "Please Select Business Scale Type First!"
            );
            document.getElementById("reg-section-1").scrollIntoView();
          }
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-7").scrollIntoView();
        }
      }
      //Business Name
      if (section == "section9") {
        if (paginate == "finish") {
          if (this.editUuid) {
            this.$refs.registerBusinessName.validate().then((success) => {
              if (success) {
                this.isDisabled = true;
                const params = {
                  business_name: this.businessName,
                  uuid: this.editUuid,
                };
                this.$store
                  .dispatch("preRegistration/storeStepNine", params)
                  .then((response) => {
                    this.isDisabled = false;
                    const { data } = response;
                    this.refetchSavedRecord();
                    if (data.status) {
                      this.successToast("Success", data.message);
                      document.getElementById("reg-section-1").scrollIntoView();
                      // location.href = "#reg-section-9";
                      // this.successToast(
                      //   "Success",
                      //   "Pre Registration Process Successfully Completed!"
                      // );
                    } else {
                      this.errorToast("Error", data.message);
                    }
                  })
                  .catch((error) => {
                    console.log(error.response.data.errors);
                  });
              }
            });
          } else {
            this.errorToast(
              "Error",
              "Please Select Business Scale Type First!"
            );
            document.getElementById("reg-section-1").scrollIntoView();
          }
        }
        if (paginate == "prev") {
          document.getElementById("reg-section-8").scrollIntoView();
        }
      }
    },
    refetchSavedRecord() {
      this.$store.dispatch("preRegistration/getSelectedRecords").then(() => {
        this.assignSelectedService();
      });
    },
    gotoCodeTwo() {
      if (is_numeric(this.n1)) {
        if (
          parseInt(this.n1) >= 0 &&
          parseInt(this.n1) <= 9 &&
          this.n1.length < 2
        ) {
          document.getElementById("code2").focus();
        } else {
          this.n1 = "";
        }
      } else {
        // it isn't
        this.n1 = "";
      }
    },
    gotoCodeThree() {
      if (is_numeric(this.n2)) {
        if (
          parseInt(this.n2) >= 0 &&
          parseInt(this.n2) <= 9 &&
          this.n2.length < 2
        ) {
          document.getElementById("code3").focus();
        } else {
          this.n2 = "";
        }
      } else {
        // it isn't
        this.n2 = "";
      }
    },
    gotoCodeFour() {
      if (is_numeric(this.n3)) {
        if (
          parseInt(this.n3) >= 0 &&
          parseInt(this.n3) <= 9 &&
          this.n3.length < 2
        ) {
          document.getElementById("code4").focus();
        } else {
          this.n3 = "";
        }
      } else {
        // it isn't
        this.n3 = "";
      }
    },
    focusContinue() {
      if (is_numeric(this.n4)) {
        if (
          parseInt(this.n4) >= 0 &&
          parseInt(this.n4) <= 9 &&
          this.n4.length < 2
        ) {
          document.getElementById("continue").focus();
        } else {
          this.n4 = "";
        }
      } else {
        // it isn't
        this.n4 = "";
      }
    },
    countDownTimer() {
      var duration = moment.duration({
        minutes: 1,
        seconds: 0,
      });
      var element = document.getElementById("resend-otp-btn");
      element.classList.add("pre-reg-resendOtpBtn");
      this.resendOtpBtn = false
      var timestamp = new Date(0, 0, 0, 2, 10, 30);
      clearInterval(this.otpTimer);
      this.verfiyOtpBtnDisabled = true
      var interval = 1;
      this.otpTimer = setInterval(() => {
        timestamp = new Date(timestamp.getTime() + interval * 1000);

        duration = moment.duration(duration.asSeconds() - interval, "seconds");
        var min = duration.minutes();
        var sec = duration.seconds();

        sec -= 1;
        if (min < 0) return clearInterval(this.otpTimer);
        if (min < 10 && min.length != 2) min = "0" + min;
        if (sec < 0 && min != 0) {
          min -= 1;
          sec = 59;
        } else if (sec < 10 && length.sec != 2) sec = "0" + sec;

        document.getElementById("countdown").innerHTML = min + ":" + sec;
        if (min == 0 && sec == 0) {
          clearInterval(this.otpTimer);
          this.verfiyOtpBtnDisabled = false;
          var element = document.getElementById("resend-otp-btn");
          element.classList.remove("pre-reg-resendOtpBtn");
          this.resendOtpBtn = true
          document.getElementById("countdown").innerHTML = '';
        }
      }, 1000);
    },
    resendOtp() {
      this.$store
        .dispatch("preRegistration/get2fa")
        .then((response) => {
          const { data } = response;
          if (data.status == true) {
            this.successToast("Success", data.message);
            this.countDownTimer();
            this.verfiyOtpBtnDisabled = true;
          }
          if (data.status == false) {
            this.errorToast("Error", data.message);
          }
        })
        .catch((error) => { });
    },
  },
  computed: {
    businessTypes() {
      return this.$store.getters["preRegistration/businessTypes"];
    },
    businessCategories() {
      return this.$store.getters["preRegistration/businessCategories"];
    },
    cloudrepWorkTypes() {
      return this.$store.getters["preRegistration/cloudrepWorkTypes"];
    },
    preRegistration() {
      return this.$store.state.preRegistration.preRegistration;
    },
  },
  watch: {
    "$store.state.preRegistration.preRegistration.": function () {
      console.log("this is the console change-----------");
      this.assignSelectedService();
    },
    // 'verfiyOtpBtnDisabled': function(newValue, oldValue) {
    //   alert('First name changed from ' + oldValue + ' to ' + newValue + '!');
    // }
  },
  created() {
    const APP_STORE_MODULE_NAME = "preRegistration";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, store);
    }
    this.$store.dispatch("preRegistration/getDropdownList");
    this.$store.dispatch("preRegistration/getBusinessCategoryList");
    this.$store.dispatch("preRegistration/getDropdownListByCloudrepWork");
    this.$store.dispatch("preRegistration/getSelectedRecords").then(() => {
      this.assignSelectedService();
    });
  },
  destroyed() {
    // UnRegister on leave
    const APP_STORE_MODULE_NAME = "preRegistration";
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};
function is_numeric(str) {
  return /^\d+$/.test(str);
}
</script>
<style scoped>
.selected {
  /* background-color: blueviolet; */
  background: rgb(88, 35, 188);
  background: linear-gradient(90deg, rgba(88, 35, 188, 1) 0%, rgba(216, 83, 171, 1) 100%);
}

.disabledBtn {
  pointer-events: none;
  box-shadow: none;
  opacity: 0.5;
}

.pre-reg-vSelect {
  color: #fff !important;
}

.pre-reg-vSelect ::placeholder {
  color: #fff !important;
}

.pre-reg-vSelect ::placeholder::before {
  color: #fff !important;
}

.pre-reg-resendOtpBtn {
  pointer-events: none;
  opacity: .5;
}

.otpDisplayNone {
  display: none;
}
</style>
