<template>
    <div class="quiz-result card pb-3">
            <h1 class="mt-5 mb-4">{{quizData.name}} Quiz Completed</h1>
            <!-- <h1>{{quizData.name}} ({{quizLesson.name}} - Quiz)</h1> -->
            <div class="quiz-score mb-2">
                <div class="d-flex align-items-center justify-content-between">
                  <!-- <h2 class="mb-2">Your Score :</h2><h2 class="w-25">93.33%</h2> -->
                  <h2 class="mb-2">Your Score :</h2><h2 class="w-25">{{finalResult.correctOptions /  finalResult.totalQuestion.no_of_question *100}}%</h2>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <!-- <h2>Passing Score :</h2><h2 class="w-25">80%</h2> -->
                  <h2>Passing Score :</h2><h2 class="w-25">{{quizData.percentage}}%</h2>
                </div>
            </div>
            <hr>
            <div class="result mt-2 text-center" v-if="(finalResult.correctOptions /  finalResult.totalQuestion.no_of_question *100) > quizData.percentage">
                <div class="result-passing-data">
                  <h3>Result :</h3>
                  <div class="d-flex mt-2">
                      <div class="mr-2"><b-img src="@/assets/images/lms-img/pass.png"></b-img></div>
                      <div><h3>Congratulations, you Passed</h3>
                        <p class="mt-1 mb-4 text-left">Click on the button to move to next section</p>
                      </div>
                  </div>
                  <button @click="stop()">Watch Next Lesson</button>
                </div>
            </div>
            <div class="result mt-2 text-center" v-else>
              <h3>Result :</h3>
              <div class="d-flex align-items-center mt-2">
                  <div class="mr-2"><b-img src="@/assets/images/lms-img/fail.png"></b-img></div>
                  <div><h3>Sorry, better luck next time</h3>
                    <p class="mt-1 mb-4">Click on the button to retake the quiz</p>
                  </div>
              </div>
              
              <button @click="passEvent">Retake Quiz</button>
          </div>
    </div>
  </template>
  
  <script>
  import { BRow, BCol, BDropdown, BDropdownItem, BModal , BLink , BImg , BFormInput , BFormGroup , BFormCheckbox} from "bootstrap-vue";  


  export default {
    props: ["finalResult", "quizData"],
    components: {
      BRow,
      BCol,
      BDropdown,
      BDropdownItem,
      BModal,
      BLink,
      BImg,
      BFormInput,
      BFormGroup,
      BFormCheckbox
    },
    methods:{
      passEvent()
      {
        this.$emit('reTakeQuiz','Awesome ')
      },
      start(){
        this.$confetti.start({
          particles: [
            {
              type: 'rect',
            },
            {
              type: 'circle',
            },
          ],
          defaultColors: [
            '#EF2964',
            '#00C09D',
            '#2D87B0',
            '#48485E',
            '#EFFF1D',
          ],
          particlesPerFrame: 0.75,
          // defaultDropRate: 5,
          defaultSize: 8,
        });
      },
      stop() {
        this.$confetti.stop();
      },
    },
    updated() {
      if((this.finalResult.correctOptions /  this.finalResult.totalQuestion.no_of_question *100) > this.quizData.percentage){
        this.start()
      }
    },
    destroyed() {
      this.stop()
    },
  };
  </script>
  
  <style lang="scss">
    @import "@/assets/scss/lms-style/agentlms.scss";

  </style>