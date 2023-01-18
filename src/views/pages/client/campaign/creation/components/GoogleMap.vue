<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>

      <GmapAutocomplete
        @place_changed="setPlace"
        :options="{
          fields: ['geometry', 'formatted_address', 'address_components'],
        }"
      >
      </GmapAutocomplete>
      <!-- <GmapAutocomplete
        @place_changed="setPlace"
        :options="{fields: ['geometry', 'geocoder']}">
      </GmapAutocomplete> -->
      <button @click="addMarker">Add</button>
      <!-- <b-button
        variant="primary"
        class="ml-1"
        @click="addZipCodeArray"
        >Test</b-button
      > -->
    </div>
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
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      /> -->
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.latLng"
      />
    </GmapMap>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
export default {
  name: "GoogleMap",
  components: {
    BButton,
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
    };
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        console.log(this.markers);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    addZipCodeArray: function () {
      const zipcode = { lat: 31.52037, lng: 74.358749 };
      this.getReverseGeocodingData(zipcode.lat, zipcode.lng);
    },
    getReverseGeocodingData(lat, lng) {
      var latlng = new google.maps.LatLng(lat, lng);
      // This is making the Geocode request
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng: latlng }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
          var address = results[0].formatted_address;
        }
      });
    },
  },
};
</script>
