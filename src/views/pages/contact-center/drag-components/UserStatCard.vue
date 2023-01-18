<template>
    <div class="ag-contcenter-cards">
        <b-card>
    <b-card-header>
        <div>
          <b-card-title>Users</b-card-title>
        </div>                
    </b-card-header>
    <b-card-body>
      <div>
        <b-row class="align-items-center">
          <b-col cols="7">
            <svg width="422" height="422" viewBox="0 0 422 422" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M363.355 211C363.355 177.219 352.128 144.396 331.439 117.691C310.75 90.9866 281.772 71.9155 249.062 63.4761C216.353 55.0367 181.765 57.7077 150.739 71.0693C119.713 84.4308 94.0069 107.725 77.6633 137.289L211 211H363.355Z" fill="#4318FF"/>
            <path d="M58.6458 211C58.6458 251.407 74.6974 290.159 103.269 318.731C131.842 347.303 170.594 363.355 211.001 363.355C251.408 363.355 290.16 347.303 318.732 318.731C347.304 290.159 363.355 251.407 363.355 211L211.001 211L58.6458 211Z" fill="#F35D5D"/>
            <path d="M116.636 330.613C132.317 342.984 150.278 352.151 169.496 357.593L211.001 211L116.636 330.613Z" fill="#782C96"/>
            <path d="M343.727 285.804C357.647 261.105 364.4 233.012 363.225 204.685L211.001 211L343.727 285.804Z" fill="#F4BF4F"/>
            <path d="M83.6884 127.311C71.9703 145.138 64.1265 165.226 60.6646 186.276C57.2028 207.326 58.2001 228.868 63.5921 249.509C68.9841 270.149 78.6505 289.426 91.9656 306.094C105.281 322.761 121.947 336.446 140.887 346.263L211 211L83.6884 127.311Z" fill="#CE60E0"/>
            </svg>
          </b-col>
          <b-col cols="5">
            <ul class="user-activity-sec">
              <li>
                <div class="active-users active-box d-flex align-items-center">
                  <span></span>
                  <p>Daily Active users</p>
                </div>
              </li>
              <li>
                <div class="Onboarding-users active-box d-flex align-items-center">
                  <span></span>
                  <p>Onboarding pending</p>
                </div>
              </li>
              <li>
                <div class="Deactivated-users active-box d-flex align-items-center">
                  <span></span>
                  <p>Deactivated users</p>
                </div>
              </li>
              <li>
                <div class="Ipsum-users active-box d-flex align-items-center">
                  <span></span>
                  <p>Lorem Ipsum I</p>
                </div>
              </li>
              <li>
                <div class="Lorem-users active-box d-flex align-items-center">
                  <span></span>
                  <p>Lorem Ipsum </p>
                </div>
              </li>
            </ul>
          </b-col>
        </b-row>
      </div>
    </b-card-body>
         </b-card>
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
export default {
    components:{
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
    }
}
</script>

<style>

</style>