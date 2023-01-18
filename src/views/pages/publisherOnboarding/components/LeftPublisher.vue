<template>
  <div class="w-100 d-lg-flex align-items-center justify-content-center">
    <b-img
      src="@/assets/images/auth/publisher-top.png"
      class="top-img"
      id="publisher-top"
    />
    <b-img
      src="@/assets/images/auth/3.png"
      class="top-img"
      id="white-dot-img"
    />
    <h1>Details create the big picture</h1>
    <b-img
      src="@/assets/images/auth/6.png"
      class="top-img"
      id="green-dot-img"
    />
    <b-img
      src="@/assets/images/auth/publisher-bottom.png"
      class="top-img"
      id="publisher-bottom"
    />
  </div>
</template>
<script>
import { BImg } from "bootstrap-vue";
export default {
  name: "LeftPublisher",
  components: {
    BImg,
  },
};
</script>