import { ref, watch } from "@vue/composition-api";
import store from "@/store";
// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { image } from "vee-validate/dist/rules";
import axiosIns from "@/libs/axios";

export default function useUploadImage() {
  const imageFile = ref("");
  const imageUrl = ref("");
  const imageWidth = ref(0);
  const imageHeight = ref(0);
  const requestFile = ref("");
  const type = ref("");
  const iconUrl = ref("");
  // const filePath = ref('')
  const toast = useToast();

  const services = store.state.services;
  const uploadProfileImage = (file) => {
    // showLoader()
    const data = new FormData();
    data.append("type", type.value);
    data.append("image", file);
    data.append("directory", 'uploads/services');
    axiosIns
      .post("single-image-upload", data)
      .then((response) => {
        const { data: { data } } = response
        if(type.value === 'icon'){
          iconUrl.value = data
          store.commit("services/ICON_URL",iconUrl.value);
        }
        if(type.value === 'image'){
          imageUrl.value = data
          store.commit("services/IMAGE_URL",imageUrl.value);
        }
        toast({
          component: ToastificationContent,
          props: {
            title: "Course Image Upload SuccessFully!",
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
      .dispatch("clientCampaign/removeStepSevenImage", data)
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
        toast({
          component: ToastificationContent,
          props: {
            title: "Image dimensions should be 1280x720",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      } else {
        checkImageSize();
      }
    };

    img.onerror = function () {
      alert("not a valid file: " + requestFile.value.type);
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
    } 
    // else {
    //   const imageRemoveType = store.state.clientCampaign.imageTypeForRemove;
    //   type.value = imageRemoveType;
    //   removeProfileImage();
    // }
  };

  const chooseFile = (fileId) => {
    type.value = fileId;
    document.getElementById(fileId).value = null;
    document.getElementById(fileId).click();
  };

  return {
    imageFile,
    imageUrl,
    iconUrl,
    type,
    handleImageSelected,
    removeImage,
    chooseFile,
  };
}
