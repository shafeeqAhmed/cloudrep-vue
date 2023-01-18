<template>
    <div class="course-invoice pb-5">
        <div class="mb-2 text-right">
            <b-button variant="primary">Download</b-button>
        </div>
        <div  ref="userinvoice">
            <div class="course-invoice-cont">
                <div class="invoice-header">
                    <div>
                        <b-img src="@/assets/images/logo/company-logo.230fb139.png"></b-img>
                    </div>
                    <div class="text-right invoice-head">
                        <h2>Transaction Invoice</h2>
                        <p># 123</p>
                        <p class="mt-2">Date : &nbsp;03 dec 2022</p>
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
                                <h3>adasd</h3>
                                <span>(asdasd)</span>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <div class="invoice-table mt-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><div class=""><p class="m-0 text-transform-capitilize">Description</p></div></th>
                                <th><div class="d-flex align-items-center justify-content-center"><p class="m-0 text-transform-capitilize">Quantity</p></div></th>
                                <th><div class="d-flex align-items-center justify-content-center"><p class="m-0 text-transform-capitilize">Rate</p></div></th>
                                <th><div class="d-flex align-items-center justify-content-center"><p class="m-0 text-transform-capitilize">Amount</p></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class=""><p>Lead</p></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><p>1</p></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><p>$99</p></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><p>$200</p></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="invoice-total">
                    <b-row>
                        <b-col cols="9" class="text-left">
                            <div class="mt-1"><span>Subtotal</span></div>
                            <div class="mt-1"><span>Discount</span></div>
                            <div class="mt-1"><span>Promo ($99) : DSFADSDa</span></div>
                            <div class="mt-1"><span>Promo (99%) : DSFADSDa</span></div>
                        </b-col>
                        <b-col cols="3" class="text-right">
                            <p class="mt-1">$9999</p>
                            <p class="mt-1">$0</p>
                            <p class="mt-1">-$99</p>
                            <p class="mt-1">-99%</p>
                        </b-col>
                    </b-row>
                    <b-row class="total">
                        <b-col cols="9" class="text-left">
                            <div class=""><span>Total</span></div>
                        </b-col>
                        <b-col cols="3" class="text-right">
                            <p class="mt-1">$999</p>
                            <p class="mt-1">$099</p>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>
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
  BButton
} from "bootstrap-vue";
import vSelect from "vue-select";
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
    BButton
  },
};
</script>