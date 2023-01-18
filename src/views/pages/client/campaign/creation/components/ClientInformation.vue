<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-step-one campaign-fields campaign-steps">
        <validation-observer
          ref="stepOneForm"
          #default="{ errors }"
        >
          <b-form>
            <b-row>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <b-form-group class="">
                  <label class="font-medium-1 font-weight-bold"
                    >Client ID
                  </label>
                  <div class="input-gradient">
                    <v-select
                      :searchable="false"
                      placeholder="Select Client ID"
                      v-model="selectedClient"
                      @search="searchUser($event)"
                      :reduce="(list) => list.value"
                      @input="selectedUser"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="userList"
                      label="title"
                      class="v-sel-sty"
                    >
                      <template #option="{ title, icon }">
                        <feather-icon
                          :icon="icon"
                          size="16"
                          class="align-middle mr-25"
                        />
                        <span> {{ title }}</span>
                      </template>
                    </v-select>
                  </div>
                </b-form-group>
              </b-col>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Person Name"
                  vid="person_name"
                  rules="required"
                >
                  <b-form-group class="">
                    <!-- <div class="d-flex align-items-center justify-content-between">
                        <label  class="font-medium-1 font-weight-bold">Person Name</label>
                        <span class="text-danger" v-if="client.name.length>= 70">Max limit reached (70)</span>
                        <div v-else class="lmsInputFieldCounter">
                          <span v-if="client.name.length >= 1"><span >{{client.name.length}}</span> / 70</span>
                          <span v-if="client.name.length < 1">70</span>
                        </div>
                      </div> -->
                    <label class="font-medium-1 font-weight-bold"
                      >Person Name</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        id="person_name"
                        type="text"
                        v-model="client.name"
                        disabled
                        placeholder="Enter Name"
                        class="form-control transfer-field"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                        maxLength="70"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Personal Number"
                  vid="phone_no"
                  rules="required"
                >
                  <b-form-group class="">
                    <!-- <div class="d-flex align-items-center justify-content-between">
                        <label class="font-medium-1 font-weight-bold">Person Phone Number</label>
                        <span class="text-danger" v-if="client.phone_no.length>= 70">Max limit reached (70)</span>
                        <div v-else class="lmsInputFieldCounter">
                          <span v-if="client.phone_no.length >= 1"><span >{{client.phone_no.length}}</span> / 70</span>
                          <span v-if="client.phone_no.length < 1">70</span>
                        </div>
                      </div> -->
                    <label class="font-medium-1 font-weight-bold"
                      >Person Phone Number</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        id="person_number"
                        type="tel"
                        disabled
                        v-model="client.phone_no"
                        placeholder="Enter Phone Number"
                        class="form-control transfer-field"
                        maxLength="70"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Personal Title"
                  vid="title"
                  rules="required"
                >
                  <b-form-group class="">
                    <!-- <div class="d-flex align-items-center justify-content-between">
                        <label class="font-medium-1 font-weight-bold">Person Title</label>
                        <span class="text-danger" v-if="client.title.length>= 70">Max limit reached (70)</span>
                        <div v-else class="lmsInputFieldCounter">
                          <span v-if="client.title.length >= 1"><span >{{client.title.length}}</span> / 70</span>
                          <span v-if="client.title.length < 1">70</span>
                        </div>
                      </div> -->
                    <label class="font-medium-1 font-weight-bold"
                      >Person Title</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        id="person_title"
                        type="text"
                        disabled
                        v-model="client.title"
                        placeholder="Enter Title"
                        class="form-control transfer-field"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                        maxLength="70"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Personal Email"
                  vid="email"
                  rules="required"
                >
                  <b-form-group class="">
                    <!-- <div class="d-flex align-items-center justify-content-between">
                        <label class="font-medium-1 font-weight-bold">Person Email</label>
                        <span class="text-danger" v-if="client.email.length>= 100">Max limit reached (100)</span>
                        <div v-else class="lmsInputFieldCounter">
                          <span v-if="client.email.length >= 1"><span >{{client.email.length}}</span> / 100</span>
                          <span v-if="client.email.length < 1">100</span>
                        </div>
                      </div> -->
                    <label class="font-medium-1 font-weight-bold"
                      >Person Email</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        id="person_email"
                        type="email"
                        disabled
                        v-model="client.email"
                        placeholder="Enter Email"
                        class="form-control transfer-field"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                        maxLength="100"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col lg="6"></b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </div>
      <div class="campaign-pagination mt-2">
        <div class="text-right">
          <b-button
            v-if="isDisabled"
            disabled
            type="submit"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="next-btn"
          >
            <div class="d-flex justify-content-center align-items-center">
              <b-spinner small />
              <span class="ml-1">Processing ...</span>
            </div>
          </b-button>

          <b-button
            v-else
            variant="primary"
            class="next-btn"
            @click="store"
          >
            {{
              checkClientID($store.state.clientCampaign.campaign.user_uuid)
            }}</b-button
          >
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
  BSpinner,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
import { debounce } from "@/commonFunction/helpers.js";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";

export default {
  directives: {
    Ripple,
  },
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
    vSelect,
    BSpinner,
  },

  mixins: [toastAlert],
  data() {
    return {
      selectedClient: {},
      client: {
        name: "",
        email: "",
        phone_no: "",
        title: "",
        user_uuid: "",
      },
      isDisabled: false,
    };
  },
  watch: {
    "$store.state.clientCampaign.userUuid": function (newValue) {
      if (!newValue) {
        this.resetClientValues();
      }
    },
  },
  computed: {
    userList() {
      return this.$store.getters["clientCampaign/userList"];
    },
  },
  methods: {
    checkClientID(id) {
      if (id === null || id === "") {
        return "Save";
      } else {
        return "Update";
      }
    },
    returnToPreviousStep() {
      this.$store.dispatch("clientCampaign/getServices");
      this.$store.commit("clientCampaign/UPDATE_STEP", 2);
    },
    store() {
      this.$refs.stepOneForm.validate().then((success) => {
        if (success) {
          if (
            this.$store.state.clientCampaign.campaign.user_uuid !=
            this.$store.state.clientCampaign.userUuid
          ) {
            this.isDisabled = true;

            const params = {
              campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
              user_uuid: this.$store.state.clientCampaign.userUuid,
              name: this.client.name,
              email: this.client.email,
              phone_no: this.client.phone_no,
              title: this.client.title,
              step: 3,
            };
            this.$store
              .dispatch("clientCampaign/storeCampaignClient", params)
              .then((response) => {
                const { data } = response;
                if (data.status) {
                  this.conditionalToast(
                    "success",
                    "Success",
                    data.message,
                    "success"
                  );

                  this.$store.dispatch("clientCampaign/getCampaign");
                } else {
                  this.conditionalToast(
                    "danger",
                    "Error",
                    data.message,
                    "error"
                  );
                }
              })
              .catch((error) => {
                console.log(error.response.data.errors);
                // this.$refs.stepOneForm.setErrors(error.response.data.errors)
              })
              .finally(() => {
                this.isDisabled = false;
              });
          } else {
            /* this.conditionalToast(
              "danger",
              "Error",
              "Client Already Exist.",
              "error"
            ); */
          }
        }
      });
    },
    asssignUserDetail() {
      const user = this.$store.state.clientCampaign.userDetail?.user;
      if (user) {
        this.client.name = user.name;
        this.client.email = user.email;
        this.client.phone_no = user.phone_no;
        this.client.title = user.first_name;
      }
    },

    searchUser: debounce(function (event) {
      this.$store.dispatch("clientCampaign/searchUser", {
        q: event,
      });
    }, 500),

    selectedUser(event) {
      this.$store.commit("clientCampaign/UPDATE_USER_UUID", event);
      this.$store.dispatch("clientCampaign/getClientDetail").then(() => {
        this.asssignUserDetail();
        this.$store.dispatch("clientCampaign/getCountries");
      });
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;

      if (campaign) {
        const { name, email, phone_no, title, user_uuid } = campaign;
        this.selectedClient = user_uuid;
        this.client.name = name;
        this.client.email = email;
        this.client.phone_no = phone_no;
        this.client.title = title;
      }
    },
    resetClientValues() {
      this.client.name = "";
      this.client.email = "";
      this.client.phone_no = "";
      this.client.title = "";
      this.client.user_uuid = "";
    },
  },

  created() {
    this.assignCampaignDetail();
    this.$store.dispatch("clientCampaign/searchUser", {
      q: "",
    });
    this.$store.dispatch("clientCampaign/getClientDetail");
  },
};
</script>

<style></style>
