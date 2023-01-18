<template>
  <div class="contract">
    <div class="upp-header">
      <div class="upp-img">
        <b-img
          class="w-100"
          src="@/assets/images/logo/upp-img.png"
        ></b-img>
      </div>
      <div class="upp-heading">
        <h1>
          Introducing CloudRep AI The World’s <br />
          First Web3 Gig Economy
        </h1>
      </div>
    </div>
    <div class="create-contract mt-3 pb-3">
      <div class="header_title">
        <b-row class="align-items-center">
          <b-col cols="12">
            <h2>Inbox</h2>
          </b-col>
        </b-row>
      </div>
      <b-row class="mt-3">
        <b-col cols="12">
          <div class="template-table">
            <table class="table">
              <thead>
                <tr>
                  <th><div class="">Contract Name</div></th>
                  <th>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      Template Created
                    </div>
                  </th>
                  <th>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      States
                    </div>
                  </th>
                  <th>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="">Contract Name Number 1</div></td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      15 May 2020 8:00 am
                    </div>
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <span class="uncomplete">Uncomplete</span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <div>
                        <b-button
                          class="primary-btn"
                          v-b-modal.sign_contract
                          >Sign Document</b-button
                        >
                      </div>
                      <div class="d-none">
                        <feather-icon
                          icon="DownloadIcon"
                          size="20"
                          class="mr-1"
                        /><feather-icon
                          icon="EditIcon"
                          size="20"
                          class="mr-1"
                        /><feather-icon
                          icon="TrashIcon"
                          size="20"
                          class=""
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><div class="">Contract Name Number 2</div></td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      15 May 2020 8:00 am
                    </div>
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <span class="complete">Complete</span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <feather-icon
                        icon="DownloadIcon"
                        size="20"
                        class="mr-1"
                      /><feather-icon
                        icon="EditIcon"
                        size="20"
                        class="mr-1"
                      /><feather-icon
                        icon="TrashIcon"
                        size="20"
                        class=""
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><div class="">Contract Name Number 3</div></td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      15 May 2020 8:00 am
                    </div>
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <span class="complete">Complete</span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <feather-icon
                        icon="DownloadIcon"
                        size="20"
                        class="mr-1"
                      /><feather-icon
                        icon="EditIcon"
                        size="20"
                        class="mr-1"
                      /><feather-icon
                        icon="TrashIcon"
                        size="20"
                        class=""
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-modal
      id="sign_contract"
      centered
      ok-title="cancel"
      ok-only
      modal-class="contract-modal"
      hide-footer
      hide-header
      ref="contract-modal"
    >
      <div class="contract-modal-header">
        <h2>Successfully Enrolled!</h2>
        <feather-icon
          @click="hidemodal()"
          icon="XIcon"
          size="22"
          class="cursor-pointer"
        />
      </div>
      <hr />
      <div class="modal-contract pb-2 mt-3">
        <h4>Confirm your name, initials, and signature.</h4>
        <b-row class="mt-2">
          <b-col sm="6">
            <b-form-group>
              <label for="">Full Name <span>*</span></label>
              <div class="input-gradient">
                <b-form-input placeholder="Enter Full Name"></b-form-input>
              </div>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group>
              <label for="">Full Name <span>*</span></label>
              <div class="input-gradient">
                <b-form-input placeholder="Enter Full Name"></b-form-input>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="contract-tabs mt-2">
              <b-tabs content-class="mt-3 mb-2">
                <b-tab
                  title="Draw"
                  active
                >
                  <div class="signature-box"></div>
                </b-tab>
                <b-tab title="Upload">
                  <div class="input-gradient">
                    <div class="image-upload-box">
                      <b-form-group class="w-100 m-0">
                        <div class="image-sub-upload-box">
                          <div class="text-center">
                            <img
                              src="@/assets/images/icons/upload-img.png"
                              class="mb-3"
                            />
                            <h2>Upload Your Signature</h2>
                          </div>
                          <span class="removeIcon">
                            <feather-icon
                              size="1.5x"
                              icon="TrashIcon"
                            />
                          </span>
                        </div>
                      </b-form-group>
                    </div>
                  </div>
                  <p class="mt-1">
                    For best results use an image that is 400 x 145 pixel
                  </p>
                  <p>
                    By selecting Adopt and Sign, I agree that the signature and
                    initials will be the electronic representation of my
                    signature and initials for all purposes when I (or my agent)
                    use them on documents, including legally binding contracts -
                    just the same as a pen-and-paper signature or initial.
                  </p>
                </b-tab>
              </b-tabs>
            </div>
          </b-col>
          <b-col
            cols="12"
            class="mt-2"
          >
            <b-button class="secondary-btn">Sign</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormInvalidFeedback,
  BButton,
  BImg,
  BDropdown,
  BDropdownItem,
  BForm,
  BInputGroup,
  BFormFile,
  BInputGroupPrepend,
  BFormSelect,
  BFormCheckbox,
  BModal,
  BTabs,
  BTab,
  BLink,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormInvalidFeedback,
    BButton,
    BImg,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormFile,
    BInputGroupPrepend,
    BFormSelect,
    BFormCheckbox,
    vSelect,
    BModal,
    ValidationProvider,
    ValidationObserver,
    BTabs,
    BTab,
    BLink,
  },
  data() {
    return {};
  },
  methods: {
    hidemodal() {
      this.$refs["contract-modal"].hide();
    },
  },
};
</script>

<style lang="scss"></style>
