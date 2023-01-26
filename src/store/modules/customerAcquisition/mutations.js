const mutations = {
    // Readlist Customer Acquisition
    setPreloadCustomerAcquisition: function(state, payload) {
        state.customer_acquisition.isLoading = payload;
    return state;
    },
    setCustomerAcquisition: function(state, payload) {
        state.customer_acquisition.data = payload;
        return state;
    },
    
    // Detail Customer Acquisition
    setPreloadCustomerAcquisitionDetail: function(state, payload) {
        state.detail_customer_acquisition.isLoading = payload;
    return state;
    },
    setCustomerAcquisitionDetail: function(state, payload) {
        state.detail_customer_acquisition.form = payload;
        return state;
    },
};

export default mutations;
