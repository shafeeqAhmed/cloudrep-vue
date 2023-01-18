<template>
    <div>
      <!---=====================-->
      <!---=====================-->
      <div class="contact-center-header mt-1 mb-4">
          <div class="cont-center-heading">
              <h1>Leaderboards</h1>
          </div>
      </div>
      <!---=====================-->
      <!---=====================-->
      <div class="co-center leaderboard-support">
          <div class="leaderboard-sort mb-3">
              <b-row>
                  <b-col sm="12">
                      <v-select class="IvrNodeVSelect" :options="options1" placeholder="Month of July"></v-select>
                      <v-select class="IvrNodeVSelect" :options="options2" placeholder="All Teams"></v-select>
                      <v-select class="IvrNodeVSelect" :options="options3" placeholder="All Channels"></v-select>
                  </b-col>
              </b-row>
          </div>
          <div class="support-rank sale-ag pb-5">
              <b-row>
                  <b-col cols="6">
                      <div class="rank-1-box">
                          <div class="rank-heading">
                              <h2>Rank 1st</h2>
                          </div>
                          <div class="first-rank mb-3">
                              <div class="rank-1-img">
                                  <b-img src="@/assets/images/contact-center/rank 1.png"></b-img>
                              </div>
                              <h2 class="mt-1 mb-1">Brooklyn Simmons</h2>
                              <h3>(316) 555-0116</h3>
                          </div>
                      </div>
                  </b-col>
                  <b-col cols="6">
                      <div class="rank-overview">
                        <div class="rank-heading">
                            <h2>Overview</h2>
                        </div>
                        <b-row>
                            <b-col cols="6">
                                <div class="overview-box">
                                    <h4>Profit Earned:</h4>
                                    <span>$3,650</span>
                                </div>
                            </b-col>
                            <b-col cols="6">
                                <div class="overview-box">
                                    <h4>Customer Satisfaction:</h4>
                                    <span>
                                        <svg class="radial-progress" data-percentage="82" viewBox="0 0 80 80">
                                            <circle class="incomplete" cx="40" cy="40" r="35"></circle>
                                            <circle class="complete" cx="40" cy="40" r="35" style="stroke-dashoffset: 39.58406743523136;"></circle>
                                            <text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">4.9</text>
                                        </svg>
                                    </span>
                                </div>
                                
                            </b-col>
                        </b-row>
                      </div>
                  </b-col>
              </b-row>
              <div class="contact-center-header mt-4 mb-4">
                    <div class="cont-center-heading">
                        <h1>Top 9</h1>
                    </div>
                </div>
                <div class="rank-all-box">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Rank #</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Closed Deals</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Profit</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2</td>
                                <td><div class="d-flex align-items-center justify-content-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td><div class="d-flex align-items-center justify-content-center clos-det">423<feather-icon class="up" icon="ChevronUpIcon" size="21"/></div></td>
                                <td>(629) 555-0129</td>
                                <td><div class="profit ">$767.50</div></td>
                                <td><div class="d-flex align-items-center justify-content-center more-ver"><feather-icon icon="MoreVerticalIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><div class="d-flex align-items-center justify-content-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td><div class="d-flex align-items-center justify-content-center clos-det">423<feather-icon class="up" icon="ChevronUpIcon" size="21"/></div></td>
                                <td>(629) 555-0129</td>
                                <td><div class="profit yellow">$767.50</div></td>
                                <td><div class="d-flex align-items-center justify-content-center more-ver"><feather-icon icon="MoreVerticalIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><div class="d-flex align-items-center justify-content-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td><div class="d-flex align-items-center justify-content-center clos-det">423<feather-icon class="down" icon="ChevronDownIcon" size="21"/></div></td>
                                <td>(629) 555-0129</td>
                                <td><div class="profit">$767.50</div></td>
                                <td><div class="d-flex align-items-center justify-content-center more-ver"><feather-icon icon="MoreVerticalIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><div class="d-flex align-items-center justify-content-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td><div class="d-flex align-items-center justify-content-center clos-det">423<feather-icon class="down" icon="ChevronDownIcon" size="21"/></div></td>
                                <td>(629) 555-0129</td>
                                <td><div class="profit">$767.50</div></td>
                                <td><div class="d-flex align-items-center justify-content-center more-ver"><feather-icon icon="MoreVerticalIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td><div class="d-flex align-items-center justify-content-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td><div class="d-flex align-items-center justify-content-center clos-det">423<feather-icon class="up" icon="ChevronUpIcon" size="21"/></div></td>
                                <td>(629) 555-0129</td>
                                <td><div class="profit yellow">$767.50</div></td>
                                <td><div class="d-flex align-items-center justify-content-center more-ver"><feather-icon icon="MoreVerticalIcon" size="21"/></div></td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td><div class="d-flex align-items-center justify-content-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                <td><div class="d-flex align-items-center justify-content-center clos-det">423<feather-icon class="down" icon="ChevronDownIcon" size="21"/></div></td>
                                <td>(629) 555-0129</td>
                                <td><div class="profit">$767.50</div></td>
                                <td><div class="d-flex align-items-center justify-content-center more-ver"><feather-icon icon="MoreVerticalIcon" size="21"/></div></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
          </div>
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
          
      };
    },
  }
  </script>
  
  <style>
  
  </style>