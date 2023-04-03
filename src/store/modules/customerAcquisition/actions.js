import http from "../../../services/http";

const actions = {
    // Readlist Customer Acquisition
    fetchCustomerAcquisition: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadCustomerAcquisition', true);
        commit('setCustomerAcquisition', []);
        try {
            let search = state.customer_acquisition.filter.search
            // let sales_person = state.customer_acquisition.filter.salesperson === 999 ? '' : "|salesperson_id.e:"+state.customer_acquisition.filter.salesperson      
            // let sales_group = state.customer_acquisition.filter.sales_group_id === '' ? '' : "|sales_group_id.e:"+state.customer_acquisition.filter.sales_group_id
            let submitted_date = ''
            let submitted_date2 = ''
            if (state.customer_acquisition.filter.submitted_date.value.length > 0) {
                if (state.customer_acquisition.filter.submitted_date.value.length == 1) {
                    submitted_date = state.customer_acquisition.filter.submitted_date.value[0]
                } else {
                    let date = state.customer_acquisition.filter.submitted_date.value[0]
                    let date2 = state.customer_acquisition.filter.submitted_date.value[1]
                    if (date > date2) {
                        submitted_date = date2
                        submitted_date2 = date
                    } else {
                        submitted_date = date
                        submitted_date2 = date2
                    }
                }
            }
            const response = await http.get("/customer/acquisition", {
                params: {
                  per_page:100,
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
    
    // Detail Customer Acquisition
    fetchCustomerAcquisitionDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadCustomerAcquisitionDetail', true);
        commit('setCustomerAcquisitionDetail', []);
        try {
            const response = await http.get("/customer/acquisition/" + payload.id);
            if (response.data.data) {
                commit('setCustomerAcquisitionDetail', response.data.data);
                commit('setPreloadCustomerAcquisitionDetail', false);
            }
        } catch (error) {
            console.log(error);
            commit('setPreloadCustomerAcquisitionDetail', false);
        }
    },
};

export default actions;
