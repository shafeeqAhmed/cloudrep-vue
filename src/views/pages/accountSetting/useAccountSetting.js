import { ref } from '@vue/composition-api'

// import store from '@/store';
// import router from '@/router';


// Notification
// import { useToast } from 'vue-toastification/composition'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import { getUserData } from "@/auth/utils";

export default function useAccountSetting() {

    const first_name = ref('');
    const last_name = ref('');
    const email = ref('');
    const bio = ref('')
    const birth_date = ref('')
    const country = ref('')
    const website = ref('')
    const phone_no = ref('')
    const countryOption = ref(['USA', 'Pakistan', 'Canada'])
    const clevePhone = ref({
        phone: true,
        phoneRegionCode: 'US',
    })
    const twitter = ref('')
    const facebook = ref('')
    const google = ref('')
    const linkedin = ref('')
    const instagram = ref('')
    const quora = ref('')





    return {
        first_name,
        last_name,
        email,
        bio,
        birth_date,
        country,
        website,
        phone_no,
        countryOption,
        clevePhone,
        twitter,
        facebook,
        google,
        linkedin,
        instagram,
        quora
    }

}
