<template>
  <div>
    <task-router @reservation="getReservation" />
    <div class="incoming-calls-sc" v-if="inCommingCall">
      <div class="left-incoming-calls">
        <div class="incoming-id text-center">
          <span>Caller ID</span>
          <h2>
            {{ incomingCallNumber }}
          </h2>
        </div>
        <div class="attend-call">
          <div @click="reject" v-if="callStatus == 'pending'">
            <div class="text-white disconnect mr-3"><feather-icon size="18" icon="PhoneIcon" /></div>
          </div>
          <div v-if="callStatus == 'open'" class="d-flex align-items-center">
            <div @click="hangUp">
              <div class="text-white disconnect mr-3"><feather-icon size="18" icon="PhoneIcon" /></div>
            </div>
            <div>
              <b-link v-if="isMuted" @click="unMute">
                <div class="text-white mike">
                  <feather-icon size="20" icon="MicOffIcon" />
                </div>
                <span>Un Mute</span>
              </b-link>
              <b-link v-else @click="mute">
                <div class="text-white mike">
                  <feather-icon size="20" icon="MicIcon" />
                </div>
                <span>Mute</span>
              </b-link>
            </div>
            <!-- <div class="mike">
                <feather-icon size="20" icon="MicIcon" />
                <feather-icon size="20" v-if="false" icon="MicOffIcon" />
              </div> -->
          </div>
          <div @click="accept" v-if="callStatus == 'pending'">
            <div class="text-white attend mr-2"><feather-icon size="18" icon="PhoneIcon" /></div>
          </div>

        </div>
      </div>
      <div class="top-incoming-calls d-none">
        <div class="timer">
          <span>00:40</span>
        </div>
        <div class="incoming-id text-center">
          <span>Caller ID </span>
          {{ incomingCallNumber }}
        </div>
        <div class="attend-call">

          <div @click="reject" v-if="callStatus == 'pending'">
            <div class="text-white disconnect mr-3"><feather-icon size="18" icon="PhoneIcon" /></div>
          </div>
          <div @click="hangUp" v-if="callStatus == 'open'">
            <div class="text-white disconnect mr-3"><feather-icon size="18" icon="PhoneIcon" /></div>
          </div>
          <div @click="accept" v-if="callStatus != 'open'">
            <div class="text-white attend mr-2"><feather-icon size="18" icon="PhoneIcon" /></div>
          </div>



        </div>
      </div>
    </div>
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
  BLink
} from "bootstrap-vue";
import TaskRouter from './TaskRouter.vue'

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
    BLink,
    TaskRouter,

  },
  data() {
    return {
      isModalOpen: true,
      device: {},
      call: {},
      incommingNumber: "",
      outGoingNumber: "",
      outGoingCall: false,
      // isMuted: false,
      accessToken: "",
      speakerOutputDevice: "default",
      speakerAvailableOutputDevices: [],
      ringTuneOutputDevice: "default",
      ringTuneAvailableOutputDevices: [],
      reservation: '',
      worker: '',
      taskId: '',
    };
  },
  watch: {
    '$store.state.app.user.user_uuid': function () {
      this.initiateVoiceSdk()
    }
  },
  methods: {
    getReservation(e) {
      console.log(e)
      this.reservation = e
    },

    callAction(params) {
      console.log('=======================11111111111111111111')
      console.log(params)
      EventBus.$emit('callAction', params)
    },
    rejectCall() {
      if (Object.keys(this.worker).length > 0) {
        const params = { "Priority": "15" };
        this.worker.updateTask(taskSid, params,
          function (error, updatedTask) {
            if (error) {
              console.log(error.code);
              console.log(error.message);
              return;
            }
            console.log("Updated Task Priority: " + updatedTask.priority);
          }
        );
      }

    },
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
        this.updateMutedState(true)
      }
    },
    unMute() {
      if (this.notEmpty(this.call)) {
        console.log(`call Unmute------------------${this.call.isMuted()}`);
        this.call.mute(false);
        this.updateMutedState(false)

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
      if (this.notEmpty(this.call)) {
        console.log("call---------reject");
        console.log(this.call)
        this.reservation.reject()
        this.call.reject();
      }
    },
    hangUp() {
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
            //before incomming  call make it un mute
            this.updateMutedState(false)
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
      //before out going call make it un mute
      this.updateMutedState(false)

      if (this.device) {
        this.outGoingNumber = phone_number;
        this.call = await this.device.connect({ params: { To: phone_number } });
        this.outGoingCall = true;
        this.getAudioDevices();

        // add listeners to the Call
        this.outGoingCallListeners();
      }
    },
    updateMutationOnDropCall() {
      //this function will be trigger on cancel, reject and on disconnect the call
      this.$store.commit("app/UPDATE_INCOMING_CALL", false);
      //update call status
      this.$store.commit('app/UPDATE_CALL_STATUS', this.call.status())
      this.$store.commit('app/UPDATE_CALL_DIRECTION', this.call._direction)
    },
    incommingCallListeners() {

      if (this.notEmpty(this.call)) {
        console.log(this.call.status())
        //update call status
        this.$store.commit('app/UPDATE_CALL_STATUS', this.call.status())
        this.$store.commit('app/UPDATE_CALL_DIRECTION', this.call._direction)


        this.call.on("accept", () => {
          this.$store.commit('app/UPDATE_CALL_STATUS', 'open')

          console.log(
            "The incoming call was accepted or the outgoing call's media session has finished setting up."
          );
        });

        this.call.on("disconnect", (call) => {
          console.log("The call has been disconnected.");
          this.updateMutationOnDropCall()

        });

        this.call.on("cancel", () => {
          console.log("The call has been canceled.");

          this.updateMutationOnDropCall()

        });

        this.call.on("mute", (isMuted, call) => {
          // isMuted is true if the input audio is currently muted
          // i.e. The remote participant CANNOT hear local device's input

          // isMuted is false if the input audio is currently unmuted
          // i.e. The remote participant CAN hear local device's input

          isMuted ? console.log("muted") : console.log("unmuted");
          // this.isMuted = isMuted;
          this.updateMutedState(isMuted)
        });

        this.call.on("reject", () => {
          console.log("The call was rejected.");
          this.updateMutationOnDropCall()

        });
      }
    },

    outGoingCallListeners() {
      if (this.notEmpty(this.call)) {
        console.log('----------------out going call-----------------------------')
        console.log(this.call)
        this.$store.commit('app/UPDATE_CALL_DIRECTION', this.call._direction)
        // "accepted" means the call has finished connecting and the state is now "open"
        this.call.on("accept", () => {
          this.$store.commit('app/UPDATE_CALL_STATUS', this.call.status())
          console.log("out goin call---------accepted");
        });

        this.call.on("disconnect", () => {
          console.log("out going call--------disconnected");
          // this.outGoingCall = false;
          this.$store.commit('app/UPDATE_CALL_DIRECTION', false)
          this.$store.commit('app/UPDATE_CALL_STATUS', this.call.status())


        });

        this.call.on("cancel", () => {
          console.log("out going cal--------cancel");
          // this.outGoingCall = false;
          this.$store.commit('app/UPDATE_CALL_DIRECTION', false)
          this.$store.commit('app/UPDATE_CALL_STATUS', this.call.status())


        });

        this.call.on("mute", (isMuted, call) => {
          // isMuted is true if the input audio is currently muted
          // i.e. The remote participant CANNOT hear local device's input

          // isMuted is false if the input audio is currently unmuted
          // i.e. The remote participant CAN hear local device's input

          isMuted ? console.log("muted") : console.log("unmuted");
          // this.isMuted = isMuted;
          this.updateMutedState(isMuted)

        });
      }
    },
    updateMutedState(isMuted) {
      this.$store.commit('app/UPDATE_IS_MUTED', isMuted)
    },

  },
  computed: {
    inCommingCall() {
      return this.$store.getters["app/incomingCall"];
    },
    callStatus() {
      return this.$store.state.app.callStatus;
    },
    callDirection() {
      return this.$store.state.app.callDirection;
    },
    incomingCallNumber() {
      return this.$store.state.app.incomingCallNumber;
    },
    isMuted() {
      return this.$store.state.app.isMuted;

    }
  },
  created() {
    EventBus.$on("outBoundCall", this.outBoundCall);
    EventBus.$on('callAction', (e) => {
      this[e]()
    })
    this.initiateVoiceSdk()
  },
  destroyed() {
    EventBus.$off('callAction');

  }
};
</script>
  
<style scoped lang="scss">

</style>
  