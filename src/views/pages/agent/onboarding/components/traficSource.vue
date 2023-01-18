<template>
  <div>
    <h2>Trafic Source</h2>
    <p>
      The user’s origin or how they arrived at the Cloudrep Platform. Sources
      include ads, landing pages and organic search.
    </p>
    <!-- {{allTraficSource}} -->
    <b-row>
      <b-col md="4" class="mt-2" v-for="source in allTraficSource" :key="source.id">
        <div class="services-req-box" @click="getSourceValue(source.uuid)"
          :class="{ selected: isSelected(source.uuid) }">
          <div class="text-center">
            <div class="circle-white">
              <feather-icon icon="PhoneIcon"></feather-icon>
            </div>
            <h4>{{ source.label }}</h4>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- {{isUpdate}} -->
    <b-col md="12" class="mt-5 px-0" v-if="allTraficSource.length > 0">
      <!-- <b-button
      v-if="isUpdate === true"
        variant="primary"
        class="btn btn btn-primary btn-large btn-primary submit-btn mt-3"
        @click="submitForm"
      >
        Update
      </b-button> -->
      <b-button variant="primary" class="btn btn btn-primary btn-large btn-primary submit-btn mt-3" @click="submitForm">
        Next
      </b-button>
    </b-col>
  </div>
</template>
<script>
import { BRow, BCol, BButton } from "bootstrap-vue";
import { toastAlert } from "@core/mixins/ui/toast";
import { mapState } from "vuex";
export default {
  components: {
    BRow,
    BCol,
    BButton,
  },
  mixins: [toastAlert],
  computed: mapState({
    // arrow functions can make the code very succinct!
    step: (state) => state.aob.step,
  }),
  data() {
    return {
      allTraficSource: [],
      getSources: [],
      agentSources: [],
      selectedSources: null,
      isUpdate: false,
    };
  },
  watch: {
    '$store.state.aob.source': function (newVal, oldVal) {
      this.allTraficSource = newVal
    }
  },
  methods: {
    getSourceValue(uuid) {
      if (!this.getSources.includes(uuid)) {
        //checking weather array contain the id
        this.getSources.push(uuid); //adding to array because value doesnt exists
        this.isSelected(uuid);
      } else {
        this.getSources.splice(this.getSources.indexOf(uuid), 1); //deleting
        this.isSelected(uuid);
      }
    },
    submitForm() {
      // console.log(this.isUpdate)
      // return false
      if (this.isUpdate) {
        this.updateData();
      } else {
        this.storeData();
      }
    },
    storeData() {
      this.selectedSources = this.getSources.join();
      this.$http
        .post("store-agent-sources", {
          sources: this.selectedSources,
        })
        .then((response) => {
          this.getSelectedAgentSource();
          this.successToast("Success", response.data.message);
          this.$store.dispatch('aob/myAgentProfileItem')

        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    updateData() {
      this.$http
        .post("update-agent-sources", {
          sources: this.getSources.join(),
        })
        .then((response) => {
          this.getSelectedAgentSource();
          this.successToast("Success", response.data.message);
          // this.$store.dispatch('aob/myAgentProfileItem')

        })
        .catch((error) => {
          this.errorToast("Error", "something is going wrong ");
        });
    },
    getSelectedAgentSource() {
      this.$http
        .get("get-agent-sources")
        .then((response) => {
          const { data } = response;
          this.agentSources = data;
          this.getSources = this.agentSources;
          this.$store.commit('aob/UPDATE_AGENT_SOURCE', data)

          if (this.getSources.length > 0) {
            this.isUpdate = true;
          }
        })

    },
    isSelected(uuid) {
      return this.getSources.includes(uuid);
    },
  },
  created() {
    this.allTraficSource = this.$store.getters['aob/source']
    this.getSources = this.$store.getters['aob/agentSources']

    this.$store.dispatch('aob/getSource').then(() => {
      this.getSelectedAgentSource();
    })

    if (this.step > 0 && this.step != 3) {
      this.$store.dispatch("aob/myAgentProfileItem")
    }
  },
};
</script>