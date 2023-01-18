<template>
  <div class="course-invoice py-5">
    <b-button class="primary-btn mb-2" @click="downloadInvoice()"
      >Download</b-button
    >
    <div ref="userinvoice">
      <div class="course-invoice-cont">
        <div class="invoice-header">
          <div>
            <b-img src="@/assets/images/logo/company-logo.230fb139.png"></b-img>
          </div>
          <div class="text-right invoice-head">
            <h2>Invoice</h2>
            <p># {{ transaction.uuid }}</p>
            <p class="mt-2">
              Date : &nbsp;{{ dateFormater(transaction.created_at) }}
            </p>
          </div>
        </div>
        <div class="invoice-details">
          <b-row>
            <b-col md="6">
              <h2>Cloudrep AI</h2>
              <div class="mt-1">
                <p><span>Business Number</span> : 555-456-9854</p>
                <p>21 Street Great Lakes,</p>
                <p>Totonto,</p>
                <p>L6R2S5.</p>
                <p>admin@cloudrep.ai</p>
              </div>
            </b-col>
            <b-col md="6">
              <h2>Bill To</h2>
              <div class="mt-1">
                <h3>{{ user.first_name }} {{ user.last_name }}</h3>
                <span>({{ user.role }})</span>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="invoice-table mt-3">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <div class="">
                    <p class="m-0 text-transform-capitilize">Item</p>
                  </div>
                </th>
                <th>
                  <div class="d-flex align-items-center justify-content-center">
                    <p class="m-0 text-transform-capitilize">Quantity</p>
                  </div>
                </th>
                <th>
                  <div class="d-flex align-items-center justify-content-center">
                    <p class="m-0 text-transform-capitilize">Rate</p>
                  </div>
                </th>
                <th>
                  <div class="d-flex align-items-center justify-content-center">
                    <p class="m-0 text-transform-capitilize">Amount</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-if="invoice.order">
                                <td><div class=""><p>{{invoice.order.course.title}}</p></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><p>{{invoice.order.course_quantity}}</p></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><p>${{invoice.rate}}</p></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><p>${{invoice.amount}}</p></div></td>
                            </tr> -->
            </tbody>
          </table>
        </div>
        <!-- <div class="invoice-total">
                    <b-row>
                        <b-col cols="9" class="text-left" v-if="invoice.order.copon">
                            <div class="mt-1"><span>Subtotal</span></div>
                            <div class="mt-1" v-if="invoice.order.copon"><span>Discount</span></div>
                            <div class="mt-1" v-if="invoice.order.copon && invoice.order.copon.type == 'fixed'"><span>Promo (${{invoice.discount}}) : {{invoice.order.copon.title}}</span></div>
                            <div class="mt-1" v-if="invoice.order.copon && invoice.order.copon.type == 'percentage'"><span>Promo ({{invoice.discount}}%) : {{invoice.order.copon.title}}</span></div>
                        </b-col>
                        <b-col cols="3" class="text-right" v-if="invoice.order.copon">
                            <p class="mt-1">${{invoice.amount}}</p>
                            <p class="mt-1">$0</p>
                            <p class="mt-1" v-if="invoice.order.copon && invoice.order.copon.type == 'fixed'">-${{invoice.discount}}</p>
                            <p class="mt-1" v-if="invoice.order.copon && invoice.order.copon.type == 'percentage'">-{{invoice.discount}}%</p>
                        </b-col>
                    </b-row>
                    <b-row class="total">
                        <b-col cols="9" class="text-left">
                            <div class=""><span>Total</span></div>
                        </b-col>
                        <b-col cols="3" class="text-right" v-if="invoice.order.copon">
                            <p class="mt-1" v-if="invoice.order.copon && invoice.order.copon.type == 'fixed'">${{invoice.amount - invoice.discount}}</p>
                            <p class="mt-1" v-if="invoice.order.copon && invoice.order.copon.type == 'percentage'">${{invoice.amount * invoice.discount / 100 - invoice.amount}}</p>
                        </b-col>
                    </b-row>
                </div> -->
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="html2canvas.js"></script>
<script type="text/javascript" src="jspdf.min.js"></script>
<script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BForm,
  BInputGroup,
  BFormInput,
  BCardText,
  BInputGroupPrepend,
  BPagination,
  BFormGroup,
  BImg,
  BButton,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { getUserData } from "@/auth/utils";
import { toastAlert } from "@core/mixins/ui/toast";
import { jsPDF } from "jspdf";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BPagination,
    BFormGroup,
    vSelect,
    BImg,
    BButton,
  },
  mixins: [toastAlert],
  data() {
    return {
      transaction: [],
    };
  },
  methods: {
    getInvoice() {
      this.showLoader();
      this.$http
        .get(`get-transaction/${this.$router.currentRoute.params.uuid}`)
        .then((response) => {
          const {
            data: {
              data: { transaction },
            },
          } = response;
          this.transaction = transaction;
        })
        .catch((error) => {
          // this.errorToast();
        })
        .finally(() => {
          this.hideLoader();
        });
    },
    downloadInvoice() {
      var doc = new jsPDF("p", "pt", "A2");
      doc.html(this.$refs.userinvoice, {
        callback: function (doc) {
          doc.save("test.pdf");
        },
        x: 100,
        y: 100,
      });
      // html2canvas(this.$refs.userinvoice,{
      // onrendered:function(canvas){

      // var img=canvas.toDataURL("image/png");
      // var doc = new jsPDF();
      // doc.addImage(img,'JPEG',20,20);
      // doc.save('test.pdf');
      // }

      // });
    },
    dateFormater(val) {
      let d = new Date(val);
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

      // var t = this.formatAMPM(d)
      // return `${mo} ${da}, ${ye} - ${t}`; //if time required
      return `${mo} ${da}, ${ye}`;
    },
    formatAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      hours %= 12;
      hours = hours || 12;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      const strTime = `${hours}:${minutes} ${ampm}`;

      return strTime;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  mounted() {},

  created() {
    this.getInvoice();
    this.user = getUserData();
  },
};
</script>
