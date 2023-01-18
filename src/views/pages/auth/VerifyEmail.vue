<template>
  <div class="auth-wrapper auth-v2">
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BImg, BButton } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import { toastAlert } from "@core/mixins/ui/toast";
import { updateRegisterStep, save, get } from '@/auth/utils'
import useJwt from '@/auth/jwt/useJwt'


export default {
  components: {
    BLink, BImg, BButton, VuexyLogo,
  },
  mixins: [toastAlert],
  created() {
    const id = this.$route.params.id
    const hash = this.$route.params.hash
    const url = `/email/verify/${id}/${hash}`
    this.$http.post(url).then(response => {
      const { data } = response
      const { userData, accessToken, refreshToken, isVerified2fa } = data.data
      const { message, status } = data
      if (status) {


        userData.accessToken = accessToken
        userData.refreshToken = refreshToken


        useJwt.setToken(accessToken);
        useJwt.setRefreshToken(refreshToken);
        localStorage.setItem("userData", JSON.stringify(userData));
        this.$store.commit('app/UPDATE_USER', userData)
      }
      save('step', userData.step)

      this.successToast('Success', message)

      this.$router.push("/set-2fa").catch(() => { });

    })
    //   .catch(() => {
    //   this.errorToast('Error', "There is some thing going wrong");
    //   save('linkExpired', true)
    //   this.$router.push("/email-not-verified").catch(() => { });
    // })
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/not-authorized.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/not-authorized-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
