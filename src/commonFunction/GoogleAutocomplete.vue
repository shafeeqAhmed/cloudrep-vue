<template>
  <div>
    <h2>Address {{ record.country }}</h2>
    <vue-google-autocomplete
      ref="address"
      id="map"
      classname="form-control"
      :value="selectedAddress"
      placeholder="Please type your address"
      country="us"
      v-on:placechanged="getAddressData"
    >
    </vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: { VueGoogleAutocomplete },
  props: {
    selectedAddress: "",
  },
  data: function () {
    return {
      addressData: "",
      record: {
        address: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
        position: {
          lat: "",
          lng: "",
        },
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
  },
  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
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

      var location = placeResultData.geometry.location;
      this.record.position.lat = location.lat();
      this.record.position.lng = location.lng();

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
            this.record.city = component.long_name;
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
      this.$emit("address", this.record);
    },
  },
};
</script>
