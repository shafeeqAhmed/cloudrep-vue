import { ref, watch } from '@vue/composition-api'
import store from '@/store'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { save, get } from '@/auth/utils'
import axiosIns from '@/libs/axios'

export default function useUploadCsv() {
  const csvFile = ref('')
  const csvFileName = ref('')
  const csvUrl = ref('')
  const filePath = ref('')
  const toast = useToast()

  const uploadCsvFile = (file) => {
    // showLoader();
    const data = new FormData()
    data.append('file', file)
    axiosIns.post('file-upload', data)
      .then(response => {
        const { data } = response
        if(data.status == true){
          toast({
            component: ToastificationContent,
            props: {
              title: 'CSV Upload SuccessFully!',
              icon: 'CoffeeIcon',
              variant: 'success',
            },
          })
        }
      })
      .catch(error => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error upload Csv',
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
    if (event.target.files.length === 0) {
      csvFile.value = ''
      csvUrl.value = ''
      return
    }
    const file = event.target.files[0]
    csvFile.value = file
    // csvFileName = file.name
    uploadCsvFile(file)
  }

  watch(csvFile, imf => {
    if (!(imf instanceof File)) {
      return
    }

    const fileReader = new FileReader()

    fileReader.readAsDataURL(csvFile.value)

    fileReader.addEventListener('load', () => {
      csvUrl.value = fileReader.result
    })
  })

  const removeImage = () => {
    csvUrl.value = ''
    csvFile.value = ''
    // removeProfileImage(filePath)

  }

  const chooseFile = (fileId) => {
    document.getElementById(fileId).value = null
    document.getElementById(fileId).click()
  }

  return {
    csvFile,
    // csvFileName,
    csvUrl,
    filePath,
    handleImageSelected,
    removeImage,
    chooseFile,
  }
}
