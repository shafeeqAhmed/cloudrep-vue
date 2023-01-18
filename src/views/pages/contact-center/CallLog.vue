<template>
    <div>
      <!---=====================-->
      <!---=====================-->
      <div class="contact-center-header mt-1 mb-4">
          <div class="cont-center-heading">
              <h1>Call Logs</h1>
          </div>
      </div>
      <!---=====================-->
      <!---=====================-->
      <div class="co-center call-logs pb-4">
        <b-row>
            <b-col>
                <div class="rank-all-box">
                    <table id="my-table" class="table">
                        <thead :per-page="perPage" :current-page="currentPage">
                            <tr>
                            <th scope="col"><div class="d-flex align-items-center">Agent Name<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Agent Number<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Type<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Duration<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Customer Number<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Created At<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            <th scope="col"><div class="d-flex align-items-center">Recording<feather-icon icon="ChevronDownIcon" size="21"/></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td>(629) 555-0129</td>
                                <td>Incoming</td>
                                <td>00:01:26</td>
                                <td>(629) 555-0129</td>
                                <td>2022-06-24 17:29:15</td>
                                <td><div class="d-flex align-items-center"><feather-icon icon="PlayIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td>(629) 555-0129</td>
                                <td>Incoming</td>
                                <td>00:01:26</td>
                                <td>(629) 555-0129</td>
                                <td>2022-06-24 17:29:15</td>
                                <td><div class="d-flex align-items-center"><feather-icon icon="PlayIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td>(629) 555-0129</td>
                                <td>Incoming</td>
                                <td>00:01:26</td>
                                <td>(629) 555-0129</td>
                                <td>2022-06-24 17:29:15</td>
                                <td><div class="d-flex align-items-center"><feather-icon icon="PlayIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td>(629) 555-0129</td>
                                <td>Incoming</td>
                                <td>00:01:26</td>
                                <td>(629) 555-0129</td>
                                <td>2022-06-24 17:29:15</td>
                                <td><div class="d-flex align-items-center"><feather-icon icon="PlayIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td>(629) 555-0129</td>
                                <td>Incoming</td>
                                <td>00:01:26</td>
                                <td>(629) 555-0129</td>
                                <td>2022-06-24 17:29:15</td>
                                <td><div class="d-flex align-items-center"><feather-icon icon="PlayIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td>(629) 555-0129</td>
                                <td>Incoming</td>
                                <td>00:01:26</td>
                                <td>(629) 555-0129</td>
                                <td>2022-06-24 17:29:15</td>
                                <td><div class="d-flex align-items-center"><feather-icon icon="PlayIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>  
                            <tr>
                                <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td>(629) 555-0129</td>
                                <td>Incoming</td>
                                <td>00:01:26</td>
                                <td>(629) 555-0129</td>
                                <td>2022-06-24 17:29:15</td>
                                <td><div class="d-flex align-items-center"><feather-icon icon="PlayIcon" size="21"/><feather-icon icon="DownloadIcon" size="21"/></div></td>
                            </tr>                         
                        </tbody>
                    </table>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col class="call-log-pagination">
                <b-pagination
                    v-model="currentPage"
                    :per-page="perPage"
                    aria-controls="my-table"
                    >
                </b-pagination>
            </b-col>
        </b-row>
      </div>
    </div>
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
    BPagination,
  } from "bootstrap-vue";
  import vSelect from "vue-select";
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
      vSelect,
      BPagination,
    },
    data() {
      return {
            options1: [
                "1",
                "2"
            ],
            options2: [
                "1",
                "2",
            ],
            options3: [
                "1",
                "2",
            ],
            currentPage: 1,
            perPage: 3,
      };
    },
  }
  </script>
  
  <style>
  
  </style>