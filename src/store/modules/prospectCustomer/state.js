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
        form: {
            // basic info
            customer_id: '',
            business_name: '',
            customer_type_id: '',
            business_type_id: '',
            archetype_id: '',
            brand_name: '',
            customer_class_id: '',
            referrer_code: '',
            time_consent: 0,
            reference_info: 0,
            registration_channel: 0,
            outlet_image: [],

            //company address
            company_address: {
                address_name: '',
                region: '',
                address_1: '',
                address_2: '',
                address_3: '',
                province: '',
                city: '',
                district: '',
                sub_district: '',
                postal_code: '',
                note: '',
                latitude: null,
                longitude: null
            },

            //sales and shipping info
            ship_to_address: {
                address_name: '',
                region: '',
                address_1: '',
                address_2: '',
                address_3: '',
                province: '',
                city: '',
                district: '',
                sub_district: '',
                postal_code: '',
                note: '',
                latitude: null,
                longitude: null
            },
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
            id_card_doc_url: '',
            company_contract_doc_url: '',
            notarial_deed_doc_url: '',
            taxpayer_doc_url: '',
            taxable_entrepeneur_doc_url: '',
            business_license_doc_url: '',
            company_certificate_reg_url: '',

            // Finance Info
            pic_finance_name: '',
            pic_finance_contact: '',
            payment_term_id: '',
            exchange_invoice: 0,
            exchange_invoice_time: '',
            invoice_term: 0,
            finance_email: '',

            // Billing Address
            bill_to_address: {
                address_name: '',
                region: '',
                address_1: '',
                address_2: '',
                address_3: '',
                province: '',
                city: '',
                district: '',
                sub_district: '',
                postal_code: '',
                note: '',
                latitude: null,
                longitude: null
            },

            //Additional Info
            comment_1: '',
            comment_2: '',
        },
        confirm_data: {},
    }
};

export default state;
