<template>
  <b-row>
    <b-col sm="12">
      <b-form-group>
        <label for="">Shipping Address</label>
        <div class="input-gradient">
          <google-autocomplete
            :selectedAddress="currentPlace"
            @address="address"
          />

          <br />
          <br />
          <GmapMap
            :center="center"
            :zoom="12"
            style="width: 100%; height: 400px"
            :options="{
              streetViewControl: false,
              disableDefaultUi: false,
            }"
          >
            <GmapMarker
              v-for="(marker, index) in markers"
              :key="index"
              :position="marker.position"
              @click="center = m.position"
            />
          </GmapMap>
        </div>
      </b-form-group>
    </b-col>
    <b-col sm="6">
      <b-form-group>
        <label for="">First Name</label>
        <div class="input-gradient">
          <b-form-input placeholder="First Name"></b-form-input>
        </div>
      </b-form-group>
    </b-col>
    <b-col sm="6">
      <b-form-group>
        <label for="">Last Name</label>
        <div class="input-gradient">
          <b-form-input placeholder="Last Name"></b-form-input>
        </div>
      </b-form-group>
    </b-col>
    <b-col sm="12">
      <b-form-group>
        <label for="">Shipping Notes</label>
        <div class="input-gradient">
          <b-form-textarea placeholder="Enter Note"></b-form-textarea>
        </div>
      </b-form-group>
    </b-col>
    <b-col
      sm="12"
      class="mb-5"
    >
      <b-form-checkbox
        id="checkbox-1"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        Save for next time
      </b-form-checkbox>
    </b-col>
  </b-row>
</template>
<script>
import {
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BMedia,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BImg,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BTable,
  BFormCheckbox,
  BBadge,
  BButton,
  BModal,
  BFormTextarea,
  BFormFile,
  BFormDatepicker,
} from "bootstrap-vue";
import vSelect from "vue-select";
import GoogleAutocomplete from "@/commonFunction/GoogleAutocomplete.vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardText,
    BLink,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BImg,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BTable,
    BFormCheckbox,
    BBadge,
    BButton,
    BModal,
    BFormTextarea,
    BFormFile,
    BFormDatepicker,
    vSelect,
    GoogleAutocomplete,
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
    };
  },
  methods: {
    address(event) {
      const marker = {
        lat: event.position.lat,
        lng: event.position.lng,
      };
      this.markers.push({ position: marker });
      this.center = marker;
      this.currentPlace = null;
    },
  },
};
</script>
