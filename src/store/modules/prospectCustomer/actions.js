import axios from "axios";
import http from "../../../services/http";

const actions = {
    // Readlist Prospect Customer 
    fetchProspectCustomer: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadProspectCustomer', true);
        commit('setOverlayProspectCustomer', true);
        commit('setProspectCustomer', []);
        try {
            let search = state.prospect_customer.filter.search
            let status = state.prospect_customer.filter.statuses
            let customer_type_id = state.prospect_customer.filter.customer_type
            let region_id = state.prospect_customer.filter.area
            let archetype_id = state.prospect_customer.filter.archetype
            let salesperson_id = state.prospect_customer.filter.sales_person
            let requested_by = state.prospect_customer.filter.request_by
            const response = await http.get("/prospective_customer", {
                params: {
                    per_page:100,
                    order_by:'-id',
                    search: search,
                    status: status,
                    archetype_id: archetype_id,
                    customer_type_id: customer_type_id,
                    region_id: region_id,
                    salesperson_id: salesperson_id,
                    requested_by: requested_by,
                }
            });
            if (response.data.data) commit('setProspectCustomer', response.data.data);
            commit('setPreloadProspectCustomer', false);
            commit('setOverlayProspectCustomer', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomer', false);
            commit('setOverlayProspectCustomer', false);
        }
    },

    // Detail Prospect Customer 
    fetchProspectCustomerDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadProspectCustomerDetail', true);
        commit('setDataProspectCustomerDetail', []);
        try {
            const response = await http.get("/prospective_customer/" + payload.id, {
                params: {
                    
                }
            });
            if (response.data.data) 
            commit('setDataProspectCustomerDetail', response.data.data);
            commit('setPreloadProspectCustomerDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomerDetail', false);
        }
    },
};

export default actions;
