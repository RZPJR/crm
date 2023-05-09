
import Vue from 'vue'
import http from "../../../services/http";
import Pagination from "../pagination";

const actions = {
    // Readlist Prospect Customer 
    fetchProspectCustomer: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadProspectCustomer', true);
        commit('setProspectCustomer', []);
        try {
            let search = state.prospect_customer.filter.search
            let status = state.prospect_customer.filter.status
            let customer_type_id = state.prospect_customer.filter.customer_type
            let region_id = state.prospect_customer.filter.area
            let archetype_id = state.prospect_customer.filter.archetype
            let salesperson_id = state.prospect_customer.filter.sales_person
            let requested_by = state.prospect_customer.filter.request_by
            let pagination = Pagination.state.pagination
            const response = await http.get("/prospective_customer", {
                params: {
                    page: pagination.page,
                    per_page : pagination.rows_per_page,
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
            if(response.data.data && response.data.data !== null){
                commit('setProspectCustomer', response.data.data);
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
            }
            commit('setPreloadProspectCustomer', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomer', false);
        }
    },

    // Decline Prospect Customer 
    declineProspectCustomer: async ({ state, commit, dispatch }, payload) => {
        try {
            await http.put("/prospective_customer/decline/" + payload.id, {
                decline_type: state.prospect_customer.decline.type,
                decline_note: state.prospect_customer.decline.note,
            }).then(response => {
                Vue.$toast.open({
                    position: 'top-right',
                    message: 'Data has been declined successfully',
                    type: 'success',
                });
                commit("setCloseDeclineProspectCustomer");
                dispatch("fetchProspectCustomer")
            });
        } catch (error) {
            commit("setErrorProspectCustomer", error.errors)
        }
    },

    // Detail Prospect Customer 
    fetchProspectCustomerDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadProspectCustomerDetail', true);
        commit('setDataProspectCustomerDetail', []);
        try {
            const response = await http.get("/prospective_customer/" + payload.id);
            if (response.data.data) 
            commit('setDataProspectCustomerDetail', response.data.data);
            commit('setPreloadProspectCustomerDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomerDetail', false);
        }
    },

    // Create Prospect Customer 
    fetchProspectCustomerCreate: async ({ commit, state, dispatch }, payload) => {
        commit("setFormProspectCustomerCreate", {
            customer_id: null,
            company_name: '',
            customer_type_id: null,
            business_type_value: null,
            archetype_id: null,
            brand_name: '',
            customer_class_id: null,
            referrer_code: '',
            time_consent: null,
            reference_info: null,
            reg_channel: 1,
        }); 
    },
};

export default actions;
