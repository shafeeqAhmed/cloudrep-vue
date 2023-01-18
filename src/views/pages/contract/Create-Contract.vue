<template>
  <div class="contract">
    <div class="upp-header">
        <div class="upp-img">
            <b-img class="w-100" src="@/assets/images/logo/upp-img.png" ></b-img>
        </div>
        <div class="upp-heading">
            <h1>Introducing CloudRep AI The World’s <br> First Web3 Gig Economy</h1>
        </div>
    </div>
    <div class="create-contract mt-3 pb-3">
        <validation-observer ref="contract_form" #default="{ errors }">
            <div class="header_title">
                <b-row class="align-items-center">
                    <b-col cols="12">
                        <h2>Attach Document</h2>
                    </b-col>
                </b-row>
            </div>
            <b-row class="mt-3 mb-3">
                <b-col cols="12">
                    <div class="input-gradient">
                        <div class="image-upload-box">
                            <b-form-group class="w-100 m-0">
                                <validation-provider #default="{ errors }" name="Course Image" vid="course_image" :state="errors.length > 0 ? false : null">
                                    <b-form-file id="courseImage" @change="handleImageSelected" accept=".jpg, .png, .gif" plain :hidden="true"/>
                                        <div @click="chooseFile('courseImage')" class="image-sub-upload-box">
                                            <img v-if="imageUrl" :src="imageUrl" class="img-uploaded-any"  />
                                            <div v-else class="text-center">
                                                <img src="@/assets/images/icons/upload-img.png" class="mb-3" />
                                                <h2>Drop the file or click to upload.</h2>
                                            </div>
                                            <span class="removeIcon" v-if="imageUrl"  @click="removeImage">
                                                <feather-icon size="1.5x" icon="TrashIcon" />
                                            </span>
                                        </div>
                                        <small class="text-danger mt-1">{{ errors[0] }}</small>

                                </validation-provider>
                            </b-form-group>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <div class="header_title">
                <b-row class="align-items-center">
                    <b-col cols="6">
                        <h2>Add Recipients</h2>
                    </b-col>
                    <b-col cols="6">
                        <b-button class="secondary-btn float-right" @click="addRecipient">Add Recipients</b-button>
                    </b-col>
                </b-row>
            </div>
            <b-row class="mt-3 mb-3">
                <b-col cols="12" class="mb-1">
                    <div class="card p-2 recipient-card" v-for="name in recipients" :key="name.key">
                        <b-row>
                            <b-col md="6" cols="12">
                                <validation-provider #default="{ errors }" name="Recipients Name" rules="required" vid="recipients_name" :state="errors.length > 0 ? false : null">
                                    <b-form-group>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <label for="">Name <span>*</span></label>
                                            <div class="lmsInputFieldCounter d-none">
                                                <span v-if="form.Name.length >= 1"><span >{{form.Name.length}}</span> / 40</span>
                                                <span v-if="form.Name.length < 1">40</span>
                                            </div>
                                            <span class="text-danger" v-if="form.Name.length>= 40">Max limit reached (40)</span>
                                        </div>
                                        <div class="input-gradient">
                                            <b-form-input type="text" autocomplete="off" v-model="form.Name" maxLength="40" id="recipients_name" placeholder="Recipients Name" required></b-form-input>
                                        </div>
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                            <b-col md="6" cols="12">
                                <validation-provider #default="{ errors }" name="Recipients Email" rules="required|email" vid="recipients_email" :state="errors.length > 0 ? false : null">
                                    <b-form-group>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <label for="">Email <span>*</span></label>
                                            <div class="lmsInputFieldCounter d-none">
                                                <span v-if="form.Email.length >= 1"><span >{{form.Email.length}}</span> / 50</span>
                                                <span v-if="form.Email.length < 1">50</span>
                                            </div>
                                            <span class="text-danger" v-if="form.Email.length>= 50">Max limit reached (50)</span>
                                        </div>
                                        <div class="input-gradient">
                                            <b-form-input type="email" autocomplete="off" v-model="form.Email" maxLength="50" required id="recipients_email" placeholder="Recipients Email"></b-form-input>
                                        </div>
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                        </b-row>
                        <div class="remove-recipient" @click="removeRecipient(name.key)">
                            <feather-icon icon="XIcon" size="20" class=""/>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <div class="header_title">
                <b-row class="align-items-center">
                    <b-col cols="12">
                        <h2>Add Message</h2>
                    </b-col>
                </b-row>
            </div>
            <b-row class="mt-3 mb-3">
                <b-col cols="12">
                    <div class="card p-2">
                        <b-row>
                            <b-col cols="12">
                                <validation-provider #default="{ errors }" name="Subject" rules="required" vid="subject" :state="errors.length > 0 ? false : null">
                                    <b-form-group>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <label for="">Subject <span>*</span></label>
                                            <div class="lmsInputFieldCounter d-none">
                                                <span v-if="form.Subject.length >= 1"><span >{{form.Subject.length}}</span> / 40</span>
                                                <span v-if="form.Subject.length < 1">40</span>
                                            </div>
                                            <span class="text-danger" v-if="form.Subject.length>= 40">Max limit reached (40)</span>
                                        </div>
                                        <div class="input-gradient">
                                            <b-form-input type="text" autocomplete="off" v-model="form.Subject" maxLength="40" required id="subject" placeholder="Enter Subject"></b-form-input>
                                        </div>
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                            <b-col cols="12">
                                <b-form-group>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <label for="">Message</label>
                                        <div class="lmsInputFieldCounter d-none">
                                            <span v-if="form.Message.length >= 1"><span >{{form.Message.length}}</span> / 200</span>
                                            <span v-if="form.Message.length < 1">200</span>
                                        </div>
                                        <span class="text-danger" v-if="form.Message.length>= 200">Max limit reached (200)</span>
                                    </div>
                                    <div class="input-gradient">
                                        <b-form-textarea type="text" autocomplete="off" v-model="form.Message" maxLength="200" id="subject" placeholder="Enter Message"></b-form-textarea>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col cols="12">
                    <b-button @click="storeContract" class="secondary-btn">Save & Continue</b-button>
                </b-col>
            </b-row>
        </validation-observer>
    </div>
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
    BFormCheckbox
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import vSelect from "vue-select";
import useUploadImage from "@/views/pages/lms/useUploadImage";
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
        ValidationProvider,
        ValidationObserver,
        required,
        email,
    },
    data(){
        return{
            recipients:[
                {key:1, value:'card'},
            ],
            form:{
                Name : "",
                Email : "",
                Subject : "",
                Message : "",
            }
        }
    },
    methods : {
        storeContract(){
            this.$refs.contract_form.validate().then((success) => {
                if (success) {
                
                }
            });
        },  
        addRecipient(){
            // console.log(this.generateRanNumb())
            // this.generateRanNumb()
            this.recipients.push({key:this.generateRanNumb(), value:'card'})
        },
        removeRecipient(zoh){
            const index = this.recipients.findIndex(menu => menu.key === zoh);
            // console.log(index)
            // return false
            const removeMenuItem = this.recipients.splice(index, 1);
            if (removeMenuItem) {
                console.log('hip hip hurrrray!')
            }
        },
        generateRanNumb(){
           return Math.floor(Math.random() * 1000) + 5;
        },
    },
    setup() {
        const {
            imageFile,
            imageUrl,
            handleImageSelected,
            removeImage,
            chooseFile,
        } = useUploadImage();

        return {
            imageFile,
            imageUrl,
            handleImageSelected,
            removeImage,
            chooseFile,
        };
    },
}
</script>

<style>

</style>