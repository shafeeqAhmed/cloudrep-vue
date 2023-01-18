<template>
  <div>
    <div class="card campaign-cards mt-2 pt-3 pb-2">
      <div class="campaign-fields campaign-step-five campaign-steps">
        <validation-observer
          ref="stepFiveForm"
          #default="{ invalid }"
        >
          <b-form @submit.prevent="storeSocialLinks">
            <b-row>
              <b-col
                lg="6"
                class="mb-1 px-xl-2 mx-auto cient-content"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Website Link"
                  vid="website"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >WebSite</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        placeholder="Enter WebSite URL"
                        autocomplete="off"
                        class="form-control transfer-field"
                        id="website_url"
                        v-model="stepFive.website_url"
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
                  name="Deep Link"
                  vid="deep"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold">Deep</label>
                    <div class="input-gradient">
                      <b-form-input
                        placeholder="Deep Link"
                        autocomplete="off"
                        class="form-control transfer-field"
                        id="deep"
                        v-model="stepFive.deep"
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
                  name="Blog Link"
                  vid="blog"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold">Blog</label>
                    <div class="input-gradient">
                      <b-form-input
                        placeholder="Enter Blog Link"
                        autocomplete="off"
                        class="form-control transfer-field"
                        id="blog_url"
                        v-model="stepFive.blog_url"
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
                  name="Facebook Link"
                  vid="facebook"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >Facebook/Meta</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        placeholder="Enter Facebook link"
                        autocomplete="off"
                        class="form-control transfer-field"
                        id="facebook_url"
                        v-model="stepFive.facebook_url"
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
                  name="Twitter Link"
                  vid="twitter"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >Twitter</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        placeholder="Enter Twitter Link"
                        autocomplete="off"
                        class="form-control transfer-field"
                        id="twitter_url"
                        v-model="stepFive.twitter_url"
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
                  name="LinkedIn Link"
                  vid="linkedIn"
                >
                  <b-form-group class="">
                    <label class="font-medium-1 font-weight-bold"
                      >LinkedIn</label
                    >
                    <div class="input-gradient">
                      <b-form-input
                        placeholder="Enter LinkedIn Link"
                        autocomplete="off"
                        class="form-control transfer-field"
                        id="linkedin_url"
                        v-model="stepFive.linkedin_url"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      />
                    </div>
                  </b-form-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-row>

            <div class="campaign-pagination mt-2">
              <div class="text-right">
                <b-button
                  type="submit"
                  variant="primary"
                  class="next-btn"
                >
                  Save
                </b-button>
              </div>
            </div>
          </b-form>
        </validation-observer>
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
import { required, url } from "@validations";
import {
  facebook_url,
  linked_in_url,
  twitter_url,
} from "@core/utils/validations/validations";
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
  },
  mixins: [toastAlert],
  data() {
    return {
      stepFive: {
        website: "",
        deep: "",
        blog: "",
        facebook: "",
        twitter: "",
        linkedIn: "",
      },
      facebook_url,
      twitter_url,
      linked_in_url,
    };
  },
  methods: {
    storeSocialLinks() {
      this.$refs.stepFiveForm.validate().then((success) => {
        if (success) {
          const params = {
            campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
            user_uuid: this.$store.state.clientCampaign.campaign.user_uuid,
            website_url: this.stepFive.website_url,
            deeplink: this.stepFive.deep,
            blog_url: this.stepFive.blog_url,
            facebook_url: this.stepFive.facebook_url,
            twitter_url: this.stepFive.twitter_url,
            linkedin_url: this.stepFive.linkedin_url,
            step: 7,
          };
          this.$store
            .dispatch("clientCampaign/storeCampaignSocialWebsiteLinks", params)
            .then(() => {
              this.conditionalToast(
                "success",
                "Success",
                "Social Links has been updated successfully!",
                "success"
              );
              this.$store.dispatch("clientCampaign/getCampaign");
            });
        }
      });
    },
    asssignUserDetail() {
      const { campaign } = this.$store.state.clientCampaign;
      if (campaign) {
        const {
          website_url,
          deeplink,
          blog_url,
          facebook_url,
          twitter_url,
          linkedin_url,
        } = campaign;
        this.stepFive.website_url = website_url;
        this.stepFive.deep = deeplink;
        this.stepFive.blog_url = blog_url;
        this.stepFive.facebook_url = facebook_url;
        this.stepFive.twitter_url = twitter_url;
        this.stepFive.linkedin_url = linkedin_url;
      }
    },
  },

  created() {
    this.asssignUserDetail();
  },
};
</script>
