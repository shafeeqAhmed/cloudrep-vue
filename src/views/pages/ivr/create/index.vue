
<template>
  <div>
    <div class="ivr-builder">
      <div class="ivr-build-left">
        <div class="w-100">
          <div class="ivr-builder-header d-flex align-items-end mb-3">
            <div class="w-50">
              <ivrheader :name="ivrName" />
            </div>
            <div class="w-50">

              <b-button @click="toggal(false)" class="ivrec-btn">
                <img src="@/assets/images/icons/up.png" alt="">
                Close Nodes
              </b-button>
              <b-button @click="toggal(true)" class="ivrec-btn">
                <img src="@/assets/images/icons/down.png" alt="">
                Expand Nodes
              </b-button>
              <b-button @click="saveIvrNodes()" :disabled="isNodesContainError" class="ivrec-btn ivrec-btn-disab">
                <feather-icon icon="SaveIcon" class="mr-1" size="21" />
                Save
              </b-button>

            </div>
          </div>
          <div class="ivr-nodedrag-btn mt-2 mb-2">
            <flowy-new-block v-for="(block, index) in blocks" :key="index" class="" @drag-start="onDragStartNewBlock"
              @drag-stop="onDragStopNewBlock">
              <template v-slot:preview="{}">
                <demo-block :title="block.preview.title" :icons="block.preview.icons"
                  :description="block.preview.description" />
              </template>
              <template v-slot:node="{}">
                <demo-node :title="block.node.title" :description="block.node.description"
                  :custom-attribute="block.node.canBeAdded" :blocks="blocks" />
              </template>
            </flowy-new-block>
          </div>

          <!-- draggable--is-dragging -->
          <div v-if="getNodes.length == 0">
            <drop @drop="handleDrop" @dragover="handleOver" @dragleave="handleLeave">

              <div class="ivr-box-build " id="testIvr" :class="{ 'draggable--is-dragging': isDragged }">
                <b-row class="dropIconArea">
                  <b-col md="12" class="d-flex justify-content-center align-items-start">
                    <div class="text-center align-self-center" v-if="getNodes.length == 0">
                      <img src="@/assets/images/ivr/dropIcon.png" />
                      <p class="mt-2">Drag and Drop Node Here to Build an IVR Tree</p>
                    </div>
                    <div v-else class="flex-grow overflow-auto" style="width: 100%">
                      <flowy class="q-mx-auto" :nodes="getNodes" :beforeMove="beforeMove" :beforeAdd="beforeAdd"
                        @add="add" @move="move" @drag-start="onDragStart"></flowy>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </drop>
          </div>
          <div v-else class="ivr-box-build " id="testIvr" :class="{ 'draggable--is-dragging': isDragged }">
            <b-row class="dropIconArea">
              <b-col md="12" class="d-flex justify-content-center align-items-start">
                <div class="text-center" v-if="getNodes.length == 0">
                  <img src="@/assets/images/ivr/dropIcon.png" />
                  <p class="mt-2">Drag and Drop Node Here to Build an IVR Tree</p>
                </div>
                <div class="flex-grow overflow-auto" style="width: 100%" v-else>
                  <flowy class="q-mx-auto" :nodes="getNodes" :beforeMove="beforeMove" :beforeAdd="beforeAdd"
                    @drag-start="onDragStart">
                  </flowy>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
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
  BModal,
  VBModal,
} from "bootstrap-vue";
import Vue from "vue";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import store from "../store";
import Ripple from "vue-ripple-directive";
Vue.use(VueLodash, { name: "custom", lodash: lodash });
import ivrheader from "./components/ivrheader.vue";
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  components: {
    ivrheader,
    BRow,
    BCol,
    BForm,
    BCard,
    BButton,
    BCardText,
    BFormInput,
    BModal,
    VBModal,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  computed: {
    ids() {
      return this.$store.state.ivrBuilder.allCollapseIds
    },
    getNodes() {
      return this.$store.state.ivrBuilder.nodes
    },
    isNodeHaveChild() {
      return this.$store.getters['ivrBuilder/isNodeHaveChild']
    },
    ivrUuid() {
      return this.$store.state.ivrBuilder.ivrUuid
    },
    isNodesContainError() {
      return this.$store.state.ivrBuilder.isNodesContainError
    }
  },
  mixins: [toastAlert],
  data: () => ({
    isDragged: false,
    allCollapseIds: [],
    parentNode: {
      id: "1",
      parentId: -1,
      type: -1,
      nodeComponent: "demo-node",
      isOpen: true,
      isActiveGoTo: false,
      destinationNodeId: '',
      gotoSourceNodeId: [],
      blinkHeader: false,
      parentLabel: '',
      formData: [],
      formErrors: [],
      errorCount: 0,
      ivrUuid: '',
      node_type: '',
      filters: [],
      data: {
        text: "",
        title: "",
        description: "",
      },
    },
    holder: [],
    dragging: false,
    blocks: [
      {
        preview: {
          title: "Dial",
          icons: "PhoneCallIcon",
        },
        node: {
          title: "Dial",
          description: "<span>Dial Node.</span>",
        },
      },
      {
        preview: {
          title: "Gather",
          icons: "GridIcon",
        },
        node: {
          title: "Gather",
          description: "<span>Gather Node.</span>",
        },
      },
      {
        preview: {
          title: "Go To",
          icons: "RepeatIcon",
        },
        node: {
          title: "Go To",
          description: "<span>Go To Node.</span>",
        },
      },
      {
        preview: {
          title: "Hangup",
          icons: "PhoneIcon",
        },
        node: {
          title: "Hangup",
          description: "<span>Hangup Node.</span>",
        },
      },
      {
        preview: {
          title: "Menu",
          icons: "AlignLeftIcon",
        },
        node: {
          title: "Menu",
          description: "<span>Menu Node.</span>",
        },
      },
      {
        preview: {
          title: "Play",
          icons: "PlayIcon",
        },
        node: {
          title: "Play",
          description: "<span>Play Node.</span>",
        },
      },
      {
        preview: {
          title: "Voicemail",
          icons: "Volume2Icon",
        },
        node: {
          title: "Voicemail",
          description: "<span>Voicemail Node.</span>",
        },
      },
      {
        preview: {
          title: "Router",
          icons: "Share2Icon",
        },
        node: {
          title: "Router",
          description: "<span>Router Node.</span>",
        },
      },
      // {
      //   preview: {
      //     title: "Peach",
      //   },
      //   node: {
      //     title: "Peach",
      //     description: "Triggers after a specified <b>amount</b> of time",
      //     canBeAdded: false,
      //   },
      // },
    ],
    nodes: [],
    ivrName: 'New Ivr'
  }),

  methods: {
    saveIvrNodes() {
      if (!this.isNodesContainError) {
        //update the nodes action uuids in formData
        this.updateNodeAction()
        let data = {}
        const { nodes, ivrName, ivrUuid } = this.$store.state.ivrBuilder

        const nodesList = nodes.map(node => {
          return node.formData
        })
        data['nodes'] = nodesList
        data['ivr_uuid'] = ivrUuid
        data['ivr_name'] = ivrName
        this.$store.dispatch('ivrBuilder/saveIvrNodes', data)
      }
    },
    getChildNodeUUid(node, type) {
      const record = this.$store.getters["ivrBuilder/isChildExist"](node.id, type);

      if (record) {
        return record.id
      } else {
        return ''
      }
    },
    updateNodeAction() {
      const { nodes } = this.$store.state.ivrBuilder
      nodes.forEach((node) => {
        const actions = this.getNodeAction(node)
        if (Object.keys(actions).length > 0) {
          Object.assign(node.formData, actions)
        }
      })
      this.$store.commit('ivrBuilder/UPDATE_NODES', nodes)
    },
    getNodeAction(node) {
      var action = {}
      if (['dial', 'goto'].includes(node.node_type)) {
        action.on_failer = this.getChildNodeUUid(node, 'fail')


      } else if (['play', 'voicemail'].includes(node.node_type)) {
        action.on_success = this.getChildNodeUUid(node, 'success')


      } else if (node.node_type == 'gather') {

        action.on_failer = this.getChildNodeUUid(node, 'fail')
        action.on_success = this.getChildNodeUUid(node, 'success')

      } else if (node.node_type == 'menu') {

        action.on_failer = this.getChildNodeUUid(node, 'fail')
        action.on_success = this.getChildNodeUUid(node, 'success')
        action.press_0 = this.getChildNodeUUid(node, '0')
        action.press_1 = this.getChildNodeUUid(node, '1')
        action.press_2 = this.getChildNodeUUid(node, '2')
        action.press_3 = this.getChildNodeUUid(node, '3')
        action.press_4 = this.getChildNodeUUid(node, '4')
        action.press_5 = this.getChildNodeUUid(node, '5')
        action.press_6 = this.getChildNodeUUid(node, '6')
        action.press_7 = this.getChildNodeUUid(node, '7')
        action.press_8 = this.getChildNodeUUid(node, '8')
        action.press_9 = this.getChildNodeUUid(node, '9')

      }
      return action
    },
    handleDrop(title) {
      const lowerCasetitle = title.replace(/\s/g, "").toLowerCase()

      this.isDragged = false
      if (this.getNodes.length === 0) {
        if (lowerCasetitle == 'goto') {
          this.errorToast('Error', "Go To node can not added as the root node")
          return true
        }
        this.parentNode.data.title = title
        this.parentNode.data.description = title;
        this.parentNode.node_type = lowerCasetitle;


        this.$store.dispatch('ivrBuilder/storeIvr').then(() => {
          this.parentNode.ivrUuid = this.$store.state.ivrBuilder.ivrUuid
          const node = {
            ivr_uuid: this.parentNode.ivrUuid,
            parent_uuid: null,
            type: -1,
            node_type: lowerCasetitle,
          }
          this.registerParentNode(node)

        })

      }
    },
    registerParentNode(parentNodeData) {

      this.$store.dispatch('ivrBuilder/registerNode', parentNodeData).then(response => {
        const { data: { data: { uuid } } } = response
        this.parentNode.id = uuid

        this.parentNode.filters = []
        this.$store.dispatch('ivrBuilder/addNode', this.parentNode)
      })
    },

    handleOver(event) {
      if (this.getNodes.length === 0) {
        this.isDragged = true
      }

    },
    handleLeave(event) {
      if (this.getNodes.length === 0) {
        this.isDragged = false
      }
    },
    toggal(val) {
      this.getNodes.forEach((el) => {
        el.isOpen = val
      })
    },
    customAdd(node) {
      const id = this.generateId()
      const newNode = {
        id: this.generateId(),
        isOpen: true,
        isActiveGoTo: false,
        destinationNodeId: '',
        gotoSourceNodeId: [],
        blinkHeader: false,
        parentLabel: node.title,
        parentId: node.parentId,
        type: node.type,
        nodeComponent: "demo-node",
        formData: [],
        formErrors: [],
        errorCount: 0,
        ivrUuid: this.$store.state.ivrBuilder.ivrUuid,
        node_type: node.title.replace(/\s/g, "").toLowerCase(),
        filters: [],
        data: {
          text: node.title,
          title: node.title,
          description: `<span>${node.title}</span>`,
        },
      }

      // register node
      const registerNode = {
        ivr_uuid: newNode.ivrUuid,
        parent_uuid: node.parentId,
        type: node.type,
        node_type: node.title.replace(/\s/g, "").toLowerCase(),
      }

      this.$store.dispatch('ivrBuilder/registerNode', registerNode).then(response => {
        //remove connection error from  parent node
        // this.$store.commit('ivrBuilder/UPDATE_NODE_MISSING_CONNECTION_ERROR', { nodeId: node.parentId })
        const { data: { data: { uuid, parent_type, filters, parent_uuid, type } } } = response
        // this.parentNode.id = uuid
        // this.nodes.push(this.parentNode);
        newNode.id = uuid
        newNode.type = type

        if (parent_type == 'router') {
          this.$store.commit('ivrBuilder/UPDATE_ROUTER_NODE_FILTER', { uuid: parent_uuid, filters })
          //assign type to child of router node
        }

        this.$store.dispatch('ivrBuilder/addNode', {
          id,
          ...newNode,
        })

      })

    },

    onDragStartNewBlock(event) {
      // this.dragCount++
      // const { props } = event;
      // this.newDraggingBlock = props;

      // if (this.nodes.length == 0 && this.dragCount === 2) {
      //   this.parentNode.data.title = props.title;
      //   this.parentNode.data.description = props.description;
      // }
      // if (this.dragCount > 2) {
      //   this.addParentNode();
      // }
    },
    onDragStopNewBlock(event) {
      console.log("onDragStopNewBlock", event);
      this.newDraggingBlock = null;
    },

    // REQUIRED
    beforeMove({ to, from }) {

      // called before moving node (during drag and after drag)
      // indicator will turn red when we return false
      // from is null when we're not dragging from the current node tree
      console.log("beforeMove", to, from);
      // we cannot drag upper parent nodes in this demo
      if (from && from.parentId === -1) {
        return false;
      }
      // we're adding a new node (not moving an existing one)
      if (from === null) {
        // we've passed this attribute to the demo-node
        if (this.newDraggingBlock["custom-attribute"] === false) {
          return false;
        }
      }
      return true;
    },
    // REQUIRED
    beforeAdd({ to, from }) {
      // called before moving node (during drag and after drag)
      // indicator will turn red when we return false
      // from is null when we're not dragging from the current node tree
      console.log("beforeAdd", to, from);
      // we've passed this attribute to the demo-node
      if (this.newDraggingBlock["custom-attribute"] === false) {
        return false;
      }
      return true;
    },
    randomInteger() {
      return Math.floor(Math.random() * 10000) + 1;
    },
    generateId(nodes) {
      let id = this.randomInteger();
      // _.find is a lodash function
      while (_.find(nodes, { id }) !== undefined) {
        id = this.randomInteger();
      }
      return id;
    },
    addNode(_event) {
      // const id = this.generateId();
      // _event.node.isOpen = true
      // this.nodes.push({
      //   ..._event.node,
      //   id,
      // });
    },
    remove(event) {
      // console.log("remove", event);
      // // node we're dragging to
      // const { node } = event;
      // // we use lodash in this demo to remove node from the array
      // const nodeIndex = _.findIndex(this.nodes, { id: node.id });

      // if (this.nodes[nodeIndex].parentId === -1) {
      //   this.nodes = [];
      // } else {
      //   this.nodes.splice(nodeIndex, 1);
      // }
    },
    move(event) {
      console.log("move", event);
      // node we're dragging to and node we've just dragged
      const { dragged, to } = event;
      // change panentId to id of node we're dragging to
      dragged.parentId = to.id;
    },
    add(event) {
      // console.log("you are here! add event=============================");
      // // every node needs an ID
      // const id = this.generateId();
      // // for collapse
      // event.node.isOpen = true
      // // add to array of nodes
      // this.nodes.push({
      //   id,
      //   ...event.node,
      // });
    },
    onDragStart(event) {
      console.log("onDragStart", event);
      this.dragging = true;
    },
  },
  watch: {
    "$store.state.ivrBuilder.newNode": function (newVal, oldVal) {
      if (Object.keys(newVal).length > 0) {
        this.customAdd(newVal);
      }
    },
  },
  created() {
    const APP_STORE_MODULE_NAME = "ivrBuilder";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, store);
    }

    this.$store.dispatch('ivrBuilder/getIvrDialRouting')

    if (this.$route.query.hasOwnProperty('uuid')) {
      this.$store.commit('ivrBuilder/UPDATE_IS_EDITED', true)
      this.$store.dispatch('ivrBuilder/getIvr', { uuid: this.$route.query.uuid }).then(() => {
        // update ivr name
        this.ivrName = this.$store.state.ivrBuilder.ivrName
        setTimeout(() => {
          this.$store.commit('ivrBuilder/UPDATE_IS_EDITED', false)
        }, 3000);

      })

    }
  },
  destroyed() {
    this.$store.commit('ivrBuilder/CLEAN_IVR_STATE')
    // UnRegister on leave
    const APP_STORE_MODULE_NAME = "ivrBuilder";
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/ivrStyles/_Style.scss";
</style>