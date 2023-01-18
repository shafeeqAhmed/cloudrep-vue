<template>
    <div>
        <div class=" p-3" id="quiz_take_container">
            <div class="lmsagent-header">
                <div class="lms-heading mt-2 mb-2">
                    <b-row class="align-items-center">
                        <b-col lg="8" md="6" sm="12">
                            <h1>{{quizData.name}} ({{quizLesson.name}} - Quiz)</h1>
                        </b-col>
                    </b-row>
                </div>
            </div>
        
            <div class="uni-course-quiz">
                <b-row class="align-items-center">
                    <b-col sm="9" class="mt-1">
                        <div class="question-total w-100">
                            <h2 class="text-right">Questions <span>{{attemptedQuestions}}</span> / <span>{{totalQuestion}}</span></h2>
                        </div>
                        <div class="progress w-100">
                            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :style="`width:${progressWidth}%`">
                            <span>{{progressWidth}}%</span>
                            <!-- <span v-if="attemptedQuestions == 2">40%</span>
                            <span v-if="attemptedQuestions == 3">60%</span>
                            <span v-if="attemptedQuestions == 4">80%</span>
                            <span v-if="attemptedQuestions == 5">100%</span> -->
                            </div>
                        </div>
                    </b-col>
                    <b-col sm="3">
                        <div class="timer-call d-flex align-items-center justify-content-center">
                            <!-- <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M38.0057 47.3636V59H35.5455V49.6989H35.4773L32.8125 51.3693V49.1875L35.6932 47.3636H38.0057ZM45.5138 47.3636V59H43.0536V49.6989H42.9854L40.3206 51.3693V49.1875L43.2013 47.3636H45.5138ZM49.3969 57.6477C49.0219 57.6477 48.7 57.5152 48.431 57.25C48.1659 56.9848 48.0333 56.6629 48.0333 56.2841C48.0333 55.9129 48.1659 55.5947 48.431 55.3295C48.7 55.0644 49.0219 54.9318 49.3969 54.9318C49.7606 54.9318 50.0787 55.0644 50.3515 55.3295C50.6242 55.5947 50.7606 55.9129 50.7606 56.2841C50.7606 56.5341 50.6962 56.7633 50.5674 56.9716C50.4424 57.1761 50.2776 57.3409 50.0731 57.4659C49.8685 57.5871 49.6431 57.6477 49.3969 57.6477ZM49.3969 51.9375C49.0219 51.9375 48.7 51.8049 48.431 51.5398C48.1659 51.2746 48.0333 50.9527 48.0333 50.5739C48.0333 50.2027 48.1659 49.8864 48.431 49.625C48.7 49.3598 49.0219 49.2273 49.3969 49.2273C49.7606 49.2273 50.0787 49.3598 50.3515 49.625C50.6242 49.8864 50.7606 50.2027 50.7606 50.5739C50.7606 50.8277 50.6962 51.0587 50.5674 51.267C50.4424 51.4716 50.2776 51.6345 50.0731 51.7557C49.8685 51.8769 49.6431 51.9375 49.3969 51.9375ZM56.7062 59.1591C55.8577 59.1591 55.102 59.0133 54.4391 58.7216C53.7801 58.4261 53.2592 58.0208 52.8766 57.5057C52.4979 56.9867 52.3028 56.3883 52.2914 55.7102H54.7687C54.7838 55.9943 54.8766 56.2443 55.0471 56.4602C55.2213 56.6723 55.4524 56.8371 55.7403 56.9545C56.0282 57.072 56.352 57.1307 56.7119 57.1307C57.0869 57.1307 57.4183 57.0644 57.7062 56.9318C57.9941 56.7992 58.2195 56.6155 58.3823 56.3807C58.5452 56.1458 58.6266 55.875 58.6266 55.5682C58.6266 55.2576 58.5395 54.983 58.3653 54.7443C58.1948 54.5019 57.9486 54.3125 57.6266 54.1761C57.3085 54.0398 56.9297 53.9716 56.4903 53.9716H55.4051V52.1648H56.4903C56.8615 52.1648 57.1891 52.1004 57.4732 51.9716C57.7611 51.8428 57.9846 51.6648 58.1437 51.4375C58.3028 51.2064 58.3823 50.9375 58.3823 50.6307C58.3823 50.339 58.3123 50.0833 58.1721 49.8636C58.0357 49.6402 57.8426 49.4659 57.5926 49.3409C57.3463 49.2159 57.0585 49.1534 56.7289 49.1534C56.3956 49.1534 56.0907 49.214 55.8141 49.3352C55.5376 49.4527 55.316 49.6212 55.1494 49.8409C54.9827 50.0606 54.8937 50.3182 54.8823 50.6136H52.5244C52.5357 49.9432 52.727 49.3523 53.0982 48.8409C53.4695 48.3295 53.9695 47.9299 54.5982 47.642C55.2308 47.3504 55.9448 47.2045 56.7403 47.2045C57.5433 47.2045 58.246 47.3504 58.8482 47.642C59.4505 47.9337 59.9183 48.3277 60.2516 48.8239C60.5888 49.3163 60.7554 49.8693 60.7516 50.483C60.7554 51.1345 60.5528 51.678 60.1437 52.1136C59.7384 52.5492 59.21 52.8258 58.5585 52.9432V53.0341C59.4145 53.1439 60.066 53.4413 60.513 53.9261C60.9638 54.4072 61.1873 55.0095 61.1835 55.733C61.1873 56.3958 60.996 56.9848 60.6096 57.5C60.227 58.0152 59.6986 58.4205 59.0244 58.7159C58.3501 59.0114 57.5774 59.1591 56.7062 59.1591ZM66.8819 59.1591C66.0789 59.1591 65.363 59.0114 64.7342 58.7159C64.1092 58.4205 63.613 58.0133 63.2456 57.4943C62.8781 56.9754 62.6869 56.3807 62.6717 55.7102H65.0581C65.0846 56.161 65.274 56.5265 65.6262 56.8068C65.9785 57.0871 66.3971 57.2273 66.8819 57.2273C67.2683 57.2273 67.6092 57.142 67.9047 56.9716C68.2039 56.7973 68.4369 56.5568 68.6035 56.25C68.774 55.9394 68.8592 55.5833 68.8592 55.1818C68.8592 54.7727 68.7721 54.4129 68.5978 54.1023C68.4274 53.7917 68.1906 53.5492 67.8876 53.375C67.5846 53.2008 67.238 53.1117 66.8478 53.108C66.5069 53.108 66.1755 53.178 65.8535 53.3182C65.5353 53.4583 65.2872 53.6496 65.1092 53.892L62.9217 53.5L63.4728 47.3636H70.5865V49.375H65.5012L65.2001 52.2898H65.2683C65.4728 52.0019 65.7816 51.7633 66.1944 51.5739C66.6073 51.3845 67.0694 51.2898 67.5808 51.2898C68.2816 51.2898 68.9066 51.4545 69.4558 51.7841C70.005 52.1136 70.4387 52.5663 70.7569 53.142C71.0751 53.714 71.2323 54.3731 71.2285 55.1193C71.2323 55.9034 71.0505 56.6004 70.6831 57.2102C70.3194 57.8163 69.81 58.2936 69.1547 58.642C68.5031 58.9867 67.7456 59.1591 66.8819 59.1591Z" fill="#FAFBFB"/>
                            <path opacity="0.05" d="M104 52C104 80.7188 80.7188 104 52 104C23.2812 104 0 80.7188 0 52C0 23.2812 23.2812 0 52 0C80.7188 0 104 23.2812 104 52ZM11 52C11 74.6437 29.3563 93 52 93C74.6437 93 93 74.6437 93 52C93 29.3563 74.6437 11 52 11C29.3563 11 11 29.3563 11 52Z" fill="#FAFBFB"/>
                            <path d="M52 5.5C52 2.46243 49.5305 -0.0301333 46.5099 0.290514C35.8171 1.4256 25.6884 5.85599 17.5638 13.0366C8.0593 21.4367 1.95296 33.0213 0.394147 45.6097C-1.16466 58.1981 1.93156 70.9222 9.10004 81.387C16.2685 91.8517 27.0148 99.3354 39.3163 102.429C51.6177 105.523 64.6258 104.014 75.8922 98.1862C87.1586 92.358 95.9062 82.6128 100.488 70.7849C105.071 58.9569 105.172 45.8619 100.772 33.9647C97.0115 23.7948 90.1841 15.0997 81.3006 9.04088C78.7911 7.32934 75.4363 8.357 73.9992 11.0331V11.0331C72.5621 13.7092 73.5942 17.0154 76.0541 18.7975C82.5945 23.5357 87.6256 30.1284 90.455 37.7799C93.9238 47.1604 93.8442 57.4852 90.2313 66.8111C86.6183 76.1371 79.7212 83.8208 70.8381 88.416C61.955 93.0113 51.6986 94.2011 41.9994 91.7616C32.3002 89.3221 23.8271 83.4215 18.175 75.1705C12.523 66.9194 10.0817 56.887 11.3108 46.9615C12.5398 37.036 17.3544 27.902 24.8484 21.2788C30.961 15.8764 38.5125 12.4484 46.5163 11.3683C49.5266 10.962 52 8.53757 52 5.5V5.5Z" fill="#7A60E0"/>
                            </svg> -->
                            <div class="progressbar-timer" role="progressbarcircle" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :style="{'--value':progressCircleWidth}">
                                <p id="countdown"></p>
                            </div>
                            
                        </div>
                    </b-col>
                    <b-col cols="12" md="12" class="mt-3">
                        <div class="cousre-questions">
                            <h2>{{quizQuestion.name}}</h2>
                            <hr />
                            <div class="ques-opts" v-for="option  in quizQuestion.questionOptions" :key="option.id">
                                <div class="Quiz-box d-flex align-items-center align-items-center" :class="answerArr === option.uuid ? 'selectedOption' : ''" @click="saveAnswer(option.uuid)">
                                    <div>
                                        <feather-icon icon="CircleIcon" size="26" class="text-white notcheckedquiz"></feather-icon>
                                        <feather-icon icon="CheckCircleIcon" size="26" class="text-white d-none checkedquiz" ></feather-icon>
                                    </div>
                                    <div class="takeQuizOptName ml-2">
                                        <h4>{{option.name}}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="12" class="mt-5">
                        <button v-if="isDisable" class="next-question-btn ques-btn"><b-spinner medium /><span class="ml-1">Saving...</span></button>
                        <button v-else class="next-question-btn ques-btn" @click="nextQuizBtn">Next Question</button>
                    </b-col>
                </b-row>
            </div>
        </div>
        <div id="quiz_result_contanier">
            <QuizResultPass :finalResult="finalResult" :quizData="quizData" @reTakeQuiz="reTakeQuiz($event)" />
        </div>
    </div>
</template>
  
<script>
import { toastAlert } from "@core/mixins/ui/toast";
import QuizResultPass from "./QuizResultPass.vue";
import moment from "moment";
import {
     BRow, 
     BCol, 
     BDropdown, 
     BDropdownItem, 
     BModal, 
     BLink, 
     BImg, 
     BFormInput, 
     BFormGroup, 
     BFormCheckbox, 
     BSpinner
    } from "bootstrap-vue";
export default {
    components: {
        QuizResultPass,
        BRow,
        BCol,
        BDropdown,
        BDropdownItem,
        BModal,
        BLink,
        BImg,
        BFormInput,
        BFormGroup,
        BFormCheckbox,
        BSpinner,
    },
    mixins: [toastAlert],
    data() {
        return{
            quizUuid: '',
            quizData: {},
            quizQuestion: {},
            quizLesson: {},
            answerArr: '',
            isChecked: false,
            totalQuestion: '',
            attemptedQuestions: '',
            progressWidth: 0,
            progressCircleWidth: 0,
            finalResult: '',
            otpTimer: {},
            isTimer: false,
            setIntervalMin: 0,
            setIntervalSec: 0,
            totalSec: 0,
            currSec : 0,
            spendSec : 0,
            totalDurationSpend: 0,
            quizDurationInMintues: 0,
            quizDurationInSec: 0,
            intervalCheck: 0,
            isDisable:false,
        }
    },
    watch: {
        setIntervalSec: function(newValue, oldValue) {
            
            console.log('this.quizDurationInMintues' , this.quizDurationInMintues)
            const time = this.quizData.duration
            const timeArray = time.split(":");
            const minutes = timeArray[0];
            const seconds = minutes*60

            this.totalSec = seconds
            this.currSec = (this.setIntervalMin*60) + this.setIntervalSec;
            this.progressCircleWidth = (100/this.totalSec)*(this.totalSec-this.currSec)
            if(newValue){
                this.intervalCheck++
                if(seconds == this.intervalCheck){
                    clearInterval(this.otpTimer)
                    // this.attemptedQuestions = 5
                    document.getElementById('quiz_take_container').style.display = 'none';
                    document.getElementById('quiz_result_contanier').style.display = 'block';
                }
                console.log(this.intervalCheck)
            }
        }
    },
    methods:{
        saveAnswer(param){
            this.answerArr = ''
            this.answerArr = param
        },
        reTakeQuiz(param){
            console.log('you are in re take quiz!')
            this.$http
            .post("re-take-quiz" + "/" + this.quizUuid)
            .then((response) => {
                if(response){
                    this.getQuizResult()
                    this.getQuizData()
                    this.progressWidth = 0
                    this.intervalCheck = 0
                    document.getElementById('quiz_take_container').style.display = 'block';
                    document.getElementById('quiz_result_contanier').style.display = 'none';
                }
            })
            .catch((error) => {
            })
            .finally(() => {
                this.hideLoader()
            });
        },
        nextQuizBtn(){
            // this.currSec = (this.setIntervalMin*60) + this.setIntervalSec;
            // this.spendSec = this.totalSec - this.currSec
            // console.log(this.spendSec)
            // return true
            console.log(this.spendSec)

            // this.showLoader();
            this.isDisable = true;
            this.$http
            .post("post-test", {
                quiz_uuid: this.quizUuid,
                question_uuid: this.quizQuestion.uuid,
                option_uuid: this.answerArr,
                time_spend: this.spendSec,
            })
            .then((response) => {
                if(response){
                    this.answerArr = ''
                    this.spendSec = ''
                    this.getQuizResult()
                    this.getQuizData()
                    this.isDisable = false;
                }
            })
            .catch((error) => {
            })
            .finally(() => {
                // this.hideLoader()
            });
        },
        getQuizData(){
            // this.showLoader()
            this.isDisable = true;
            this.$http
            .get("get-quiz" + "/" + this.quizUuid)
            .then((response) => {
                const { data: { data: { quiz }}} = response
                this.quizData = quiz
                const { data: { data: { quiz_lesson }}} = response
                this.quizLesson = quiz_lesson
                const { data: { data: { quiz_question }}} = response
                this.quizQuestion = quiz_question
                this.answerArr = ''
                this.isDisable = false;
                // console.log(this.quizData)
                
            })
            .catch((error) => {
                // this.errorToast();
            })
            .finally(() => {
                // this.hideLoader()
            });
        },
        getQuizResult(){
            this.$http
            .get("get-quiz-result?quiz_uuid=" + this.quizUuid)
            .then((response) => {
                const { data: {data}} = response
                this.finalResult = data
                this.attemptedQuestions = data.attemptedQuestions
                this.totalQuestion = data.totalQuestion.no_of_question
                const duration = data.totalDurationSpend

                // console.log(duration)
                // console.log('attemptedQuestions',this.attemptedQuestions)
                // console.log('totalQuestion',this.totalQuestion)


                //Get attempted question duration total
                this.totalDurationSpend = 0;
                this.totalDurationSpend = getDurationArraySum(duration)
                // console.log('totalDurationSpend', this.totalDurationSpend)
                

                const time = this.quizData.duration
                const timeArray = time.split(":");
                this.quizDurationInMintues = timeArray[0];

                // console.log('quizDurationInMintues',this.quizDurationInMintues)

                if((this.quizDurationInMintues*60) > this.totalDurationSpend){

                    const totalSeconds = (this.quizDurationInMintues*60) - this.totalDurationSpend;

                    // 👇️ get number of full minutes
                    const minutes = Math.floor(totalSeconds / 60);
                    this.quizDurationInMintues = padTo2Digits(minutes)

                    // 👇️ get remainder of seconds
                    const seconds = totalSeconds % 60;
                    this.quizDurationInSec = padTo2Digits(seconds)

                    this.isTimer = true
                    this.countDownTimer()
                    // console.log(this.isTimer)
                    // console.log(`${padTo2Digits(this.quizDurationInMintues)}:${padTo2Digits(this.quizDurationInSec )}`)
                }

                if(this.attemptedQuestions == this.totalQuestion){
                    clearInterval(this.otpTimer);
                    document.getElementById('quiz_take_container').style.display = 'none';
                    document.getElementById('quiz_result_contanier').style.display = 'block';
                }
                
                if(this.isTimer === false && this.attemptedQuestions < this.totalQuestion){
                    this.countDownTimer()
                }
                // if(this.isTimer === false && this.attemptedQuestions >= 1 && this.attemptedQuestions < 5){
                //     this.countDownTimer()
                // }

                if(this.attemptedQuestions) {
                    this.progressWidth = (100/this.totalQuestion)*(this.attemptedQuestions);
                }
            })
            .catch((error) => {
                // this.errorToast();
            })
        },
        countDownTimer() {
            if(this.isTimer == true){
                // const time = this.quizData.duration
                // const timeArray = time.split(":");
                // this.quizDurationInMintues = timeArray[0];

                var duration = moment.duration({ minutes: this.quizDurationInMintues, seconds: this.quizDurationInSec });
                var timestamp = new Date(0, 0, 0, 2, 10, 30);
                clearInterval(this.otpTimer);
                this.spendSec = 0
                var interval = 1;
                this.otpTimer = setInterval(() => {
                    // this.isTimer = true
                    timestamp = new Date(timestamp.getTime() + interval * 1000);
                    duration = moment.duration(duration.asSeconds() - interval, "seconds");
                    this.setIntervalMin = duration.minutes();
                    this.setIntervalSec = duration.seconds();
                    this.spendSec++
                    

                    this.setIntervalSec -= 1;
                    if (this.setIntervalMin < 0) return clearInterval(this.otpTimer);
                    if (this.setIntervalMin < 10 && this.setIntervalMin.length != 2) this.setIntervalMin = "0" + this.setIntervalMin;
                    if (this.setIntervalSec < 0 && this.setIntervalMin != 0) {
                        this.setIntervalMin -= 1;
                        this.setIntervalSec = 59;
                    } else if (this.setIntervalSec < 10 && length.this.setIntervalSec != 2) this.setIntervalSec = "0" + this.setIntervalSec;

                    document.getElementById("countdown").innerHTML = this.setIntervalMin + ":" + this.setIntervalSec;
                    if (this.setIntervalMin == 0 && this.setIntervalSec == 0) {
                        clearInterval(this.otpTimer);
                        this.isTimer = false
                        document.getElementById("countdown").innerHTML = '';
                    }
                }, 1000);
            }
        },
    },
    beforeDestroy () {
      clearInterval(this.otpTimer)
    },
    created(){
        this.quizUuid = this.$router.currentRoute.params.uuid
        if(this.quizUuid){
            this.getQuizData()
            this.getQuizResult()
        }
    },
};
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
function getDurationArraySum(duration) {
    let sum  = 0;
    for (let i = 0; i < duration.length; i += 1) 
    {
        sum += duration[i];
    }
    return sum;
}
</script>
  
<style lang="scss" scoped>
    @import "@/assets/scss/lms-style/agentlms.scss";
    .check-circle{
        border-radius: 50%;
        background-color: lightgray;
        color: #fff;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
    }
    

    #quiz_result_contanier{
        display: none;
    }
//     @keyframes growProgressBar {
//   0%, 33% { --pgPercentage: 0; }
//   100% { --pgPercentage: var(--value); }
// }

    @property --pgPercentage {
        syntax: '<number>';
        inherits: false;
        initial-value: 0;
    }

    div[role="progressbarcircle"] {
        --size: 12rem;
        --fg: #933FFE;
        --bg: #fff;
        --pgPercentage: var(--value);
        animation: growProgressBar 3s 1 forwards;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: radial-gradient(closest-side, #283046 80%, transparent 0 99.9%, #283046 0),
        conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0);
        font-family: Helvetica, Arial, sans-serif;
        font-size: calc(var(--size) / 5);
        color: var(--fg);
    }

    div[role="progressbarcircle"]::before {
        counter-reset: percentage var(--value);
        content: counter(percentage) '%';
        display: none;
    }
</style>