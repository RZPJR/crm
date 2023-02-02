const mutations = {
    // Readlist Distribution Network
    setPreloadDistributionNetwork: function(state, payload) {
        state.distribution_network_list.isLoading = payload;
        return state;
    },
    setDistributionNetwork: function(state, payload) {
        state.distribution_network_list.items = payload;
        return state;
    },

    // Detail Distribution Network
    setPreloadDistributionNetworkDetail: function(state, payload) {
        state.distribution_network_detail.isLoading = payload;
        return state;
    },
    setDistributionNetworkDetail: function(state, payload) {
        state.distribution_network_detail.items = payload;
        return state;
    },
};

export default mutations;
