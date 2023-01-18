<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >
    <template #button-content>
      <b-img
        :src="currentLocale.img"
        height="16px"
        width="16px"
        :alt="currentLocale.locale"
      />
           <span class="ml-50 text-body mr-1">{{ currentLocale.name }}</span>

    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="changeWorkerStatus(localeObj)"
    >
      <b-img
        :src="localeObj.img"
        height="16px"
        width="16px"
        :alt="localeObj.locale"
      />
      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BImg } from 'bootstrap-vue'
import { ref } from "@vue/composition-api"
export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BImg,
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.selectedOption)
    },
  },
  methods: {
changeWorkerStatus(obj) {
    this.selectedOption = obj.locale
      console.log(obj);
      this.$store.commit("app/UPDATE_WORKER_ACTIVITY", obj);
    },
  },
  setup() {

    /* eslint-disable global-require */
    const locales = [
      {
        locale: 'available',
        img: require("@/assets/images/icons/filled-circle.png"),
        name: 'Available',
        sid: "WA5e8aec0498019ca3d820b75f83d69d33",
      },
      {
        locale: 'on_break',
        img: require("@/assets/images/icons/snooze.png"),
        name: 'On Break',
        sid: "WA48865c059e1530bb53bd31dc2c741b31",
      },
        {
        locale: 'offline',
        img:  require("@/assets/images/icons/negative.png"),
        name: 'Offline',
        sid: "WA244ab5956e96a2a773888d8ffeb7f2aa",
      },
    ]
    const selectedOption = ref('available')
    /* eslint-disable global-require */

    return {
      locales,
      selectedOption
    }
  },
}
</script>

<style>

</style>
