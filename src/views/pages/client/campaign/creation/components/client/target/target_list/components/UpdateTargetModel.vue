<template>
    <div>
        <b-modal id="update-target" centered modal-class="modal-number" hide-header hide-footer @hide="hide">
            <validation-observer ref="updateTargetForm" #default="{ invalid }">
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
                            <b-button class="secondary-btn w-100" @click="updateTarget">Save</b-button>
                        </b-col>
                        <b-col sm="3" cols="6">
                            <b-button block @click="$bvModal.hide('update-target')" class="secondary-btn w-100">Cancel
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
import vSelect from 'vue-select';


const initialTarget = {
    name: '',
    destination: '',
    type: 'Call',
    status: 'active',
    client_uuid: '',
    campaign_uuid: '',
    uuid: '',
    is_primary: false
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
    computed: {
        getTarget() {
            return this.$store.getters["clientCampaign/getTarget"];
        },
    },

    watch: {
        getTarget(newValue, oldValue) {
            if (newValue) {
                console.log(newValue.destination)
                this.target.name = newValue.name;
                this.target.destination = newValue.destination;
                // this.target.is_primary = newValue.is_primary;
                this.target.status = newValue.status;
                this.target.uuid = newValue.uuid;
                this.target.campaign_uuid = this.$store.state.clientCampaign.campaignUuid


                if (newValue.is_primary) {
                    this.target.is_primary = true
                }
                this.target.client_uuid = this.$store.state.clientCampaign.userUuid;

            }

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
        hide() {
            this.$store.commit('clientCampaign/UPDATE_TARGET', null);
            this.target = Object.assign({}, initialTarget);
        },
        updateTarget() {
            this.$refs.updateTargetForm.validate().then((success) => {
                if (!this.target.destination.includes("+")) {
                    this.target.destination = '+' + this.target.destination
                }

                if (success) {
                    this.$store.dispatch('clientCampaign/updateTarget', this.target)
                        .then(() => {
                            this.successToast("Target Updated Successfully.", 'success');
                            this.refetchData();
                            this.$store.commit('clientCampaign/UPDATE_TARGET', null);
                            this.$bvModal.hide('update-target');
                        })
                }
            });
        }
    },

};
</script>