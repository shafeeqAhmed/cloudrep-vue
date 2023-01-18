<template>
  <div>
    <div class="api_R_Container">
      <div class="api_R_Heading">
        <h2>Response</h2>
      </div>
      <div class="api_R_Content">
        <div class="api_R_Content_h">
          <b-row>
            <b-col md="2">
              <h2>Code</h2>
            </b-col>
            <b-col md="10">
              <h2>Description</h2>
            </b-col>
          </b-row>
        </div>
        <hr />
        <div class="api_R_Content_p" v-for="(apiResponse, index) in apiResponse" :key="index" >
          <b-row>
            <b-col md="2">
              <p>{{ apiResponse.code }}</p>
            </b-col>
            <b-col md="9">
              <p>{{apiResponse.description}}</p>
              <div class="w-100 d-block api_R_error404">
                <p>Media type</p>
                <b-form-select class="api_R_input" v-model="selected" :options="options"></b-form-select><br />
                <span class="error_value">Controls Accept header.</span>
              </div>
              <!-- <div class="api_R_Desc_Json">
                {{ JSON.stringify(apiResponse.example_value, null, 2) }}
                {{apiResponse.example_value}}
                <p v-html="apiResponse.example_value"></p>
              </div> -->
              <div>
                <json-viewer :value="apiResponse.example_value"></json-viewer>
              </div>
            </b-col>
            <b-col md="1"></b-col>
          </b-row>
          <hr />
        </div>
      </div>
        <!-- <div v-if="apiResponse.code != 422">
        <div class="api_R_Content">
        <div class="api_R_Content_h">
          <b-row>
            <b-col md="2">
              <h2>404</h2>
            </b-col>
            <b-col md="10">
              <h2>Not Found</h2>
            </b-col>
          </b-row>
        </div>
        <hr />
        <div>
          <b-row>
            <b-col md="2"></b-col>
            <b-col md="9">
              <div class="w-100 d-block api_R_error404">
                <p>Media type</p>
                <b-form-select class="api_R_input" v-model="selected" :options="options"></b-form-select><br />
                <span>Controls Accept header.</span>
              </div>
              <div class="api_R_Desc_Json">
                <p v-html="message404" class="api_R_error"></p>
              </div>
            </b-col>
            <b-col md="1"></b-col>
          </b-row>
        </div>
      </div>
    </div> -->
      
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
  BFormSelect,
} from "bootstrap-vue";
import BCardCode from '@core/components/b-card-code';
import ApiParameter from "../components/ApiParameter.vue";
import JsonViewer from 'vue-json-viewer';
// import 'vue-json-viewer/style.css'
export default {
  props: ["apiResponse"],
  components: {
    JsonViewer,
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
    BFormSelect,
    BCardCode
  },

  directives: {
    "b-toggle": VBToggle,
  },
  data() {
    return {
      apiLists: [],
      selected: 'a',
      options: [
        { value: 'a', text: 'application/json' },
      ],
    };
  },
  methods: {
  },
};
</script>

<style>
  /* @import 'vue-json-viewer/style.css'; */
  .jv-container.jv-light {
    background: black !important;
    border-radius: 10px !important;
    margin-top: 10px !important;
  }
</style>