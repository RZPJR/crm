import http from "../../../services/http";

const actions = {
    // Readlist Main Outlet 
    fetchCustomer: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadCustomer', true);
        commit('setCustomer', []);
        try {
            // let search = state.main_outlet.filter.search
            // let status = state.main_outlet.filter.status
            // let invoice_term = state.main_outlet.filter.invoice_term
            // let payment_term = state.main_outlet.filter.payment_term
            // let finance_area = state.main_outlet.filter.finance_area
            // let business_type = state.main_outlet.filter.business_type
            // let suspend = state.main_outlet.filter.suspend
            // const response = await http.get("/main_outlet", {
            //     params: {
            //         per_page:1000,
            //         order_by:'-id',
            //         search: search,
            //         status: status,
            //         invoice_term: invoice_term,
            //         payment_term: payment_term,
            //         finance_area: finance_area,
            //         business_type: business_type,
            //         suspend: suspend,
            //     }
            // });
            // if (response.data.data) commit('setCustomer', response.data.data);
            commit('setPreloadCustomer', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadCustomer', false);
        }
    },

    
    // Detail Main Outlet 
    fetchCustomerDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadCustomerDetail', true);
        commit('setCustomerDetail', []);
        try {
            // const response = await http.get("/main_outlet/" + payload.id);
            // if (response.data.data) commit('setCustomerDetail', response.data.data);
            commit('setPreloadCustomerDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadCustomerDetail', false);
        }
    },
};

export default actions;
