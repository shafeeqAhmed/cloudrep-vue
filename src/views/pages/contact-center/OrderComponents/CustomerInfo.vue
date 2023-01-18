<template>
        <b-row>
            <b-col sm="6">
            <b-form-group>
                <label for="">First Name</label>
                <div class="input-gradient">
                <b-form-input placeholder="First Name"></b-form-input>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="6">
            <b-form-group>
                <label for="">Last Name</label>
                <div class="input-gradient">
                <b-form-input placeholder="Last Name"></b-form-input>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="6">
            <b-form-group>
                <label for="">Phone</label>
                <div class="input-gradient">
                <b-form-input placeholder="Client Name"></b-form-input>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="6">
            <b-form-group>
                <label for="">Email</label>
                <div class="input-gradient">
                <b-form-input placeholder="Enter Email"></b-form-input>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="12">
            <b-form-group>
                <label for="">Customer Type</label>
                <div class="input-gradient">
                <v-select placeholder="Select Customer Type"></v-select>
                </div>
            </b-form-group>
            </b-col>
            <b-col sm="12">
            <b-form-group>
                <label for="">Customer Note</label>
                <div class="input-gradient">
                <b-form-textarea placeholder="Enter Note"></b-form-textarea>
                </div>
            </b-form-group>
            </b-col>
            
        </b-row>
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