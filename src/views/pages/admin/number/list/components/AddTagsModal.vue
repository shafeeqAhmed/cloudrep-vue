<template>
  <div>
    <b-modal
      id="add-tag"
      centered
      modal-class="modal-number"
      hide-header
      hide-footer
    >
      <validation-observer
        ref="createNumberTagsForm"
        #default="{ invalid }"
      >
        <b-form>
          <b-row class="align-items-center mt-2 mb-1">
            <b-col cols="2">
              <div class="d-flex align-items-center">
                <label for="">Name</label>
                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col cols="10">
              <validation-provider
                #default="{ errors }"
                name="Name"
                vid="name"
                rules="required"
              >
                <div class="input-gradient">
                  <b-form-input
                    id="name"
                    v-model="tag.name"
                    placeholder="Enter Name"
                  ></b-form-input>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row class="align-items-center mb-1">
            <b-col sm="2">
              <div class="d-flex align-items-center">
                <label for="">Tag</label>
                <feather-icon
                  icon="HelpCircleIcon"
                  size="20"
                  class="ml-1 cursor-pointer"
                />
              </div>
            </b-col>
            <b-col sm="4">
              <b-form-group class="m-0">
                <div class="input-gradient">
                  <b-form-input
                    id="tag_name"
                    v-model="tag.key"
                    placeholder="Enter Tag name"
                  >
                  </b-form-input>
                </div>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group class="m-0">
                <div class="input-gradient">
                  <b-form-input
                    id="tag_value"
                    v-model="tag.value"
                    placeholder="Enter Value"
                  >
                  </b-form-input>
                </div>
              </b-form-group>
            </b-col>

            <!-- <div>
                            <span v-for="(value, tag, index) in tags" :key="tag"> {{ index }}. {{ tag }}: {{ value }} </span>
                        </div> -->
            <b-col sm="3">
              <b-button
                variant="primary"
                :class="{ 'no-drop': isDisabledTagButton }"
                @click="addTag"
                >ADD TAG</b-button
              >
            </b-col>
            <b-col
              cols="12"
              class="mt-2"
            >
              <div
                v-for="(list, key) in tag.lists"
                class="tag_num"
                :key="key"
              >
                <span>{{ list.key }}</span>
                : <span>{{ list.value }}</span>
                <feather-icon
                  icon="XIcon"
                  @click="removeTag(key)"
                  size="21"
                  class="cursor-pointer ml-1"
                />
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            {{ tag.list }}
            <b-col
              sm="3"
              cols="6"
            >
              <b-button
                class="secondary-btn w-100"
                @click="storeTwilioNumberTags"
                >Save</b-button
              >
            </b-col>
            <b-col
              sm="3"
              cols="6"
            >
              <b-button
                class="secondary-btn w-100"
                @click="$bvModal.hide('add-tag')"
                >Cancel</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormSelect,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
} from "bootstrap-vue";

import { globalHelper } from "@core/mixins/ui/global";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import _ from "lodash";
import { data } from "vue-echarts";

export default {
  props: ["editRecord", "refetchData"],
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormSelect,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    vSelect,
    ToastificationContent,
  },
  mixins: [globalHelper, toastAlert],
  computed: {
    isDisabledTagButton() {
      return this.tag.key == "" && this.tag.value == "";
    },
  },
  watch: {
    editRecord() {
      this.tag.twilio_number_uuid = this.editRecord.uuid;
      this.tag.name = this.editRecord.name;
      this.tag.lists = this.editRecord.tags;
    },
  },
  data() {
    return {
      tag: {
        name: "",
        key: "",
        value: "",
        twilio_number_uuid: "",
        lists: [],
      },
    };
  },
  methods: {
    addTag() {
      const nodeIndex = _.findIndex(this.tag.lists, { key: this.tag.key });
      if (nodeIndex == -1) {
        this.tag.lists.push({ key: this.tag.key, value: this.tag.value });
        this.tag.key = "";
        this.tag.value = "";
      }
    },
    removeTag(index) {
      this.tag.lists.splice(index, 1);
    },

    storeTwilioNumberTags() {
      this.tag.twilio_number_uuid = this.editRecord.uuid;
      this.$refs.createNumberTagsForm.validate().then((success) => {
        if (success) {
          const { key, value, ...data } = this.tag;
          this.$store
            .dispatch("manageNumbers/storeTwilioNumberTag", data)
            .then((res) => {
              this.refetchData();
              this.$bvModal.hide("add-tag");
            });
        }
      });
    },
  },
};
</script>
