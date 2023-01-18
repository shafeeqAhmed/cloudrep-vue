<template>
    <section class="position-relative work-any-sec hero-section-5">
      <img class="grad-pp-left2" src="@/assets/images/website/gradient-pink-purple.png" alt="" />
      <div class="galaxy-lines">
        <img src="@/assets/images/website/GalaxyLines.png" alt="" />
      </div>
      <div class="container">
        <div class="section-margin">
          <b-row>
            <b-col md="5">
              <div class="hero-section-title">
                <h2 class="next-bar-gradient  " data-aos="fade-up" data-aos-delay="500">
                  Work Anywhere <br />
                  Anyplace<br />
                  Anytime
                </h2>
                <p class=" " data-aos="fade-up" data-aos-delay="500">
                  A People First, Impact Driven, Learn and Earn on-demand
                  employment provider with a net zero carbon initiative for
                  flexible remote work oppotunities for over 100 million +
                  unemployed workforce around the global in the post pandemic
                  Economy
                </p>
                <div class="position-relative btn-with-glow m-auto  " data-aos="fade-up" data-aos-delay="500">
                  <b-link>Get Started</b-link>
                  <!-- <span class="btn-glow"></span> -->
                </div>
              </div>
            </b-col>
            <b-col md="7">
              <div class="blu-card">
                <ul>
                  <li>
                    <div class="bluish-card " data-aos="fade-up" data-aos-delay="500">
                      <div class="bluish-body">
                        <img class="img-fluid" src="@/assets/images/website/bluish1.png" alt="" />
                        <div class="bluish-content pt-4">
                          <h6>Be Your Own Boss</h6>
                          <p>
                            Enjoy flexible scheduling with the availability to learn new skills.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="bluish-card " data-aos="fade-up" data-aos-delay="500">
                      <div class="bluish-body">
                        <img class="img-fluid" src="@/assets/images/website/bluish2.png" alt="" />
                        <div class="bluish-content pt-4">
                          <h6>AI Powered Work from Home Platform</h6>
                          <p>
                            A low startup, a zero carbon footprint technology platform accessible from the convenience
                            of your home.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="bluish-card " data-aos="fade-up" data-aos-delay="500">
                      <div class="bluish-body">
                        <img class="img-fluid" src="@/assets/images/website/bluish3.png" alt="" />
                        <div class="bluish-content pt-4">
                          <h6>A Decentralized, Web3, Learn-to-Earn platform</h6>
                          <p>
                            that provides an income to millions of remote workers globally.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="bluish-card " data-aos="fade-up" data-aos-delay="500">
                      <div class="bluish-body">
                        <img class="img-fluid" src="@/assets/images/website/bluish4.png" alt="" />
                        <div class="bluish-content pt-4">
                          <h6>Cloud-Based Workforce and Talent Marketplace</h6>
                          <p>
                            Powered by artificial intelligence, this will change how businesses find workers and how
                            workers find gigs - all in one place.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-7 position-relative">
            <b-col sm="12">
              <div class="hero-section-title text-center " data-aos="fade-up" data-aos-delay="500">
                <h2 class="live-head" id="hover-tit" @mouseover="hover_mou2()" @mouseleave="hover_moul2()">
                  Live Your Life <br />
                  Love your
                  <img src="@/assets/images/common/wear2.png" style="margin-top: -25px" class="wear-head-1" />
                  Work
                </h2>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-7 cont-creat">
            <b-col md="6" class="work-any-vid" data-aos="fade-up" data-aos-delay="500">
              <video src="@/assets/videos/any-wh (4).mp4" preload="auto" autoplay loop muted >
              </video>
            </b-col>
            <b-col md="6" class="">
              <div class="hero-section-title">
                <h2 class="make-head " id="hover-tit" data-aos="fade-up" data-aos-delay="500" @mouseover="hover_mou3()"
                  @mouseleave="hover_moul3()">
                  The Work From Home Revolution
                  <img src="@/assets/images/common/wear1.png" class="wear-head-1" /> Has Begun
                </h2>
                <p class="" data-aos="fade-up" data-aos-delay="503">
                  CloudRep is the future of work. We're a performance-based, cost-per-acquisition marketplace that
                  helps businesses automate their customer support, improve their customer service quality, and
                  increase their sales and conversions. Our artificial intelligence technology is unrivalled and
                  allows businesses to scale rapidly with maximum efficiency. Our recruiting, training, onboarding,
                  and scaling process for talent is second to none, and our ERP and CRM modules can be dynamically
                  adjusted to fit your exact business needs.
                </p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="hero-section-title">
                <p data-aos="fade-up" data-aos-delay="300">CloudRep is building a better, more inclusive world by
                  creating over 40 million jobs for people around the globe! Our mission has always been clear: we
                  want to help businesses of all sizes source workers and pay them using our AI-powered workforce
                  marketplace. By 2030 it'll be unprecedentedly easy to find what job you're best suited for--and just
                  as quickly connect with employers who need your skills in their office or field location of choice
                  today .</p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <img class="grad-pp-right2" src="@/assets/images/website/bg-gradient-pp-right.png" alt="" />
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
    },
    methods: {
        hover_mou2() {
          var hov_cur = document.getElementById("cursor");
          var hov_vid = document.getElementById("bd-video-2");

          hov_cur.style.transform = "scale(20)";
          hov_vid.style.display = "block";
        },
        hover_moul2() {
          var hov_cur = document.getElementById("cursor");
          var hov_vid = document.getElementById("bd-video-2");

          hov_cur.style.transform = "scale(1)";
          hov_vid.style.display = "none";
        },
        hover_mou3() {
          var hov_cur = document.getElementById("cursor");
          var hov_vid = document.getElementById("bd-video-3");


          hov_cur.style.transform = "scale(20)";
          hov_vid.style.display = "block";
        },
        hover_moul3() {
          var hov_cur = document.getElementById("cursor");
          var hov_vid = document.getElementById("bd-video-3");

          hov_cur.style.transform = "scale(1)";
          hov_vid.style.display = "none";
        },
    }
}
</script>

<style>

</style>