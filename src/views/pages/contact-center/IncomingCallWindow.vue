<template>
  <div>
    <!-- <b-card class="statistics-card" v-if="inCommingCall"> -->
    <b-modal id="modal-seconday" ok-only ok-variant="secondary" ok-title="Accept" modal-class="modal-secondary" centered
      title="Incoming Call" v-model="inCommingCall" size="lg" hide-footer hide-header-close>
      <b-media no-body class="b-media">
        <b-media-aside class="mr-lg-3 mr-md-3 mr-sm-0 b-media-aside">
          <b-avatar size="60" class="bg-gradient-primary">
            <feather-icon class="font-medium-5" size="24" icon="UsersIcon" />
          </b-avatar>
        </b-media-aside>
        <b-media-body class="my-auto b-media-body">
          <b-card-text class="font-medium-3">
            Incoming call request
          </b-card-text>
          <h4 class="font-weight-bolder font-medium-5 font">
            {{ incomingCallNumber }}
          </h4>
          <br />

          <div v-if="callStatus == 'open'">
            <div v-if="isMuted" @click="unMute">
              <b-badge role="button" variant="success">
                <feather-icon icon="Volume2Icon" class="mr-25" />
                <span>UnMute</span>
              </b-badge>
            </div>
            <div v-else @click="mute">
              <b-badge role="button" variant="danger">
                <feather-icon icon="VolumeXIcon" class="mr-25" />
                <span>Mute</span>
              </b-badge>
            </div>
          </div>

          <b-row>
            <b-col md="6">
              <b>Speaker Devices</b>
              <b-form-select v-model="speakerOutputDevice" :options="speakerAvailableOutputDevices"
                @change="updateOutputDevice" :select-size="4" />
            </b-col>
            <b-col md="6">
              <b>Ring Tune Device</b>
              <b-form-select v-model="ringTuneOutputDevice" :options="ringTuneAvailableOutputDevices"
                @change="updateRingtoneDevice" :select-size="4" />
            </b-col>
          </b-row>
        </b-media-body>
        <b-media-aside class="mr-lg-2 mr-md-2 mr-sm-0 b-media-aside">
          <div @click="accept" v-if="callStatus != 'open'">
            <b-avatar id="incommingCallButton" size="60" class="mr-1 cursor-pointer" variant="light-success">
              <feather-icon size="24" icon="PhoneIncomingIcon" />
            </b-avatar>
          </div>
          <div @click="reject" v-if="callStatus == 'pending'">
            <b-avatar size="60" class="mr-1 cursor-pointer" variant="light-danger">
              <feather-icon size="24" icon="PhoneIncomingIcon" />
            </b-avatar>
          </div>
          <div @click="hangUp" v-else>
            <b-avatar size="60" class="mr-1 cursor-pointer" variant="light-danger">
              <feather-icon size="24" icon="PhoneIncomingIcon" />
            </b-avatar>
          </div>
        </b-media-aside>
      </b-media>
    </b-modal>
    <!-- </b-card> -->

    <!-- <b-card
      class="statistics-card"
      v-if="inCommingCall == false && outGoingCall == true"
    > -->
    <b-modal v-if="callDirection == 'OUTGOING'" id="modal-seconday" ok-only ok-variant="secondary" ok-title="Accept"
      modal-class="modal-secondary" centered title="Out Going Call" v-model="outGoingCall" size="lg" hide-footer
      hide-header-close>
      <b-media no-body class="b-media">
        <b-media-aside class="mr-lg-3 mr-md-3 mr-sm-0 b-media-aside">
          <b-avatar size="60" class="bg-gradient-primary">
            <feather-icon class="font-medium-5" size="24" icon="UsersIcon" />
          </b-avatar>
        </b-media-aside>
        <b-media-body class="my-auto b-media-body">
          <b-card-text class="font-medium-3">
            Out Going call request
          </b-card-text>
          <h4 class="font-weight-bolder font-medium-5 font">
            {{ outGoingNumber }}
          </h4>
          <br />

          <div v-if="callStatus == 'open'">
            <div v-if="isMuted" @click="unMute">
              <b-badge role="button" variant="success">
                <feather-icon icon="Volume2Icon" class="mr-25" />
                <span>UnMute</span>
              </b-badge>
            </div>
            <div v-else @click="mute">
              <b-badge role="button" variant="danger">
                <feather-icon icon="VolumeXIcon" class="mr-25" />
                <span>Mute</span>
              </b-badge>
            </div>
          </div>
        </b-media-body>
        <b-media-aside class="mr-lg-2 mr-md-2 mr-sm-0 b-media-aside">
          <!-- <div @click="accept" v-if="callStatus != 'open'">
            <b-avatar id="incommingCallButton" size="60" class="mr-1 cursor-pointer" variant="light-success">
              <feather-icon size="24" icon="PhoneIncomingIcon" />
            </b-avatar>
          </div>
          <div @click="reject" v-if="callStatus == 'pending'">
            <b-avatar size="60" class="mr-1 cursor-pointer" variant="light-danger">
              <feather-icon size="24" icon="PhoneIncomingIcon" />
            </b-avatar>
          </div> -->
          <div @click="hangUp">
            <b-avatar size="60" class="mr-1 cursor-pointer" variant="light-danger">
              <feather-icon size="24" icon="PhoneOutgoingIcon" />
            </b-avatar>
          </div>
        </b-media-aside>
      </b-media>

      <b-row>
        <b-col md="6">
          <b>Speaker Devices</b>
          <b-form-select v-model="speakerOutputDevice" :options="speakerAvailableOutputDevices"
            @change="updateOutputDevice" :select-size="4" />
        </b-col>
        <b-col md="6">
          <b>Ring Tune Device</b>
          <b-form-select v-model="ringTuneOutputDevice" :options="ringTuneAvailableOutputDevices"
            @change="updateRingtoneDevice" :select-size="4" />
        </b-col>
      </b-row>
    </b-modal>

    <!-- </b-card> -->
  </div>
</template>

<script>
import {
  BCard,
  BMedia,
  BMediaAside,
  BAvatar,
  BAvatarGroup,
  BMediaBody,
  BCardText,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BModal,
} from "bootstrap-vue";
import { Device } from "@twilio/voice-sdk";
import EventBus from "@/event/EventBus";

export default {
  components: {
    BCard,
    BMedia,
    BMediaAside,
    BAvatar,
    BAvatarGroup,
    BMediaBody,
    BCardText,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BModal,
  },
  data() {
    return {
      isModalOpen: true,
      device: {},
      call: {},
      incommingNumber: "",
      outGoingNumber: "",
      outGoingCall: false,
      isMuted: false,
      accessToken: "",
      speakerOutputDevice: "default",
      speakerAvailableOutputDevices: [],
      ringTuneOutputDevice: "default",
      ringTuneAvailableOutputDevices: [],
    };
  },
  watch: {

    '$store.state.app.user.user_uuid': function () {
      this.initiateVoiceSdk()
    }
  },
  methods: {
    async getAudioDevices() {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      this.device.audio.availableOutputDevices.forEach((device, id) => {
        this.speakerAvailableOutputDevices.push({
          value: id,
          text: device.label,
        });
        this.ringTuneAvailableOutputDevices.push({
          value: id,
          text: device.label,
        });
      });
    },
    updateOutputDevice(event) {
      if (this.notEmpty(this.device)) {
        console.log("out put device-");
        console.log(event);
        this.device.audio.speakerDevices.set(event);
      }
    },
    updateRingtoneDevice(event) {
      if (this.notEmpty(this.device)) {
        console.log("ring tone-");
        console.log(event);

        this.device.audio.ringtoneDevices.set(event);
      }
    },
    mute() {
      if (this.notEmpty(this.call)) {
        console.log(`call mute------------------${this.call.isMuted()}`);
        this.call.mute(true);
      }
    },
    unMute() {
      if (this.notEmpty(this.call)) {
        console.log(`call Unmute------------------${this.call.isMuted()}`);
        this.call.mute(false);
      }
    },
    accept() {
      console.log("this is the accept--------");
      if (this.notEmpty(this.call)) {
        console.log("call------------------accept");
        this.call.accept();
      }
    },

    reject() {
      console.log("this is the reject--------");
      if (this.notEmpty(this.call)) {
        console.log("call---------reject");
        this.call.reject();
      }
    },
    hangUp() {
      console.log("this is the hangUp--------");
      if (this.notEmpty(this.device)) {
        console.log("call---------hangUp");
        this.device.disconnectAll();
      }
    },
    notEmpty(obj) {
      return Object.keys(obj).length != 0 ? true : false;
    },
    initiateVoiceSdk() {
      if (this.$store.getters['app/isLogin'] && this.$store.getters['app/role'] == 'agent') {

        this.$http.get("get-call-access-token").then((response) => {
          const {
            data: {
              data: { accessToken },
            },
          } = response;

          this.accessToken = accessToken;

          this.device = new Device(this.accessToken, {
            logLevel: 1,
            // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
            // providing better audio quality in restrained network conditions.
            codecPreferences: ["opus", "pcmu"],
          });
          console.log(this.device.audio);

          this.device.register();

          this.device.on("registered", function () {
            console.log("The device is ready to receive incoming calls.");
          });
          this.device.on("error", (twilioError, call) => {
            console.log("An error has occurred: ", twilioError);
          });

          this.device.on("incoming", (call) => {
            this.getAudioDevices();
            console.log("call received-----------------");
            console.log(call);
            this.$store.commit("app/UPDATE_INCOMING_CALL", true);
            this.incommingNumber = call.parameters.From;
            this.call = call;

            this.incommingCallListeners();
          });

          this.device.audio.on("deviceChange", () => {
            this.$http.get("get-call-access-token").then((res) => {
              const {
                data: {
                  data: { accessToken },
                },
              } = res;

              this.device.updateToken(accessToken);
            });
          });
        });

      }
    },

    async outBoundCall(phone_number) {
      console.log("this is the outgoing call=================");

      if (this.device) {
        this.outGoingNumber = phone_number;
        this.call = await this.device.connect({ params: { To: phone_number } });
        this.outGoingCall = true;
        this.getAudioDevices();

        // add listeners to the Call
        this.outGoingCallListeners();
      }
    },
    incommingCallListeners() {
      if (this.notEmpty(this.call)) {
        this.call.on("accept", () => {
          console.log(
            "The incoming call was accepted or the outgoing call's media session has finished setting up."
          );
        });

        this.call.on("disconnect", (call) => {
          console.log("The call has been disconnected.");
          this.$store.commit("app/UPDATE_INCOMING_CALL", false);
        });

        this.call.on("cancel", () => {
          console.log("The call has been canceled.");
          this.$store.commit("app/UPDATE_INCOMING_CALL", false);
        });

        this.call.on("mute", (isMuted, call) => {
          // isMuted is true if the input audio is currently muted
          // i.e. The remote participant CANNOT hear local device's input

          // isMuted is false if the input audio is currently unmuted
          // i.e. The remote participant CAN hear local device's input

          isMuted ? console.log("muted") : console.log("unmuted");
          this.isMuted = isMuted;
        });

        this.call.on("reject", () => {
          console.log("The call was rejected.");
          this.$store.commit("app/UPDATE_INCOMING_CALL", false);
        });
      }
    },
    outGoingCallListeners() {
      if (this.notEmpty(this.call)) {
        // "accepted" means the call has finished connecting and the state is now "open"
        this.call.on("accept", () => {
          console.log("out goin call---------accepted");
        });

        this.call.on("disconnect", () => {
          console.log("out going call--------disconnected");
          this.outGoingCall = false;
        });

        this.call.on("cancel", () => {
          console.log("out going cal--------cancel");
          this.outGoingCall = false;
        });

        this.call.on("mute", (isMuted, call) => {
          // isMuted is true if the input audio is currently muted
          // i.e. The remote participant CANNOT hear local device's input

          // isMuted is false if the input audio is currently unmuted
          // i.e. The remote participant CAN hear local device's input

          isMuted ? console.log("muted") : console.log("unmuted");
          this.isMuted = isMuted;
        });
      }
    },
  },
  computed: {
    inCommingCall() {
      return this.$store.getters["app/incomingCall"];
    },
    callStatus() {
      return this.notEmpty(this.call) ? this.call.status() : "closed";
    },
    callDirection() {
      if (this.notEmpty(this.call)) {
        return this.call._direction;
      }
    },
    incomingCallNumber() {
      return this.$store.state.app.incomingCallNumber;
    },
  },
  created() {
    EventBus.$on("outBoundCall", this.outBoundCall);
    this.initiateVoiceSdk()
  },


};
</script>

<style scoped lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

#incommingCallButton {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }

  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }

  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }

  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
