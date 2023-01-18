<template>
  <div>
    <div class="api-toggle-container" v-b-toggle="`apiList-${apiList.uuid}`">
      <h2>{{ apiList.name }}</h2>
      <feather-icon icon="ChevronDownIcon" class="mr-1" size="21" />
    </div>
    <b-collapse :id="`apiList-${apiList.uuid}`">
      <div v-for="(endPoint, index) in apiList.apiEndPoint">
        <!-- GET API -->
        <div v-if="endPoint.type == 'Get'">
          <div
            class="api-toggle-get"
            v-b-toggle="`api-endpoint-${endPoint.uuid}`"
          >
            <div class="py-1 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center getLightHeading">
                <a>{{ endPoint.type }}</a>
                <h2>{{ endPoint.url }}</h2>
                <h2>{{ endPoint.title }}</h2>
              </div>
              <div>
                <feather-icon
                  icon="ChevronDownIcon"
                  class="mr-1 blackDownIcon"
                  size="21"
                />
              </div>
            </div>
          </div>
          <b-collapse :id="`api-endpoint-${endPoint.uuid}`">
            <div class="apiEndPointDescription">
              <h3>{{ endPoint.description }}</h3>
              <api-parameter :apiParameter="endPoint.apiParameter" />
              <api-response :apiResponse="endPoint.apiResponse" />
            </div>
          </b-collapse>
        </div>
        <!-- PUT API -->
        <div v-if="endPoint.type == 'Put'">
          <div
            class="api-toggle-put"
            v-b-toggle="`api-endpoint-${endPoint.uuid}`"
          >
            <div class="py-1 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center putApiHeading">
                <a>{{ endPoint.type }}</a>
                <h2>{{ endPoint.url }}</h2>
                <h2>{{ endPoint.title }}</h2>
              </div>
              <div>
                <feather-icon
                  icon="ChevronDownIcon"
                  class="mr-1 blackDownIcon"
                  size="21"
                />
              </div>
            </div>
          </div>
          <b-collapse :id="`api-endpoint-${endPoint.uuid}`">
            <div class="apiEndPointDescription">
              <h3>{{ endPoint.description }}</h3>
              <api-parameter :apiParameter="endPoint.apiParameter" />
              <api-response :apiResponse="endPoint.apiResponse" />
            </div>
          </b-collapse>
        </div>
        <!-- POST API -->
        <div v-if="endPoint.type == 'Post'">
          <div
            class="api-toggle-post"
            v-b-toggle="`api-endpoint-${endPoint.uuid}`"
          >
            <div class="py-1 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center postApiHeading">
                <a>{{ endPoint.type }}</a>
                <h2>{{ endPoint.url }}</h2>
                <h2>{{ endPoint.title }}</h2>
              </div>
              <div>
                <feather-icon
                  icon="ChevronDownIcon"
                  class="mr-1 blackDownIcon"
                  size="21"
                />
              </div>
            </div>
          </div>
          <b-collapse :id="`api-endpoint-${endPoint.uuid}`">
            <div class="apiEndPointDescription">
              <h3>{{ endPoint.description }}</h3>
              <api-parameter :apiParameter="endPoint.apiParameter" />
              <api-response :apiResponse="endPoint.apiResponse" />
            </div>
          </b-collapse>
        </div>
        <!-- DELETE API -->
        <div v-if="endPoint.type == 'Delete'">
          <div
            class="api-toggle-delete"
            v-b-toggle="`api-endpoint-${endPoint.uuid}`"
          >
            <div class="py-1 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center deleteApiHeading">
                <a>{{ endPoint.type }}</a>
                <h2>{{ endPoint.url }}</h2>
                <h2>{{ endPoint.title }}</h2>
              </div>
              <div>
                <feather-icon
                  icon="ChevronDownIcon"
                  class="mr-1 blackDownIcon"
                  size="21"
                />
              </div>
            </div>
          </div>
          <b-collapse :id="`api-endpoint-${endPoint.uuid}`">
            <div class="apiEndPointDescription">
              <h3>{{ endPoint.description }}</h3>
              <api-parameter :apiParameter="endPoint.apiParameter" />
              <api-response :apiResponse="endPoint.apiResponse" />
            </div>
          </b-collapse>
        </div>
      </div>
    </b-collapse>
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
import ApiResponse from "../components/ApiResponse.vue";

export default {
  props: ["apiList"],
  components: {
    ApiParameter,
    ApiResponse,
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