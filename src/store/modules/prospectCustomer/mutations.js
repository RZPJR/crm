const mutations = {
    // Readlist ProspectCustomer
    // #region 
    setPreloadProspectCustomer: function(state, payload) {
        state.prospect_customer.isLoading = payload;
        return state;
    },
    setProspectCustomer: function(state, payload) {
        state.prospect_customer.items = payload;
        return state;
    },
    setErrorProspectCustomer: function(state, payload) {
        state.prospect_customer.error = payload
        return state;
    },
    setFilterProspectCustomer: function(state, payload) {
        state.prospect_customer.filter = payload
        return state;
    },
    setDefaultFilterProspectCustomer: function(state, payload) {
        state.prospect_customer.filter = {
            search: '',
            status:'',
            customer_type: '',
            area: '',
            archetype: '',
            sales_person: '',
            request_by: '',
        }
        return state;
    },
    setSelectDeclineTypeProspectCustomer: function(state, payload) {
        state.prospect_customer.decline.type = payload;
        return state;
    },
    setCloseDeclineProspectCustomer: function(state, payload) {
        let decline = state.prospect_customer.decline
        decline.show_modal = false
        decline.clear_type = true
        return state;
    },
    setOpenDeclineDialogProspectCustomer: function(state, payload) {
        let decline = state.prospect_customer.decline
        state.prospect_customer.error = {}
        decline.type = 0
        decline.note = ""
        decline.clear_type = false
        decline.id = payload
        decline.show_modal = true
        return state;
    },
    sethandlerSelectSalesPerson: function(state, payload) {        
        state.prospect_customer.clear_salesperson = payload
        state.prospect_customer.disable_salesperson = payload
        return state;
    },
    // #endregion

    // Detail
    setPreloadProspectCustomerDetail: function(state, payload) {
        state.detail_prospect_customer.isLoadingDetail = payload;
        return state;
    },
    setDataProspectCustomerDetail: function(state, payload) {
        state.detail_prospect_customer.data = payload;
        return state;
    },
    setAddressDetailCustomerDetail: function(state, payload) {
        state.detail_prospect_customer.address_detail = payload;
        return state;
    },

    // Create
    setFormProspectCustomerCreate: function(state, payload) {
        state.create_prospect_customer.form = payload;
        return state;
    },
    setDisabledProspectCustomerCreate: function(state, payload) {
        state.create_prospect_customer.disabled = payload;
        return state;
    },
    setOutletImage: function(state, payload) {
        state.create_prospect_customer.form.outlet_image = payload;
        return state;
    },
    setSelectedDetailCustomer: function(state, payload) {
        state.create_prospect_customer.detail_customer = payload;
        return state;
    },
    setError: function(state, payload) {
        state.create_prospect_customer.error = payload;
        return state;
    },
    setPreloadCustomerDetail: function(state, payload) {
        state.create_prospect_customer.isLoading = payload;
        return state;
    },
    setConfirmData: function(state, payload) {
        state.create_prospect_customer.confirm_data = payload;
        return state;
    },
};

export default mutations;
