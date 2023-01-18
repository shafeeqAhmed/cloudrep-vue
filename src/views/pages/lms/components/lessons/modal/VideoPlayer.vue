<template>
<b-modal
      id="video-viewer"
      centered
      title="Upload Video"
      ok-only
      ok-title="Close"
      modal-class="modal-cr modal-uv"
    >
        <!-- <div class="player"> -->
            <video-player class="vjs-custom-skin videoInsert" ref="videoPlayer" :options="playerOptions" :playsinline="true"
                @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)"
                @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)"
                @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)"
                @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)"
                @ready="playerReadied" @statechanged="playerStateChanged($event)">
            </video-player>
        <!-- </div> -->
</b-modal>


</template>

<script>
// custom skin css
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import EventBus from "@/event/EventBus";
export default {
    // props: {
    //     src: String
    // },
  
    components: {
        videoPlayer
    },
    data() {
        return {
            // videojs options
            playerOptions: {
                height: '360',
                autoplay: false,
                muted: false,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    // src: "http://vjs.zencdn.net/v/oceans.mp4",
                    src: ""
                }],
                poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
            }
        }
    },
    beforeMount() {
        // http://127.0.0.1:8000/storage/uploads/lessons/videos/QggiPa5Ty5nK2nMrUSanWdAP6pXIoT.mp4
        // this.playerOptions.sources[0].src = this.$store.state.lms.videoViewerSrc

    },
    mounted() {
       setTimeout(() => {
            // console.log('dynamic change options', this.player)
        // this.playerOptions.sources[0].src = this.$store.state.lms.videoViewerSrc

            // change src
            // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';

            // change item
            // this.$set(this.playerOptions.sources, 0, {
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // })

            // change array
            // this.playerOptions.sources = [{
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // }]
            // this.player.muted(false)
        }, 5000)
    },
    watch: {
        // "$store.state.lms.videoViewerSrc": function (newVal, oldVal) {
        //     console.log('watch change===============')
        //     console.log(newVal)
        //     this.playerOptions.sources[0].src = newVal
        // }
    },
    computed: {
        player() {
            if(this.$refs.videoPlayer) {
                return this.$refs.videoPlayer.player
            }else {
                return ""
            }
        }
    },
    methods: {
        playerSrc(url){
            this.playerOptions.sources[0].src = url
        },
        // listen event
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {
            // console.log('player Loadeddata!', player)
        },
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
        },
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
        },
        onPlayerTimeupdate(player) {
            // console.log('player Timeupdate!', player.currentTime())
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)
        },

        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },

        // player is ready
        playerReadied(player) {
            // seek to 10s
            console.log('example player 1 readied', player)
            player.currentTime(10)
            // console.log('example 01: the player is readied', player)
        }
    },
    created(){
        EventBus.$on("playerSrc", this.playerSrc);

    },
    destroyed() {
        EventBus.$off("playerSrc", this.playerSrc);
    }
}
</script>
