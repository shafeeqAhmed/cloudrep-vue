<template>
  <div class="ivr-builder d-flex align-items-start">
    <div class="ivr-build-left">
        <div class="w-100">
          <div class="ivr-builder-header">
          <ivrheader />
          </div>
          <div class="ivr-box-build">
            <b-row class="p-3">
              <b-col md="6">
                <b-row class="singleIvrNode">
                  <b-col
                    md="12"
                    class="
                      d-flex
                      justify-content-between
                      align-items-center
                      my-1
                      px-2
                      py-1
                    "
                  >
                  <div class="d-flex align-items-center">
                    <h4>Hours</h4>
                    <div class="ivr-note-box">
                      1
                    </div>
                  </div>
                  <div>
                    <span class="accordian-btn" v-b-toggle.ivr-collapse>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.131 7.36922C13.189 7.42572 13.437 7.63906 13.641 7.8378C14.924 9.00292 17.024 12.0424 17.665 13.6332C17.768 13.8748 17.986 14.4856 18 14.812C18 15.1247 17.928 15.4228 17.782 15.7073C17.578 16.0619 17.257 16.3463 16.878 16.5022C16.615 16.6025 15.828 16.7584 15.814 16.7584C14.953 16.9143 13.554 17 12.008 17C10.535 17 9.193 16.9143 8.319 16.7867C8.305 16.772 7.327 16.6162 6.992 16.4457C6.38 16.133 6 15.5222 6 14.8685V14.812C6.015 14.3863 6.395 13.491 6.409 13.491C7.051 11.9859 9.048 9.01656 10.375 7.82319C10.375 7.82319 10.716 7.48709 10.929 7.34096C11.235 7.11301 11.614 7 11.993 7C12.416 7 12.81 7.12762 13.131 7.36922Z" fill="white"/>
                      </svg>
                    </span>
                    <span class="IvrNodeDeleteIconArea">
                      <img
                        class="IvrNodeDeleteIcon"
                        src="@/assets/images/ivr/Delete.png"
                      />
                    </span>
                  </div>
                  </b-col>
                  <b-collapse id="ivr-collapse">
                    <b-col md="12" class="px-2 mb-2">
                    <b-form-group>
                      <div class="label-tooltip">
                        <label class="IvrNodeInputLabel">Time Zone</label>
                        <div class="ivr-tooptip-quiz ">
                          <svg  id="ivrtooltip-target-1" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white"/>
                          <path d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z" fill="black"/>
                          </svg>
                          <b-tooltip target="ivrtooltip-target-1" triggers="hover">
                            IvR tooltip
                          </b-tooltip>
                        </div>
                      </div>
                      
                      <div class="input-gradient">
                        <b-form-input
                          id="seconds"
                          v-model="menu.play_number"
                          placeholder="Enter Number"
                        />
                      </div>
                    </b-form-group>
                  </b-col>
                  <b-col md="12" class="px-2 mb-2">
                    <b-form-group>
                      <div class="label-tooltip">
                        <label class="IvrNodeInputLabel">Time Setting </label>
                        <div class="ivr-tooptip-quiz ">
                          <svg  id="ivrtooltip-target-1" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white"/>
                          <path d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z" fill="black"/>
                          </svg>
                          <b-tooltip target="ivrtooltip-target-1" triggers="hover">
                            IvR tooltip
                          </b-tooltip>
                        </div>
                      </div>
                      <div class="input-gradient">
                        <v-select
                          class="IvrNodeVSelect"
                          v-model="selectedDropdown"
                          :options="options"
                          label="name"
                          :reduce="(name) => name.id"
                          placeholder="Select Time setting"
                        >
                        </v-select>
                      </div>
                      
                    </b-form-group>
                  </b-col>
                  <b-col md="12" class="px-2 mb-2">
                    <b-form-group>
                      <div class="label-tooltip">
                        <label class="IvrNodeInputLabel">From </label>
                        <div class="ivr-tooptip-quiz ">
                          <svg  id="ivrtooltip-target-2" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white"/>
                          <path d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z" fill="black"/>
                          </svg>
                          <b-tooltip target="ivrtooltip-target-2" triggers="hover">
                            IvR tooltip
                          </b-tooltip>
                        </div>
                      </div>
                      <div class="input-gradient">
                        <b-form-timepicker></b-form-timepicker>
                      </div>
                      
                    </b-form-group>
                  </b-col>
                  <b-col md="12" class="px-2 mb-2">
                    <b-form-group>
                      <div class="label-tooltip">
                        <label class="IvrNodeInputLabel">To </label>
                        <div class="ivr-tooptip-quiz ">
                          <svg  id="ivrtooltip-target-2" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white"/>
                          <path d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z" fill="black"/>
                          </svg>
                          <b-tooltip target="ivrtooltip-target-2" triggers="hover">
                            IvR tooltip
                          </b-tooltip>
                        </div>
                      </div>
                      <div class="input-gradient">
                        <b-form-timepicker></b-form-timepicker>
                      </div>
                      
                    </b-form-group>
                  </b-col>
                  <b-col md="12" class="px-2 mb-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="label-tooltip">
                        <label class="IvrNodeInputLabel">Add Break</label>
                        <div class="ivr-tooptip-quiz ">
                          <svg  id="ivrtooltip-target-2" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8.5" r="8" fill="white"/>
                          <path d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z" fill="black"/>
                          </svg>
                          <b-tooltip target="ivrtooltip-target-2" triggers="hover">
                            IvR tooltip
                          </b-tooltip>
                        </div>
                      </div>
                      <b-form-checkbox
                        class="m-0"
                        v-model="isBreakActive"
                        checked="true"
                        name="message"
                        switch
                        inline
                      ></b-form-checkbox>
                    </div>
                  </b-col>
                  <div v-if="isBreakActive" class="mb-2">
                    <b-col md="12" class="px-2 my-2">
                      <b-form-group>
                        <div class="label-tooltip">
                          <label class="IvrNodeInputLabel">Break Duration </label>
                          <div class="ivr-tooptip-quiz ">
                            <svg  id="ivrtooltip-target-2" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8.5" r="8" fill="white"/>
                            <path d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z" fill="black"/>
                            </svg>
                            <b-tooltip target="ivrtooltip-target-2" triggers="hover">
                              IvR tooltip
                            </b-tooltip>
                          </div>
                        </div>
                        
                        <div class="input-gradient">
                          <v-select
                            class="IvrNodeVSelect"
                            v-model="selectedDropdown"
                            :options="options"
                            label="name"
                            :reduce="(name) => name.id"
                            placeholder="Select An Option"
                          >
                          </v-select>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col md="12" class="px-2 my-2">
                      <b-form-group>
                        <div class="label-tooltip">
                          <label class="IvrNodeInputLabel">Break Start Time </label>
                          <div class="ivr-tooptip-quiz ">
                            <svg  id="ivrtooltip-target-2" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8.5" r="8" fill="white"/>
                            <path d="M10.4609 6.24316C10.3242 5.94434 10.1299 5.67578 9.88184 5.44629C9.37793 4.97852 8.70898 4.7207 8 4.7207C7.29102 4.7207 6.62207 4.97852 6.11816 5.44531C5.87012 5.67578 5.67578 5.94336 5.53906 6.24316C5.39648 6.55566 5.32422 6.88672 5.32422 7.22852V7.49219C5.32422 7.55273 5.37305 7.60156 5.43359 7.60156H5.96094C6.02148 7.60156 6.07031 7.55273 6.07031 7.49219V7.22852C6.07031 6.25684 6.93555 5.4668 8 5.4668C9.06445 5.4668 9.92969 6.25684 9.92969 7.22852C9.92969 7.62695 9.78809 8.00195 9.51953 8.31445C9.25391 8.62402 8.87891 8.8457 8.46387 8.93945C8.22656 8.99316 8.0127 9.12695 7.86133 9.31836C7.71049 9.50911 7.62827 9.7451 7.62793 9.98828V10.2949C7.62793 10.3555 7.67676 10.4043 7.7373 10.4043H8.26465C8.3252 10.4043 8.37402 10.3555 8.37402 10.2949V9.98828C8.37402 9.83496 8.48047 9.7002 8.62793 9.66699C9.19824 9.53809 9.71582 9.23047 10.0859 8.80078C10.2725 8.58301 10.418 8.34082 10.5186 8.07812C10.623 7.80566 10.6758 7.51953 10.6758 7.22852C10.6758 6.88672 10.6035 6.55469 10.4609 6.24316ZM8 11.1855C7.69824 11.1855 7.45312 11.4307 7.45312 11.7324C7.45312 12.0342 7.69824 12.2793 8 12.2793C8.30176 12.2793 8.54688 12.0342 8.54688 11.7324C8.54688 11.4307 8.30176 11.1855 8 11.1855Z" fill="black"/>
                            </svg>
                            <b-tooltip target="ivrtooltip-target-2" triggers="hover">
                              IvR tooltip
                            </b-tooltip>
                          </div>
                        </div>
                        
                        <div class="input-gradient">
                          <b-form-timepicker></b-form-timepicker>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col md="12" class="px-2 my-2">
                      <div class="ivrNodeOpen">
                        <p>On Open +</p>
                      </div>
                    </b-col>
                    <b-col md="12" class="px-2 my-2">
                      <div class="ivrNodeClose">
                        <p>On Close +</p>
                      </div>
                    </b-col>
                  </div>
                  </b-collapse>
                </b-row>
              </b-col>
              <b-col md="6"></b-col>
            </b-row>
          </div>
        </div>
    </div>
    <div class="ivr-build-right">
      <topNodes />
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
  BCollapse
} from "bootstrap-vue";
import vSelect from "vue-select";
import topNodes from "./components/topNodes.vue";
import ivrheader from "./components/ivrheader.vue";

export default {
  components: {
    topNodes,
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
    BCollapse
  },
  data() {
    return {
      menu: {
        seconds: "",
        number: "",
        play_number: "",
      },
      selectedDropdown: "",
      isBreakActive: false,
      options: [
        { id: 1, name: "Value One" },
        { id: 2, name: "Value Two" },
        { id: 3, name: "Value Three" },
      ],
    };
  },
  directives: {
  'b-toggle': VBToggle
  },
  methods: {
    chooseFile(fileId) {
      document.getElementById(fileId).value = null;
      document.getElementById(fileId).click();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/ivrStyles/_Style.scss";
</style>