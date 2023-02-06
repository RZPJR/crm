import http from "../../../services/http";

const actions = {
    // Readlist Address
    fetchAddress: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadAddress', true);
        commit('setAddress', []);
        try {
            let filter = state.address_list
            let search = filter.search
            let status = filter.status
            let customer = filter.customer
            let finance_region = filter.finance_region
            let archetype = filter.archetype
            let price_set = filter.price_level
            let sales_person = filter.sales_person
            // const response = await http.get("/address", {
            //     params: {
            //         per_page:1000,
            //         order_by:'-id',
            //         search: search,
            //         status: status,
            //         customer: customer,
            //         finance_region: finance_region,
            //         archetype: archetype,
            //         price_level: price_level,
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
