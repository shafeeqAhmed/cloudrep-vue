<template>
  <div class="offer-wall-sc">
    <div class="upp-header">
        <div class="upp-img">
            <b-img class="w-100" src="@/assets/images/logo/upp-img.png" ></b-img>
        </div>
        <div class="upp-heading">
          <h1 v-if="user.role == 'admin'"> Offer Wall</h1>
          <h1 v-else>{{ this.user.role }}s Offer Wall</h1>
        </div>
    </div>
    <div class="tab-pane mt-2 active">
      <b-row class="mt-3 filters-offerwall">
        <!-- <b-col lg="2" md="6">
          <v-select :clearable="false" v-model="selectedAvailability" :options="optionsAvailability" />
        </b-col> -->
        <b-col lg="2" md="6">
          <label>Categories</label>
          <v-select :clearable="false" v-model="selectedCat" placeholder="Filter by Category" :options="categories" label="name" :reduce="category => category.uuid" />
        </b-col>
        <b-col lg="2" md="6">
          <label>Verticals</label>
          <v-select :clearable="false" v-model="selectedVertical" placeholder="Filter by Vertical" :options="verticals" label="name" :reduce="vertical => vertical.uuid" />
        </b-col>
        <b-col lg="2" md="6">
          <label>Languages</label>
          <v-select :clearable="false" v-model="selectedLanguage" placeholder="Filter by Language" :options="optionsLanguages" />
        </b-col>
      </b-row>
      <div class="mt-3">
        <div class="tab-pane card offer-card offerwall-cards statistics-card active" v-for="campaign in campaigns" :key="campaign.uuid">
          <b-row>
            <b-col lg="3" md="3" >
              <div class="offer-listing-img">
                <img v-if="user.role == 'admin'" class="img-fluid" :src="campaign.agent_image" />
                <img v-if="user.role == 'agent'" class="img-fluid" :src="campaign.agent_image" />
                <img v-if="user.role == 'client'" class="img-fluid" :src="campaign.client_image" />
                <img v-if="user.role == 'publisher'" class="img-fluid" :src="campaign.publisher_image" />
              </div>
            </b-col>
            <b-col lg="7" md="7">
              <div class="offerwallcard-cont">
                <div class="d-flex align-items-center flex-wrap mb-2">
                <div>
                  <h2>{{ campaign.campaign_name }}</h2>
                </div>
                <div class="ml-1" v-if="user.role == 'agent'">
                  <span class="hour-commision" v-if="campaign.agent_payout_setting">Per Hour ${{campaign.campaign_rate}} + {{campaign.agent_payout_setting.payout_amount}}% Comission </span>
                </div>
                <div class="ml-1" v-if="user.role == 'client'">
                  <span class="hour-commision">Per Customer ${{campaign.cost_per_call}} ( Call Length: {{campaign.client_per_call_duration}} Seconds) </span>
                </div>
                <div class="ml-1" v-if="user.role == 'publisher'">
                  <span class="hour-commision">Per Lead ${{campaign.payout_per_call}} ( Call Length: {{campaign.publisher_per_call_duration}} Seconds) </span>
                </div>
                <!-- <div class="ml-1">
                  <span class="hour-commision">Payment Terms</span>
                </div> -->
              </div>
              <p> 
                <span v-if="isTextLimited">{{ showDescWithLimit(campaign.descripiton, 500) }}</span>
                <span v-else>{{ campaign.descripiton }}</span>
                <span v-if="isTextLimited" class="moreTextBtn ml-1" @click="changeDescLimit('unlimit')">more</span>
                <span v-else class="moreTextBtn ml-1" @click="changeDescLimit('limit')">Less</span>
              </p>
              <!-- <p> {{ campaign.descripiton}} </p> -->
              <div>
                <div class="cat-commision" v-if="campaign.category">
                  Category : {{campaign.category.name}}
                </div>
                <div class="cat-commision" v-if="campaign.vertical">
                  Vertical : {{campaign.vertical.name}}
                </div>
                <div class="cat-commision" v-if="campaign.start_date">
                  Campaign Start Date : {{campaign.start_date}}
                </div>
                <div class="cat-commision" v-if="campaign.service">
                  Services : {{campaign.service.name}}
                </div>
              </div>
              </div>
            </b-col>
            <b-col lg="2" md="12" class="mt-lg-0 mt-md-2">
              <div class="offerwallcard-btn">
                <div class="mb-md-2"><b-button v-b-modal="'reg-modal' + campaign.id">Register</b-button></div>
                <div><b-button @click="detail(campaign.uuid)" class="btn-transparent">
                  More Details
                </b-button></div>
                <b-modal :id="'reg-modal' + campaign.id"
                  centered
                  size="sm"
                  ok-title="Cancel"
                  ok-only
                  modal-class="modal-cr"
                  hide-header
                  hide-footer
                >
                <div class="register-modal-offerwall text-center">
                  <b-img class="mt-2" src="@/assets/images/offerwall/congrats.png"></b-img>
                  <h2 class="mt-2 mb-1">Successfully Enrolled!</h2>
                  <p>Dear Jon Doe, You Have successfully enrolled in this campaign. All that’s left is for you to complete the course in LMS, to start earning.</p>
                  <b-button class="mt-5 mb-2">Get Started</b-button>
                </div>
                  
                </b-modal>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <b-row>
        <b-col cols="12" class="mt-1">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" size="sm"
            class="my-0" />
        </b-col>
      </b-row>
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
  BFormSelect,
  BFormGroup,
  BFormTextarea,
  BFormDatepicker,
  BFormTimepicker,
  BPagination,
  BModal,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormSelect,
    BFormInput,
    BFormTextarea,
    BFormDatepicker,
    BFormTimepicker,
    BPagination,
    flatPickr,
    vSelect,
    BModal,
  },
  mixins: [toastAlert],
  data() {
    return {
      user: {},
      campaigns: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 15,
      optionsAvailability: [
        "Availability",
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
      ],
      categories:[],
      verticals: [],
      optionsLanguages: [
        "English",
        "French",
        "Spanish",
      ],
      options2: [
        { title: "Zoom Fade", value: "zoom-fade" },
        { title: "Fade", value: "fade" },
        { title: "Fade Bottom", value: "fade-bottom" },
        { title: "Slide Fade", value: "slide-fade" },
        { title: "Zoom Out", value: "zoom-out" },
        { title: "None", value: "none" },
      ],
      selectedAvailability: "Availability",
      selectedCat:'',
      selectedVertical:"",
      selectedLanguage:"",
      isTextLimited: true,
    };
  },
  watch: {
    selectedCat(value) {
      this.getCampaigns();
    },
    selectedVertical(value) {
      this.getCampaigns();
    },
    selectedLanguage(value) {
      this.getCampaigns();
    }
  },
  methods: {
    changeDescLimit(val){
      if(val === 'unlimit'){
        this.isTextLimited = false
      }
      if(val === 'limit'){
        this.isTextLimited = true
      }
    },
    showDescWithLimit(text, count){
      return text.slice(0, count) + (text.length > count ? " ..." : "");
    },
    getCampaigns() {
      this.$http
        .get("get-campaigns-completed?category=" + this.selectedCat
        + '&vertical=' + this.selectedVertical + '&language=' + this.selectedLanguage)
        // .get("get-campaigns-completed",{ category: this.selectedCat, vertical: this.selectedVertical })
        .then((response) => {
          const { data: { data: { campaigns } } } = response

          this.campaigns = campaigns.data;
          console.log(campaigns);
          this.currentPage = campaigns.current_page
          this.totalRows = campaigns.total
          this.perPage = campaigns.per_page
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    getCategories() {
      this.$http
        .get("get-categories")
        .then((response) => {
          const { data: { data: { bussines_categories } } } = response
          this.categories = bussines_categories;
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    getVerticals() {
      this.$http
        .get("company-verticals")
        .then((response) => {
          const { data: { data: { company_verticals } } } = response
          this.verticals = company_verticals;
        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    detail(uuid) {
      // const url = `/offer-wall?${uuid}`
      this.$router.push({ name: 'offer-wall-view', params: { uuid: uuid }})
      // ="{ name: 'view-course', params: { uuid: course.lms_course_uuid } }">
    },
  },
  created() {
    this.getCampaigns();
    this.getCategories();
    this.getVerticals();
    this.user = getUserData()
  },
};

</script>

<style lang="scss" scoped>
.custom-select {
  padding-right: 2.5rem;
  background-position: 95% center;
}

.card {
  .card {
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%) !important;
  }
}

.offer-card {
  padding: 50px;
  padding-bottom: 40px;
  margin-bottom: 16px;
}
.moreTextBtn{
  font-weight: 700;
  color: #4D2AD6;
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
}
</style>
