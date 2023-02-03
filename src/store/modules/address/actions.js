import http from "../../../services/http";

const actions = {
    // Readlist Address
    fetchAddress: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAddress', true);
        commit('setAddress', []);
        try {
            let search = state.address_list.filter.search
            let status = state.address_list.filter.status
            let customer = state.address_list.filter.customer
            let finance_area = state.address_list.filter.finance_area
            let archetype = state.address_list.filter.archetype
            let price_set = state.address_list.filter.price_set
            let sales_person = state.address_list.filter.sales_person
            // const response = await http.get("/address", {
            //     params: {
            //         per_page:1000,
            //         order_by:'-id',
            //         search: search,
            //         status: status,
            //         customer: customer,
            //         finance_area: finance_area,
            //         archetype: archetype,
            //         price_set: price_set,
            //         sales_person: sales_person,
            //     }
            // });
            // if (response.data.data) commit('setAddress', response.data.data);
            commit('setPreloadAddress', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadAddress', false);
        }
    },

    
    // Detail Address
    fetchAddressDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAddressDetail', true);
        commit('setAddressDetail', []);
        try {
            // const response = await http.get("/address/" + payload.id);
            // if (response.data.data) commit('setAddressDetail', response.data.data);
            commit('setPreloadAddressDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadAddressDetail', false);
        }
    },
};

export default actions;
