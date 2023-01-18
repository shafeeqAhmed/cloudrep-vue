<template>
 <p class="clearfix mb-0">
    <span class="d-block mt-25 text-center">
      <!-- COPYRIGHT  ©  -->
      © CloudRep {{ new Date().getFullYear() }}. All rights reserved.
      <!-- <span class="d-none d-sm-inline-block">, All rights Reserved</span> -->
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
