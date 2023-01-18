<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-step-seven campaign-steps">
        <b-row>
          <b-col
            md="4"
            v-if="isAgentInclude"
          >
            <ImageUpload
              :preveiwImage="agent_image"
              title="Agent Image"
              courseImage="agent_image"
            />
          </b-col>
          <b-col md="4">
            <ImageUpload
              :preveiwImage="client_image"
              title="Client Image"
              courseImage="client_image"
            />
          </b-col>
          <b-col md="4">
            <ImageUpload
              :preveiwImage="publisher_image"
              title="Publisher Image"
              courseImage="publisher_image"
            />
          </b-col>
          <b-col cols="12">
            <!-- v-if="$store.state.clientCampaign.imageFileValidate" -->
            <div>
              <ul class="mt-2">
                <li>
                  <span class="image-info"
                    >Image Dimensions should be in 1280x720
                  </span>
                </li>
                <li>
                  <span class="image-info"
                    >Image Size should be less than 5mb
                  </span>
                </li>
              </ul>
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
  BFormSelect,
  BCard,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref } from "@vue/composition-api";
import useUploadImage from "@/views/pages/client/campaign/creation/useUploadImage";
import { toastAlert } from "@core/mixins/ui/toast";
import ImageUpload from "./ImageUpload.vue";
import store from "@/store";

export default {
  name: "StepSeven",
  components: {
    ImageUpload,
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
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
    BCard,
  },
  mixins: [toastAlert],
  data() {
    return {
      agent_image: "",
      client_image: "",
      publisher_image: "",
    };
  },
  computed: {
    campaignStep() {
      const campaign = this.$store.getters["clientCampaign/campaign"];
      return !(campaign.step > 6 && this.isAllImageExist(campaign));
    },
    isAgentInclude() {
      return this.$store.state.clientCampaign.campaign.is_agent_include;
    },
    campaignChange() {
      this.$store.state.clientCampaign.campaign;
    },
  },
  watch: {
    "$store.state.clientCampaign.imageTypeForRemove": function (
      newVal,
      oldVal
    ) {
      if (
        this.$store.state.clientCampaign.imageTypeForRemove == "agent_image"
      ) {
        this.agent_image = "";
      }
      if (
        this.$store.state.clientCampaign.imageTypeForRemove == "client_image"
      ) {
        this.client_image = "";
      }
      if (
        this.$store.state.clientCampaign.imageTypeForRemove == "publisher_image"
      ) {
        this.publisher_image = "";
      }
    },
    campaignChange(newVal, oldVal) {
      this.agent_image = newVal.agent_image;
      this.client_image = newVal.client_image;
      this.publisher_image = newVal.publisher_image;
    },
  },
  methods: {
    store() {
      const campaign = this.$store.getters["clientCampaign/campaign"];

      const isCompleted = this.isAllImageExist(campaign);
      if (isCompleted) {
        this.$store.commit("clientCampaign/UPDATE_STEP", 10);
      }
    },
    isEmptyString(str) {
      return str ? false : true;
    },
    isAllImageExist(campaign) {
      const isAgent = this.$store.state.clientCampaign.campaign.campaign_rate;
      return !this.isEmptyString(campaign.client_image) && isAgent != null
        ? !this.isEmptyString(campaign.agent_image)
        : true && !this.isEmptyString(campaign.publisher_image);
    },
    assignImageData() {
      const campaign = this.$store.getters["clientCampaign/campaign"];
      const { agent_image, client_image, publisher_image } = campaign;
      this.agent_image = agent_image;
      this.client_image = client_image;
      this.publisher_image = publisher_image;
    },
  },
  created() {
    this.assignImageData();
  },
};
</script>
