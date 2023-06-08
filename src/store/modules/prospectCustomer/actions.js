
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
            if (response.data.data) {
                commit('setDataProspectCustomerDetail', response.data.data);
                commit('setAddressDetailCustomerDetail', {
                    company_address: response.data.data.company_address_detail_1 + response.data.data.company_address_detail_2 + response.data.data.company_address_detail_3,
                    shipping_address: response.data.data.shipping_address_detail_1 + response.data.data.shipping_address_detail_2 + response.data.data.shipping_address_detail_3,
                    billing_address: response.data.data.billing_address_detail_1 + response.data.data.billing_address_detail_2 + response.data.data.billing_address_detail_3,
                });
            }
            commit('setPreloadProspectCustomerDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadProspectCustomerDetail', false);
        }
    },
    
    fetchPriceLevel: async ({ state, commit, dispatch }, payload) => {
        try {
            const response = await http.get("sales/v1/sales_price_level", {
                params: {
                    page: 1,
                    per_page: 10,
                    customer_type_id: payload.customer_type_id,
                    region_id: payload.region_id,
                }
            }, true);
            if(response.data.data){
                commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer, price_level: response.data.data[0]})
                commit('setFormProspectCustomerCreate', { ...state.create_prospect_customer.form, price_level_id: response.data.data[0].id})
            }
        } catch (error){
            console.log(error);
        }
    },

    fetchCustomerDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadCustomerDetail', true);
        try {
            const response = await http.get("/customer/" + payload);
            let data = response.data.data
            if (data){
                commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer,
                    customer_id: payload,
                    customer_type: data?.customer_type === null? {} : data.customer_type,
                    archetype: data?.archetype === null? {} : data.archetype,
                    customer_class: data?.customer_class === null? {} : data.customer_class,
                    payment_term: data?.payment_term === null? {} : data.payment_term,
                    sales_territory: data?.sales_territory === null? {} : data.sales_territory,
                    salesperson: data?.salesperson === null? {} : data.sales_person,
                });
                if(state.create_prospect_customer.form.business_type_id === 0){
                    commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer,
                        business_type: {
                            id: data.business_type.id,
                            value: data.business_type.value_int,
                            value_name: data.business_type.value_name
                        },
                    });
                }
                commit('setFormProspectCustomerCreate', { ...state.create_prospect_customer.form,
                    customer_code: data.customer_code? data.customer_code : '',
                    customer_type_id: data.customer_type? data.customer_type.id : '',
                    archetype_id: data.archetype? data.archetype.id : '',
                    customer_class_id: data.customer_class? data.customer_class.id : '',
                    referrer_code: data.referrer_code? data.referrer_code : '',
                    payment_term_id: data.payment_term? data.payment_term.id : '',
                    sales_territory_id: data.sales_territory? data.sales_territory.id : '',
                    salesperson_id: data.salesperson? data.salesperson.id : '',
                    business_type_id: state.create_prospect_customer.form.business_type_id === 0? data.business_type? data.business_type.value_int : 0 : state.create_prospect_customer.form.business_type_id,

                    shipping_address_refer_to: 0,
                    shipping_address_name: data.ship_to_address?.address_name,
                    shipping_address_detail_1: data.ship_to_address?.address_1,
                    shipping_address_detail_2: data.ship_to_address?.address_2,
                    shipping_address_detail_3: data.ship_to_address?.address_3,
                    shipping_address_region: data.ship_to_address?.region,
                    shipping_address_province: data.ship_to_address?.province,
                    shipping_address_city: data.ship_to_address?.city,
                    shipping_address_district: data.ship_to_address?.district,
                    shipping_address_sub_district: data.ship_to_address?.sub_district,
                    shipping_address_postal_code: data.ship_to_address?.postal_code,
                    shipping_address_note: data.ship_to_address?.note,
                    shipping_address_latitude: data.ship_to_address?.latitude !== 0? data.ship_to_address.latitude.toString() : '',
                    shipping_address_longitude: data.ship_to_address?.longitude !== 0? data.ship_to_address.longitude.toString() : '',

                    billing_address_refer_to: 0,
                    billing_address_name: data.bill_to_address?.address_name,
                    billing_address_detail_1: data.bill_to_address?.address_1,
                    billing_address_detail_2: data.bill_to_address?.address_2,
                    billing_address_detail_3: data.bill_to_address?.address_3,
                    billing_address_region: data.bill_to_address?.region,
                    billing_address_province: data.bill_to_address?.province,
                    billing_address_city: data.bill_to_address?.city,
                    billing_address_district: data.bill_to_address?.district,
                    billing_address_sub_district: data.bill_to_address?.sub_district,
                    billing_address_postal_code: data.bill_to_address?.postal_code,
                    billing_address_note: data.bill_to_address?.note,
                    billing_address_latitude: data.bill_to_address?.latitude !== 0? data.bill_to_address.latitude.toString() : '',
                    billing_address_longitude: data.bill_to_address?.longitude !== 0? data.bill_to_address.longitude.toString() : '',
                })
                if(data.ship_to_address.region !== '' && data.customer_type.id !== ''){
                    dispatch('fetchPriceLevel', {customer_type_id: data.customer_type.id, region_id: data.ship_to_address.region})
                }
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
                    
                    invoice_term: true,
                })
            }
            commit('setPreloadCustomerDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadCustomerDetail', false);
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
            shipping_method_id: 'DELIVERY',
            pic_order_name: '',
            pic_order_contact: '',
            sales_territory_id: '',
            salesperson_id: '',
            price_level_id: '',

            // Business Info
            owner_name: '',
            owner_role: '',
            owner_contact: '',
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
            invoice_term: 1,
            finance_email: '',
            
            // Billing Address
            billing_address_refer_to: 0,
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
        commit("setSelectedDetailCustomer", { ...create_prospect_customer.detail_customer, 
            selected_channel: {
                id: 249,
                value: 1,
                value_name: 'Dashboard'
            },
            shipping_method: {
                id: 'DELIVERY',
                description: 'DELIVERY',
                type: 1,
                type_description: 'Delivery'
            },
            invoice_term: {
                id: 575,
                value: 1,
                value_name: 'direct'
            },
            outlet_image: [],
        });
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

            invoice_term: true,
        })
        commit("setError", {})
    },

    // Upgrade Prospect Customer 
    fetchProspectCustomerUpgrade: async ({ commit, state, dispatch }, payload) => {
        commit('setPreloadCustomerDetail', true);
        dispatch('fetchProspectCustomerCreate')
        try {
            const response = await http.get("/prospective_customer/" + payload.id);
            let data = response.data.data
            if (data) {
                commit("setFormProspectCustomerCreate", {
                    // basic info
                    prospective_customer_id: data.id? data.id : 0,
                    customer_code: data.customer? data.customer.code : '',
                    business_name: data.business_name? data.business_name : '',
                    brand_name: data.brand_name? data.brand_name : '',
                    customer_type_id: data.customer_type? data.customer_type.id : '',
                    business_type_id: data.business_type? data.business_type.value_int : 0,
                    archetype_id: data.archetype.id,
                    customer_class_id: data.customer_class.id,
                    referrer_code: data.referrer_code,
                    time_consent: data.time_consent? data.time_consent.value_int : 0,
                    reference_info: data.reference_info? data.reference_info.value_int : 0,
                    registration_channel: data.application? data.application.value_int : 0,
                    outlet_image: data.outlet_image,

                    // company_address
                    company_address_id: data.company_address_id,
                    company_address_name: data.company_address_name,
                    company_address_detail_1: data.company_address_detail_1,
                    company_address_detail_2: data.company_address_detail_2,
                    company_address_detail_3: data.company_address_detail_3,
                    company_address_region: data.company_address_region,
                    company_address_province: data.company_address_province,
                    company_address_city: data.company_address_city,
                    company_address_district: data.company_address_district,
                    company_address_sub_district: data.company_address_sub_district,
                    company_address_postal_code: data.company_address_postal_code,
                    company_address_note: data.company_address_note,
                    company_address_latitude: data.company_address_latitude,
                    company_address_longitude: data.company_address_longitude,

                    //sales and shipping info
                    shipping_address_refer_to: data.shipping_address_refer_to,
                    shipping_address_id: data.shipping_address_id,
                    shipping_address_name: data.shipping_address_name,
                    shipping_address_detail_1: data.shipping_address_detail_1,
                    shipping_address_detail_2: data.shipping_address_detail_2,
                    shipping_address_detail_3: data.shipping_address_detail_3,
                    shipping_address_region: data.shipping_address_region,
                    shipping_address_province: data.shipping_address_province,
                    shipping_address_city: data.shipping_address_city,
                    shipping_address_district: data.shipping_address_district,
                    shipping_address_sub_district: data.shipping_address_sub_district,
                    shipping_address_postal_code: data.shipping_address_postal_code,
                    shipping_address_note: data.shipping_address_name,
                    shipping_address_latitude: data.shipping_address_latitude,
                    shipping_address_longitude: data.shipping_address_longitude,
                    shipping_method_id: data.shipping_method.id,
                    pic_order_name: data.pic_order_name,
                    pic_order_contact: data.pic_order_contact,
                    sales_territory_id: data.sales_territory? data.sales_territory.id : '',
                    salesperson_id: data.salesperson? data.salesperson.id : '',
                    price_level_id: data.price_level? data.price_level.id : '',

                    // Business Info
                    owner_name: data.owner_name,
                    owner_role: data.owner_role,
                    owner_contact: data.owner_contact,
                    email: data.email,
                    id_card_doc_number: data.id_card_doc_number,
                    taxpayer_doc_number: data.taxpayer_doc_number,
                    pic_operation_name: data.pic_operation_name,
                    pic_operation_contact: data.pic_operation_contact,
                    id_card_doc_url: data.id_card_doc_url,
                    company_contract_doc_url: data.company_contract_doc_url,
                    notarial_deed_doc_url: data.notarial_deed_doc_url,
                    taxpayer_doc_url: data.taxpayer_doc_url,
                    taxable_entrepeneur_doc_url: data.taxable_entrepeneur_doc_url,
                    business_license_doc_url: data.business_license_doc_url,
                    company_certificate_reg_url: data.company_certificate_reg_url,
                    id_card_doc_name: data.id_card_doc_name,
                    company_contract_doc_name: data.company_contract_doc_name,
                    notarial_deed_doc_name: data.notarial_deed_doc_name,
                    taxpayer_doc_name: data.taxpayer_doc_name,
                    taxable_entrepeneur_doc_name: data.taxable_entrepeneur_doc_name,
                    business_license_doc_name: data.business_license_doc_name,
                    company_certificate_reg_name: data.company_certificate_reg_name,
                    payment_term_id: data.payment_term? data.payment_term.id : '',

                    // Finance Info
                    pic_finance_name: data.pic_finance_name,
                    pic_finance_contact: data.pic_finance_contact,
                    exchange_invoice: data.exchange_invoice,
                    exchange_invoice_time: data.exchange_invoice_time,
                    invoice_term: data.invoice_term? data.invoice_term.value_int : 0,
                    finance_email: data.finance_email,
                    
                    // Billing Address
                    billing_address_refer_to: data.billing_address_refer_to,
                    billing_address_id: data.billing_address_id,
                    billing_address_name: data.billing_address_name,
                    billing_address_detail_1: data.billing_address_detail_1,
                    billing_address_detail_2: data.billing_address_detail_2,
                    billing_address_detail_3: data.billing_address_detail_3,
                    billing_address_region: data.billing_address_region,
                    billing_address_province: data.billing_address_province,
                    billing_address_city: data.billing_address_city,
                    billing_address_district: data.billing_address_district,
                    billing_address_sub_district: data.billing_address_sub_district,
                    billing_address_postal_code: data.billing_address_postal_code,
                    billing_address_note: data.billing_address_note,
                    billing_address_latitude: data.billing_address_latitude,
                    billing_address_longitude: data.billing_address_longitude,

                    //Additional Info
                    comment_1: data.comment_1,
                    comment_2: data.comment_2,
                });
                commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer, selected_channel: {
                    id: 249,
                    value: 1,
                    value_name: 'Dashboard'
                }});
                commit("setSelectedDetailCustomer", { ...state.create_prospect_customer.detail_customer,
                    customer_id: data?.customer?.id,
                    customer: data?.customer,
                    customer_type: data?.customer_type,
                    archetype: data?.archetype,
                    business_type: {
                        id: data?.business_type?.id,
                        value: data?.business_type?.value_int,
                        value_name: data?.business_type?.value_name
                    },
                    customer_class: data?.customer_class,
                    time_consent: {
                        id: data?.time_consent?.id,
                        value: data?.time_consent?.value_int,
                        value_name: data?.time_consent?.value_name
                    },
                    reference_info: {
                        id: data?.reference_info?.id,
                        value: data?.reference_info?.value_int,
                        value_name: data?.reference_info?.value_name
                    },
                    sales_territory: data?.sales_territory,
                    salesperson: data?.salesperson,
                    price_level: data?.price_level,
                    invoice_term: {
                        id: data?.invoice_term? data?.invoice_term?.id : '',
                        value: data?.invoice_term? data?.invoice_term?.value_int : 0,
                        value_name: data?.invoice_term? data?.invoice_term?.value_name : '',
                    },
                    shipping_method: data?.shipping_method,
                    payment_term: data?.payment_term,
                    id_card_doc_url: data?.id_card_doc_url,
                    company_contract_doc_url: data?.company_contract_doc_url,
                    notarial_deed_doc_url: data?.notarial_deed_doc_url,
                    taxpayer_doc_url: data?.taxpayer_doc_url,
                    taxable_entrepeneur_doc_url: data?.taxable_entrepeneur_doc_url,
                    business_license_doc_url: data?.business_license_doc_url,
                    company_certificate_reg_url: data?.company_certificate_reg_url,
                    id_card_doc_name: data?.id_card_doc_name,
                    company_contract_doc_name: data?.company_contract_doc_name,
                    notarial_deed_doc_name: data?.notarial_deed_doc_name,
                    taxpayer_doc_name: data?.taxpayer_doc_name,
                    taxable_entrepeneur_doc_name: data?.taxable_entrepeneur_doc_name,
                    business_license_doc_name: data?.business_license_doc_name,
                    company_certificate_reg_name: data?.company_certificate_reg_name,
                });
                data?.outlet_image?.forEach(e => {
                    commit("setOutletImageUpgrade", {
                        image: true,
                        imageError: '',
                        imgUrl: e,
                        nameFile: e,
                    });
                });
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

                    shipping_info: data.shipping_address_refer_to === 1? true : false,
                })
                commit("setError", {})
            }
            commit('setPreloadCustomerDetail', false);
        } catch (error) {
            console.log(error);
            commit('setPreloadCustomerDetail', false);
        }
    },
};

export default actions;
