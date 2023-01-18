<template>
  <div>
    <b-card class="p-1">
      <b-row class="mb-2">
        <b-col md="10">
              <h1>Type List</h1>
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
            :items="fetchTypes"
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
                <!-- <b-dropdown-item @click="editType(data)">
                  <div class="d-flex align-items-center">
                    <feather-icon icon="EditIcon" class="mr-50 text-success" />
                    <span class="text-success">Edit</span>
                  </div>
                </b-dropdown-item> -->
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
      <validation-observer ref="typeForm" #default="{ invalid }">
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
                Add New Type
              </h5>
              <h5
                v-show="!isFormCreateUserMode"
                class="modal-title mb-1"
                id="exampleModalLabel"
              >
                Update Type
              </h5>
              <validation-provider
                #default="{ errors }"
                name="Name"
                vid="name"
                rules="required"
              >
                <div class="input-gradient">
                  <b-form-input
                  v-model="name"
                  id="name"
                  placeholder="Enter Type name"
                />
                </div>
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

import useType from "./useType.js";
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
    toPath() {
      this.$router.push({ name: "type-create" });
    },
    toEdit(uuid) {
      router.push({ name: "type-edit", params: { uuid } });
    },
    toDelete(uuid) {
      this.$http
        // .delete("types", { params: { uuid } })
        .delete(`types/${uuid}`)
        .then((response) => {
          console.log(response.data);
          this.refDropdowntest = Math.random();
          this.successToast("Success", "Type Removed Successfully!");
        })
        .catch((error) => {
          // this.errorToast("Error", "Something is wrong!");
        });
    },
    create() {
      this.$refs.typeForm.validate().then((success) => {
        if (success) {
          this.$http
            .post("types", {
              name: this.name,
            })
            .then((response) => {
              this.name = null;
              this.$refs.typeForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Type Added Successfully!");
            })
            .catch((error) => {
              // this.errorToast("Error", "Something is wrong!");
            });
        }
      });
    },
    update() {
      // console.log(this.editUuid)
      // return false
      this.$refs.typeForm.validate().then((success) => {
        if (success) {
          const uuid = this.editUuid;
          this.$http
            .put(`types/${uuid}`, {
              name: this.name,
            })
            .then((response) => {
              // console.log("edit mode -----------------");
              // console.log(response.data);
              this.name = null;
              this.$refs.typeForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Type Edited Successfully!");
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
    const APP_STORE_MODULE_NAME = "type";

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, useStore);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });
    const {
      fetchTypes,
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
    } = useType();

    return {
      fetchTypes,
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