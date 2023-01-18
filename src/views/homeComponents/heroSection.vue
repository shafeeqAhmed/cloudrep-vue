<template>
  <section class="hero">
    <div class="section-overlay"></div>
    <div class="hero-section-title text-center">
      <span>Introducing</span>
      <!-- <h1 class="clr-white fs-85 ff-inter fw-900 text-gr"  data-aos="fade-in"  data-aos-delay="1500">
          <span>CloudRep</span>
        </h1> -->
      <div>
        <img class="cursor-pointer mainLogo customLogoWidth" src="@/assets/images/common/new_logo2.svg" />
      </div>
      <vue-typed-js
        :strings="['The Future of Work', 'AI Driven Gig Economy Platform', 'Decentralized Global Talent Marketplace', 'Allows Businesses to Scale Rapidly', 'Automated Recruiting, Training, Onboarding', 'Full Business Management Systems']"
        :loop="true" :typeSpeed="50" :backSpeed="10" :smartBackspace="true" :startDelay="1500">
        <h1 class="typing"></h1>
      </vue-typed-js>
      <p class="clr-white fs-16 mt-15 mb-15 heroDescription">
        We are building a global, decentralized, cloud-based workforce and talent marketplace that will be powered by
        artificial intelligence.<br>
        This is the first of its kind and will change how businesses and workers connect with each other.
      </p>
      <div class="pre-reg-btn">
        <div class="hover-btn">
          <b-button variant="gradient-primary" name="Primary" @click="$router.push({ name: 'pre-registration' })"
            class="">
            Pre Register for Beta
          </b-button>
        </div>
        <div class="hover-btn">
          <a v-b-modal.modalPopover class="">
            <img class="ml-2 cursor-pointer" src="@/assets/images/common/play.svg" alt="play" />
          </a>
          <b-modal id="modalPopover" centered ok-disable modal-class="modal-cr modal-uv ban-popper">
            <!-- <div class="player"> -->
            <iframe class="videoPlayer mt-165 mb-165" height="auto" src="https://www.youtube.com/embed/L4CIQGnemmA"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
            <!-- </div> -->
          </b-modal>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BImg,
  BFormGroup,
  BFormInput,
  BForm,
  BModal,
  BEmbed,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavItem,
} from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BButton,
    BImg,
    BFormGroup,
    BFormInput,
    BForm,
    BModal,
    BEmbed,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavItem,
  }
}
</script>

<style>
</style>