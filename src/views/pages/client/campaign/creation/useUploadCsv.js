import { ref, watch } from '@vue/composition-api'
import store from '@/store'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { save, get } from '@/auth/utils'
import axiosIns from '@/libs/axios'
import { toastAlert } from "@core/mixins/ui/toast";

export default function useUploadCsv() {
  const csvFile = ref('')
  const csvFileName = ref('')
  const csvUrl = ref('')
  const filePath = ref('')
  const toast = useToast()

  const uploadCsvFile = (file) => {
    toastAlert.methods.showLoader()
    const campaign_uuid = store.state.clientCampaign.campaign.uuid;
    const data = new FormData()
    data.append('campaign_id', campaign_uuid)
    data.append('file', file)
    data.append('fileName', file.name)
    data.append('address_type', 'csv')
    data.append('step', 12)
    axiosIns.post('upload-csv', data)
      .then(response => {
        const { data } = response

        if(data.status == true){
          store.dispatch('clientCampaign/getCampaign')
          toast({
            component: ToastificationContent,
            props: {
              title: 'CSV Upload SuccessFully!',
              icon: 'CoffeeIcon',
              variant: 'success',
            },
          })
          csvFile.value = file
          csvFileName.value = file.name
        }
        if(data.status == false){
          toast({
            component: ToastificationContent,
            props: {
              title: data.message,
              icon: 'AlertTriangleIcon',
              variant: 'danger',
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
      .finally(() => {
        toastAlert.methods.hideLoader()
      });
  }
  const removeCsvFile = () => {
    toastAlert.methods.showLoader()
    const campaign_uuid = store.state.clientCampaign.campaign.uuid;
    const data = new FormData()
    data.append('campaign_id', campaign_uuid)
    data.append('file_url', csvUrl.value)
    axiosIns.post('remove-csv', data)
      .then(response => {
        // console.log('response', response.data)
        if(response.data.status == true){
          csvUrl.value = ''
          csvFile.value = ''
          store.dispatch('clientCampaign/getCampaign')
          toast({
            component: ToastificationContent,
            props: {
              title: 'Csv file Deleted SuccessFully!',
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
            title: 'Error in Remove Csv',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
      .finally(() => {
        toastAlert.methods.hideLoader()
      })
  }
  function handleImageSelected(event) {
    if (event.target.files.length === 0) {
      csvFile.value = ''
      csvUrl.value = ''
      return
    }
    const file = event.target.files[0]
    // uploadCsvFile(file)
    const fileExtension = file.name.toString().split(".")
    if(fileExtension[1] == 'csv'){
      uploadCsvFile(file)
    }else{
      toast({
        component: ToastificationContent,
        props: {
          title: 'please select csv file only!',
          icon: 'AlertTriangleIcon',
          variant: 'danger',
        },
      })
    }
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
    console.log('clicked!!!')
    console.log(csvFileName)
    console.log(csvUrl)
    // csvUrl.value = ''
    // csvFile.value = ''
    removeCsvFile()

  }

  const chooseFile = (fileId) => {
    document.getElementById(fileId).value = null
    document.getElementById(fileId).click()
  }

  return {
    csvFile,
    csvFileName,
    csvUrl,
    filePath,
    handleImageSelected,
    removeImage,
    chooseFile,
  }
}
