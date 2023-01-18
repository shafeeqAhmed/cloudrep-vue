<template>
  <div>
    <div class="card campaign-cards cvv-upload">
      <b-row>
        <b-col md="12">
          <div class="text-center">
            <h3>
              Fill out the sample files below, upload them, and we will do the
              rest!
            </h3>
            <div
              class="
                d-flex
                justify-content-center
                align-items-center
                p-2
              "
            >
              <span class="csvDownloadBtn d-flex align-items-center" @click="downloadCsvFile()">
                <feather-icon icon="FileTextIcon" size="20" class="mr-1" />
                <p class="m-0">Download sample file</p>
              </span>
            </div>
          </div>
        </b-col>
        <b-col cols="12">
          <validation-observer ref="courseUploadFrom" #default="{ errors }">
            <div class="input-gradient image-upload-lm">
              <div class="image-upload-box">
                <b-form-group class="w-100 m-0">
                  <validation-provider
                    #default="{ errors }"
                    name="Course Image"
                    vid="course_image"
                    :state="errors.length > 0 ? false : null"
                  >
                    <b-form-file
                      id="courseImage"
                      @change="handleImageSelected"
                      accept=".csv"
                      plain
                      :hidden="true"
                    />
                    <div v-if="!csvFile && !csvUrl" @click="chooseFile('courseImage')" class="image-sub-upload-box">
                      <div class="text-center">
                        <img
                          src="@/assets/images/icons/upload-img.png"
                          class="mb-3"
                        />
                        <!-- <h2>Drag & Drop</h2>
                        <p>or click to upload</p> -->
                        <p>Click to upload</p>
                      </div>
                      <small class="text-danger mt-1">{{ errors[0] }}</small>

                    </div>
                    <div class="d-flex justify-content-center" v-if="csvFile || csvUrl">
                      <span class="mr-1">{{csvFileName}}</span>
                      <span class="removeIcon" @click="removeImage">
                        <feather-icon size="1.5x" icon="TrashIcon" />
                      </span>
                    </div>
                  </validation-provider>
                </b-form-group>
              </div>
            </div>
          </validation-observer>
          <!-- <span>tauqeer</span> -->
        </b-col>
        <b-col cols="12">
          <div  class="camp_tag mt-1">
            <div v-for="list in getCampaignLocation" :key="list.address">
              <div  v-if="list.address_type == 'csv'">
                <div class="camp_tag_b">{{ list.zipcode }}<feather-icon icon="XIcon" size="20" @click="removeZipcode(list.uuid)" class="cursor-pointer remo-tag"/></div>
              </div>
            </div>
            <div class="add_custom_tag">
              <div id="addZipcodeContainer">
                <validation-observer ref="zipcodeUpload" #default="{ errors }">
                  <validation-provider
                    #default="{ errors }"
                    rules="alpha-dash"
                    name="Zipcode"
                    >
                  <div class="input-gradient">
                        <b-form-input class="w-100" @keyup.enter="store" v-model="zipcode" :state="errors.length > 0 ? false:null" type="text" maxLength="6" placeholder="Add Zipcode"></b-form-input>
                  </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </validation-observer>
                <div class="overlay" @click="hideInput"></div>
              </div>
              <div class="add_tag_btn">
                <feather-icon id="hideInput" icon="XIcon" @click="hideInput" size="24" class="cursor-pointer ml-1 crossIcon"/>
                <feather-icon id="showInput" icon="PlusCircleIcon" @click="showInput" size="28" class=" cursor-pointer ml-1"/>
              </div>
            </div>
          </div>
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
  BButton,
  BCol,
  BFormFile,
  BFormGroup,
  BFormInput,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
// import useUploadImage from "@/views/pages/lms/useUploadImage";
import useUploadCsv from "../useUploadCsv";
import { required } from "@validations";
import { toastAlert } from "@core/mixins/ui/toast";
import axios from "axios";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    required,
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    BRow,
    BCol,
    BButton,
    BFormFile,
    BFormGroup,
    BFormInput,
  },
  mixins: [toastAlert],
  data() {
    return {
      filesrc: {
        title: "Sample.csv",
        // src: require(""),
        src: "",
        isAddActive: false,
      },
      zipcode: '',
    };
  },
  computed: {
    getCampaignLocation() {
      return this.$store.state.clientCampaign.campaign.campaign_location
    }
  },
  methods: {
    showInput(){
      document.getElementById('addZipcodeContainer').style.display = 'block';
      document.getElementById('showInput').style.display = 'none'
      document.getElementById('hideInput').style.display = 'block'
    },
    hideInput(){
      document.getElementById('addZipcodeContainer').style.display = 'none';
      document.getElementById('showInput').style.display = 'block'
      document.getElementById('hideInput').style.display = 'none'
    },
    removeZipcode(uuid){
      // console.log('clicked')
      // console.log(param)
      this.$store.dispatch('clientCampaign/deleteCampaignLocation', uuid)
    },
    downloadCsvFile() {
      this.showLoader()
      this.$http.get("csv-file-download").then((response) => {
        const {
          data: { data },
        } = response;
        if (data) {
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", 'sample.csv');
          document.body.appendChild(link);
          link.click();
        }
      })
      .catch((error)=>{console.log(error)})
      .finally(()=>{this.hideLoader()});
    },
    store(){
      if(!this.zipcode){
        this.errorToast('Error', 'Please enter Zipcode first!')
        return false
      }
      this.$refs.zipcodeUpload.validate().then((success) => {
        if (success) {
          this.showLoader()
          const param = {
            campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
            zipcode: this.zipcode,
            address_type: 'csv',
            step: 12
          };
          this.$http.post("store-campaign-single-zipcode", param)
          .then((response) => {
            console.log(response.data.status)
            if(response.data.status){
              this.$store.dispatch('clientCampaign/getCampaign')
              this.successToast('Success', 'Zipcode added successfully!')
              // this.$refs.zipcodeUpload.reset()
              this.zipcode = ''
            }
          })
          .catch((error)=>{console.log(error)})
          .finally(()=>{this.hideLoader()});
          // this.$store.commit('clientCampaign/UPDATE_STEP', 13)
        }
      });
    },
    assignCampaignDetail() {
      const { campaign } = this.$store.state.clientCampaign
      if (campaign.campaign_location?.length > 0 ) {
        this.csvFileName = campaign.campaign_location[0].file_name
        this.csvUrl = campaign.campaign_location[0].file_url
      }
    },
  },
  mounted() {
    this.assignCampaignDetail();
  },
  setup() {
    const {
      csvFile,
      csvFileName,
      csvUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
    } = useUploadCsv();


    return {
      csvFile,
      csvFileName,
      csvUrl,
      handleImageSelected,
      removeImage,
      chooseFile,
    };
  },
};
</script>

<style lang="scss" scoped>
.csvDownloadBtn {
  cursor: pointer;
  svg {
    color: #05cd99;
  }
  p {
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-decoration-line: underline;
    text-transform: capitalize;
    color: #05cd99;
  }
}
.crossIcon{
  display:none;
}
#addZipcodeContainer{
  display:none;
}
</style>