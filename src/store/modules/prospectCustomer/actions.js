
import Vue from 'vue'
import http from "../../../services/http";
import Pagination from "../pagination";

const actions = {
    // Readlist Prospect Customer 
    fetchProspectCustomer: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadProspectCustomer', true);
        commit('setProspectCustomer', []);
        try {
            let search = state.prospect_customer.filter.search
            let status = state.prospect_customer.filter.status
            let customer_type_id = state.prospect_customer.filter.customer_type
            let region_id = state.prospect_customer.filter.area
            let archetype_id = state.prospect_customer.filter.archetype
            let salesperson_id = state.prospect_customer.filter.sales_person
            let requested_by = state.prospect_customer.filter.request_by
            let pagination = Pagination.state.pagination
            const response = await http.get("/prospective_customer", {
                params: {
                    page: pagination.page,
                    per_page : pagination.rows_per_page,
                    order_by:'-id',
                    search: search,
                    status: status,
                    archetype_id: archetype_id,
                    customer_type_id: customer_type_id,
                    region_id: region_id,
                    salesperson_id: salesperson_id,
                    requested_by: requested_by,
                }
            });
            if(response.data.data && response.data.data !== null){
                commit('setProspectCustomer', response.data.data);
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
            }
            commit('setPreloadProspectCustomer', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomer', false);
        }
    },

    // Decline Prospect Customer 
    declineProspectCustomer: async ({ state, commit, dispatch }, payload) => {
        try {
            await http.put("/prospective_customer/decline/" + payload.id, {
                decline_type: state.prospect_customer.decline.type,
                decline_note: state.prospect_customer.decline.note,
            }).then(response => {
                Vue.$toast.open({
                    position: 'top-right',
                    message: 'Data has been declined successfully',
                    type: 'success',
                });
                commit("setCloseDeclineProspectCustomer");
                dispatch("fetchProspectCustomer")
            });
        } catch (error) {
            commit("setErrorProspectCustomer", error.errors)
        }
    },

    // Detail Prospect Customer 
    fetchProspectCustomerDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadProspectCustomerDetail', true);
        commit('setDataProspectCustomerDetail', []);
        try {
            const response = await http.get("/prospective_customer/" + payload.id);
            if (response.data.data) 
            commit('setDataProspectCustomerDetail', response.data.data);
            commit('setPreloadProspectCustomerDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomerDetail', false);
        }
    },

    fetchCustomerDetail: async ({ state, commit, dispatch }, payload) => {
        try {
            const response = await http.get("/customer/" + payload);
            let data = response.data.data
            if (data){
                commit('setFormProspectCustomerCreate', { ...state.create_prospect_customer.form,
                    customer_code: data.customer_code,
                    customer_type_id: data.customer_type.id,
                    archetype_id: data.archetype.id,
                    customer_class_id: data.customer_class.id,
                    referrer_code: data.referrer_code,
                    payment_term_id: data.payment_term.id,
                    sales_territory_id: data.sales_territory.id,
                    salesperson_id: data.salesperson.id,

                    company_address_name: data.company_address.address_name,
                    company_address_detail_1: data.company_address.address_1,
                    company_address_detail_2: data.company_address.address_2,
                    company_address_detail_3: data.company_address.address_3,
                    company_address_region: data.company_address.region,
                    company_address_province: data.company_address.province,
                    company_address_city: data.company_address.city,
                    company_address_district: data.company_address.district,
                    company_address_sub_district: data.company_address.sub_district,
                    company_address_postal_code: data.company_address.postal_code,
                    company_address_note: data.company_address.note,
                    company_address_latitude: data.company_address.latitude.toString(),
                    company_address_longitude: data.company_address.longitude.toString(),

                    shipping_address_name: data.ship_to_address.address_name,
                    shipping_address_detail_1: data.ship_to_address.address_1,
                    shipping_address_detail_2: data.ship_to_address.address_2,
                    shipping_address_detail_3: data.ship_to_address.address_3,
                    shipping_address_region: data.ship_to_address.region,
                    shipping_address_province: data.ship_to_address.province,
                    shipping_address_city: data.ship_to_address.city,
                    shipping_address_district: data.ship_to_address.district,
                    shipping_address_sub_district: data.ship_to_address.sub_district,
                    shipping_address_postal_code: data.ship_to_address.postal_code,
                    shipping_address_note: data.ship_to_address.note,
                    shipping_address_latitude: data.ship_to_address.latitude.toString(),
                    shipping_address_longitude: data.ship_to_address.longitude.toString(),

                    billing_address_name: data.bill_to_address.address_name,
                    billing_address_detail_1: data.bill_to_address.address_1,
                    billing_address_detail_2: data.bill_to_address.address_2,
                    billing_address_detail_3: data.bill_to_address.address_3,
                    billing_address_region: data.bill_to_address.region,
                    billing_address_province: data.bill_to_address.province,
                    billing_address_city: data.bill_to_address.city,
                    billing_address_district: data.bill_to_address.district,
                    billing_address_sub_district: data.bill_to_address.sub_district,
                    billing_address_postal_code: data.bill_to_address.postal_code,
                    billing_address_note: data.bill_to_address.note,
                    billing_address_latitude: data.bill_to_address.latitude.toString(),
                    billing_address_longitude: data.bill_to_address.longitude.toString(),
                })
                commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer, 
                    customer_type: data.customer_type,
                    archetype: data.archetype,
                    customer_class: data.customer_class, // from here
                    payment_term: data.payment_term,
                    sales_territory: data.sales_territory,
                    salesperson: data.salesperson,
                });


                // commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer, payment_term: data.payment_term});
                commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer, sales_territory: data.sales_territory});
                commit("setDisabledProspectCustomerCreate", {
                    archetype: false,
                    company_address_province: false,
                    company_address_city: false,
                    company_address_district: false,
                    company_address_sub_district: false,
        
                    shipping_address_province: false,
                    shipping_address_city: false,
                    shipping_address_district: false,
                    shipping_address_sub_district: false,
        
                    billing_address_province: false,
                    billing_address_city: false,
                    billing_address_district: false,
                    billing_address_sub_district: false,
                })
            }
        } catch (error) {
            console.log(error);
        }
    },

    // Create Prospect Customer 
    fetchProspectCustomerCreate: async ({ commit, state, dispatch }, payload) => {
        let create_prospect_customer = state.create_prospect_customer
        commit("setFormProspectCustomerCreate", {
            // basic info
            prospective_customer_id: 0,
            customer_code: '',
            business_name: '',
            brand_name: '',
            customer_type_id: '',
            business_type_id: 0,
            archetype_id: '',
            customer_class_id: '',
            referrer_code: '',
            time_consent: 0,
            reference_info: 0,
            registration_channel: 1,
            outlet_image: [],

            // company_address
            company_address_id: 0,
            company_address_name: '',
            company_address_detail_1: '',
            company_address_detail_2: '',
            company_address_detail_3: '',
            company_address_region: '',
            company_address_province: '',
            company_address_city: '',
            company_address_district: '',
            company_address_sub_district: '',
            company_address_postal_code: '',
            company_address_note: '',
            company_address_latitude: '',
            company_address_longitude: '',

            //sales and shipping info
            shipping_address_refer_to: 0,
            shipping_address_id: 0,
            shipping_address_name: '',
            shipping_address_detail_1: '',
            shipping_address_detail_2: '',
            shipping_address_detail_3: '',
            shipping_address_region: '',
            shipping_address_province: '',
            shipping_address_city: '',
            shipping_address_district: '',
            shipping_address_sub_district: '',
            shipping_address_postal_code: '',
            shipping_address_note: '',
            shipping_address_latitude: '',
            shipping_address_longitude: '',
            shipping_method_id: '',
            pic_order_name: '',
            pic_order_contact: '',
            sales_territory_id: '',
            salesperson_id: '',
            price_level_id: '',

            // Business Info
            owner_name: '',
            owner_role: '',
            email: '',
            id_card_doc_number: '',
            taxpayer_doc_number: '',
            pic_operation_name: '',
            pic_operation_contact: '',
            id_card_doc_url: '',
            company_contract_doc_url: '',
            notarial_deed_doc_url: '',
            taxpayer_doc_url: '',
            taxable_entrepeneur_doc_url: '',
            business_license_doc_url: '',
            company_certificate_reg_url: '',
            payment_term_id: '',

            // Finance Info
            pic_finance_name: '',
            pic_finance_contact: '',
            exchange_invoice: 2,
            exchange_invoice_time: '',
            invoice_term: 0,
            finance_email: '',
            
            // Billing Address
            billing_address_refer_to: 1,
            billing_address_id: 0,
            billing_address_name: '',
            billing_address_detail_1: '',
            billing_address_detail_2: '',
            billing_address_detail_3: '',
            billing_address_region: '',
            billing_address_province: '',
            billing_address_city: '',
            billing_address_district: '',
            billing_address_sub_district: '',
            billing_address_postal_code: '',
            billing_address_note: '',
            billing_address_latitude: '',
            billing_address_longitude:'',

            //Additional Info
            comment_1: '',
            comment_2: '',
        });
        commit("setSelectedDetailCustomer", { ...create_prospect_customer.detail_customer, selected_channel: {
            id: 249,
            value: 1,
            value_name: 'Dashboard'
        }});
        commit("setDisabledProspectCustomerCreate", {
            archetype: true,
            company_address_province: true,
            company_address_city: true,
            company_address_district: true,
            company_address_sub_district: true,

            shipping_address_province: true,
            shipping_address_city: true,
            shipping_address_district: true,
            shipping_address_sub_district: true,

            billing_address_province: true,
            billing_address_city: true,
            billing_address_district: true,
            billing_address_sub_district: true,
        })
    },
};

export default actions;
