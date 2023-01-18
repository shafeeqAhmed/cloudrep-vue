<template>
    <div class="web3-token-project">
        <div class="web3-token-bg"></div>
        <div class="webtoken-project h-auto">
            <div class="container">
                <!--Header-->
                    <Header />
                <!--/Header-->
                <div class="token-space-50"></div>
                <!--token-->
                    <Tokens/>
                <!--/token-->
            </div>
        </div>
    </div>
  
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
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
} from "bootstrap-vue";
import Header from './components/Header.vue';
import Tokens from './components/Tokens.vue';

export default {
    components : {
        BRow,
        BCol,
        BCard,
        BCardText,
        BLink,
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
        Header,
        Tokens
    }
}
</script>

<style>

</style>