const mutations = {
    // Readlist Sales Assignment
    setPreloadCustomerAcquisition: function(state, payload) {
        state.customer_acquisition.isLoading = payload;
    return state;
    },
    setCustomerAcquisition: function(state, payload) {
        state.customer_acquisition.data = payload;
        return state;
    },
};

export default mutations;
