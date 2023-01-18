<template>
  <div class="campaign-header position-relative">
    <div class="camp-img">
        <b-img class="w-100" src="@/assets/images/campaign-img/bghead.png" ></b-img>
    </div>
    <div class="campaignhead-heading position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
        <h1>Introducing CloudRep AI The World’s <br> First Web3 Gig Economy</h1>
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
  BModal,
  BEmbed,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavItem,
} from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BButton,
    BImg,
    BFormGroup,
    BFormInput,
    BForm,
    BModal,
    BEmbed,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavItem,
  },
  data(){
    return {
        // headBg : '/assets/images/campaign-img/bghead.png',
    }
  }
}
</script>