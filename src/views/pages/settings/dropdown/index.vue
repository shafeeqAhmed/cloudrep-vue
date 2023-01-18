<template>
  <div>
    <b-card class="p-1">
      <b-row class="mb-2">
        <b-col md="10">
            <h1>DropDown List</h1>
            
        </b-col>
        <b-col md="2">
          <b-button
              variant="primary"
              @click.prevent="showModal"
              class="add-u-btn btn-add"
            >
              + Add
            </b-button>
        </b-col>
      </b-row>
      <b-row>
        <!-- entries -->
        <b-col md="8" sm="4" class="my-1">
          <div class="show-listing">
            <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-1">Show</label>
            <div class="input-gradient">
              <b-form-select
              id="perPageSelect"
              v-model="perPage"
              :options="perPageOptions"
              class="page-count-cr"
            />
            </div>
            <label class="d-inline-block text-sm-left ml-1">entries</label>
          </b-form-group>
          </div>
        </b-col>

        <!-- filter -->
        <b-col md="4" class="my-1 justify-content-end">
          <b-form-group class="mb-0">
            <div class="input-gradient">
              <b-input-group>
              <b-form-input
                id="filterInput"
                v-model="searchQuery"
                type="search"
                placeholder="Search..."
              />
            </b-input-group>
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-2">
          <b-table
            responsive
            ref="refUserListTable"
            :items="fetchDropdowns"
            :fields="tableColumns"
            primary-key="id"
            :sort-by.sync="sortBy"
            show-empty
            empty-text="No matching records found"
            :sort-desc.sync="isSortDirDesc"
            class="table-cr"
          >
            <template #cell(actions)="data">
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                class="drop-with-trash"
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body text-success align-middle mr-25"
                  />
                </template>
                <!-- {{data.item.uuid}} -->
                <b-dropdown-item @click="editType(data)">
                  <div class="d-flex align-items-center">
                    <feather-icon icon="EditIcon" class="mr-50 text-success" />
                    <span class="text-success">Edit</span>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item @click="toDelete(data.item.uuid)">
                  <div class="d-flex align-items-center">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span class="">Delete</span>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
        </b-col>

        <b-col cols="12">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalUsers"
            :per-page="perPage"
            align="right"
            size="sm"
            class="my-0"
            hide-goto-end-buttons
          />
        </b-col>
      </b-row>
    </b-card>

    <!-- Modal -->
    <b-modal
      id="modalTest"
      centered
      size="sm"
      modal-class="modal-cr"
      hide-footer
    >
      <validation-observer ref="dropdownForm" #default="{ invalid }">
        <b-form
          class="mt-2"
          @submit.prevent="isFormCreateUserMode ? create() : update()"
        >
          <b-row>
            <b-col md="12" class="mb-2">
              <!-- <h4>Enter Type Name</h4> -->
              <!-- Show/hide headings dynamically based on /isFormCreateUserMode value (true/false) -->
              <h5
                v-show="isFormCreateUserMode"
                class="modal-title mb-1"
                id="exampleModalLabel"
              >
                Add New Dropdown Item
              </h5>
              <h5
                v-show="!isFormCreateUserMode"
                class="modal-title mb-1"
                id="exampleModalLabel"
              >
                Update Dropdown Item
              </h5>

              <b-form-group label="Label" label-for="label" class="mb-3 mt-3">
                <validation-provider
                  #default="{ errors }"
                  name="Label"
                  vid="label"
                  rules="required"
                >
                  <div class="input-gradient">
                    <b-form-input
                      v-model="label"
                      id="label"
                      placeholder="Enter Type Label"
                    />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Type" label-for="type" class="mt-3">
                <validation-provider
                  #default="{ errors }"
                  name="Type"
                  vid="type"
                  rules="required"
                >
                  <div class="input-gradient">
                    <v-select
                    id="type"
                    v-model="type"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="types"
                    label="name"
                    placeholder="Select Type"
                  />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mt-5">
              <div class="d-flex justify-content-end">
                <b-button
                  type="submit"
                  variant="primary"
                  v-show="isFormCreateUserMode"
                  >Save</b-button
                >
                <b-button
                  type="submit"
                  variant="primary"
                  v-show="!isFormCreateUserMode"
                  >Update</b-button
                >
              </div>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
import {
  BFormDatepicker,
  BTable,
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BDropdown,
  BDropdownItem,
  BTabs,
  BTab,
  BCardText,
  BCardTitle,
  BCard,
  BForm,
} from "bootstrap-vue";
import router from "@/router";

import useDropdown from "./useDropdown.js";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted, computed, onMounted } from "@vue/composition-api";
import useStore from "./useStore";
import { globalHelper } from "@core/mixins/ui/global";
import { toastAlert } from "@core/mixins/ui/toast";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormDatepicker,
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BTabs,
    BTab,
    BCardText,
    BCardTitle,
    AppBreadcrumb,
    BCard,
    BForm,
    required,
    vSelect,
  },
  mixins: [globalHelper, toastAlert],

  data() {
    return {
      sortDirection: "asc",
      filterOn: [],
      isFormCreateUserMode: true,
      label: "",
      type: "",
      types: [],
      editUuid: "",
    };
  },
  methods: {
    // fetchLabels() {
    //   this.$http
    //     .get("labels")
    //     .then((response) => {
    //       const {
    //         data: {
    //           data: {
    //             labels: { data },
    //           },
    //         },
    //       } = response;
    //       this.labels = data;
    //     })
    //     .catch((error) => {
    //       // this.errorToast("Error", "Something is wrong!");
    //     });
    // },
    fetchTypes() {
      this.$http
        .get("types")
        .then((response) => {
          const {
            data: {
              data: {
                types: { data },
              },
            },
          } = response;
          this.types = data;
        })
        .catch((error) => {
          // this.errorToast("Error", "Something is wrong!");
        });
    },
    toDelete(uuid) {
      this.$http
        // .delete("types", { params: { uuid } })
        .delete(`dropdowns/${uuid}`)
        .then((response) => {
          console.log(response.data);
          this.refDropdowntest = Math.random();
          this.successToast("Success", "Dropdown Item Removed Successfully!");
        })
        .catch((error) => {
          // this.errorToast("Error", "Something is wrong!");
        });
    },
    create() {
      this.$refs.dropdownForm.validate().then((success) => {
        if (success) {
          this.$http
            .post("dropdowns", {
              label: this.label,
              type: this.type.name,
            })
            .then((response) => {
              this.label = null;
              this.type = null;
              this.$refs.dropdownForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Dropdown Item Added Successfully!");
            })
            .catch((error) => {
              // this.errorToast("Error", "Something is wrong!");
            });
        }
      });
    },
    update() {
      this.$refs.dropdownForm.validate().then((success) => {
        if (success) {
          const uuid = this.editUuid;
          this.$http
            .put(`dropdowns/${uuid}`, {
              label: this.label,
              type: this.type.name,
            })
            .then((response) => {
              this.label = null;
              this.type = null;
              this.$refs.dropdownForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Dropdown Item Edited Successfully!");
            })
            .catch((error) => {
              // this.errorToast("Error", "Something is wrong!");
            });
        }
      });
    },
    showModal() {
      this.isFormCreateUserMode = true;
      this.label = null;
      this.type = null;
      this.$bvModal.show("modalTest");
    },
    editType(data) {
      this.isFormCreateUserMode = false;
      this.label = data.item.label;
      this.type = data.item.type;
      this.editUuid = data.item.uuid;
      this.$bvModal.show("modalTest");
    },
  },
  mounted() {
    this.fetchTypes();
  },
  setup() {
    const APP_STORE_MODULE_NAME = "dropdown";
    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, useStore);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });

    const {
      fetchDropdowns,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,
      refDropdowntest,
    } = useDropdown();

    return {
      fetchDropdowns,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,
      refDropdowntest,
    };
  },
};
</script>

<style scoped>
.privateBtn {
  padding: 5px 10px 5px 10px;
}
</style>