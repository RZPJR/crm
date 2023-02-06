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
        state.distribution_network_detail.detail.isLoading = payload;
        return state;
    },
    setDistributionNetworkDetail: function(state, payload) {
        state.distribution_network_detail.detail.items = payload;
        return state;
    },
    setPreloadOrderPerformance: function(state, payload) {
        state.distribution_network_detail.order_performance.isLoading = payload;
        return state;
    },
    setTopProduct: function(state, payload) {
        state.distribution_network_detail.order_performance.top_product = payload;
        return state;
    },
    setOrderPerformance: function(state, payload) {
        state.distribution_network_detail.order_performance.items = payload;
        return state;
    },
    setPreloadPaymentPerformance: function(state, payload) {
        state.distribution_network_detail.payment_performance.isLoading = payload;
        return state;
    },
    setPaymentPerformance: function(state, payload) {
        state.distribution_network_detail.payment_performance.items = payload;
        return state;
    },
    setPreloadOrderPayment: function(state, payload) {
        state.distribution_network_detail.order_payment.isLoading = payload;
        return state;
    },
    setOrderPayment: function(state, payload) {
        state.distribution_network_detail.order_payment.items = payload;
        return state;
    },
};

export default mutations;
