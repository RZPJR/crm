const mutations = {
    // Readlist Main Outlet
    setPreloadMainOutlet: function(state, payload) {
        state.main_outlet.isLoading = payload;
        return state;
    },
    setMainOutlet: function(state, payload) {
        state.main_outlet.items = payload;
        return state;
    },
};

export default mutations;
