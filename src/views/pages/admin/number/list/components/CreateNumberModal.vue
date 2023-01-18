<template>
    <div>
        <b-modal id="create-numer" centered modal-class="modal-number" hide-header hide-footer>
            <b-row class="mt-3 mb-2">
                <b-col cols="12">
                    <h2>Create Number</h2>
                    <p>When your balance falls below the selected balance we'll automatically refill your account to
                        prevent any service interruption</p>
                </b-col>
            </b-row>
            <validation-observer ref="createNumberForm" #default="{ invalid }">
                <b-form>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Country</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <b-form-group class="">
                                <validation-provider #default="{ errors }" name="Country" vid="country"
                                    rules="required">
                                    <label class="font-medium-1 font-weight-bold">Country</label>
                                    <div class="input-gradient">
                                        <v-select id="country" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                            :options="countries" :reduce="(country) => country.code" label="name"
                                            v-model="number.country" placeholder="Select Your Country"
                                            class="v-sel-sty" />
                                    </div>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Bill Card</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <b-form-checkbox checked="false" switch v-model="number.bill_card"></b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Number Type</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <b-button-group>
                                <b-button @click="type('local')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="outline-primary" :class="number.type == 'local' ? 'btn-primary' : ''">Local
                                </b-button>
                                <b-button @click="type('mobile')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="outline-primary" :class="number.type == 'mobile' ? 'btn-primary' : ''">
                                    Mobile
                                </b-button>
                                <b-button @click="type('tollFree')" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="outline-primary" :class="number.type == 'tollFree' ? 'btn-primary' : ''">
                                    Toll
                                    Free</b-button>
                            </b-button-group>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Prefix</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <b-form-group>
                                <validation-provider #default="{ errors }" name="Prefix" vid="prefix">
                                    <div class="input-gradient">
                                        <b-form-input id="prefix" v-model="number.prefix" placeholder="Enter Prefix">
                                        </b-form-input>
                                    </div>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Amount</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <b-form-group>
                                <validation-provider #default="{ errors }" name="Amount" vid="amount">
                                    <div class="input-gradient">
                                        <b-form-input id="amount" v-model="number.amount" placeholder="Enter Amount">
                                        </b-form-input>
                                    </div>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-center mb-1">
                        <b-col cols="4">
                            <div class="d-flex align-items-center">
                                <label for="">Assign Publisher</label>
                                <feather-icon icon="HelpCircleIcon" size="20" class="ml-1 cursor-pointer" />
                            </div>
                        </b-col>
                        <b-col cols="8">
                            <b-form-group>
                                <validation-provider #default="{ errors }" name="Publisher" vid="publisher">
                                    <div class="input-gradient">
                                        <v-select id="publisher" v-model="number.publisher_uuid" :options="publishers"
                                            label="name" :reduce="publisher => publisher.user_uuid"
                                            placeholder="Select Publisher"></v-select>
                                    </div>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col cols="12">
                            <b-button class="secondary-btn w-100" @click="storeTwilioNumber">Create Number</b-button>
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
    BFormCheckbox,
    BButtonGroup
} from "bootstrap-vue";

import { globalHelper } from "@core/mixins/ui/global";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { toastAlert } from "@core/mixins/ui/toast";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";

export default {
    props: ['refetchData'],
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
        BFormInput,
        BInputGroupAppend,
        BButton,
        vSelect,
        BFormCheckbox,
        BButtonGroup,
    },
    mixins: [globalHelper, toastAlert],
    computed: {
        countries() {
            return this.$store.getters["manageNumbers/countries"];
        },
        publishers() {
            return this.$store.getters["manageNumbers/publishers"];
        },
    },
    data() {
        return {
            number: {
                country: 'US',
                bill_card: true,
                type: 'local',
                prefix: '',
                amount: '',
                publisher_uuid: ''
            }
        };
    },
    methods: {
        type(val) {
            this.number.type = val;
            console.log(this.number)
        },
        storeTwilioNumber() {
            this.$refs.createNumberForm.validate().then((success) => {
                if (success) {
                    this.$store.dispatch('manageNumbers/buyTwilioNumber', this.number).then(res => {
                        this.refetchData()
                        this.$bvModal.hide('create-numer')

                    })
                }
            });
        }
    }
    // mounted() {
    // this.getPublishers()
    // },
    // created() {
    //     this.getPublishers()
    // },

};
</script>
