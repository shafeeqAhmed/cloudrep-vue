<template>
    <div>
        <b-row >
            <b-col md="12">
                <div >
                    <b-card-title>
                        <h3>CSV Upload</h3>
                    </b-card-title>
                    <span>Instruction about upload csv:</span>
                    <ul>
                        <li class="text-danger">Un-comment require code in api first then send request.</li>
                    </ul>
                </div>
            </b-col>
        </b-row>
        <b-row>
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
                          id="csvFile"
                          @change="handleImageSelected"
                          accept=".csv"
                          plain
                          :hidden="true"
                          />
                            <div v-if="!csvFile" @click="chooseFile('csvFile')" class="image-sub-upload-box">
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
                            <div class="d-flex justify-content-center" v-if="csvFile">
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
            </b-col>
        </b-row>
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
    BCardTitle,
  } from "bootstrap-vue";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import useUploadCsv from "../useUploadCsv";
  import { required } from "@validations";
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
      BCardTitle,
    },
    data() {
      return {
        csvUrl: "",
        filesrc: {
          title: "Sample.csv",
          src: "",
        },
      };
    },
    methods: {},
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
  </style>