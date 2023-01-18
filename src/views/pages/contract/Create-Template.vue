<template>
    <div class="contract">
      <div class="upp-header">
          <div class="upp-img">
              <b-img class="w-100" src="@/assets/images/logo/upp-img.png" ></b-img>
          </div>
          <div class="upp-heading">
              <h1>Introducing CloudRep AI The World’s <br> First Web3 Gig Economy</h1>
          </div>
      </div>
      <div class="create-template mt-3 pb-3">
        <div class="header_title">
            <b-row class="align-items-center">
                <b-col cols="12">
                    <h2>Create Template</h2>
                </b-col>
            </b-row>
        </div>
        <b-row class="mt-2" v-if="CreateTemplate == true">
            <b-col cols="12" class="mb-3">
                <div class="card p-2">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="">Template Title <span>*</span></label>
                                <div class="input-gradient">
                                    <b-form-input placeholder="Enter Template Title"></b-form-input>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="">Template Description <span>*</span></label>
                                <div class="input-gradient">
                                    <b-form-textarea placeholder="Template Description"></b-form-textarea>
                                </div>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
            <b-col cols="12" class="mb-3">
                <h2>Attach Document</h2>
            </b-col>
            <b-col cols="12" class="mb-3">
                <div class="input-gradient">
                    <div class="image-upload-box">
                        <b-form-group class="w-100 m-0">
                            <div class="image-sub-upload-box">
                                <div class="text-center">
                                    <img src="@/assets/images/icons/upload-img.png" class="mb-3" />
                                    <h2>Drop the file or click to upload.</h2>
                                    <!-- <p> or click to upload</p> -->
                                </div>
                                <span class="removeIcon">
                                    <feather-icon size="1.5x" icon="TrashIcon" />
                                </span>
                            </div>
                        </b-form-group>
                    </div>
                </div>
            </b-col>
            <b-col cols="12">
                <b-button class="secondary-btn">Save & Continue</b-button>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col cols="12">
                <div class="create-temp">
                    <b-img src="@/assets/images/logo/robot.png"></b-img>
                    <h3 class="mb-1">Resending the same Envelopes?</h3>
                    <p>Save time by saving and reusing documents, placeholder recipients, and fields.</p>
                    <b-button @click="CreateTemp()" class="secondary-btn mt-2">Create a template</b-button>
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
      BFormGroup,
      BFormInput,
      BFormTextarea,
      BFormInvalidFeedback,
      BButton,
      BImg,
      BDropdown,
      BDropdownItem,
      BForm,
      BInputGroup,
      BFormFile,
      BInputGroupPrepend,
      BFormSelect,
      BFormCheckbox
  } from "bootstrap-vue";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import vSelect from "vue-select";
  export default {
      components: {
          BRow,
          BCol,
          BFormGroup,
          BFormInput,
          BFormTextarea,
          BFormInvalidFeedback,
          BButton,
          BImg,
          BDropdown,
          BDropdownItem,
          BForm,
          BInputGroup,
          BFormFile,
          BInputGroupPrepend,
          BFormSelect,
          BFormCheckbox,
          vSelect,
          ValidationProvider,
          ValidationObserver,
      },
      data(){
        return{
            CreateTemplate : false,
        }
      },
      methods:{
        CreateTemp(){
            this.CreateTemplate = true
        },  
      }
  }
  </script>
  
  <style>
  
  </style>