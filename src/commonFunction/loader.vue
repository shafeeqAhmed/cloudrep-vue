<template>
  <div class="d-flex flex-wrap centered inner-loader-dash">
    <div id="text">
      <b-img src="@/assets/images/logo/white-logo.png"></b-img>
      <!-- <b-spinner
      v-for="variant in variants"
      :key="variant"
      class="mr-1"
      :variant="variant"
      /> -->
      <div class="loader1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
      </div>
      </div>
  </div>
</template>

<script>
import { BSpinner , BImg, } from "bootstrap-vue";

export default {
  components: {
    BSpinner,
    BImg,
  },
  data: () => ({
    variants: [
      "primary",
      "danger",
      "success"
    ],
  }),
};
</script>
<style scoped lang="scss">
.centered {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: #000;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  cursor: pointer;
}
#text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.inner-loader-dash{
  #text{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    img{
      width: 40%;
      margin: auto;
    }
  }
}
.loader1 {
   display:flex;
   align-items: center;
   justify-content: center;
   font-size:0px;
   padding:0px;
}
.loader1 span {
   vertical-align:middle;
   border-radius:100%;
   display:inline-block;
   width:30px;
   height:30px;
   margin:3px 2px;
   -webkit-animation:loader1 0.8s linear infinite alternate;
   animation:loader1 0.8s linear infinite alternate;
}
.loader1 span:nth-child(1) {
   -webkit-animation-delay:-1s;
   animation-delay:-1s;
  // background:rgba(245, 103, 115,0.6);
  background: linear-gradient(224.99deg, #933FFE 0%, #741189 100%);
}
.loader1 span:nth-child(2) {
   -webkit-animation-delay:-0.8s;
   animation-delay:-0.8s;
  // background:rgba(245, 103, 115,0.8);
  background: linear-gradient(224.99deg, #933FFE 0%, #741189 100%);
}
.loader1 span:nth-child(3) {
   -webkit-animation-delay:-0.26666s;
   animation-delay:-0.26666s;
  // background:rgba(245, 103, 115,1);
  background: linear-gradient(224.99deg, #933FFE 0%, #741189 100%);
}
.loader1 span:nth-child(4) {
   -webkit-animation-delay:-0.8s;
   animation-delay:-0.8s;
  // background:rgba(245, 103, 115,0.8);
  background: linear-gradient(224.99deg, #933FFE 0%, #741189 100%);
  
}
.loader1 span:nth-child(5) {
   -webkit-animation-delay:-1s;
   animation-delay:-1s;
  // background:rgba(245, 103, 115,0.4);
  background: linear-gradient(224.99deg, #933FFE 0%, #741189 100%);
}

@keyframes loader1 {
   from {transform: scale(0, 0);}
   to {transform: scale(1, 1);}
}
@-webkit-keyframes loader1 {
   from {-webkit-transform: scale(0, 0);}
   to {-webkit-transform: scale(1, 1);}
}

</style>