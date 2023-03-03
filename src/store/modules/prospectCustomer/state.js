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
    }

};

export default state;
