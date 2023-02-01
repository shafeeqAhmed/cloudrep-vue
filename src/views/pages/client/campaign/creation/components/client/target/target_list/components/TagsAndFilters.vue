<template>
  <div>
    <div class="">
      <div class="">
        <b-button
          :id="target_uuid"
          class="popover-btn"
          @click="openPopup"
        >
          <feather-icon
            icon="FilterIcon"
            class="cursor-pointer"
            size="18"
          />
        </b-button>
      </div>

      <b-popover
        :target="target_uuid"
        custom-class="route_filter_modal"
        :show.sync="show"
        placement="left"
      >
        <div class="route_condition">
          <h4
            class="mt-1 mb-1 d-flex align-items-center justify-content-between"
          >
            Filter Conditions
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
            <div class="route_condition_card">
              <div
                class="d-flex align-items-center justify-content-end mb-1"
                v-if="key != 0"
              >
                <div class="">
                  <feather-icon
                    icon="XIcon"
                    class="cursor-pointer"
                    @click="removeFilterCondition(key)"
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
                  <div class="input-gradient">
                    <div class="left_state_box">
                      <b-list-group>
                        <b-list-group-item
                          v-for="(state, stateIndex) in condition.states"
                          :ref="`state-${stateIndex}${key}`"
                          :key="`state-${stateIndex}${key}`"
                          @click="
                            selectOperatorValue(stateIndex, key, state.name)
                          "
                          >{{ state.name }}</b-list-group-item
                        >
                      </b-list-group>
                    </div>
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
                  <div class="input-gradient">
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
            </div>
          </div>

          <div class="router_rule mt-2 mb-1">
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
              class="mr-1"
              @click="onClose"
              >skip</b-button
            >

            <b-button
              variant="primary"
              @click="saveFilterRecord"
              class="mr-1"
              >Apply Filter</b-button
            >
          </div>
        </div>
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
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  props: ["target_uuid"],
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
  mixins: [toastAlert],
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

  methods: {
    removeFilterCondition(index) {
      this.conditions.splice(index, 1);
    },
    openPopup() {
      this.$root.$emit("bv::hide::popover");
      this.show = !this.show;
      this.conditionTags();
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
      const list = this.$store.state.clientCampaign.states.map((data) => {
        return data.name;
      });

      this.conditions[key].val = { ...list };
      this.conditions[key].states = [];
    },
    removeAllOperatorValue(key) {
      this.conditions[key].val = [];
      this.conditions[key].states = [
        ...this.$store.state.clientCampaign.states,
      ];
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
    conditionTags() {
      if (this.$store.state.clientCampaign.tags.length == 0) {
        this.$store.dispatch("clientCampaign/getTags").then(() => {
          this.tags = this.$store.state.clientCampaign.tags;
        });
      } else {
        this.tags = this.$store.state.clientCampaign.tags;
      }

      this.assignValue();
    },
    getTagFilters(value, key) {
      this.conditions[key].operator = "";
      this.$store.dispatch("clientCampaign/getTagFilters", value).then(() => {
        this.conditions[key].operators =
          this.$store.state.clientCampaign.tagsFilters;
      });

      const tag = this.$store.state.clientCampaign.tags.find(
        (data) => data.uuid === value
      );

      if (tag.value === "state") {
        if (this.$store.state.clientCampaign.states.length == 0) {
          this.$store.dispatch("clientCampaign/getStates").then(() => {
            this.conditions[key].states = [
              ...this.$store.state.clientCampaign.states,
            ];

            this.isStateDrodown = 1;
          });
        } else {
          this.conditions[key].states = [
            ...this.$store.state.clientCampaign.states,
          ];
        }
      }
    },
    saveFilterRecord() {
      const payload = {
        filters: [],
        ivr_builder_uuid: 0,
        campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        target_uuid: this.target_uuid,
      };

      var isError = 0;
      for (const [index, element] of this.conditions.entries()) {
        if (
          element.tag === "" ||
          element.operator === "" ||
          element.val.length == 0
        ) {
          isError = 1;
        } else {
          payload.filters.push({
            tag_uuid: element.tag,
            tag_operator_uuid: element.operator,
            tag_operator_value: element.val,
            type: element.operation,
          });
        }
      }

      if (isError == 1) {
        this.conditionalToast(
          "danger",
          "Error",
          "Please select Tag, Operator and State!",
          "error"
        );
      } else {
        this.$store
          .dispatch("clientCampaign/storeCampaignFilterRecord", payload)
          .then(() => {
            this.assignValue();
          });

        this.onClose();
      }

      // this.conditions.forEach((data) => {
      //   data.val = [];
      //   data.operator = "";
      //   data.tag = "";
      //   data.states = [];
      //   data.preSelectedStates = [];
      // });
    },
    assignValue() {
      let payload = {
        campaign_uuid: this.$store.state.clientCampaign.campaignUuid,
        target_uuid: this.target_uuid,
      };

      this.$store
        .dispatch("clientCampaign/getFilterRecord", payload)
        .then(() => {
          const filterRecord = this.$store.state.clientCampaign.filterRecord;
          if (filterRecord.length != 0) {
            this.conditions = [];
            filterRecord.forEach((value, index) => {
              this.$store.commit(
                "clientCampaign/UPDATE_STATES",
                value["states"]
              );

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
  },
};
</script>
