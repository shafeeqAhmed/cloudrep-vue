<template>
  <div>
    <!-- <flowy-drag-handle> -->
    <!-- <button class="input-gradient">{{ title }}</button> -->
    <drag class="drag-node-btn" @dragstart="handleChildDragstart" :transfer-data="title">
      <div class="DraggableItemContainer">
          <div class="draggableItem">
            <div class="ivr-node-icon">
              <feather-icon :icon='icons' size='21' />
            </div>
            <span>{{ title }} </span>
            <div class="ivr-node-dots">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.3" clip-path="url(#clip0_4450_16776)">
                  <path
                    d="M12 25.5C12.8284 25.5 13.5 24.8284 13.5 24C13.5 23.1716 12.8284 22.5 12 22.5C11.1716 22.5 10.5 23.1716 10.5 24C10.5 24.8284 11.1716 25.5 12 25.5Z"
                    fill="white" />
                  <path
                    d="M18 25.5C18.8284 25.5 19.5 24.8284 19.5 24C19.5 23.1716 18.8284 22.5 18 22.5C17.1716 22.5 16.5 23.1716 16.5 24C16.5 24.8284 17.1716 25.5 18 25.5Z"
                    fill="white" />
                  <path
                    d="M18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z"
                    fill="white" />
                  <path
                    d="M24 13.5C24.8284 13.5 25.5 12.8284 25.5 12C25.5 11.1716 24.8284 10.5 24 10.5C23.1716 10.5 22.5 11.1716 22.5 12C22.5 12.8284 23.1716 13.5 24 13.5Z"
                    fill="white" />
                  <path
                    d="M24 25.5C24.8284 25.5 25.5 24.8284 25.5 24C25.5 23.1716 24.8284 22.5 24 22.5C23.1716 22.5 22.5 23.1716 22.5 24C22.5 24.8284 23.1716 25.5 24 25.5Z"
                    fill="white" />
                  <path
                    d="M24 19.5C24.8284 19.5 25.5 18.8284 25.5 18C25.5 17.1716 24.8284 16.5 24 16.5C23.1716 16.5 22.5 17.1716 22.5 18C22.5 18.8284 23.1716 19.5 24 19.5Z"
                    fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_4450_16776">
                    <rect width="36" height="36" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
      </div>
    </drag>
    <!-- </flowy-drag-handle> -->
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
export default {
  props: ["remove", "node", "title", "icons", "description"],
  components: {
    BButton,
  },
  methods: {
    handleChildDragstart(title, event) {
      event.stopPropagation();
    },
  },
  created() {
    addEventListener('stop', (event) => {
      alert('stop listener call----------')

    });
  }
};
</script>

<style scoped>
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
</style>