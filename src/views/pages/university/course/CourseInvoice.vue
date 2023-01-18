<template>
    <div class="course-invoice py-5" >
        <div class="">
            <h2>Invoicing List</h2>
            <div class="invoice-table mt-3">
                <table class="table">
                <thead>
                    <tr>
                        <!-- <th><div class=""><p class="m-0 text-transform-capitilize">Sr #</p></div></th> -->
                        <th><div class="d-flex align-items-center justify-content-start"><p class="m-0 text-transform-capitilize">Course Name</p></div></th>
                        <th><div class="d-flex align-items-center justify-content-center"><p class="m-0 text-transform-capitilize">Date</p></div></th>
                        <th><div class="d-flex align-items-center justify-content-center"><p class="m-0 text-transform-capitilize">Promo Code</p></div></th>
                        <th><div class="d-flex align-items-center justify-content-center"><p>Price</p></div></th>
                        <th><div class="d-flex align-items-center justify-content-center"><p>Action</p></div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice in invoices" :key="invoice.id">
                        <!-- <td><div class=""><p>1</p></div></td> -->
                        <td><div class="d-flex align-items-center justify-content-start"><div class="d-flex align-items-center invoice-img"><b-img :src="invoice.order.course.thumbnail" class="mr-1"></b-img><p>{{invoice.order.course.title}}</p></div></div></td>
                        <td><div class="d-flex align-items-center justify-content-center"><p>{{invoice.date}}</p></div></td>
                        <td><div class="d-flex align-items-center justify-content-center"><p>{{invoice.order.copon.title}}</p></div></td>
                        <td><div class="d-flex align-items-center justify-content-center"><p>${{invoice.amount}}</p></div></td>
                        <!-- <td><div class="d-flex align-items-center justify-content-center"><b-link @click="gotoInvoice(invoice.uuid)" class="preview"><feather-icon icon="EyeIcon" size="20" class="mr-1"/></b-link><span @click="downloadInvoice()"><feather-icon icon="DownloadCloudIcon" size="20" class="mr-1"/></span></div></td> -->
                        <td><div class="d-flex align-items-center justify-content-center"><b-link @click="gotoInvoice(invoice.uuid)" class="preview"><feather-icon icon="EyeIcon" size="20" class="mr-1"/></b-link></div></td>
                    </tr>
                </tbody>
            </table>
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
  BButton,
  BLink
} from "bootstrap-vue";
import vSelect from "vue-select";
import { getUserData } from '@/auth/utils'
import { toastAlert } from "@core/mixins/ui/toast";
import axios from 'axios';
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
    BLink,
  },
  mixins: [toastAlert],
  data() {
    return {
      invoices:[]
    };
  },
  methods:{
     getUserInvoice(){
            this.showLoader();
            this.$http
            .get("get-user-invoices?user_uuid=" + this.user.user_uuid)
            .then((response) => {
                const { data: { data: { invoice }}} = response
                this.invoices = invoice
                console.log(this.invoice)
            })
            .catch((error) => {
                // this.errorToast();
            })
            .finally(() => {
                this.hideLoader()
            });
        },
        gotoInvoice(param) {
            this.$router.push({ name: 'course-invoice-view', params: { uuid: param } })
        },
  },
  mounted(){
      this.getUserInvoice()
    },
    
    created() {
    this.user = getUserData()
  },
};

</script>

<style lang="scss">
    
</style>
