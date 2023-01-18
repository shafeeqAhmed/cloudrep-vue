import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from "@/store"

export const toastAlert = {
  data() {
    return {
      passwordFieldType: 'password',
    }
  },
  methods: {
    showLoader() {
      store.commit('app/UPDATE_LOADER', true)
    },
    hideLoader() {
      store.commit('app/UPDATE_LOADER', false)
    },
    successToast(title, text) {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: title,
          icon: 'CoffeeIcon',
          variant: 'success',
          text: text,
        },
      })
    },
    errorToast(title = "Error", text = "Something going wrong please try again!") {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: title,
          icon: 'CoffeeIcon',
          variant: 'danger',
          text: text,
        },
      })
    },
    customToast(type, title, text) {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: title,
          icon: 'CoffeeIcon',
          variant: type,
          text: text,
        },
      })
    },

    conditionalToast(type, title, text,toastType=''){

      var checkAlert='';

      if(toastType=='custom'){
        var disable={
          value:false,
          type:'custom'
        }

        var enable={
          value:true,
          type:'custom'
        }
        checkAlert=this.$store.state.app.isCustomToastActive;

      }


      if(toastType=='error'){
        var disable={
          value:false,
          type:'error'
        }

        var enable={
          value:true,
          type:'error'
        }
        checkAlert=this.$store.state.app.isErrorToastActive;

      }


      if(toastType=='success'){
        var disable={
          value:false,
          type:'success'
        }

        var enable={
          value:true,
          type:'success'
        }
        checkAlert=this.$store.state.app.isSuccessToastActive;

      }


      if(checkAlert){
      this.$store.commit("app/UPDATE_TOASTR", disable);

      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: title,
          icon: 'CoffeeIcon',
          variant: type,
          text: text,
        },
      })

      setTimeout(() => {
        this.$store.commit("app/UPDATE_TOASTR", enable);
      }, "3000");


    }

    }

  },
}

export const _ = null
