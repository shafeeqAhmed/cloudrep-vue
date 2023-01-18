import axios from '@axios'

export default {
  namespaced: true,
  state: {
    courseCategories: [],
    courseUuid: null,
    lessonUuid: null,
    quizUuid: null,
    tabIndex: 0,
    refetchLesson: false,
    videoViewerSrc: '',
    editVideoRecord: null,
    editQuestionOptions: null,
    courseDetail: null,
  },
  getters: {
    courseCategories: state => {
      return state.courseCategories
    },
    courseUuid: state => {
      return state.courseUuid
    },
    tabIndex: state => {
      return state.tabIndex
    },
  },
  mutations: {
    UPDATE_COURSE_CATEGORIES(state, val) {
      state.courseCategories = val
    },
    UPDATE_COURSE_UUID(state, val) {
      state.courseUuid = val
    },
    UPDATE_TAB_INDEX(state, val) {
      state.tabIndex = val
    },
    UPDATE_LESSON_UUID(state, val) {
      state.lessonUuid = val
    },
    UPDATE_REFETCH_LESSON(state) {
      state.refetchLesson = !state.refetchLesson
    },
    UPDATE_QUIZ_UUID(state, val) {
      state.quizUuid = val
    },
    UPDATE_VIDEO_VIEWER_SRC(state, val) {
      state.videoViewerSrc = val
    },
    UPDATE_EDIT_VIDEO_RECORD(state, val) {
      state.editVideoRecord = val
    },
    UPDATE_EDIT_QUESTION_OPTIONS(state, val) {
      state.editQuestionOptions = val
    },
    UPDATE_COURSE_DETAIL(state, val) {
      state.courseDetail = val
    }

  },
  actions: {
    fetchCourseCategories(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-course-category-dropdown`)
          .then(response => {
            const {
              data: {
                data: { categories },
              },
            } = response;
            ctx.commit('UPDATE_COURSE_CATEGORIES', categories)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    getCourseDetail(ctx) {
      console.log('you are in storeeeeeeeeeeeeeeee')
      const uuid = state.lms.courseUuid
      return new Promise((resolve, reject) => {
        axios
          .get(`courses/${uuid}`)
          .then(response => {
            const {
              data: {
                data: { course },
              },
            } = response;
            store.commit('UPDATE_COURSE_DETAIL', course)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

  },
}
