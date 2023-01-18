<template>
  <div class="api-doc-container">
    <div class="api-header">
      <div class="container">
        <b-row>
          <b-col md="3">
            <b-img src="@/assets/images/auth/company-logo.png" class="" style="width: 200px;"/>
          </b-col>
          <b-col md="9"></b-col>
        </b-row>
      </div>
    </div>
    <div class="api-heading">
      <div class="container">
        <div class="heading-top">
          <h2>CloudRep API</h2>
          <span class="v1">v1.0.0</span>
          <span class="v2">OAS4</span>
        </div>
        <p>https://development-backend.cloudrep.ai/docs/api-docs.json</p>
      </div>
    </div>
    <div class="api-container">
      <div class="container">
        <b-row>
          <b-col md="12">
            <div class="mb-1" v-for="apiList in apiLists" :key="apiList.id" >
              <ApiEndPoint :apiList="apiList" />
            </div>
          </b-col>
        </b-row>
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
import ApiEndPoint from './components/ApiEndPoint.vue';
import { toastAlert } from "@core/mixins/ui/toast";
export default {
  components: {
    ApiEndPoint,
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
  mixins: [toastAlert],
  directives: {
    "b-toggle": VBToggle,
  },
  data() {
    return {
      apiLists: [],
    };
  },
  methods: {
    getApiList() {
      this.showLoader()
      this.$http
        .get("get-api-list")
        .then((response) => {
          console.log(response);
          const {
            data: {
              data: { apiList },
            },
          } = response;
          if (apiList) {
            this.apiLists = apiList;
          }
        })
        .catch((error) => {})
        .finally(()=>{
          this.hideLoader();
        });
    },
  },
  created() {
    this.getApiList();
  },
};
</script>

<style>
</style>