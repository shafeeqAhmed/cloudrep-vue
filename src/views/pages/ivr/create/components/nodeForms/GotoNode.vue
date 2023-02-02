<template>
  <div>

    <div :id="`${node.id}`" class="head-node-ivr row items-center no-wrap m-auto w-100"
      :class="{ 'bg-direction': node.blinkHeader, 'border-error-ivr': errorCount > 0 }">
      <div class="col d-flex align-items-center" v-b-toggle="`ivr-collapse-${node.id}`">
        <feather-icon icon="RepeatIcon" class="mr-1" size="21" />
        <h2 class="text-h6">
          <node-head-title :node="node" />
        </h2>
        <div class="ivr-tooptip-quiz" v-if="errorCount > 0">
          <div :id="`${node.type}-evrError-${node.id}`" class="ivr-note-box ivrError">
            <feather-icon icon="AlertTriangleIcon" class="text-white IVRAlertTriangleIcon" size="27" />
            <span class="error-count">{{ errorCount }}</span>
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

    <div class="p-1">
      <b-collapse v-model="node.isOpen" :id="collapseId">
        <b-row>
          <b-col md="12" class="mb-2">
            <b-form-group>
              <div class="d-flex alig-items-end justify-content-between">
                <div class="label-tooltip">
                  <label class="IvrNodeInputLabel">Count

                  </label>
                  <div class="ivr-tooptip-quiz">
                    <svg :id="`${node.type}-ivrgoto-1-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8.5" r="8" fill="white" />
                      <path
                        d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                        fill="black" />
                    </svg>
                    <b-tooltip :target="`${node.type}-ivrgoto-1-${node.id}`" triggers="hover">
                      The number of times this node can be passed through. 
                    </b-tooltip>
                  </div>
                </div>
                <div class="ivr-input">
                  <div class="input-gradient">
                    <b-form-input id="seconds" type="number" v-model="goto.count" @keydown="ivrInputValidate($event, 10)" @input="validateDebounceNode"
                      placeholder="15" />
                  </div>
                </div>
              </div>

            </b-form-group>
          </b-col>
          <b-col md="12" class="mb-2">
            <b-form-group>
              <div class="goto-input d-flex alig-items-end justify-content-between">
                <div class="label-tooltip">
                  <label class="IvrNodeInputLabel">Go to Node*</label>
                  <div class="ivr-tooptip-quiz ">
                    <svg :id="`${node.type}-ivrgoto-2-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8.5" r="8" fill="white" />
                      <path
                        d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                        fill="black" />
                    </svg>
                    <b-tooltip :target="`${node.type}-ivrgoto-2-${node.id}`" triggers="hover">
                      The ID of the node to go to. Check the next section below about how to select it.
                    </b-tooltip>
                  </div>
                </div>
                <div class="ivr-input d-flex align-items-center">
                  <span class="mr-1">
                    <b>
                      {{ getDestinationNodeTitle(node.destinationNodeId) }}
                    </b>
                  </span>
                  <div class="input-gradient">
                    <div v-if="node.destinationNodeId">
                      <b-button-group class="group-btn">

                        <b-button id="direction-tooltip-6" @click="gotoanynode(node.destinationNodeId)">
                          <feather-icon icon="CornerUpLeftIcon" size="21" />
                        </b-button>

                        <b-tooltip target="direction-tooltip-6" triggers="hover">
                          Click to see the Goto source node.
                        </b-tooltip>
                        <b-button @click="gotoNodes">
                          <feather-icon icon="CompassIcon" size="21" />
                        </b-button>
                      </b-button-group>
                    </div>
                    <b-button v-else @click="gotoNodes">Select Node</b-button>

                  </div>
                </div>
              </div>


            </b-form-group>
          </b-col>

        </b-row>
      </b-collapse>
      <div class="failure-node">
        <child-node-menu label="On Failure" :node="node" type="fail" />
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import { globalHelper } from "@core/mixins/ui/global";
import { debounce } from '@/commonFunction/helpers.js'

export default {
  props: ['node'],
  components: {
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
    vSelect,
    BTooltip,
    VBToggle,
    BCollapse,
    BButtonGroup,
  },
  directives: {
    'b-toggle': VBToggle
  },
  mixins: [globalHelper],
  computed: {
    collapseId() {
      return `ivr-collapse-${this.node.id}`
    },
    getErrors() {
      return this.$store.getters['ivrBuilder/getErrors'](this.node.id)
    },
    errorCount() {
      return this.$store.getters['ivrBuilder/errorCount'](this.node.id)
    },
    destinationNodeId() {
      return this.node.destinationNodeId
    }
  },
  watch: {
    destinationNodeId() {
      this.validateNode()
    },

  },
  data() {
    return {
      goto: {
        count: "",
      },
    };
  },
  methods: {
    chooseFile(fileId) {
      document.getElementById(fileId).value = null;
      document.getElementById(fileId).click();
    },
    gotoNodes() {
      this.$store.commit('ivrBuilder/UPDATE_GOTO_NODE', this.node)
    },
    getDestinationNode(id) {
      //id of destination node
      const nodes = this.$store.state.ivrBuilder.nodes
      const node = nodes.filter(el => {
        return el.id == id
      })
      if (node.length > 0) {
        return node[0]
      } else {
        return {}
      }
    },
    getDestinationNodeTitle(id) {
      //id of destination node
      const nodes = this.$store.state.ivrBuilder.nodes
      const node = nodes.filter(el => {
        return el.id == id
      })
      if (node.length > 0) {
        return node[0].data.title
      } else {
        return ''
      }
    },
    validateDebounceNode: debounce(function () {
      this.validateNode()
    }, 500),
    validateNode() {
      if (!this.$store.state.ivrBuilder.isEdited) {

        const destinationNode = this.getDestinationNode(this.node.id)
        const params = {
          url: `create-goto-validation?uuid=${this.node.id}`,
          node_type: this.node.node_type,
          nodeId: this.node.id,
          parent_uuid: this.node.id,
          goto_node_uuid: destinationNode?.destinationNodeId,
          goto_count: this.goto.count ? this.goto.count : 15,
          goto_source_node_uuid: this.node.gotoSourceNodeId,
          type: this.node.type

        };
        this.$store.dispatch("ivrBuilder/validateNode", params)
      }
    },
    assignFormValue() {

      if (Object.keys(this.node.formData).length) {

        const { formData } = this.node
        this.goto.count = formData.goto_count


      }
    }
  },
  created() {
    this.assignFormValue()
    this.validateNode()
  }
};
</script>
  
<style lang="scss">
@import "@/assets/scss/ivrStyles/_Style.scss";
</style>