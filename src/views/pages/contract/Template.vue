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
        
      <div class="create-contract mt-3 pb-3">
        <div class="header_title">
            <b-row class="align-items-center">
                <b-col cols="6">
                    <h2>My Template</h2>
                </b-col>
            </b-row>
        </div>
          <b-row class="mt-3">
              <b-col cols="12">
                  <div class="template-table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><div class="">Contract Name</div></th>
                                <th><div class="d-flex align-items-center justify-content-center">Template Created</div></th>
                                <th><div class="d-flex align-items-center justify-content-center">States</div></th>
                                <th><div class="d-flex align-items-center justify-content-center">Actions</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="">Contract Name Number 1</div></td>
                                <td><div class="d-flex align-items-center justify-content-center">15 May 2020 8:00 am</div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><span class="uncomplete">Uncomplete</span></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><feather-icon icon="DownloadIcon" size="20" class="mr-1"/><feather-icon icon="EditIcon" size="20" class="mr-1"/><feather-icon icon="TrashIcon" size="20" class=""/></div></td>
                            </tr>
                            <tr>
                                <td><div class="">Contract Name Number 2</div></td>
                                <td><div class="d-flex align-items-center justify-content-center">15 May 2020 8:00 am</div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><span class="complete">Complete</span></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><feather-icon icon="DownloadIcon" size="20" class="mr-1"/><feather-icon icon="EditIcon" size="20" class="mr-1"/><feather-icon icon="TrashIcon" size="20" class=""/></div></td>
                            </tr>
                            <tr>
                                <td><div class="">Contract Name Number 3</div></td>
                                <td><div class="d-flex align-items-center justify-content-center">15 May 2020 8:00 am</div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><span class="complete">Complete</span></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><feather-icon icon="DownloadIcon" size="20" class="mr-1"/><feather-icon icon="EditIcon" size="20" class="mr-1"/><feather-icon icon="TrashIcon" size="20" class=""/></div></td>
                            </tr>
                            <tr>
                                <td><div class="">Contract Name Number 4</div></td>
                                <td><div class="d-flex align-items-center justify-content-center">15 May 2020 8:00 am</div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><span class="uncomplete">Uncomplete</span></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><feather-icon icon="DownloadIcon" size="20" class="mr-1"/><feather-icon icon="EditIcon" size="20" class="mr-1"/><feather-icon icon="TrashIcon" size="20" class=""/></div></td>
                            </tr>
                            <tr>
                                <td><div class="">Contract Name Number 5</div></td>
                                <td><div class="d-flex align-items-center justify-content-center">15 May 2020 8:00 am</div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><span class="complete">Complete</span></div></td>
                                <td><div class="d-flex align-items-center justify-content-center"><feather-icon icon="DownloadIcon" size="20" class="mr-1"/><feather-icon icon="EditIcon" size="20" class="mr-1"/><feather-icon icon="TrashIcon" size="20" class=""/></div></td>
                            </tr>
                        </tbody>
                    </table>
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
  }
  </script>
  
  <style>
  
  </style>