<template>
  <b-nav-item @click="changeSkin()">
    <feather-icon size="21" :icon="`${isDark ? 'Sun' : 'Moon'}Icon`" />
  </b-nav-item>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'
import { computed } from '@vue/composition-api'
import { BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BNavItem,
  },
  methods: {
    changeSkin() {
      this.skin = this.isDark ? 'light' : 'dark'
      this.$store.dispatch('app/updateUserApplication', {
        key: 'is_dark_mode',
        value: this.isDark ? 1 : 0
      })
    }
  },
  setup() {
    const { skin } = useAppConfig()

    const isDark = computed(() => skin.value === 'dark')

    return { skin, isDark }
  },
}
</script>
