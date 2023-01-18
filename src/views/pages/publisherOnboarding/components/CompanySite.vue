<template>
  <div class="onboarding-page">
    <b-row class="onboard-height align-items-center">
      <b-col
        lg="5"
        class="d-flex p-1 p-lg-5 p-md-5 left-text client-nav h-100 align-items-center publisher-nav"
      >
        <PublisherNav />
      </b-col>

      <b-col lg="7" class="px-5 cient-content-wrap h-100 d-flex align-items-center " >
        <div class="px-xl-2 mx-auto company-site-col client-content">
          <h2>To get started, enter the URL of your company's website.</h2>
          <div class="p-company-site mt-2">
            <p class="desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              sagittis nibh egestas tristique.
            </p>
          </div>
          <validation-observer ref="companyWebsiteForm" #default="{ errors }">
            <div class="mt-5">
              <validation-provider
                #default="{ errors }"
                name="Company Website"
                vid="company"
                rules="required|url"
              >
                <b-form-group class="mb-0 search-company">
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <feather-icon icon="SearchIcon" class="text-muted" />
                    </b-input-group-prepend>
                    <b-form-input
                      placeholder="Search..."
                      id="company"
                      v-model="company"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    />
                  </b-input-group>
                </b-form-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </div>
          </validation-observer>
          <div class="mt-1">
            <p class="font-small-3">
              It's okay if you are unsure, you can always edit it later
            </p>
          </div>

          <div class="mt-100">
            <button
              class="btn btn-primary submit-btn"
              @click="storeCompany"
              :disabled="isDisabled"
            >
              Next
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
} from "bootstrap-vue";
import PublisherNav from "./PublisherNav.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";

export default {
  components: {
    BRow,
    BCol,
    PublisherNav,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    ValidationProvider,
    ValidationObserver,
    required,
  },
  mixins: [toastAlert],
  data() {
    return {
      company: "",
      isDisabled: false,
      backgroundImg: require("@/assets/images/auth/background.png"),
    };
  },
  methods: {
    storeCompany() {
      this.$refs.companyWebsiteForm.validate().then((success) => {
        if (success) {
          this.isDisabled = true;
          this.$http
            .post("publisher-profile-items", {
              company_website: this.company,
            })
            .then((response) => {
              this.$store.dispatch("pob/myPublisherProfileItem").then(() => {});
              this.successToast(
                "Success",
                "Company Website Saved Successfully!"
              );
              this.$router.push({
                path: "/publisher/onboarding/publisher-company-site",
              });
            })
            .catch((error) => {
              this.errorToast("Error", error.response.data.message);
            })
            .finally(() => {
              this.isDisabled = false;
            });
        }
      });
    },
  },
  created() {
    this.$store.dispatch("pob/myPublisherProfileItem").then(() => {
      if (this.$store.state.pob.company_website != null) {
        this.company = this.$store.state.pob.company_website;
      }
    });
  },
};
</script>
