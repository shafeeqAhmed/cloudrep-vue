<template>
    <div>
      <div class="campaign-steps mb-5">
        <b-row class="auth-inner m-0">
          <b-col cols="12" class="">
            <div class="cong-step card position-relative">
              <canvas id="anime"></canvas>
                <svg class="mt-5" width="114" height="114" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.4959 10.5304C35.063 10.1658 39.3987 8.36941 42.8854 5.39713C46.8235 2.04303 51.8273 0.200928 57.0002 0.200928C62.1731 0.200928 67.1769 2.04303 71.115 5.39713C74.6017 8.36941 78.9373 10.1658 83.5045 10.5304C88.6621 10.9426 93.5043 13.1785 97.163 16.8371C100.822 20.4958 103.057 25.338 103.47 30.4956C103.832 35.0609 105.628 39.399 108.603 42.8851C111.957 46.8232 113.799 51.8271 113.799 56.9999C113.799 62.1728 111.957 67.1766 108.603 71.1147C105.631 74.6014 103.834 78.9371 103.47 83.5042C103.057 88.6619 100.822 93.5041 97.163 97.1627C93.5043 100.821 88.6621 103.057 83.5045 103.469C78.9373 103.834 74.6017 105.63 71.115 108.603C67.1769 111.957 62.1731 113.799 57.0002 113.799C51.8273 113.799 46.8235 111.957 42.8854 108.603C39.3987 105.63 35.063 103.834 30.4959 103.469C25.3382 103.057 20.496 100.821 16.8374 97.1627C13.1787 93.5041 10.9429 88.6619 10.5307 83.5042C10.166 78.9371 8.36966 74.6014 5.39738 71.1147C2.04327 67.1766 0.201172 62.1728 0.201172 56.9999C0.201172 51.8271 2.04327 46.8232 5.39738 42.8851C8.36966 39.3984 10.166 35.0628 10.5307 30.4956C10.9429 25.338 13.1787 20.4958 16.8374 16.8371C20.496 13.1785 25.3382 10.9426 30.4959 10.5304ZM83.3199 47.8196C84.6132 46.4806 85.3288 44.6871 85.3127 42.8255C85.2965 40.9639 84.5498 39.1831 83.2334 37.8667C81.917 36.5503 80.1362 35.8036 78.2746 35.7874C76.413 35.7713 74.6196 36.4869 73.2805 37.7802L49.9002 61.1605L40.7199 51.9802C39.3808 50.6869 37.5873 49.9713 35.7257 49.9874C33.8641 50.0036 32.0834 50.7503 30.767 52.0667C29.4506 53.3831 28.7039 55.1639 28.6877 57.0255C28.6715 58.8871 29.3872 60.6806 30.6805 62.0196L44.8805 76.2196C46.2119 77.5507 48.0175 78.2984 49.9002 78.2984C51.7828 78.2984 53.5884 77.5507 54.9199 76.2196L83.3199 47.8196Z" fill="#C330CB"/>
                </svg>
                <h1 class="mt-3">Congratulations !</h1>
                <h2>Campaign has successfully created.</h2>
                <b-button class="mt-5 mb-5 position-relative" @click="store">Continue</b-button>
            </div>
          </b-col>
        </b-row>
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
    BAlert
  } from "bootstrap-vue";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import { toastAlert } from "@core/mixins/ui/toast";
  import VueGoogleAutocomplete from "vue-google-autocomplete";
  import { heightFade } from '@core/directives/animations'
  import Ripple from 'vue-ripple-directive'
  import GoogleMap from './GoogleMap.vue'

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
      BAlert
    },
    directives: {
      heightFade,
      Ripple,
    },
    mixins: [toastAlert],
    data() {
      return {
        selectedAddress: '',
        addressData: '',
        addressList: [],
        record: {
          fullAddress: '',
          address: "",
          zipcode: "",
          city_town: "",
          state: "",
          country: "",
          lat: "",
          long: "",
          campaign_uuid: "",
        }
      };
    },

    methods: {
        store() {
          this.$confetti.stop();
            return this.$router.push({ name: 'campaign-list-complete' })
        },
        start(){
        this.$confetti.start({
          canvasId: 'anime',
          particles: [
            {
              type: 'rect',
            },
            {
              type: 'circle',
            },
          ],
          defaultColors: [
            '#EF2964',
            '#00C09D',
            '#2D87B0',
            '#48485E',
            '#EFFF1D',
          ],
          particlesPerFrame: 0.75,
          defaultDropRate: 3,
          defaultSize: 3,
        });
      },
    },
    mounted(){
      this.start()
    },
  };
  </script>
<style scoped lang="scss">
.cong-step{
    padding: 20px;
    text-align: center;
    flex-direction: column;
    display: flex;
    align-content: center;
    justify-content: center;
    max-width: 600px;
    margin: auto;
    #anime{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    svg{
        width: 100%;
    }
    h1{
        font-size: 42px;
        line-height: 60px;
    }
    h2{
        font-size: 32px;
        line-height: 40px;
    }
    button{
        background: linear-gradient(224.99deg, #933FFE 0%, #741189 100%), linear-gradient(226.72deg, #4AF6E9 -3.38%, #0099FF 22.79%, #C330CB 77.37%);
        border-radius: 6px;
        padding: 16px 34px;
        color: #fff;
        width: 10rem;
        height: auto !important;
        display: flex;
        align-self: center;
        border: none !important;
        &:hover{
            box-shadow: #933FFE 0px 7px 29px 0px;
        }
    }
}
.dark-layout{
    .cong-step{
        h1{
            color: #fff;
        }
        h2{
            color: #fff;
        }
        button{
            background: linear-gradient(224.99deg, #933FFE 0%, #741189 100%), linear-gradient(226.72deg, #4AF6E9 -3.38%, #0099FF 22.79%, #C330CB 77.37%);
            color: #fff;
        }
    }
}
</style>