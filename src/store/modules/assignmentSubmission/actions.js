import http from "../../../services/http";

const actions = {
    // Readlist Customer Acquisition
    fetchAssignmentSubmission: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadCustomerAcquisition', true);
        commit('setCustomerAcquisition', []);
        try {
            let search = state.customer_acquisition.filter.search
            // let sales_person = state.customer_acquisition.filter.salesperson === 999 ? '' : "|salesperson_id.e:"+state.customer_acquisition.filter.salesperson      
            // let sales_group = state.customer_acquisition.filter.sales_group_id === '' ? '' : "|sales_group_id.e:"+state.customer_acquisition.filter.sales_group_id
            let submitted_date = ''
            let submitted_date2 = ''
            if (state.customer_acquisition.filter.submitted_date.value1.length > 0 && state.customer_acquisition.filter.submitted_date.value2.length > 0 ) {
                if (state.customer_acquisition.filter.submitted_date.value1.length == 1 && state.customer_acquisition.filter.submitted_date.value2.length == 1) {
                    submitted_date = state.customer_acquisition.filter.submitted_date.value1[0]
                    submitted_date2 = state.customer_acquisition.filter.submitted_date.value2[0]
                    submitted_date = state.customer_acquisition.filter.submitted_date.value1[0]+'T00:00:00Z'
                    submitted_date2 = state.customer_acquisition.filter.submitted_date.value2[0]+'T23:59:59Z'
                } else {
                    let date = state.customer_acquisition.filter.submitted_date.value1[0]
                    let date2 = state.customer_acquisition.filter.submitted_date.value2[1]
                    if (date > date2) {
                        submitted_date = date2+'T00:00:00Z'
                        submitted_date2 = date+'T23:59:59Z'
                    } else {
                        submitted_date = date+'T00:00:00Z'
                        submitted_date2 = date2+'T23:59:59Z'
                    }
                }
            }
            const response = await http.get("/customer/acquisition", {
                params: {
                  per_page:1000,
                  order_by:'-id',
                  search: search,
                  submit_date_start: submitted_date,
                  submit_date_end: submitted_date2
                }
            });
            if (response.data.data) commit('setCustomerAcquisition', response.data.data);
            commit('setPreloadCustomerAcquisition', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadCustomerAcquisition', false);
        }
    },
};

export default actions;