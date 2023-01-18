<template>
  <div>
    <b-card class="p-1">
      <b-row class="mb-2">
        <b-col md="12">
          <div class="d-flex justify-content-between">
            <b-card-title>
              <h3>Label List</h3>
            </b-card-title>
            <b-button
              variant="primary"
              @click.prevent="showModal"
              class="float-right btn-add"
            >
              + Add
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <!-- entries -->
        <b-col md="8" sm="4" class="my-1">
          <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-50">Show</label>
            <b-form-select
              id="perPageSelect"
              v-model="perPage"
              :options="perPageOptions"
              class="page-count-cr"
            />
            <label class="d-inline-block text-sm-left">entries</label>
          </b-form-group>
        </b-col>

        <!-- filter -->
        <b-col md="4" class="my-1 justify-content-end">
          <b-form-group class="mb-0">
            <b-input-group>
              <b-form-input
                id="filterInput"
                v-model="searchQuery"
                type="search"
                placeholder="Search..."
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-2">
          <b-table
            responsive
            ref="refUserListTable"
            :items="fetchLabels"
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
      <validation-observer ref="labelForm" #default="{ invalid }">
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
                Add New Label
              </h5>
              <h5
                v-show="!isFormCreateUserMode"
                class="modal-title mb-1"
                id="exampleModalLabel"
              >
                Update Label
              </h5>
              <validation-provider
                #default="{ errors }"
                name="Name"
                vid="name"
                rules="required"
              >
                <b-form-input
                  v-model="name"
                  id="name"
                  placeholder="Enter Label name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col md="12" class="mt-5">
              <div class="d-flex justify-content-end">
                <!-- <b-button variant="primary">
                  Save
                </b-button> -->
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

import useLabel from "./useLabel.js";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
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
  },
  mixins: [globalHelper, toastAlert],

  data() {
    return {
      sortDirection: "asc",
      filterOn: [],
      isFormCreateUserMode: true,
      name: "",
      editUuid: "",
    };
  },
  methods: {
    toDelete(uuid) {
      this.$http
        // .delete("labels", { params: { uuid } })
        .delete(`labels/${uuid}`)
        .then((response) => {
          console.log(response.data);
          this.refDropdowntest = Math.random();
          this.successToast("Success", "Label Removed Successfully!");
        })
        .catch((error) => {
          // this.errorToast("Error", "Something is wrong!");
        });
    },
    create() {
      this.$refs.labelForm.validate().then((success) => {
        if (success) {
          this.$http
            .post("labels", {
              name: this.name,
            })
            .then((response) => {
              this.name = null;
              this.$refs.labelForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Label Added Successfully!");
            })
            .catch((error) => {
              // this.errorToast("Error", "Something is wrong!");
            });
        }
      });
    },
    update() {
      this.$refs.labelForm.validate().then((success) => {
        if (success) {
          const uuid = this.editUuid;
          this.$http
            .put(`labels/${uuid}`, {
              name: this.name,
            })
            .then((response) => {
              // console.log("edit mode -----------------");
              // console.log(response.data);
              this.name = null;
              this.$refs.labelForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Label Edited Successfully!");
            })
            .catch((error) => {
              // this.errorToast("Error", "Something is wrong!");
            });
        }
      });
    },
    // /showModal() function. Function we use to 1. Set /isFormCreateUserMode to 'true', 2. Reset form data, 3. Show modal containing dynamic form for adding/updating user details.
    showModal() {
      this.isFormCreateUserMode = true;
      this.name = null;
      this.$bvModal.show("modalTest");
    },
    // /editUser() function. Function we use to 1. Set /isFormCreateUserMode to 'false', 2. Reset and clear form data, 3. Show modal containing dynamic form for adding/updating user details, 4. Fill form with user details.
    editType(data) {
      this.isFormCreateUserMode = false;
      this.name = data.item.name;
      this.editUuid = data.item.uuid;
      this.$bvModal.show("modalTest");
    },
  },
  setup() {
    const APP_STORE_MODULE_NAME = "label";

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, useStore);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });
    const {
      fetchLabels,
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
    } = useLabel();

    return {
      fetchLabels,
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