import Vue from "vue";
import FeatherIcon from "@core/components/feather-icon/FeatherIcon.vue";

import DemoBlock from "./views/pages/ivr/create/components/demoBlock.vue";
import DemoNode from "./views/pages/ivr/create/components/demoNode.vue";
import NodePopover from "./views/pages/ivr/create/components/general/nodePopover.vue";
import ChildNodeMenu from "./views/pages/ivr/create/components/general/ChildNodeMenu.vue";
import HeaderGotoIcon from "./views/pages/ivr/create/components/general/HeaderGotoIcon.vue";
import NodeHeadTitle from "./views/pages/ivr/create/components/general/NodeHeadTitle.vue";
import IncomingCallingCamponent from "./views/pages/contact-center/caling/IncomingCallingCamponent.vue";
import { Drag, Drop } from "vue-drag-drop";

Vue.component("demo-block", DemoBlock);
Vue.component("demo-node", DemoNode);
Vue.component("node-popover", NodePopover);
Vue.component("child-node-menu", ChildNodeMenu);
Vue.component("header-goto-icon", HeaderGotoIcon);
Vue.component("node-head-title", NodeHeadTitle);
Vue.component("incoming-calling-component", IncomingCallingCamponent);

Vue.component("drag", Drag);
Vue.component("drop", Drop);
Vue.component(FeatherIcon.name, FeatherIcon);
