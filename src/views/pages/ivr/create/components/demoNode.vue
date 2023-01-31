<template>
  <div>
    <div id="nodeContainer" class="nodeContainer">
      <div class="ivr-node-overlay-select" v-if="node.isActiveGoTo" @click="selectGoToNode(node)">
        <div class="node-select-btn">
          <feather-icon icon="CornerUpLeftIcon" size="21" />
          <p>Click to Select</p>
        </div>
      </div>

      <!-- <div>node id : {{ node.id }}</div> -->
      <!-- <div>destinationNodeId : {{ node.destinationNodeId }}</div>
      <div>gotoSourceNodeId : {{ node.gotoSourceNodeId }}</div> -->
      <dial-node v-if="node.node_type == 'dial'" :node="node" :remove="remove" />
      <gather-node v-else-if="node.node_type == 'gather'" :node="node" :remove="remove" />
      <hangup-node v-else-if="node.node_type == 'hangup'" :node="node" :remove="remove" />
      <menu-node v-else-if="node.node_type == 'menu'" :node="node" :remove="remove" />
      <play-node v-else-if="node.node_type == 'play'" :node="node" :remove="remove" />
      <voicemail-node v-else-if="node.node_type == 'voicemail'" :node="node" :remove="remove" />
      <goto-node v-else-if="node.node_type == 'goto'" :node="node" :remove="remove" />
      <router-node v-else-if="node.node_type == 'router'" :node="node" :remove="remove" />
    </div>
  </div>
</template>

<script>
import MenuNode from './nodeForms/MenuNode.vue';
import HangupNode from './nodeForms/HangupNode.vue';
import DialNode from './nodeForms/DialNode.vue'
import GatherNode from './nodeForms/GatherNode.vue';
import PlayNode from './nodeForms/PlayNode.vue';
import VoicemailNode from './nodeForms/VoicemailNode.vue';
import GotoNode from './nodeForms/GotoNode.vue';
import RouterNode from './nodeForms/RouterNode.vue';
import { globalHelper } from "@core/mixins/ui/global";

import {
  BRow,
  BCol,
  BButton,
  BFormInput,
  BFormGroup,
  BFormFile,
  BCollapse,
  BTooltip,
  VBToggle,
  BButtonGroup
} from "bootstrap-vue";
export default {
  components: {
    VBToggle,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormFile,
    BCollapse,
    BTooltip,
    VBToggle,
    BButtonGroup,
    MenuNode,
    GatherNode,
    HangupNode,
    DialNode,
    PlayNode,
    VoicemailNode,
    GotoNode,
    RouterNode
  },
  directives: {
    "b-toggle": VBToggle,
  },
  mixins: [globalHelper],

  computed: {
    ids() {
      return this.$store.state.ivrBuilder.allCollapseIds
    },

  },

  data() {
    return {
    };
  },
  props: ["node", "title", "description", "blocks"],
  methods: {
    collapse() {
      this.ids.forEach((element) => {
        this.$root.$emit('bv::toggle::collapse', element)
      });
    },
    selectGoToNode(node) {
      this.$store.commit('ivrBuilder/UPDATE_SELECT_GOTO_NODE', node)

    },

  },
  created() {
    // console.log('-------11111111---------')
    // console.log(this.$props.node.parentId);
  },
};
</script>

<style>
.flowy-drag-handle button {
  cursor: grab;
}

.flowy-block.draggable-mirror {
  opacity: 0.6;
}

.btnStyleNode {
  padding: 10px 50px;
  border: none;
  margin: 15px;
  background-color: blueviolet;
  color: white;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.nodeContainer {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.nodeDragIcon {
  background-color: transparent;
  border: 1px solid;
  border-radius: 30%;
  width: 40px;
}

.mangoNodeInput {
  width: 250px;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid lightgray !important;
}

.mangoNodeInput:focus {
  border: 1px solid lightgray !important;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
}
</style>