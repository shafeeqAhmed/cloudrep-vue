<template>
  <div
    id="knowledge-base-article"
  >
    <b-row>

      <!-- related question -->
      <b-col
        lg="3"
        md="5"
        order="2"
        order-md="1"
      >
        <b-card>
          <h6 class="kb-title">
            <feather-icon
              icon="InfoIcon"
              size="20"
              class="mr-50"
            />
            Related Questions
          </h6>
          <b-list-group class="list-group-circle mt-1">
            <b-list-group-item
              v-for="(que,index) in kb_question.relatedQuestions"
              :key="index"
              href="javascript:void(0)"
              class="text-body"
            >
              {{ que.question }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <!--/ related question -->

      <b-col
        lg="9"
        md="7"
        order="1"
        order-md="2"
      >
        <b-card>

          <!-- Title -->
          <b-card-title class="mb-1">
            <feather-icon
              icon="SmartphoneIcon"
              size="21"
            />

            {{ kb_question.title }}
          </b-card-title>
          <b-card-text class="mb-2">
            Last updated on {{ kb_question.lastUpdated }}
          </b-card-text>

          <!-- Content -->
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="question-content"
            v-html="kb_question.content"
          />
          <!-- eslint-enable -->
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BListGroup, BListGroupItem, BCardText, BCardTitle,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BListGroup,
    BCardText,
    BCardTitle,
    BListGroupItem,
  },
  data() {
    return {
      kb_question: {
          questionData: {
            title: "Lorem ipsum dolor sit amet?",
            lastUpdated: "10 Dec 2018",
            relatedQuestions: [
              {
                id: 0,
                question: "Lorem ipsum dolor sit amet?",
              },
              {
                id: 1,
                question: "Lorem ipsum dolor sit amet?",
              },
              {
                id: 2,
                question: "Lorem ipsum dolor sit amet?",
              },
              {
                id: 3,
                question: "Lorem ipsum dolor sit amet?",
              },
              {
                id: 4,
                question: "Lorem ipsum dolor sit amet?",
              },
            ],
            // ! Here we have used require for image source but in API it shall be URL of live image, this is just for demo purpose
            content: `<p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            <br><br>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
            </p>`,
          },
      },
    }
  },
  created() {
    // ! You have to update the below API call according to route parameter
    // * We are using fixed API call for all categories for demo purposes
    // this.$http.get('/kb/data/question').then(res => { this.kb_question = res.data })
    this.kb_question = this.kb_question.questionData;
    console.log('res ques', this.kb_question)
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-knowledge-base.scss';
</style>
