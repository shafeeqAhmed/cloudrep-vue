import axios from "@axios";
import { toastAlert } from "@core/mixins/ui/toast";
import _ from "lodash";
export default {
  namespaced: true,
  state: {
    nodes: [],
    newNode: {},
    activeParentId: "",
    audioPath: "",
    tempGotoNodeId: "",
    voice: ["man", "woman"],
    languages: [
      "da-DK",
      "de-DE",
      "en-AU",
      "en-CA",
      "en-GB",
      "en-IN",
      "en-US",
      "ca-ES",
      "es-ES",
      "es-MX",
      "fi-FI",
      "fr-CA",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "nb-NO",
      "nl-NL",
      "pl-PL",
      "pt-BR",
      "pt-PT",
      "ru-RU",
      "sv-SE",
      "zh-CN",
      "zh-HK",
      "zh-TW",
    ],
    ivrName: "New Ivr",
    ivrUuid: "",
    nodesForConnectionError: ["menu", "goto"],
    isNodesContainError: true,
    isEdited: false,
    routingDropDowns: [],
    tags: [],
    tagsFilters: [],
    states: [],
    filterRecord: [],
  },
  getters: {
    audioPath: (state) => {
      return state.audioPath;
    },

    isChildExist: (state) => (parentId, type) => {
      const res = state.nodes.filter((el) => {
        return el.parentId == parentId && el.type == type;
      });
      if (res.length > 0) {
        return res[0];
      }
      return res;
    },
    getChilds: (state) => (id) => {
      const res = state.nodes.filter((el) => {
        return el.parentId == id;
      });
      return res;
    },
    isNodeHaveChild: (state) => (id) => {
      const index = state.nodes.findIndex((el) => {
        return el.parentId == id;
      });
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    },

    getErrors: (state) => (id) => {
      const index = state.nodes.findIndex((el) => {
        return el.id == id;
      });
      return state.nodes[index].formErrors;
    },
    errorCount: (state) => (id) => {
      const index = state.nodes.findIndex((el) => {
        return el.id == id;
      });
      return state.nodes[index].errorCount;
    },
    getParentNode: (state) => (id) => {
      //find node against id
      const index = state.nodes.findIndex((el) => {
        return el.id == id;
      });

      // find parent id of node
      const { parentId } = state.nodes[index];
      //if node does not contain parent node return empty object
      if (parentId == -1) {
        return {};
      } else {
        //return parent object
        const parentIndex = state.nodes.findIndex((el) => {
          return el.id == parentId;
        });
        return state.nodes[parentIndex];
      }
    },
  },
  mutations: {
    ADD_NODE(state, val) {
      state.nodes.push(val);
    },
    UPDATE_TEMP_GOTO_NODE_ID(state, val) {
      state.tempGotoNodeId = val;
    },
    UPDATE_NODES(state, val) {
      state.nodes = val;
    },
    UPDATE_FILTER_RECORD(state, val) {
      state.filterRecord = val;
    },
    UPDATE_STATES(state, val) {
      state.states = val;
    },
    UPDATE_TAG_FILTERS(state, val) {
      state.tagsFilters = val;
    },
    UPDATE_TAGS(state, val) {
      state.tags = val;
    },
    UPDATE_NEW_NODE(state, val) {
      state.newNode = {};
      state.newNode = val;
    },
    UPDATE_ACTIVE_PARENT_ID(state, val) {
      state.activeParentId = val;
    },

    UPDATE_AUDIO_PATH(state) {
      state.audioPath = val;
    },
    UPDATE_GOTO_NODE(state, node) {
      state.tempGotoNodeId = node.id;
      state.nodes.forEach((el) => {
        if (el.id == node.id) {
          el.isActiveGoTo = false;
        } else {
          el.isActiveGoTo = !el.isActiveGoTo;
        }
      });
    },
    UPDATE_SELECT_GOTO_NODE(state, node) {
      const gotoNodeId = state.tempGotoNodeId;

      //upon again reselection un select reference from distination node
      state.nodes.forEach((el) => {
        if (el.gotoSourceNodeId?.includes(gotoNodeId)) {
          const tempArray = Object.entries(el.gotoSourceNodeId).map((entry) => {
            return entry[1];
          });
          const index = tempArray.indexOf(gotoNodeId);
          tempArray.splice(index, 1);
          el.gotoSourceNodeId = tempArray;
        }
      });

      state.nodes.forEach((el) => {
        //update destinationNodeId inside source goto node
        if (el.id == gotoNodeId) {
          el.destinationNodeId = node.id;
        }
        // update gotoSourceNodeId inside destination node
        if (el.id == node.id && !el.gotoSourceNodeId?.includes(gotoNodeId)) {
          el.gotoSourceNodeId.push(gotoNodeId);
        }

        //update the click node for reference
        el.isActiveGoTo = false;
      });
    },

    UPDATE_BLINK_GOTO_RESOURCE_FROM_NODE(state, id) {
      state.nodes.forEach((el) => {
        //find the node against id
        if (el.id == id) {
          el.blinkHeader = true;
        }
      });
      setTimeout(() => {
        state.nodes.forEach((el) => {
          //find the node against id
          if (el.id == id) {
            el.blinkHeader = false;
          }
        });
      }, 2000);
    },
    REMOVE_NODE(state, ids) {
      ids.forEach((id) => {
        const nodeIndex = _.findIndex(state.nodes, { id: id });
        state.nodes.splice(nodeIndex, 1);

        //update gotSourceNodeId
        state.nodes.forEach((el) => {
          if (
            el.gotoSourceNodeId &&
            Object.values(el.gotoSourceNodeId).includes(id)
          ) {
            const tempArray = Object.entries(el.gotoSourceNodeId).map(
              (entry) => {
                return entry[1];
              }
            );
            const index = tempArray.indexOf(id);
            tempArray.splice(index, 1);
            el.gotoSourceNodeId = tempArray;
          }
        });
      });
    },
    REMOVE_NODE_FORM_DATA(state, nodeData) {
      const nodeIndex = _.findIndex(state.nodes, { id: nodeData.nodeId });
      state.nodes[nodeIndex].formData = [];
    },
    ADD_NODE_FORM_DATA(state, nodeData) {
      const nodeIndex = _.findIndex(state.nodes, { id: nodeData.nodeId });
      state.nodes[nodeIndex].formData = nodeData;
    },
    UPDATE_NODE_TREE(state, nodeData) {
      const nodeIndex = _.findIndex(state.nodes, { id: nodeData.nodeId });
      state.nodes[nodeIndex].formData = nodeData;
    },
    UPDATE_NODE_ERROR(state, val) {
      const { errors, nodeId } = val;

      const index = state.nodes.findIndex((el) => {
        return el.id == nodeId;
      });

      state.nodes[index].formErrors = errors;
    },
    UPDATE_NODE_MISSING_CONNECTION_ERROR(state, val) {
      const { nodeId } = val;
      if (nodeId != -1) {
        var errorList = {};
        //check node index
        const index = state.nodes.findIndex((el) => {
          return el.id == nodeId;
        });

        const { formErrors } = state.nodes[index];

        const childIndex = state.nodes.findIndex((el) => {
          return el.parentId == nodeId;
        });

        if (childIndex == -1) {
          if (Object.keys(formErrors).length == 0) {
            errorList.childNode = "This node is missing required connection";
          } else {
            formErrors.childNode = "This node is missing required connection";
            errorList = formErrors;
          }
          console.log("----------error list---------------------------");
          console.log(errorList);
          state.nodes[index].formErrors = errorList;
        } else {
          delete formErrors.childNode;
          state.nodes[index].formErrors = formErrors;
        }
        state.nodes[index].errorCount = Object.keys(
          state.nodes[index].formErrors
        ).length;
      }
    },
    UPDATE_IVR_NAME(state, val) {
      state.ivrName = val;
    },
    UPDATE_IVR_UUID(state, val) {
      state.ivrUuid = val;
    },
    CHECK_NODES_ERRORS(state) {
      var isError = false;
      state.nodes.forEach((el) => {
        if (el.formErrors && Object.keys(el.formErrors).length > 0) {
          isError = true;
        }
      });
      state.isNodesContainError = isError;
    },
    CLEAN_IVR_STATE(state) {
      (state.nodes = []),
        (state.newNode = {}),
        (state.activeParentId = ""),
        (state.tempGotoNodeId = ""),
        (state.ivrUuid = ""),
        (state.isNodesContainError = true);
    },
    UPDATE_IS_EDITED(state, val) {
      //if we re-crate the ivr three then we don't need to validate all nodes from backend at once
      state.isEdited = val;
    },
    UPDATE_ROUTING_DROPDOWN(state, val) {
      state.routingDropDowns = val;
    },
    UPDATE_ROUTER_NODE_FILTER(state, obj) {
      const index = state.nodes.findIndex((el) => {
        return el.id == obj.uuid;
      });
      if (index > -1) {
        state.nodes[index].filters = obj.filters;
      }
    },
  },
  actions: {
    reorderRouterFilters(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("reorder-router-filters", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    storeIvrFilterRecord(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("store-tag-filter-conditions", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getStates(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/state-list`)
          .then((response) => {
            const {
              data: { states },
            } = response;
            ctx.commit("UPDATE_STATES", states);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    validateNode({ commit, getters, state }, params) {
      return new Promise((resolve, reject) => {
        const { url, nodeId, ...data } = params;
        axios
          .post(url, data)
          .then((response) => {
            const {
              data: {
                data: { errors },
              },
            } = response;
            commit("UPDATE_NODE_ERROR", {
              nodeId: nodeId,
              errors: errors,
            });

            //update global error bit
            commit("CHECK_NODES_ERRORS");

            const parentNode = getters["getParentNode"](nodeId);

            // if node type is menu then check connection error
            if (state.nodesForConnectionError.includes(params.node_type)) {
              //node errors update
              commit("UPDATE_NODE_MISSING_CONNECTION_ERROR", {
                nodeId: nodeId,
              });
            }

            // if node is not root node and node type is menu then update connection error in parent node
            if (
              Object.keys(parentNode).length > 0 &&
              state.nodesForConnectionError.includes(parentNode.node_type)
            ) {
              //node errors update
              commit("UPDATE_NODE_MISSING_CONNECTION_ERROR", {
                nodeId: parentNode.id,
              });
            }

            const { url, ...nodeData } = params;

            if (Object.keys(errors).length == 0) {
              commit("ADD_NODE_FORM_DATA", nodeData);
            } else {
              commit("REMOVE_NODE_FORM_DATA", nodeData);
            }
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    storeNode(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post(params.url, params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getTags({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .get("get-tags")
          .then((response) => {
            const {
              data: { tags },
            } = response;
            commit("UPDATE_TAGS", tags);

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {});
      });
    },
    getFilterRecord({ commit, state }, ivr_builder_id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-ivr-filter-record?ivr_builder_uuid=${ivr_builder_id}`)
          .then((response) => {
            const {
              data: {
                data: { filters },
              },
            } = response;

            commit("UPDATE_FILTER_RECORD", filters);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {});
      });
    },
    updateNode(ctx, params) {
      const url = params.url;
      delete params.url;
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post(url, params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    storeIvr({ commit, state }) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("store-ivr", { name: state.ivrName })
          .then((response) => {
            const {
              data: {
                data: { ivr },
              },
            } = response;
            commit("UPDATE_IVR_UUID", ivr.uuid);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    registerNode(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post("register-node", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    removeNodes(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post("remove-node", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    addNode({ commit, state }, node) {
      //check error of last node
      commit("ADD_NODE", node);
      //node errors update
      if (state.nodesForConnectionError.includes(node.node_type)) {
        commit("UPDATE_NODE_MISSING_CONNECTION_ERROR", {
          nodeId: node.parentId,
        });
      }
    },
    saveIvrNodes(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .post("save-ivr-nodes", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    fetchIvrs(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`ivrs`, { params: queryParams })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    duplicateIvr(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();

        axios
          .post("duplicate-ivr", params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    deleteIvr(ctx, params) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .delete(`delete-ivr?uuid=${params.uuid}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },
    getIvr({ commit }, params) {
      return new Promise((resolve, reject) => {
        // toastAlert.methods.showLoader();
        axios
          .get(`get-ivr?uuid=${params.uuid}`)
          .then((response) => {
            const {
              data: {
                data: { ivr, nodes },
              },
            } = response;
            commit("UPDATE_NODES", nodes);
            commit("UPDATE_IVR_NAME", ivr.name);
            commit("UPDATE_IVR_UUID", ivr.uuid);
            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    getTagFilters({ commit }, tagId) {
      return new Promise((resolve, reject) => {
        toastAlert.methods.showLoader();
        axios
          .get(`get-tag-operators?tag_uuid=${tagId}`)
          .then((response) => {
            const {
              data: { operators },
            } = response;
            commit("UPDATE_TAG_FILTERS", operators);

            resolve(response);
          })
          .catch((error) => reject(error))
          .finally(() => {
            toastAlert.methods.hideLoader();
          });
      });
    },

    getIvrDialRouting({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`get-ivr-dial-routing`)
          .then((response) => {
            const {
              data: {
                data: { routing },
              },
            } = response;
            commit("UPDATE_ROUTING_DROPDOWN", routing);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
