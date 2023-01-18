<template>
  <!-- if node is not router and it's a root parent node -->
  <drop
    v-if="isChildExist.length == 0 && label != 'Add Route'"
    @drop="handleDrop($event, type, node)"
    @dragover="handleOver(type)"
    @dragleave="handleLeave"
  >
    <div
      :class="[
        type == 'fail' ? 'ivrNodeClose' : 'ivrNodeOpen',
        type === isChildExist.type ? 'menuBackground' : '',
      ]"
    >
      <node-popover
        v-if="isChildExist.length == 0"
        :parentId="node.id"
        :popOverId="`${type}-menu-popover-${node.id}`"
        :type="type"
        :label="label"
        @selectNode="selectNode"
      />

      <div
        v-else
        class="ivrnode-type bg-danger bg-darken-2 colors-container"
      >
        <div>{{ label }}</div>
        <div>{{ isChildExist.data.title }}</div>
        <div>
          <feather-icon
            icon="TrashIcon"
            class="ivrcross-icon"
            size="21"
            @click="remove(isChildExist)"
          />
        </div>
      </div>
    </div>
  </drop>
  <!-- if node is router node no matter its root parent or child node -->
  <drop
    v-else-if="label == 'Add Route'"
    @drop="handleDrop($event, type, node)"
    @dragover="handleOver(type)"
    @dragleave="handleLeave"
  >
    <div :class="[type == 'fail' ? 'ivrNodeClose' : 'ivrNodeOpen']">
      <node-popover
        :parentId="node.id"
        :popOverId="`${type}-menu-popover-${node.id}`"
        :type="type"
        :label="label"
        @selectNode="selectNode"
      />

      <!-- <div v-else class="ivrnode-type bg-danger bg-darken-2 colors-container">
                <div>{{ label }}</div>
                <div>{{ isChildExist.data.title }}</div>
                <div>
                    <feather-icon icon="TrashIcon" class="ivrcross-icon" size="21" @click="remove(isChildExist)" />
                </div>
            </div> -->
    </div>
  </drop>
  <!-- if child node selected then label the menu -->
  <div
    v-else
    :class="[
      type == 'fail' ? 'ivrNodeClose' : 'ivrNodeOpen',
      type === isChildExist.type ? 'menuBackground' : '',
    ]"
  >
    <div class="ivrnode-type colors-container d-flex align-items-center">
      <div class="ivrnode-type-label">{{ label }}</div>
      <div class="ivrnode-type-node">{{ isChildExist.data.title }}</div>
      <div class="ivrnode-type-icon">
        <feather-icon
          icon="TrashIcon"
          class="ivrcross-icon"
          size="21"
          @click="remove(isChildExist)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { BCol } from "bootstrap-vue";
import { globalHelper } from "@core/mixins/ui/global";

export default {
  props: ["label", "type", "node"],
  components: {
    BCol,
  },
  data() {
    return {
      nameOfDropArea: "",
    };
  },
  mixins: [globalHelper],

  computed: {
    isChildExist() {
      return this.$store.getters["ivrBuilder/isChildExist"](
        this.node.id,
        this.type
      );
    },
  },

  methods: {
    handleDrop(title, type, node) {
      // this.nameOfDropArea = ''
      this.$store.commit("ivrBuilder/UPDATE_NEW_NODE", {
        parentId: node.id,
        title: title,
        type: type,
      });
      console.log("droped------------------------");
    },

    handleOver(type) {
      this.nameOfDropArea = type;
      console.log("overed-----------------");
    },
    handleLeave() {
      this.nameOfDropArea = "";

      console.log("Leave-----------------");
    },
    getNodeType() {
      return this.type == "fail" ? "ivrNodeClose" : "ivrNodeOpen";
    },
    selectNode(e) {
      this.nameOfDropArea = e;
    },
  },
};
</script>
<style scoped>
.menuBackground {
  cursor: pointer;
  border: 1px;
  border-radius: 5px;
  background: linear-gradient(138.29deg, #01b7c5 -6.3%, #782c96 103.83%);
}
</style>
