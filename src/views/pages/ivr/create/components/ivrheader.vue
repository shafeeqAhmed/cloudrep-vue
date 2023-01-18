<template>
  <div>
    <!-- <div class="campaign-header position-relative">
      <div class="camp-img">
        <b-img class="w-100" src="@/assets/images/campaign-img/bghead.png"></b-img>
      </div>
      <div class="campaignhead-heading position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
        <h1>Introducing CloudRep AI The World’s <br> First Web3 Gig Economy</h1>
      </div>
    </div> -->
    <div class="ivr-header-headings d-flex align-items-end">
      <h2>IVR Builder</h2>
      <h4 class="mx-2">New IVR</h4>
      <div class="header-search-ivr w-50">
        <b-form-input
          :value="name"
          @input="updateIvrName"
          placeholder="Enter IVR Title"
        />
        <span
          class="text-danger"
          v-if="isNameError"
          >Min 5 characters required</span
        >
      </div>
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
import { debounce } from "@/commonFunction/helpers.js";

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
  props: ["name"],
  data() {
    return {
      isNameError: 0,
    };
  },
  methods: {
    updateIvrName: debounce(function (e) {
      if (e.length > 4) {
        this.$store.commit("ivrBuilder/UPDATE_IVR_NAME", e);
        this.isNameError = 0;
      } else {
        this.isNameError = 1;
      }
    }, 500),
  },
};
</script>

<style
  lang="scss"
  scoped
>
.campaignhead-heading {
  top: 0;

  h1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
