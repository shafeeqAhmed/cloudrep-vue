<template>
    <div class="ag-contcenter-cards">
        <b-card>
        <b-card-header>
            <div class="w-100 d-flex align-items-center justify-content-between">
            <div>
                <b-card-title>User Profile</b-card-title>
            </div>
            <div>
                <feather-icon icon="MoreVerticalIcon" size="21" />
            </div>
            </div>
        </b-card-header>
        <b-card-body>
            <div>
            <b-row>
                <b-col cols="2">
                <b-img src="@/assets/images/contact-center/Avatar.png"></b-img>
                </b-col>
                <b-col cols="10">
                <ul class="cont-user-details">
                    <li>
                    <h3>Full Name</h3>
                    <p>Russell Flores</p>
                    </li>
                    <li>
                    <h3>Email Address</h3>
                    <p>russell_1122@gmail.com</p>
                    </li>
                    <li>
                    <h3>Language</h3>
                    <p>English</p>
                    </li>
                    <li>
                    <h3>Fraud Indicators</h3>
                    <p>None</p>
                    </li>
                    <li>
                    <h3>Signed Up</h3>
                    <p>March 23, 2021</p>
                    </li>
                    <li>
                    <h3>Region</h3>
                    <p>US ATL</p>
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