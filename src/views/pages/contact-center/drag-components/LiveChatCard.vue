<template>
    <div class="ag-contcenter-cards">
        <b-card class="h-100">
        <b-card-header>
            <div>
            <b-card-title>Live Chat</b-card-title>
            </div>

            <b-dropdown variant="link" no-caret class="chart-dropdown" toggle-class="p-0">
            <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="18" class="text-body cursor-pointer" />
            </template>
            <b-dropdown-item href="#"> Last 28 Days </b-dropdown-item>
            <b-dropdown-item href="#"> Last Month </b-dropdown-item>
            <b-dropdown-item href="#"> Last Year </b-dropdown-item>
            </b-dropdown>
        </b-card-header>                           
        <b-card-body>
            <div class="d-flex mb-2">
            <div class="mr-1">
                <b-img class="live-chat-img" src="@/assets/images/avatars/1.png" alt="browser img" />
            </div>
            <div class="description-content">
                <h6 class="my-auto">Wade Warren</h6>
                <p>Pretium duis rula aliquet.</p>
            </div>
            </div>
            <div class="d-flex mb-2">
            <div class="mr-1">
                <b-img class="live-chat-img" src="@/assets/images/avatars/1.png" alt="browser img" />
            </div>
            <div class="description-content">
                <h6 class="my-auto">Wade Warren</h6>
                <p>Pretium duis rula aliquet.</p>
            </div>
            </div>
            <div class="d-flex mb-2">
            <div class="mr-1">
                <b-img class="live-chat-img" src="@/assets/images/avatars/1.png" alt="browser img" />
            </div>
            <div class="description-content">
                <h6 class="my-auto">Wade Warren</h6>
                <p>Pretium duis rula aliquet.</p>
            </div>
            </div>
            <div class="d-flex mb-2">
            <div class="description-content-rtl text-right">
                <h6 class="my-auto text-light">You</h6>
                <p>Pretium duis rula aliquet.</p>
            </div>
            <div class="ml-1">
                <b-img class="live-chat-img" src="@/assets/images/avatars/2.png" alt="browser img" />
            </div>
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