<template>
    <div>
        <b-modal id="add-target" centered modal-class="modal-number" hide-header hide-footer>
            <validation-observer ref="createTargetForm" #default="{ invalid }">
                <b-form>

                    <b-row class="align-items-center mt-2 mb-1">
                        <b-col cols="2">
                            <div class="d-flex align-items-center">
                                <label for="">Name</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="10">
                            <validation-provider #default="{ errors }" name="Name" vid="name" rules="required">
                                <div class="input-gradient">
                                    <b-form-input id="name" v-model="target.name" placeholder="Enter Name">
                                    </b-form-input>
                                </div>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-col>
                    </b-row>


                    <b-row class="align-items-center mt-2 mb-1">
                        <b-col cols="2">
                            <div class="d-flex align-items-center">
                                <label for="">Destination Number</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="10">
                            <validation-provider #default="{ errors }" name="Destination" vid="destination"
                                rules="required">
                                <div class="input-gradient">
                                    <b-form-input max="12" min="3" id="destination" type="text"
                                        v-model="target.destination" placeholder="Enter Destination Number">
                                    </b-form-input>
                                </div>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-col>
                    </b-row>

                    <b-row class="align-items-center  mt-2 mb-1">
                        <b-col cols="2">
                            <div class="d-flex align-items-center">
                                <label>Primary</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="10">
                            <b-form-checkbox checked="false" v-model="target.is_primary" name="check-button" switch />
                        </b-col>
                    </b-row>

                    <b-row class="align-items-center mt-3">
                        <b-col lg="3" md="3" sm="3" class="col-8">
                            <label class="font-medium-1 font-weight-bold">Type &nbsp;
                            </label>
                        </b-col>

                        <b-col sm="8">

                            <b-button-group size="my-1">
                                <b-button @click="targetType('Call')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="outline-primary" :class="target.type == 'Call' ? 'active' : ''">
                                    Call
                                </b-button>
                                <b-button @click="targetType('SIP Number')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="outline-primary" :class="target.type == 'SIP Number' ? 'active' : ''">
                                    SIP Number
                                </b-button>
                            </b-button-group>

                        </b-col>
                    </b-row>

                    <b-row class="align-items-center mt-3">
                        <b-col lg="3" md="3" sm="3" class="col-8">
                            <label class="font-medium-1 font-weight-bold">Status &nbsp;
                            </label>
                        </b-col>

                        <b-col sm="8">

                            <b-button-group size="my-1">
                                <b-button @click="statusChange('active')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="outline-primary" :class="target.status == 'active' ? 'active' : ''">
                                    Open
                                </b-button>
                                <b-button @click="statusChange('inactive')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="outline-primary" :class="target.status == 'inactive' ? 'active' : ''">
                                    Close
                                </b-button>
                            </b-button-group>

                        </b-col>
                    </b-row>

                    <b-row class="mt-3">
                        <b-col sm="3" cols="6">
                            <b-button class="secondary-btn w-100" @click="storeTarget">Save</b-button>
                        </b-col>
                        <b-col sm="3" cols="6">
                            <b-button block @click="$bvModal.hide('add-target')" class="secondary-btn w-100">Cancel
                            </b-button>
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
    BButtonGroup,
    BFormCheckbox
} from "bootstrap-vue";
import { globalHelper } from "@core/mixins/ui/global";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import { debounce } from "@/commonFunction/helpers.js";
import vSelect from 'vue-select';

const initialTarget = {
    is_primary: false,
    name: '',
    destination: '',
    type: 'Call',
    status: 'active',
    client_uuid: '',
    campaign_uuid: 1
}

export default {
    directives: {
        Ripple,
    },
    components: {
        ValidationProvider,
        ValidationObserver,
        BRow,
        BCol,
        BForm,
        BFormGroup,
        BFormSelect,
        BInputGroup,
        BButtonGroup,
        BFormInput,
        BInputGroupAppend,
        BButton,
        ToastificationContent,
        vSelect,
        BFormCheckbox
    },
    mixins: [globalHelper, toastAlert],
    props: ['refetchData'],
    data() {
        return {
            target: Object.assign({}, initialTarget)
        }
    },


    methods: {

        targetType(val) {
            this.target.type = val;
        },
        statusChange(val) {
            this.target.status = val;
        },
        resetModal() {
            this.target = Object.assign({}, initialTarget);
        },
        storeTarget() {
            this.$refs.createTargetForm.validate().then((success) => {
                if (success) {
                    this.target.campaign_uuid = this.$store.state.clientCampaign.campaignUuid
                    this.target.client_uuid = this.$store.state.clientCampaign.userUuid
                    // this.target.destination = '+' + this.target.destination
                    this.$store.dispatch('clientCampaign/storeTarget', this.target).then(() => {
                        this.successToast("Target Created Successfully.", 'success')
                        this.refetchData();
                        this.resetModal()
                        this.$bvModal.hide('add-target')
                    })

                }
            });
        }
    },

};
</script>