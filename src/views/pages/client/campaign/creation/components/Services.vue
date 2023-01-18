<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-services campaign-step-zero campaign-steps">
        <b-row class="">
          <b-col
            md="12"
            sm="12"
          >
            <div class="campaign-services-flex">
              <div
                class="camp-service"
                v-for="service in services"
                :key="service.id"
                @click="getServiceValue(service)"
                :class="{ selected: service.is_selected }"
              >
                <div class="campaign-service-box">
                  <!-- <b-img class="shapeimg" :src="bgCard1"></b-img> -->
                  <b-img
                    class="bgServices"
                    :src="service.image"
                  ></b-img>

                  <b-img
                    class="shapeimg"
                    :src="service.icon"
                  ></b-img>
                  <h4>{{ service.name }}</h4>
                  <p>
                    A community for VR and novices alike, regular and friendly
                    chat.
                  </p>
                  <div class="user">
                    <div class="online-user">
                      <b-img
                        src="@/assets/images/campaign-img/user.png"
                      ></b-img>
                      <p>5,678 Online</p>
                    </div>
                    <div class="members">
                      <b-img
                        src="@/assets/images/campaign-img/online.png"
                      ></b-img>
                      <p>345,678 Members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="campaign-pagination mt-5 px-1">
        <div class="text-right">
          <!-- <b-button class="back-btn" @click="$store.commit('clientCampaign/UPDATE_STEP', 1)">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L1 5M1 5L5 9M1 5L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Back</b-button> -->
          <b-button
            variant="primary"
            class="next-btn"
            @click="save"
          >
            {{
              checkService($store.state.clientCampaign.campaign.service_uuid)
            }}
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BFormGroup,
  BForm,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BForm,
    required,
  },

  mixins: [toastAlert],
  data() {
    return {
      service_uuid: "",
      bgCard1: require("@/assets/images/campaign-img/cardshape-1.png"),
      bgCard2: require("@/assets/images/campaign-img/cardshape-2.png"),
      bgCard3: require("@/assets/images/campaign-img/cardshape-3.png"),
      bgCard4: require("@/assets/images/campaign-img/cardshape-4.png"),
      bgCard5: require("@/assets/images/campaign-img/cardshape-5.png"),
      isServiceSelected: false,
    };
  },
  computed: {
    services() {
      return this.$store.getters["clientCampaign/services"];
    },
    campaign() {
      return this.$store.state.clientCampaign.campaign;
    },
  },
  watch: {
    "$store.state.clientCampaign.campaign": function () {
      console.log("this is the console change in service-----------");
      this.assignCampaignDetail();
    },
  },
  methods: {
    checkService(id) {
      if (id === null || id === "") {
        return "Save";
      } else {
        return "Update";
      }
    },
    getServiceValue(service) {
      this.services.forEach((element) => {
        if (element.uuid != service.uuid) {
          element.is_selected = false;
        }
      });
      service.is_selected = !service.is_selected;
      this.service_uuid = service.uuid;
    },
    selectServiceOnUpdate() {
      this.services.forEach((element) => {
        if (element.is_selected) {
          this.service_uuid = element.uuid;
        }
      });
    },
    save() {
      if (this.service_uuid == "") {
        this.conditionalToast(
          "danger",
          "Error",
          "Please Select Service",
          "error"
        );
        return false;
      }

      //Checking service if any is_selected = true
      this.services.forEach((element) => {
        if (element.is_selected) {
          this.isServiceSelected = true;
        }
      });
      if (this.isServiceSelected) {
        const { campaignUuid } = this.$store.state.clientCampaign;

        if (campaignUuid) {
          this.selectServiceOnUpdate();
          this.update({
            service_uuid: this.service_uuid,
            campaign_uuid: campaignUuid,
            step: 2,
          });
        } else {
          this.insert({
            service_uuid: this.service_uuid,
            campaign_uuid: campaignUuid,
            step: 2,
          });
        }
      } else {
        this.conditionalToast(
          "danger",
          "Error",
          "Please Select Service First!",
          "error"
        );
      }
    },
    insert(params) {
      this.$store
        .dispatch("clientCampaign/storeServiceAgainstCampaign", params)
        .then((response) => {
          this.successToast("Success", response.data.message);

          this.$store.dispatch("clientCampaign/getCampaign");
        });
    },
    update(params) {
      if (
        params.service_uuid !=
        this.$store.state.clientCampaign.campaign.service_uuid
      ) {
        this.$store
          .dispatch("clientCampaign/updateServiceAgainstCampaign", params)
          .then((response) => {
            if (response.data.status) {
              this.conditionalToast(
                "success",
                "Success",
                response.data.message,
                "success"
              );

              this.$store.dispatch("clientCampaign/getCampaign");
            } else {
              this.errorToast("Error", response.data.message);
            }
          });
      } else {
        /* this.conditionalToast(
          "danger",
          "Error",
          "Service Already Exist.",
          "error"
        ); */
      }
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign) {
        this.service_uuid =
          campaign.service_uuid != null ? campaign.service_uuid : "";
        // this.$store.commit('clientCampaign/UPDATE_USER_UUID', campaign.user_uuid)
      }
    },
  },
  created() {
    this.$store.dispatch("clientCampaign/getServices").then(() => {
      this.assignCampaignDetail();
    });
  },
};
</script>
