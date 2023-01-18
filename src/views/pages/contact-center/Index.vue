<template>
    <div>
      <!---=====================-->
      <!---=====================-->
      <div class="contact-center-header mt-1 mb-5">
          <div class="cont-center-heading">
              <h1>Analytics Overview Dashboard</h1>
          </div>
      </div>
      <!---=====================-->
      <!---=====================-->
      <div class="co-center-dasboard pb-4">
        <b-row>
            <b-col>
                <div>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Basic Kpi's" active>
                            <BasicKpis/>
                        </b-tab>
                        <b-tab title="Advanced Kpi's">
                            <AdvancedKpis/>
                        </b-tab>
                        <b-tab title="Quality Kpi's">
                            <QualityKpis/>
                        </b-tab>
                    </b-tabs>
                </div>
            </b-col>
        </b-row>
      </div>
    </div>
  </template>
  
  <script>

    import BasicKpis from './components/BasicKpis.vue';
    import AdvancedKpis from './components/AdvancedKpis.vue';
    import QualityKpis from './components/QualityKpis.vue';
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
    BPagination,
    BTabs,
    BTab
  } from "bootstrap-vue";
  import vSelect from "vue-select";
  export default {
  components: {
    BasicKpis,
    AdvancedKpis,
    QualityKpis,
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
      vSelect,
      BPagination,
      BTabs,
    BTab    
    },
    data() {
      return {
            options1: [
                "1",
                "2"
            ],
      };
    },
  }
  </script>
  
  <style>
  
  </style>