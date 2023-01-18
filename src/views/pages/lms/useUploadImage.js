import { ref, watch } from '@vue/composition-api'
import store from '@/store'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { save, get } from '@/auth/utils'
import axiosIns from '@/libs/axios'

export default function useUploadImage() {
  const videoDuration = ref('')
  const thumbnail = ref('')
  const imageFile = ref('')
  const imageUrl = ref('')
  const filePath = ref('')
  const toast = useToast()

  const uploadProfileImage = (file) => {

    const data = new FormData()
    data.append('image', file)
    data.append('directory', 'course')
    axiosIns.post('single-image-upload', data)
      .then(response => {

        filePath.value = response.data.data
        
        
        toast({
          component: ToastificationContent,
          props: {
            title: 'Course Image Upload SuccessFully!',
            icon: 'CoffeeIcon',
            variant: 'success',
          },
        })
      })
      .catch(error => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error upload image',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  const removeProfileImage = () => {

    axiosIns.post('remove-single-image', {
      old_path: filePath.value
    })
      .then(response => {


        toast({
          component: ToastificationContent,
          props: {
            title: 'Course image Deleted SuccessFully!',
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
      })
  }
  function handleImageSelected(event) {
    // console.log('yep its working fine!')
    if (event.target.files.length === 0) {
      imageFile.value = ''
      imageUrl.value = ''
      return
    }
    const file = event.target.files[0]
    imageFile.value = file
    // console.log(file.name)
    // uploadProfileImage(file)
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
    // return true
    imageUrl.value = ''
    imageFile.value = ''
    // removeProfileImage(filePath)

  }

  const chooseFile = (fileId) => {
    document.getElementById(fileId).value = null
    document.getElementById(fileId).click()
  }


  
  return {
    videoDuration,
    thumbnail,
    imageFile,
    imageUrl,
    filePath,
    handleImageSelected,
    removeImage,
    chooseFile,
  }
}
