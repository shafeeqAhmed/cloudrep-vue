<template>
    <section class="hero-section-1">
        <div class="container">
          <div class="hero-section-title text-center">
            <h2 class=""> <span>CloudRep</span></h2>
            <span class="">As Featured IN</span>
          </div>
          <marquee behavior=scroll direction="left" scrollamount="10">
            <b-row class="mt-40 align-items-center justify-content-center ">
              <b-col md="1" class="mb-sm-5 text-center">
                <b-link><img src="@/assets/images/website/featured1.svg" /></b-link>
              </b-col>
              <b-col md="2" class="mb-sm-5 text-center">
                <b-link><img src="@/assets/images/website/featured2.svg" /></b-link>
              </b-col>
              <b-col md="2" class="mb-sm-5 text-center">
                <b-link><img src="@/assets/images/website/featured3.svg" /></b-link>
              </b-col>
              <b-col md="1" class="mb-sm-5 text-center">
                <b-link><img src="@/assets/images/website/featured4.svg" /></b-link>
              </b-col>
              <b-col md="1" class="mb-sm-5 text-center">
                <b-link><img src="@/assets/images/website/featured5.svg" /></b-link>
              </b-col>
              <b-col md="2" class="mb-sm-5 text-center">
                <b-link><img src="@/assets/images/website/featured6.svg" /></b-link>
              </b-col>
              <b-col md="2" class="mb-sm-5 text-center">
                <b-link><img src="@/assets/images/website/featured7.svg" /></b-link>
              </b-col>
            </b-row>
          </marquee>
        </div>
    </section>
</template>

<script>

import {
    BRow,
    BCol,
    BLink,
} from "bootstrap-vue";

export default {
    components:{
        BRow,
        BCol,
        BLink,
    }
}
</script>

<style>

</style>