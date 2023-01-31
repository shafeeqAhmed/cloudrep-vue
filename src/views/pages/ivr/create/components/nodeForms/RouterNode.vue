<template>
  <div>
    <div :id="`${node.id}`" class="head-node-ivr row items-center no-wrap m-auto w-100"
      :class="{ 'bg-direction': node.blinkHeader, 'border-error-ivr': Object.keys(getErrors).length > 0 }">
      <div class=" col d-flex align-items-center" v-b-toggle="`ivr-collapse-${node.id}`">
        <feather-icon icon="Share2Icon" class="mr-1" size="21" />
        <h2 class="text-h6">
          <node-head-title :node="node" />
        </h2>

        <div class="ivr-tooptip-quiz" v-if="Object.keys(getErrors).length > 0">
          <div :id="`${node.type}-evrError-${node.id}`" class="ivr-note-box ivrError">
            <feather-icon icon="AlertTriangleIcon" class="text-white IVRAlertTriangleIcon" size="27" />
            <span class="error-count">{{ Object.keys(getErrors).length }}</span>
          </div>

          <b-tooltip :target="`${node.type}-evrError-${node.id}`" triggers="hover" placement="bottomright">
            <div class="ivr-note-box">
              <div class="ivrErrorContainer">
                <div class="ivrError-content mt-1">
                  <span v-for="(error, key) in getErrors" class="d-flex align-items-center mb-1">
                    <feather-icon icon="AlertTriangleIcon" class="mr-1" size="21" />
                    <p> {{ error }}</p>
                  </span>
                </div>
              </div>
            </div>
          </b-tooltip>
        </div>
      </div>
      <div class="col-auto">
        <div>
          <span class="IvrNodeDeleteIconArea" @click="remove(node)">
            <img class="IvrNodeDeleteIcon" src="@/assets/images/ivr/Delete.png" />
          </span>
          <header-goto-icon :node="node" />
        </div>
      </div>
    </div>
    <!--///////////////////////////////////////////////-->
    <div class="p-1">
      <b-collapse v-model="node.isOpen" :id="collapseId">
        <router-node-filters :node="node" :remove="remove" />
      </b-collapse>
      <div class="success-node">
        <child-node-menu label="Add Route" :node="node" type="route" />
      </div>
    </div>


  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BCard,
  BButton,
  BCardText,
  BFormInput,
  BFormGroup,
  BFormLabel,
  BFormFile,
  BFormCheckbox,
  BFormTextarea,
  BFormTimepicker,
  BFormDatepicker,
  BTooltip,
  VBToggle,
  BCollapse,
  BButtonGroup,
  BSpinner,
  BModal,
  BPopover,
  VBPopover
} from "bootstrap-vue";
// import vSelect from "vue-select";
import ivrheader from "../ivrheader.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import { globalHelper } from "@core/mixins/ui/global";
// import { debounce } from '@/commonFunction/helpers.js'
import RouterNodeFilters from '../general/RouterNodeFilters.vue'

export default {
  props: ["node"],
  components: {
    ivrheader,
    BRow,
    BCol,
    BForm,
    BCard,
    BButton,
    BCardText,
    BFormInput,
    BFormGroup,
    BFormFile,
    BFormCheckbox,
    BFormTextarea,
    BFormTimepicker,
    BFormDatepicker,
    BTooltip,
    VBToggle,
    BCollapse,
    BButtonGroup,
    BSpinner,
    BModal,
    BPopover,
    VBPopover,
    RouterNodeFilters
  },
  mixins: [toastAlert, globalHelper],
  directives: {
    "b-toggle": VBToggle,
    "b-popover": VBPopover,
  },
  computed: {
    collapseId() {
      return `ivr-collapse-${this.node.id}`;
    },
    getErrors() {
      return this.$store.getters['ivrBuilder/getErrors'](this.node.id)
    },
  },

};
</script>

<style lang="scss">
@import "@/assets/scss/ivrStyles/_Style.scss";
</style>