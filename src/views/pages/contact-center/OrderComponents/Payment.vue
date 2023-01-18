<template>
    <b-row>
        <b-col sm="12">
            <b-form-group>
                <label for="">Card Number</label>
                <div class="input-gradient">
                <b-form-input placeholder="Enter Card Number"></b-form-input>
                </div>
            </b-form-group>
        </b-col>
        <b-col sm="6">
        <b-form-group>
            <label for="">Expiration Date</label>
            <div class="input-gradient">
            <b-form-input placeholder="Enter Expiry Date"></b-form-input>
            </div>
        </b-form-group>
        </b-col>
        <b-col sm="6">
        <b-form-group>
            <label for="">CVV</label>
            <div class="input-gradient">
            <b-form-input placeholder="Enter CVV"></b-form-input>
            </div>
        </b-form-group>
        </b-col>
        <b-col sm="12">
        <b-form-group>
            <label for="">Card Notes</label>
            <div class="input-gradient">
            <b-form-textarea placeholder="Enter Note"></b-form-textarea>
            </div>
        </b-form-group>
        </b-col>
        <b-col sm="12" class="mb-5">
            <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted" >
                Save card details for next time
            </b-form-checkbox>
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