import { ref, watch } from "@vue/composition-api";
import store from "@/store";
// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { save, get } from "@/auth/utils";
import axiosIns from "@/libs/axios";

export default function useUploadImage() {
  const imageFile = ref("");
  const imageUrl = ref("");
  const filePath = ref("");
  const toast = useToast();
  const isUploading = ref(0);

  const uploadAppLogo = (file) => {
    const data = new FormData();
    data.append("image", file);
    axiosIns
      .post("upload-app-logo", data)
      .then((response) => {
        filePath.value = response.data.data;
        toast({
          component: ToastificationContent,
          props: {
            title: "Logo Upload Successfully!",
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
        })
      }).finally(() => {
        isUploading.value = 0
      })
  };
  const removeProfileImage = () => {
    axiosIns
      .post("remove-app-logo", {
        logo_path: filePath.value,
      })
      .then((response) => {
        console.log('you are in remove-app-logo')
          console.log(response)
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
  async function handleImageSelected(event) {
    if (event.target.files.length === 0) {
      imageFile.value = "";
      imageUrl.value = "";
      return;
    }
    const file = event.target.files[0];
    const photoUrl = URL.createObjectURL(file);
    const image = new Image();
    const imageDimensions = await new Promise((resolve) => {
      image.onload = () => {
        const dimensions = {
          height: image.height,
          width: image.width,
        };
        resolve(dimensions);
      };
      image.src = photoUrl;
    });
    // console.log(imageDimensions);
    if(imageDimensions.width <= 200 && imageDimensions.height <= 100){
      isUploading.value = 1
      imageFile.value = file;
      // return false
      uploadAppLogo(file)
    }else{
      toast({
        component: ToastificationContent,
        props: {
          title: "Please Uplaod Logo in given size!",
          icon: "AlertTriangleIcon",
          variant: "danger",
        },
      });
    }
    
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

  const removeImage = () => {
    imageUrl.value = "";
    imageFile.value = "";
    // console.log(filePath.value)
    removeProfileImage()
  };
  const chooseFile = (fileId) => {
    document.getElementById(fileId).value = null;
    document.getElementById(fileId).click();
  };

  return {
    imageFile,
    imageUrl,
    filePath,
    handleImageSelected,
    removeImage,
    chooseFile,
    isUploading,
  };
}
