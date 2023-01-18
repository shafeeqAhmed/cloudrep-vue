<template>
    <div>
        <b-modal id="create-camp" centered modal-class="modal-number" hide-header hide-footer>
            <b-row>
                <b-col cols="12">
                    <h2>Campaign</h2>
                </b-col>
                <b-col cols="12" class="mt-2">
                    <b-form-group>
                        <label for="Publisher"></label>
                        <div class="input-gradient">
                            <v-select placeholder="Select Publisher" :option="option"></v-select>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col cols="12" class="mt-2">
                    <b-button variant="primary">Create</b-button>
                </b-col>
            </b-row>
        </b-modal>
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
      },
      directives: {
        "b-modal": VBModal,
      },
      
  }
  </script>
  
  <style>
  
  </style>