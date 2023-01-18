<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="contactcenter-mobilebox " :class="{ 'attend-shake': callStatus == 'pending' }">
      <div class="contactcenter-mb">
        <b-img src="@/assets/images/contact-center/mobile-pad.png"></b-img>
      </div>
      <div class="mobile-contact-center">
        <div v-if="inCommingCall && callStatus != 'open'">
          <div class="mobile-animation-top">
            <svg class="wave wave-sm" width="36" height="38" viewBox="0 0 36 38" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.1" d="M1 1C23 5 34.9843 23.5 34.9843 37" stroke="#FAFBFB" stroke-width="2"
                stroke-linecap="round" />
            </svg>
            <svg class="wave wave-md" width="64" height="66" viewBox="0 0 64 66" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M1 1C32.5 1 62.9715 20 62.9715 65" stroke="#FAFBFB" stroke-width="2"
                stroke-linecap="round" />
            </svg>
            <svg class="wave wave-lg" width="81" height="82" viewBox="0 0 81 82" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1.5C28 3.83333 80.6 23 79 81" stroke="#FAFBFB" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="mobile-animation-bottom">
            <svg class="wave wave-sm" width="36" height="38" viewBox="0 0 36 38" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.1" d="M34.9844 37C12.9844 33 1.00003 14.5 1.00003 0.999997" stroke="#FAFBFB"
                stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg class="wave wave-md" width="64" height="66" viewBox="0 0 64 66" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M62.9844 65C31.4844 65 1.01291 46 1.01292 0.999998" stroke="#FAFBFB"
                stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg class="wave wave-lg" width="81" height="82" viewBox="0 0 81 82" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M79.4844 80.5C52.9844 78.1667 0.384377 59 1.98438 0.999993" stroke="#FAFBFB" stroke-width="2"
                stroke-linecap="round" />
            </svg>
          </div>
        </div>
        <div class="dail-tabs">
          <!--===================================================================-->
          <div class="incom_call" v-if="inCommingCall && callDirection == 'INCOMING'">
            <div class="sending-call">
              <p>Caller ID</p>
              <span> {{ incomingCallNumber }} </span>
            </div>

            <div class="d-flex align-items-center" v-if="callStatus == 'open'">
              <div id="bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
              </div>
            </div>
            <!-- <div class="timer-call"> -->
            <!-- <svg width="100px" height="100px" viewBox="0 0 42 42" class="donut">
                          <circle id="c1" cx="21" cy="21" r="15.91549430918954" stroke-dasharray="100 0" stroke-dashoffset="100">
                          </circle>
                          <circle id="c2" cx="21" cy="21" r="15.91549430918954" stroke-dasharray="0 100" stroke-dashoffset="0">
                          </circle>
                          <g class="chart-text">
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" id="counterText">5</text>
                          </g>
                        </svg> -->
            <!-- </div> -->

            <div class="call-accept-btns d-flex align-items-center justify-content-around w-100">
              <b-link @click="callAction('reject')" v-if="callStatus == 'pending'">
                <div class="text-white disconnect"><feather-icon size="18" icon="PhoneIcon" /></div>
                <span>Decline</span>
              </b-link>
              <b-link @click="callAction('hangUp')" v-if="callStatus == 'open'">
                <div class="text-white disconnect"><feather-icon size="18" icon="PhoneIcon" /></div>
                <span>Drop Call</span>
              </b-link>
              <b-link @click="callAction('accept')" v-if="callStatus == 'pending'">
                <div class="text-white attend"><feather-icon size="18" icon="PhoneIcon" /></div>
                <span>Accept</span>
              </b-link>


              <!-- <div class="mike_pad" v-if="callStatus == 'open'">
                          <b-button v-if="isMuted" variant="primary" @click="callAction('unMute')">
                            <feather-icon size="20" icon="MicOffIcon" />
                          </b-button>
                          <b-button v-else variant="primary" @click="callAction('mute')">
                            <feather-icon size="20" icon="MicIcon" />
                          </b-button>
                        </div> -->


              <div v-if="callStatus == 'open'">
                <b-link v-if="isMuted" @click="callAction('unMute')">
                  <div class="text-white mike">
                    <feather-icon size="20" icon="MicOffIcon" />
                  </div>
                  <span>Un Mute</span>
                </b-link>
                <b-link v-else @click="callAction('mute')">
                  <div class="text-white mike">
                    <feather-icon size="20" icon="MicIcon" />
                  </div>
                  <span>Mute</span>
                </b-link>
              </div>



              <!-- <b-link v-if="callStatus == 'open'">
                          <div class="text-white mike">
                            <feather-icon size="20" icon="MicIcon" />
                            <feather-icon size="20" v-if="false" icon="MicOffIcon" />
                          </div>
                          <span>Mute</span>
                          <span v-if="false">False</span>
                        </b-link> -->

            </div>
          </div>
          <div class="incom_call" v-else-if="!inCommingCall && callDirection == 'OUTGOING'">
            <div class="sending-call">
              <p>Caller ID</p>
              <span> {{ phone_number }} </span>
            </div>
            <!-- <div class="timer-call"> -->
            <!-- <svg width="100px" height="100px" viewBox="0 0 42 42" class="donut">
                            <circle id="c1" cx="21" cy="21" r="15.91549430918954" stroke-dasharray="100 0" stroke-dashoffset="100">
                            </circle>
                            <circle id="c2" cx="21" cy="21" r="15.91549430918954" stroke-dasharray="0 100" stroke-dashoffset="0">
                            </circle>
                            <g class="chart-text">
                              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" id="counterText">5</text>
                            </g>
                          </svg> -->
            <!-- </div> -->
            <div class="d-flex align-items-center" v-if="callStatus == 'open'">
              <div id="bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
              </div>
            </div>

            <div class="call-accept-btns d-flex align-items-center justify-content-around w-100">

              <b-link @click="callAction('hangUp')">
                <div class="text-white disconnect"><feather-icon size="18" icon="PhoneIcon" /></div>
                <span>Drop Call</span>
              </b-link>



              <div v-if="callStatus == 'open'">
                <b-link v-if="isMuted" @click="callAction('unMute')">
                  <div class="text-white mike">
                    <feather-icon size="20" icon="MicOffIcon" />
                  </div>
                  <span>Un Mute</span>
                </b-link>
                <b-link v-else @click="callAction('mute')">
                  <div class="text-white mike">
                    <feather-icon size="20" icon="MicIcon" />
                  </div>
                  <span>Mute</span>
                </b-link>
              </div>


            </div>
          </div>

          <b-tabs v-else content-class="" nav-wrapper-class="tabs-dial-btn">
            <!--=========Recents Tab==============-->
            <b-tab>
              <div class="recent-tab mt-2">
                <ul>
                  <li>
                    <div class="recent-call-tab">
                      <div class="recent-userimg">
                        <b-img src="@/assets/images/contact-center/user-bg.png"></b-img>
                      </div>
                      <div class="recent-num">
                        <h2>(632) 544-6474</h2>
                        <p>8/15/17 2:49PM</p>
                      </div>
                      <div class="recent-callbtn">
                        <feather-icon icon="PhoneIcon" size="28" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="recent-call-tab">
                      <div class="recent-userimg">
                        <b-img src="@/assets/images/contact-center/user-bg.png"></b-img>
                      </div>
                      <div class="recent-num">
                        <h2>(632) 544-6474</h2>
                        <p>8/15/17 2:49PM</p>
                      </div>
                      <div class="recent-callbtn">
                        <feather-icon icon="PhoneIcon" size="28" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="recent-call-tab">
                      <div class="recent-userimg">
                        <b-img src="@/assets/images/contact-center/user-bg.png"></b-img>
                      </div>
                      <div class="recent-num">
                        <h2>(632) 544-6474</h2>
                        <p>8/15/17 2:49PM</p>
                      </div>
                      <div class="recent-callbtn">
                        <feather-icon icon="PhoneIcon" size="28" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <template #title>
                <div class="recent-calls calls-contact-btn text-center">
                  <feather-icon icon="ClockIcon" size="21" />
                  Rescents
                </div>
              </template>
            </b-tab>
            <!--=========Recents Tab End===========-->
            <!--=========Dial Tab==============-->
            <b-tab active class="dail-panel">

              <div class="h-100">
                <div class="dail-enter-numb">
                  <b-form-group>
                    <b-form-input class="" id="phoneInput" v-model="phone_number" holder="" />
                  </b-form-group>
                </div>
                <div class="Dail-count">
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(1)">1
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(2)">2
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(3)">3
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(4)">4
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(5)">5
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(6)">6
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(7)">7
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(8)">8
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(9)">9
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit('+')">+
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit(0)">0
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers" @click="pressDigit('*')">*
                    </div>
                  </div>
                  <div class="dial-numb">
                    <div class="dial-numbers call-btn cursor-pointer" @click="makeCall" v-if="isCalled">
                      <feather-icon size="18" icon="PhoneIcon" class="text-white" />
                    </div>
                    <div class="dial-numbers" v-else>
                      <feather-icon size="18" icon="PhoneIcon" class="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <template #title>
                <div class="dialpad-btn calls-contact-btn text-center">
                  <feather-icon icon="GridIcon" size="21" />
                  Dial
                </div>
              </template>
            </b-tab>
            <!--=========Dial Tab End===========-->
            <!--=========Lead Tab==============-->
            <b-tab>
              <p>Lead Tab Comming Soon</p>
              <template #title>
                <div class="leads-btn calls-contact-btn text-center">
                  <feather-icon icon="StarIcon" size="21" />
                  Lead
                </div>
              </template>
            </b-tab>
            <!--=========Lead Tab End===========-->
          </b-tabs>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BCard,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BLink,
  BImg,
  BTabs,
  BTab,
  BButton
} from "bootstrap-vue";
import EventBus from "@/event/EventBus";
export default {
  components: {
    BCard,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BLink,
    BImg,
    BTabs,
    BTab,
    BButton
  },
  data() {
    return {
      isCalled: true,
      phone_number: '+1',
      buttonRings: [
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-0.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-1.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-2.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-3.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-4.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-5.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-6.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-7.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-8.mp3",
        "https://sdk.twilio.com/js/client/sounds/releases/1.0.0/dtmf-9.mp3"
      ]
    }
  },
  methods: {
    callAction(e) {
      EventBus.$emit('callAction', e)
    },
    pressKeyboardNumericKey(event) {
      console.log(window.event)
      const digit = event.slice(event.length - 1)
      if (digit == '+') {
        new Audio(this.buttonRings[4]).play();

      } else {
        new Audio(this.buttonRings[digit]).play();

      }
    },
    pressDigit(digit) {
      if (digit == '+') {
        new Audio(this.buttonRings[4]).play();

      } else {
        new Audio(this.buttonRings[digit]).play();

      }
      this.phone_number += digit
    },
    makeCall() {
      EventBus.$emit("outBoundCall", this.phone_number);
    },
    attendCall() {
      document.getElementById('attendCall').style.display = 'none';
    }
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
}
</script>

<style scoped>
.font-large-1 :hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>