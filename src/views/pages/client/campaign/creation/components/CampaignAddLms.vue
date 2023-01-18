<template>
  <div>
    <div class="card mt-2 pt-3 pb-2 px-2">
      <div class="campaign-step-eight campaign-steps">
        <b-row v-if="!isDataLoading">
          <b-col md="12">
            <div class="d-flex justify-content-center align-items-center">
              <b-spinner small />
              <span class="ml-1">Loading...</span>
            </div>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col lg="12">
            <validation-observer
              ref="stepFiveForm"
              #default="{ errors }"
            >
              <b-form>
                <b-row>
                  <b-col
                    lg="12"
                    class="py-2"
                  >
                    <b-form-group>
                      <div class="d-flex align-items-center">
                        <b-form-checkbox
                          v-model="form.isCampaignRequired"
                          checked="true"
                          name="campaign"
                          switch
                          inline
                        >
                        </b-form-checkbox>
                        <h3 class="mr-2 m-0">
                          Add LMS Requirements to Campaign
                        </h3>
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="form.isCampaignRequired">
                  <b-col
                    lg="12"
                    md="12"
                    class="py-2"
                  >
                    <b-form-group class="mb-3">
                      <b-row>
                        <b-col
                          md="4"
                          v-if="
                            $store.state.clientCampaign.campaign
                              .campaign_rate != null
                          "
                        >
                          <b-form-checkbox
                            @change="updateCampaignLmsAgainstAgent"
                            v-model="form.agent.isActive"
                            checked="true"
                            name="agent"
                            switch
                            inline
                          >
                            <h5 class="roleCenter">Agent</h5>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="4">
                          <b-form-checkbox
                            @change="updateCampaignLmsAgainstClient"
                            v-model="form.client.isActive"
                            checked="true"
                            name="client"
                            switch
                            inline
                          >
                            <h5 class="roleCenter">Client</h5>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="4">
                          <b-form-checkbox
                            @change="updateCampaignLmsAgainstPublisher"
                            v-model="form.publisher.isActive"
                            checked="true"
                            name="publisher"
                            switch
                            inline
                          >
                            <h5 class="roleCenter">Publisher</h5>
                          </b-form-checkbox>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <!--==================================-->
                          <!--===============Agent==============-->
                          <div
                            class="boxShadowShow mt-2"
                            v-if="form.agent.isActive"
                          >
                            <b-col lg="12">
                              <h3 class="mb-1 mt-1">Agent</h3>
                              <hr />
                              <b-row>
                                <b-col
                                  lg="6"
                                  md="12"
                                >
                                  <b-form-group class="mb-2">
                                    <label
                                      class="font-medium-1 font-weight-bold"
                                      >Course Category</label
                                    >
                                    <div class="input-gradient">
                                      <v-select
                                        v-model="form.agent.category"
                                        @input="getCourseByAgentCategory"
                                        :dir="
                                          $store.state.appConfig.isRTL
                                            ? 'rtl'
                                            : 'ltr'
                                        "
                                        :options="courseCategories"
                                        label="name"
                                        :reduce="(name) => name.value"
                                      >
                                      </v-select>
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  lg="6"
                                  md="12"
                                >
                                  <!-- {{ agentCourses }} -->
                                  <b-form-group class="mb-2">
                                    <label
                                      class="font-medium-1 font-weight-bold"
                                      >Course</label
                                    >

                                    <div class="input-gradient">
                                      <v-select
                                        v-model="form.agent.course"
                                        :dir="
                                          $store.state.appConfig.isRTL
                                            ? 'rtl'
                                            : 'ltr'
                                        "
                                        :options="agentCourses"
                                        label="title"
                                        :reduce="
                                          (title) => title.lms_course_uuid
                                        "
                                      >
                                      </v-select>
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  lg="12"
                                  md="12"
                                >
                                  <div class="d-flex justify-content-end">
                                    <b-button
                                      v-if="isUpdateAgent"
                                      variant="primary"
                                      class="next-btn"
                                      @click="updateAgentCampaign"
                                      >Update
                                    </b-button>
                                    <b-button
                                      v-else
                                      variant="primary"
                                      class="next-btn"
                                      @click="storeAgentCampaign"
                                      >Save</b-button
                                    >
                                  </div>
                                </b-col>
                              </b-row>
                            </b-col>
                          </div>
                          <!--==================================-->
                          <!--==============Client==============-->
                          <!--==================================-->
                          <div
                            class="boxShadowShow mt-2"
                            v-if="form.client.isActive"
                          >
                            <b-col lg="12">
                              <h3 class="mb-1">Client</h3>
                              <hr />
                              <b-row>
                                <b-col
                                  lg="6"
                                  md="12"
                                >
                                  <b-form-group class="mb-2">
                                    <label
                                      class="font-medium-1 font-weight-bold"
                                      >Course Category</label
                                    >
                                    <div class="input-gradient">
                                      <v-select
                                        v-model="form.client.category"
                                        :dir="
                                          $store.state.appConfig.isRTL
                                            ? 'rtl'
                                            : 'ltr'
                                        "
                                        :options="courseCategories"
                                        @input="getCourseByClientCategory"
                                        label="name"
                                        :reduce="(name) => name.value"
                                      >
                                      </v-select>
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  lg="6"
                                  md="12"
                                >
                                  <!-- {{clientCourses}} -->
                                  <b-form-group class="mb-2">
                                    <label
                                      class="font-medium-1 font-weight-bold"
                                      >Course</label
                                    >
                                    <div class="input-gradient">
                                      <v-select
                                        v-model="form.client.course"
                                        :dir="
                                          $store.state.appConfig.isRTL
                                            ? 'rtl'
                                            : 'ltr'
                                        "
                                        :options="clientCourses"
                                        label="title"
                                        :reduce="
                                          (title) => title.lms_course_uuid
                                        "
                                      >
                                      </v-select>
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  lg="12"
                                  md="12"
                                >
                                  <div class="d-flex justify-content-end">
                                    <b-button
                                      v-if="isUpdateClient"
                                      variant="primary"
                                      @click="updateClientCampaign"
                                      >Update
                                    </b-button>
                                    <b-button
                                      v-else
                                      variant="primary"
                                      @click="storeClientCampaign"
                                      >Save</b-button
                                    >
                                  </div>
                                </b-col>
                              </b-row>
                            </b-col>
                          </div>
                          <!--==================================-->
                          <!--=============Publisher============-->
                          <!--==================================-->
                          <div
                            class="boxShadowShow mt-2"
                            v-if="form.publisher.isActive"
                          >
                            <b-col lg="12">
                              <h3 class="mb-1">Publisher</h3>
                              <hr />
                              <b-row>
                                <b-col
                                  lg="6"
                                  md="12"
                                >
                                  <b-form-group class="mb-2">
                                    <label
                                      class="font-medium-1 font-weight-bold"
                                      >Course Category</label
                                    >
                                    <div class="input-gradient">
                                      <v-select
                                        v-model="form.publisher.category"
                                        :dir="
                                          $store.state.appConfig.isRTL
                                            ? 'rtl'
                                            : 'ltr'
                                        "
                                        :options="courseCategories"
                                        @input="getCourseByPublisherCategory"
                                        label="name"
                                        :reduce="(name) => name.value"
                                      >
                                      </v-select>
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  lg="6"
                                  md="12"
                                >
                                  <b-form-group class="mb-2">
                                    <label
                                      class="font-medium-1 font-weight-bold"
                                      >Course</label
                                    >
                                    <!-- {{publisherCourses}} -->
                                    <div class="input-gradient">
                                      <v-select
                                        v-model="form.publisher.course"
                                        :dir="
                                          $store.state.appConfig.isRTL
                                            ? 'rtl'
                                            : 'ltr'
                                        "
                                        :options="publisherCourses"
                                        label="title"
                                        :reduce="
                                          (title) => title.lms_course_uuid
                                        "
                                      >
                                      </v-select>
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  lg="12"
                                  md="12"
                                >
                                  <div class="d-flex justify-content-end">
                                    <b-button
                                      v-if="isUpdatePublisher"
                                      variant="primary"
                                      @click="updatePublisherCampaign"
                                    >
                                      Update
                                    </b-button>
                                    <b-button
                                      v-else
                                      variant="primary"
                                      @click="storePublisherCampaign"
                                      >Save</b-button
                                    >
                                  </div>
                                </b-col>
                              </b-row>
                            </b-col>
                          </div>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </b-col>
        </b-row>
      </div>
      <!-- <div class="campaign-pagination mt-2">
        <div class="text-right">
          <b-button class="back-btn" @click="redirectBack">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L1 5M1 5L5 9M1 5L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Back
          </b-button>
          <b-button variant="primary" class="next-btn" @click="redirectTo">
            Next
          </b-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
  BDropdown,
  BDropdownItem,
  BForm,
  BFormSelect,
  BCard,
  BFormCheckbox,
  BImg,
  BSpinner,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";

export default {
  name: "StepSeven",
  components: {
    vSelect,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BDropdown,
    BDropdownItem,
    BForm,
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
    BCard,
    BFormCheckbox,
    BImg,
    BSpinner,
  },
  mixins: [toastAlert],
  data() {
    return {
      form: {
        isCampaignRequired: false,
        agent: {
          isActive: false,
          category: "",
          course: "",
        },
        client: {
          isActive: false,
          category: "",
          course: "",
        },
        publisher: {
          isActive: false,
          category: "",
          course: "",
        },
        // publisher: false,
        // client: false,
      },
      courseCategories: [],
      courses: [],
      agentCourses: [],
      clientCourses: [],
      publisherCourses: [],
      isUpdateAgent: false,
      isUpdateClient: false,
      isUpdatePublisher: false,
      agentUuid: "",
      clientUuid: "",
      publisherUuid: "",
      isDataLoading: false,
      isAgentUpdate: 0,
      isClientUpdate: 0,
      isPublisherUpdate: 0,
    };
  },
  watch: {
    "form.agent.category": function (newVal, oldValue) {
      if (newVal) {
        //Fetch Course aginst category id

        this.getCourseByAgentCategory(newVal);
      }
    },
    "form.client.category": function (newVal, oldValue) {
      if (newVal) {
        //Fetch Course aginst category id
        this.getCourseByClientCategory(newVal);
      }
    },
    "form.publisher.category": function (newVal, oldValue) {
      if (newVal) {
        //Fetch Course aginst category id
        this.getCourseByPublisherCategory(newVal);
      }
    },
    $data: {
      handler: function (newValue) {
        if (newValue.form.agent.category === null) {
          this.form.agent.course = null;
        }
        if (newValue.form.client.category === null) {
          this.form.client.course = null;
        }
        if (newValue.form.publisher.category === null) {
          this.form.publisher.course = null;
        }
      },
      deep: true,
    },
  },
  methods: {
    fetchCategoryList() {
      this.isDataLoading = false;
      this.$http
        .get("get-course-category-dropdown")
        .then((response) => {
          const {
            data: {
              data: { categories },
            },
          } = response;
          this.courseCategories = categories;
        })
        .catch((error) => {})
        .finally(() => {
          this.isDataLoading = true;
        });
    },

    getCourseByAgentCategory(event) {
      this.showLoader();
      this.$http
        .get(`get-course-by-category/${event}`)
        .then((response) => {
          const {
            data: {
              data: { courses },
            },
          } = response;
          this.agentCourses = courses;

          if (this.isAgentUpdate == 1) {
            setTimeout(() => {
              this.$store.state.clientCampaign.campaign.campaign_lms.map(
                (data) => {
                  if (data.type == "agent") {
                    this.form.agent.course = data.course.lms_course_uuid;
                    this.isAgentUpdate = 0;
                  }
                }
              );
            }, 1200);
          } else {
            this.form.agent.course = null;
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.hideLoader();
        });
    },
    getCourseByClientCategory(event) {
      this.showLoader();
      this.$http
        .get(`get-course-by-category/${event}`)
        .then((response) => {
          const {
            data: {
              data: { courses },
            },
          } = response;
          this.clientCourses = courses;

          if (this.isClientUpdate == 1) {
            setTimeout(() => {
              this.$store.state.clientCampaign.campaign.campaign_lms.map(
                (data) => {
                  if (data.type == "client") {
                    this.form.client.course = data.course.lms_course_uuid;
                    this.isClientUpdate = 0;
                  }
                }
              );
            }, 1200);
          } else {
            this.form.client.course = null;
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.hideLoader();
        });
    },
    getCourseByPublisherCategory(event) {
      this.showLoader();
      this.$http
        .get(`get-course-by-category/${event}`)
        .then((response) => {
          const {
            data: {
              data: { courses },
            },
          } = response;
          this.publisherCourses = courses;

          if (this.isPublisherUpdate == 1) {
            setTimeout(() => {
              this.$store.state.clientCampaign.campaign.campaign_lms.map(
                (data) => {
                  if (data.type == "publisher") {
                    this.form.publisher.course = data.course.lms_course_uuid;
                    this.isPublisherUpdate = 0;
                  }
                }
              );
            }, 1200);
          } else {
            this.form.publisher.course = null;
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.hideLoader();
        });
    },
    fetchCampaignLmsRecordAgent() {
      this.isDataLoading = false;
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      this.$http
        .get(`campaign-lms/${campaign_id}${"?type=agent"}`)
        .then((response) => {
          const {
            data: {
              data: { campaign_lms },
            },
          } = response;

          if (campaign_lms) {
            this.form.isCampaignRequired = true;

            this.courseCategories.forEach((element) => {
              if (element.value == campaign_lms.lms_category_uuid) {
                this.form.agent.category = element.value;
              }
            });

            this.form.agent.isActive = true;
            this.isUpdateAgent = true;
            this.agentUuid = campaign_lms.uuid;
            this.isAgentUpdate = 1;
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.isDataLoading = true;
        });
    },
    fetchCampaignLmsRecordClient() {
      this.isDataLoading = false;
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      this.$http
        .get(`campaign-lms/${campaign_id}${"?type=client"}`)
        .then((response) => {
          const {
            data: {
              data: { campaign_lms },
            },
          } = response;
          if (campaign_lms) {
            this.form.isCampaignRequired = true;

            this.courseCategories.forEach((element) => {
              if (element.value == campaign_lms.lms_category_uuid) {
                this.form.client.category = element.value;
              }
            });

            this.form.client.isActive = true;
            this.isUpdateClient = true;
            this.clientUuid = campaign_lms.uuid;
            this.isClientUpdate = 1;
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.isDataLoading = true;
        });
    },
    fetchCampaignLmsRecordPublisher() {
      this.isDataLoading = false;
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      this.$http
        .get(`campaign-lms/${campaign_id}${"?type=publisher"}`)
        .then((response) => {
          const {
            data: {
              data: { campaign_lms },
            },
          } = response;
          if (campaign_lms) {
            this.form.isCampaignRequired = true;

            this.courseCategories.forEach((element) => {
              if (element.value == campaign_lms.lms_category_uuid) {
                this.form.publisher.category = element.value;
              }
            });

            this.form.publisher.isActive = true;
            this.isUpdatePublisher = true;
            this.publisherUuid = campaign_lms.uuid;
            this.isPublisherUpdate = 1;
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.isDataLoading = true;
        });
    },
    storeAgentCampaign() {
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      if (
        this.form.agent.isActive === true &&
        this.form.agent.category &&
        this.form.agent.course
      ) {
        this.showLoader();
        this.$http
          .post("campaign-lms", {
            type: "agent",
            campaign_id: campaign_id,
            category_id: this.form.agent.category,
            course_id: this.form.agent.course,
            step: 10,
          })
          .then((response) => {
            this.fetchRecords();
            this.conditionalToast(
              "success",
              "Success",
              "Campaign LMS Added Successfully!",
              "success"
            );
            this.$store.dispatch("clientCampaign/getCampaign");
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      } else if (
        this.form.agent.isActive === true &&
        !this.form.agent.category
      ) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course category againts agent!",
          "error"
        );
      } else if (this.form.agent.category && !this.form.agent.course) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course againts Course category!",
          "error"
        );
      }
    },
    storeClientCampaign() {
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      if (
        this.form.client.isActive === true &&
        this.form.client.category &&
        this.form.client.course
      ) {
        this.showLoader();
        this.$http
          .post("campaign-lms", {
            type: "client",
            campaign_id: campaign_id,
            category_id: this.form.client.category,
            course_id: this.form.client.course,
            step: 10,
          })
          .then((response) => {
            // this.fetchCampaignLmsRecordClient();
            this.fetchRecords();
            this.$store.dispatch("clientCampaign/getCampaign");
            this.conditionalToast(
              "success",
              "Success",
              "Campaign LMS Added Successfully!",
              "success"
            );
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      } else if (
        this.form.client.isActive === true &&
        !this.form.client.category
      ) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course category againts client!",
          "error"
        );
      } else if (this.form.client.category && !this.form.client.course) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course againts Course category!",
          "error"
        );
      }
    },
    storePublisherCampaign() {
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      if (
        this.form.publisher.isActive === true &&
        this.form.publisher.category &&
        this.form.publisher.course
      ) {
        this.showLoader();
        this.$http
          .post("campaign-lms", {
            type: "publisher",
            campaign_id: campaign_id,
            category_id: this.form.publisher.category,
            course_id: this.form.publisher.course,
            step: 10,
          })
          .then((response) => {
            // this.fetchCampaignLmsRecordPublisher();
            this.fetchRecords();
            this.$store.dispatch("clientCampaign/getCampaign");
            this.conditionalToast(
              "success",
              "Success",
              "Campaign LMS Added Successfully!",
              "success"
            );
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      } else if (
        this.form.publisher.isActive === true &&
        !this.form.publisher.category
      ) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course category againts publisher!",
          "error"
        );
      } else if (this.form.publisher.category && !this.form.publisher.course) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course againts Course category!",
          "error"
        );
      }
    },
    //Update Record
    updateAgentCampaign() {
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      if (
        this.form.agent.isActive === true &&
        this.form.agent.category &&
        this.form.agent.course
      ) {
        this.showLoader();
        this.$http
          .put(`campaign-lms/${this.agentUuid}`, {
            type: "agent",
            campaign_id: campaign_id,
            category_id: this.form.agent.category,
            course_id: this.form.agent.course,
          })
          .then((response) => {
            this.fetchRecords();
            this.$store.dispatch("clientCampaign/getCampaign");
            this.conditionalToast(
              "success",
              "Success",
              "Campaign LMS Added Successfully!",
              "success"
            );
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      } else if (
        this.form.agent.isActive === true &&
        !this.form.agent.category
      ) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course category againts agent!",
          "error"
        );
      } else if (this.form.agent.category && !this.form.agent.course) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course againts Course category!",
          "error"
        );
      }
    },
    updateClientCampaign() {
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      if (
        this.form.client.isActive === true &&
        this.form.client.category &&
        this.form.client.course
      ) {
        this.showLoader();
        this.$http
          .put(`campaign-lms/${this.clientUuid}`, {
            type: "client",
            campaign_id: campaign_id,
            category_id: this.form.client.category,
            course_id: this.form.client.course,
          })
          .then((response) => {
            // this.fetchCampaignLmsRecordClient();
            this.fetchRecords();
            this.$store.dispatch("clientCampaign/getCampaign");
            this.conditionalToast(
              "success",
              "Success",
              "Campaign LMS Added Successfully!",
              "success"
            );
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      } else if (
        this.form.client.isActive === true &&
        !this.form.client.category
      ) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course category againts client!",
          "error"
        );
      } else if (this.form.client.category && !this.form.client.course) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course againts Course category!",
          "error"
        );
      }
    },
    updatePublisherCampaign() {
      const campaign_id = this.$store.state.clientCampaign.campaignUuid;
      if (
        this.form.publisher.isActive === true &&
        this.form.publisher.category &&
        this.form.publisher.course
      ) {
        this.showLoader();
        this.$http
          .put(`campaign-lms/${this.publisherUuid}`, {
            type: "publisher",
            campaign_id: campaign_id,
            category_id: this.form.publisher.category,
            course_id: this.form.publisher.course,
          })
          .then((response) => {
            // this.fetchCampaignLmsRecordPublisher();
            this.fetchRecords();
            this.$store.dispatch("clientCampaign/getCampaign");
            this.conditionalToast(
              "success",
              "Success",
              "Campaign LMS Added Successfully!",
              "success"
            );
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      } else if (
        this.form.publisher.isActive === true &&
        !this.form.publisher.category
      ) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course category againts publisher!",
          "error"
        );
      } else if (this.form.publisher.category && !this.form.publisher.course) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select course againts Course category!",
          "error"
        );
      }
    },
    redirectTo() {
      if (this.form.isCampaignRequired === true) {
        if (
          this.form.client.isActive === true ||
          this.form.agent.isActive === true ||
          this.form.publisher.isActive === true
        ) {
          if (
            this.form.client.isActive === true &&
            !this.form.client.category
          ) {
            this.conditionalToast(
              "danger",
              "Error",
              "Please select course category againts client!",
              "error"
            );
          } else if (this.form.client.category && !this.form.client.course) {
            this.conditionalToast(
              "danger",
              "Error",
              "Please select course againts client!",
              "error"
            );
          } else if (
            this.form.agent.isActive === true &&
            !this.form.agent.category
          ) {
            this.conditionalToast(
              "danger",
              "Error",
              "Please select course category againts agent!",
              "error"
            );
          } else if (this.form.agent.category && !this.form.agent.course) {
            this.conditionalToast(
              "danger",
              "Error",
              "Please select course againts agent!",
              "error"
            );
          } else if (
            this.form.publisher.isActive === true &&
            !this.form.publisher.category
          ) {
            this.conditionalToast(
              "danger",
              "Error",
              "Please select course category againts publisher!",
              "error"
            );
          } else if (
            this.form.publisher.category &&
            !this.form.publisher.course
          ) {
            this.conditionalToast(
              "danger",
              "Error",
              "Please select course againts publisher!",
              "error"
            );
          } else {
            this.redirectForward();
          }
        } else {
          this.redirectForward();
        }
      } else {
        this.redirectForward();
      }
    },
    redirectForward() {
      if (this.$store.state.clientCampaign.campaign.campaign_rate != null) {
        this.$store.commit("clientCampaign/UPDATE_STEP", 11);
      } else {
        this.$store.commit("clientCampaign/UPDATE_STEP", 12);
      }
    },
    redirectBack() {
      this.$store.commit("clientCampaign/UPDATE_STEP", 9);
    },
    fetchRecords() {
      this.fetchCampaignLmsRecordAgent();
      this.fetchCampaignLmsRecordClient();
      this.fetchCampaignLmsRecordPublisher();
    },
    updateCampaignLmsAgainstAgent() {
      if (!this.form.agent.isActive) {
        const campaign_uuid = this.$store.state.clientCampaign.campaignUuid;
        this.showLoader();
        this.$http
          .delete(`campaign-lms/${this.agentUuid}`)
          .then((response) => {
            this.fetchRecords();
            this.form.agent.course = null;
            this.form.agent.category = null;
            this.$store.dispatch("clientCampaign/getCampaign");
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      }
    },
    updateCampaignLmsAgainstClient() {
      if (!this.form.client.isActive) {
        this.showLoader();
        this.$http
          .delete(`campaign-lms/${this.clientUuid}`)
          .then((response) => {
            this.fetchRecords();
            this.form.client.course = null;
            this.form.client.category = null;
            this.$store.dispatch("clientCampaign/getCampaign");
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      }
    },
    updateCampaignLmsAgainstPublisher() {
      if (!this.form.publisher.isActive) {
        this.showLoader();
        this.$http
          .delete(`campaign-lms/${this.publisherUuid}`)
          .then((response) => {
            this.fetchRecords();
            this.form.publisher.course = null;
            this.form.publisher.category = null;
            this.$store.dispatch("clientCampaign/getCampaign");
          })
          .catch((error) => {})
          .finally(() => {
            this.hideLoader();
          });
      }
    },
  },
  created() {
    this.fetchCategoryList();
    this.fetchRecords();
  },
};
</script>
