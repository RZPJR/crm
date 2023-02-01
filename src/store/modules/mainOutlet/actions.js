import http from "../../../services/http";

const actions = {
    // Readlist Main Outlet 
    fetchMainOutlet: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadMainOutlet', true);
        commit('setMainOutlet', []);
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
            // if (response.data.data) commit('setMainOutlet', response.data.data);
            commit('setPreloadMainOutlet', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadMainOutlet', false);
        }
    },
};

export default actions;
