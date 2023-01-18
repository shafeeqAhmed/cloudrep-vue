<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-step-three campaign-steps">
        <validation-observer
          ref="stepThreeForm"
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
                    >Business Category</label
                  >
                  <div class="input-gradient">
                    <v-select
                      :searchable="true"
                      placeholder="Select Business"
                      v-model="stepThree.category"
                      @search="searchCategory($event)"
                      @input="actionOnSelectCategory"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :reduce="(category) => category.uuid"
                      :options="categories"
                      label="name"
                      class="v-sel-sty"
                    >
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
                  name="vertical"
                  vid="vertical"
                  rules="required"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >Verticals</label
                    >
                    <div class="input-gradient">
                      <v-select
                        :searchable="false"
                        id="vertical"
                        v-model="stepThree.vertical"
                        :options="verticals"
                        label="name"
                        @input="actionOnSelectVertical"
                        :reduce="(vertical) => vertical.uuid"
                        placeholder="Select Vertical"
                        class="v-sel-sty"
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
                  name="language"
                  vid="language"
                  rules="required"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >Languages</label
                    >
                    <div class="input-gradient">
                      <v-select
                        :searchable="false"
                        id="language"
                        v-model="stepThree.language"
                        :options="language"
                        label="name"
                        placeholder="Select Language"
                        class="v-sel-sty"
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
                  name="currency"
                  vid="currency"
                  rules="required"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >Currency</label
                    >

                    <div class="input-gradient">
                      <v-select
                        :searchable="true"
                        id="currency"
                        v-model="stepThree.currency"
                        :options="currencies"
                        label="label"
                        :reduce="(list) => list.currency_code"
                        placeholder="Select Currency"
                        class="v-sel-sty"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </div>
      <div class="campaign-pagination mt-2">
        <div class="text-right">
          <b-button
            variant="primary"
            class="next-btn"
            @click="store"
          >
            {{
              checkBunieesCategory(
                $store.state.clientCampaign.campaign.vertical_uuid
              )
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
} from "bootstrap-vue";

import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import vSelect from "vue-select";
import { toastAlert } from "@core/mixins/ui/toast";
import { debounce } from "@/commonFunction/helpers.js";

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
    vSelect,
  },
  mixins: [toastAlert],
  data() {
    return {
      stepThree: {
        vertical: "",
        category: "",
        language: "",
        currency: "",
      },

      currency: ["Rs", "Dollar", "Dirham", "Euro"],
      language: ["English", "French", "Spanish"],
    };
  },
  methods: {
    checkBunieesCategory(id) {
      if (id === null || id === "") {
        return "Save";
      } else {
        return "Update";
      }
    },
    store() {
      this.$refs.stepThreeForm.validate().then((success) => {
        if (success) {
          const { currency, language, category_uuid, vertical_uuid } =
            this.$store.state.clientCampaign.campaign;

          if (
            vertical_uuid === this.stepThree.vertical &&
            category_uuid === this.stepThree.category &&
            language === this.stepThree.language &&
            currency === this.stepThree.currency
          ) {
            /* this.conditionalToast(
              "danger",
              "Error",
              "Business Category Same Record Already Exist!",
              "error"
            ); */
          } else {
            const params = {
              campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
              user_uuid: this.$store.state.clientCampaign.campaign.user_uuid,
              vertical_uuid: this.stepThree.vertical,
              category_uuid: this.stepThree.category,
              language: this.stepThree.language,
              currency: this.stepThree.currency,
              step: 5,
            };
            this.$store
              .dispatch(
                "clientCampaign/storeCampaignBusinessCateVertical",
                params
              )
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
              });
          }
        }
      });
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign) {
        const { currency, language, category_uuid, vertical_uuid } = campaign;
        this.stepThree.vertical = vertical_uuid;
        this.stepThree.category = category_uuid;
        this.stepThree.language = language;
        this.stepThree.currency = currency;
      }
    },

    searchCategory: debounce(function (event) {
      this.$store.dispatch("clientCampaign/getCategories", {
        q: event,
      });
    }, 500),

    actionOnSelectCategory(event) {
      this.$store.commit("clientCampaign/UPDATE_SELECTED_CATEGORY_UUID", event);
      //this.stepThree.vertical = "";
      // this.showLoader()

      //const rec = this.$store.dispatch("clientCampaign/getVerticals");
      // if(rec){
      //   this.hideLoader()
      // }
    },
    actionOnSelectVertical(event) {
      this.$store.commit("clientCampaign/UPDATE_SELECTED_VERTICAL_UUID", event);
    },
    // actionOnSelectLanguage(event) {
    //   this.$store.commit('clientCampaign/UPDATE_LANGUAGE', event)
    // },
    // actionOnSelectCurrency(event) {
    //   this.$store.commit('clientCampaign/UPDATE_CURRENCY', event)
    // }
  },
  computed: {
    categories() {
      return this.$store.state.clientCampaign.categories;
    },
    verticals() {
      return this.$store.state.clientCampaign.verticals;
    },
    currencies() {
      return this.$store.state.clientCampaign.currencies;
    },
  },
  created() {
    //dropdown for step three
    this.$store.dispatch("clientCampaign/getCategories", { q: "" });
    const { campaign } = this.$store.state.clientCampaign;
    const { category_uuid, step } = campaign;

    if (step > 3) {
      this.$store.commit(
        "clientCampaign/UPDATE_SELECTED_CATEGORY_UUID",
        category_uuid
      );
      this.$store.dispatch("clientCampaign/getVerticals");
    }
    this.$store.dispatch("clientCampaign/getcurrencies");
    this.assignCampaignDetail();
  },
};
</script>
