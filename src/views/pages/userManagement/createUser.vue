<template>
  <div class="user-management pb-2">
    <b-card class="p-2">
      <div class="header_title">
        <b-row class="align-items-center">
          <b-col cols="6">
            <h2>Add User</h2>
          </b-col>
          <b-col cols="6">
            <b-button variant="primary" class="float-right" @click="backToUserList">Back</b-button>
          </b-col>
        </b-row>
      </div>
      <b-row class="mt-2">
        <b-col>
            <validation-observer ref="registerForm" #default="{ invalid }">
              <b-form class="auth-login-form">
                <!-- Company ID -->
                <b-row class="mb-2">
                  <b-col md="6">
                    <b-form-group>
                      <validation-provider
                        #default="{ errors }"
                        name="First Name"
                        vid="first_name"
                        rules="required"
                      >
                        <div class="input-gradient"  :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : null"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon
                              icon="UserIcon"
                            />
                          </b-input-group-prepend>
                          <b-form-input
                            id="first_name"
                            v-model="first_name"
                            :state="errors.length > 0 ? false : null"
                            class="form-control-merge"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            autocomplete="off"
                          />
                        </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group>
                      <validation-provider
                        #default="{ errors }"
                        name="Last Name"
                        vid="last_name"
                        rules="required"
                      >
                        <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : null"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon
                              icon="UserIcon"
                            />
                          </b-input-group-prepend>
                          <b-form-input
                            id="last_name"
                            v-model="last_name"
                            :state="errors.length > 0 ? false : null"
                            class="form-control-merge"
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            autocomplete="off"
                          />
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row  class="mb-2">
                  <b-col md="6">
                    <!-- Email -->
                    <b-form-group>
                      <validation-provider
                        #default="{ errors }"
                        name="Email"
                        vid="email"
                        rules="required|email"
                      >
                        <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : null"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon
                              icon="MailIcon"
                            />
                          </b-input-group-prepend>

                          <b-form-input
                            id="register-email"
                            v-model="userEmail"
                            name="register-email"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Email"
                            type="email"
                            autocomplete="off"
                          />
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <!-- Phone -->
                    <b-form-group>
                      <validation-provider
                        #default="{ errors }"
                        name="userPhone"
                        vid="userPhone"
                        rules="required|min:10"
                      >
                        <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : null"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon
                              icon="PhoneIcon"
                            />
                          </b-input-group-prepend>

                          <b-form-input
                            id="register-email"
                            v-model="userPhone"
                            name="userPhone"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Phone"
                            type="number"
                            min="11"
                            autocomplete="off"
                          />
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
                <!-- Password -->
                <b-row class="mb-2">
                  <b-col md="6">
                    <b-form-group>
                      <validation-provider
                        #default="{ errors }"
                        name="Password"
                        vid="password"
                        rules="required"
                      >
                        <div class="input-gradient " :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : null"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon
                              icon="LockIcon"
                            />
                          </b-input-group-prepend>
                          <b-form-input
                            id="password"
                            v-model="password"
                            :state="errors.length > 0 ? false : null"
                            class="form-control-merge"
                            :type="passwordFieldType"
                            name="password"
                            placeholder="Password"
                            autocomplete="off"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              class="cursor-pointer"
                              :icon="passwordToggleIcon"
                              @click="togglePasswordVisibility"
                            />
                          </b-input-group-append>
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group>
                      <validation-provider
                        #default="{ errors }"
                        name="Confirm Password"
                        vid="password_confirmation"
                        rules="required|confirmed:password"
                      >
                        <div class="input-gradient" :class="errors.length > 0 ? 'is-invalid' : null">
                          <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid' : null"
                        >
                          <b-input-group-prepend is-text>
                            <feather-icon
                              icon="LockIcon"
                            />
                          </b-input-group-prepend>
                          <b-form-input
                            id="confirmPassword"
                            v-model="password_confirmation"
                            :state="errors.length > 0 ? false : null"
                            class="form-control-merge"
                            :type="passwordFieldType"
                            name="confirmPassword"
                            placeholder="Re-Typed Password"
                            autocomplete="off"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              class="cursor-pointer"
                              :icon="passwordToggleIcon"
                              @click="togglePasswordVisibility"
                            />
                          </b-input-group-append>
                          </b-input-group>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
                <!-- User Role -->
                <b-row class="mb-1">
                  <b-col md="6">
                    <b-form-group>
                      <validation-provider
                        #default="{ errors }"
                        name="Role"
                        rules="required"
                      >
                        <div class="input-gradient">
                          <v-select
                            id="role"
                            v-model="selectedRole"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="roleName"
                            :selectable="
                              (option) => !option.value.includes('select_value')
                            "
                            label="text"
                            placeholder="Select User Role"
                            autocomplete="off"
                          />
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
                <!-- submit buttons -->
                <b-row>
                  <b-col>
                    <b-button
                      type="submit"
                      @click.prevent="createUser"
                      variant="primary"
                      class="text-uppercase float-right"
                    >
                      Save
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
        </b-col>
      </b-row>
    </b-card>
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
  BForm,
  BCard,
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
  BInputGroupPrepend,
} from "bootstrap-vue";
import router from "@/router";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { toastAlert } from "@core/mixins/ui/toast";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";

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
    BForm,
    BCard,
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
    BInputGroupPrepend,
    AppBreadcrumb,
    vSelect,
    ToastificationContent,
  },
  mixins: [togglePasswordVisibility, toastAlert],
  data() {
    return {
      first_name: "",
      last_name: "",
      userEmail: "",
      userPhone: "",
      password: "",
      password_confirmation: "",
      required,
      email,
      selectedRole: "",
      roleName: [
        { value: "select_value", text: "Select Value" },
        { value: "client", text: "client" },
        { value: "agent", text: "agent" },
        { value: "publisher", text: "publisher" },
      ],
    };
  },
  methods: {
    createUser() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          const formData = new FormData();
          formData.append("first_name", this.first_name);
          formData.append("last_name", this.last_name);
          formData.append("email", this.userEmail);
          formData.append("phone_no", this.userPhone);
          formData.append("role", this.selectedRole.value);
          formData.append("password", this.password);
          formData.append("password_confirmation", this.password_confirmation);
          this.$http
            .post("register-by-admin", formData)
            .then((response) => {
              console.log(response);
              this.$router
                .push({ name: "admin-user-management" })
                .catch(() => {});
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "User Created Successfully.",
                  icon: "EditIcon",
                  variant: "success",
                },
              });
            })
            .catch((error) => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: error.response.data.message,
                  icon: "AlertTriangleIcon",
                  variant: "danger",
                },
              });
            });
        }
      });
    },
    backToUserList() {
      this.$router.push({ name: "admin-user-management" }).catch(() => {});
    },
    resetInputFields() {
      (this.first_name = ""),
        (this.last_name = ""),
        (this.userEmail = ""),
        (this.userPhone = ""),
        (this.password = ""),
        (this.password_confirmation = ""),
        (this.selectedRole = "");
    },
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
};
</script>