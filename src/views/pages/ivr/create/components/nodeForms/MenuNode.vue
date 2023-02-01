<template>
  <div>
    <div :id="`${node.id}`" class="head-node-ivr row items-center no-wrap m-auto w-100" :class="{
      'bg-direction': node.blinkHeader,
      ' border-error-ivr': errorCount > 0,
    }">
      <div class="col d-flex align-items-center" v-b-toggle="`ivr-collapse-${node.id}`">
        <feather-icon icon="AlignLeftIcon" class="mr-1" size="21" />
        <h2 class="text-h6">
          <node-head-title :node="node" />
        </h2>

        <div class="ivr-tooptip-quiz" v-if="errorCount > 0">
          <div :id="`${node.type}-evrError-${node.id}`" class="ivr-note-box ivrError">
            <feather-icon icon="AlertTriangleIcon" class="text-white IVRAlertTriangleIcon" size="27" />
            <span class="error-count">{{ errorCount }}</span>
          </div>

          <b-tooltip :target="`${node.type}-evrError-${node.id}`" triggers="hover" placement="bottomright">
            <div class="ivr-note-box">
              <div class="ivrErrorContainer">
                <div class="ivrError-content mt-1">
                  <span v-for="(error, key) in getErrors" class="d-flex align-items-center mb-1">
                    <feather-icon icon="AlertTriangleIcon" class="mr-1" size="21" />
                    <p>{{ error }}</p>
                  </span>
                </div>
              </div>
            </div>
          </b-tooltip>
        </div>
      </div>
      <div class="col-auto">
        <div>
          <span class="IvrNodeDeleteIconArea" @click="remove(node)">
            <img class="IvrNodeDeleteIcon" src="@/assets/images/ivr/Delete.png" />
          </span>
          <header-goto-icon :node="node" />
        </div>
      </div>
    </div>

    <div class="p-1">
      <b-collapse v-model="node.isOpen" :id="collapseId">
        <validation-observer ref="MenuNode" #default="{ invalid }">
          <b-row class="">
            <b-col md="12" class="mb-2">
              <validation-provider #default="{ errors }" name="Time out" vid="time_out" rules="required|max:5|positive">
                <b-form-group>
                  <div class="d-flex alig-items-end justify-content-between">
                    <div class="label-tooltip">
                      <label class="IvrNodeInputLabel">Time Limit(sec)</label>
                      <div class="ivr-tooptip-quiz">
                        <svg :id="`${node.type}-ivrmenu-tool-1-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white" />
                          <path
                            d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                            fill="black" />
                        </svg>
                        <b-tooltip :target="`${node.type}-ivrmenu-tool-1-${node.id}`" triggers="hover">
                          Please set the amount of time, in seconds, the caller
                          has to give input.
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="ivr-input">
                      <div class="input-gradient">
                        <b-form-input type="number" v-model="menu.timeout" @keydown="ivrInputValidate($event, 10)"
                          placeholder="10" />
                      </div>
                    </div>
                  </div>
                </b-form-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col md="12" class="mb-2">
              <b-form-group>
                <div class="d-flex alig-items-end justify-content-between">
                  <div class="label-tooltip">
                    <label class="IvrNodeInputLabel">Retries</label>
                    <div class="ivr-tooptip-quiz">
                      <svg :id="`${node.type}-ivrmenu-tool-2-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8.5" r="8" fill="white" />
                        <path
                          d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                          fill="black" />
                      </svg>
                      <b-tooltip :target="`${node.type}-ivrmenu-tool-2-${node.id}`" triggers="hover">
                        Please set the number of chances a user has to enter
                        correct information.
                      </b-tooltip>
                    </div>
                  </div>
                  <div class="ivr-input">
                    <div class="input-gradient">
                      <b-form-input type="number" v-model="menu.retries" @keydown="ivrInputValidate($event, 10)"
                        placeholder="2" />
                    </div>
                  </div>
                </div>
              </b-form-group>
            </b-col>
            <div class="pl-1 mb-2">
              <label class="IvrNodeInputLabel">Prompt*</label><br />

              <small class="text-danger" v-if="audioPath == ''">Must have value</small>
            </div>
            <b-col md="12" class="mb-2">
              <b-form-group>
                <div class="d-flex alig-items-end justify-content-between">
                  <div class="label-tooltip">
                    <label class="IvrNodeInputLabel">Play</label>
                    <div class="ivr-tooptip-quiz">
                      <svg :id="`${node.type}-ivrmenu-tool-3-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8.5" r="8" fill="white" />
                        <path
                          d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                          fill="black" />
                      </svg>
                      <b-tooltip :target="`${node.type}-ivrmenu-tool-3-${node.id}`" triggers="hover">
                        Set how many times you want your message to repeat.
                      </b-tooltip>
                    </div>
                  </div>
                  <div class="ivr-input">
                    <div class="input-gradient">
                      <b-form-input type="number" id="reproduce" v-model="menu.reproduce"
                        @keydown="ivrInputValidate($event, 10)" placeholder="1" />
                    </div>
                  </div>
                </div>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mb-2">
              <b-form-group>
                <div class="ivr-pill-btn">
                  <b-button-group class="group-btn">
                    <b-button @click="checkIvrType('play')" :class="ivrType == 'play' ? 'active' : ''">Play</b-button>
                    <b-button @click="checkIvrType('say')" :class="ivrType == 'say' ? 'active' : ''">Say</b-button>
                  </b-button-group>
                </div>
              </b-form-group>
            </b-col>
            <div v-if="ivrType != ''" class="w-100">
              <b-col md="12" class="mb-2" v-if="ivrType == 'play'">
                <div class="label-tooltip" v-if="!audioPath">
                  <label class="IvrNodeInputLabel">Audio/AI </label>
                  <div class="ivr-tooptip-quiz">
                    <svg :id="`${node.type}-ivrmenu-tool-4-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8.5" r="8" fill="white" />
                      <path
                        d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                        fill="black" />
                    </svg>
                    <b-tooltip :target="`${node.type}-ivrmenu-tool-4-${node.id}`" triggers="hover">
                      Upload or select an audio file to play . Supports the
                      following types ONLY:
                      <br />
                      MP3: MPEG ADTS, layer III, v1, 128 kbs, 44.1 kHz,
                      JntStereo
                      <br />
                      WAV: WAVE PCM. 8,000 Hz 16 bit or 11,025 Hz 16 bit PCM
                    </b-tooltip>
                  </div>
                </div>
                <div class="ivrUploadFileContainer">
                  <div class="IvrUploadFile" :class="isUploading ? 'IvrUploadFileBColor' : ''"
                    @click="chooseFile(`${node.id}-audioFile`)" v-if="!audioPath">
                    <div v-if="!audioPath && !isUploading">
                      <img src="@/assets/images/ivr/uploadIcon.png" />
                      <p>Drop or Click to Upload Recorded Audio File</p>
                    </div>
                    <div class="text-center" v-if="isUploading">
                      <b-spinner class="ml-auto mb-1"></b-spinner><br />
                      <strong>Upload File...</strong>
                    </div>
                  </div>
                  <div v-if="audioPath" class="mb-5">
                    <b-row>
                      <b-col md="5">
                        <div class="d-flex justify-content-center align-items-center h-100">
                          <span>Audio Uploaded</span>
                        </div>
                      </b-col>
                      <b-col md="5">
                        <div class="d-flex justify-content-center align-items-center">
                          <!-- <b-form-input type="text" placeholder="value"></b-form-input> -->
                          <span>{{ audioName }}</span>
                          <div id="sizeAudio"></div>
                        </div>
                      </b-col>
                      <b-col md="2">
                        <div class="d-flex justify-content-center align-items-center">
                          <span v-if="audioPath" @click="removeSound">
                            <feather-icon size="1.5x" icon="TrashIcon" />
                          </span>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                  <!-- <div v-if="audioPath">
                  <img src="@/assets/images/ivr/sound.jpg" style=" width:60%"/>
                </div>
                <span  v-if="audioPath" class="removeIcon" @click="removeSound">
                  <feather-icon size="1.5x" icon="TrashIcon" />
                </span> -->
                </div>
                <b-form-file ref="file" v-on:change="onFileChange" :id="`${node.id}-audioFile`" accept=".mp3" plain
                  :hidden="true">
                </b-form-file>
              </b-col>
              <b-col md="12" class="mb-2" v-if="ivrType == 'say'">
                <b-form-group>
                  <div class="d-flex alig-items-end justify-content-between mb-2">
                    <div class="label-tooltip">
                      <label class="IvrNodeInputLabel">Voice</label>
                      <div class="ivr-tooptip-quiz">
                        <svg :id="`${node.type}-ivrmenu-tool-6-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white" />
                          <path
                            d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                            fill="black" />
                        </svg>
                        <b-tooltip :target="`${node.type}-ivrmenu-tool-6-${node.id}`" triggers="hover">
                          Select either a Male or Female Voice from the
                          dropdown.
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="ivr-input">
                      <div class="input-gradient">
                        <v-select class="IvrNodeVSelect" v-model="menu.text_voice" :options="voice" label="name"
                          placeholder="Man">
                        </v-select>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex alig-items-end justify-content-between mb-2">
                    <div class="label-tooltip">
                      <label class="IvrNodeInputLabel">Language</label>
                      <div class="ivr-tooptip-quiz">
                        <svg :id="`${node.type}-ivrmenu-tool-7-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white" />
                          <path
                            d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                            fill="black" />
                        </svg>
                        <b-tooltip :target="`${node.type}-ivrmenu-tool-7-${node.id}`" triggers="hover">
                          Select the language of your provided text from the
                          dropdown.
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="ivr-input">
                      <div class="input-gradient">
                        <v-select class="IvrNodeVSelect" v-model="menu.text_language" :options="languages" label="name"
                          placeholder="Select Language">
                        </v-select>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-start justify-content-between mb-2">
                    <div class="label-tooltip">
                      <label class="IvrNodeInputLabel">Text</label>
                      <div class="ivr-tooptip-quiz">
                        <svg :id="`${node.type}-ivrmenu-tool-8-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white" />
                          <path
                            d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                            fill="black" />
                        </svg>
                        <b-tooltip :target="`${node.type}-ivrmenu-tool-8-${node.id}`" triggers="hover">
                          Please provide the text you wish to be read.
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="ivr-input menu_node text_area">
                      <div class="input-gradient">
                        <b-form-textarea id="seconds"  v-model="menu.text"
                          @keydown="ivrInputValidateText($event, 200)" placeholder="text" />
                      </div>
                    </div>
                  </div>
                </b-form-group>
              </b-col>
            </div>
            <hr />
            <b-col md="12" class="mb-2">
              <validation-provider #default="{ errors }" name="tag name" vid="tag_name"
                rules="required|min:5|max:18|alpha-num">
                <b-form-group>
                  <div class="d-flex alig-items-end justify-content-between">
                    <div class="label-tooltip">
                      <label class="IvrNodeInputLabel">Menu Tag Name</label>
                      <div class="ivr-tooptip-quiz">
                        <svg :id="`${node.type}-ivrmenu-tool-9-${node.id}`" width="16" height="17" viewBox="0 0 16 17"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white" />
                          <path
                            d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                            fill="black" />
                        </svg>
                        <b-tooltip :target="`${node.type}-ivrmenu-tool-9-${node.id}`" triggers="hover">
                          This tag will determine how the call is processed in
                          subsequent nodes.
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="ivr-input">
                      <div class="input-gradient">
                        <b-form-input id="tagName" type="text" v-model="menu.tagName" placeholder="Tag Name"
                          @keydown="ivrInputValidateText($event, 50)" />
                      </div>

                      <!-- <small class="text-danger mt-2">{{ errors[0] }}</small> -->
                    </div>
                  </div>
                </b-form-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
        </validation-observer>
      </b-collapse>
      <div>
        <div class="failure-node">
          <child-node-menu label="On Failure" :node="node" type="fail" />
        </div>
        <div v-for="(no, index) in 9" :key="index">
          <div class="mt-2">
            <child-node-menu :label="`On Press ${no}`" :node="node" :type="no" />
          </div>
        </div>
        <div>
          <div class="mt-2">
            <child-node-menu label="On Press 0" :node="node" :type="0" />
          </div>
        </div>
      </div>
      <!-- for new build  -->
    </div>

  </div>
</template>
<script>
import {
  BRow,
  BCol,
  BButton,
  BFormInput,
  BFormGroup,
  BFormFile,
  BCollapse,
  BTooltip,
  VBToggle,
  BButtonGroup,
  BSpinner,
  BFormTextarea,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { toastAlert } from "@core/mixins/ui/toast";
import { globalHelper } from "@core/mixins/ui/global";
import { required, min, max, alphaNum, positive } from "@validations";
import { debounce } from "@/commonFunction/helpers.js";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  props: ["node"],
  components: {
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormFile,
    vSelect,
    BCollapse,
    BTooltip,
    VBToggle,
    BButtonGroup,
    BSpinner,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
  },

  directives: {
    "b-toggle": VBToggle,
  },
  computed: {
    collapseId() {
      return `ivr-collapse-${this.node.id}`;
    },
    getErrors() {
      return this.$store.getters["ivrBuilder/getErrors"](this.node.id);
    },
    errorCount() {
      return this.$store.getters["ivrBuilder/errorCount"](this.node.id);
    },
    voice() {
      return this.$store.state.ivrBuilder.voice;
    },
    languages() {
      return this.$store.state.ivrBuilder.languages;
    },
  },
  watch: {
    menu: {
      handler() {
        // here having access to the new and old value

        this.validateDebounceNode();
      },
      deep: true,
      // immediate: true //  Also very important the immediate in case you need it, the callback will be called immediately after the start of the observation
    },
    audioPath() {
      this.validateNode();
    },
    ivrType() {
      this.validateNode();
    },
  },
  data() {
    return {
      menu: {
        timeout: "",
        retries: "",
        reproduce: "",
        tagName: "",
        text: "",
        text_voice: "man",
        text_language: "en-CA",
        file: "",
        sound: "",
        uuid: "",
      },
      node_content_type: "",
      ivrType: "play",
      audioPath: "",
      audioName: "",
      isUploading: false,
      isUpdate: false,
      min,
      max,
      alphaNum,
      positive,
      required,
    };
  },
  mixins: [toastAlert, globalHelper],
  methods: {
    validateTimeOut(value) {
      if (value < 0) {
        this.menu.timeout = 1;
      }

      if (value === "0") {
        this.menu.timeout = 1;
      }
    },
    validateTagName(value) {
      if (value < 0) {
        this.menu.tagName = "";
      }
    },
    getChildNodeUUid(type) {
      console.log(this.node.parentId, type);
      const record = this.$store.getters["ivrBuilder/isChildExist"](
        this.node.id,
        type
      );

      if (record) {
        return record.id;
      } else {
        return "";
      }
    },
    checkIvrType(val) {
      this.ivrType = val;
      // this.checkError()
    },
    chooseFile(fileId) {
      document.getElementById(fileId).value = null;
      document.getElementById(fileId).click();
    },

    validateDebounceNode: debounce(function () {
      this.validateNode();
    }, 500),
    validateNode() {
      if (!this.$store.state.ivrBuilder.isEdited) {
        const params = {
          url: `create-menu-validation?uuid=${this.node.id}`,
          node_type: this.node.node_type,
          nodeId: this.node.id,
          timeout: this.menu.timeout ? this.menu.timeout : 10,
          no_of_retries: this.menu.retries ? this.menu.retries : 2,
          no_of_reproduce: this.menu.reproduce ? this.menu.reproduce : 1,
          tag_name: this.menu.tagName,
          node_content_type: this.ivrType,
          text: this.menu.text,
          sound: this.audioPath,
          text_voice: this.menu.text_voice ? this.menu.text_voice : "man",
          text_language: this.menu.text_language
            ? this.menu.text_language
            : "en-US",
          goto_source_node_uuid: this.node.gotoSourceNodeId,
          type: this.node.type,
        };
        this.$store.dispatch("ivrBuilder/validateNode", params);
      }
    },

    onFileChange(e) {
      const node = this.$props.node;
      const file = document.getElementById(`${node.id}-audioFile`);
      const fileName = file.files[0].name;
      const fileFormat = fileName.split(".").pop();
      if (fileFormat == "mp3") {
        const fileSize = file.files[0].size;
        const fileSizeInKB = Math.round(fileSize / 1024);
        if (fileSizeInKB >= 4096) {
          this.errorToast("Error", "Please select a file less than 4mb!");
        } else {
          this.isUploading = true;
          this.audioPath = "";
          const params = new FormData();
          params.append("audio", file.files[0]);
          this.$http
            .post("upload-audio", params)
            .then((response) => {
              this.isUploading = false;
              this.audioPath = response.data;
              let text = response.data;
              const myArray = text.split("/");
              this.audioName = myArray[6];
            })
            .catch((error) => { });
        }
      } else {
        this.errorToast("Error", "Please Upload sound mp3 format!");
      }
    },
    removeSound() {
      this.audioPath = "";
    },
    assignFormValue() {
      if (Object.keys(this.node.formData).length) {
        const { formData } = this.node;
        this.menu.timeout = formData.timeout;
        this.menu.retries = formData.no_of_retries;
        this.menu.reproduce = formData.no_of_reproduce;
        this.menu.tagName = formData.tag_name;
        this.menu.text = formData.text;
        this.menu.text_voice = formData.text_voice;
        this.menu.text_language = formData.text_language;
        this.ivrType = formData.node_content_type;
        this.audioPath = formData.sound;
        this.audioName = formData.sound_label;
      }
    },
  },
  created() {
    this.assignFormValue();
    this.validateNode();
  },
};
</script>

<style
  lang="scss"
  scoped
>

</style>
