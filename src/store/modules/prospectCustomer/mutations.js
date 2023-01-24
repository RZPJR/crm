const mutations = {
    // Readlist ProspectCustomer
    setPreloadProspectCustomer: function(state, payload) {
        state.prospect_customer.isLoading = payload;
        return state;
    },
    setProspectCustomer: function(state, payload) {
        state.prospect_customer.items = payload;
        return state;
    },
    setSearchProspectCustomer: function(state, payload) {
        state.prospect_customer.search = payload;
        return state;
    },
    setStatusProspectCustomer: function(state, payload) {
        state.prospect_customer.status = payload;
        return state;
    },
    setSelectBusinessTypeProspectCustomer: function(state, payload) {
        state.prospect_customer.SelectBusinessType = payload;
        return state;
    },
    setSelectAreaProspectCustomer: function(state, payload) {
        state.prospect_customer.SelectArea = payload;
        return state;
    },
    setSelectArchetypeProspectCustomer: function(state, payload) {
        state.prospect_customer.SelectArchetype = payload;
        return state;
    },
    setSelectSalesPersonProspectCustomer: function(state, payload) {
        state.prospect_customer.SelectSalesPerson = payload;
        return state;
    },
    setSelectRequestProspectCustomer: function(state, payload) {
        state.prospect_customer.SelectRequest = payload;
        return state;
    },
};

export default mutations;
