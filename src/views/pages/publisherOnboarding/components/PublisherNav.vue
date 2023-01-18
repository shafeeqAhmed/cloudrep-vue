<template>
  <div
    class="
      w-100
      d-lg-flex
      aling-items-center
      justify-content-center
      px-lg-5 px-md-5 px-sm-0
      mb-5
    "
  >
    <div class="w-100 text-center">
      <b-img
        src="@/assets/images/auth/company-logo.png"
        class="company-logo mb-5 mx-auto"
      />
      <!-- List Group -->
      <b-list-group class="listing mx-lg-auto">
        <b-list-group-item>
          <b-link
            class="d-flex align-items-center"
          >
            <b-avatar rounded class="avatar-link mr-2 float-left">
              <feather-icon icon="LayersIcon"
              />
            </b-avatar>
            <span class="link-title">Services Required </span>
          </b-link>
        </b-list-group-item>

        <b-list-group-item>
          <b-link
            class="d-flex align-items-center">
            <b-avatar rounded class="avatar-link mr-2 float-left">
              <feather-icon icon="TargetIcon" />
            </b-avatar>
            <span class="link-title">Business Information</span>
          </b-link>
        </b-list-group-item>

        <b-list-group-item>
          <b-link
            class="d-flex align-items-center">
            <b-avatar rounded class="avatar-link mr-2 float-left">
              <feather-icon icon="AlignLeftIcon"
              />
              <!-- <feather-icon icon="CheckIcon" /> -->
            </b-avatar>
            <span class="link-title">Select Category</span>
          </b-link>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
} from "bootstrap-vue";
export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
  },


};
</script>
