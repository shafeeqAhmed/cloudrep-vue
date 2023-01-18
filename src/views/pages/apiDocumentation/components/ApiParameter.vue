<template>
  <div>
    <div class="api_p_Container">
      <div class="api_p_Heading">
        <h2>Parameters</h2>
        <!-- {{apiParameter}} -->
      </div>
      <div class="api_p_Content" v-if="apiParameter.length > 0">
        <div class="api_p_Content_h">
          <b-row>
            <b-col md="2">
              <h2>Name</h2>
            </b-col>
            <b-col md="10">
              <h2>Description</h2>
            </b-col>
          </b-row>
        </div>
        <hr />
        <div class="api_p_Content_p" v-for="(apiParam, index) in apiParameter">
          <b-row>
            <b-col md="2">
              <h2>{{apiParam.name}} ({{apiParam.data_type}})<br /><span>(query)</span></h2>
            </b-col>
            <b-col md="3">
              <h2>{{apiParam.description}}<br />Example : {{apiParam.example_data}}</h2>
              <input type="text" class="form-control" :placeholder="apiParam.example_data" readonly/>
            </b-col>
            <b-col md="7"></b-col>
          </b-row>
        </div>
      </div>
      <div v-else class="p-2">
        <span class="m-4">No Parameters</span>
      </div>
    </div>
  </div>
</template>

<script>
    import {
      BRow,
      BCol,
      BButton,
      BFormInput,
      BFormGroup,
      BFormFile,
      BCollapse,
      BTooltip,
      VBToggle,
      BButtonGroup,
      BImg,
      BCard,
    } from "bootstrap-vue";
    import ApiParameter from "../components/ApiParameter.vue";
    
    export default {
      props: ["apiParameter"],
      components: {
        ApiParameter,
        BRow,
        BCol,
        BButton,
        BFormInput,
        BFormGroup,
        BFormFile,
        BCollapse,
        BTooltip,
        VBToggle,
        BButtonGroup,
        BImg,
        BCard,
      },
    
      directives: {
        "b-toggle": VBToggle,
      },
      data() {
        return {
          apiLists: [],
        };
      },
      methods: {},
      created() {},
    };
    </script>

<style>
</style>