import http from "../../../services/http";

const actions = {
    // Readlist Sales Performance
    fetchSalesPerformanceList: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadSalesPerformance', true);
        commit('setSalesPerformance', []);
        try {
            let sales_person = state.performance_readlist.filter.salesperson === 999 ? '' : state.performance_readlist.filter.salesperson      
            let sales_group = state.performance_readlist.filter.sales_group_id === '' ? '' : state.performance_readlist.filter.sales_group_id
            let submitted_date = ''
            let submitted_date2 = ''
            if (state.performance_readlist.filter.submitted_date.value1.length > 0 && state.performance_readlist.filter.submitted_date.value2.length > 0 ) {
                if (state.performance_readlist.filter.submitted_date.value1.length == 1 && state.performance_readlist.filter.submitted_date.value2.length == 1) {
                    submitted_date = state.performance_readlist.filter.submitted_date.value1[0]
                    submitted_date2 = state.performance_readlist.filter.submitted_date.value2[0]
                } else {
                    let date = state.performance_readlist.filter.submitted_date.value1[0]
                    let date2 = state.performance_readlist.filter.submitted_date.value2[1]
                    if (date > date2) {
                        submitted_date = date2
                        submitted_date2 = date
                    } else {
                        submitted_date = date
                        submitted_date2 = date2
                    }
                }
            }
            const response = await http.get("/sales/performance", {
                params: {
                  per_page:1000,
                  order_by:'-id',
                  start_date_from: submitted_date,
                  start_date_to: submitted_date2,
                  territory_id: sales_group,
                  salesperson_id: sales_person
                }
            });
            if (response.data.data) commit('setSalesPerformance', response.data.data);
            commit('setPreloadSalesPerformance', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadSalesPerformance', false);
        }
    },

    fetchSalesPerformanceDetail: async ({ state, commit, dispatch }, payload) => {
        
    }
};

export default actions;
