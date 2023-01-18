<template>
  <div class="quiz-result card pb-3">
          <h1 class="mt-5 mb-4">Intoduction to HTML Quiz Completed</h1>
          <div class="quiz-score mb-2">
              <div class="d-flex align-items-center justify-content-between">
                <h2 class="mb-2">Your Score :</h2><h2 class="w-25">63.33%</h2>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <h2>Passing Score :</h2><h2 class="w-25">80%</h2>
              </div>
          </div>
          <hr>
          <div class="result mt-2 text-center">
              <h3>Result :</h3>
              <div class="d-flex align-items-center mt-2">
                  <div class="mr-2"><b-img src="@/assets/images/lms-img/fail.png"></b-img></div>
                  <div><h3>Sorry, better luck next time</h3>
                    <p class="mt-1 mb-4">Click on the button to retake the quiz</p>
                  </div>
              </div>
              
              <button>Retake Quiz</button>
          </div>
  </div>
</template>

<script>
import { BRow, BCol, BDropdown, BDropdownItem, BModal , BLink , BImg , BFormInput , BFormGroup , BFormCheckbox} from "bootstrap-vue";  

export default {
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
    
  },
  mounted() {

  }
};
</script>

<style lang="scss">
  @import "@/assets/scss/lms-style/agentlms.scss";
</style>