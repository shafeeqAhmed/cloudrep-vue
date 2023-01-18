<template>
  <div>
    <b-link class="log_back ml-1" @click="logout">
      <div class="d-flex align-items-center">
        <feather-icon icon="ArrowLeftIcon" size="21" class="mr-1"/>
        <small>Back to Sign in +</small>
      </div>
    </b-link>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { globalHelper } from "@core/mixins/ui/global";

import { BLink } from "bootstrap-vue";

export default {
  components: {
    BLink,
  },
  mixins: [globalHelper],
};
</script>


