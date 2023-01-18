<template>
  <div>
    <div class="mt-2">
      <div class="campaign-step-eleven campaign-steps mb-5">
        <b-row class="auth-inner m-0">
          <b-col
            lg="6"
            class=""
          >
            <label
              for=""
              class="mb-1"
              >Address</label
            >
            <div class="input-gradient">
              <vue-google-autocomplete
                ref="address"
                id="map"
                classname="form-control"
                :value="selectedAddress"
                placeholder="Please type your address"
                v-on:placechanged="getAddressData"
              >
              </vue-google-autocomplete>
            </div>
            <div
              v-for="list in getCampaignLocation"
              :key="list.address"
            >
              <b-alert
                v-height-fade
                show
                dismissible
                @dismissed="removeAddress(list.uuid)"
                fade
                class="mb-1 mt-1"
                variant="primary"
                v-if="list.address_type == 'manual'"
              >
                <div class="alert-body">
                  <span>
                    {{ list.address }}
                  </span>
                  <!-- <button type="button" aria-label="Close" class="close" @click="removeAddress(list.uuid)">x</button> -->
                </div>
              </b-alert>
            </div>
          </b-col>
        </b-row>
        <!-- <google-map /> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  BRow,
  BCol,
  BFormInput,
  BButton,
  BFormGroup,
  BForm,
  BAlert,
  BImg,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { heightFade } from "@core/directives/animations";
import Ripple from "vue-ripple-directive";
import GoogleMap from "./GoogleMap.vue";

export default {
  components: {
    GoogleMap,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BForm,
    VueGoogleAutocomplete,
    BAlert,
    BImg,
  },
  directives: {
    heightFade,
    Ripple,
  },
  mixins: [toastAlert],
  data() {
    return {
      selectedAddress: "",
      addressData: "",
      addressList: [],
      record: {
        fullAddress: "",
        address: "",
        zipcode: "",
        city_town: "",
        state: "",
        country: "",
        lat: "",
        long: "",
        campaign_uuid: "",
        step: "",
        address_type: "",
      },
    };
  },
  computed: {
    fullAddress() {
      if (this.addressData) {
        return (
          this.addressData.route +
          ", " +
          this.addressData.locality +
          ", " +
          this.addressData.administrative_area_level_1 +
          ", " +
          this.addressData.country
        );
      }
      return "";
    },
    getCampaignLocation() {
      return this.$store.state.clientCampaign.campaign.campaign_location;
    },
  },
  methods: {
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function (addressData, placeResultData, id) {
      this.addressData = addressData;

      // 1. country
      // 2. administrative_area_level_1 = punjab =>state
      // 3. locality = karachi = city_town
      // 4. postalCode/zipcode =

      //
      for (const component of placeResultData.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "street_number": {
            this.record.address = `${component.long_name} ${this.record.address}`;
            break;
          }

          case "route": {
            this.record.address = component.short_name;
            break;
          }

          case "postal_code": {
            this.record.zipcode = `${component.long_name}`;
            break;
          }

          // case "postal_code_suffix": {
          //     this.record.postcode = `${this.record.postcode}-${component.long_name}`;
          //     break;
          // }

          case "locality":
            this.record.city_town = component.long_name;
            break;

          case "administrative_area_level_1": {
            this.record.state = component.short_name;
            break;
          }

          case "country":
            this.record.country = component.long_name;
            break;
        }
      }

      this.record.address = this.fullAddress;
      this.record.lat = this.addressData.latitude;
      this.record.long = this.addressData.longitude;
      this.record.campaign_uuid = this.$store.state.clientCampaign.campaignUuid;
      this.record.step = 12;
      this.record.address_type = 'manual';
      this.$store.dispatch("clientCampaign/storeCampaignLocation", this.record);
      document.getElementById("map").value = "";

      // this.addressList.push(this.record)
      // this.record = {}
      // this.selectedAddress = null
    },
    removeAddress(uuid) {
      document.getElementById("map").value = "";
      this.$store.dispatch("clientCampaign/deleteCampaignLocation", uuid);
    },
    // store() {
    //   if (Object.keys(this.getCampaignLocation).length === 0) {
    //     this.errorToast('Error', 'Please select at least one geo location')
    //   }else{
    //     this.$store.commit('clientCampaign/UPDATE_STEP', 13)
    //   }
    // }
  },
  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
  },
};
</script>
