import http from "../../../services/http";

const actions = {
    // Readlist Distribution Network
    fetchDistributionNetwork: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadDistributionNetwork', true);
        commit('setDistributionNetwork', []);
        try {
            // let search = state.main_outlet.filter.search
            // let status = state.main_outlet.filter.status
            // const response = await http.get("/distribution-network", {
            //     params: {
            //         per_page:1000,
            //         order_by:'-id',
            //         search: search,
            //         status: status,
            //     }
            // });
            // if (response.data.data) commit('setDistributionNetwork', response.data.data);
            commit('setPreloadDistributionNetwork', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadDistributionNetwork', false);
        }
    },

    
    // Detail Distribution Network
    fetchAddressDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadDistributionNetworkDetail', true);
        commit('setDistributionNetworkDetail', []);
        try {
            // const response = await http.get("/distribution-network/" + payload.id);
            // if (response.data.data) commit('setDistributionNetworkDetail', response.data.data);
            commit('setPreloadDistributionNetworkDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadDistributionNetworkDetail', false);
        }
    },
};

export default actions;
