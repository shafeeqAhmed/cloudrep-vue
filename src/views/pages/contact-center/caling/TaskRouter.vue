<template>
  <!-- Complete Home Component Backup -->
  <div>
  </div>
</template>

<script>
import {

  // BCardSubTitle
} from "bootstrap-vue";


export default {
  components: {

  },
  data() {
    return {
      token: '',
      worker: {}
    }
  },
  methods: {
    initiateTaskRouter() {

      if (this.$store.getters['app/isLogin'] && this.$store.getters['app/role'] == 'agent') {

        // this.$http.get('get-worker-capability-token')

        this.$store.dispatch('app/getWorkerCapabilityToken')
          .then(response => {
            const { data: { data: { workerCapability } } } = response
            this.token = workerCapability

            this.worker = new Twilio.TaskRouter.Worker(this.token);
            console.log('this is the token-------------------')
            console.log(this.worker)




            this.worker.on("error", function (error) {
              console.log(error.response)
              console.log("Websocket had an error: " + error.response + " with message: " + error.message);
            });


            this.worker.on('ready', (worker) => {

              this.$store.commit('app/UPDATE_SELECTED_WORKER_ACTIVITY', {
                title: worker.activityName,
                sid: worker.activitySid
              })

              console.log("Successfully registered as: " + worker.friendlyName)
              console.log("Current activity is: " + worker.activityName);
              console.log(worker)
            });

            this.worker.on('activity.update', function (worker) {
              console.log("worker activity--------------" + worker.activityName);
              console.log("Worker activity changed to: " + worker.activityName);
            });

            this.worker.on("reservation.created", (reservation) => {
              this.$emit('reservation', reservation)

              this.$store.commit('app/UPDATE_INCOMING_CALL_NUMBER', reservation.task.attributes.from)
              console.log("You have been reserved to handle a call!");
              console.log("Call from: " + reservation.task.attributes.from);
            });

            this.worker.on("reservation.accepted", (reservation) => {
              console.log('===============================================================********************************=============================================================')
              console.log('accept reservation----------------------')
              console.log(reservation)
              console.log(reservation.task.attributes)
              console.log(reservation.task.priority)
              console.log(reservation.task.age)
              console.log(reservation.task.sid)
              console.log(reservation.sid)
              console.log(reservation.task)
            });

            this.worker.on("reservation.canceled", function (reservation) {
              console.log('canceled reservation----------------------')
              console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
              console.log(reservation.task.priority)        // 1
              console.log(reservation.task.age)             // 300
              console.log(reservation.task.sid)             // WTxxx
              console.log(reservation.sid)

            });
            this.worker.on("reservation.rejected", function (reservation) {
              console.log(' rejected----------------------')
              console.log(reservation.task.attributes)
              console.log(reservation.task.priority)
              console.log(reservation.task.age)
              console.log(reservation.task.sid)
              console.log(reservation.sid)

            })
            this.worker.on("reservation.wrapup", function (reservation) {
              console.log('wrapup ----------------------')
              console.log(reservation.task.attributes)
              console.log(reservation.task.priority)
              console.log(reservation.task.age)
              console.log(reservation.task.sid)
              console.log(reservation.sid)

              reservation.task.complete(
                function (error, completedTask) {
                  if (error) {
                    console.log(error.code);
                    console.log(errors.message);
                    return;
                  }
                  console.log("Completed Task: " + completedTask.assignmentStatus);
                }
              );

            })



            this.worker.on("token.expired", () => {
              console.log("updating token");


              this.$http.get('get-worker-capability-token')
                .then(response => {
                  const { data: { data: { workerCapability } } } = response

                  this.worker.updateToken(workerCapability);

                });
            });


          })
          .catch(error => {
            console.log('please refresh the page for  calling')
            console.log(error)
          });

      }
    },
    updateWorkerActivity(workerActivity) {
      if (Object.keys(this.worker).length > 0) {
        const props = { "ActivitySid": workerActivity.sid };

        this.worker.update(props, function (error, worker) {
          if (error) {
            console.log(error.code);
            console.log(error.message);
          } else {
            console.log(worker.activityName); // "Offline"
          }
        });
      }
    },



  },
  watch: {
    '$store.state.app.workerActivity': function () {
      console.log('activity watch hook call------------------------')
      this.updateWorkerActivity(this.$store.state.app.workerActivity)
    },
    '$store.state.app.user.user_uuid': function () {
      console.log('new task router register change on singin------------------------')
      this.initiateTaskRouter()
    }
  },
  created() {
    this.initiateTaskRouter()
  },
}
</script>