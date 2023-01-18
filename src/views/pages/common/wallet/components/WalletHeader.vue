<template>
  <div>
    <b-row>
        <b-col cols="12">
            <div class="wallet-heading">
                <h1>My Wallet</h1>
            </div>
        </b-col>
    </b-row>
  </div>
</template>

<script>
import {
    BRow,
    BCol,
    BImg,
    BCardTitle,
    BFormInput,
    BInputGroupPrepend,
    BInputGroup,
    BButton,
    BFormGroup,
    BLink
} from "bootstrap-vue";
import vSelect from "vue-select";

export default {
    components: {
        BRow,
        BCol,
        BImg,
        BCardTitle,
        BFormInput,
        BInputGroupPrepend,
        BInputGroup,
        BButton,
        BFormGroup,
        BLink,
        vSelect,
    },
}
</script>

<style>

</style>