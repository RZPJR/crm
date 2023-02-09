const state = {
    // Readlist Customer
    customer_list: {
        isLoading: false,
        items: [],
        filter: {
            search: '',
            status:1,
            invoice_term:'',
            payment_term:'',
            finance_region:'',
            customer_type: '',
            suspend: 999,
        },
        status_options: [
            {
                text:'All Status',
                value:999
            },
            {
                text:'Active',
                value:1
            },
            {
                text:'Archived',
                value:2
            }
        ],
        suspend_option: [
            {
                text:'Show All',
                value:999
            },
            {
                text:'Yes',
                value:1
            },
            {
                text:'No',
                value:2
            }
        ],
        table_header: [
            {
                text:'Code',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Phone Number',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Customer Type',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Invoice Term',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Payment Term',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Finance Region',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Payment Group',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Suspend',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Status',
                width:'3%',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                width:'2%',
                sortable: false
            },
        ],
    },

    // Detail Customer
    customer_detail: {
        isLoading: false,
        items: [],
        merchant_acc_num: [],
        table_header: [
            {
                text:'No',
                sortable: false,
                width:"5"
            },
            {
                text:'Payment Channel',
                sortable: false,
            },
            {
                text:'Account Name',
                sortable: false,
            },
            {
                text:'Account Number',
                sortable: false
            },
        ],
    },

};

export default state;
