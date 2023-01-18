<template>
    <div class="contract">
      <div class="upp-header">
          <div class="upp-img">
              <b-img class="w-100" src="@/assets/images/logo/upp-img.png" ></b-img>
          </div>
          <div class="upp-heading">
              <h1>Campaign</h1>
          </div>
      </div>
      <div class="create-contract mt-3 pb-3">
          <b-row>
              <b-col cols="6" class="mb-3">
                  <h2>Campaign Listing</h2>
              </b-col>
              <b-col cols="6" class="mb-3">
                <b-button variant="primary" class="float-right"  v-b-modal.create-camp>Create</b-button>
                <CreateModal/>
              </b-col>
              <b-col cols="12">
                <campaignListing/>
              </b-col>
          </b-row>
    </div>
</div>
</template>
  
<script>
  import {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormInvalidFeedback,
    BButton,
    BImg,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormFile,
    BInputGroupPrepend,
    BFormSelect,
    BFormCheckbox,
    BModal,
    VBModal,
    BTab,
    BTabs
  } from "bootstrap-vue";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import vSelect from "vue-select";
  import campaignListing from './components/campaignListing.vue'
  import CreateModal from './components/CreateModal.vue'
  export default {
      components: {
          BRow,
          BCol,
          BFormGroup,
          BFormInput,
          BFormTextarea,
          BFormInvalidFeedback,
          BButton,
          BImg,
          BDropdown,
          BDropdownItem,
          BForm,
          BInputGroup,
          BFormFile,
          BInputGroupPrepend,
          BFormSelect,
          BFormCheckbox,
          vSelect,
          ValidationProvider,
          ValidationObserver,
          BModal,
        VBModal,
        BTab,
        BTabs,
        campaignListing,
        CreateModal
      },
      directives: {
        "b-modal": VBModal,
      },
      
  }
  </script>
  
  <style>
  
  </style>