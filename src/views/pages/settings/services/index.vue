<template>
  <div class="card p-2">
    <b-row>
        <b-col md="12">
            <b-row>
              <b-col cols="12" class="mb-2">
                <h2>Create New Service</h2>
              </b-col>
              <b-col sm="6">
                <div class="input-gradient">
                  <b-form-input type="text" v-model="name" placeholder="Enter service name"></b-form-input>
                </div>
              </b-col>
              <b-col sm="6">
                <div class="input-gradient">
                  <v-select placeholder="Select Service Type" v-model="type" :reduce="value => value.key" :options="types" label="value"></v-select>
                </div>
              </b-col>
            </b-row>
        </b-col>
        
    </b-row>
    <b-row class="mt-2">
      <b-col md="6">
          <ImageUpload :preveiwImage="icon" title="Service Icon" courseImage="icon" />
        </b-col>
        <b-col md="6">
          <ImageUpload :preveiwImage="image" title="Service Image" courseImage="image" />
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col md="12">
            <b-button variant="primary" @click="store">Save</b-button>
        </b-col>
    </b-row>
  </div>
</template>
  
  <script>
import {
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCardText,
  BCardTitle,
  BCard,
  BForm,
  BFormFile,
  BBadge,
  BSpinner,
} from "bootstrap-vue";
import { toastAlert } from "@core/mixins/ui/toast";
// import useUploadImage from "./useUploadImage";
import ImageUpload from "./components/ImageUpload.vue"
import vSelect from "vue-select";
import useStore from "./useStore";
export default {
  components: {
    ImageUpload,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardText,
    BCardTitle,
    BCard,
    BForm,
    BFormFile,
    BBadge,
    BSpinner,
    vSelect
  },
  mixins: [toastAlert],

  data() {
    return {
      name: '',
      icon: '',
      image: '',
      type: '',
      types: [
        {key: 'client', value:'Client'},
        {key: 'agent', value:'Agent'},
        {key: 'publisher', value:'Publisher'},
        {key: 'all', value:'All'},
      ]
    };
  },
  methods: {
    store: function(){
        this.icon = this.$store.state.services.iconUrl
        this.image = this.$store.state.services.imageUrl
        if(this.icon && this.image && this.name && this.type){
            this.showLoader()
            const data = {
                icon: this.icon,
                image: this.image,
                name: this.name,
                type: this.type
            }
            this.$store.dispatch('services/storeService', data)
            .then(response => {
              this.successToast('Success', 'Service created successfully!')
                this.icon = ''
                this.image = ''
                this.name = ''
                this.type = ''
            })
            .catch((error) => {
              this.errorToast('Error', 'something is wrong')  
            })
            .finally(()=>{
                this.hideLoader()
            })
        }else{
            if(!this.name){
                this.errorToast('Error', 'Please enter servcie name!')
            }
            if(!this.type){
                this.errorToast('Error', 'Please select servcie type!')
            }
            if(!this.icon){
                this.errorToast('Error', 'Upload Icon First!')
            }
            if(!this.image){
                this.errorToast('Error', 'Upload Image First!')
            }
        }
    }
  },
  created() {
    const APP_STORE_MODULE_NAME = "services";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, useStore);
    }
  },

  destroyed() {
    // UnRegister on leave
    const APP_STORE_MODULE_NAME = "services";
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};
</script>