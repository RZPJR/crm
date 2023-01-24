import axios from "axios";

const actions = {
    // Readlist Prospect Customer 
    fetchProspectCustomer: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadProspectCustomer', true);
        commit('setProspectCustomer', []);
        try {
            let search = state.prospect_customer.search
            let status = state.prospect_customer.status
            let SelectBusinessType = state.prospect_customer.SelectBusinessType
            let SelectArea = state.prospect_customer.SelectArea
            let SelectArchetype = state.prospect_customer.SelectArchetype
            let SelectSalesPerson = state.prospect_customer.SelectSalesPerson
            let SelectRequest = state.prospect_customer.SelectRequest
            let API_URL = process.env.VUE_APP_API_URL_BASE;
            const response = await axios.get(API_URL+"/bridge/v1/prospective_customer", {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("bearer")}`
                },
                params: {
                  per_page:1000,
                  order_by:'-id',
                  search: search,
                  status: status,
                  archetype_id: SelectArchetype,
                  business_type_id: SelectBusinessType,
                  region_id: SelectArea,
                  salesperson_id: SelectSalesPerson,
                  requested_by: SelectRequest,
                }
            });
            if (response.data.data) commit('setProspectCustomer', response.data.data);
            commit('setPreloadProspectCustomer', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomer', false);
        }
    },
};

export default actions;
