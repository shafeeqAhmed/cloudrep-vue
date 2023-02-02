<template>
  <div>
    <div
      :id="`${node.id}`"
      class="head-node-ivr row items-center no-wrap m-auto w-100"
      :class="{
        'bg-direction': node.blinkHeader,
        'border-error-ivr': Object.keys(getErrors).length > 0,
      }"
    >
      <div
        class="col d-flex align-items-center"
        v-b-toggle="`ivr-collapse-${node.id}`"
      >
        <feather-icon
          icon="GridIcon"
          class="mr-1"
          size="21"
        />
        <h2 class="text-h6">
          <node-head-title :node="node" />
        </h2>

        <div
          class="ivr-tooptip-quiz"
          v-if="Object.keys(getErrors).length > 0"
        >
          <div
            :id="`${node.type}-evrError-${node.id}`"
            class="ivr-note-box ivrError"
          >
            <feather-icon
              icon="AlertTriangleIcon"
              class="text-white IVRAlertTriangleIcon"
              size="27"
            />
            <span class="error-count">{{ Object.keys(getErrors).length }}</span>
          </div>

          <b-tooltip
            :target="`${node.type}-evrError-${node.id}`"
            triggers="hover"
            placement="bottomright"
          >
            <div class="ivr-note-box">
              <div class="ivrErrorContainer">
                <div class="ivrError-content mt-1">
                  <span
                    v-for="(error, key) in getErrors"
                    class="d-flex align-items-center mb-1"
                  >
                    <feather-icon
                      icon="AlertTriangleIcon"
                      class="mr-1"
                      size="21"
                    />
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
          <span
            class="IvrNodeDeleteIconArea"
            @click="remove(node)"
          >
            <img
              class="IvrNodeDeleteIcon"
              src="@/assets/images/ivr/Delete.png"
            />
          </span>
          <header-goto-icon :node="node" />
        </div>
      </div>
    </div>

    <div class="p-1">
      <b-collapse
        v-model="node.isOpen"
        :id="collapseId"
      >
        <div class="pl-1 my-2">
          <label class="IvrNodeInputLabel">Prompt*</label><br />
          <small
            class="text-danger"
            v-if="!audioPath"
            >Must have value</small
          >
        </div>
        <b-col
          md="12"
          class="p-1 mb-2"
        >
          <b-form-group>
            <div class="d-flex justify-content-between align-items-center">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Play</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-1-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-1-${node.id}`"
                    triggers="hover"
                  >
                    The numbers of time recorded message is reproduced
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    type="number"
                    id="gatherPlays"
                    v-model="gather.plays"
                    @keydown="ivrInputValidate($event, 10)"
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>

        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="ivr-pill-btn">
              <b-button-group class="group-btn">
                <b-button
                  @click="checkIvrType('play')"
                  :class="ivrType == 'play' ? 'active' : ''"
                  >Play</b-button
                >
                <b-button
                  @click="checkIvrType('say')"
                  :class="ivrType == 'say' ? 'active' : ''"
                  >Say</b-button
                >
              </b-button-group>
            </div>
          </b-form-group>
        </b-col>
        <div v-if="ivrType != ''">
          <b-col
            md="12"
            class="mb-2"
            v-if="ivrType == 'play'"
          >
            <div class="ivrUploadFileContainer">
              <div
                class="IvrUploadFile"
                :class="isUploading ? 'IvrUploadFileBColor' : ''"
                @click="chooseFile(`${node.id}-audioFile`)"
                v-if="!audioPath"
              >
                <div v-if="!audioPath && !isUploading">
                  <img src="@/assets/images/ivr/uploadIcon.png" />
                  <p>Drop or Click to Upload Recorded Audio File</p>
                </div>
                <div
                  class="text-center"
                  v-if="isUploading"
                >
                  <b-spinner class="ml-auto mb-1"></b-spinner><br />
                  <strong>Upload File...</strong>
                </div>
              </div>
              <div
                v-if="audioPath"
                class="mb-5"
              >
                <b-row>
                  <b-col md="5">
                    <div
                      class="d-flex justify-content-center align-items-center h-100"
                    >
                      <span>Audio Uploaded</span>
                    </div>
                  </b-col>
                  <b-col md="5">
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <!-- <b-form-input type="text" placeholder="value"></b-form-input> -->
                      <span>{{ audioName }}</span>
                      <div id="sizeAudio"></div>
                    </div>
                  </b-col>
                  <b-col md="2">
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <span
                        v-if="audioPath"
                        @click="removeSound"
                      >
                        <feather-icon
                          size="1.5x"
                          icon="TrashIcon"
                        />
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
            <b-form-file
              ref="file"
              v-on:change="onFileChange"
              :id="`${node.id}-audioFile`"
              accept=".mp3"
              plain
              :hidden="true"
            >
            </b-form-file>
          </b-col>
          <b-col
            md="12"
            class="mb-2"
            v-if="ivrType == 'say'"
          >
            <b-form-group>
              <div class="d-flex alig-items-end justify-content-between mb-2">
                <div class="label-tooltip">
                  <label class="IvrNodeInputLabel">Voice</label>
                  <div class="ivr-tooptip-quiz">
                    <svg
                      :id="`${node.type}-ivrgather-2-${node.id}`"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8.5"
                        r="8"
                        fill="white"
                      />
                      <path
                        d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                        fill="black"
                      />
                    </svg>
                    <b-tooltip
                      :target="`${node.type}-ivrgather-2-${node.id}`"
                      triggers="hover"
                    >
                      The type of voice that will be used.
                    </b-tooltip>
                  </div>
                </div>
                <div class="ivr-input">
                  <div class="input-gradient">
                    <v-select
                      class="IvrNodeVSelect"
                      v-model="gather.text_voice"
                      :options="voice"
                      label="name"
                    >
                    </v-select>
                  </div>
                </div>
              </div>
              <div class="d-flex alig-items-end justify-content-between mb-2">
                <div class="label-tooltip">
                  <label class="IvrNodeInputLabel">Language</label>
                  <div class="ivr-tooptip-quiz">
                    <svg
                      :id="`${node.type}-ivrgather-3-${node.id}`"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8.5"
                        r="8"
                        fill="white"
                      />
                      <path
                        d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                        fill="black"
                      />
                    </svg>
                    <b-tooltip
                      :target="`${node.type}-ivrgather-3-${node.id}`"
                      triggers="hover"
                    >
                      The language of the text that will be converted to speech.
                    </b-tooltip>
                  </div>
                </div>
                <div class="ivr-input">
                  <div class="input-gradient">
                    <v-select
                      class="IvrNodeVSelect"
                      v-model="gather.text_language"
                      :options="languages"
                      label="name"
                    >
                    </v-select>
                  </div>
                </div>
              </div>
              <div
                class="d-flex align-items-start justify-content-between mb-2"
              >
                <div class="label-tooltip">
                  <label class="IvrNodeInputLabel">Text</label>
                  <div class="ivr-tooptip-quiz">
                    <svg
                      :id="`${node.type}-ivrgather-4-${node.id}`"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8.5"
                        r="8"
                        fill="white"
                      />
                      <path
                        d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                        fill="black"
                      />
                    </svg>
                    <b-tooltip
                      :target="`${node.type}-ivrgather-4-${node.id}`"
                      triggers="hover"
                    >
                      The message that you want to be converted into speech.
                    </b-tooltip>
                  </div>
                </div>
                <div class="ivr-input text_area">
                  <div class="input-gradient">
                    <b-form-textarea
                      id="seconds"
                      v-model="gather.text"
                      @keydown="ivrInputValidateText($event, 200)"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </b-form-group>
          </b-col>
        </div>

        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Gather Tag Name</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-5-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-5-${node.id}`"
                    triggers="hover"
                  >
                    The call will be tagged with this value, it is used to
                    control how subsequent nodes process the call. Select a tag
                    name that if you want to use a filter based on it, will be
                    the one that populates in the platform.
                  </b-tooltip>
                </div>
              </div>

              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="gatherTagName"
                    type="text"
                    v-model="gather.tag_name"
                    @keydown="ivrInputValidateText($event, 50)"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Max Number of Digits</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-6-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-6-${node.id}`"
                    triggers="hover"
                  >
                    The maximum number of digits to be processed in the current
                    operation.
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="seconds"
                    type="number"
                    v-model="gather.inbound_number_max"
                    @keydown="ivrInputValidate($event, 10)"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Min Number of Digits</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-7-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-7-${node.id}`"
                    triggers="hover"
                  >
                    The minimum number of digits to be processed in the current
                    operation.
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="seconds"
                    type="number"
                    v-model="gather.inbound_number_min"
                    @keydown="ivrInputValidate($event, 10)"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Valid Digits</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-8-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-8-${node.id}`"
                    triggers="hover"
                  >
                    A list of valid digits.
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="seconds"
                    type="text"
                    v-model="gather.valid_digits"
                    @keydown="ivrInputValidateText($event, 10)"
                    placeholder="123456789*#"
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Finish on Key</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-9-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-9-${node.id}`"
                    triggers="hover"
                  >
                    The key the caller presses to stop collecting input.
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="seconds"
                    type="text"
                    v-model="gather.finish_on_key"
                    @keydown="ivrInputValidate($event, 10)"
                    placeholder="#"
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Timeout (sec)</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-10-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-10-${node.id}`"
                    triggers="hover"
                  >
                    The amount of time the caller has to enter a response.
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="seconds"
                    type="number"
                    v-model="gather.timeout"
                    @keydown="ivrInputValidate($event, 10)"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel"
                  >Key press time out (sec)</label
                >
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-11-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-11-${node.id}`"
                    triggers="hover"
                  >
                    Time in seconds allowed between consecutive digit inputs.
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="seconds"
                    type="number"
                    v-model="gather.timeout_key_press"
                    @keydown="ivrInputValidate($event, 10)"
                    placeholder="3"
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          class="mb-2"
        >
          <b-form-group>
            <div class="d-flex alig-items-end justify-content-between">
              <div class="label-tooltip">
                <label class="IvrNodeInputLabel">Retries</label>
                <div class="ivr-tooptip-quiz">
                  <svg
                    :id="`${node.type}-ivrgather-12-${node.id}`"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8.5"
                      r="8"
                      fill="white"
                    />
                    <path
                      d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z"
                      fill="black"
                    />
                  </svg>
                  <b-tooltip
                    :target="`${node.type}-ivrgather-12-${node.id}`"
                    triggers="hover"
                  >
                    The number of attempts the user is allowed to enter the
                    correct input if they select an invalid input.
                  </b-tooltip>
                </div>
              </div>
              <div class="ivr-input">
                <div class="input-gradient">
                  <b-form-input
                    id="seconds"
                    type="number"
                    @keydown="ivrInputValidate($event, 10)"
                    v-model="gather.retires"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>
          </b-form-group>
        </b-col>
      </b-collapse>
      <div>
        <div class="failure-node">
          <child-node-menu
            label="On Failure"
            :node="node"
            type="fail"
          />
        </div>
        <div class="mt-2 success-node">
          <child-node-menu
            label="On Success"
            :node="node"
            type="success"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BCard,
  BButton,
  BCardText,
  BFormInput,
  BFormGroup,
  BFormLabel,
  BFormFile,
  BFormCheckbox,
  BFormTextarea,
  BFormTimepicker,
  BFormDatepicker,
  BTooltip,
  VBToggle,
  BCollapse,
  BButtonGroup,
  BSpinner,
} from "bootstrap-vue";
import vSelect from "vue-select";
import ivrheader from "../ivrheader.vue";
import { toastAlert } from "@core/mixins/ui/toast";
import { globalHelper } from "@core/mixins/ui/global";
import { debounce } from "@/commonFunction/helpers.js";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, min, max, alphaNum } from "@validations";

export default {
  props: ["node"],
  components: {
    ivrheader,
    BRow,
    BCol,
    BForm,
    BCard,
    BButton,
    BCardText,
    BFormInput,
    BFormGroup,
    BFormFile,
    BFormCheckbox,
    BFormTextarea,
    BFormTimepicker,
    BFormDatepicker,
    vSelect,
    BTooltip,
    VBToggle,
    BCollapse,
    BButtonGroup,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [toastAlert, globalHelper],
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
    voice() {
      return this.$store.state.ivrBuilder.voice;
    },
    languages() {
      return this.$store.state.ivrBuilder.languages;
    },
  },
  watch: {
    gather: {
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
      gather: {
        plays: "",
        text_voice: "man",
        text_language: "en-CA",
        text: "",
        tag_name: "",
        inbound_number_max: "",
        inbound_number_min: "",
        valid_digits: "",
        finish_on_key: "",
        timeout: "",
        timeout_key_press: "",
        retires: "",
      },
      ivrType: "play",
      audioPath: "",
      audioName: "",
      isUploading: false,
      isUpdate: false,
      required,
      min,
      max,
      alphaNum,
    };
  },
  methods: {
    validateTimeOutPositiveNumber(value) {
      if (value < 0) {
        this.gather.timeout = 1;
      }

      if (value === "0") {
        this.gather.timeout = 1;
      }
    },

    validateRetiresPositiveNumber(value) {
      if (value < 0) {
        this.gather.retires = 1;
      }

      if (value === "0") {
        this.gather.retires = 1;
      }
    },
    validateTagName(value) {
      if (value < 0) {
        this.gather.tag_name = "";
      }
    },
    checkIvrType(val) {
      this.ivrType = val;
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
          url: `create-gather-validation?uuid=${this.node.id}`,
          node_type: this.node.node_type,
          nodeId: this.node.id,
          no_of_reproduce: this.gather.plays ? this.gather.plays : 1,
          node_content_type: this.ivrType,
          sound: this.audioPath,
          text: this.gather.text,
          text_voice: this.gather.text_voice ? this.gather.text_voice : "man",
          text_language: this.gather.text_language
            ? this.gather.text_language
            : "en-US",
          tag_name: this.gather.tag_name,
          gather_max_number_of_digits: this.gather.inbound_number_max
            ? this.gather.inbound_number_max
            : 30,
          gather_min_number_of_digits: this.gather.inbound_number_min,
          gather_valid_digits: this.gather.valid_digits,
          gather_finish_on_key: this.gather.finish_on_key,
          timeout: this.gather.timeout ? this.gather.timeout : 10,
          gather_key_press_timeout: this.gather.timeout_key_press
            ? this.gather.timeout_key_press
            : 3,
          no_of_retries: this.gather.retires ? this.gather.retires : 2,
          goto_source_node_uuid: this.node.gotoSourceNodeId,
          type: this.node.type,
          sound_label: this.audioName,
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
            .catch((error) => {});
        }
      } else {
        this.errorToast("Error", "Please Upload sound mp3 format!");
      }
    },
    resetValue() {
      (this.gather.plays = ""),
        (this.gather.text_voice = ""),
        (this.gather.text_language = ""),
        (this.gather.text = ""),
        (this.gather.tag_name = ""),
        (this.gather.inbound_number_max = ""),
        (this.gather.inbound_number_min = ""),
        (this.gather.valid_digits = ""),
        (this.gather.finish_on_key = ""),
        (this.gather.timeout = ""),
        (this.gather.timeout_key_press = ""),
        (this.gather.retires = "");
    },
    removeSound() {
      this.audioPath = "";
    },
    assignFormValue() {
      if (Object.keys(this.node.formData).length) {
        const { formData } = this.node;
        this.gather.plays = formData.no_of_reproduce;
        this.gather.text = formData.text;
        this.gather.text_voice = formData.text_voice;
        this.gather.text_language = formData.text_language;
        this.gather.tag_name = formData.tag_name;
        this.gather.inbound_number_max = formData.gather_max_number_of_digits;
        this.gather.inbound_number_min = formData.gather_min_number_of_digits;
        this.gather.valid_digits = formData.gather_valid_digits;
        this.gather.finish_on_key = formData.gather_finish_on_key;
        this.gather.timeout = formData.timeout;
        this.gather.timeout_key_press = formData.gather_key_press_timeout;
        this.gather.retires = formData.no_of_retries;

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

<style lang="scss">
@import "@/assets/scss/ivrStyles/_Style.scss";
</style>
