<template>
    <div class="pb-3">
      <div class="lmsagent-breadcrumbs">
        <b-row class="align-items-center mb-4">
          <b-col md="12">
            <slot name="breadcrumb">
              <app-breadcrumb />
            </slot>
          </b-col>
        </b-row>
      </div>
      <div class="ag-lms">
        <div class="purchase-lms-sec">
            <div class="pm-lms">
                <b-row>
                  <b-col md="7">
                    <div class="mb-5">
                      <h1>Checkout Details</h1>
                    </div>
                    <div>
                      <h2>Payment Method</h2>
                        <div class="payment-methods-lms mt-1 pb-5">
                          <b-form-group v-slot="{ ariaDescribedby }">
                            <div class="credit-method tr-met mb-1 p-met">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <b-img src="@/assets/images/lms-img/wallet.png"></b-img>
                                        <h3 class="ml-1">Wallet Pay</h3>
                                    </div>
                                    <div>
                                        <b-form-radio v-model="wallet" name="some-radios" value="wallet" checked="checked"></b-form-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="credit-method tr-met mb-1 p-met">
                              <div class="d-flex align-items-center justify-content-between">
                                  <div class="d-flex align-items-center">
                                      <b-img src="@/assets/images/lms-img/credit1.png"></b-img>
                                      <h3 class="ml-1">Credit / Debit</h3>
                                  </div>
                                  <div>
                                      <b-form-radio  v-model="credit" name="some-radios" value="credit"></b-form-radio>
                                  </div>
                              </div>
                              <div class="mt-2 mb-1" v-if="credit" >
                                <b-row>
                                  <b-col sm="12" class="col-12">
                                    <b-form-group>
                                      <label for="">Name on Card</label>
                                      <div class="input-gradient">
                                        <b-form-input placeholder="Enter Name on Card"></b-form-input>
                                      </div>
                                    </b-form-group>
                                  </b-col>
                                  <b-col sm="12" class="col-12">
                                    <b-form-group>
                                      <label for="">Card Number</label>
                                      <div class="input-gradient">
                                        <b-form-input placeholder="Enter Card Number"></b-form-input>
                                      </div>
                                    </b-form-group>
                                  </b-col>
                                  <b-col sm="6" class="col-6">
                                    <b-form-group>
                                      <label for="">CVV</label>
                                      <div class="input-gradient">
                                        <b-form-input placeholder="Enter CVV"></b-form-input>
                                      </div>
                                    </b-form-group>
                                  </b-col>
                                  <b-col sm="6" class="col-6">
                                    <b-form-group>
                                      <label for="">Expiry date</label>
                                      <div class="input-gradient">
                                        <b-form-input placeholder="Enter date"></b-form-input>
                                      </div>
                                    </b-form-group>
                                  </b-col>
                                  <b-col sm="12" class="mt-1 col-12">
                                    <b-form-checkbox>Securely save this card for my later purchase</b-form-checkbox>
                                  </b-col>
                                </b-row>
                              </div>
                            </div>
                            <div class="credit-method tr-met mb-1 p-met">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <b-img src="@/assets/images/lms-img/apple.png"></b-img>
                                        <h3 class="ml-1">Apple Pay</h3>
                                    </div>
                                    <div>
                                        <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="credit-method tr-met mb-1 p-met">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <b-img src="@/assets/images/lms-img/google.png"></b-img>
                                        <h3 class="ml-1">Google Pay</h3>
                                    </div>
                                    <div>
                                        <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="credit-method tr-met mb-1 p-met">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <b-img src="@/assets/images/lms-img/paypal1.png"></b-img>
                                        <h3 class="ml-1">Paypal</h3>
                                    </div>
                                    <div>
                                        <b-form-radio v-model="paypal" name="some-radios" value="paypal"></b-form-radio>
                                    </div>
                                </div>
                                <div class="mt-2 mb-1" v-if="paypal">
                                  <p>In order to complete your transaction, we will transfer you over to PayPal's secure servers.</p>
                                </div>
                            </div>
                            <div class="credit-method tr-met mb-1 p-met">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <b-img src="@/assets/images/lms-img/samsung.png"></b-img>
                                        <h3 class="ml-1">Samsung Pay</h3>
                                    </div>
                                    <div>
                                        <b-form-radio name="some-radios" value="Paypal"></b-form-radio>
                                    </div>
                                </div>
                            </div>
                          </b-form-group>
                        </div>
                        <div class="complete-purchase mt-5">
                          <b-button @click="goBack" class="mr-1 primary-btn">back</b-button>
                          <button @click="gotoCourses(course.uuid)">Complete Checkout</button>
                        </div>
                    </div>
                  </b-col>
                  <b-col md="5">
                    <div class="ordersummary-lms">
                      <div class="mb-5">
                        <h1>Order Summary</h1>
                      </div>
                      <div class="video-thumb-lms">
                        <b-img src="@/assets/images/lms-img/thumb.png"></b-img>
                      </div>
                      <div class="mt-3"> 
                        <h2>Course Purchase</h2>
                        <div class="total-lms">
                          <div class="d-flex align-items-center justify-content-between">
                            <span>Become an Animation Master</span>
                            <span>${{course.price}}</span>
                          </div>
                          <hr>
                          <div class="d-flex align-items-center justify-content-between">
                            <span>Sub Total</span>
                            <span>${{course.price}}</span>
                          </div>
                          <div class="d-flex align-items-center justify-content-between" v-if="this.coponDiscount != 0">
                            <span>Discount</span>
                            <span v-if="this.courseOrder.copon && this.courseOrder.copon.type == 'fixed'">-${{coponDiscount}}</span>
                            <span v-if="this.courseOrder.copon && this.courseOrder.copon.type == 'percentage'">-{{coponDiscount}}%</span>
                          </div>
                          <hr>
                          <div class="d-flex align-items-center justify-content-between" v-if="this.coponDiscount != 0 || this.course.price == 0">
                            <span>Total</span>
                            <span>${{totalAmount}}</span>
                          </div>
                          <!-- v-if="coponDiscount < 0" -->
                          <div class="d-flex align-items-center mt-1" v-if="this.coponDiscount == 0 && this.course.price != 0">
                           <div class="input-gradient">
                            <b-form-input v-model="promoText" placeholder="Enter Promo Code"></b-form-input>
                           </div>
                            <!-- <div class="mt-2">Value: {{ text }}</div> -->
                            <div class="complete-purchase ml-1">
                            <button @click="applyPromo()">Apply</button>
                            </div>
                          </div> 
                          <div v-if="this.coponDiscount != 0 && this.course.price != 0" class="mt-1" >
                            <p class="promo-code">Promo code applied!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
  import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
  import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
  import { BRow, BCol, BDropdown, BDropdownItem, BModal , BLink , BImg , BFormGroup , BFormRadio , BFormInput ,BFormCheckbox, BButton} from "bootstrap-vue";
  import axiosIns from "@/libs/axios";
  import router from "@/router";
  import { ref } from "@vue/composition-api";
  import EventBus from '@/event/EventBus'
  import VideoPlayer from "../lms/components/lessons/modal/VideoPlayer.vue";
  import { toastAlert } from "@core/mixins/ui/toast";  
  import { getUserData } from '@/auth/utils'
  
  export default {
    components: {
      AppBreadcrumb,
      BRow,
      BCol,
      AppCollapse,
      AppCollapseItem,
      BDropdown,
      BDropdownItem,
      BModal,
      VideoPlayer,
      BLink,
      BImg,
      BFormGroup,
      BFormRadio,
      BFormInput,
      BFormCheckbox,
      BButton
    },
    mixins: [toastAlert],
    data () {
      return{
        user: {},
        wallet : true,
        credit : false,
        paypal : false,
        promoText: '',
        coponDiscount: 0,
        totalAmount: 0,
        courseOrder: [],
        promoCode: [],
        course: [],
        invoice: [],
      }
    },
    methods:{
      goBack(){
        
      },
      preview(url) {
        EventBus.$emit('playerSrc', url)
      },
      gotoCourses(uuid){
        console.log(uuid)
        if(this.courseOrder.price_after_copon == 0 || this.course.price == 0) {
          this.$router.push({ name: "university-courses",params: { uuid: uuid } });
          this.storeInvoice()
          this.successToast("Success!", "You have successfully purchased this course!");
        } else {
          this.errorToast('Error!', 'Incomplete Checkout!');
        }
      },
      getCourseOrder() {
      this.$http
        .get("get-course-order?course_uuid=" + router.currentRoute.params.uuid
        + '&user_uuid=' + this.user.user_uuid)
        .then((response) => {
          const {
              data: {
                data: { courseOrder },
              },
            } = response;
            this.courseOrder = courseOrder
            if(this.courseOrder && this.courseOrder.price_after_copen !== null) {
              this.coponDiscount = this.courseOrder.copon.amount
              this.totalAmount = this.courseOrder.price_after_copon
            } if(this.courseOrder.copon.amount > this.course.price) {
                this.totalAmount = 0
                this.coponDiscount = this.course.price
            }
        });
      },
      getCopon() {
        this.$http
        .get("get-copon?title=" + this.promoText)
        .then((response) => {
          const {
            data: {
              data: { promoCode },
            },
          } = response;
          this.promoCode = promoCode
          if(this.promoCode && this.promoCode.title == this.promoText) {
            const data = {title: this.promoText, course_uuid: this.course.uuid, copon_uuid: this.promoCode.uuid}
              this.$http
            .post("update-course-order",data)
            .then((response) => {
              console.log(response)
              const {
                data: {
                  data: { courseOrder },
                },
              } = response;
              this.courseOrder = courseOrder
              if(this.courseOrder.price_after_copen !== null) {
                this.coponDiscount = this.courseOrder.copon.amount
                this.totalAmount = this.courseOrder.price_after_copon
              } else {
                this.coponDiscount = 0
                this.totalAmount = null
              } if(this.courseOrder.copon.amount > this.course.price) {
                this.totalAmount = 0
                this.coponDiscount = this.course.price
              }
              this.getCourseOrder()
              this.successToast('Success!', 'This Promo Code has been applied successfully!');
          })
          } else {
            this.errorToast('Error!', 'This Promo Code is invalid!');
          }
        });  
      },
      applyPromo() {
        this.getCopon()
      },
      getCourses() {
      this.$http.get("courses" + "/" + router.currentRoute.params.uuid)
      .then((response) => {
        const {
        data: {
                data: { course },
              },
        } = response;
        this.course = course;
      })
      .catch((error) => {
        this.errorToast();
      });
    },
      storeInvoice() {
        const data = {
          user_uuid: this.courseOrder.user.user_uuid,
          order_uuid: this.courseOrder.uuid,
          date: this.courseOrder.created_at,
          description: this.courseOrder.course.title,
          rate: this.courseOrder.course_price,
          amount: this.courseOrder.course_price,
          quantity: this.courseOrder.course_quantity,
          discount: this.coponDiscount,
        };
        this.$http
            .post("store-invoice",data)
            .then((response) => {
              console.log(response)
              const {
                data: {
                  data: { invoice },
                },
              } = response;
              this.invoice = invoice
              
              // this.successToast('Success!', 'This Promo Code has been applied successfully!');
          }); 
      },
    },
    mounted(){
      this.getCourseOrder()
      // this.getInvoice()
    },
    
    created() {
    this.getCourses(),
    this.user = getUserData()
  },
    
    
  };
  </script>
  
  <style lang="scss">
    @import "@/assets/scss/lms-style/agentlms.scss";
    .promo-code {
      color: #7A60E0;
    }
  </style>