const mutations = {
    // Readlist Address
    setPreloadAddress: function(state, payload) {
        state.address_list.isLoading = payload;
        return state;
    },
    setAddress: function(state, payload) {
        state.address_list.items = payload;
        return state;
    },
    setAddressFilter: function(state, payload) {
        state.address_list.filter = payload;
        return state;
    },

    // Detail Address
    setPreloadAddressDetail: function(state, payload) {
        state.address_detail.isLoading = payload;
        return state;
    },
    setAddressDetail: function(state, payload) {
        state.address_detail.items = payload;
        return state;
    },
};

export default mutations;
