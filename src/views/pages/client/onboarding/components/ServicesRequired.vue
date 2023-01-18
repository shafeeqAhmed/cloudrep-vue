<template>
  <div class="w-100">
    <b-row>
      <b-col class="m-2">
        <div class="backBtn">
          <img class="cursor-pointer" src="@/assets/images/icons/arrow-left.svg" />
          <b-link class="ml-1 text-dark-custom" @click="backToHome">
            <small>Back To Home</small>
          </b-link>
        </div>
      </b-col>
    </b-row>
    <div class="client-content">
      <h2>I Need more</h2>
      <p>
        Thanks for choosing Cloud Rep, we're excited to get you started!
      </p>
      <b-row>
        <b-col md="4" class="mt-2" v-for="service in services" :key="service.id">
          <div @click="getServiceValue(service.uuid)" class="services-req-box"
            :class="{ selected: isSelected(service.uuid) }">
            <div class="text-center">
              <div class="circle-white">
                <feather-icon icon="PhoneIcon"></feather-icon>
              </div>
              <h4>{{ service.name }}</h4>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-col md="12" class="mt-5 px-0" v-if="services.length > 0">
        <b-button v-if="text == 'Update'" type="submit" variant="primary"
          class="btn btn btn-primary btn-large btn-primary submit-btn mt-3" @click="storeServices">
          Update
        </b-button>
        <b-button v-else type="submit" variant="primary"
          class=" btn btn btn-primary btn-large btn-primary submit-btn mt-3" @click="storeServices">
          Save
        </b-button>
      </b-col>
    </div>
  </div>
</template>

<script>
import ClientOnboardingNav from "./ClientOnboardingNav.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import {
  BImg,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BLink,
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";
export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BLink,
    ClientOnboardingNav,
    BRow,
    BCol,
    BButton,
  },

  mixins: [toastAlert],
  data() {
    return {
      services: [],
      icons: [],
      getServices: [],
      selectedServices: null,
      clientService: [],
      edit: false,
      text: "",
    };
  },
  methods: {

    getServiceValue(id) {
      if (!this.getServices.includes(id)) {
        //checking weather array contain the id
        this.getServices.push(id); //adding to array because value doesnt exists
        this.isSelected(id);
      } else {
        this.getServices.splice(this.getServices.indexOf(id), 1); //deleting
        this.isSelected(id);
      }
    },
    storeServices() {
      this.selectedServices = this.getServices.join();
      let url;
      if (this.edit == true) {
        url = "update-client-services";
      } else {
        url = "store-client-services";
      }
      this.$http
        .post(url, {
          services: this.selectedServices,
        })
        .then((response) => {
          //update local state for step
          this.successToast("Success", response.data.message);

          this.$store.dispatch("cob/myClientProfileItem").then(() => {
            this.$router.push({ name: "business-information" });
          });
        })
        .catch((e) => {
          if (e.response.status == 422) {
            this.errorToast("Error", e.response.data.message);
          } else {
            this.errorToast("Error", "something is going wrong ");
          }
        });
    },

    isSelected(uuid) {
      return this.getServices.includes(uuid);
    },
    backToHome() {
      this.$router.push("/client").catch(() => { });
    }
  },
  created() {
    this.$http
      .get("client-services")
      .then((response) => {
        const { data } = response;
        this.clientService = data;
        this.getServices = this.clientService;
        if (this.getServices.length) {
          this.text = "Update";
          this.edit = true;
        } else {
          this.text = "Save";
          this.edit = false;
        }
      })
      .catch((error) => {
        const {
          data: {
            data: { status },
          },
        } = error;
        if (status) {
          this.errorToast("Error", status.message);
        } else {
          this.errorToast("Error", "something is going wrong ");
        }
      });
  },

  mounted() {
    this.$http
      .get("services")
      .then((response) => {
        const {
          data: {
            data: { services },
          },
        } = response;
        this.services = services;
        // this.successToast("Success", response.data.message);
      })
      .catch((error) => {
        if (error.response.status == 422) {
          this.errorToast("Error", error.response.data.message);
        } else {
          this.errorToast("Error", "something is going wrong ");
        }
      });
  },
};
</script>
<style>
.backBtn {
  display: flex;
  /* justify-content: end; */
}
</style>