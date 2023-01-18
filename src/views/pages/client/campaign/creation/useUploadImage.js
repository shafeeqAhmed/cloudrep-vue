import { ref, watch } from "@vue/composition-api";
import store from "@/store";
// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { image } from "vee-validate/dist/rules";

export default function useUploadImage() {
  const imageFile = ref("");
  const imageUrl = ref("");
  const imageWidth = ref(0);
  const imageHeight = ref(0);
  const requestFile = ref("");
  const type = ref("");
  // const filePath = ref('')
  const toast = useToast();
  const campaign = store.state.campaing;
  const uploadProfileImage = (file) => {
    const campaign_uuid = store.state.clientCampaign.campaign.uuid;
    const user_uuid = store.state.clientCampaign.campaign.user_uuid;
    const data = new FormData();
    data.append("campaign_uuid", campaign_uuid);
    data.append("user_uuid", user_uuid);
    data.append("type", type.value);
    data.append("image", file);
    data.append("step", 9);
    store
      .dispatch("clientCampaign/storeCampaignImages", data)
      .then((response) => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Campaign Image Upload SuccessFully!",
            icon: "CoffeeIcon",
            variant: "success",
          },
        });
      })
      .catch((error) => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error upload image",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };
  const removeProfileImage = () => {
    const campaign_uuid = store.state.clientCampaign.campaign.uuid;
    const user_uuid = store.state.clientCampaign.campaign.user_uuid;
    const data = new FormData();
    data.append("campaign_uuid", campaign_uuid);
    data.append("user_uuid", user_uuid);
    data.append("type", type.value);
    store
      .dispatch("clientCampaign/removeCampaignImage", data)
      .then((response) => {
        // console.log('you are in removeStepSevenImage!')
        // console.log(response)
        store.commit("clientCampaign/IMAGE_TYPE_FOR_REMOVE", "");
        imageUrl.value = "";
        imageFile.value = "";
        toast({
          component: ToastificationContent,
          props: {
            title: "Course image Deleted SuccessFully!",
            icon: "CoffeeIcon",
            variant: "success",
          },
        });
      })
      .catch((error) => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error in Remove image",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  function checkImageSize() {
    const file = requestFile.value;
    if (file.size > 5242880) {
      toast({
        component: ToastificationContent,
        props: {
          title: "Image size must be less then 5 mb!",
          icon: "AlertTriangleIcon",
          variant: "danger",
        },
      });
    } else {
      imageFile.value = file;
      uploadProfileImage(file);
    }
  }

  function handleImageSelected(event) {
    if (event.target.files.length === 0) {
      imageFile.value = "";
      imageUrl.value = "";
      return;
    }
    requestFile.value = event.target.files[0];
    var _URL = window.URL || window.webkitURL;
    const img = new Image();
    img.onload = function () {
      imageWidth.value = img.width;
      imageHeight.value = img.height;
      if (imageWidth.value > 1280 || imageHeight.value > 720) {
        store.commit('clientCampaign/UPDATE_IMAGE_FILE_VALIDATE',true)
        toast({
          component: ToastificationContent,
          props: {
            title: "Image dimensions max allowed 1280x720",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      } else {
        store.commit('clientCampaign/UPDATE_IMAGE_FILE_VALIDATE',false)
        checkImageSize();
      }
    };

    img.onerror = function () {

      toast({
        component: ToastificationContent,
        props: {
          title:  "Please attach valid image!",
          icon: "AlertTriangleIcon",
          variant: "danger",
        },
      });


    };

    img.src = _URL.createObjectURL(requestFile.value);
  }

  watch(imageFile, (imf) => {
    if (!(imf instanceof File)) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile.value);

    fileReader.addEventListener("load", () => {
      imageUrl.value = fileReader.result;
    });
  });
  const removeImage = (fileId) => {
    imageUrl.value = "";
    imageFile.value = "";
    if (fileId) {
      type.value = fileId;
      removeProfileImage();
    } else {
      const imageRemoveType = store.state.clientCampaign.imageTypeForRemove;
      type.value = imageRemoveType;
      removeProfileImage();
    }
  };

  const chooseFile = (fileId) => {
    type.value = fileId;
    document.getElementById(fileId).value = null;
    document.getElementById(fileId).click();
  };

  return {
    imageFile,
    imageUrl,
    type,
    handleImageSelected,
    removeImage,
    chooseFile,
  };
}
