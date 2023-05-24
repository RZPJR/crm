const state = {
    // Readlist prospect_customer
    prospect_customer: {
        isLoading: false,
        items: [],
        error: {},
        filter: {
            search: '',
            status: 6,
            customer_type: '',
            area: '',
            archetype: '',
            sales_person: '',
            request_by: '',
        },
        clear_salesperson: true,
        disable_salesperson: true,
        requestby_options: [
            {
                text: 'Customer',
                value: 'customer'
            },
            {
                text: 'Salesperson',
                value: 'salesperson'
            }
        ],
        status_options: [
            {
                text: 'All Status',
                value: ''
            }, 
            {
                text: 'New',
                value: 6
            }, 
            {
                text: 'Registered',
                value: 11
            }, 
            {
                text: 'Decline',
                value: 10
            }
        ],
        table_header: [
            {
                text: 'Name',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text: 'Phone Number',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text: 'Archetype',
                width: "8%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Customer Type',
                width: "12%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Region',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Location',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Request Upgrade',
                class: 'grey--text text--darken-4',
                width: "3%",
                sortable: false
            },
            {
                text: 'Requested By',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Status',
                width: "2%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                width: "2%",
                sortable: false
            },
        ],
        decline: {
            show_modal: false,
            id: '',
            type: 0,
            clear_type: false,
            note: '',
        }
    },

    // Detail prospect_customer
    detail_prospect_customer: {
        isLoadingDetail: false,
        register: false,
        archetype: null,
        next: "",
        customerID: "",
        archetype_id: "",
        reference_info: "",
        data: {
            id: 0,
            archetype: {
                name: "",
            },
            name: "",
            sub_disrict: {
                name: "",
                district: {
                    name: "",
                    city: {
                        name: "",
                        province: {
                            name: "",
                        }
                    }
                },
                area: {
                    name: ""
                }
            },
            merchant: {
                customer_group: ""
            },
            pic_business_name: "",
            id_card_number: "",
            pic_business_contact: "",
            taxpayer_number: "",
            pic_finance_name: "",
        },
        outlet_pictures: [],
        declineDialog: false,
        decline_type: "",
        decline_note: "",
        clearDeclineType:false,
        error: {},
    },

    //Create prospect_customer
    create_prospect_customer:{
        error: {},
        disabled: {
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
        },
        selected_channel: {},
        form: {
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
            registration_channel: 0,
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
            exchange_invoice: 0,
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
        },
        confirm_data: {},
    }
};

export default state;
