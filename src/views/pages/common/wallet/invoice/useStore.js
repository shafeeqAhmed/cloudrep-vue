import axios from '@axios'

let startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

let endofDay = new Date();
endofDay.setDate(startOfDay.getDate());
endofDay.setHours(23, 59, 59, 999);


export default {
    namespaced: true,
    state: {
        dateRange: { startDate: startOfDay, endDate: endofDay }
    },
    getters: {},
    mutations: {
        UPDATE_DATE_RANGE(state, val) {
            state.dateRange = val;
        },
    },
    actions: {
        fetchTransaction(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/get-transactions`, { params: queryParams })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => reject(error))
            })
        },
    },
}