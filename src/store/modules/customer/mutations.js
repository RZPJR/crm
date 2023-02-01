const mutations = {
    // Readlist Customer
    setPreloadCustomer: function(state, payload) {
        state.customer_list.isLoading = payload;
        return state;
    },
    setCustomer: function(state, payload) {
        state.customer_list.items = payload;
        return state;
    },

    // Detail Customer
    setPreloadCustomerDetail: function(state, payload) {
        state.customer_detail.isLoading = payload;
        return state;
    },
    setCustomerDetail: function(state, payload) {
        state.customer_detail.items = payload;
        return state;
    },
};

export default mutations;
