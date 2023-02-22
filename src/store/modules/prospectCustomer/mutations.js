const mutations = {
    // Readlist ProspectCustomer
    setPreloadProspectCustomer: function(state, payload) {
        state.prospect_customer.isLoading = payload;
        return state;
    },
    setOverlayProspectCustomer: function(state, payload) {
        state.prospect_customer.overlay = payload;
        return state;
    },
    setProspectCustomer: function(state, payload) {
        state.prospect_customer.items = payload;
        return state;
    },
    setSearchProspectCustomer: function(state, payload) {
        state.prospect_customer.filter.search = payload;
        return state;
    },
    setStatusProspectCustomer: function(state, payload) {
        state.prospect_customer.filter.statuses = payload;
        return state;
    },
    setSelectCustomerTypeProspectCustomer: function(state, payload) {
        state.prospect_customer.filter.customer_type = payload;
        return state;
    },
    setSelectAreaProspectCustomer: function(state, payload) {
        state.prospect_customer.filter.area = payload;
        return state;
    },
    setSelectArchetypeProspectCustomer: function(state, payload) {
        state.prospect_customer.filter.archetype = payload;
        return state;
    },
    setSelectSalesPersonProspectCustomer: function(state, payload) {
        state.prospect_customer.filter.sales_person = payload;
        return state;
    },
    setSelectRequestProspectCustomer: function(state, payload) {
        state.prospect_customer.filter.request_by = payload;
        return state;
    },

    // Detail
    setPreloadProspectCustomerDetail: function(state, payload) {
        state.detail_prospect_customer.isLoadingDetail = payload;
        return state;
    },
    setDataProspectCustomerDetail: function(state, payload) {
        state.detail_prospect_customer.data = payload;
        return state;
    }
    
};

export default mutations;
