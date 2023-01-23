const mutations = {
    // Readlist Sales Assignment
    setPreloadSalesPerformance: function(state, payload) {
        state.performance_readlist.loading = payload;
    return state;
    },
    setSalesPerformance: function(state, payload) {
        state.performance_readlist.items = payload;
        return state;
    },
};

export default mutations;
