<template>
    <div>
        <b-modal id="store-modal" centered modal-class="modal-number" hide-header hide-footer>
            <validation-observer ref="routingPlanForm" #default="{ invalid }">
                <b-form>
                    <b-row class="mt-3 mb-2">
                        <b-col cols="12">
                            <h2>Select Publisher</h2>
                        </b-col>
                    </b-row>

                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Routing Plan Name</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <b-form-group>
                                <validation-provider #default="{ errors }" name="name" vid="name" rules="required">
                                    <div class="input-gradient">
                                        <b-form-input id="name" v-model="plan.name"
                                            placeholder="Enter Routing Plan Name">
                                        </b-form-input>
                                    </div>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>

                </b-form>
            </validation-observer>
            <b-row class="mt-2">
                <b-col cols="12">
                    <b-button v-if="Object.keys(editRecord).length > 0" class="secondary-btn w-100"
                        @click="updateRecord">Update</b-button>
                    <b-button v-else class="secondary-btn w-100" @click="storeRecord">Add</b-button>
                </b-col>
            </b-row>

        </b-modal>
    </div>
</template>

<script>
import {
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BForm

} from "bootstrap-vue";

import { globalHelper } from "@core/mixins/ui/global";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
    updated() {
        console.log('At this point, events and lifecycle have been initialized.')
    },
    props: ['refetchData', 'editRecord'],
    components: {
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
        ValidationProvider,
        ValidationObserver,

    },
    mixins: [globalHelper],

    watch: {
        editRecord() {
            this.plan.name = this.editRecord.name
            this.plan.uuid = this.editRecord.uuid
        }
    },
    data() {
        return {
            plan: {
                name: "",
                uuid: ""
            }
        }
    },

    methods: {
        storeRecord() {
            this.$refs.routingPlanForm.validate().then((success) => {
                if (success) {
                    this.$store.dispatch('routingPlans/storeRouting', this.plan).then(res => {
                        this.refetchData()
                        this.$bvModal.hide('store-modal')
                        this.plan.uuid = ""
                        this.plan.name = ""
                    })
                }
            })
        },
        updateRecord() {
            this.$refs.routingPlanForm.validate().then((success) => {
                if (success) {
                    this.$store.dispatch('routingPlans/updateRouting', this.plan).then(res => {
                        this.refetchData()
                        this.plan.name = ''
                        this.$bvModal.hide('store-modal')


                    })
                }
            })
        },

    },
    created() {
        console.log(this.editRecord)
    }

};
</script>
