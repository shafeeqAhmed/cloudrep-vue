<template>
    <div>
      <b-card>
        <b-card-text >
         Welcome Mr/Mrs <b>{{ userData.name }} </b> as Role <b>{{ userData.role }}</b>  on Cloud Rep work.
           <br />
                <h2 class="my-3">{{ userData.role }} <span class="text-danger">schedules</span> Comming Soon</h2>
       </b-card-text>
      </b-card>
  
     
    </div>
  </template>
  
  <script>
  import { BCard, BCardText, BLink } from 'bootstrap-vue'
  import { getUserData } from '@/auth/utils'
  export default {
    components: {
      BCard,
      BCardText,
      BLink,
    },
    data() {
      return {
        userData: {}
      }
    },
     computed: {
       title () {
         if(this.userData) {
              return  `Dashboard for Role 🚀 ${this.userData.role} 🚀`
          }
          return ''
      },
      description() {
        if(this.userData) {
          return `Welcome Mr/Mrs ${this.userData.name} as Role ${this.userData.role}  on Cloud Rep work.`
        }
        return ''
      },
     },
      created() {
        this.userData = getUserData()
      }
   
  }
  </script>
  
  <style>
  
  </style>
  