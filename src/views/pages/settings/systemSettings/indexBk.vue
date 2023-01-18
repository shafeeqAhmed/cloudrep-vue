<template>
  <div>
    <b-card class="p-1">
      <section class="sys_settings_section_1 mb-3">
        <b-row class="mb-2">
          <b-col md="12">
            <div class="d-flex justify-content-between">
              <b-card-title>
                <h3>Systems Settings List</h3>
              </b-card-title>
              <b-button variant="primary" @click.prevent="showModal" class="float-right btn-add">
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
              <b-form-select id="perPageSelect" v-model="perPage" :options="perPageOptions" class="page-count-cr" />
              <label class="d-inline-block text-sm-left">entries</label>
            </b-form-group>
          </b-col>

          <!-- filter -->
          <b-col md="4" class="my-1 justify-content-end">
            <b-form-group class="mb-0">
              <b-input-group>
                <b-form-input id="filterInput" v-model="searchQuery" type="search" placeholder="Search..." />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" class="mt-2">
            <b-table responsive ref="refUserListTable" :items="fetchSystemSettings" :fields="tableColumns"
              primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
              :sort-desc.sync="isSortDirDesc" class="table-cr">
              <template #cell(actions)="data">
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret class="drop-with-trash">
                  <template v-slot:button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="text-body text-success align-middle mr-25" />
                  </template>
                  <!-- {{data.item.uuid}} -->
                  <b-dropdown-item @click="editType(data)">
                    <div class="d-flex align-items-center">
                      <feather-icon icon="EditIcon" class="mr-50 text-success" />
                      <span class="text-success">Edit</span>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item @click="toDelete(data.item.setting_uuid)">
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
            <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" align="right" size="sm"
              class="my-0" hide-goto-end-buttons />
          </b-col>
        </b-row>
      </section>
      <div>
        <hr />
      </div>
      
      <hr style="background-color:lightgray"/>
      <!-- Applogo -->
      <section class="sys_settings_section_2 mt-3">
        <b-row class="mb-2">
          <b-col md="12">
            <div class="d-flex justify-content-between">
              <b-card-title>
                <h3>App Logo</h3>
              </b-card-title>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <AppLogo />
          </b-col>
        </b-row>
      </section>
    </b-card>
    <!-- Modal -->
    <b-modal id="modalTest" centered size="sm" modal-class="modal-cr" hide-footer>
      <validation-observer ref="settingForm" #default="{ invalid }">
        <b-form class="mt-2" @submit.prevent="isFormCreateUserMode ? create() : update()">
          <b-row>
            <b-col md="12" class="mb-2">
              <!-- <h4>Enter Type Name</h4> -->
              <!-- Show/hide headings dynamically based on /isFormCreateUserMode value (true/false) -->
              <h5 v-show="isFormCreateUserMode" class="modal-title mb-1" id="exampleModalLabel">
                Add New System Setting
              </h5>
              <h5 v-show="!isFormCreateUserMode" class="modal-title mb-1" id="exampleModalLabel">
                Update System Setting
              </h5>
              <!-- {{value}} -->
              <b-form-group label="Type" label-for="type" class="mt-3 mb-3">
                <validation-provider #default="{ errors }" name="Type" vid="type" rules="required">
                  <v-select id="type" v-model="type" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="types" :reduce="(name) => name" label="name" placeholder="Select Type" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Name" label-for="name" class="mt-3">
                <validation-provider #default="{ errors }" name="Name" vid="name" rules="required">
                  <b-form-input v-model="name" id="name" placeholder="Enter Type Name" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mt-5">
              <div class="d-flex justify-content-end">
                <b-button type="submit" variant="primary" v-show="isFormCreateUserMode">Save</b-button>
                <b-button type="submit" variant="primary" v-show="!isFormCreateUserMode">Update</b-button>
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

import useSystemSettings from "./useSystemSettings.js";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted, computed, onMounted } from "@vue/composition-api";
import useStore from "./useStore";
import { globalHelper } from "@core/mixins/ui/global";
import { toastAlert } from "@core/mixins/ui/toast";
import AppLogo from "./components/AppLogo.vue";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    AppLogo,
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
      name: "",
      type: "",
      types: [],
      editUuid: "",
    };
  },
  methods: {
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
        .delete(`system-settings/${uuid}`)
        .then((response) => {
          console.log(response.data);
          this.refDropdowntest = Math.random();
          this.successToast("Success", "Setting Removed Successfully!");
        })
        .catch((error) => {
          // this.errorToast("Error", "Something is wrong!");
        });
    },
    create() {
      this.$refs.settingForm.validate().then((success) => {
        if (success) {
          this.$http
            .post("system-settings", {
              value: this.name,
              type: this.type.name,
            })
            .then((response) => {
              this.name = null;
              this.type = null;
              this.$refs.settingForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Setting Added Successfully!");
            })
            .catch((error) => {
              // this.errorToast("Error", "Something is wrong!");
            });
        }
      });
    },
    update() {
      this.$refs.settingForm.validate().then((success) => {
        if (success) {
          const uuid = this.editUuid;
          this.$http
            .put(`system-settings/${uuid}`, {
              type: this.type,
              value: this.name,
            })
            .then((response) => {
              this.name = null;
              this.type = null;
              this.$refs.settingForm.reset();
              this.refDropdowntest = Math.random();
              this.$bvModal.hide("modalTest");
              this.successToast("Success", "Setting Edited Successfully!");
            })
            .catch((error) => {
              // this.errorToast("Error", "Something is wrong!");
            });
        }
      });
    },
    showModal() {
      this.isFormCreateUserMode = true;
      this.name = null;
      this.type = null;
      this.$bvModal.show("modalTest");
    },
    editType(data) {
      console.log(data)
      this.isFormCreateUserMode = false;
      this.name = data.item.value;
      this.type = data.item.name;
      this.editUuid = data.item.setting_uuid;
      this.$bvModal.show("modalTest");
    },
  },
  mounted() {
    this.fetchTypes();
  },
  setup() {
    const APP_STORE_MODULE_NAME = "systemSettings";
    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME))
      store.registerModule(APP_STORE_MODULE_NAME, useStore);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME))
        store.unregisterModule(APP_STORE_MODULE_NAME);
    });

    const {
      fetchSystemSettings,
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
    } = useSystemSettings();

    return {
      fetchSystemSettings,
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