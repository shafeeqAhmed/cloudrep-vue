<template>
    <div class="py-2">
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
                      id="courseImage"
                      @change="handleImageSelected"
                      accept=".csv"
                      plain
                      :hidden="true"
                    />
                    <div @click="chooseFile('courseImage')" class="image-sub-upload-box">
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
                      <span
                        v-if="csvFile"
                        class="removeIcon"
                        @click="removeImage"
                      >
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
      <span class="text-danger">{{csvUrl}}</span>
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
  } from "bootstrap-vue";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  // import useUploadImage from "@/views/pages/lms/useUploadImage";
  import useUploadCsv from "./components/useUploadCsv";
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
    methods: {
      downloadCsvFile() {
        this.$http.get("csv-file-download").then((response) => {
          // console.log(response.data.data);
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
        });
      },
      store(){
  
        this.$store.commit('clientCampaign/RESET_STATE')
  
        return this.$router.push({ name: 'created-campaign' })
      }
    },
    setup() {
      const {
        csvFile,
        // csvFileName,
        csvUrl,
        handleImageSelected,
        removeImage,
        chooseFile,
      } = useUploadCsv();
  
      return {
        csvFile,
        // csvFileName,
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