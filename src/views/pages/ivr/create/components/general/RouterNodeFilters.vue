<template>
  <div>
    <Container @drop="onDrop">
      <Draggable class="router_tab mb-1" v-for="(filter, key) in node.filters" :key="key">
        <div class="d-flex align-items-center">
          <span>{{ indexIncreament(key) }} </span>
          <span class="mr-1 ml-1">|</span>
          <div class="route_name">
            <div class="route_icon">
              <feather-icon icon="Volume2Icon" class="mr-1" size="21" />
            </div>
            <div>Route {{ indexIncreament(key) }} :</div>
            &nbsp;
            <div>{{ filter.child_node_type }}</div>
          </div>
        </div>
        <div class="route_filters">
          <div id="route_filter">
            <router-node-popup :parentId="node.id" :popOverId="`${filter.id}-router-condition-${node.id}`" />
          </div>
          <div>
            <feather-icon icon="XIcon" class="cursor-pointer" size="21"
              @click="remove({ ...filter, node_type: 'filter' })" />
          </div>
          <div class="drag_icon_node ml-1">
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z" />
            </svg>
          </div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>


<script>
import RouterNodePopup from "../general/RouterNodePopup.vue";
import { Container, Draggable } from "vue-dndrop";
import index from "vue-prism-component";
export default {
  props: ["node", "remove"],
  components: {
    RouterNodePopup,
    Container, Draggable
  },

  data() {
    return {

    }
  },
  methods: {
    indexIncreament(key) {
      return ++key
    },
    onDrop(dropResult) {
      const list = this.applyDrag(this.node.filters, dropResult);
      const filterOrder = list.map((li, index) => {
        return {
          uuid: li.id,
          child_node_type: li.child_node_type,
          priority: this.indexIncreament(index)
        }
      })
      this.$store.dispatch('ivrBuilder/reorderRouterFilters', { filters: filterOrder })
        .then(() => {
          const { ivrUuid } = this.$store.state.ivrBuilder
          this.$store.dispatch('ivrBuilder/getIvr', { uuid: ivrUuid })
        })
      this.node.filters = list;
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    }
  }

};
</script>

<style scoped>
.router_tab.mb-1.dndrop-draggable-wrapper {
  display: flex !important;
}
</style>
