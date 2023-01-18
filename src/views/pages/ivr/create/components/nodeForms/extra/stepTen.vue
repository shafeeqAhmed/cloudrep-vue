<template>
<div class="ivr-builder d-flex align-items-start">
  <div class="ivr-build-left">
      <div class="w-100">
        <div class="ivr-builder-header">
        <ivrheader />
        </div>
        <div class="ivr-box-build">
          <b-row class="p-3">
            <b-col md="6">
              <b-row class="singleIvrNode">
                <b-col
                  md="12"
                  class="
                    d-flex
                    justify-content-between
                    align-items-center
                    my-1
                    px-2
                    py-1
                  "
                >
                <div class="d-flex align-items-center">
                  <h4>Router</h4>
                  <div class="ivr-note-box">
                      2
                  </div>
                </div>
                <div>
                  <span class="accordian-btn" v-b-toggle.ivr-collapse>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.131 7.36922C13.189 7.42572 13.437 7.63906 13.641 7.8378C14.924 9.00292 17.024 12.0424 17.665 13.6332C17.768 13.8748 17.986 14.4856 18 14.812C18 15.1247 17.928 15.4228 17.782 15.7073C17.578 16.0619 17.257 16.3463 16.878 16.5022C16.615 16.6025 15.828 16.7584 15.814 16.7584C14.953 16.9143 13.554 17 12.008 17C10.535 17 9.193 16.9143 8.319 16.7867C8.305 16.772 7.327 16.6162 6.992 16.4457C6.38 16.133 6 15.5222 6 14.8685V14.812C6.015 14.3863 6.395 13.491 6.409 13.491C7.051 11.9859 9.048 9.01656 10.375 7.82319C10.375 7.82319 10.716 7.48709 10.929 7.34096C11.235 7.11301 11.614 7 11.993 7C12.416 7 12.81 7.12762 13.131 7.36922Z" fill="white"/>
                    </svg>
                  </span>
                  <span class="IvrNodeDeleteIconArea">
                    <img
                      class="IvrNodeDeleteIcon"
                      src="@/assets/images/ivr/Delete.png"
                    />
                  </span>
                </div>
                </b-col>            
                <b-collapse id="ivr-collapse">
                  <b-col md="12" class="px-2 my-1 mb-2">
                    <div class="ivrNodeOpen">
                      <p>Add Route +</p>
                    </div>
                  </b-col>
                </b-collapse>
              </b-row>
            </b-col>
            <b-col md="6"></b-col>
          </b-row>
        </div>
      </div>
  </div>
  <div class="ivr-build-right">
    <topNodes />
  </div>
</div>

</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BCard,
  BButton,
  BCardText,
  BFormInput,
  BFormGroup,
  BFormLabel,
  BFormFile,
  BFormCheckbox,
  BFormTextarea,
  BFormTimepicker,
  BFormDatepicker,
  BTooltip,
  VBToggle,
  BCollapse
} from "bootstrap-vue";
import vSelect from "vue-select";
import topNodes from "./components/topNodes.vue";
import ivrheader from "./components/ivrheader.vue";

export default {
  components: {
    topNodes,
    ivrheader,
    BRow,
    BCol,
    BForm,
    BCard,
    BButton,
    BCardText,
    BFormInput,
    BFormGroup,
    BFormFile,
    BFormCheckbox,
    BFormTextarea,
    BFormTimepicker,
    BFormDatepicker,
    vSelect,
    BTooltip,
    VBToggle,
    BCollapse
  },
  directives: {
  'b-toggle': VBToggle
  },
  data() {
    return {
      voicemail: {
        finish_on_key: "",
        timeout: "",
        length: "",
      },
      isPlayBeepActive: false,
      isEmailActive: false,
      isMessageActive: false,
    };
  },
  methods: {
    chooseFile(fileId) {
      document.getElementById(fileId).value = null;
      document.getElementById(fileId).click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ivrStyles/_Style.scss";

</style>