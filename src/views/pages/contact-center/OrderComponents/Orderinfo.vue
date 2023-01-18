<template>
    <div>
        <b-row>
            <b-col sm="6">
            <b-form-group>
                <label for="">Categroy</label>
                <div class="input-gradient">
                <v-select placeholder="Select Categroy"></v-select>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="6">
            <b-form-group>
                <label for="">Product</label>
                <div class="input-gradient">
                <v-select placeholder="Select Product"></v-select>
                </div>
            </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col sm="4" class="">
            <b-form-group>
                <label for="">Product Specification</label>
            </b-form-group>
            </b-col>
            <b-col sm="8"  class="">
            <b-form-group>
                <b-form-checkbox switch></b-form-checkbox>
            </b-form-group>
            </b-col>
        </b-row>
        <b-row class="">
            <b-col sm="6">
            <b-form-group>
                <label for="">Brand</label>
                <div class="input-gradient">
                    <v-select placeholder="Select brand"></v-select>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="6">
            <b-form-group>
                <label for="">Capacity</label>
                <div class="input-gradient">
                    <v-select placeholder="Select Capacity"></v-select>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="6">
            <b-form-group>
                <label for="">Color</label>
                <div class="input-gradient">
                    <v-select placeholder="Select Color"></v-select>
                </div>
            </b-form-group>
            </b-col>
        </b-row>
        <hr>
        <!--==============================-->
        <!--==============================-->
        <div class="mt-2 mb-2">
            <b-row>
            <b-col md="4">
                <label for="">Delivery</label>
            </b-col>
            <b-col md="8">
                <b-form-group>
                    <b-form-checkbox  switch></b-form-checkbox>
                </b-form-group>
            </b-col>
            </b-row>
            <b-row>
            <b-col md="4">
                <label for="">Pickup</label>
            </b-col>
            <b-col md="8">
                <b-form-group>
                    <b-form-checkbox  switch></b-form-checkbox>
                </b-form-group>
            </b-col>
            </b-row>
            <b-row>
            <b-col md="4">
                <b-form-group>
                    <label for="">Delivery Date</label>
                    <div class="input-gradient">
                    <b-form-datepicker
                    id="deliveryDate"
                    placeholder="Select Date"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    ></b-form-datepicker>
                    </div>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group>
                    <label for="">Delivery Start Time</label>
                    <div class="input-gradient">
                    <v-select placeholder="Select Start Time"></v-select>
                    </div>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group>
                    <label for="">Delivery End Time</label>
                    <div class="input-gradient">
                    <v-select placeholder="Select End Time"></v-select>
                    </div>
                </b-form-group>
            </b-col>
            </b-row>
            <b-row>
            <b-col md="4">
                <b-form-group>
                    <label for="">Pickup Date</label>
                    <div class="input-gradient">
                    <b-form-datepicker
                    id="pickupDate"
                    placeholder="Select Date"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    ></b-form-datepicker>
                    </div>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group>
                    <label for="">Pickup Start Time</label>
                    <div class="input-gradient">
                    <v-select placeholder="Select Start Time"></v-select>
                    </div>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group>
                    <label for="">Pickup End Time</label>
                    <div class="input-gradient">
                    <v-select placeholder="Select End Time"></v-select>
                    </div>
                </b-form-group>
            </b-col>
            </b-row>
        </div>
        <hr>
        <!--==============================-->
        <!--==============================-->
        <b-row>
            <b-col sm="12">
            <b-form-group>
                <label for="">Order Note</label>
                <div class="input-gradient">
                <b-form-textarea placeholder="Enter Note"></b-form-textarea>
                </div>
            </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import {
    BRow,
    BCol,
    BCard,
    BCardText,
    BLink,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BImg,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BTable,
    BFormCheckbox,
    BBadge,
    BButton,
    BModal,
    BFormTextarea,
    BFormFile,
    BFormDatepicker
} from "bootstrap-vue";
import vSelect from "vue-select";
export default {
components: {
        BRow,
        BCol,
        BCard,
        BCardText,
        BLink,
        BFormGroup,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BMedia,
        BAvatar,
        BMediaAside,
        BMediaBody,
        BImg,
        BCardHeader,
        BCardBody,
        BCardTitle,
        BDropdown,
        BDropdownItem,
        BTable,
        BFormCheckbox,
        BBadge,
        BButton,
        BModal,
        BFormTextarea,
        BFormFile,
        BFormDatepicker,
        vSelect,
    },
    data() {
        return{
            
        }
    },
    methods:{

    }
}
</script>