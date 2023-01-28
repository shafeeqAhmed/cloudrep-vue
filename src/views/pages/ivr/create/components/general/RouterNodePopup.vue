<template>
  <div>
    <div class="">
      <div class="">
        <b-button
          :id="popOverId"
          class="popover-btn"
          @click="onOpen(parentId)"
        >
          <feather-icon
            icon="FilterIcon"
            class="cursor-pointer"
            size="18"
          />
        </b-button>
      </div>

      <b-popover
        :target="popOverId"
        :show.sync="show"
        custom-class="route_filter_modal"
      >
        <div class="route_condition">
          <h4
            class="mt-2 mb-1 d-flex align-items-center justify-content-between"
          >
            Condition
            <feather-icon
              icon="XIcon"
              class="cursor-pointer"
              size="21"
              @click="onClose"
            />
          </h4>
          <!--============================================================================-->
          <!--============================================================================-->
          <div
            class=""
            v-for="(condition, key) in conditions"
            :key="key"
          >
            <!--==============================-->
            <div
              class="d-flex align-items-center justify-content-center mt-1 mb-1"
              v-if="key != 0"
            >
              <hr />
              <p class="m-0 mr-1 ml-1">{{ condition.operation }}</p>
              <hr />
            </div>

            <!--==============================-->
            <!--==============================-->
            <div class="route_condition_card">
              <div
                class="d-flex align-items-center justify-content-end mb-1"
                v-if="key != 0"
              >
                <div class="">
                  <feather-icon
                    icon="XIcon"
                    @click="removeFilterCondition(key)"
                    class="cursor-pointer"
                    size="21"
                  />
                </div>
              </div>
              <div class="">
                <div class="input-gradient mb-1">
                  <v-select
                    :options="tags"
                    v-model="condition.tag"
                    label="name"
                    :reduce="(list) => list.uuid"
                    @input="getTagFilters($event, key)"
                    placeholder="Select Tag"
                  ></v-select>
                </div>
                <div class="input-gradient mb-1">
                  <v-select
                    :options="condition.operators"
                    v-model="condition.operator"
                    :reduce="(list) => list.uuid"
                    label="name"
                    placeholder="Operators"
                  ></v-select>
                </div>
                <div class="router_states">
                  <div class="left_state_box">
                    <b-list-group>
                      <b-list-group-item
                        v-for="(state, stateIndex) in condition.states"
                        :ref="`state-${stateIndex}${key}`"
                        :key="stateIndex"
                        @click="
                          selectOperatorValue(stateIndex, key, state.name)
                        "
                        >{{ state.name }}</b-list-group-item
                      >
                    </b-list-group>
                  </div>
                  <div class="center_state_box">
                    <div class="mb-1">
                      <feather-icon
                        icon="ArrowRightIcon"
                        class="cursor-pointer"
                        size="21"
                        @click="assignAllOperatorValue(key)"
                      />
                    </div>
                    <div class="mb-1">
                      <feather-icon
                        icon="RepeatIcon"
                        class="cursor-pointer"
                        size="21"
                      />
                    </div>
                    <div class="mb-1">
                      <feather-icon
                        icon="ArrowLeftIcon"
                        class="cursor-pointer"
                        size="21"
                        @click="removeAllOperatorValue(key)"
                      />
                    </div>
                  </div>
                  <div class="right_state_box">
                    <b-list-group>
                      <b-list-group-item
                        v-for="(state, valueIndex) in condition.val"
                        :key="valueIndex"
                        @click="removeOperatorValue(valueIndex, key, state)"
                        >{{ state }}</b-list-group-item
                      >
                    </b-list-group>
                  </div>
                </div>
              </div>
            </div>
            <!--==============================-->
            <!--==============================-->
            <!-- <div class="d-flex align-items-center justify-content-center mt-1 mb-1">
              <hr />
              <p class="ml-1 mr-1 mb-0">and</p>
              <hr />
            </div> -->
            <!--==============================-->
            <!--==============================-->
          </div>
          <!--============================================================================-->
          <!--============================================================================-->
          <div class="router_rule mt-2">
            <b-button
              variant="primary"
              class="mr-1"
              @click="addCondition('or')"
              >ADD OR RULE</b-button
            >
            <b-button
              variant="primary"
              class="mr-1"
              @click="addCondition('and')"
              >ADD AND RULE</b-button
            >
            <b-button
              variant="primary"
              @click="onClose"
              >skip</b-button
            >
          </div>

          <div class="router_rule mt-2">
            <b-button
              variant="primary"
              @click="saveFilterRecord"
              >Apply Filter</b-button
            >
          </div>
        </div>
        <!-- <div class="bottom_modal mt-2 w-100">
                <b-button variant="primary" class="mr-1">Add Filter</b-button>
                <b-button variant="primary">skip</b-button>
            </div> -->
      </b-popover>
    </div>
  </div>
</template>

<script>
import {
  BPopover,
  BButton,
  BFormInput,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";
import { FilterIcon } from "vue-feather-icons";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";

export default {
  props: ["parentId", "popOverId", "type", "ivr_builder_uuid"],
  directives: {
    Ripple,
  },
  components: {
    BPopover,
    BButton,
    BFormInput,
    vSelect,
    BListGroup,
    BListGroupItem,
  },

  data() {
    return {
      tags: [],
      conditions: [
        {
          operators: [],
          val: [],
          operator: "",
          tag: "",
          operation: "and",
          states: [],
          preSelectedStates: [],
        },
      ],

      show: false,
      isStateDrodown: 0,
    };
  },
  computed: {
    activeParentId() {
      return this.$store.state.ivrBuilder.activeParentId;
    },
    activeFilterId() {
      return this.$store.state.ivrBuilder.activeFilterId;
    },
  },
  methods: {
    removeFilterCondition(index) {
      this.conditions.splice(index, 1);
    },
    selectOperatorValue(stateIndex, filtrIndex, name) {
      this.conditions[filtrIndex].states.splice(stateIndex, 1);
      this.conditions[filtrIndex].val.push(name);
    },
    removeOperatorValue(stateIndex, filtrIndex, name) {
      this.conditions[filtrIndex].val.splice(stateIndex, 1);
      this.conditions[filtrIndex].states.push({ name: name });
      this.conditions[filtrIndex].states.reverse();
    },
    assignAllOperatorValue(key) {
      const list = this.$store.state.ivrBuilder.states.map((data) => {
        return data.name;
      });

      this.conditions[key].val = { ...list };
      this.conditions[key].states = [];
    },
    removeAllOperatorValue(key) {
      this.conditions[key].val = [];
      this.conditions[key].states = [...this.$store.state.ivrBuilder.states];
    },
    addCondition(condition) {
      this.conditions.push({
        operators: [],
        val: [],
        tag: "",
        operator: "",
        operation: condition,
        states: [],
        preSelectedStates: [],
      });
    },
    onOpen(parentId) {
      this.$root.$emit("bv::hide::popover");
      this.show = !this.show;
      this.conditionTags(this.ivr_builder_uuid);
    },
    onClose() {
      this.conditions.forEach((data) => {
        data.val = [];
        data.operator = "";
        data.tag = "";
        data.states = [];
        data.preSelectedStates = [];
      });
      this.show = false;
    },
    add(parentId, title) {
      this.$store.commit("ivrBuilder/UPDATE_NEW_NODE", {
        parentId: parentId,
        title: title,
        type: this.type,
      });
      this.show = false;

      this.$emit("selectNode", this.type);
    },
    conditionTags(ivr_builder_uuid) {
      if (this.$store.state.ivrBuilder.tags.length == 0) {
        this.$store.dispatch("ivrBuilder/getTags").then(() => {
          this.tags = this.$store.state.ivrBuilder.tags;
        });
      } else {
        this.tags = this.$store.state.ivrBuilder.tags;
      }

      this.$store
        .dispatch("ivrBuilder/getFilterRecord", ivr_builder_uuid)
        .then(() => {
          const filterRecord = this.$store.state.ivrBuilder.filterRecord;
          if (filterRecord.length != 0) {
            this.conditions = [];
            filterRecord.forEach((value, index) => {
              this.conditions.push({
                operators: value["operators"],
                val: value["tag_operator_value"],
                tag: value["tag_uuid"],
                operator: value["tag_operator_uuid"],
                operation: value["type"],
                states: value["states"],
                preSelectedStates: [],
              });
            });
          }
        });
    },
    getTagFilters(value, key) {
      this.conditions[key].operator = "";
      this.$store.dispatch("ivrBuilder/getTagFilters", value).then(() => {
        this.conditions[key].operators =
          this.$store.state.ivrBuilder.tagsFilters;
      });

      const tag = this.$store.state.ivrBuilder.tags.find(
        (data) => data.uuid === value
      );

      if (tag.value === "state") {
        if (this.$store.state.ivrBuilder.states.length == 0) {
          this.$store.dispatch("ivrBuilder/getStates").then(() => {
            this.conditions[key].states = [
              ...this.$store.state.ivrBuilder.states,
            ];

            // this.isStateDrodown = 1;
          });
        } else {
          this.conditions[key].states = [
            ...this.$store.state.ivrBuilder.states,
          ];
        }
      }
    },
    saveFilterRecord() {
      const payload = {
        filters: [],
        ivr_builder_uuid: this.ivr_builder_uuid,
      };
      this.conditions.forEach((element) => {
        payload.filters.push({
          tag_uuid: element.tag,
          tag_operator_uuid: element.operator,
          tag_operator_value: element.val,
          type: element.operation,
          campaign_uuid: "",
        });
      });

      this.$store.dispatch("ivrBuilder/storeIvrFilterRecord", payload);
      this.conditions.forEach((data) => {
        data.val = [];
        data.operator = "";
        data.tag = "";
        data.states = [];
        data.preSelectedStates = [];
      });

      this.onClose();
    },
  },
};
</script>
