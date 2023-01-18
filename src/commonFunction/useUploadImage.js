import { ref, watch } from '@vue/composition-api'
import store from '@/store'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { save, get } from '@/auth/utils'

export default function useUploadImage() {
  const imageFile = ref('')
  const imageUrl = ref('')
  const isImageUploading = ref(false)
  const isImageRemoving = ref(false)
  const toast = useToast()

  const uploadProfileImage = (file) => {

    const data = new FormData()
    data.append('profile_image', file)
    store.dispatch('accountSetting/uploadProfileImage', data)
      .then(response => {
        const { data: { data: { userData } } } = response

        updateLocalStorageAndState(userData)

        toast({
          component: ToastificationContent,
          props: {
            title: 'Profile image uploaded SuccessFully!',
            icon: 'CoffeeIcon',
            variant: 'success',
          },
        })
      })
      .catch(error => {
        // console.log(error.response.data.errors.profile_image[1])
        toast({
          component: ToastificationContent,
          props: {
            title: error.response.data.errors.profile_image[0],
            // title: 'Error upload image',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      }).finally(()=>{
        isImageUploading.value = false;
      })
  }
  const removeProfileImage = () => {

    store.dispatch('accountSetting/removeProfileImage')
      .then(response => {
        const { data: { data: { userData } } } = response
        updateLocalStorageAndState(userData)

        toast({
          component: ToastificationContent,
          props: {
            title: 'Profile image removed SuccessFully!',
            icon: 'CoffeeIcon',
            variant: 'success',
          },
        })
      })
      .catch(error => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error in Remove image',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      }).finally(()=>{
        isImageRemoving.value = false
      })
  }
  function handleImageSelected(event) {
    if (event.target.files.length === 0) {
      imageFile.value = ''
      imageUrl.value = ''
      return
    }

    const file = event.target.files[0]
    imageFile.value = file

    const check = checkImageSize();
    if(check){
      isImageUploading.value = true;
      uploadProfileImage(file)
    }
    
  }
  function checkImageSize() {
    const file = imageFile.value;
    const MAX_SIZE = 800000 //800kb
    if (file.size > MAX_SIZE) {
      toast({
        component: ToastificationContent,
        props: {
          title: "Image size must be less then 800 kb!",
          icon: "AlertTriangleIcon",
          variant: "danger",
        },
      });
    } else {
      return true;
    }
  }
  const updateLocalStorageAndState = (userData) => {
    const storeUser = get('userData');
    storeUser.profile_photo_path = userData.profile_photo_path
    console.log(storeUser)
    save('userData', storeUser)
    store.commit('app/UPDATE_USER', storeUser)
  }

  watch(imageFile, imf => {
    if (!(imf instanceof File)) {
      return
    }

    const fileReader = new FileReader()

    fileReader.readAsDataURL(imageFile.value)

    fileReader.addEventListener('load', () => {
      imageUrl.value = fileReader.result
    })
  })
  const removeImage = () => {
    imageUrl.value = ''
    imageFile.value = ''
    isImageRemoving.value = true
    removeProfileImage()

  }

  const chooseFile = (fileId) => {
    document.getElementById(fileId).value = null
    document.getElementById(fileId).click()
  }
  return {
    imageFile,
    imageUrl,
    handleImageSelected,
    removeImage,
    chooseFile,
    isImageUploading,
    isImageRemoving
  }
}
