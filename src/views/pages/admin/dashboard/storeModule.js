import axios from '@axios'

export default {
    namespaced: true,
    state: {
        statistics: '',
        users:[],
        dashboardFilterRecord:[],
    },
    getters: {
        getStatistics(state){
            return state.statistics;
        },
        getUsers: (state) => {
            return  state.users;
          },
          getDashboardFilterRecord: (state) => {
            return  state.dashboardFilterRecord;
            },

    },
    mutations: {
   UPDATE_STATISTICS(state,val){
    state.statistics=val;
   },
   UPDATE_USERS(state, val) {
    state.users = val;
  },
  UPDATE_DASHBOARD_USERS(state,val){
    state.dashboardFilterRecord=val;

   },

    },
    actions: {

    getDashboardFilterRecord(ctx,params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/get-campaign-users`,{params})
          .then((response) =>{
             const{
              data:{
                data:{users},
              },
             }=response;

             ctx.commit('UPDATE_DASHBOARD_USERS',users);
            resolve(response);
          })

          .catch((error) => reject(error))
          .finally(() => {
          });
      });
    },


        getUserDashboardRecord(ctx,params) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/get-user-dashboard-record`, { params })
                    .then((response) =>{
                        const {
                            data: {
                              data: { dashboard_record },
                            },
                          } = response;

                        ctx.commit('UPDATE_STATISTICS',dashboard_record)
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
        getAllUsers(ctx) {
            return new Promise((resolve, reject) => {
              axios
                .get(`/get-users`)
                .then((response) =>{
                   const{
                    data:{
                      data:{users},
                    },
                   }=response;
                   ctx.commit('UPDATE_USERS',users.data);
                  resolve(response);
                })

                .catch((error) => reject(error))
                .finally(() => {
                });
            });
          },

    },
}
