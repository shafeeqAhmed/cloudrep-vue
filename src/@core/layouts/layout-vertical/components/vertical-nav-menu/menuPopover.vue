<template>
  <div>
    <div class="text-center pt-2">
      <b-button id="popover-target-1">
        <b-img src="@/assets/images/website/add-icon.png" class="addFavMenuImg">
        </b-img>
      </b-button>
      <b-popover
        target="popover-target-1"
        triggers="focus"
        class="bPopoverMenu"
      >
        <div class="popover-ivr-btn">
          <div class="popoverMenuList" v-for="(items, index) in navMenuItems" :key="index" >
            <b-button @click="addMenu(items)">{{ items.title }}</b-button>
          </div>
        </div>
      </b-popover>
    </div>
  </div>

  <!-- <li>
              <a href="#">
                <div>
                  <feather-icon class="user-icon mr-1" icon="UserIcon" size="20" />
                  <span>Staff Management</span>
                </div>
                <div class="">
                  <feather-icon class="plus-icon" icon="PlusCircleIcon" size="20" />
                  <feather-icon class="minus-icon d-none" icon="MinusCircleIcon" size="20" />
                </div>
              </a>
              <ul class="sub-fav-menu">
                <li>
                  <a href="#">
                    <div>
                      <feather-icon class="user-icon mr-1" icon="UserIcon" size="20" />
                      <span>Front Office</span>
                    </div>
                    <div class="">
                      <feather-icon class="plus-icon" icon="PlusCircleIcon" size="20" />
                      <feather-icon class="minus-icon d-none" icon="MinusCircleIcon" size="20" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div>
                      <feather-icon class="user-icon mr-1" icon="UserIcon" size="20" />
                      <span>Middle Office</span>
                    </div>
                    <div class="">
                      <feather-icon class="plus-icon" icon="PlusCircleIcon" size="20" />
                      <feather-icon class="minus-icon d-none" icon="MinusCircleIcon" size="20" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div>
                      <feather-icon class="user-icon mr-1" icon="UserIcon" size="20" />
                      <span>Back Office</span>
                    </div>
                    <div class="">
                      <feather-icon class="plus-icon" icon="PlusCircleIcon" size="20" />
                      <feather-icon class="minus-icon d-none" icon="MinusCircleIcon" size="20" />
                    </div>
                  </a>
                </li>
              </ul>
            </li> -->
</template>

<script>
import { BPopover, BButton, BImg } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  props: ["navMenuItems"],
  directives: {
    Ripple,
  },
  components: {
    BPopover,
    BButton,
    BImg,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    addMenu(item) {
      this.$emit("favMenuItem", item);
    },
  },
};
</script> 
<style lang="scss" scoped>
#__bv_popover_199__ {
  z-index: 99999999999999 !important;
}
.popoverMenuList {
  p {
    cursor: pointer;
  }
}

// .addFavMenuImg{
//     position: absolute;
//     top: 750%;
//     left: 20px;
// }

</style>












