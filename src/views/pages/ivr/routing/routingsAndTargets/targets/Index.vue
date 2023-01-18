<template>
    <div class="contract">
      <div class="upp-header">
          <div class="upp-img">
              <b-img class="w-100" src="@/assets/images/logo/upp-img.png" ></b-img>
          </div>
          <div class="upp-heading">
              <h1>Manage Target Listing</h1>
          </div>
      </div>
      <div class="create-contract mt-3 pb-3">
          <b-row>
              <b-col cols="6" class="">
                  <!-- <h2>Target Listing</h2> -->
              </b-col>
              <b-col cols="6" class="">
                <!-- <b-button class="primary-btn float-right"  v-b-modal.create-num>+ Create Number</b-button> -->
              </b-col>
              
              <b-col cols="12" class="num-tab">
                <b-tabs content-class="mt-3 ">
                    <b-tab title="Target" active>
                        <Target/>
                    </b-tab>
                    <b-tab title="Groups">
                        <Groups/>
                    </b-tab>
                    <b-tab title="Tress">
                        <Tress/>
                    </b-tab>
                </b-tabs>
                  
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
  import Target from './target_list/index.vue'
  import Groups from './group_list/Groups.vue'
  import Tress from './tree_list/Tress.vue'
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
            Target,
            Groups,
            Tress
      },
      directives: {
        "b-modal": VBModal,
      },
      
  }
  </script>