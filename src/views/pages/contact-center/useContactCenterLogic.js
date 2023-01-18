import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { Device } from '@twilio/voice-sdk';

export default function useContactCenterLogic() {

    // SETUP STEP 1:
    // Browser client should be started after a user gesture
    // to avoid errors in the browser console re: AudioContext
    const token = ref('');
    const device = ref({});
    // SETUP STEP 2: Request an Access Token
    const startupClient = () => {
        console.log("Requesting Access Token...");

        store.dispatch('contactCenter/fetchToken')

            .then(response => {
                const { data: { data } } = response
                token.value = data.accessToken
                intitializeDevice(token.value)
            })
            .catch(() => { })

        // try {
        //     const data = await $.getJSON("token.php");
        //     console.log("Got a token.");
        //     token = data.token;
        //     setClientNameUI(data.identity);
        //     intitializeDevice();
        // } catch (err) {
        //     console.log(err);
        //     console.log("An error occurred. See your browser console for more information.");
        // }
    }
    const intitializeDevice = (token) => {
        device.value = new Device(token, {
            logLevel: 1,
            // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
            // providing better audio quality in restrained network conditions.
            codecPreferences: ["opus", "pcmu"]
        })
    }


    return {
        token,
        startupClient
    }
}