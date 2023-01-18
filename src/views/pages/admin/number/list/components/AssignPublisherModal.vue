<template>
    <div>
        <b-modal id="add-publisher" centered modal-class="modal-number" hide-header hide-footer>
            <validation-observer ref="assginPublisherToNumber" #default="{ invalid }">
                <b-form>
                    <b-row class="mt-3 mb-2">
                        <b-col cols="12">
                            <h2>Select Publisher</h2>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Number</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <label for=""> {{ editRecord.number }}</label>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Publisher</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <validation-provider #default="{ errors }" name="Publisher" vid="publisher"
                                rules="required">
                                <div class="input-gradient">
                                    <v-select id="publisher" v-model="number.publisher_uuid" :options="publishers"
                                        label="name" :reduce="publisher => publisher.user_uuid"
                                        placeholder="Select Publisher"></v-select>
                                </div>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-col>
                    </b-row>

                </b-form>
            </validation-observer>
            <b-row class="mt-2">
                <b-col cols="12">
                    <b-button class="secondary-btn w-100" @click="assignPublisherToNumber">Add</b-button>
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
    props: ['editRecord', 'refetchData'],
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
    computed: {
        publishers() {
            return this.$store.getters["manageNumbers/publishers"];
        },
    },
    watch: {
        editRecord() {
            this.number.publisher_uuid = this.editRecord.publisher_uuid
            this.number.uuid = this.editRecord.uuid

        }
    },
    data() {
        return {
            number: {
                publisher_uuid: "",
                uuid: ""
            }
        }
    },

    methods: {
        assignPublisherToNumber() {
            this.$refs.assginPublisherToNumber.validate().then((success) => {
                console.log(this.number)
                if (success) {

                    this.$store.dispatch('manageNumbers/assignPublisherToNumber', this.number).then(res => {
                        this.refetchData()
                        this.$bvModal.hide('add-publisher')

                    })
                }
            });
        }
    },
    created() {

    }

};
</script>
